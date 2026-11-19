const test = require('node:test');
const assert = require('node:assert/strict');
const { checkRelease } = require('../../src/server/services/updates');
const repository = 'owner/souduanju';
const version = '1.2.9';
const configured = { repository, version };
function release(tag, filename) {
  return async url => {
    assert.equal(url, 'https://api.github.com/repos/owner/souduanju/releases/latest');
    return { ok: true, json: async () => ({ tag_name: tag, draft: false, prerelease: false,
      assets: filename ? [{ name: filename, size: 750, state: 'uploaded' }] : [] }) };
  };
}
test('update setup and unavailable releases', async () => {
  assert.equal((await checkRelease({ repository: '' })).state, 'unconfigured');
  await assert.rejects(checkRelease({ repository: '../evil' }));
  assert.equal((await checkRelease({ ...configured, request: async () => ({ status: 404 }) })).state, 'unpublished');
  await assert.rejects(checkRelease({ ...configured, request: async () => ({ status: 403 }) }));
});
test('stable version comparison and release page fallback', async () => {
  for (const tag of ['v1.2.9', 'v1.2.8']) {
    assert.equal((await checkRelease({ ...configured, request: release(tag) })).state, 'current');
  }
  const next = await checkRelease({ ...configured, request: release('v1.2.10') });
  assert.equal(next.latest, '1.2.10');
  assert.equal(next.downloadUrl, null);
  assert.equal(next.releaseUrl, 'https://github.com/owner/souduanju/releases/tag/v1.2.10');
  await assert.rejects(checkRelease({ ...configured, request: release('v1.3.0-beta.1') }));
});
test('updates select the packaged platform and architecture', async () => {
  for (const [platform, arch, portable, suffix] of [
    ['darwin', 'arm64', false, 'mac-arm64.dmg'], ['darwin', 'x64', false, 'mac-x64.dmg'],
    ['win32', 'x64', false, 'win-x64-setup.exe'], ['win32', 'x64', true, 'win-x64-portable.exe']
  ]) {
    const name = 'souduanju-1.2.10-' + suffix;
    const next = await checkRelease({ ...configured, platform, arch, portable, request: release('v1.2.10', name) });
    assert.equal(next.downloadUrl, 'https://github.com/owner/souduanju/releases/download/v1.2.10/' + name);
  }
});
