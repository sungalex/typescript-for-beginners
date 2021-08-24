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

- `yarn start`로 실행하기 위한 `package.json`에 설정 추가하여, `yarn start`로 실행

```JSON
{
  "scripts": {
    "start": "node index.js",
    "prestart": "tsc"
  }
}
```
