function screensaver1(elem, xmove, ymove, tmint, posx, posy) {
  let id = null;
  let counter = 0;
  let xx = Math.abs(xmove);
  let yy = Math.abs(ymove);
  clearInterval(id);
  id = setInterval(frame, tmint);
  function frame() {
      counter++
      if (counter >= 7) {
        counter = 0;
      }
      posx = posx + xmove;
      posy = posy + ymove;
      if (posx >= scr.clientWidth - elem.clientWidth) {
        xmove = -xx;
        sd.currentTime = 0;
        sd.play();
        elem.style.filter = col[counter];
      }
      if (posx <= 0) {
        xmove = xx;
        sd.currentTime = 0;
        sd.play();
        elem.style.filter = col[counter];
      }
      if (posy >= scr.clientHeight - elem.clientHeight) {
        ymove = -yy;
        sd.currentTime = 0;
        sd.play();
        elem.style.filter = col[counter];
      }
      if (posy <= 0) {
        ymove = yy;
        sd.currentTime = 0;
        sd.play();
        elem.style.filter = col[counter];
      }
      elem.style.top = posy + 'px';
      elem.style.left = posx + 'px';  
  }
} 

var scr = document.getElementById("container");
var sd = document.getElementById("sound");
var col = ["invert(11%) sepia(100%) saturate(4182%) hue-rotate(242deg) brightness(103%) contrast(152%)", 
              "invert(17%) sepia(72%) saturate(7057%) hue-rotate(357deg) brightness(101%) contrast(117%)", 
              "invert(73%) sepia(89%) saturate(4859%) hue-rotate(89deg) brightness(113%) contrast(140%)",
              "invert(91%) sepia(41%) saturate(1518%) hue-rotate(347deg) brightness(107%) contrast(112%)", 
              "invert(75%) sepia(78%) saturate(573%) hue-rotate(117deg) brightness(106%) contrast(105%)", 
              "invert(18%) sepia(50%) saturate(6763%) hue-rotate(296deg) brightness(118%) contrast(125%)",
              "none"];
const elem1 = document.getElementById("anim1");
const elem2 = document.getElementById("anim2");
const elem3 = document.getElementById("anim3");
let e1t = [1, 2, 5, scr.clientWidth/2, scr.clientHeight/2]; 
let e2t = [5, -1, 8, scr.clientWidth - elem2.clientWidth, 0]; 
let e3t = [-3, 1, 12, 0, 0];  
screensaver1(elem1, e1t[0], e1t[1], e1t[2], e1t[3], e1t[4]);
screensaver1(elem2, e2t[0], e2t[1], e2t[2], e2t[3], e2t[4]);
screensaver1(elem3, e3t[0], e3t[1], e3t[2], e3t[3], e3t[4]);