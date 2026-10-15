// music

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
  
  const playerWindow = document.getElementById('player');
  playerWindow.dataset.opened = "false";

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

let highestZ = 1;

document.querySelectorAll('.open').forEach(button => {
    button.addEventListener('dblclick', function() {
        const dialog = document.getElementById(this.dataset.target);
        const windowDiv = dialog.querySelector('.window');

        dialog.style.display = 'block';

        if (!dialog.dataset.opened) {
            windowDiv.style.left = "50vw";
            windowDiv.style.top = "50vh";
            windowDiv.style.transform = "translate(-50%, -50%)";

            dialog.dataset.opened = "true";
        }

        highestZ++;
        windowDiv.style.zIndex = highestZ;
    });
});


document.querySelectorAll('.close').forEach(button => {
    button.addEventListener('click', function() {

      document.getElementById(this.dataset.target).style.display = 'none';
      
      if(this.dataset.target == "music"){
        player.pauseVideo();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
      }
    });
});


const windows = document.querySelectorAll(".window");

windows.forEach(windowDiv => {
    const titleBar = windowDiv.querySelector(".tab");

    let offsetX;
    let offsetY;
    let dragging = false;    

    titleBar.addEventListener("mousedown", (e) => {
        dragging = true;

        highestZ++;
        windowDiv.style.zIndex = highestZ;

        const rect = windowDiv.getBoundingClientRect();
        const desktopRect = document.querySelector(".desktop").getBoundingClientRect();

        windowDiv.style.transform = "none";
        windowDiv.style.left = `${rect.left - desktopRect.left}px`;
        windowDiv.style.top = `${rect.top - desktopRect.top}px`;

        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
    });

    windowDiv.addEventListener("mousedown", () => {
      highestZ++;
      windowDiv.style.zIndex = highestZ;
    });
    
    document.addEventListener("mousemove", (e) => {
        if (!dragging) return;

        const desktopRect = document.querySelector(".desktop").getBoundingClientRect();

        const limitX = desktopRect.width - windowDiv.offsetWidth;
        const limitY = desktopRect.height - windowDiv.offsetHeight;
        
        let x = e.clientX - desktopRect.left - offsetX;
        let y = e.clientY - desktopRect.top - offsetY;

        
        x = Math.max(0, Math.min(x, limitX));
        y = Math.max(0, Math.min(y, limitY));

        windowDiv.style.left = x + "px";
 
        windowDiv.style.top = y + "px";
    });

    document.addEventListener("mouseup", () => {
        dragging = false;
    });

    document.addEventListener("mouseout", () => {
        dragging = false;
    });
});

var jpDate = false;

function updateClock() {

  const timeElement = document.getElementById("time");
  const timeString = new Date().toLocaleTimeString("ja-JP", {
    timeZone: "Asia/Jakarta",
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }) 

  const date = new Date();
  document.getElementById("date").textContent =
  date.toLocaleDateString("ja-JP" ,{
    month: "2-digit",
    day: "2-digit",
    year: "numeric"
  });

  timeElement.textContent = timeString;
}
updateClock();
setInterval(updateClock, 1000);

var collapsible_isactive = false;

document.getElementById("open-collapsible").addEventListener('click', function(){
    if(!collapsible_isactive){
        collapsible_isactive = true;
        document.getElementById("osu-settings").style.display = 'block';
    }
    else{
        collapsible_isactive = false;
        document.getElementById("osu-settings").style.display = 'none';
    }
});

// chat
chattable.initialize({
    stylesheet: "src/chattable.css",
  });

//no right click
document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
});

//crt toggle

var crtState = false;
var crtEffect = document.getElementById("crtEffect");

document.getElementById("tog-crt").addEventListener("click", function() {
  if(!crtState){
    crtState = true;
    crtEffect.style.display = 'block';
    document.getElementById("crt-off").style.display = 'none';
    document.getElementById("crt-on").style.display = 'block';
  }

  else{
    crtState = false;
    crtEffect.style.display = 'none';
    document.getElementById("crt-off").style.display = 'block';
    document.getElementById("crt-on").style.display = 'none';
  }

});
