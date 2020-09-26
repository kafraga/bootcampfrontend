// var data = Array.from(document.querySelectorAll('.data'));
// for (var i = 0; i < data.length; i++) {
//   var currentElement = data[i];
//   currentElement.classList.add('emphasis');
// }

var nameInput = document.querySelector('#nameInput');
nameInput.addEventListener('keyup', countName);

var form = document.querySelector('form');
form.addEventListener('submit', preventSubmit);

start();

function start() {
  console.log('Todo o Dom foi carregado');
}

function countName(event) {
  var count = event.target.value;
  var span = document.querySelector('#nameLength');
  span.textContent = count.length;
}

function preventSubmit(event) {
  event.preventDefault();

  var nameInput = document.querySelector('#nameInput');
  alert(nameInput.value + 'cadastrado com sucesso!');
}
