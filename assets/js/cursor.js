const cursor = document.getElementById("cursor");
const cursor1 = document.querySelector('.cursor');
const container = document.querySelector(".container");
const memoji = document.querySelector('.memoji-animated');

if (/Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent)) {
  console.log('Website visited on mobile!');
  cursor.remove();
} else {
  window.onpointermove = event => { 
    const { clientX, clientY } = event;
    
    cursor.animate({
      left: `${clientX}px`,
      top: `${clientY}px`
    }, { duration: 3000, fill: "forwards" });

    const memojiRect = memoji.getBoundingClientRect();
    const rotateX = (clientY - memojiRect.top - memojiRect.height / 2) / -9;
    const rotateY = (clientX - memojiRect.left - memojiRect.width / 2) / -16.5;

    memoji.animate({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }, { duration: 2000 });
  }
}

function cursorFocus() {
  cursor1.classList.add("focused")
  cursor.classList.add("focused");
  container.classList.add("cursor-focused");
}
function cursorUnFocus() {
  cursor1.classList.remove("focused")
  container.classList.remove("cursor-focused");
  cursor.classList.remove("focused");
}

const positionElement = (e)=> {
  if (/Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent)) {
    console.log('Website visited on mobile!');
    cursor1.remove();
  } else {
    const mouseY = e.clientY;
    const mouseX = e.clientX;
    windowheigh = window.screen.height;
    windowwidth = window.screen.width;
    ambient = 1;
    cursor1.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  }
}

window.addEventListener('mousemove', positionElement)