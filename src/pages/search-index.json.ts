import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog');
  
  const searchIndex = posts.map(post => ({
    title: post.data.title,
    description: post.data.description,
    slug: post.slug,
    category: post.data.category,
    tags: post.data.tags || [],
    pubDate: post.data.pubDate.toISOString().slice(0, 10),
  }));

  return new Response(JSON.stringify(searchIndex), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}
