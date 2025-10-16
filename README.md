# GlobalNomad

## 📌 프로젝트 개요
GlobalNomad는 **캘린더 뷰 SDK와 지도 뷰 SDK를 활용하여 예약 가능한 날짜를 설정하고 체험 상품을 예약**할 수 있는 웹 어플리케이션입니다. 사용자는 판매자이자 체험자가 될 수 있으며, 복잡한 UI와 다양한 예약·관리 기능을 통해 실무에 가까운 경험을 제공합니다.

## 🛠 기술 스택
<p align="left"> 
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white"/> 
  <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white"/> 
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white"/> 
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white"/> 
</p>

- **상태 관리** : Zustand (accessToken 상태 및 persist 유지)
- **데이터 관리** : TanStack Query (useQuery / useMutation 기반 hooks 구조화)
- **API 통신** : Axios 기반 커스텀 API 클라이언트 (Swagger 문서 참고)

## 📂 폴더 구조
- **app/** – Next.js App Router 기반 페이지 구조
- **assets/** - 이미지, 아이콘 등 정적 리소스
- **components/** – 재사용 가능한 UI 컴포넌트
- **lib/api/** – Axios 기반 API 요청 함수
- **lib/hooks/** – Tanstack Query 기반 커스텀 훅
- **lib/stores/** – Zustand 전역 상태 관리
- **lib/utils/** – 유틸리티 함수 모음
- **lib/types/** – 전역 타입 정의

## ✨ 주요 기능
- **인증/권한**
  - **Kakao 간편 로그인 구현**
  - Access Token(Zustand) + Refresh Token(쿠키) 관리
  - Axios 인터셉터로 `Authorization: Bearer <token>` 자동 주입
  - 401 응답 시 자동 로그아웃 및 리다이렉트
  - Next.js Middleware로 보호 라우트 접근 시 refreshToken을 검사해 비로그인 사용자를 /signin으로 리다이렉트
  
- **데이터/상태 관리**
  - TanStack Query 기반 비동기 상태 관리
  - extractErrorMessage() 유틸로 일관된 에러 메시지 처리
  - ErrorView 컴포넌트로 에러 및 재시도 UI 제공
  - 페이지네이션으로 대량 데이터 효율적 탐색
  - useMutation + toast 알림 처리
  - useInfiniteQuery로 무한스크롤 처리# GlobalNomad

## 📌 프로젝트 개요
GlobalNomad는 **캘린더 뷰 SDK와 지도 뷰 SDK를 활용하여 예약 가능한 날짜를 설정하고 체험 상품을 예약**할 수 있는 웹 어플리케이션입니다. 사용자는 판매자이자 체험자가 될 수 있으며, 복잡한 UI와 다양한 예약·관리 기능을 통해 실무에 가까운 경험을 제공합니다.

## 🛠 기술 스택
<p align="left"> 
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white"/> 
  <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white"/> 
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white"/> 
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white"/> 
</p>

- **상태 관리** : Zustand (accessToken 상태 및 persist 유지)
- **데이터 관리** : TanStack Query (useQuery / useMutation 기반 hooks 구조화)
- **API 통신** : Axios 기반 커스텀 API 클라이언트 (Swagger 문서 참고)

## 📂 폴더 구조
- **app/** – Next.js App Router 기반 페이지 구조
- **assets/** - 이미지, 아이콘 등 정적 리소스
- **components/** – 재사용 가능한 UI 컴포넌트
- **lib/api/** – Axios 기반 API 요청 함수
- **lib/hooks/** – Tanstack Query 기반 커스텀 훅
- **lib/stores/** – Zustand 전역 상태 관리
- **lib/utils/** – 유틸리티 함수 모음
- **lib/types/** – 전역 타입 정의

## ✨ 주요 기능
- **인증/권한**
  - **Kakao 간편 로그인 구현**
  - Access Token(Zustand) + Refresh Token(쿠키) 관리
  - Axios 인터셉터로 `Authorization: Bearer <token>` 자동 주입
  - 401 응답 시 자동 로그아웃 및 리다이렉트
  - Next.js Middleware로 보호 라우트 접근 시 refreshToken을 검사해 비로그인 사용자를 /signin으로 리다이렉트
  
- **데이터/상태 관리**
  - TanStack Query 기반 비동기 상태 관리
  - extractErrorMessage() 유틸로 일관된 에러 메시지 처리
  - ErrorView 컴포넌트로 에러 및 재시도 UI 제공
  - 페이지네이션으로 대량 데이터 효율적 탐색
  - useMutation + toast 알림 처리
  - useInfiniteQuery로 무한스크롤 처리
  
- **UI/UX**
  - 스켈레톤 UI, 스피너 로딩 상태 표시
  - 반응형 UI 구성
  - **Kakao Map SDK 연동** (주소, 위치, 지도 표시)
  - **캘린더 SDK 기반 예약 가능 날짜 관리**
  - not-found 페이지 제공
  - Toast 알림, 모달 둥 인터랙션 구성
  
- **성능 최적화**
  - useMemo, useCallback, React.memo 적극 활용
  - Zustand 리렌더 최소화
  - **SSG(Static Site Generation) + ISR(Incremental Static Regeneration) 적용(tags 활용)**
  - generateStaticParams로 초기 50개 체험 페이지 미리 렌더링

## 🚀 배포 링크
- [GlobalNomad 바로가기](https://globalnomad-zeta.vercel.app/)
## 🎨 디자인 & 문서
- [Figma 디자인](https://www.figma.com/design/0mPBOCUduoHqA28vmt9arZ/GlobalNomad?node-id=0-1&p=f&t=dOQ20knI8Uwr8ybX-0)
- [Swagger API 문서](https://sp-globalnomad-api.vercel.app/docs/#/)
- [프로젝트 컨벤션](https://chivalrous-barberry-9bb.notion.site/254a83bcc886808b878ef679236ee7c5)
