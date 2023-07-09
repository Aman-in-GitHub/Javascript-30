const addItems = document.querySelector('.add-items');

const itemsList = document.querySelector('.plates');

const items = JSON.parse(localStorage.getItem('List')) || [];

function addItem(e) {
  e.preventDefault();

  const text = addItems.querySelector('input');

  const item = {
    title: text.value,
    done: false
  };

  items.push(item);

  localStorage.setItem('List', JSON.stringify(items));

  populateList(items, itemsList);

  text.value = '';
}

function populateList(titles = [], list) {
  list.innerHTML = '';

  let counter = 0;

  titles.forEach((title) => {
    const random = Date.now() + counter++;

    const li = document.createElement('li');
    const check = document.createElement('input');
    check.setAttribute('type', 'checkbox');
    check.setAttribute('id', random);
    check.checked = title.done;
    const label = document.createElement('label');
    label.innerText = title.title;
    label.setAttribute('for', random);
    li.append(check);
    li.append(label);
    list.append(li);
  });
}

function toggleChecked(e) {
  if (!e.target.matches('input')) return;
  const checkbox = e.target;
  const li = checkbox.parentNode;
  const index = Array.from(itemsList.children).indexOf(li);
  items[index].done = !items[index].done;
  localStorage.setItem('List', JSON.stringify(items));
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleChecked);

populateList(items, itemsList);

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
