//manipulando arrays

//map
window.addEventListener('load', () => {
  doMap();
  doFilter();
  doForEach();
  doReduce();
  doFind();
  doSome();
  doEvery();
  doSort();
  doSpread();
  doRest();
  doDestructuring();
});

//map
function doMap() {
  const nameEmailArray = people.results.map((person) => {
    return {
      name: person.name,
      email: person.email,
    };
  });

  console.log(nameEmailArray);
  return nameEmailArray;
}

//filter
function doFilter() {
  const olderThan18 = people.results.filter((person) => {
    return person.dob.age > 50;
  });

  console.log(olderThan18);
}

//foreach

function doForEach() {
  const mappedPeople = doMap();

  mappedPeople.forEach((person) => {
    person.namesize =
      person.name.title.length +
      person.name.first.length +
      person.name.last.length;
  });
  console.log(mappedPeople);
}

//reduce

function doReduce() {
  const totalAges = people.results.reduce((accumulator, current) => {
    return accumulator + current.dob.age;
  }, 0);
  console.log(totalAges);
}

//find -  retorna só o primeiro

function doFind() {
  const found = people.results.find((person) => {
    return person.location.state === 'Minas Gerais';
  });
  console.log(found);
}

//some - retorna verdadeiro ou falso

function doSome() {
  const found = people.results.some((person) => {
    return person.location.state === 'Amazonas';
  });
  console.log(found);
}

//every - se todos atendem regra retorna true

function doEvery() {
  const every = people.results.every((person) => {
    return person.nat === 'BR';
  });
  console.log(every);
}

//sort

function doSort() {
  const mappedNames = people.results
    .map((person) => {
      return {
        name: person.name.first,
      };
    })
    .filter((person) => person.name.startsWith('A'))
    .sort((a, b) => {
      // return a.name.localeCompare(b.name);
      return a.name.length - b.name.length;
    });

  console.log(mappedNames);
}

function doSpread() {
  const marriedMen = people.results.filter(
    (person) => person.name.title === 'Mr'
  );

  const marriedWomen = people.results.filter(
    (person) => person.name.title === 'Ms'
  );

  const marriedPeople = [...marriedWomen, ...marriedMen];
  console.log(marriedPeople);
}

function doRest() {
  console.log(infiteSum(1, 2));
}

function infiteSum(...numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

function doDestructuring() {
  const first = people.results[0];

  //Repetitivo
  //const username = first.login.username;
  //const password = first.login.password;

  //Usando destructuring
  const { username, password } = first.login;

  console.log(username);
  console.log(password);
}

function setTimer() {
  const timer = document.querySelector('#timer');
  let count = 0;

  const interval = setInterval(() => {
    timer.textContent = ++count;

    if (count === 10) {
      this.clearInterval(interval);
      return;
    }

    if (count % 5 === 0) {
      setTimeout(() => {
        timer.textContent = count + ',5';
      }, 100);
    }
  }, 1000);
}

//fetch, then, catch

window.addEventListener('load', () => {
  doFetch();
  doFetchAsyncAwait();

  executeDivisionPromise();
  executeDivisionPromiseAsyncAwait();
});

function doFetch() {
  fetch('https://api.github.com/users/rrgomide')
    .then((res) => {
      res.json().then((data) => {
        showData(data);
      });
    })
    .catch((error) => {
      console.log('Erro na requisição');
    });
}

function showData(data) {
  const user = document.querySelector('#user');
  user.textContent = `${data.login} ${data.name}`;
}

//criando uma promise

function divisionPromise(a, b) {
  return new Promise((resolve, reject) => {
    if (b === 0) {
      reject('Não é possível dividir por 0');
    }
    resolve(a / b);
  });
}

function executeDivisionPromise() {
  divisionPromise(10, 2)
    .then((result) => {
      console.log(result);
    })
    .catch((errorMessage) => {
      console.log('Falha na divisão' + ' ' + errorMessage);
    });
}

//async/await

async function executeDivisionPromiseAsyncAwait() {
  const division = await divisionPromise(12, 2);
  console.log(division);
}

async function doFetchAsyncAwait() {
  const res = await fetch('https://api.github.com/users/rrgomide');
  const json = await res.json();
  console.log(json);
}
