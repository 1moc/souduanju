// GitHub Releases is the source of stable desktop packages.
const pkg = require('../../../package.json');

function versionParts(value) {
  if (typeof value !== 'string' || !/^v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(value)) return null;
  const parts = value.replace(/^v/, '').split('.').map(Number);
  return parts.every(Number.isSafeInteger) ? parts : null;
}

function assetSuffix(platform, arch, portable) {
  if (platform === 'darwin' && ['arm64', 'x64'].includes(arch)) return `mac-${arch}.dmg`;
  if (platform === 'win32' && arch === 'x64') return portable ? 'win-x64-portable.exe' : 'win-x64-setup.exe';
  return null;
}

async function checkRelease({
  repository = pkg.updateRepository, version = pkg.version, platform = process.platform,
  arch = process.arch, portable = Boolean(process.env.PORTABLE_EXECUTABLE_FILE), request = fetch
} = {}) {
  const result = { current: version };
  if (!repository) return { ...result, state: 'unconfigured' };
  if (!/^[A-Za-z0-9-]+\/[A-Za-z0-9_.-]+$/.test(repository) || repository.split('/').some(p => p === '.' || p === '..')) {
    throw new Error('Invalid update repository');
  }
  const response = await request(`https://api.github.com/repos/${repository}/releases/latest`, {
    headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'souduanju-update' },
    signal: AbortSignal.timeout(10000), redirect: 'error'
  });
  if (response.status === 404) return { ...result, state: 'unpublished' };
  if (!response.ok) throw new Error('GitHub release unavailable');
  const release = await response.json();
  const latest = versionParts(release.tag_name);
  const current = versionParts(version);
  if (!latest || !current || release.draft !== false || release.prerelease !== false) throw new Error('Invalid stable release');
  const diff = latest.map((n, i) => n - current[i]).find(n => n !== 0);
  if (!(diff > 0)) return { ...result, state: 'current' };
  const tag = release.tag_name;
  const releaseUrl = `https://github.com/${repository}/releases/tag/${tag}`;
  const suffix = assetSuffix(platform, arch, portable);
  const latestVersion = latest.join('.');
  const filename = `${pkg.name}-${latestVersion}-${suffix}`;
  const hasAsset = suffix && release.assets?.some(a => a.name === filename && a.state === 'uploaded' && a.size > 0);
  return { ...result, state: 'available', latest: latestVersion, releaseUrl,
    downloadUrl: hasAsset ? `https://github.com/${repository}/releases/download/${tag}/${filename}` : null };
}

module.exports = { checkRelease };
