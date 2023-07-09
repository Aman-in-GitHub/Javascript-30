// start with strings, numbers and booleans

// let age = 100;
// let age2 = age;
// console.log(age, age2);
// age = 200;
// console.log(age, age2);

// let name = 'Wes';
// let name2 = name;
// console.log(name, name2);
// name = 'wesley';
// console.log(name, name2);

// Let's say we have an array
// const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];

// and we want to make a copy of it.
// const team = players;
// console.log(players, team);

// You might think we can just do something like this:
// team[3] = 'Lux';
// console.log(players, team);

// however what happens when we update that array?

// now here is the problem!

// oh no - we have edited the original array too!

// Why? It's because that is an array reference, not an array copy. They both point to the same array!

// So, how do we fix this? We take a copy instead!
// const team2 = players.slice();

// one way

// or create a new array and concat the old one in
// const team3 = [].concat(players);

// or use the new ES6 Spread
// const team4 = [...players];
// team4[3] = 'heeee hawww';
// console.log(team4);
// console.log(players);

// const team5 = Array.from(players);

// now when we update it, the original one isn't changed

// The same thing goes for objects, let's say we have a person object

// with Objects
// const person = {
//   name: 'Wes Bos',
//   age: 80
// };
// console.log(person);

// and think we make a copy:
// const captain = person;
// captain.number = 99;
// console.log(captain);

// how do we take a copy instead?
// const cap2 = Object.assign({}, person);
// cap2.social = 'Threads';
// console.log(cap2);

// We will hopefully soon see the object ...spread
// const cap3 = {...person};

// Things to note - this is only 1 level deep - both for Arrays and Objects. lodash has a cloneDeep method, but you should think twice before using it.

// const wes = {
//   name: 'Wes',
//   age: 100,
//   social: {
//     twitter: '@wesbos',
//     facebook: 'wesbos.developer'
//   }
// };

// console.clear();
// console.log(wes);

// const dev = Object.assign({}, wes);
// dev.social = 'Youtube';
// console.log(dev);
// console.log(wes);
// dev.social.twitter = '@not';
// console.log(dev);
// console.log(wes);

// const dev2 = JSON.parse(JSON.stringify(wes));
// dev2.social.twitter = '@thisWorks';
// console.log(dev2);
// console.log(wes);

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
