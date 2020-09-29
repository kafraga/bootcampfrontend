let globalPeople = [];
let peopleFiltered = [];
let inputSearch = null;
let summaryResults = null;
let isFiltering = false;
let inputBoxes = [];

window.addEventListener('load', async () => {
  inputSearch = document.querySelector('#input-search');
  summaryResults = document.querySelector('#summary-results');
  divPeople = document.querySelector('#people');
  inputBoxes = document.querySelectorAll('input[name="box-languages"]');
  activateInput();
  activateBox();
  fetchPeople();
});

async function fetchPeople() {
  const res = await fetch('http://localhost:3001/devs');

  const json = await res.json();
  globalPeople = json.map((person) => {
    const { id, name, picture, programmingLanguages } = person;
    return {
      id,
      name,
      picture,
      programmingLanguages,
      search: name.toLowerCase().replace(' ', ''),
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
  let peopleHTMl = '<div>';

  globalPeople.forEach((person) => {
    const { id, name, picture, programmingLanguages, languages } = person;
    const personHTML = `
    <div>
      <div>
        <img src="${picture}" alt="${name}" id="${id}" class="pic">
      </div>
      <div>
        ${name}
       <div>
         ${createImgLanguages(id)}
        </div>
      <div>
      ${languages}
      </div>
    </div>
  `;
    peopleHTMl += personHTML;
  });

  peopleHTMl += '</div>';
  divPeople.innerHTML = peopleHTMl;
}

function renderFilteredPeopleList() {
  let peopleHTMl = '<div>';
  isFiltering = true;
  peopleFiltered.forEach((person) => {
    const { id, name, picture, programmingLanguages, languages } = person;
    const personHTML = `
    <div>
      <div>
        <img src="${picture}" alt="${name}" id="${id}" class="pic">
      </div>
      <div>
        ${name}
       <div>
         ${createImgLanguages(id)}
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

function preventFormSubmit() {
  function handleSubmit(event) {
    event.preventDefault();
  }
  const form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);
}

function filterPeople(searchKey) {
  peopleFiltered = globalPeople.filter((person) =>
    person.search.includes(searchKey)
  );
  isFiltering = true;
  render();
}

function filterLanguages(searchBox, checked) {
  if (checked) {
    peopleFiltered = globalPeople.filter((person) =>
      person.languages.includes(searchBox)
    );
    isFiltering = true;
    render();
  } else {
    isFiltering = false;
    render();
  }
}

function activateInput() {
  function handleSearching(event) {
    if (event.key === 'Enter') {
      filterPeople(event.target.value);
    }
  }
  inputSearch.addEventListener('keyup', handleSearching);
}

function activateBox() {
  inputBoxes.forEach((inputbox) =>
    inputbox.addEventListener('change', () =>
      filterLanguages(inputbox.value, inputbox.checked)
    )
  );
}

function showPeople() {
  if (isFiltering === false) {
    renderPeopleList();
  } else {
    renderFilteredPeopleList();
  }
}

function createImgLanguages(id) {
  let imgHTML = '<div>';
  let filteredByIdPeople = globalPeople.filter((person) => person.id === id);
  let filteredByIdPerson = filteredByIdPeople[0];

  let mappedLanguagePeople = filteredByIdPerson.programmingLanguages.map(
    (language) => language.language
  );
  mappedLanguagePeople.forEach((language) => {
    if (language === 'Java') {
      imgLanguageJava = '<img src="./img/java.png" class="languagepic">';
      imgHTML += imgLanguageJava;
    } else {
      if (language === 'Python') {
        imgLanguagePython = '<img src="./img/python.png" class="languagepic" >';
        imgHTML += imgLanguagePython;
      } else {
        imgLanguageJavascript =
          '<img src="./img/javascript.png" class="languagepic">';
        imgHTML += imgLanguageJavascript;
      }
    }
  });
  imgHTML += '</div>';
  return imgHTML;
}
