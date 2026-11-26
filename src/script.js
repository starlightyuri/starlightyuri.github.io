// no right click
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});
// clock.exe

function updateClock(){
  document.getElementById('userTime').textContent = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  document.getElementById('userDate').textContent = new Date().toLocaleDateString("en-GB" ,{
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  document.getElementById('kalTime').textContent = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Jakarta'
  });

  document.getElementById('kalDate').textContent = new Date().toLocaleDateString("en-GB" ,{
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: 'Asia/Jakarta'
  });
}
updateClock();
setInterval(updateClock, 1000);

chattable.initialize({
    stylesheet: "/src/chattable.css"
});

// yt iframe api

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);

var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '270',
    width: '480',
    
    playerVars: {
      controls: 0,
      listType: 'playlist',
      list: 'PLVWHrrh1v4l4'
    },

    events: {
      onStateChange: onPlayerStateChange,
      onReady: onPlayerReady
    }
  });
}

function onPlayerReady() {
  player.setShuffle(true);
  player.setLoop(true);
}


function onPlayerStateChange(event) {
  var playIcon = document.getElementById('play');
  var pauseIcon = document.getElementById('pause');

  if(event.data === YT.PlayerState.PLAYING){

    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
    player.unloadModule('captions');

    var videoData = player.getVideoData();

    document.getElementById('songAuthor').textContent = videoData.author;
    updateTitle(videoData.title);

  }
  else {
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
  }
}

function updateTitle(title) {
  var box = document.getElementById('titleBox');
  var title1 = document.getElementById('songTitle');
  var title2 = document.getElementById('songTitle2');
  var scroll = document.getElementById('scroll');

  title1.textContent = title;
  title2.textContent = title;

  if(title1.scrollWidth > box.clientWidth){
    scroll.style.setProperty(
      '--scroll-distance',
      title1.offsetWidth + 'px'
    );
    scroll.classList.add('scrolling');
  }
  else {
    scroll.classList.remove('scrolling');
  }

}

document.getElementById('playback').addEventListener("click", function() {
  if(player.getPlayerState() === YT.PlayerState.PLAYING) {
      player.pauseVideo();
  }
  else {
    player.playVideo();
  }
});

document.getElementById('next').addEventListener("click", function() {
  player.nextVideo();
});
  
document.getElementById('previous').addEventListener("click", function() {
  player.previousVideo();
});

// collapsible

var section = document.getElementById('osuSettings');
document.getElementById('openCollapsible').addEventListener("click", function() {
  if(section.style.display != 'block'){
    section.style.display = 'block';
  }
  else{
    section.style.display = 'none';
  }

});