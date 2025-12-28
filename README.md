# 📱 BookMark - 한국 기술 블로그 수집 앱

한국 주요 기술 회사들의 기술 블로그를 자동으로 수집하여 제공하는 RSS 리더 앱입니다.

## 🎯 주요 기능

- ✅ 블로그 리스트 조회 (Ktor 백엔드 연동)
- ✅ Pull-to-refresh 새로고침
- ✅ 북마크 추가/제거 (로컬 MMKV 저장)
- ✅ 외부 링크 열기
- ✅ 공유 기능
- ✅ 다크 테마
- ✅ 빈 상태 화면

## 🛠 기술 스택

- **React Native 0.81.5** + **Expo SDK 54**
- **Expo Router 6** - 파일 기반 라우팅
- **TypeScript** - 타입 안전성
- **Zustand** - 전역 상태 관리
- **react-native-mmkv** - 로컬 북마크 저장
- **axios** - API 통신
- **@expo/vector-icons** - 아이콘

## 📁 프로젝트 구조

```
reactblogcollect/
├── app/                          # Expo Router
│   ├── _layout.tsx              # 루트 레이아웃
│   └── (tabs)/
│       ├── _layout.tsx          # 탭 레이아웃
│       ├── index.tsx            # 홈 화면 - 블로그 리스트
│       └── explore.tsx          # 북마크 화면
│
├── src/
│   ├── store/                   # Zustand 상태 관리
│   │   ├── blogStore.ts
│   │   └── bookmarkStore.ts
│   │
│   ├── hooks/                   # Custom Hooks
│   │   ├── useFetchBlogs.ts
│   │   ├── useBookmark.ts
│   │   └── useLocalBookmarks.ts
│   │
│   ├── api/                     # Network Layer
│   │   ├── client.ts
│   │   └── blogAPI.ts
│   │
│   ├── types/                   # 데이터 모델
│   │   ├── blog.ts
│   │   └── api.ts
│   │
│   ├── services/                # 로컬 저장소
│   │   └── bookmarkService.ts
│   │
│   ├── components/              # UI 컴포넌트
│   │   ├── BlogCard.tsx
│   │   ├── EmptyState.tsx
│   │   └── Header.tsx
│   │
│   ├── constants/               # 상수
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   └── spacing.ts
│   │
│   └── utils/                   # 헬퍼 함수
│       ├── dateFormatter.ts
│       └── urlOpener.ts
```

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env` 파일을 생성하고 백엔드 API URL을 설정하세요:

```bash
EXPO_PUBLIC_API_URL=http://localhost:8080
```

### 3. 개발 서버 실행

```bash
# 개발 서버 시작
npm start

# iOS에서 실행
npm run ios

# Android에서 실행
npm run android

# Web에서 실행
npm run web
```

## 📊 데이터 모델

### Blog (블로그 포스트)

```typescript
interface Blog {
  id: string;
  title: string;
  company: string;
  publishedAt: string;
  url: string;
  feedSourceId: string;
}
```

### Bookmark (북마크)

```typescript
interface Bookmark {
  id: string;
  blogId: string;
  blog: Blog;
  bookmarkedAt: string;
}
```

## 🎨 디자인

- **배경**: `#0F1419` (다크 네이비)
- **카드**: `#1A2332`
- **주 텍스트**: `#FFFFFF`
- **부 텍스트**: `#A8B5C8`
- **강조색**: `#5B7EFF` (블루)
- **카드 모서리**: 12px
- **기본 패딩**: 16px

## 🔌 API 엔드포인트

### GET /api/blogs

블로그 목록 조회

**Query Parameters:**
- `limit` (number, optional): 페이지당 항목 수 (기본값: 20)
- `offset` (number, optional): 오프셋 (기본값: 0)

**Response:**
```json
{
  "blogs": [
    {
      "id": "uuid",
      "title": "블로그 제목",
      "company": "회사명",
      "publishedAt": "2024-01-15T00:00:00Z",
      "url": "https://...",
      "feedSourceId": "feed-id"
    }
  ],
  "total": 100,
  "hasMore": true
}
```

### GET /api/blogs/:id

개별 블로그 조회

**Response:**
```json
{
  "blog": {
    "id": "uuid",
    "title": "블로그 제목",
    "company": "회사명",
    "publishedAt": "2024-01-15T00:00:00Z",
    "url": "https://...",
    "feedSourceId": "feed-id"
  }
}
```

## 💾 로컬 저장소

북마크는 **MMKV**를 사용하여 로컬에 저장됩니다:

- `getAllBookmarks()`: 모든 북마크 조회
- `addBookmark(blog)`: 북마크 추가
- `removeBookmark(blogId)`: 북마크 제거
- `isBookmarked(blogId)`: 북마크 여부 확인

## 📱 화면

### 홈 화면 (`/`)
- 블로그 리스트 표시
- Pull-to-refresh로 새로고침
- 각 카드에서 북마크/공유 가능
- 카드 클릭 시 외부 브라우저에서 링크 열기

### 북마크 화면 (`/explore`)
- 북마크한 블로그 목록
- 빈 상태일 때 안내 메시지 표시
- 북마크 제거 가능

## 🔧 주요 라이브러리

| 라이브러리 | 용도 |
|-----------|------|
| `expo-router` | 파일 기반 라우팅 |
| `zustand` | 상태 관리 |
| `react-native-mmkv` | 고성능 로컬 저장소 |
| `axios` | HTTP 클라이언트 |
| `@expo/vector-icons` | 아이콘 |

## 📝 라이선스

MIT License

## 👨‍💻 개발자

React Native + Expo + TypeScript로 구축된 기술 블로그 수집 앱입니다.
