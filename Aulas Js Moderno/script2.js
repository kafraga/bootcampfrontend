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
