import './globals.css';

export const metadata = {
  title: '치과 임플란트 정보 블로그 | 논문 기반 전문 가이드',
  description: '임플란트 주위염, 뼈이식, 수술 후 관리까지. 치의학 논문에 기반한 신뢰할 수 있는 임플란트 정보를 제공합니다.',
  keywords: '임플란트, 임플란트 주위염, 뼈이식, 치과 임플란트, 임플란트 관리',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
