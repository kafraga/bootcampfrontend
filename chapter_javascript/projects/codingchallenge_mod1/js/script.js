let globalPeople = [];
let peopleFiltered = [];
let inputSearch = null;
let inputRadios = null;
let summaryResults = null;
let isFiltering = false;
let inputBoxes = [];

window.addEventListener('load', async () => {
  inputSearch = document.querySelector('#input-search');
  summaryResults = document.querySelector('#summary-results');
  divPeople = document.querySelector('#people');
  // prettier-ignore
  inputBoxes = Array.from(document.querySelectorAll('input[name="box-languages"]'));
  inputRadios = Array.from(document.querySelectorAll('input[name="operator"]'));
  activateInput();
  activateBox();
  activateRadio();
  fetchPeople();
});

async function fetchPeople() {
  const res = await fetch('http://localhost:3001/devs');

  const json = await res.json();
  globalPeople = json.map((person) => {
    const { name, picture, programmingLanguages } = person;
    return {
      name,
      picture,
      programmingLanguages,
      search: replaceSpecialChars(name.toLowerCase().replace(' ', '')),
      languages: programmingLanguages.map((language) =>
        language.language.toLowerCase()
      ),
    };
  });

  render();
}

function render() {
  preventFormSubmit();
  showPeople();
  renderSummaryResults();
}

function renderPeopleList() {
  let peopleHTMl = '<div class="row">';

  globalPeople.forEach((person) => {
    const { name, picture } = person;
    const personHTML = `
    <div class="col s12 m6 l4">
      
        <div class="img"><img src="${picture}" alt="${name}" class="pic"></div>
        <div class="info"><div class="name">${name} </div>
        <div class="imglanguage">${createImgLanguages(person)}</div>
      </div>
    </div>
  `;
    peopleHTMl += personHTML;
  });

  peopleHTMl += '</div>';
  divPeople.innerHTML = peopleHTMl;
}

function renderFilteredPeopleList() {
  let peopleHTMl = '<div class="row">';
  isFiltering = true;
  peopleFiltered.forEach((person) => {
    const { name, picture } = person;
    const personHTML = `
    <div class="col s12 m6 l4">
      
        <div class="img"><img src="${picture}" alt="${name}" class="pic"></div>
        <div class="info"><div class="name">${name} </div>
        <div class="imglanguage">${createImgLanguages(person)}</div>
      </div>
    </div>
  `;
    peopleHTMl += personHTML;
  });

  peopleHTMl += '</div>';
  divPeople.innerHTML = peopleHTMl;
}

function renderSummaryResults() {
  if (isFiltering === false) {
    summaryResults.textContent = `${globalPeople.length} resultados`;
  } else {
    summaryResults.textContent = `${peopleFiltered.length} resultados`;
  }
}

function filterPeople() {
  let searchKey = replaceSpecialChars(inputSearch.value.toLowerCase());
  peopleFiltered = globalPeople.filter((person) =>
    person.search.includes(searchKey)
  );
  inputRadios.forEach((inputRadio) => {
    if (inputRadio.checked && inputRadio.value === 'e') {
      peopleFiltered = peopleFiltered.filter((person) => {
        let checkPerson = true;
        inputBoxes.forEach((inputbox) => {
          if (inputbox.checked && !person.languages.includes(inputbox.value)) {
            checkPerson = false;
          }
        });
        return checkPerson;
      });
    } else {
      if (inputRadio.checked && inputRadio.value === 'ou') {
        peopleFiltered = peopleFiltered.filter((person) => {
          let checkPerson = false;
          let allUnchecked = true;
          inputBoxes.forEach((inputbox) => {
            // prettier-ignore
            if (inputbox.checked) {
              allUnchecked = false;
              if (person.languages.includes(inputbox.value)){
                checkPerson = true;
              }
            }
          });

          return checkPerson || allUnchecked;
        });
      }
    }
  });

  isFiltering = true;
  render();
}

function showPeople() {
  if (isFiltering === false) {
    renderPeopleList();
  } else {
    renderFilteredPeopleList();
  }
}

function preventFormSubmit() {
  function handleSubmit(event) {
    event.preventDefault();
  }
  const form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);
}

function activateInput() {
  inputSearch.addEventListener('keyup', filterPeople);
}

function activateBox() {
  inputBoxes.forEach((inputbox) =>
    inputbox.addEventListener('change', filterPeople)
  );
}
function activateRadio() {
  inputRadios.forEach((inputRadio) =>
    inputRadio.addEventListener('change', filterPeople)
  );
}

function createImgLanguages(person) {
  let imgHTML = '<div>';
  person.languages.forEach((language) => {
    imgHTML += `<img src="./img/${language.toLowerCase()}.png" class="languagepic">`;
  });
  imgHTML += '</div>';
  return imgHTML;
}

function replaceSpecialChars(str) {
  str = str.replace(/[ÀÁÂÃÄÅ]/, 'A');
  str = str.replace(/[àáâãäå]/, 'a');
  str = str.replace(/[ÈÉÊË]/, 'E');
  str = str.replace(/[èéêë]/, 'e');
  str = str.replace(/[í]/, 'i');
  str = str.replace(/[õóòöô]/, 'o');
  str = str.replace(/[ú]/, 'u');
  str = str.replace(/[Ç]/, 'C');
  str = str.replace(/[ç]/, 'c');

  return str;
}
