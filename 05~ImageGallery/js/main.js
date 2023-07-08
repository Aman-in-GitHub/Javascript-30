const panels = document.querySelectorAll('.panel');

panels.forEach((item) => {
  item.addEventListener('click', () => {
    panels.forEach((item) => {
      item.classList.remove('flex-increase');
      const p = item.querySelectorAll('p');
      p.forEach((item) => {
        item.classList.remove('translate-0');
      });
    });

    item.classList.toggle('flex-increase');
    const p = item.querySelectorAll('p');
    p.forEach((item) => {
      item.classList.toggle('translate-0');
    });
  });
});

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
