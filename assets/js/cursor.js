if (/Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent)) {
  console.log('Website visited on mobile!');
  const cursor = document.getElementById("cursor");
  cursor.remove();
} else {
  const cursor = document.getElementById("cursor");

  window.onpointermove = event => { 
    const { clientX, clientY } = event;
    
    cursor.animate({
      left: `${clientX}px`,
      top: `${clientY}px`
    }, { duration: 3000, fill: "forwards" });
  }
}