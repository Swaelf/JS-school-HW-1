function screensaver1() {
  let id = null;
  const elem = document.getElementById("anim");
  const scr = document.getElementById("container");
  const sd = document.getElementById("sound");
  const col = ["invert(11%) sepia(100%) saturate(4182%) hue-rotate(242deg) brightness(103%) contrast(152%)", 
              "invert(17%) sepia(72%) saturate(7057%) hue-rotate(357deg) brightness(101%) contrast(117%)", 
              "invert(73%) sepia(89%) saturate(4859%) hue-rotate(89deg) brightness(113%) contrast(140%)",
              "invert(91%) sepia(41%) saturate(1518%) hue-rotate(347deg) brightness(107%) contrast(112%)", 
              "invert(75%) sepia(78%) saturate(573%) hue-rotate(117deg) brightness(106%) contrast(105%)", 
              "invert(18%) sepia(50%) saturate(6763%) hue-rotate(296deg) brightness(118%) contrast(125%)",
              "none"];
  let counter = 0;
  let posx = 0;
  let posy = 0;
  let xmove = 1; 
  let ymove = 2;
  clearInterval(id);
  id = setInterval(frame, 5);
  function frame() {
      counter++
      if (counter >= 7) {
        counter = 0;
      }
      posx = posx + xmove;
      posy = posy + ymove;
      if (posx >= scr.clientWidth - elem.clientWidth) {
        xmove = -1;
        sd.currentTime = 0;
        sd.play();
        elem.style.filter = col[counter];
      }
      if (posx <= 0) {
        xmove = 1;
        sd.currentTime = 0;
        sd.play();
        elem.style.filter = col[counter];
      }
      if (posy >= scr.clientHeight - elem.clientHeight) {
        ymove = -2;
        sd.currentTime = 0;
        sd.play();
        elem.style.filter = col[counter];
      }
      if (posy <= 0) {
        ymove = 2;
        sd.currentTime = 0;
        sd.play();
        elem.style.filter = col[counter];
      }
      //elem.setAttribute('x', posx/(scr.clientWidth - elem.clientWidth)*20);;
      
      elem.style.top = posy + 'px';
      elem.style.left = posx + 'px';  
  }
} 

screensaver1();