import { POSTS, buildArticleHTML, buildFaqSchema } from '../../../lib/content';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const action = searchParams.get('action') || 'list';

  if (action === 'list') {
    return Response.json({
      posts: POSTS.map(p => ({ slug: p.slug, keyword: p.keyword, category: p.category })),
      total: POSTS.length,
    });
  }

  if (slug) {
    const post = POSTS.find(p => p.slug === slug);
    if (!post) return Response.json({ error: 'Not found' }, { status: 404 });

    const html = buildArticleHTML(post, '');
    const date = new Date().toISOString().split('T')[0];

    return Response.json({
      title: `${post.keyword} — 치과 전문의 가이드 (${date.substring(0, 4)})`,
      slug: post.slug,
      content: html,
      excerpt: `${post.situation}을 위한 ${post.angle}. 최신 논문 기반 전문 정보.`,
      keywords: post.keyword.split(' ').filter(w => w.length > 1),
      faqSchema: buildFaqSchema(post.keyword),
    });
  }

  return Response.json({ error: 'slug parameter required' }, { status: 400 });
}
