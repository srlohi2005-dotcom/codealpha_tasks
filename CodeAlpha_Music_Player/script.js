const songs = [
{
title:"SoundHelix 1",
artist:"Demo Track",
src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
cover:"https://picsum.photos/id/237/300/300"
},
{
title:"SoundHelix 2",
artist:"Demo Track",
src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
cover:"https://picsum.photos/id/238/300/300"
},
{
title:"SoundHelix 3",
artist:"Demo Track",
src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
cover:"https://picsum.photos/id/239/300/300"
},
{
title:"SoundHelix 4",
artist:"Demo Track",
src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
cover:"https://picsum.photos/id/240/300/300"
},
{
title:"SoundHelix 5",
artist:"Demo Track",
src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
cover:"https://picsum.photos/id/241/300/300"
},
{
title:"SoundHelix 6",
artist:"Demo Track",
src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
cover:"https://picsum.photos/id/242/300/300"
},
{
title:"SoundHelix 7",
artist:"Demo Track",
src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
cover:"https://picsum.photos/id/243/300/300"
},
{
title:"SoundHelix 8",
artist:"Demo Track",
src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
cover:"https://picsum.photos/id/244/300/300"
}
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressArea = document.getElementById("progress-area");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

let songIndex = 0;

function loadSong(index){
audio.src = songs[index].src;
title.innerText = songs[index].title;
artist.innerText = songs[index].artist;
cover.src = songs[index].cover;
}

function playSong(){
audio.play();
playBtn.innerText="⏸";
}

function pauseSong(){
audio.pause();
playBtn.innerText="▶";
}

playBtn.addEventListener("click",()=>{
audio.paused ? playSong() : pauseSong();
});

nextBtn.addEventListener("click",()=>{
songIndex = (songIndex+1)%songs.length;
loadSong(songIndex);
playSong();
});

prevBtn.addEventListener("click",()=>{
songIndex = (songIndex-1+songs.length)%songs.length;
loadSong(songIndex);
playSong();
});

audio.addEventListener("timeupdate",()=>{
if(audio.duration){
let progressPercent = (audio.currentTime/audio.duration)*100;
progressBar.style.width = progressPercent+"%";

let currentMin = Math.floor(audio.currentTime/60);
let currentSec = Math.floor(audio.currentTime%60).toString().padStart(2,'0');

let durationMin = Math.floor(audio.duration/60);
let durationSec = Math.floor(audio.duration%60).toString().padStart(2,'0');

currentTimeEl.innerText = `${currentMin}:${currentSec}`;
durationEl.innerText = `${durationMin}:${durationSec}`;
}
});

progressArea.addEventListener("click",(e)=>{
let width = progressArea.clientWidth;
let clickX = e.offsetX;
audio.currentTime = (clickX/width)*audio.duration;
});

volumeSlider.addEventListener("input",()=>{
audio.volume = volumeSlider.value;
});

audio.addEventListener("ended",()=>{
nextBtn.click();
});

loadSong(songIndex);