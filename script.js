(function(){
      const cursor = document.getElementById('cursor');

      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;
      let curX = mouseX;
      let curY = mouseY;

      const lerp = (a,b,t) => a + (b-a) * t;

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = 1;
      });

      window.addEventListener('mouseleave', ()=> cursor.style.opacity = 0);
      window.addEventListener('mouseenter', ()=> cursor.style.opacity = 1);

      window.addEventListener('mousedown', ()=> cursor.classList.add('pointer-down'));
      window.addEventListener('mouseup', ()=> cursor.classList.remove('pointer-down'));

      const interactSelector = 'a, button, input, textarea, [role="button"], .interactive';
      function updateSizeOverElement(x,y){
        const el = document.elementFromPoint(x,y);
        if(!el) return;
        if(el.closest && el.closest(interactSelector)){
          cursor.style.width = '28px';
          cursor.style.height = '28px';
        } else {
          cursor.style.width = '';
          cursor.style.height = '';
        }
      }

      function raf(){
        curX = lerp(curX, mouseX, parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--trail')) || 0.18);
        curY = lerp(curY, mouseY, parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--trail')) || 0.18);
        cursor.style.left = curX + 'px';
        cursor.style.top = curY + 'px';

        updateSizeOverElement(curX, curY);

        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      cursor.style.pointerEvents = 'none';
    })();

    const images = [
    'images/Rosler-LeFlaneur.png',
    'images/552176001.jpg',
    'images/bookofmarionette00joserich_0037.jpg',
    'images/brooklyn.jpg',
    'images/NYC.jpg',
    'images/NYC16364.jpg'
  ];

  let current = 0;
  const container = document.getElementById('bgContainer');

  function changeBackground() {
    current = (current + 1) % images.length;
    container.style.backgroundImage = `url('${images[current]}')`;
  }

  // Set initial image
  container.style.backgroundImage = `url('${images[0]}')`;

  // Change image every 3 seconds
  setInterval(changeBackground, 1000);
