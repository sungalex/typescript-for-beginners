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

/**
 * ECMAScript 2015와 마찬가지로 TypeScript는 최상위 수준의 import 혹은 export가 포함된 모든 파일을 모듈로 간주합니다.
 * 각 모듈은 선택적으로 default export를 export 할 수 있습니다.
 * 모듈당 하나의 default export만 가능합니다.
 */
export {};
