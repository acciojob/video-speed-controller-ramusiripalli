const video = document.querySelector('.viewer');
const toggle = document.querySelector('.toggle');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');
const ranges = document.querySelectorAll('input[type="range"]');
const skipButtons = document.querySelectorAll('[data-skip]');

/* Play / Pause */
function togglePlay() {
  video.paused ? video.play() : video.pause();
}

/* Update Play Button */
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

/* Update Progress Bar */
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}

/* Click on Progress Bar */
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/* Volume & Playback Speed */
function handleRangeUpdate() {
  video[this.name] = this.value;
}

/* Skip Buttons */
function skip() {
  video.currentTime += Number(this.dataset.skip);
}

/* Event Listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

skipButtons.forEach(button => button.addEventListener('click', skip));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
