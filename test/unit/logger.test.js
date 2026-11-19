// SPDX-License-Identifier: AGPL-3.0-only
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { Logger } = require('../../src/server/services/logger');

test('logger formats, appends, rotates, and reads recent logs', () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'hongguo-log-test-'));
  try {
    const logger = new Logger({ logDir: tempDir, maxSizeBytes: 200, maxBackups: 2 });
    assert.equal(logger.getLogDir(), tempDir);
    assert.equal(logger.getLogFilePath(), path.join(tempDir, 'app.log'));

    // 1. Basic logging
    logger.info('TestTag', 'Hello world');
    logger.warn('TestTag', 'Warning event');
    logger.error('TestTag', 'Error occurred', new Error('sample error'));

    const logFile = logger.getLogFilePath();
    assert.ok(fs.existsSync(logFile));
    const content = fs.readFileSync(logFile, 'utf8');
    assert.match(content, /\[INFO\] \[TestTag\] Hello world/);
    assert.match(content, /\[WARN\] \[TestTag\] Warning event/);
    assert.match(content, /\[ERROR\] \[TestTag\] Error occurred/);

    // 2. Read recent logs
    const recent = logger.getRecentLogs(2);
    assert.equal(recent.length, 2);

    // 3. Rotation when size exceeds 200 bytes
    for (let i = 0; i < 15; i++) {
      logger.info('Stress', `Long message line ${i} ` + 'A'.repeat(50));
    }
    // Should have created app.1.log
    assert.ok(fs.existsSync(path.join(tempDir, 'app.1.log')));
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test('logger redacts device identifiers and cookies', () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'hongguo-log-redact-'));
  try {
    const logger = new Logger({ logDir: tempDir, maxSizeBytes: 1024 * 1024 });
    logger.info('PlaybackDevice', 'device_id=1111222233334444 iid=5555666677778888', {
      cookie: 'install_id=secret; store-region=cn',
      device_key: 'abc123',
    });
    const redacted = fs.readFileSync(logger.getLogFilePath(), 'utf8');
    assert.match(redacted, /device_id=\[redacted\]/);
    assert.match(redacted, /iid=\[redacted\]/);
    assert.match(redacted, /"cookie":"\[redacted\]"/);
    assert.match(redacted, /"device_key":"abc123"/);
    assert.doesNotMatch(redacted, /1111222233334444/);
    assert.doesNotMatch(redacted, /install_id=secret/);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});
