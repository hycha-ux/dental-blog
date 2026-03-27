import Link from 'next/link';
import { POSTS, getCategories } from '../lib/content';

export default function Home() {
  const categories = getCategories();

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 20px' }}>

      {/* 헤더 */}
      <header style={{
        textAlign: 'center', padding: '60px 0 48px',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🦷</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-.5px', marginBottom: 8 }}>
          임플란트 전문 정보
        </h1>
        <p style={{ color: 'var(--dim)', fontSize: 15, lineHeight: 1.6 }}>
          치의학 논문과 학회 가이드라인에 기반한 신뢰할 수 있는 임플란트 정보
        </p>
        <div style={{
          marginTop: 16, display: 'inline-flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center',
        }}>
          <Link href="/admin" style={{
            background: 'var(--accent)', color: '#fff', padding: '8px 16px',
            borderRadius: 8, fontSize: 13, fontWeight: 600,
          }}>
            ✏️ 관리자 (HTML 복사)
          </Link>
        </div>
      </header>

      {/* 카테고리별 글 목록 */}
      <main style={{ padding: '40px 0 80px' }}>
        {Object.entries(categories).map(([cat, posts]) => (
          <section key={cat} style={{ marginBottom: 48 }}>
            <h2 style={{
              fontSize: 14, fontWeight: 700, color: 'var(--accent)',
              textTransform: 'uppercase', letterSpacing: 1.2,
              marginBottom: 16, paddingBottom: 8,
              borderBottom: '2px solid var(--accent-bg)',
            }}>
              {cat}
            </h2>

            <div style={{ display: 'grid', gap: 12 }}>
              {posts.map(post => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  style={{
                    display: 'block', padding: '18px 20px',
                    background: 'var(--card)', border: '1px solid var(--border)',
                    borderRadius: 'var(--r)', textDecoration: 'none',
                    transition: 'all .15s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(37,99,235,.08)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    fontSize: 16, fontWeight: 600, color: 'var(--txt)',
                    marginBottom: 4, lineHeight: 1.4,
                  }}>
                    {post.keyword}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--dim)', lineHeight: 1.5 }}>
                    {post.situation}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* 푸터 */}
      <footer style={{
        textAlign: 'center', padding: '32px 0', borderTop: '1px solid var(--border)',
        fontSize: 12, color: 'var(--dim)',
      }}>
        ⚠ 본 사이트의 정보는 학술 논문 기반 일반 건강 정보이며, 전문의 진료를 대신하지 않습니다.
      </footer>
    </div>
  );
}
