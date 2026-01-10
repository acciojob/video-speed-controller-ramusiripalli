const video = document.querySelector('video');
const speed = document.querySelector('.speed');
const speedBar = document.querySelector('.speed-bar');

const min = 0.5;
const max = 4;

function handleMove(e) {
  const y = e.offsetY;
  const percent = y / speed.offsetHeight;

  const playbackRate = percent * (max - min) + min;

  const height = Math.round(percent * 100) + '%';

  speedBar.style.height = height;
  speedBar.textContent = playbackRate.toFixed(2) + '×';
  video.playbackRate = playbackRate;
}

speed.addEventListener('mousemove', handleMove);
