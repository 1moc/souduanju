// SPDX-License-Identifier: AGPL-3.0-only

const EMPTY_RESPONSE = '上游接口返回了空内容（HTTP 200，没有正文）。观看记录没有被清除。再生成一个设备 ID 不能让服务端开始返回数据；请稍后重试。若一直如此，说明这次请求没有得到授权，需要使用官方授权的客户端。';
const AUTH_REJECTED = '上游拒绝了这次设备授权。观看记录没有被清除，应用也不会改用其他身份。请使用已获授权的官方方式观看。';
const DEVICE_REGISTRATION_FAILED = '设备注册没有完成。原有观看记录和已经保存的设备都没有被覆盖，请检查网络后重试。';

function classifyPlaybackError(error) {
  const status = Number(error?.status || error?.response?.status || 0);
  const code = String(error?.code || '');
  if (status === 401 || status === 403 || code === 'AUTH_REJECTED' || code === 'REGISTRATION_REJECTED') {
    return { code: 'AUTH_REJECTED', message: AUTH_REJECTED };
  }
  if (code === 'EMPTY_RESPONSE' || error?.emptyResponse === true) {
    return { code: 'EMPTY_RESPONSE', message: EMPTY_RESPONSE };
  }
  if (code === 'DEVICE_REGISTRATION_FAILED') {
    return { code: 'DEVICE_REGISTRATION_FAILED', message: DEVICE_REGISTRATION_FAILED };
  }
  return null;
}

module.exports = {
  EMPTY_RESPONSE,
  AUTH_REJECTED,
  DEVICE_REGISTRATION_FAILED,
  classifyPlaybackError,
};
