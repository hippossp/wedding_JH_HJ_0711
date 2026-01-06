# wedding_card (카카오톡 공유용 모바일 청첩장)

이 프로젝트는 **Vite + React + Tailwind** 기반의 모바일 청첩장 웹페이지입니다.  
배포한 뒤 **카카오톡으로 링크를 공유**하면, `index.html`의 **Open Graph(OG) 메타 태그**를 기반으로 미리보기가 표시됩니다.

## 로컬 실행

### 1) Node.js 설치
- Windows 기준: Node.js **LTS 버전** 설치 권장

설치 후 터미널에서 아래가 동작해야 합니다:

```bash
node -v
npm -v
```

### 2) 설치/실행

```bash
npm install
npm run dev
```

## 배포 (추천: Vercel)

### 방법 A) GitHub → Vercel (가장 쉬움)
- **GitHub에 이 폴더를 업로드**
- Vercel에서 **New Project → Import Git Repository**로 가져오기
- Project Name을 `jh-hj-wedding-0711` 처럼 정하면 주소가 아래처럼 고정됩니다:
  - `https://jh-hj-wedding-0711.vercel.app`
- Framework는 자동으로 Vite로 잡히며, 기본값으로 배포됩니다
  - **Build Command**: `npm run build`
  - **Output Directory**: `dist`

배포가 끝나면 Vercel이 URL을 줍니다. 그 URL을 카카오톡에 공유하면 됩니다.

### 방법 B) Netlify (선택)
- 동일하게 GitHub 연동 후 배포
  - **Build Command**: `npm run build`
  - **Publish directory**: `dist`

## 카카오톡 미리보기(OG) 설정

OG 메타 태그는 루트 `index.html`에 있습니다.

- **제목/설명 변경**: `og:title`, `og:description`, `<title>`, `description` 수정
- **대표 이미지 변경(중요)**: `public/og.png` 파일을 넣으면 자동으로 적용됩니다
  - 배포 후: `https://<배포도메인>/og.png`

카카오톡은 미리보기를 캐싱할 수 있습니다. 변경 후 반영이 느리면 카카오 “공유 디버거”에서 강제 갱신을 시도해보세요:
- `https://developers.kakao.com/tool/debugger/sharing`


