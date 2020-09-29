//variáveis globais
let globalcountries = null;
let favCountries = [];

//funções que são chamadas depois do load da página
window.addEventListener('load', async () => {
  globalcountries = await fetchCountries();
  render();
});

//função que faz fetch dos dados
async function fetchCountries() {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const json = await res.json();
  const countries = json.map((country) => {
    return {
      name: country.name,
      flag: country.flag,
      population: country.population,
      id: country.numericCode,
    };
  });
  return countries;
}

//função que mostra os dados na lista
function showCountries(div, countries) {
  var divCountries = document.querySelector(div);
  var ul = document.createElement('ul');
  divCountries.innerHTML = '';
  countries.forEach((country, i) => {
    var li = document.createElement('li');
    var countryName = country.name;
    var countryPop = country.population;
    var countryFlag = country.flag;
    var spanName = createSpan(countryName);
    var spanPop = createSpan(countryPop);
    var imgFlag = createImg(countryFlag);
    if (div === '#countries') {
      var button = createButtonAddFav(i);
    } else {
      var button = createButtonDeleteFav(i);
    }

    li.appendChild(button);
    li.appendChild(imgFlag);
    li.appendChild(spanName);
    li.appendChild(spanPop);

    ul.appendChild(li);
  });
  divCountries.appendChild(ul);
}

//função que cria span para adicionar na lista
function createSpan(country) {
  var span = document.createElement('span');
  span.textContent = country;
  span.classList.add('infos');
  return span;
}
//função que cria elemento img
function createImg(flag) {
  var img = document.createElement('img');
  img.setAttribute('src', flag);
  img.classList.add('flag');
  return img;
}

function orderCountries(countries) {
  const orderedCountries = countries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  return orderedCountries;
}

//função que cria botão de delete para cada dado da lista
function createButtonAddFav(index) {
  function deleteCountry() {
    favCountries.push(globalcountries[index]);
    favCountries = orderCountries(favCountries);
    globalcountries = globalcountries.filter((_, i) => i !== index);
    globalcountries = orderCountries(globalcountries);
    render();
  }
  var button = document.createElement('button');
  button.textContent = 'x';
  button.classList.add('addfavbutton');
  button.addEventListener('click', deleteCountry);
  return button;
}

function createButtonDeleteFav(index) {
  function deleteFavorite() {
    globalcountries = [...globalcountries, favCountries[index]];
    // globalcountries.push(favCountries[index]);
    globalcountries = orderCountries(globalcountries);
    favCountries = favCountries.filter((_, i) => i !== index);
    favCountries = orderCountries(favCountries);
    render();
  }
  var button = document.createElement('button');
  button.textContent = 'y';
  button.classList.add('deletebutton');

  button.addEventListener('click', deleteFavorite);
  return button;
}

//função que soma a população
function sumPopulation(countries) {
  const totalPopulation = countries.reduce((acc, curr) => {
    return acc + curr.population;
  }, 0);
  return totalPopulation;
}

//função que mostra informações dos países no início da lista
function showInfoCountries(div, countries) {
  var countriesCount = countries.length;
  var popSum = sumPopulation(countries);
  var spanCountries = createSpan(`Países (${countriesCount})`);
  var spanSum = createSpan(`População total: ${popSum}`);
  var divCountries = document.querySelector(div);
  divCountries.innerHTML = '';
  divCountries.appendChild(spanCountries);
  divCountries.appendChild(spanSum);
}

function render() {
  showInfoCountries('#infocountries', globalcountries);
  showInfoCountries('#infofavcountries', favCountries);

  showCountries('#countries', globalcountries);
  showCountries('#favcountries', favCountries);
}
