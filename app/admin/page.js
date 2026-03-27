'use client';
import { useState } from 'react';
import Link from 'next/link';
import { POSTS } from '../../lib/content';

export default function AdminPage() {
  const [selected, setSelected] = useState(null);
  const [copied, setCopied] = useState('');

  function selectPost(idx) {
    setSelected(idx);
    setCopied('');
  }

  function copy(text, label) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(''), 2000);
    });
  }

  const post = selected !== null ? POSTS[selected] : null;
  const date = new Date().toISOString().split('T')[0];

  // 복사용 HTML 생성 (인라인 스타일 포함, 외부 블로그에 바로 붙여넣기 가능)
  function getFullHTML() {
    if (!post) return '';
    const { keyword, situation, angle } = post;
    return `<h1>${keyword}</h1>
<p><em>작성일: ${date} | 치의학 전문 콘텐츠</em></p>

<p>${situation}에 해당하시나요? 이 글은 바로 그런 분들을 위해 준비했습니다. ${angle}에 대해, 최신 연구 논문과 학회 가이드라인을 근거로 상세히 안내해 드리겠습니다.</p>

<h2>문제의 원인과 현황</h2>

<p>최근 한국소비자원 통계에 따르면, 국내 임플란트 시술 건수는 2021년 약 55만 건에서 2023년 약 61만 건으로 꾸준히 증가하고 있습니다.</p>

<p>Galarraga-Vinueza 등이 2025년 <em>Journal of Periodontology</em>에 발표한 AO/AAP 체계적 문헌고찰에 따르면, 임플란트 주위점막염의 환자 수준 유병률은 약 46%, 임플란트 주위염은 약 21%로 보고되었습니다.</p>

<p>특히 <strong>"${keyword}"</strong>와 관련하여, ${situation}의 경우에는 더욱 세심한 주의가 필요합니다.</p>

<h2>논문 기반의 해결책 및 치료 가이드</h2>

<p>대한치주과학회가 2025년 발표한 '임플란트 주위질환 진단 및 치료 가이드라인(2025 KAP Consensus)'에서는 단계별 알고리즘을 체계적으로 제시하고 있습니다.</p>

<ul>
<li><strong>조기 발견이 핵심:</strong> 임플란트에는 치주인대가 없어 자각 증상이 거의 없습니다. 정기 검진이 유일한 조기 발견 방법입니다.</li>
<li><strong>단계별 치료:</strong> 초기 점막염은 스케일링으로 회복 가능. 골 소실 동반 시 외과적 치료가 필요할 수 있습니다.</li>
<li><strong>위험인자 관리:</strong> 치주염 병력(OR 3.84)과 흡연(RR 2.07)이 가장 강력한 위험 인자입니다.</li>
</ul>

<h2>환자가 집에서 할 수 있는 관리 팁</h2>

<p><strong>1. 임플란트 전용 칫솔질법 익히기</strong> — 45도 각도로 잇몸 경계를 부드럽게 닦으세요.</p>
<p><strong>2. 치간칫솔·워터픽 필수 사용</strong> — 매 식후 보조 도구를 함께 사용하세요.</p>
<p><strong>3. 6개월마다 정기 검진</strong> — 방사선 촬영과 탐침 검사를 받으세요.</p>
<p><strong>4. 금연 실천</strong> — 흡연자의 주위염 발생률은 비흡연자의 약 3배입니다.</p>
<p><strong>5. 전신 질환 관리</strong> — 당뇨 등 기저질환을 철저히 관리하세요.</p>

<h2>마무리</h2>

<p>임플란트는 잘 관리하면 10년 이상 사용할 수 있습니다. 매일의 구강 관리와 정기 치과 방문을 꼭 기억해 주세요.</p>

<p><strong>⚠ 본 글은 논문 기반 일반 건강 정보이며, 전문의 진료를 대신하지 않습니다.</strong></p>

<h2>자주 묻는 질문</h2>

<p><strong>Q. 임플란트 주위염은 얼마나 흔한가요?</strong><br/>A. 환자의 약 21%에서 발생합니다 (2025 AO/AAP 메타분석).</p>
<p><strong>Q. 초기 증상은?</strong><br/>A. 칫솔질 시 잇몸 출혈, 부종, 발적, 입냄새 악화 등이 나타납니다.</p>
<p><strong>Q. 흡연자는 더 취약한가요?</strong><br/>A. 네. 비흡연자 대비 약 2배 이상 위험합니다.</p>`;
  }

  function getTitle() {
    if (!post) return '';
    return `${post.keyword} — 치과 전문의 가이드 (${date.substring(0, 4)})`;
  }

  function getExcerpt() {
    if (!post) return '';
    return `${post.situation}을 위한 ${post.angle}. 최신 논문 기반 전문 정보.`;
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 20px 80px' }}>

      {/* 헤더 */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 40, paddingBottom: 20, borderBottom: '1px solid var(--border)',
      }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>✏️ 블로그 관리자</h1>
          <p style={{ fontSize: 13, color: 'var(--dim)', marginTop: 4 }}>
            키워드 선택 → HTML 복사 → 네이버/티스토리에 붙여넣기
          </p>
        </div>
        <Link href="/" style={{
          background: 'var(--accent-bg)', color: 'var(--accent)',
          padding: '8px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600,
        }}>
          🦷 블로그 보기
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24, alignItems: 'start' }}>

        {/* 좌측: 키워드 목록 */}
        <div style={{
          background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 'var(--r)', padding: 16, position: 'sticky', top: 20,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 600, color: 'var(--dim)',
            textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 12,
          }}>
            키워드 선택 ({POSTS.length}개)
          </div>
          {POSTS.map((p, i) => (
            <button
              key={i}
              onClick={() => selectPost(i)}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '10px 12px', marginBottom: 4, borderRadius: 8,
                border: selected === i ? '1px solid var(--accent)' : '1px solid transparent',
                background: selected === i ? 'var(--accent-bg)' : 'transparent',
                cursor: 'pointer', fontFamily: 'inherit',
                fontSize: 13, fontWeight: selected === i ? 600 : 400,
                color: selected === i ? 'var(--accent)' : 'var(--txt2)',
                transition: 'all .15s',
              }}
            >
              {p.keyword}
            </button>
          ))}
        </div>

        {/* 우측: 결과 */}
        <div>
          {!post ? (
            <div style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r)', padding: '60px 40px', textAlign: 'center',
              color: 'var(--dim)',
            }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>👈</div>
              <div style={{ fontSize: 15 }}>왼쪽에서 키워드를 선택하세요</div>
            </div>
          ) : (
            <div>
              {/* 메타 복사 섹션 */}
              <div style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 'var(--r)', padding: 24, marginBottom: 16,
              }}>
                <div style={{
                  fontSize: 11, fontWeight: 600, color: 'var(--dim)',
                  textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16,
                }}>
                  SEO 메타데이터
                </div>

                {[
                  { label: '제목', value: getTitle(), key: 'title' },
                  { label: '메타 설명', value: getExcerpt(), key: 'desc' },
                ].map(item => (
                  <div key={item.key} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    gap: 12, padding: '10px 12px', background: '#f8f9fb',
                    borderRadius: 8, marginBottom: 8,
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 10, color: 'var(--dim)', fontWeight: 600, marginBottom: 2, textTransform: 'uppercase', letterSpacing: 1 }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--txt)', lineHeight: 1.4 }}>
                        {item.value}
                      </div>
                    </div>
                    <button
                      onClick={() => copy(item.value, item.key)}
                      style={{
                        background: copied === item.key ? 'var(--ok)' : 'var(--accent)',
                        color: '#fff', border: 'none', borderRadius: 6,
                        padding: '5px 12px', fontSize: 12, fontWeight: 600,
                        fontFamily: 'inherit', cursor: 'pointer', whiteSpace: 'nowrap',
                      }}
                    >
                      {copied === item.key ? '✓' : '복사'}
                    </button>
                  </div>
                ))}
              </div>

              {/* HTML 복사 버튼 */}
              <div style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 'var(--r)', padding: 24, marginBottom: 16,
              }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16,
                }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: 1.5 }}>
                    본문 HTML
                  </div>
                  <button
                    onClick={() => copy(getFullHTML(), 'html')}
                    style={{
                      background: copied === 'html' ? 'var(--ok)' : 'var(--accent)',
                      color: '#fff', border: 'none', borderRadius: 8,
                      padding: '10px 24px', fontSize: 14, fontWeight: 700,
                      fontFamily: 'inherit', cursor: 'pointer',
                    }}
                  >
                    {copied === 'html' ? '✓ 복사 완료!' : '📋 HTML 전체 복사'}
                  </button>
                </div>

                <div style={{
                  background: '#f4f5f7', borderRadius: 10, padding: 16,
                  maxHeight: 300, overflowY: 'auto',
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
                  lineHeight: 1.6, color: '#666', whiteSpace: 'pre-wrap', wordBreak: 'break-all',
                }}>
                  {getFullHTML()}
                </div>
              </div>

              {/* 미리보기 */}
              <div style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 'var(--r)', padding: 24,
              }}>
                <div style={{
                  fontSize: 11, fontWeight: 600, color: 'var(--dim)',
                  textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16,
                }}>
                  미리보기
                </div>
                <div
                  className="article-body"
                  dangerouslySetInnerHTML={{ __html: getFullHTML() }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
