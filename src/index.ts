/**
 * 변수명과 함수명에 Type을 지정하여 ts가 자동으로 오류를 체크하도록 함
 */
const sayHi = (name: string, age: number, gender: string): string => {
  return `Hello ${name}, you are ${age}, you are ${gender}`;
};

console.log(sayHi('Alex', 54, 'male'));

/**
 * ECMAScript 2015와 마찬가지로 TypeScript는 최상위 수준의 import 혹은 export가 포함된 모든 파일을 모듈로 간주합니다.
 * 각 모듈은 선택적으로 default export를 export 할 수 있습니다.
 * 모듈당 하나의 default export만 가능합니다.
 */
export {};
