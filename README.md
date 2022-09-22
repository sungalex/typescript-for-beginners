# Typescript for Beginners

Learning Typescript by making a Blockchain with it.

- 노마드코더 강의 : [Typescript로 블록체인 만들기](https://nomadcoders.co/typescript-for-beginners) (Updated: April, 2022)

## 1. Typescript setup

- Inintial setup

```zsh
git init
git remote add origin https://github.com/sungalex/typechain

# .gitignore 파일 생성("gitignore extension for vsc"을 이용한 생성) : "^⌘P" -> Add gitignore -> Node.gitignore

yarn init    # 대화식 세션을 통해 package.json 파일을 작성 (또는 npm init)

git add *
git commit -m "Initial commit"
git push origin master
```

- typescript 설치

```zsh
yarn add global typescript
or
npm install -g typescript
```

- create tsconfig.json

```JSON
{
  "compilerOptions": {
    "target": "ES6",
    "outDir": "build",
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

- typescript compile

  `index.ts`를 컴파일 하면 `index.js`와 `index.js.map`이 생성됨

```zsh
tsc
```

- `tsc` 컴파일 및 `index.js` 파일 실행을 자동화 하기 위해 `package.json`에 설정 추가 (`yarn start` 또는 `npm run start`로 실행)

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
  or
  npm i tsc-watch -D
  ```

  - src(ts 파일) 및 `tsconfig.json` 설정 수정

  ```JSON
  {
    "compilerOptions": {
      "target": "ES6",
      "outDir": "build"    // 컴파일 결과(js 파일)를 저장할 폴더 지정
    },
    "include": ["src"],    // ts 파일이 있는 폴더 지정(모든 파일)
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

- 변수명과 함수명에 Type을 지정하여 TypeScript가 자동으로 오류를 체크하도록 함

```typescript
const sayHi = (name: string, age: number, gender: string): string => {
  return `Hello ${name}, you are ${age}, you are ${gender}`;
};

console.log(sayHi("Alex", 54, "male"));

export {};
```

- ECMAScript 2015와 마찬가지로 TypeScript는 최상위 수준의 import 혹은 export가 포함된 모든 파일을 모듈로 간주합니다. 각 모듈은 선택적으로 default export를 export 할 수 있습니다. 모듈당 하나의 default export만 가능합니다.

- `type` Alias를 정의해서 type을 재사용 가능 (거의 모든 것에 type을 정의할 수 있음)

```ts
// type 명칭은 대문자로 시작
type Player = {
  name: string;
  age?: number; // "?"을 사용하면 Optianal 속성을 나타냄 ("number | undefined"와 동일함)
};

const alex: Player = {
  name: "alex",
};

// Argument type 지정, function return type 지정
function playerMaker(name: string): Player {
  return {
    name: name,
  };
}
const nico = playerMaker("nico");
nico.age = 12;
```

- 위의 `playerMaker` 함수는 아래와 같이 Arrow function 형태로 작성할 수도 있음 (`name: name`과 같이 key, value 명칭이 동일한 경우, `name`으로 축약해서 사용 가능)

```ts
const playMaker = (name: string): Player => ({ name });
```

- type에 `readonly` 키워드를 추가하면, 변경이 불가한 immutable 속성을 지정할 수 있음(javascript에는 없는 속성임)

- 최소한의 길이와 각각의 인자가 특정 타입을 가진 Array를 `Tuple`이라 함 (Tuple과 readonly를 함께 사용 가능)

```ts
// 최소 길이가 3이고, 각 인자는 string, number, boolean type인 배열 선언
const player: [string, number, boolean] = ["alex", 54, true];
```

- type을 `any`로 지정하면 typescript가 타입을 체크하지 않음. 어떤 타입인지 명확하지 않을 때는 `unknown` 타입을 지정할 수 있음. `any` 또는 `unknown` 타입으로 지정한 Object는 `typeof`로 타입을 확인 후 사용해야 함

- 아무것도 리턴하지 않는 함수의 리턴 타입은 `void` 임. 함수가 절대 리턴하지 않는 영역은 타입이 `never` 임

```ts
function hello(name: string | number) {
  if (typeof name === "string") {
    name;
  } else if (typeof name === "number") {
    name;
  } else {
    name; // 함수의 인자는 "string" 또는 "number" 이기 때문에 이문장은 실행되지 않음 => "never" type 임
  }
}
```

## 3. Functions

- 함수의 인자 타입과 리턴 타입을 Call Signatures 라고 함 (함수가 어떻게 호출되고 무엇을 리턴하는지를 정의함)

```ts
type Add = (a: number, b: number) => number;

const add: Add = (a, b) => a + b;
add(1, 2);
```

- 위에 선언한 Call Signatures는 아래와 같이 작성해도 됨

```ts
type Add = {
  (a: number, b: number): number;
};
```

- 함수가 서로 다른 여러 개의 Call Signatures를 가지고 있을 때 Overloading이 발생함

- Polymorphism and Generics : Generics는 type placeholder 역할을 함(타입을 일종의 변수와 같이 취급). call signatures를 만들 때 인자 타입을 모르거나 여러 가지 타입을 지원하기 위해 generics을 사용함. 함수가 호출될 때 실제 타입이 결정됨. call signatures에 placeholder를 사용하면 polymorphism(다형성)을 가지게 됨(인자에 따라 다른 타입으로 동작함). 제네릭은 선언 시점이 아니라 생성 시점에 타입을 명시하여 하나의 타입만이 아닌 다양한 타입을 사용할 수 있도록 하는 기법임

```ts
// Generics 타입으로 Call Signatures 선언
type SuperPrint = {
  <TypePlaceholder>(arr: TypePlaceholder[]): TypePlaceholder;
};

const superPrint: SuperPrint = (arr) => arr[0]; // 함수 정의
const a = superPrint([1, 2, 3, 4]); // a type => number
const b = superPrint(["a", 1, true]); // b type => string | number | boolean
```

- Call Signatures에 여러 개의 Generics를 사용하면 인자의 순서대로 매핑 함

```ts
type Push = {
  <T, V>(arr: T[], item: V): T | V;
};

const add: Add = (arr, item) => {
  arr.push(item);
  return arr;
};
const arr1 = ["a", 1]; // T는 string | number
console.log(add(arr1, true)); // V는 boolean
```

## 3. Interfaces on Typescript

`interface` 선언을 이용하여 `Object` 이름 지어주기

```typescript
/**
 * interface 선언 (interface에 포함된 속성 이름과 속성별 Type 지정)
 */
interface Human {
  name: string;
  age: number;
  gender: string;
}

// person Object 생성
const person = {
  name: "Alex",
  age: 54,
  gender: "male",
};

/**
 * 변수명과 함수명에 Type을 지정하여 ts가 자동으로 오류를 체크하도록 함
 * 함수의 파라미터 Type을 Human interface로 지정하고,
 * 함수 호출 시 Human interface와 동일한 속성을 가진 Object를 인수로 전달
 */
const sayHi = (person: Human): string => {
  return `Hello ${person.name}, you are ${person.age}, you are ${person.gender}!`;
};

console.log(sayHi(person));
```

- `ts`의 `interface`는 `js`로 컴파일 되지는 않음

## 4. Classes on Typescript

```typescript
/**
 * js에서는 class의 속성을 선언할 필요가 없지만,
 * ts에서는 class의 속성(Property)과 Permission을 선언해야 함
 */
class Human {
  public name: string;
  public age: number;
  public gender: string;
  constructor(name: string, age: number, gender: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}

// person Object(instance) 생성
const alex = new Human("Alex", 54, "male");

/**
 * 변수명과 함수명에 Type을 지정하여 ts가 자동으로 오류를 체크하도록 함
 * 함수의 파라미터 Type을 Human class로 지정하고,
 * 함수 호출 시 Human class의 instance를 인수로 전달
 */
const sayHi = (person: Human): string => {
  return `Hello ${person.name}, you are ${person.age}, you are ${person.gender}!`;
};

console.log(sayHi(alex));
```

## 5. Type Definition File

Type Declaration File은 Javascript로 작성된 `.js` 파일을 Typescript 파일 처럼 `.ts`에서 import 하여 사용할 수 있도록 한다.

- `tsconfig.json` 파일에 `"lib": ["ES6", "DOM"]` 처럼, Typescript가 제공하는 대상 런타임 환경을 설명하는 번들 라이브러리(Bundled Library) 선언 파일 세트(Type Definition Files)를 선언하여 사용할 수 있다.

```JSON
{
  "compilerOptions": {
    "lib": ["ES6", "DOM"],
  },
}
```

- 대부분의 Javascript 패키지는 `npm -i -D @types/[package_name]` 명령으로 Type Declaration File을 설치해서 사용할 수 있다.

- `[package_name].d.ts`, `[file_name].d.ts` 처럼 `.d.ts` 파일에 직접 Declaration을 정의하여 사용할 수도 있다.

- Typescript에서 `.d.ts` 없이도 Javascript 파일을 사용(Typescript가 Type을 추론) 하도록 허용 하려면, `tsconfig.json` 파일에 `allowJs`를 `true`로 설정한다.

```JSON
{
  "compilerOptions": {
    "allowJs": true,
  }
}
```

- 아래와 같이 Javascript 파일 첫 행에 `// @ts-check`를 추가하고, [`JSDoc`](https://jsdoc.app/about-getting-started.html) API documentation generator 문법(주석을 이용한 Document 작성 문법) 형식으로 Comments를 작성하면, Typescript 파일에서 Javascript 파일에 대한 Type Definition을 사용할 수 있다.

```javascript
// @ts-check
/**
 * Initializes the project
 * @param {object} config
 * @param {string} config.url
 * @returns boolean
 */
export function init(config) {
  return true;
}
```
