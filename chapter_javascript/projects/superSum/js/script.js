let inputNum1 = null;
let inputNum2 = null;
let results = null;
let caculations = [
  { id: 'calc1', name: 'Soma', function: getSum, input: null },
  { id: 'calc2', name: 'Subtração', function: getSub, input: null },
  { id: 'calc3', name: 'Multiplicação', function: getMult, input: null },
  { id: 'calc4', name: 'Divisão', function: getDiv, input: null },
  { id: 'calc1', name: 'Soma', function: getSum, input: null },
  { id: 'calc2', name: 'Subtração', function: getSub, input: null },
  { id: 'calc3', name: 'Multiplicação', function: getMult, input: null },
  { id: 'calc4', name: 'Divisão', function: getDiv, input: null },
];

window.addEventListener('load', () => {
  inputNum1 = document.querySelector('#inputNum1');
  inputNum2 = document.querySelector('#inputNum2');
  results = document.querySelector('#results');
  activateInput();
  renderResults();
  caculations.forEach((calculation) => {
    calculation.input = document.querySelector(`#${calculation.id}`);
  });
});

function getSum(num1, num2) {
  return num1 + num2;
}
function getSub(num1, num2) {
  return num1 - num2;
}
function getMult(num1, num2) {
  return num1 * num2;
}
function getDiv(num1, num2) {
  return num1 / num2;
}

function activateInput() {
  inputNum1.addEventListener('keyup', updateResults);
  inputNum2.addEventListener('keyup', updateResults);
}

function updateResults() {
  caculations.forEach((calculation) => {
    let result = '';
    if (inputNum1.value === '' || inputNum2.value === '') {
      result = '';
    } else {
      result = calculation.function(
        parseInt(inputNum1.value),
        parseInt(inputNum2.value)
      );
    }
    calculation.input.value = result;
  });
}

function renderResults() {
  let resultsHTML = '<div>';
  caculations.forEach((calculation) => {
    const resultHTML = `
    <div class="input-results col s12 m6 l3">
      <div class="info-results row">
        <div class="col">
        <div class="input-field inline">
        <input type="text" name="${calculation.name}" id="${calculation.id}" value="" disabled/>   
        <label class="active" for="${calculation.id}">${calculation.name}</label>
        </div>
        </div>
       </div>
    </div>
      `;
    resultsHTML += resultHTML;
  });
  resultsHTML += '</div>';
  results.innerHTML = resultsHTML;
}
