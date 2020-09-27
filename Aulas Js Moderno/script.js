'use strict'; //javascript acusa mais erro

function withVar() {
  for (var i = 0; i < 10; i++) {
    console.log('var' + i);
  }
  i = 20;
  console.log(i);
}

function withLet() {
  for (let i = 0; i < 10; i++) {
    console.log('let' + i);
  }
  // i = 20;
  // console.log(i);
}

withVar();
withLet();

//const - não podemos reatribuir valores

// const c = 10;
// c = 20;

const d = [];
console.log(d);

d.push(1);
console.log(d);

//exemplo de function

function sum1(a, b) {
  return a + b;
}

//function anônima

const sum2 = function (a, b) {
  return a + b;
};

//arrow function

const sum3 = (a, b) => {
  return a + b;
};

//arrow function reduzido

const sum4 = (a, b) => a + b;

console.log(sum1(2, 3));
console.log(sum2(2, 3));
console.log(sum3(2, 3));
console.log(sum4(2, 3));

// template literals

const name = 'Karina';
const surname = 'Fraga';
const text1 = 'Meu nome é ' + name + ' ' + surname;

const text2 = `Meu nome é ${name} ${surname}`;

console.log(text1);
console.log(text2);

// default parameters

const sum5 = (a, b = 10) => a + b;
console.log(sum5(2));
console.log(sum5(2, 8));
