const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const audio = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const previousButton = document.getElementById('previous');
const playButton = document.getElementById('play');
const forwardButton = document.getElementById('forward');

let isPlaying = false;
let songIndex = 0;
const songs = [
    {
        name: 'Juice_WRLD_Ft_The_Weeknd_-_Smile',
        displayName: 'smile',
        artist: 'Juice Wrld'
    },
    {
        name: 'The_Weeknd_-_Privilege_Olagist.co_',
        displayName: 'privilege',
        artist: 'The Weeknd'
    },
    {
        name: 'The_Weeknd_-_After_Hours',
        displayName: 'After Hours',
        artist: 'The Weeknd'
    },
    {
        name: 'The_Weeknd_-_Take_My_Breath',
        displayName: 'Take My BreaSth',
        artist: 'The Weeknd'
    },
    {
        name: 'Kendrick_Lamar_The_Weeknd_-_Pray_For_Me_Olagist.co_',
        displayName: 'Pray For Me',
        artist: 'The Weeknd'
    },
    
    {
        name: 'XNOVA',
        displayName: 'XNOVA',
        artist: 'XNOVA'
    },
    
];

const playSong = () => {
    isPlaying = true;
    playButton.classList.replace('fa-play', 'fa-pause');
    playButton.setAttribute('title', "Pause")
    audio.play();
}

const pauseSong = () => {
    isPlaying = false;
    playButton.classList.replace('fa-pause', 'fa-play');
    playButton.setAttribute('title', "Play")
    audio.pause();
}

playButton.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
})

const loadSong = (song) => {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    audio.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

const previousSong = () => {
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex])
    playSong()
}

const nextSong = () => {
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex])
    playSong()
}

loadSong(songs[songIndex])

const updateProgressBar = (e) => {
    if(isPlaying){
        const { duration, currentTime} = e.srcElement;
        const progressPrecent = (currentTime / duration) * 100;
        progress.style.width = `${progressPrecent}%`;

        //calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 2){
            durationSeconds = `0${durationSeconds}`;
        }

        //Delay switching duration element to avoid NaN element
        if (durationSeconds){
            durationElement.textContent = `${durationMinutes}:${durationSeconds}`
        }

        //calculate display for currentTime
        const currentTimeMinutes = Math.floor(currentTime / 60);
        let currentTimeSeconds = Math.floor(currentTime % 60);
        if(currentTimeSeconds < 10){
            currentTimeSeconds = `0${currentTimeSeconds}`;
        }

        currentTimeElement.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`
    }
}

const setProgressBar = (e) => {
    const width = e.srcElement.clientWidth;
    const clickX = e.offsetX;

    const { duration } = audio;

    audio.currentTime = (clickX / width) * duration;
}

previousButton.addEventListener('click', previousSong);
forwardButton.addEventListener('click', nextSong);
audio.addEventListener('ended', nextSong)
audio.addEventListener('timeupdate', updateProgressBar)

progressContainer.addEventListener('click', setProgressBar);
