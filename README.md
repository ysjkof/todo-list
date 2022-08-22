# Todo Lists

- [Todo Lists](#todo-lists)
  - [구현 화면](#구현-화면)
    - [Login Page](#login-page)
    - [Todo List](#todo-list)
  - [프로젝트 실행 방법](#프로젝트-실행-방법)
  - [클라이언트 구현 요구 사항](#클라이언트-구현-요구-사항)
    - [Assignment 1 - Login / SignUp](#assignment-1---login--signup)
    - [Assignment 2 - Todo List](#assignment-2---todo-list)
      - [과제 참고 사항](#과제-참고-사항)
  - [사용한 라이브러리나 프레임워크](#사용한-라이브러리나-프레임워크)
    - [React, Typescript](#react-typescript)
    - [vite.js](#vitejs)
    - [TailwindCSS](#tailwindcss)
    - [tanstack/react-query](#tanstackreact-query)
  - [폴더 구조](#폴더-구조)
  - [고민한 점](#고민한-점)
    - [view, 데이터, 로직의 분리](#view-데이터-로직의-분리)
      - [Todo에 suspense를 적용하는 문제](#todo에-suspense를-적용하는-문제)
  - [커밋 기록](#커밋-기록)
    - [2022. 8. 19.](#2022-8-19)
    - [2022. 8. 18.](#2022-8-18)
    - [2022. 08. 17.](#2022-08-17)
    - [2022. 08. 15.](#2022-08-15)
    - [2022. 08. 12.](#2022-08-12)
    - [2022. 08. 11.](#2022-08-11)
    - [2022. 08. 10.](#2022-08-10)

## 구현 화면

### Login Page

[요구사항](#assignment-1---login--signup)

- 로그인 화면과 루트 보호

![redirect when fail auth route](https://user-images.githubusercontent.com/77876601/185608224-7e61e2f0-b7e8-4772-a250-040340701c6b.gif)

- 이메일과 비밀번호의 유효성을 확인

![login validation](https://user-images.githubusercontent.com/77876601/185608235-8de713c0-722d-4c26-b4b6-84986490b92a.gif)

### Todo List

[요구사항](#assignment-2---todo-list)

- React Suspense를 사용한 로딩 처리

![loading and suspense](https://user-images.githubusercontent.com/77876601/185608238-d9e1ef4a-b1e3-4c18-918e-22ecc8fc3ee7.gif)

- Todo 수정

![edit todo](https://user-images.githubusercontent.com/77876601/185608242-4aa680a2-0401-4fbf-ad4d-0af979b3013d.gif)

- Todo 수정과 삭제

![create and delete todo](https://user-images.githubusercontent.com/77876601/185608255-4660300b-c1e7-4224-8acd-fbabe2fe3e97.gif)

- Todo, 홈버튼, 로그아웃 클릭

![click todo,  home and logout](https://user-images.githubusercontent.com/77876601/185608270-2ade0062-7d41-4e92-bc24-328f6e1a5c62.gif)

## 프로젝트 실행 방법

**서버 실행**

- backend폴더에서 README.md에 따라 서버를 실행한다. [원본 서버 보관소](https://github.com/starkoora/wanted-pre-onboarding-challenge-fe-1-api)

**프로젝트 실행**

- frontend폴더에서 `npm install` 입력해 패키지 설치(node v16.16.0)
- 같은 경로에서 `npm run dev` 입력해 프로젝트 실행
- 프로젝트가 실행되면 브라우저에서 `localhost:5173`으로 접속

**프로젝트 실행시 에러가 생긴다면**

- package-lock.json과 node_modules을 삭제 후 `npm install`를 다시 해본다

## 클라이언트 구현 요구 사항

### Assignment 1 - Login / SignUp

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

### Assignment 2 - Todo List

Todo List API를 호출하여 Todo List CRUD 기능을 구현해주세요

- 목록 / 상세 영역으로 나누어 구현해주세요

  - [x] Todo 목록을 볼 수 있습니다.
  - [x] Todo 추가 버튼을 클릭하면 할 일이 추가 됩니다.
  - [x] Todo 수정 버튼을 클릭하면 수정 모드를 활성화하고, 수정 내용을 제출하거나 취소할 수 있습니다.
  - [x] Todo 삭제 버튼을 클릭하면 해당 Todo를 삭제할 수 있습니다.

- 한 화면 내에서 Todo List와 개별 Todo의 상세를 확인할 수 있도록 해주세요.

  - [x] 새로고침을 했을 때 현재 상태가 유지되어야 합니다.
  - [x] 개별 Todo를 조회 순서에 따라 페이지 뒤로가기를 통하여 조회할 수 있도록 해주세요.

- 한 페이지 내에서 새로고침 없이 데이터가 정합성을 갖추도록 구현해주세요
  - [x] 수정되는 Todo의 내용이 목록에서도 실시간으로 반영되어야 합니다

#### 과제 참고 사항

1. 로컬 서버를 실행했을 때 생성되는 db/db.json이 DB 역할을 하게 됩니다. 해당 파일을 삭제하면 DB는 초기화 됩니다.

2. 로그인 / 회원 가입 기능은 유저를 DB에 추가하고 JWT 토큰을 응답으로 돌려줄 뿐, 실제 유저별로 Todo 목록을 관계 지어 관리하지는 않습니다. (모든 유저가 하나의 Todo를 가짐)

3. 로그아웃은 클라이언트 단에서 localStorage에 저장된 token을 삭제하는 방식으로 간단히 구현해주세요.

## 사용한 라이브러리나 프레임워크

### React, Typescript

[https://reactjs.org](https://reactjs.org)

[https://www.typescriptlang.org](https://www.typescriptlang.org)

### vite.js

프로젝트 빌더 [https://vitejs-kr.github.io/](https://vitejs-kr.github.io/)

- 기존에 설정이 편해서 CRA(Create React App) 사용
- 프로젝트 수정한 게 갱신되지 않아 프로젝트 재시작을 자주하게 됨
  - 이때 2~3초 걸리는 게 낭비가 크다고 느낌
- vite.js라는 걸 알게됨
- [왜 vite를 사용해야 하는지](https://vitejs-kr.github.io/guide/why.html)를 읽어보니 ES Modules과 Go로 작성된 Esbuild를 사용해 빠르다고함.
- 일단 한 번 사용해봄
  - CRA와 사용방법이 같아서 신경 쓸 게 없다
  - 설치 속도가 빠르다!
    - CRA는 다운받고 설치할 때 터미널이 많이 올라가고 시간이 걸리는데 vite는 그런거 없다.
  - 프로젝트 시작하는 속도가 분명히 느껴질만큼 빠르다!
  - 프로젝트 수정 갱신되는 게 분명히 느껴질만큼 빠르다!

### TailwindCSS

css 도구 [https://tailwindcss.com](https://tailwindcss.com)

마크업 하는 속도가 빠릅니다. 왜냐하면,

- 클래스 이름을 생각하지 않아도 되고,
- css 파일에 따로 이동하지 않아도 되고,
- html에 스타일을 바로 입력하면 되기 때문입니다.

물론 컴포넌트로 분리할때는 이름을 지어야겠지만 그 전 단계까지 빠르게 마크업을 할 수 있기 때문에 사용했습니다.

마크업 하는 속도가 빠릅니다. 왜냐하면,

### tanstack/react-query

서버 상태 관리 [https://tanstack.com/query/v4](https://tanstack.com/query/v4)

## 폴더 구조

```
/Users/iseongjin/gh/ysjkof-wanted-pre-onboarding-challenge-fe-1/frontend
└── src
   ├── api
   ├── controller
   ├── hooks
   ├── services
   ├── utils
   ├── types
   |  └── dtos
   ├── constants
   ├── router
   ├── styles
   ├── components
   |  ├── atom
   |  ├── molecules
   |  └── organisms
   └── pages
      ├── auth
      └── todo
         └── organisms
```

| 폴더           | 용도                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------- |
| **api**        | 프로젝트에서 낮은 단계의 인스턴스나 모듈을 보관. fetcher와 fetch module                     |
| **controller** | 데이터 요청을 하기 위해 endpoint를 갖고 처리를 하는 기능                                    |
| **hooks**      | controller를 사용해 데이터를 받아와 처리하고 데이터와 연관된 state를 갖는다                 |
| **services**   | controller와 hook에 들어가지 않는 관심사(auth, todo)에 연관된 기능                          |
| **utils**      | 다른 폴더에 들어가기 적합하지 않은 특정 기능에 종속되지 않거나 전역적인 1~2줄의 간단한 함수 |
| **types**      | 타입스크립트 interface, type, DTO 등                                                        |
| **constants**  | 상수 모음. 정규표현식과 로컬스토리지 키 등                                                  |
| **router**     | router                                                                                      |
| **styles**     | CSS                                                                                         |
| **components** | 아토믹 디자인을 참고함. 관심사와 분리가 쉬운 컴포넌트를 보관                                |
| **pages**      | 아토믹 디자인을 참고함. 최종적으로 화면에 나타나는 페이지나 폴더 보관                       |

## 고민한 점

### view, 데이터, 로직의 분리

view는 컴포넌트에, 데이터와 로직은 커스텀 훅에, 그외 로직은 services로 분리했다.

useAuth의 경우 **login과 signUp**의 중복되는 코드를 **하나의 훅**으로 쓸 수 있어 재사용성이 좋았다.

반면 useTodo의 경우 **부모와 자식 각자 훅을 불러**오면 서로 **다른 인스턴스**가 되기 때문에 그렇게 사용할 수는 없고 부모에서 자식으로 props를 전달해야 했다.

**데이터**를 다루는 부분, **화면**에 나타나는 부분, **그외 로직**이 분리되서 한 번에 보는 코드의 양이 줄어 파악하기 낫고 변경사항이 있을 때 여러 곳을 손대지 않아도 되서 좋았다.

#### Todo에 suspense를 적용하는 문제

- todo의 모든 데이터 요청이 훅에 있다보니 react query와 suspense를 사용할 때 TodoContent컴포넌트에서 에러가 났다.
  - getTodoById를 TodoContent에서 불러오는 걸로 해결했다.
    - **자식과 부모에서** 똑같은 훅(useTodo에서 getTodoById()하는 기능)을 **각자의 인스턴스**로 써서 에러가 난 것 같다.
    - useTodo의 훅이 혼자 너무 크다는 생각이 있었는데 에러가 나니까 확실히 크다.
    - 라이브러리의 기능을 빨리 파악해서 적당히 모으고 적당히 분리해야겠다.

## 커밋 기록

### 2022. 8. 19.

1. 일부 함수에 JSDoc으로 주석 달기 [커밋보기](https://github.com/ysjkof/ysjkof-wanted-pre-onboarding-challenge-fe-1/commit/9c5b648894b537f1aa25e4630663eb73ea9bd3bd)
   - Typescript와 함수 이름으로 주석 필요성이 낮지만 학습 목적으로 사용해봄
2. React와 React Query의 Suspense를 사용해 Todo 로딩 처리함 [커밋보기](https://github.com/ysjkof/ysjkof-wanted-pre-onboarding-challenge-fe-1/commit/7cbbd8354ec5a79f24c1e17301093b9e599b232b)

### 2022. 8. 18.

1. 에러 핸들링 추가 [커밋보기](https://github.com/ysjkof/ysjkof-wanted-pre-onboarding-challenge-fe-1/commit/c4d107dc16cf5d65e7b1a001fb01ccf8cd93145e)

### 2022. 08. 17.

1.  React-Query 적용 [커밋보기](https://github.com/ysjkof/ysjkof-wanted-pre-onboarding-challenge-fe-1/commit/e6f8aebcfe4c419f929cb1e403eb3153e8d34675)
2.  대대적인 UI 개선

    - TodoList UI변경 [커밋보기](https://github.com/ysjkof/ysjkof-wanted-pre-onboarding-challenge-fe-1/commit/497e127b336390f78ab057820c1dc06f28d95f1d#diff-75482d2416fccd183f614663c892064345c993152bba383a06e284f9409de0f9)

    - 브라우저 alert api -> 커스텀 Toast 컴포넌트 구현 [커밋보기](https://github.com/ysjkof/ysjkof-wanted-pre-onboarding-challenge-fe-1/commit/44a3b16bef8496bffc988058fb80654d1a425ad3)

    - Layout 컴포넌트에서 GlobalNavigationBar 분리

    - auth 페이지를 login과 signUp 페이지로 분리 [커밋보기](https://github.com/ysjkof/ysjkof-wanted-pre-onboarding-challenge-fe-1/commit/c9aba2d3404aa0350c10c9be5079aed8e4e8e7f2)

      - 분리전

      <p align="center"><img width="440" alt="previous auth page" src="https://user-images.githubusercontent.com/77876601/185120037-6ea9065a-f700-43ad-a67c-46f6d9dba485.png"></p>

      - 분리후

      <p align="center"><img width="440" alt="login page" src="https://user-images.githubusercontent.com/77876601/185116380-4f31cefd-94ab-406a-8b39-d19e8aca63c4.png"></p>

### 2022. 08. 15.

1. 로그인 상태 관리(useContext) 추가
2. 루트 보호 방법 변경 useEffect -> ProtectRoute 컴포넌트 사용 [커밋보기](https://github.com/ysjkof/ysjkof-wanted-pre-onboarding-challenge-fe-1/commit/b0eb7f7785f8056fd704fb520a224958b5bfb693)

**변경 이유**

- view 컴포넌트와 라우팅의 관심사 분리로 응집도를 높일 수 있다
- useEffect는 일단 그 페이지에 들어간다
- useEffect는 그 페이지가 보이게 된다

**view 컴포넌트의 변경 전후**

```tsx
// layout 컴포넌트와 auth 페이지에서 같은 방식으로 썼다

// 변경 전
export default function Layout() {
  useEffect(() => {
    if (isLoggedIn) return;
    alert('로그인이 유효하지 않습니다. 로그인 페이지로 이동합니다.');
    navigation('/auth');
  }, [isLoggedIn]);
  return ...
}

// 변경 후에는 useEffect 부분이 제거됨
export default function Layout() {

  return ...
}
```

**Router의 변경 전후**

```tsx
// 변경 전
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<TodoList />} />
    <Route path=":todoId" element={<TodoList />} />
  </Route>
  <Route path="auth" element={<Auth />} />
  <Route path="*" element={<p>없는 주소입니다.</p>} />
</Routes>;

// 변경 후
// ProtectRoute 컴포넌트 추가
function ProtectRoute({
  isPass,
  children,
  goWhenFail,
  alarm,
}: ProtectRouteProps) {
  const handleFailPass = () => {
    if (alarm) {
      alert(`이동할 수 없는 주소(URL)입니다. ${alarm}`);
    }
    return Navigate({ to: goWhenFail });
  };
  return isPass ? <>{children}</> : handleFailPass();
}

// ...
// ProtectRoute 컴포넌트 보호할 컴포넌트에 적용
<Routes>
  <Route
    path="/"
    element={
      <ProtectRoute
        isPass={isLoggedIn}
        goWhenFail={'/auth'}
        alarm="로그인해주세요" // 알림이 필요할 경우 alarm props 전달
      >
        <Layout />
      </ProtectRoute>
    }
  >
    <Route index element={<TodoList />} />
  </Route>
  <Route
    path="auth"
    element={
      <ProtectRoute isPass={!isLoggedIn} goWhenFail={'/'}>
        <Auth />
      </ProtectRoute>
    }
  />
</Routes>;
```

### 2022. 08. 12.

1. 패치 모듈 적용 [커밋보기](https://github.com/ysjkof/ysjkof-wanted-pre-onboarding-challenge-fe-1/commit/340997bdcc33096024cd0b076584a7a29a855726)

**각 도메인에 패치 모듈 적용시 차이점**

```ts
// user에 모듈 적용
interface UserFetchResponse {
  token?: string;
  details?: string;
  message?: string;
}
const USER_URL = 'http://localhost:8080/users';
const userFetch = new FetchModule<UserFetchResponse>(USER_URL, fetcher);

// todo에 모듈 적용
interface TodoFetchResponse {
  data?: Todo | Todo[];
  details?: string;
  message?: string;
}
const TODO_URL = 'http://localhost:8080/todos';
const todoFetch = new FetchModule<TodoFetchResponse>(TODO_URL, fetcher);
```

**컨트롤러에서 패치 모듈 적용 전 후 차이**

```ts
// 적용 전 authController.ts의 일부
const result = await fetcher<LoginOutputDto>('users/login', 'POST', {
  email,
  password,
});

// 적용 후 authController.ts의 일부
const result = await userFetch.post<LoginInputDto>('login', {
  email,
  password,
});
```

2. useTodo에서 동일 기능의 함수 하나로 합치고 todoServices로 분리함

```ts
// 수정전 useTodo.ts
// todo의 id를 비교하는 동일 기능
const isSelectedTodo = (id: string) => todo?.id === id;
const isToBeModifiedTod = (id: string) => todoToBeModified?.id === id;

// 수정 후 todoServices.ts
export const isSameTodo = (
  selectedTodoId: string | undefined,
  toBoModifiedTodoId: string | undefined
) => selectedTodoId && toBoModifiedTodoId;
```

3. todo의 알림 메시지 상수로함

```ts
// 수정 전 useTodo.ts
if (!createdTodo.data) return alert('Todo 만들기를 실패했습니다');

// 수정후 useTodo.ts
if (!createdTodo.data) return alert(TODO_ALERTS.FAIL_CREATE);

// 수정후 todoServices.ts
// 한 곳에서 관리할 수 있게 변경
export const TODO_ALERTS = {
  NOT_FOUND: '서버에서 todo를 찾을 수 없습니다',
  FAIL_CREATE: 'Todo 만들기를 실패했습니다',
  NOT_FOUND_INDEX: '출력된 todo 목록에서 선택한 todo를 찾지 못했습니다',
  FAIL_UPDATE: 'Todo 업데이트를 실패했습니다',
  FAIL_DELETE: 'Todo 삭제를 실패했습니다',
};
```

### 2022. 08. 11.

1. login과 signUp의 비지니스 로직을 하나의 훅으로 만듦

- 변경 전 : login과 signUp 각자의 훅

<p align="center">
  <img width="1320" alt="login hook vs signup hook" src="https://user-images.githubusercontent.com/77876601/183867732-d49950b2-4799-4b61-9fde-2d6fc227785a.png">
</p>

- 변경 후 : signUp이 응답을 받은 후 바로 로그인하도록 함. confirm의 필요성이 매우 낮아서 제거.

<p align="center">
  <img alt='auth hook' width="500" alt="use-auth" src="https://user-images.githubusercontent.com/77876601/184080708-1f7d4d4d-3fe8-4530-9a19-247b3df1c64e.png">
</p>

### 2022. 08. 10.

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

5. todoForm 컴포넌트가 submit callback 함수를 받고 submit에서 사용하게 함(이전에는 submit함수를 받음) [커밋보기](https://github.com/ysjkof/ysjkof-wanted-pre-onboarding-challenge-fe-1/commit/67bd8e83fd4c8d95a4af3331803e17985a4e7c5e)
6. login page의 뷰와 서비스 로직 분리 [커밋보기](https://github.com/ysjkof/ysjkof-wanted-pre-onboarding-challenge-fe-1/commit/5cb38300d18300db3ae1e038b8398a67175fd4c7)

- 분리 전
<p align="center">
  <img alt="login pre seperate" width="400" height='400'src="https://user-images.githubusercontent.com/77876601/183823549-4a6222d4-6625-4f08-96f9-40edec630eb8.png">
</p>

- 분리 후
<p align="center">
  <img alt="login only view" width="400" height='400'src="https://user-images.githubusercontent.com/77876601/183823588-dfe562aa-a673-47ae-849e-3287bd9e759e.png">
  <img alt="login hook" width="400" height='400'src="https://user-images.githubusercontent.com/77876601/183823599-f8b1d2c4-02d4-482b-8ec5-aac5d8c1fe11.png">
</p>

7. signUp page의 뷰와 서비스 로직 분리 [커밋보기](https://github.com/ysjkof/ysjkof-wanted-pre-onboarding-challenge-fe-1/commit/55613af6253fc3fd783754502ce241d2c0779271)
