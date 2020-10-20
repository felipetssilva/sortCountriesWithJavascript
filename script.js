let totalCountries = 0;
let totalPopulation = 0;

let allCountries = [];
let allFavCountries = [];
let totalFavoriteCountries = 0;
let totalFavotitePopulation = 0;

let tabCountries = null;
let tabFavorites = null;

window.addEventListener('load', () => {
  totalCountries = document.querySelector('#numberOfCountries');
  totalPopulation = document.querySelector('#CountriesTotalPopulation');

  totalFavoriteCountries = document.querySelector('#numberFavoriteCountries');
  totalFavoritePopulation = document.querySelector('#favCountriesPopulation');

  tabCountries = document.querySelector('#tabCountries');
  tabFavorites = document.querySelector('#tabFavorites');

  fetchCountries();
});
async function fetchCountries() {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const json = await res.json();
  allCountries = json.map((countries) => {
    return {
      id: countries.numericCode,
      name: countries.name,
      flag: countries.flag,
      population: countries.population,
    };
  });
  render();
}

function render() {
  renderAllCountries();
  renderFavorites();
  renderCountAllCountries();
  renderButtonFunctions();
}

function renderAllCountries() {
  let listHTML = '<div>';
  allCountries.forEach((country) => {
    const { id, name, population, flag } = country;
    formatPopulation = new Intl.NumberFormat().format(population);
    const addToListHTML = `
    <div class="country">

    <div>
    <a id="${id}" class="waves-effect waves-light btn">+</a> 
    </div>

  <div ><img src="${flag}" alt="here is the flag"></div>

  <div>
  <ul>
  <li>${name}</li>
  <li>Population: ${formatPopulation}</li>
  </ul>
  </div>

  </div>
  `;
    listHTML += addToListHTML;
  });
  tabCountries.innerHTML = listHTML;
}
function renderFavorites() {
  let listFavHTML = '<div>';
  allFavCountries.forEach((country) => {
    const { id, name, population, flag } = country;
    formatPopulation = new Intl.NumberFormat().format(population);
    const addFavToListHTML = ` 
    <div class="country">
    
    <div>
    <a id="${id}" class="waves-effect waves-light btn bright red" >-</a> 
    </div>
    
    <div ><img src="${flag}"></div>
    
    <div>
    <ul>
    <li>${name}</li>
    <li>Population: ${formatPopulation}</li>
    </ul>
    </div>
    
    </div>`;
    listFavHTML += addFavToListHTML;
  });
  tabFavorites.innerHTML = listFavHTML;
}
function renderCountAllCountries() {
  totalCountries.textContent = allCountries.length;
  totalFavoriteCountries.textContent = allFavCountries.length;

  const totalACCpopulation = allCountries.reduce((acc, cur) => {
    return acc + cur.population;
  }, 0);
  totalPopulation.textContent = new Intl.NumberFormat().format(
    totalACCpopulation
  );

  const totalFavACCpopulation = allFavCountries.reduce((acc, cur) => {
    return acc + cur.population;
  }, 0);
  totalFavoritePopulation.textContent = new Intl.NumberFormat().format(
    totalFavACCpopulation
  );
}
function renderButtonFunctions() {
  const allCountriesButton = Array.from(tabCountries.querySelectorAll('.btn'));
  const allFavCountriesButton = Array.from(
    tabFavorites.querySelectorAll('.btn')
  );

  allCountriesButton.forEach((button) => {
    button.addEventListener('click', () => addToFavorites(button.id));
  });
  allFavCountriesButton.forEach((button) => {
    button.addEventListener('click', () => removeFromFavorites(button.id));
  });
}
function addToFavorites(id) {
  const addFavoriteCountry = allCountries.find((country) => country.id === id);
  allFavCountries = [...allFavCountries, addFavoriteCountry];
  allFavCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  allCountries = allCountries.filter((country) => country.id !== id);
  render();
}

function removeFromFavorites(id) {
  const backToAllCountries = allFavCountries.find(
    (country) => country.id === id
  );
  allCountries = [...allCountries, backToAllCountries];
  allCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  allFavCountries = allFavCountries.filter((country) => country.id !== id);
  render();
}
