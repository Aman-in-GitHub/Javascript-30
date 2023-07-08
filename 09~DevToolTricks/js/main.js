const dogs = [
  { name: 'Snickers', age: 2 },
  { name: 'hugo', age: 8 }
];

function makeGreen() {
  const h1 = document.querySelector('h1');
  h1.style.color = '#BADA55';
  h1.style.fontSize = '80px';
}

// Regular
console.log('hello');

// Interpolated
console.log('Hello I am a %s string', '💩');

// Styled
console.log(
  '%c I am a text',
  'font-size:40px; background:brown; color:coral; padding:10px;'
);

// Warning
console.warn('Warning Here');

// Error
console.error('Error Here');

// Info
console.info('Fun Fact');

// Testing
console.assert(1 == 1, 'Only prints out if wrong');
const h1 = document.querySelector('h1');
console.assert(h1.classList.contains('hero'), 'No class found');

// Clearing
console.clear();

// Viewing DOM Elements
console.log(h1);
console.dir(h1);

// Grouping Together
dogs.forEach((dog) => {
  console.groupCollapsed(`${dog.name}`);
  console.log(`This is ${dog.name}`);
  console.log(`${dog.name} is ${dog.age} years old`);
  console.log(`${dog.name} is ${dog.age * 7} dog years old`);
  console.groupEnd(`${dog.name}`);
});

// Counting
console.count('Aman');
console.count('Aman');
console.count('Aman');
console.count('Aman');

// Timing
console.time('fetching data');
async function fetchTime() {
  const time = await fetch('https://api.github.com/users/wesbos');
  const data = await time.json();
  console.timeEnd('fetching data');
  console.log(data);
}

fetchTime();

// Table
console.table(dogs);

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
