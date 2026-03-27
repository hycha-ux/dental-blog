import Link from 'next/link';
import{POSTS,getPostBySlug,buildArticleHTML,buildFaqSchema}from'../../../lib/content';
export async function generateStaticParams(){return POSTS.map(p=>({slug:p.slug}))}
export async function generateMetadata({params}){const{slug}=await params;const post=getPostBySlug(slug);if(!post)return{title:'Not found'};return{title:post.keyword+' — 치과 전문의 가이드',description:post.angle}}
export default async function BlogPost({params}){
  const{slug}=await params;
  const post=getPostBySlug(slug);
  if(!post)return(<div style={{textAlign:'center',padding:80}}><h1>글을 찾을 수 없습니다</h1><Link href="/">← 홈으로</Link></div>);
  const html=buildArticleHTML(post,'');
  const faq=buildFaqSchema();
  const date=new Date().toISOString().split('T')[0];
  const faqs=[{q:'임플란트 주위염은 얼마나 흔한가요?',a:'환자의 약 21%에서 발생합니다.'},{q:'초기 증상은?',a:'칫솔질 시 잇몸 출혈, 부종, 발적, 입냄새 악화 등이 나타납니다.'},{q:'흡연자는 더 취약한가요?',a:'네. 비흡연자 대비 약 2배 이상 위험합니다.'}];
  return(<>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:faq}}/>
    <div style={{maxWidth:720,margin:'0 auto',padding:'0 20px'}}>
      <nav style={{padding:'20px 0',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid var(--border)'}}>
        <Link href="/" style={{fontSize:14,color:'var(--dim)',fontWeight:500}}>← 목록으로</Link>
        <span style={{fontSize:20}}>🦷</span>
      </nav>
      <header style={{padding:'48px 0 32px'}}>
        <div style={{display:'inline-block',background:'var(--accent-bg)',color:'var(--accent)',padding:'4px 12px',borderRadius:6,fontSize:12,fontWeight:600,marginBottom:14}}>{post.category}</div>
        <h1 style={{fontSize:30,fontWeight:800,lineHeight:1.35,letterSpacing:'-.5px',marginBottom:12}}>{post.keyword}</h1>
        <p style={{fontSize:15,color:'var(--dim)',lineHeight:1.6}}>{post.angle}</p>
        <div style={{marginTop:16,fontSize:13,color:'var(--dim)',display:'flex',gap:16}}><span>📅 {date}</span><span>🦷 치의학 전문 콘텐츠</span></div>
      </header>
      <article className="article-body" dangerouslySetInnerHTML={{__html:html}} style={{paddingBottom:40}}/>
      <section style={{background:'var(--accent-bg)',borderRadius:'var(--r)',padding:'28px 24px',marginBottom:40}}>
        <h2 style={{fontSize:18,fontWeight:700,marginBottom:16}}>자주 묻는 질문</h2>
        {faqs.map((f,i)=>(<div key={i} style={{marginBottom:i<2?16:0,paddingBottom:i<2?16:0,borderBottom:i<2?'1px solid var(--border)':'none'}}>
          <div style={{fontSize:15,fontWeight:600,marginBottom:6}}>Q. {f.q}</div>
          <div style={{fontSize:14,color:'var(--txt2)',lineHeight:1.6}}>{f.a}</div>
        </div>))}
      </section>
      <section style={{paddingBottom:60}}>
        <h3 style={{fontSize:16,fontWeight:700,marginBottom:14}}>다른 글도 읽어보세요</h3>
        <div style={{display:'grid',gap:10}}>
          {POSTS.filter(p=>p.slug!==slug).slice(0,4).map(p=>(<Link key={p.slug} href={'/blog/'+p.slug} style={{display:'block',padding:'14px 16px',background:'var(--card)',border:'1px solid var(--border)',borderRadius:10,fontSize:14,fontWeight:500,color:'var(--txt)',textDecoration:'none'}}>{p.keyword}</Link>))}
        </div>
      </section>
      <footer style={{textAlign:'center',padding:'24px 0 48px',borderTop:'1px solid var(--border)',fontSize:12,color:'var(--dim)'}}>⚠ 본 글은 학술 논문 기반 일반 건강 정보이며, 전문의 진료를 대신하지 않습니다.</footer>
    </div>
  </>);
}