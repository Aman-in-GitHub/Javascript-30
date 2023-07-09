const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const volume = document.querySelector('.volume');

let animationFrame;

window.addEventListener('keydown', (e) => {
  if (e.key == 'ArrowRight') {
    video.currentTime += 25;
  }
  if (e.key == 'ArrowLeft') {
    video.currentTime -= 25;
  }

  if (e.key == 'ArrowUp') {
    if (video.volume == 1) return;
    video.volume = Math.min(video.volume + 0.1, 1);
    volume.value = video.volume;
  }
  if (e.key == 'ArrowDown') {
    if (video.volume == 0) return;
    video.volume = Math.max(video.volume - 0.1, 0);
    volume.value = video.volume;
  }

  if (e.code == 'Space') {
    togglePlay();
  }
});

ranges.forEach((item) => {
  video[item.name] = item.value;
});

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function toggleButton() {
  if (video.paused) {
    toggle.innerHTML = `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    fill="currentColor"
    class="bi bi-play-fill"
    viewBox="0 0 16 16"
  >
    <path
      d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
    />
  </svg>`;
  } else {
    toggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
    <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
  </svg>`;
  }
}

function createWidth() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percent}%`;

  if (percent === 100) {
    video.currentTime = 0;
    video.pause();
  }
  animationFrame = requestAnimationFrame(createWidth);
}

toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);

video.addEventListener('play', toggleButton);
video.addEventListener('play', () => {
  requestAnimationFrame(createWidth);
});
video.addEventListener('pause', toggleButton);
video.addEventListener('timeupdate', createWidth);

skipButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    video.currentTime += parseInt(btn.dataset.skip);
  });
});

ranges.forEach((item) => {
  item.addEventListener('pointermove', () => {
    video[item.name] = item.value;
  });

  item.addEventListener('change', () => {
    video[item.name] = item.value;
  });
});

function handleProgressClick(e) {
  const progressWidth = progress.offsetWidth;
  const clickPosition = e.offsetX;
  const scrubTime = (clickPosition / progressWidth) * video.duration;
  video.currentTime = scrubTime;
}

function handleProgressMove(e) {
  if (!e.buttons && !e.touches) return;

  const progressWidth = progress.offsetWidth;
  const movePosition =
    e.offsetX || e.touches[0].clientX - progress.getBoundingClientRect().left;
  const scrubTime = (movePosition / progressWidth) * video.duration;
  video.currentTime = scrubTime;
}

progress.addEventListener('click', handleProgressClick);

progress.addEventListener('pointermove', handleProgressMove);

progress.addEventListener('touchmove', handleProgressMove);

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
