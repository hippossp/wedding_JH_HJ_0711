# 방명록 DB 설정

## 1. Supabase 테이블 생성

Supabase 프로젝트를 만든 뒤 SQL Editor에서 아래 파일 내용을 실행합니다.

```text
docs/supabase-guestbook.sql
```

## 2. Vercel 환경변수

Vercel 프로젝트 Settings -> Environment Variables에 아래 값을 추가합니다.

```text
SUPABASE_URL=<Supabase Project URL>
SUPABASE_SERVICE_ROLE_KEY=<Supabase service_role key>
GUESTBOOK_ADMIN_PASSWORD=<관리자 비밀번호>
```

주의: `SUPABASE_SERVICE_ROLE_KEY`는 절대 브라우저 코드나 GitHub에 올리면 안 됩니다.

## 3. 반영

환경변수를 추가한 뒤 Vercel에서 재배포하면 방명록 API가 DB와 연결됩니다.

## 기능 요약

- 하객 입력: 신랑측/신부측, 이름, 방명록 내용
- 일반 공개: 이름, 측, 작성 시간만 표시
- 내용 공개: 작성자 본인 기기 또는 관리자 비밀번호 입력 시 표시
- 작성자: 같은 기기에서 본인 글 수정/삭제 가능
- 관리자: 관리자 비밀번호로 전체 내용 조회/삭제 가능

