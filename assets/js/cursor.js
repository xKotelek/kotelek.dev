const cursor = document.getElementById("cursor");
const container = document.querySelector(".container");

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
  }
}

function cursorFocus() {
  cursor.classList.add("focused");
  container.classList.add("cursor-focused");
}
function cursorUnFocus() {
  container.classList.remove("cursor-focused");
  cursor.classList.remove("focused");
}