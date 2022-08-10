프로젝트 실행 방법

**사전작업**

- 서버를 내려받고 리드미에 따라 서버를 실행한다
  - [서버 레포지토리 링크](https://github.com/starkoora/wanted-pre-onboarding-challenge-fe-1-api)

**프로젝트 실행**

- 프로젝트 경로 최상단에서 `npm install` 입력해 패키지 설치
- 같은 경로에서 `npm run dev` 입력해 프로젝트 실행
- 프로젝트가 실행되면 브라우저에서 `localhost:5173`으로 접속

**프로젝트 실행시 에러가 생긴다면**

- package-lock.json과 node_modules을 삭제 후 `npm install`를 다시 해본다

# 고민한 점

## login과 signUp의 로직이 거의 비슷한데 분리할 것인가?

결론 : 분리.

<img width="1320" alt="login-hook-vs-signup-hook" src="https://user-images.githubusercontent.com/77876601/183867732-d49950b2-4799-4b61-9fde-2d6fc227785a.png">

위의 코드는 login과 signUp의 비지니스 로직을 분리한 리액트 훅이다.

submitCallback의 response를 받은 함수와 그 다음 동작에 약간 차이가 있다.

# 폴더구조

- controller
  데이터 요청을 하기 위해 endpoint를 가지고 처리를 하는 곳. VIEW와 바로 연결됨
- services
  특정 기능(auth, todo)에 종속되는 로직을 모아놓음
- utils
  특정 기능에 종속되지 않거나 1~2줄의 간단한 함수를 모음

# 사용한 라이브러리

- react(with Typescript)
- react-router-dom
- tailwindcss

# 날짜별 한 일

## 2022. 08. 10.

1. 타입 단언 제거
2. 제네릭 추가
3. type과 DTO 파일 분리 [커밋보기](https://github.com/ysjkof/ysjkof-wanted-pre-onboarding-challenge-fe-1/commit/27b5930f8f5c4eb57fdc94563b00c52459c1e1d3#)
4. todo page의 뷰와 서비스 로직 분리 [커밋보기](https://github.com/ysjkof/ysjkof-wanted-pre-onboarding-challenge-fe-1/commit/e2f8c554678f6789b5f96efbb14b762440c6a5d9)

- 분리 전
<p align="center">
  <img width="400" height="400" alt="todo-list-pre-seperate" src="https://user-images.githubusercontent.com/77876601/183827575-d52cc913-a456-4302-84ed-8bedda25bb58.png">
</p>

- 분리 후
<p align="center">
  <img alt="todo-list-only-view" width="400" height='400' src="https://user-images.githubusercontent.com/77876601/183827586-c1a06ea4-aeef-46b1-9b45-4fd80b986364.png">
  <img alt="todo-list-hook" width="400" height='400' src="https://user-images.githubusercontent.com/77876601/183827596-f031d34b-82dc-4111-bbf2-9f1869d641ed.png">
</p>

1. todoForm 컴포넌트가 submit callback 함수를 받고 submit에서 사용하게 함(이전에는 submit함수를 받음) [커밋보기](https://github.com/ysjkof/ysjkof-wanted-pre-onboarding-challenge-fe-1/commit/67bd8e83fd4c8d95a4af3331803e17985a4e7c5e)
2. login page의 뷰와 서비스 로직 분리 [커밋보기](https://github.com/ysjkof/ysjkof-wanted-pre-onboarding-challenge-fe-1/commit/5cb38300d18300db3ae1e038b8398a67175fd4c7)

- 분리 전
<p align="center">
  <img alt="login-pre-seperate" width="400" height='400'src="https://user-images.githubusercontent.com/77876601/183823549-4a6222d4-6625-4f08-96f9-40edec630eb8.png">
</p>

- 분리 후
<p align="center">
  <img alt="login-only-view" width="400" height='400'src="https://user-images.githubusercontent.com/77876601/183823588-dfe562aa-a673-47ae-849e-3287bd9e759e.png">
  <img alt="login-hook" width="400" height='400'src="https://user-images.githubusercontent.com/77876601/183823599-f8b1d2c4-02d4-482b-8ec5-aac5d8c1fe11.png">
</p>

1. signUp page의 뷰와 서비스 로직 분리 [커밋보기](https://github.com/ysjkof/ysjkof-wanted-pre-onboarding-challenge-fe-1/commit/55613af6253fc3fd783754502ce241d2c0779271)

# 클라이언트 구현 과제 안내

## Assignment 1 - Login / SignUp

- /auth 경로에 로그인 / 회원가입 기능을 개발합니다

  - 로그인, 회원가입을 별도의 경로로 분리해도 무방합니다
  - [x] 최소한 이메일, 비밀번호 input, 제출 button을 갖도록 구성해주세요

- 이메일과 비밀번호의 유효성을 확인합니다

  - [x] 이메일 조건 : 최소 @, . 포함
  - [x] 비밀번호 조건 : 8자 이상 입력
  - [x] 이메일과 비밀번호가 모두 입력되어 있고, 조건을 만족해야 제출 버튼이 활성화 되도록 해주세요

- 로그인 API를 호출하고, 올바른 응답을 받았을 때 루트 경로로 이동시켜주세요
  - [x] 응답으로 받은 토큰은 로컬 스토리지에 저장해주세요
  - [x] 다음 번에 로그인 시 토큰이 존재한다면 루트 경로로 리다이렉트 시켜주세요
  - [x] 어떤 경우든 토큰이 유효하지 않다면 사용자에게 알리고 로그인 페이지로 리다이렉트 시켜주세요

## Assignment 2 - Todo List

Todo List API를 호출하여 Todo List CRUD 기능을 구현해주세요

- 목록 / 상세 영역으로 나누어 구현해주세요

  - [x]Todo 목록을 볼 수 있습니다.
  - [x]Todo 추가 버튼을 클릭하면 할 일이 추가 됩니다.
  - [x]Todo 수정 버튼을 클릭하면 수정 모드를 활성화하고, 수정 내용을 제출하거나 취소할 수 있습니다.
  - [x]Todo 삭제 버튼을 클릭하면 해당 Todo를 삭제할 수 있습니다.

- 한 화면 내에서 Todo List와 개별 Todo의 상세를 확인할 수 있도록 해주세요.

  - [x]새로고침을 했을 때 현재 상태가 유지되어야 합니다.
  - [x]개별 Todo를 조회 순서에 따라 페이지 뒤로가기를 통하여 조회할 수 있도록 해주세요.

- 한 페이지 내에서 새로고침 없이 데이터가 정합성을 갖추도록 구현해주세요
  - [x]수정되는 Todo의 내용이 목록에서도 실시간으로 반영되어야 합니다

### 과제 참고 사항

1. 로컬 서버를 실행했을 때 생성되는 db/db.json이 DB 역할을 하게 됩니다. 해당 파일을 삭제하면 DB는 초기화 됩니다.

2. 로그인 / 회원 가입 기능은 유저를 DB에 추가하고 JWT 토큰을 응답으로 돌려줄 뿐, 실제 유저별로 Todo 목록을 관계 지어 관리하지는 않습니다. (모든 유저가 하나의 Todo를 가짐)

3. 로그아웃은 클라이언트 단에서 localStorage에 저장된 token을 삭제하는 방식으로 간단히 구현해주세요.
