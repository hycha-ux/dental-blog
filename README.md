# 🦷 치과 임플란트 블로그 — 완전 무료 운영

Next.js + Vercel 기반 치과 전용 블로그 사이트.
방문자가 직접 글을 읽을 수 있고, 관리자 페이지에서 HTML을 복사해 네이버/티스토리에도 발행할 수 있습니다.

## 💰 비용: 전부 무료

| 항목 | 비용 |
|------|------|
| Vercel 호스팅 | 무료 (개인) |
| 도메인 | 무료 (xxx.vercel.app) |
| 이미지 | 무료 (Unsplash, 선택) |
| DB | 불필요 |
| 워드프레스 | 불필요 |

## 🚀 Vercel 배포 (5분)

### 1. GitHub에 올리기

```bash
cd dental-blog
git init
git add .
git commit -m "initial"
git remote add origin https://github.com/YOUR_ID/dental-blog.git
git branch -M main
git push -u origin main
```

### 2. Vercel 연결

1. vercel.com → GitHub 로그인
2. Add New Project → dental-blog 선택 → Import
3. (선택) Environment Variables에 UNSPLASH_ACCESS_KEY 입력
4. Deploy 클릭 → 완료!

## 📄 사이트 구조

| 페이지 | 용도 |
|--------|------|
| `/` | 블로그 홈 — 카테고리별 글 목록 |
| `/blog/[slug]` | 개별 글 — SEO 최적화, FAQ 스키마 포함 |
| `/admin` | 관리자 — HTML 복사 도구 (네이버/티스토리용) |
| `/api/generate` | API — 프로그래밍 방식 접근 |

## ✏️ 키워드 추가

`lib/content.js`의 POSTS 배열에 추가:

```js
{
  slug: 'url-friendly-slug',
  keyword: '검색 키워드',
  situation: '타겟 환자 상황',
  angle: '글의 핵심 각도',
  category: '카테고리명',
  imageQuery: 'unsplash search',
},
```

git push 하면 Vercel이 자동 재배포합니다.
