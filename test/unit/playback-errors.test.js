// SPDX-License-Identifier: AGPL-3.0-only
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { classifyPlaybackError } = require('../../src/server/native/playback-errors');

test('empty upstream body is not classified as an authorization rejection', () => {
  const empty = classifyPlaybackError({ code: 'EMPTY_RESPONSE', emptyResponse: true, status: 200 });
  const denied = classifyPlaybackError({ status: 403, code: 'HTTP_403' });
  assert.equal(empty.code, 'EMPTY_RESPONSE');
  assert.equal(denied.code, 'AUTH_REJECTED');
  assert.match(empty.message, /再生成一个设备 ID 不能/);
  assert.match(denied.message, /不会改用其他身份/);
  assert.doesNotMatch(empty.message, /生成新的设备ID/);
  assert.doesNotMatch(denied.message, /生成新的设备ID/);
});

test('registration failure says existing history and device files stay untouched', () => {
  const failure = classifyPlaybackError({ code: 'DEVICE_REGISTRATION_FAILED' });
  assert.match(failure.message, /没有被覆盖/);
  assert.doesNotMatch(failure.message, /生成新的设备/);
});
