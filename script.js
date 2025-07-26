const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const trackList = document.getElementById("track-list");

let isPlaying = false;
let currentTrack = 0;

const songs = [
  {
    name: "song1.mp3",
    title: "Perfect",
    artist: "Ed Sheeran"
  },
  {
    name: "song2.mp3",
    title: "Summertime sadness",
    artist: "Lana Del Rey"
  },
  {
    name: "song3.mp3",
    title: "Night Changes",
    artist: "One Direction"
  }
];

// Load song
function loadSong(song) {
  title.innerText = song.title;
  artist.innerText = song.artist;
  audio.src = `music/${song.name}`;
  updatePlaylistUI();
}

function playSong() {
  isPlaying = true;
  playBtn.innerText = "⏸";
  audio.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.innerText = "▶";
  audio.pause();
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener("click", () => {
  currentTrack = (currentTrack - 1 + songs.length) % songs.length;
  loadSong(songs[currentTrack]);
  playSong();
});

nextBtn.addEventListener("click", () => {
  currentTrack = (currentTrack + 1) % songs.length;
  loadSong(songs[currentTrack]);
  playSong();
});

audio.addEventListener("timeupdate", () => {
  const { currentTime, duration } = audio;
  progress.value = (currentTime / duration) * 100;

  currentTimeEl.innerText = formatTime(currentTime);
  durationEl.innerText = formatTime(duration);
});

progress.addEventListener("input", () => {
  const duration = audio.duration;
  audio.currentTime = (progress.value / 100) * duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("ended", () => {
  nextBtn.click(); // Autoplay
});

function formatTime(time) {
  const minutes = Math.floor(time / 60) || 0;
  const seconds = Math.floor(time % 60) || 0;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function buildPlaylist() {
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener("click", () => {
      currentTrack = index;
      loadSong(song);
      playSong();
    });
    trackList.appendChild(li);
  });
}

function updatePlaylistUI() {
  const items = trackList.querySelectorAll("li");
  items.forEach((li, index) => {
    li.classList.toggle("active", index === currentTrack);
  });
}

// Initial Load
loadSong(songs[currentTrack]);
buildPlaylist();
