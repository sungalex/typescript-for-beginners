# TypeChain

Learning Typescript by making a Blockchain with it

## 1. Typescript setup

- Inintial setup

```zsh
git init
git remote add origin https://github.com/sungalex/typechain

yarn init    # 대화식 세션을 통해 package.json 파일을 작성

git add *
git commit -m "Initial commit"
git push origin master
```

- `.gitignore` 파일 생성: `gitignore extension for vsc`을 이용한 생성 (`^⌘P` -> Add gitignore -> Node.gitignore)

- typescript 설치

```zsh
yarn add global typescript
```

- create tsconfig.json

```JSON
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "ES2015",
    "sourceMap": true
  },
  "include": ["index.ts"],
  "exclude": ["node_modules"]
}
```

- typescript compile

  `index.ts`를 컴파일 하면 `index.js`와 `index.js.map`이 생성됨

```zsh
tsc
```

- `tsc` 컴파일 및 `index.js` 파일 실행을 자동화 하기 위해 `package.json`에 설정 추가 (`yarn start`로 실행)

```JSON
{
  "scripts": {
    "start": "node index.js",
    "prestart": "tsc"
  }
}
```

- Watch 모드 설정(자동 컴파일 및 실행)

  `yarn start` 실행 후 Watch 모드에서 `ts` 파일이 수정되면 자동으로 컴파일 및 `js` 파일이 재실행 되도록 설정

  - TSC watch 패키기 설치

  ```zsh
  yarn add tsc-watch --dev
  ```

  - src(ts 파일), dist(js 파일) 폴더 생성 및 `tsconfig.json` 설정 수정

  ```JSON
  {
    "compilerOptions": {
      "module": "commonjs",
      "target": "ES2015",
      "sourceMap": true,
      "outDir": "dist"    // 컴파일 결과(js 파일)를 저장할 폴더 지정
    },
    "include": ["src/**/*"],    // ts 파일이 있는 폴더 지정(모든 파일)
    "exclude": ["node_modules"]
  }
  ```

  - `package.json` 설정 수정 : `tsc-watch`로 컴파일 및 `index.js` 실행

  ```JSON
  {
    "scripts": {
      "start": "tsc-watch --onSuccess \"node dist/index.js\" "
    }
  }
  ```

## 2. Types in Typescript

```typescript
/**
 * 변수명과 함수명에 Type을 지정하여 ts가 자동으로 오류를 체크하도록 함
 */
const sayHi = (name: string, age: number, gender: string): string => {
  return `Hello ${name}, you are ${age}, you are ${gender}`;
};

console.log(sayHi('Alex', 54, 'male'));

/**
 * ECMAScript 2015와 마찬가지로 TypeScript는 최상위 수준의 import
 * 혹은 export가 포함된 모든 파일을 모듈로 간주합니다.
 * 각 모듈은 선택적으로 default export를 export 할 수 있습니다.
 * 모듈당 하나의 default export만 가능합니다.
 */
export {};
```
