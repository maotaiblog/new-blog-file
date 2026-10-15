import fs from 'node:fs';
import path from 'node:path';

const origin = 'https://maotaiblog.com';
const host = new URL(origin).host;
const key = 'fa8d9e2c4b1a7d3e';
const keyFile = `${key}.txt`;
const keyLocation = `${origin}/${keyFile}`;

const inputs = process.argv.slice(2);
if (inputs.length === 0 || inputs.includes('--help')) {
  console.log('部署完成后运行：npm run indexnow -- /已更新的路径/ [/另一条路径/]');
  process.exit(inputs.includes('--help') ? 0 : 1);
}

const localKey = path.join(process.cwd(), 'public', keyFile);
if (!fs.existsSync(localKey) || fs.readFileSync(localKey, 'utf8').trim() !== key) {
  throw new Error(`IndexNow 验证文件缺失或内容不匹配：public/${keyFile}`);
}

const urlList = [...new Set(inputs.map(input => {
  const url = new URL(input, origin);
  if (url.protocol !== 'https:' || url.host !== host || url.search || url.hash) {
    throw new Error(`只允许提交本站不含参数的 HTTPS 页面 URL：${input}`);
  }
  if (url.pathname !== '/' && !url.pathname.endsWith('/')) {
    url.pathname += '/';
  }
  return url.toString();
}))];

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});

if (!response.ok && response.status !== 202) {
  throw new Error(`IndexNow 提交失败 (${response.status})：${await response.text()}`);
}

console.log(`IndexNow 已接收 ${urlList.length} 个 URL (${response.status})。请到 Bing Webmaster Tools 查看后续抓取状态。`);
