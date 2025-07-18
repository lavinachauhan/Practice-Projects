console.log("Welcome to music mp3");



let songIndex = 0;
let audioElement = new Audio('MP3/Aam Jahe Munde.mp3')
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songsItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');

let durationElements = document.getElementsByClassName("timeStamp");

let songs = [
      {SongName: "Aam Jahe Munde", filePath: "MP3/Aam Jahe Munde.mp3", coverPath: "COVERS/AamJaheMunde.jpg"},
   {SongName: "Haye Mera Dil", filePath: "MP3/Haye Mera Dil.mp3", coverPath: "COVERS/Haye Mera Dil.jpg"},
   {SongName: "Mera Deewana Pan", filePath: "MP3/Mera Deewanapan.mp3", coverPath: "COVERS/Mera Deewana pan.jpg"},
   {SongName: "Mi Amor", filePath: "MP3/Mi Amor.mp3", coverPath: "COVERS/Mi Amor.jpg"},
   {SongName: "Naah", filePath: "MP3/Naah .mp3", coverPath: "COVERS/Naah.jpg"},
   {SongName: "Panchayat", filePath: "MP3/Panchayat.mp3", coverPath: "COVERS/Panchayat.jpg"},
   {SongName: "Radha Rani", filePath: "MP3/Radha Rani.mp3", coverPath: "COVERS/Radha Rani.jpg"},
   {SongName: "That girl", filePath: "MP3/That Girl.mp3", coverPath: "COVERS/That girl.jpg"},
   {SongName: "Varoon", filePath: "MP3/Vaaroon.mp3", coverPath: "COVERS/Varoon.jpg"},
   {SongName: "Ve Haaniyaan", filePath: "MP3/Ve Haaniyaan.mp3", coverPath: "COVERS/Ve Haaniya.jpg"}
];

window.addEventListener("load", () => {

        songs.forEach((song, index) => {
        let tempAudio = new Audio(song.filePath);

        tempAudio.addEventListener("loadedmetadata", () => {
            let totalSeconds = parseInt(tempAudio.duration);
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds % 60;
            let formattedTime = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
            if (durationElements[index]) {
            durationElements[index].innerText = formattedTime;
        }
        });
    });
});


songsItems.forEach((element, i) => {
    element.querySelector(".songItemImg img").src = songs[i].coverPath;
    element.querySelector(".songItemName span").innerText = songs[i].SongName; 
});


masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
audioElement.addEventListener('timeupdate', () => {
    console.log("Timeupdate");
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    console.log(progress);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () =>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })
     

}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        let clickedIndex = parseInt(e.target.id);

        if (songIndex === clickedIndex && !audioElement.paused) {
            // Same song clicked, pause it
            audioElement.pause();
            e.target.classList.remove("fa-circle-pause");
            e.target.classList.add("fa-circle-play");
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        } else {
            // Different song clicked or previously paused
            makeAllPlays();
            songIndex = clickedIndex;

            e.target.classList.remove("fa-circle-play");
            e.target.classList.add("fa-circle-pause");

            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].SongName;
            audioElement.currentTime = 0;
            audioElement.play();

            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
    });
});




document.getElementById('next').addEventListener('click', () => {
    if(songIndex >= 9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }

    audioElement.currentTime = 0;
     audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].SongName;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

});

document.getElementById('previous').addEventListener('click', () => {
    if(songIndex <= 0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }

    audioElement.currentTime = 0;
     audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].SongName;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

});
 

