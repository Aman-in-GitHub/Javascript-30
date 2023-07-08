const light = document.querySelector('.light');
const dark = document.querySelector('.dark');

window.addEventListener('keydown', (e) => {
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  key.classList.toggle('scale');

  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
});

window.addEventListener('keyup', (e) => {
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  key.classList.toggle('scale');
});

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
