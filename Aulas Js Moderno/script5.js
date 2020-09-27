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
