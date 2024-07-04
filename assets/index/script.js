const song = {
  './assets/index/sounds/hurts me.mp3': '0RBw4ODUQPO4cuAOZtBGga',
  './assets/index/sounds/okay..mp3': '7FIEearfOP221QvSsQ8cKB',
  './assets/index/sounds/bécane - a colors show.mp3': '3oUEzTAoOxqZHN4xiqTGqJ',
}

const note = [
  "This guy cool",
  "note.exe",
  "note.txt",
  "note Note = 'Custom note'",
  "ass website no?",
  "Click for add a note",
  "Can you write something here please",
  "Buy SelfCTRL NOW --> selfctrl.appolon.dev",
  "Moon > Rise ?",
  "Lunar > Badlion",
  "Astolfo > Rise ?",
  "fukc"
]

const titles = [
  "Appolon.dev", "Appolon.de","Appolon.d", "Appolon.", "Appolon",
  "Appolo", "Appol", "Appo", "App", "Ap", "A", "Ap", "App", "Appo",
  "Appol", "Appolo", "Appolon", "Appolon.", "Appolon.d", "Appolon.de",
  "Appolon.dev", "ppolon.dev","polon.dev", "olon.dev", "lon.dev", 
  "on.dev","o.dev", ".dev", "dev", "ev", "v", "ev", "dev", "o.dev",
  "lon.dev", "olon.dev", "polon.dev", "ppolon.dev", "Appolon.dev"
]


const links = document.querySelectorAll('.typed-text a')
const slider = document.getElementById("sliderv");
const musiclink = document.getElementById("music");
const spath = Object.keys(song)
const sid = Object.values(song) 

let music;
let musicname;
let musicid;


function title() {
  i = 0;
  document.title = titles[i];
  function update() {
      i = (i + 1) % titles.length;
      document.title = titles[i];
  }
  setInterval(update, 100);
}


function checkbackend(callback) {
  fetch("https://appolon.dev/api/")
    .then(response => {
      if (response.status >= 200 && response.status < 400) {
        callback(true);
      } else {
        callback(false);
      }
    })
    .catch(error => {
      callback(false);
    });
}

function randomnote() {
  const rtext = note[Math.floor(Math.random() * note.length)];
  const textareao = document.getElementById("randomTextarea");
  textareao.placeholder = rtext;
}


function perror() {
  const params = new URLSearchParams(window.location.search);
  if (params.has('error')) {
      ntf(params.get('error'))
  }
}


function sendmessage(message) {
  const req = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'message': message
      },
  };
  fetch('https://appolon.dev/api/index/message', req)
      .then(response => {
          return response.json();
      })
      .then(data => {
          ntf('Message sent!')
      })
      .catch(error => {
          ntf('Error: ', error)
      })

  const inputElement = document.querySelector('.message');
  inputElement.value = '';
}


function ntf(message) {
  const ntfs = document.body.querySelectorAll('.notification');

  ntfs.forEach(notification => {
      document.body.removeChild(notification);
  });

  var notification = document.createElement("div");
  notification.className = "notification";
  notification.innerHTML = message;

  document.body.appendChild(notification);
  setTimeout(function() {
      notification.style.top = "10px";
      notification.style.opacity = "1";
  }, 10);

  setTimeout(function() {
      notification.style.top = "-100px";
      notification.style.opacity = "0";
  }, 5000);
}


