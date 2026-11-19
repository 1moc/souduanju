const { test } = require('node:test');
const assert = require('node:assert/strict');
const { homepageBoard } = require('../../src/server/native/catalog');
test('homepage boards preserve hot ranks and sort distinct dated entries for the recent list', () => {
  const entry = (id, created, rank) => ({ series_id: id, series_title: '剧' + id, create_time: created, rank });
  const sections = [{ tab_type: 'all', video_list: [entry('2', 20, 1), entry('3', null, 2)] },
    { tab_type: 'ai', video_list: [entry('4', 40, 1), entry('2', 20, 2)] }];
  const html = 'window._ROUTER_DATA = ' + JSON.stringify({ loaderData: { page: { homeSections: sections } } });
  assert.deepEqual(homepageBoard(html, 'new-drama').results.map(i => i.series_id), ['4', '2']);
  assert.deepEqual(homepageBoard(html, 'hot-ai-drama').results.map(i => i.rank), [1, 2]);
  assert.throws(() => homepageBoard('test', 'new-drama'));
});
