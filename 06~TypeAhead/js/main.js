const endpoint =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

async function fetchData() {
  const array = await fetch(endpoint);
  const data = await array.json();
  collection.push(...data);
}

fetchData();

const collection = [];

const input = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

document.addEventListener('click', (e) => {
  if (e.target.matches('.name') || e.target.matches('.population')) {
    const text = e.target;
    const clickedText = text.innerText;
    input.value = clickedText;
  }
});

input.addEventListener('keyup', displayMatches);

function findMatches(word, collection) {
  return collection.filter((place) => {
    const regex = new RegExp(word, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
  const matchArray = findMatches(this.value, collection);
  const auto = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, 'gi');

      const cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );

      const stateName = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );

      return `
    <li>
      <span class="name">${cityName}, ${stateName}</span>
      <span class="population">${numberWithCommas(place.population)}</span>
    </li>
  `;
    })
    .join('');
  suggestions.innerHTML = auto;
  if (this.value == '') {
    suggestions.innerHTML = `
    <li>Filter for a city</li>
    `;
  }
}

const light = document.querySelector('.light');
const dark = document.querySelector('.dark');

const userTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

const themeCheck = () => {
  if (userTheme == 'dark' || (!userTheme && systemTheme)) {
    document.documentElement.classList.add('dark');
    light.classList.remove('hidden');
    return;
  }
  dark.classList.remove('hidden');
};

const themeSwitch = () => {
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    light.classList.add('hidden');
    dark.classList.remove('hidden');
    return;
  }
  document.documentElement.classList.add('dark');
  localStorage.setItem('theme', 'dark');
  dark.classList.add('hidden');
  light.classList.remove('hidden');
};

dark.addEventListener('click', () => {
  themeSwitch();
});

light.addEventListener('click', () => {
  themeSwitch();
});

themeCheck();
