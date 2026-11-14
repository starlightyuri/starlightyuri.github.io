document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

function updateUserClock() {

  const timeElement = document.getElementById('clock');
  const timeString = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }) 

  const date = new Date();
  document.getElementById("date_today").textContent =
  date.toLocaleDateString("en-GB" ,{
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  timeElement.textContent = timeString;
}
updateUserClock();
setInterval(updateUserClock, 1000);

function updateKalClock() {
  const clockElement = document.getElementById('clock-kal');
  const dateElement = document.getElementById('date-kal');
  const timezone = 'Asia/Jakarta';

  const timeOptions = {
    timeZone: timezone,
    hours: '2-digit',
    minutes: '2-digit',
    seconds: '2-digit'
  };

  const dateOptions = {
    timeZone: timezone,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }
  const timeString = new Date().toLocaleTimeString('en-GB', timeOptions);
  const dateString = new Date().toLocaleDateString('en-GB', dateOptions);

  clockElement.textContent = timeString;
  dateElement.textContent = dateString;
}
updateKalClock();
setInterval(updateKalClock, 1000);

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
        onReady: onPlayerReady,
      }
    });
  }
  
  function onPlayerReady() {
    player.setShuffle(true);
    player.setLoop(true);
  }

  document.getElementById('play-pause').addEventListener("click", function() {
    if(player.getPlayerState() === YT.PlayerState.PLAYING) {
      player.pauseVideo();
    }
    else{
      player.playVideo();
    }
  });
  
  document.getElementById('next').addEventListener("click", function() {
    player.nextVideo();
  });
  
  document.getElementById('back').addEventListener("click", function() {
    player.previousVideo();
  });

  function onPlayerStateChange(event) {
    var playIcon = document.getElementById('play');
    var pauseIcon = document.getElementById('pause');

    if(event.data === YT.PlayerState.PLAYING) {

      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
      
      var videoData = player.getVideoData();
      
      titleUpdate(videoData.title);
    
        player.unloadModule('captions');
        document.getElementById('songTitle').textContent = videoData.title;
        document.getElementById('songArtist').textContent = videoData.author;

    }
    else{
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
    }

    
}


function titleUpdate(title){
  var box = document.getElementById('title-box');
  var titleElement = document.getElementById('songTitle');
  var scroll = document.getElementById('scroll-title');
  var copy = document.getElementById('songTitleCopy');

  titleElement.textContent = title;
  copy.textContent = title;

  if(titleElement.scrollWidth > box.clientWidth) {
    scroll.style.setProperty(
      '--scroll-distance',
      titleElement.offsetWidth + 'px'
    );
    scroll.classList.add('scrolling');
  }
  else {
    scroll.classList.remove('scrolling');
  }

}

// chattable
 chattable.initialize({
    stylesheet: "src/chattable.css",
  });