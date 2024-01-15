import { test, expect } from '@playwright/test';
import { log } from 'console';

test('video post page', async ({ page }) => {
  await page.goto('https://testmonbyh.wewecall.com:6443/hcc-base/login');
  await page.getByRole('tab', { name: '密码登录' }).click();
  await page.getByPlaceholder('邮箱', { exact: true }).click();
  await page.getByPlaceholder('邮箱', { exact: true }).fill('nmg@myhexin.com');
  await page.getByPlaceholder('密码', { exact: true }).click();
  await page.getByPlaceholder('密码', { exact: true }).click();
  await page.getByPlaceholder('密码', { exact: true }).fill('123456abcd');
  await page.getByRole('button', { name: '立即登录' }).click();
  await page.getByText('内容列表').click();
  await page.getByRole('tab', { name: '文章' }).click();
  await page.getByRole('tab', { name: '视频' }).click();
  await page.getByText('发布', { exact: true }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.locator('#cmsBaseApp').getByRole('menu').getByText('视频').click();
  const page1 = await page1Promise;
  await page1.getByRole('button', { name: '点击或将文件拖拽到这里上传' }).click();
  await page1.getByText('返回').click({
    button: 'right'
  });
  await expect(page1.getByText('返回')).toBeVisible();
  await expect(page1.getByRole('button', { name: '点击或将文件拖拽到这里上传' })).toBeVisible();
  await expect(page1.getByPlaceholder('请输入内容来源')).toBeVisible();
  await expect(page1.getByPlaceholder('请输入作者名称')).toBeVisible();
  await expect(page1.getByLabel('渠道平台')).toBeVisible();
  await expect(page1.getByPlaceholder('请输入源网链接')).toBeVisible();
  await expect(page1.getByPlaceholder('请输入标题，不超过30字')).toBeVisible();
  await expect(page1.getByText('设置封面图')).toBeVisible();
  await expect(page1.getByPlaceholder('请输入标题，不超过60字')).toBeVisible();
  await expect(page1.locator('div').filter({ hasText: /^内容理解$/ }).locator('svg')).toBeVisible();
  await expect(page1.locator('#rc_select_1')).toBeVisible();
  await expect(page1.locator('#rc_select_2')).toBeVisible();
  await expect(page1.getByText('添加标签').first()).toBeVisible();
  await expect(page1.getByText('添加标签').nth(1)).toBeVisible();
  await expect(page1.getByRole('button', { name: '预 览' })).toBeVisible();
  await expect(page1.getByRole('button', { name: '存草稿' })).toBeVisible();
  await expect(page1.getByRole('button', { name: '定时发布' })).toBeVisible();
  await expect(page1.getByRole('button', { name: '发 布' })).toBeVisible();
  await expect(page1.locator('#page-creator-home')).toContainText('视频格式支持、推荐使用mp4');
  await expect(page1.locator('#page-creator-home')).toContainText('视频大小时长不超过60分钟，文件大小不超过500M');
  await expect(page1.locator('#page-creator-home')).toContainText('视频分辨率720P（1280*720）及以上分辨率');
});

test('video single search', async ({ page }) => {
  await page.goto('https://testmonbyh.wewecall.com:6443/hcc-base/login');
  await page.getByRole('tab', { name: '密码登录' }).click();
  await page.getByPlaceholder('邮箱', { exact: true }).click();
  await page.getByPlaceholder('邮箱', { exact: true }).fill('nmg@myhexin.com');
  await page.getByPlaceholder('密码', { exact: true }).click();
  await page.getByPlaceholder('密码', { exact: true }).click();
  await page.getByPlaceholder('密码', { exact: true }).fill('123456abcd');
  await page.getByRole('button', { name: '立即登录' }).click();
  await page.getByText('内容列表').click();
  await page.getByRole('tab', { name: '文章' }).click();
  await page.getByRole('tab', { name: '视频' }).click();
  await page.on('request', request => {
    console.log(request.url());
    console.log(request.method());
    console.log('Headers:', request.headers());
    // 若要获取POST请求的Payload，可以这样：
    if (request.postData()) {
      console.log('Post Data:', request.postData());
    }
  });
  await  page.on('response', response => {
    console.log('--- Response ---');
    console.log('URL:', response.url());
    console.log('Status:', response.status());
    console.log('Status Text:', response.statusText());
    console.log('Headers:', response.headers());
    // 若要获取响应体，需要先await response.buffer()或response.text()
    // 注意这可能会消耗大量内存，取决于响应大小
    const body = response.text();
    console.log('Body:', body);
  });
await page.getByRole('textbox', { name: '请输入内容来源' }).click();
await page.getByRole('textbox', { name: '请输入内容来源' }).fill('我');
console.log('hello!');

// 添加请求拦截器并判断是否有返回数据 用route
await page.route('**/api/v1/video/search', route => {
  route.fulfill({
    status: 200,
    body: JSON.stringify({
      "data": {
        "list": [
          {
            "id": 1,
            "title": "测试视频",
            "source": "测试视频",
            "sourceUrl": "测试视频",
            "channel": "测试视频",
        }
    }
}
}
}

await page.getByRole('textbox', { name: '请输入内容来源' }).press('Enter');
// await expect(page.getByRole('cell', { name: '暂无数据' }).locator('div').nth(1)).toBeVisible();
// await expect(page.getByRole('paragraph')).toContainText('暂无数据');
// await page.getByRole('button', { name: '重 置' }).click();

// await page.getByRole('textbox', { name: '请输入内容id' }).click();
// await page.getByRole('textbox', { name: '请输入内容id' }).fill('1');
// await page.getByRole('textbox', { name: '请输入内容id' }).press('Enter');
// await expect(page.getByRole('cell', { name: '暂无数据' }).locator('div').nth(1)).toBeVisible();
// await expect(page.getByRole('paragraph')).toContainText('暂无数据');
// await page.getByRole('button', { name: '重 置' }).click();

// await page.getByRole('textbox', { name: '请输入关键词' }).click();
// await page.getByRole('textbox', { name: '请输入关键词' }).fill('我');
// await page.getByRole('textbox', { name: '请输入关键词' }).press('Enter');
// await expect(page.getByRole('cell', { name: '暂无数据' }).locator('div').nth(1)).toBeVisible();
// await expect(page.getByRole('paragraph')).toContainText('暂无数据');
// await page.getByRole('button', { name: '重 置' }).click();

// await page.getByLabel('视频').locator('#form_item_platformEns').click();
// await page.locator('div').filter({ hasText: /^同花顺$/ }).nth(1).click();
// await expect(page.getByRole('cell', { name: '暂无数据' }).locator('div').nth(1)).toBeVisible();
// await expect(page.getByRole('paragraph')).toContainText('暂无数据');
// await page.getByRole('button', { name: '重 置' }).click();

// await page.locator('#rc-tabs-0-panel-VIDEO > .ant-form > div > div:nth-child(5) > .ant-row > div:nth-child(2) > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').click();
// await page.getByText('草稿').click();
// await page.getByLabel('close-circle').locator('svg').click();
// await page.locator('#rc-tabs-0-panel-VIDEO > .ant-form > div > div:nth-child(5) > .ant-row > div:nth-child(2) > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').click();
// await page.getByText('未发布').click();
// await page.getByLabel('视频').getByText('未发布').click();
// await page.locator('div:nth-child(3) > div > .ant-select-dropdown > div > .rc-virtual-list > .rc-virtual-list-holder > div > .rc-virtual-list-holder-inner > div:nth-child(3) > .ant-select-item-option-content').click();
// await page.getByLabel('视频').getByText('已发布').click();
// await page.getByText('定时发布').click();
// await page.getByRole('button', { name: '重 置' }).click();
// await page.getByRole('textbox', { name: '请输入内容作者' }).click();
// await page.getByRole('textbox', { name: '请输入内容作者' }).fill('同花顺');
// await page.getByRole('textbox', { name: '请输入内容作者' }).press('Enter');
// await page.getByRole('button', { name: '查 询' }).click();
// await page.getByRole('button', { name: '重 置' }).click();
// await page.getByRole('textbox', { name: '请输入实体标签' }).click();
// await page.getByRole('textbox', { name: '请输入实体标签' }).fill('news');
// await page.getByRole('textbox', { name: '请输入实体标签' }).press('Enter');
// await page.getByRole('button', { name: '查 询' }).click();
// await page.getByLabel('视频').locator('#form_item_appId').click();
// await page.getByText('测试-课程').click();
// await page.getByRole('button', { name: '查 询' }).click();
// await page.getByLabel('视频').getByText('测试-课程').click();
// await page.getByText('测试-金币').click();
// await page.getByRole('button', { name: '查 询' }).click();
// await page.getByLabel('视频').getByText('测试-金币').click();
// await page.getByText('资讯-外汇市场').click();
// await page.getByRole('button', { name: '查 询' }).click();
// await page.getByRole('cell', { name: '暂无数据' }).getByRole('img').click();
// await expect(page.getByRole('cell', { name: '暂无数据' }).locator('div').nth(1)).toBeVisible();
// await page.getByRole('textbox', { name: '请输入文本标签' }).click();
// await page.getByRole('textbox', { name: '请输入文本标签' }).fill('test');
// await page.getByRole('button', { name: '查 询' }).click();
// await page.getByRole('button', { name: '重 置' }).click();
// await page.getByRole('textbox', { name: '开始日期' }).click();
// await page.getByTitle('-01-01').locator('div').click();
// await page.getByRole('button', { name: '确 定' }).click();
// await page.getByRole('textbox', { name: '结束日期' }).click();
// await page.getByRole('cell', { name: '28' }).locator('div').click();
// await page.getByRole('button', { name: '确 定' }).click();
// await page.getByRole('button', { name: '查 询' }).click();
// await expect(page.getByRole('cell', { name: '暂无数据' }).locator('div').nth(2)).toBeVisible();
// await expect(page.getByText('暂无数据')).toBeVisible();
});