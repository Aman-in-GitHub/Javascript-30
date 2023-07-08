const hourHand = document.querySelector('.hour');
const minuteHand = document.querySelector('.minute');
const secondHand = document.querySelector('.second');

const light = document.querySelector('.light');
const dark = document.querySelector('.dark');

function setTime() {
  const date = new Date();

  const second = date.getSeconds();
  const secondDegrees = (second / 60) * 360;
  secondHand.style.rotate = `${secondDegrees}deg`;

  const minute = date.getMinutes();
  const minuteDegrees = (minute / 60) * 360 + (second / 60) * 6;
  minuteHand.style.rotate = `${minuteDegrees}deg`;

  const hour = date.getHours();
  const hourDegrees = (hour / 12) * 360 + (minute / 60) * 30;
  hourHand.style.rotate = `${hourDegrees}deg`;
}

setInterval(setTime, 1000);

setTime();

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
