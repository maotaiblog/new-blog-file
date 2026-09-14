import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import { getTopicBySlug, TopicCluster } from './topics';

const postsDirectory = path.join(process.cwd(), 'src', 'content', 'blog');

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export interface PostData {
  slug: string;
  title: string;
  pubDate: string;
  updatedDate?: string;
  description: string;
  category: string;
  tags?: string[];
  readTime?: string;
  contentHtml?: string;
  headings?: HeadingItem[];
  topic?: TopicCluster;
}

export function getSortedPostsData(): PostData[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf-8');
      const matterResult = matter(fileContents);

      const pubDate = matterResult.data.pubDate
        ? new Date(matterResult.data.pubDate).toISOString().slice(0, 10)
        : '2026-08-28';
      const updatedDate = matterResult.data.updatedDate
        ? new Date(matterResult.data.updatedDate).toISOString().slice(0, 10)
        : undefined;

      const category = matterResult.data.category || '机场测评';
      const tags = matterResult.data.tags || [];
      const topic = getTopicBySlug(slug, category, tags);

      return {
        slug,
        title: matterResult.data.title || slug,
        pubDate,
        updatedDate,
        description: matterResult.data.description || '',
        category,
        tags,
        readTime: matterResult.data.readTime || '6分钟',
        topic
      };
    });

  return allPostsData.sort((a, b) => (a.pubDate < b.pubDate ? 1 : -1));
}

export function getPostsByTopic(topicId: string): PostData[] {
  const allPosts = getSortedPostsData();
  return allPosts.filter(p => p.topic?.id === topicId);
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): PostData[] {
  const allPosts = getSortedPostsData();
  const currentPost = allPosts.find(p => p.slug === currentSlug);
  if (!currentPost) return allPosts.slice(0, limit);

  // 优先匹配相同 Topic，排除自己
  const sameTopic = allPosts.filter(p => p.slug !== currentSlug && p.topic?.id === currentPost.topic?.id);
  if (sameTopic.length >= limit) {
    return sameTopic.slice(0, limit);
  }

  // 补充其他文章
  const otherPosts = allPosts.filter(p => p.slug !== currentSlug && p.topic?.id !== currentPost.topic?.id);
  return [...sameTopic, ...otherPosts].slice(0, limit);
}

export async function getPostData(slug: string): Promise<PostData | null> {
  const fullPathMd = path.join(postsDirectory, `${slug}.md`);
  const fullPathMdx = path.join(postsDirectory, `${slug}.mdx`);
  let fullPath = '';

  if (fs.existsSync(fullPathMd)) {
    fullPath = fullPathMd;
  } else if (fs.existsSync(fullPathMdx)) {
    fullPath = fullPathMdx;
  } else {
    // 兼容解码文件名
    const decodedSlug = decodeURIComponent(slug);
    const decodedMd = path.join(postsDirectory, `${decodedSlug}.md`);
    if (fs.existsSync(decodedMd)) {
      fullPath = decodedMd;
    } else {
      return null;
    }
  }

  const fileContents = fs.readFileSync(fullPath, 'utf-8');
  const matterResult = matter(fileContents);

  // 提取 Markdown 中的 h2 和 h3 标题作为目录 TOC
  const headings: HeadingItem[] = [];
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  while ((match = headingRegex.exec(matterResult.content)) !== null) {
    const level = match[1].length;
    const rawText = match[2].trim();
    // 清理 markdown 标签或格式
    const cleanText = rawText.replace(/\[cite:\s*\d+\]/g, '').replace(/\*\*/g, '').trim();
    const id = cleanText.toLowerCase().replace(/[^a-zA-Z0-9\u4e00-\u9fa5]+/g, '-').replace(/^-|-$/g, '') || `section-${headings.length}`;
    headings.push({ id, text: cleanText, level });
  }

  // 清理任何残留的引用标签与异常标记
  const cleanContent = matterResult.content.replace(/\[cite:[^\]]*\]/g, '');

  const processedContent = await remark()
    .use(remarkGfm)
    .use(html)
    .process(cleanContent);
  let contentHtml = processedContent.toString();

  // 为 h2, h3 自动注入 id 属性以便锚点跳转
  headings.forEach(h => {
    // 匹配 <h2>...h.text...</h2> 并注入 id
    const tag = `h${h.level}`;
    const escapedText = h.text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    const regex = new RegExp(`<${tag}>([\\s\\S]*?` + escapedText + `[\\s\\S]*?)<\/${tag}>`, 'i');
    contentHtml = contentHtml.replace(regex, `<${tag} id="${h.id}">$1</${tag}>`);
  });

  const pubDate = matterResult.data.pubDate
    ? new Date(matterResult.data.pubDate).toISOString().slice(0, 10)
    : '2026-08-28';
  const updatedDate = matterResult.data.updatedDate
    ? new Date(matterResult.data.updatedDate).toISOString().slice(0, 10)
    : undefined;

  const category = matterResult.data.category || '机场测评';
  const tags = matterResult.data.tags || [];
  const topic = getTopicBySlug(slug, category, tags);

  return {
    slug,
    title: matterResult.data.title || slug,
    pubDate,
    updatedDate,
    description: matterResult.data.description || '',
    category,
    tags,
    readTime: matterResult.data.readTime || '6分钟',
    contentHtml,
    headings,
    topic
  };
}
