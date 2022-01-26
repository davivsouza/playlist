let playing = false,
    banner = document.getElementById("banner-music"),
    container = document.getElementsByTagName("main")[0],
    audio = document.getElementById("audio"),
    audioSrc = document.getElementById("audioSrc"),
    title = document.getElementById("title"),
    author = document.getElementById("author"),
    duration = document.getElementById("duration"),
    timeStart = document.getElementById("timeStart"),
    timeEnd = document.getElementById("timeEnd"),
    next = document.getElementById("forwards"),
    back = document.getElementById("backwards");

let playlist = [
  {
    song: "Black Catcher",
    singer: "Vickleblanka",
    photo: "../assets/bc.png",
    audio: "../assets/audios/black-catcher.mp3",
    sliderColor: "bc"
  },
  {
    song: "Cha Cha",
    singer: "Freddie Dredd",
    photo: "../assets/chacha.png",
    audio: "../assets/audios/chacha.mp3",
    sliderColor: "cha-cha"
  },
  {
    song: "Rasputin",
    singer: "Boney M.",
    photo: "../assets/rasputin.png",
    audio: "../assets/audios/rasputin.mp3",
    sliderColor: "rasputin"
  },
  {
    song: "Till I Collapse",
    singer: "Vickleblanka",
    photo: "../assets/collapse.png",
    audio: "../assets/audios/collapse.mp3",
    sliderColor: "collapse"
  },
  {
    song: "Let's Groove",
    singer: "Earth, Wind & Fire",
    photo: "../assets/groove.png",
    audio: "../assets/audios/groove.mp3",
    sliderColor: "groove"
  },
];

let index = 0

function player(index){
 
  container.style.backgroundImage = `url('${playlist[index].photo}')`
  banner.style.backgroundImage = `url('${playlist[index].photo}')`
  title.innerHTML = playlist[index].song
  author.innerHTML = playlist[index].singer
  audioSrc.setAttribute('src', playlist[index].audio)
  // document
  duration.classList.add(playlist[index].sliderColor)
  
  audio.load()
  
}

player(index)


function playPause() {
  if (playing == false) {
    audio.play();
    document
      .getElementById("play-pause")
      .setAttribute("src", "../assets/pause-button.svg");
    return (playing = true);
  } else {
    audio.pause();
    document
      .getElementById("play-pause")
      .setAttribute("src", "../assets/play-button.svg");
    return (playing = false);
  }
}

function time(value) {
  let slider = value;
  audio.currentTime = slider;
}

function timing() {
  duration.max = audio.duration;
  duration.value = audio.currentTime;

  let minutes = Math.floor(audio.currentTime / 60);
  let seconds = Math.round(audio.currentTime % 60);
  let minutesTotal = Math.floor(audio.duration / 60);
  let secondsTotal = Math.round(audio.duration % 60);

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (minutesTotal < 10) {
    minutesTotal = "0" + minutesTotal;
  }
  if (secondsTotal < 10) {
    secondsTotal = "0" + secondsTotal;
  }

  timeStart.innerText = minutes + ":" + seconds;
  timeEnd.innerText = minutesTotal + ":" + secondsTotal;
  changeSong()
}

setInterval(timing, 500);

function nextMusic(){
  duration.classList.remove(playlist[index].sliderColor)
  if(index == playlist.length-1){
    index=0

    player(index)
    playing = false

    playPause()

  }else{

    playing = false
    index++

    player(index)
    playPause()
  }
  console.log(playlist.length);
}

function backMusic(){
  duration.classList.remove(playlist[index].sliderColor)
  if(index == 0){

    index = playlist.length - 1
    
    player(index)
    playing = false

    playPause()
  }else{
    index--

    player(index)
    playing = false
    playPause()
  }
  console.log(index);
}

function changeSong(){
  let currentTime = audio.currentTime
  let time = audio.duration

  if(currentTime == time){
    nextMusic()
  }
}

window.addEventListener('load', timing)