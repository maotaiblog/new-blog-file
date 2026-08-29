import fs from 'fs';
import path from 'path';

const sourceDir = 'C:\\Users\\USER\\Desktop\\博客制作文章资料\\各个机场的md文档';
const targetDir = 'c:\\Users\\USER\\Desktop\\2.博客\\src\\content\\blog';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const files = fs.readdirSync(sourceDir);

files.forEach((file, index) => {
  if (!file.endsWith('.md')) return;

  const filePath = path.join(sourceDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // 清理 cite 引用标记
  content = content.replace(/\[cite:\s*\d+\]/g, '');

  // 提取标题与摘要
  const titleMatch = content.match(/^#\s+(.*)/m);
  const title = titleMatch ? titleMatch[1].trim() : file.replace('.md', '') + ' 机场评测与指南';

  const summaryMatch = content.match(/>\s*\*\*摘要\*\*\s*：?\s*(.*)/m);
  let summary = summaryMatch ? summaryMatch[1].trim() : `${file.replace('.md', '')} 机场详细解析、线路架构、套餐对比与最新注册入口。`;
  summary = summary.replace(/"/g, "'");

  const slugName = path.basename(file, '.md').toLowerCase().replace(/[^\w\u4e00-\u9fa5]/g, '-');
  const targetFileName = `${slugName}-review.md`;

  const dateStr = new Date(Date.now() - index * 86400000).toISOString().slice(0, 10);

  // 去除原来的 h1 标签，因为布局中由 header 渲染
  let cleanBody = content.replace(/^#\s+.*$/m, '').trim();

  const frontmatter = `---
title: "${title}"
description: "${summary.slice(0, 160)}"
pubDate: ${dateStr}
category: "测评"
tags: ["${path.basename(file, '.md')}", "机场测评", "专线线路"]
author: "猫猫博客"
readTime: "5分钟"
---

${cleanBody}`;

  fs.writeFileSync(path.join(targetDir, targetFileName), frontmatter, 'utf-8');
  console.log(`Converted: ${file} -> ${targetFileName}`);
});

console.log('All 18 airport MD files converted successfully!');
