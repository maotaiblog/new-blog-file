import fs from 'fs';
import path from 'path';

const DOMAIN = 'maotaiblog.com';
const INDEXNOW_KEY = 'fa8d9e2c4b1a7d3e'; // IndexNow 秘钥
const KEY_FILE = `${INDEXNOW_KEY}.txt`;

// 站内核心高权重 URL 清单
const urlsToSubmit = [
  `https://${DOMAIN}/`,
  `https://${DOMAIN}/rank`,
  `https://${DOMAIN}/apple-id`,
  `https://${DOMAIN}/blog/2026-ultimate-airport-recommendation-guide-part1`,
  `https://${DOMAIN}/blog/airport-evaluation-whitepaper-full-2026`,
  `https://${DOMAIN}/blog/agent-troubleshooting-sop-2026`,
  `https://${DOMAIN}/blog/singbox-clash-guide`
];

async function submitIndexNow() {
  console.log(`🚀 开始发起 IndexNow 极速收录推送 (${urlsToSubmit.length} 个核心 URL)...`);

  const payload = {
    host: DOMAIN,
    key: INDEXNOW_KEY,
    keyLocation: `https://${DOMAIN}/${KEY_FILE}`,
    urlList: urlsToSubmit
  };

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok || response.status === 202) {
      console.log('✅ IndexNow 极速收录推送成功！HTTP 状态码:', response.status);
    } else {
      console.error('❌ IndexNow 推送返回异常状态:', response.status, await response.text());
    }
  } catch (err) {
    console.error('❌ IndexNow 请求失败:', err.message);
  }
}

// 确保在 public 目录下自动生成 IndexNow Key 验证文件
const publicKeyPath = path.join(process.cwd(), 'public', KEY_FILE);
fs.writeFileSync(publicKeyPath, INDEXNOW_KEY, 'utf-8');
console.log(`🔑 验证文件已生成于: ${publicKeyPath}`);

submitIndexNow();