function autoplayfix() {
  var body = Array.from(document.body.children);

  body.forEach(element => document.body.removeChild(element));

  var text = document.createElement("p");
  var footer = document.createElement("div");
  var bg = document.createElement("div");

  document.body.style.cursor = "crosshair";
  footer.innerHTML = '<a href="https://developer.chrome.com/blog/autoplay">Why?</a>';
  footer.querySelector('a').style.textDecoration = "none";
  text.textContent = "Click anywhere or press Enter";
  text.style.fontSize = "25px";
  text.style.fontWeight = "bold";
  text.style.position = "fixed";
  text.style.top = "50%";
  text.style.left = "50%";
  text.style.transform = "translate(-50%, -50%)";
  text.style.color = "white";
  text.style.zIndex = "2";
  footer.style.zIndex = "2";
  footer.style.position = "fixed";
  footer.style.top = "95%";
  footer.style.left = "50%";
  footer.style.transform = "translate(-50%, -50%)";
  footer.style.opacity = "0.7"
  footer.addEventListener("mouseover", function() { footer.style.opacity = "2" });
  footer.addEventListener("mouseout", function() { footer.style.opacity = "0.7" });

  bg.style.position = "fixed";
  bg.style.top = "0";
  bg.style.left = "0";
  bg.style.width = "100%";
  bg.style.height = "100%";
  bg.style.backgroundImage = "url('https://appolon.dev/api/download/renderbg_blur.webp')";
  bg.style.backgroundSize = "cover";
  bg.style.zIndex = "1";
  bg.style.transition = "opacity 0.5s";

  document.body.appendChild(bg);
  document.body.appendChild(text);
  document.body.appendChild(footer);

  function autoplayfix2() {
      text.style.opacity = "0";
      bg.style.opacity = "0";
      footer.style.opacity = "0";
      setTimeout(() => {
          document.body.removeChild(footer);
          document.body.removeChild(text);
          document.body.removeChild(bg);
          document.body.style.cursor = "auto";
          body.forEach(element => document.body.appendChild(element));
          initmusic();
          randomnote();
          spotifyinit();
          perror();
      }, 500);
      document.removeEventListener('click', autoplayfix2);
      document.removeEventListener('keypress', keyPressHandler);
  }

  function keyPressHandler(event) {
    if (event.key === 'Enter') {
        autoplayfix2();
    }
  }

  document.addEventListener('click', autoplayfix2);
  document.addEventListener('keypress', keyPressHandler);
}


function initmusic() {
  if(!musiclink) { return }
  const randomi = Math.floor(Math.random() * spath.length);
  const path = spath[randomi];
  const match = path.match(/\/([^/]+)\.\w+$/);
  musicname = match ? match[1] : "Unknown";
  musicid = sid[randomi]
  music = new Audio(path);
  music.volume = 0.2;
  musiclink.innerHTML = `<a href="https://open.spotify.com/track/${musicid}" id="music">[Music]</a>`
  music.play()
  ntf('Listening to "' + musicname + '"');
}


function changevolume(value) {
  if (!music.paused) {
      music.volume = value / 100;
      ntf('Volume changed to ' + (value) + '%');
  }
}

function pause() {
  if (!music.paused) {
      music.pause();
      ntf('Music paused');
  } else {
      music.play()
      ntf('Listening to "' + musicname + '"');
  }
}

function spotifyinit() {
    const SpotifyE = document.querySelector('.spotify');
    const SpotifyDIV = document.getElementById('spotifydiv');
    req = fetch('https://appolon.dev/api/index/spotify')
    .then(response => response.json())
    .then(data => {
      if (data['Track'] == undefined || data["Playing"] == false) {
        if(!music) {
          SpotifyDIV.remove()
          return
        }
        SpotifyE.innerHTML = `<iframe class="spotifyembed" src="https://open.spotify.com/embed/track/${musicid}?utm_source=generator&theme=0" width="100%" height="100" frameBorder="0" loading="lazy"></iframe>`
        SpotifyDIV.querySelector('.category-title').textContent = 'You are listening'
            return
        }
      SpotifyE.innerHTML = `<iframe class="spotifyembed" src="https://open.spotify.com/embed/track/${data['TrackID']}?utm_source=generator&theme=0" width="100%" height="100" frameBorder="0" loading="lazy"></iframe>`
      })
}

if (slider) {
  slider.addEventListener("change", function() {
      changevolume(slider.value)
  })
}

if (links) {
  links.forEach(pause => {
    const hovers = new Audio('https://appolon.dev/api/download/click.wav');
    pause.addEventListener('mouseenter', () => {
        hovers.play();
    });
  });
}



autoplayfix();
title();
