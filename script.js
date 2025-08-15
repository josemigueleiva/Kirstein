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



  document.querySelector('a.proyectos').addEventListener('click', function (e) {
    e.preventDefault(); // prevent default link behavior
    const target = document.getElementById('contenedor2');

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'center' // aligns so that target is centered vertically
    });
  });


  document.addEventListener('DOMContentLoaded', function() {
  const clientLogos = [
    'images/forodelasartes.png',
    'images/odradek.png',
    'images/deptojota.png',
    'images/GPB.png',
    'images/mercadogris.png'
  ];

  const marqueeContent = document.querySelectorAll('.marquee-content');

  function createLogoElement(src) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = "Client logo";
    img.loading = "lazy";
    return img;
  }

  marqueeContent.forEach(content => {
    clientLogos.forEach(logo => content.appendChild(createLogoElement(logo)));
  });

  const totalLogos = clientLogos.length;
  const duration = Math.max(20, totalLogos * 1.5);

  // Apply animation inline
  marqueeContent.forEach(content => {
    content.style.animation = `scroll ${duration}s linear infinite`;
  });

  // Add keyframes via <style> element
  const style = document.createElement('style');
  style.textContent = `
    @keyframes scroll {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
  `;
  document.head.appendChild(style);
});
