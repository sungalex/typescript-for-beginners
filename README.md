# TypeChain

Learning Typescript by making a Blockchain with it

- 노마드코더 강의 : [Typescript로 블록체인 만들기](https://nomadcoders.co/typescript-for-beginners)

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
  name: 'Alex',
  age: 54,
  gender: 'male',
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

## 4. Classes on Typescript - part One

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
const alex = new Human('Alex', 54, 'male');

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

## 5. Blockchain Creating a Block

- Hash 생성을 위한 `crypto-js` 패키지 설치

```zsh
yarn add crypto-js
```

- import `crypto-js`

```typescript
import * as CryptoJS from 'crypto-js';
```

- Block `class` 선언

```typescript
// Block Structure
class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  // instance 생성 없이 class name으로 바로 접근 가능한 static method
  static calculateBlockHash = (
    index: number,
    previousHash: string,
    data: string,
    timestamp: number
  ): string =>
    CryptoJS.SHA256(index + previousHash + data + timestamp).toString();

  static validateStructure = (block: Block): boolean =>
    typeof block.index === 'number' &&
    typeof block.hash === 'string' &&
    typeof block.previousHash === 'string' &&
    typeof block.data === 'string' &&
    typeof block.timestamp === 'number';

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}
```

- Timestamp and Hash

```typescript
const getNewTimestamp = (): number => Math.round(new Date().getTime() / 1000);
const getHashForBlock = (block: Block): string =>
  Block.calculateBlockHash(
    block.index,
    block.previousHash,
    block.data,
    block.timestamp
  );
```

- Create first Block instance

```typescript
const genesisBlock: Block = new Block(
  0,
  Block.calculateBlockHash(0, '', 'Root Block', getNewTimestamp()),
  '',
  'Root Block',
  getNewTimestamp()
);
```

- blockchain Array and creating Block

```typescript
let blockchain: Block[] = [genesisBlock];
const getLatestBlock = (): Block => blockchain[blockchain.length - 1];
const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimestamp: number = getNewTimestamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    data,
    newTimestamp
  );
  const newBlock: Block = new Block(
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimestamp
  );
  addBlock(newBlock);
  return newBlock;
};
```

## 6. Validating Block Structure

```typescript
const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlock)) {
    return false;
  } else if (candidateBlock.index !== previousBlock.index + 1) {
    return false;
  } else if (candidateBlock.previousHash !== previousBlock.hash) {
    return false;
  } else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  } else {
    return true;
  }
};

const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(candidateBlock, getLatestBlock())) {
    blockchain.push(candidateBlock);
  }
};

createNewBlock('Second Block');
createNewBlock('Third Block');
createNewBlock('Fourth Block');

const getBlockchain = (): Block[] => blockchain;

console.log(getBlockchain());
```
