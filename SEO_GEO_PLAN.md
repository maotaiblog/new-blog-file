# Bing SEO/GEO 修复与上线核对

2026-10-15 的 Bing Recommendations 导出显示：多 H1 影响 1 页，短 meta description 影响 4 页；IndexNow 与高质量外链各有 1 条站点级建议。导出是汇总表，没有受影响页面的 URL，因此应以本次构建审计和 Bing 的具体页面明细复核。

## 本次源码处理

- 文章正文渲染后的一级标题统一降为 H2，页面模板保留唯一 H1；共享账号池组件的标题改为 H2。
- 为较短或笼统的页面与文章描述补充独立摘要，描述页面真实提供的内容。
- 文章页显示与 `TechArticle.author` 相同的作者，明确内容更新日期，并链接到评测方法和编辑政策，便于读者核对结论。
- 删除旧版静态 robots.txt、sitemap.xml 与 sitemap-index.xml，保留 App Router 的 `app/robots.ts` 和 `app/sitemap.ts`；旧生成器曾列出已不存在的分类页。
- IndexNow 改为部署后的按需提交命令，避免构建时提交尚未上线的 URL，也避免重复推送固定的旧 URL 列表。

## 发布流程

1. 运行 `npm ci`、`npm run build` 和 `npm run audit:seo`。检查 `out/robots.txt`、`out/sitemap.xml`，并确认站点根目录可访问现有 IndexNow 密钥文件。
2. 部署静态导出，确认新页面已经从线上地址返回 200，canonical 指向带末尾斜杠的正式 URL。
3. 只提交实际新增、更新或删除的页面。例如：`npm run indexnow -- /blog/ /blog/浪网-review/`。在 Bing Webmaster Tools 的 IndexNow 报告确认接收；接收不等于收录。
4. 在 Bing Recommendations 下载对应错误类型的页面 URL 明细，逐页复查 H1 与 meta description。等待 Bing 重新抓取后再看建议是否消失。

## 内容与外链工作

- 在评测正文保留可核查的数据来源、测试日期、网络环境、样本量与限制。不要把公开套餐参数表述为独立实测。
- 给重要专题加清晰的问答式小节、结论与方法链接，让正文内容可直接被搜索和 AI 摘要引用；结构化数据要与可见内容一致。
- 外链建议属于站外工作：优先发布可引用的原始测试数据与方法，向相关技术社区分享有价值的内容，观察自然引用和 Bing 的 referring domains。不要购买批量链接。
