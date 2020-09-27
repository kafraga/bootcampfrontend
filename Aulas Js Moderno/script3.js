window.addEventListener('load', () => {
  doSpread();
  doRest();
  doDestructuring();
});

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
