import fs from 'node:fs';
import path from 'node:path';

const exportDir = path.join(process.cwd(), 'out');
if (!fs.existsSync(exportDir)) {
  throw new Error('缺少 out 目录。请先运行 npm run build。');
}

function htmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(file) : entry.name.endsWith('.html') ? [file] : [];
  });
}

const errors = [];
const shortDescriptions = [];
const files = htmlFiles(exportDir);

for (const file of files) {
  if (/[/\\](?:404|500)\.html$/.test(file)) continue;
  const html = fs.readFileSync(file, 'utf8');
  const relativePath = path.relative(exportDir, file);
  const metaTags = [...html.matchAll(/<meta\b[^>]*>/gi)].map(match => match[0]);
  const robots = metaTags.find(tag => /\bname=["']robots["']/i.test(tag)) || '';
  if (/\bnoindex\b/i.test(robots)) continue;

  const body = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
  const h1Count = (body.match(/<h1\b/gi) || []).length;
  if (h1Count !== 1) errors.push(`${relativePath}: H1 数量为 ${h1Count}`);

  const descriptionTag = metaTags.find(tag => /\bname=["']description["']/i.test(tag));
  const description = descriptionTag?.match(/\bcontent=["']([^"']*)["']/i)?.[1] || '';
  if (!description) errors.push(`${relativePath}: 缺少 meta description`);
  else if ([...description].length < 70) shortDescriptions.push(`${relativePath}: ${[...description].length} 字`);

  const canonical = [...html.matchAll(/<link\b[^>]*>/gi)]
    .some(match => /\brel=["']canonical["']/i.test(match[0]));
  if (!canonical) errors.push(`${relativePath}: 缺少 canonical`);
}

console.log(`检查 ${files.length} 个导出的 HTML 文件。`);
if (shortDescriptions.length) {
  console.warn('较短的页面描述（供人工检查，70 字并非搜索引擎的固定要求）：');
  shortDescriptions.forEach(item => console.warn(`  ${item}`));
}
if (errors.length) {
  errors.forEach(item => console.error(item));
  process.exitCode = 1;
} else {
  console.log('可索引页面的 H1、description 和 canonical 检查通过。');
}
