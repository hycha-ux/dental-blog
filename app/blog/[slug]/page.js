import Link from 'next/link';
import { POSTS, getPostBySlug, buildArticleHTML, buildFaqSchema } from '../../../lib/content';

export async function generateStaticParams() {
  return POSTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: '글을 찾을 수 없습니다' };
  return {
    title: `${post.keyword} — 치과 전문의 가이드`,
    description: `${post.situation}을 위한 ${post.angle}. 최신 논문 기반 전문 정보.`,
    keywords: post.keyword.split(' ').filter(w => w.length > 1).join(', '),
    openGraph: {
      title: post.keyword,
      description: post.angle,
      type: 'article',
    },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div style={{ textAlign: 'center', padding: 80 }}>
        <h1>글을 찾을 수 없습니다</h1>
        <Link href="/">← 홈으로 돌아가기</Link>
      </div>
    );
  }

  // Unsplash 이미지 (빌드 타임에 가져옴)
  let imageUrl = '';
  const unsplashKey = process.env.UNSPLASH_ACCESS_KEY;
  if (unsplashKey) {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(post.imageQuery)}&per_page=1&orientation=landscape&content_filter=high`,
        { headers: { Authorization: `Client-ID ${unsplashKey}` }, next: { revalidate: 86400 } }
      );
      if (res.ok) {
        const data = await res.json();
        if (data.results?.[0]) imageUrl = data.results[0].urls.regular;
      }
    } catch (e) {}
  }

  const articleHTML = buildArticleHTML(post, imageUrl);
  const faqSchema = buildFaqSchema(post.keyword);
  const date = new Date().toISOString().split('T')[0];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema }}
      />

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 20px' }}>

        {/* 상단 네비 */}
        <nav style={{
          padding: '20px 0', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', borderBottom: '1px solid var(--border)',
        }}>
          <Link href="/" style={{ fontSize: 14, color: 'var(--dim)', fontWeight: 500 }}>
            ← 목록으로
          </Link>
          <span style={{ fontSize: 20 }}>🦷</span>
        </nav>

        {/* 글 헤더 */}
        <header style={{ padding: '48px 0 32px' }}>
          <div style={{
            display: 'inline-block', background: 'var(--accent-bg)',
            color: 'var(--accent)', padding: '4px 12px', borderRadius: 6,
            fontSize: 12, fontWeight: 600, marginBottom: 14,
          }}>
            {post.category}
          </div>
          <h1 style={{
            fontSize: 30, fontWeight: 800, lineHeight: 1.35,
            letterSpacing: '-.5px', marginBottom: 12,
          }}>
            {post.keyword}
          </h1>
          <p style={{ fontSize: 15, color: 'var(--dim)', lineHeight: 1.6 }}>
            {post.angle}
          </p>
          <div style={{
            marginTop: 16, fontSize: 13, color: 'var(--dim)',
            display: 'flex', gap: 16,
          }}>
            <span>📅 {date}</span>
            <span>🦷 치의학 전문 콘텐츠</span>
          </div>
        </header>

        {/* 본문 */}
        <article
          className="article-body"
          dangerouslySetInnerHTML={{ __html: articleHTML }}
          style={{ paddingBottom: 40 }}
        />

        {/* FAQ 섹션 */}
        <section style={{
          background: 'var(--accent-bg)', borderRadius: 'var(--r)',
          padding: '28px 24px', marginBottom: 40,
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>
            자주 묻는 질문
          </h2>
          {[
            { q: '임플란트 주위염은 얼마나 흔한가요?', a: '2025년 AO/AAP 메타분석에 따르면 환자의 약 21%에서 주위염이 발생합니다.' },
            { q: '임플란트 주위염 초기 증상은?', a: '칫솔질 시 잇몸 출혈, 부종, 발적, 입냄새 악화 등이 나타납니다.' },
            { q: '흡연자는 임플란트 주위염에 더 취약한가요?', a: '네. 흡연자의 주위염 발생 위험은 비흡연자 대비 약 2배 이상입니다.' },
          ].map((faq, i) => (
            <div key={i} style={{
              marginBottom: i < 2 ? 16 : 0,
              paddingBottom: i < 2 ? 16 : 0,
              borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>
                Q. {faq.q}
              </div>
              <div style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.6 }}>
                {faq.a}
              </div>
            </div>
          ))}
        </section>

        {/* 다른 글 추천 */}
        <section style={{ paddingBottom: 60 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>
            다른 글도 읽어보세요
          </h3>
          <div style={{ display: 'grid', gap: 10 }}>
            {POSTS.filter(p => p.slug !== slug).slice(0, 4).map(p => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                style={{
                  display: 'block', padding: '14px 16px',
                  background: 'var(--card)', border: '1px solid var(--border)',
                  borderRadius: 10, fontSize: 14, fontWeight: 500,
                  color: 'var(--txt)', textDecoration: 'none',
                }}
              >
                {p.keyword}
              </Link>
            ))}
          </div>
        </section>

        {/* 푸터 */}
        <footer style={{
          textAlign: 'center', padding: '24px 0 48px',
          borderTop: '1px solid var(--border)',
          fontSize: 12, color: 'var(--dim)',
        }}>
          ⚠ 본 글은 학술 논문 기반 일반 건강 정보이며, 전문의 진료를 대신하지 않습니다.
        </footer>
      </div>
    </>
  );
}
