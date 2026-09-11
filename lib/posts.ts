import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'src', 'content', 'blog');

export interface PostData {
  slug: string;
  title: string;
  pubDate: string;
  description: string;
  category: string;
  tags?: string[];
  readTime?: string;
  contentHtml?: string;
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

      return {
        slug,
        title: matterResult.data.title || slug,
        pubDate,
        description: matterResult.data.description || '',
        category: matterResult.data.category || '测评',
        tags: matterResult.data.tags || [],
        readTime: matterResult.data.readTime || '5分钟',
      };
    });

  return allPostsData.sort((a, b) => (a.pubDate < b.pubDate ? 1 : -1));
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

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  const pubDate = matterResult.data.pubDate
    ? new Date(matterResult.data.pubDate).toISOString().slice(0, 10)
    : '2026-08-28';

  return {
    slug,
    title: matterResult.data.title || slug,
    pubDate,
    description: matterResult.data.description || '',
    category: matterResult.data.category || '测评',
    tags: matterResult.data.tags || [],
    readTime: matterResult.data.readTime || '5分钟',
    contentHtml,
  };
}
