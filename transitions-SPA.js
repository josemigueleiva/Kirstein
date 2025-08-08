document.addEventListener('DOMContentLoaded', function() {
  // 1. CUSTOM CURSOR
  const cursor = document.querySelector('.custom-cursor');
  if (cursor) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });

    document.querySelectorAll('a').forEach(link => {
      link.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      link.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // 2. PAGE SYSTEM
  const pages = {
    'index': document.getElementById('index-content'),
    'proyectos': document.getElementById('proyectos-content'),
    'contacto': document.getElementById('contacto-content')
  };

  function showPage(pageId) {
    // Hide all pages
    Object.values(pages).forEach(page => {
      if (page) page.style.display = 'none';
    });

    // Show selected page
    if (pages[pageId]) {
      pages[pageId].style.display = 'block';
    }

    // Update active link
    document.querySelectorAll('.navegacion a').forEach(link => {
      link.classList.remove('active');
    });
    const activeLink = document.querySelector(`.navegacion a[data-page="${pageId}"]`);
    if (activeLink) activeLink.classList.add('active');
  }

  // 3. NAVIGATION CLICKS
  document.querySelectorAll('.navegacion a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const pageId = this.getAttribute('data-page');
      showPage(pageId);
      window.history.pushState({ pageId }, '', `${pageId}.html`);
    });
  });

  // 4. HANDLE BROWSER BACK/FORWARD
  window.addEventListener('popstate', function(e) {
    const pageId = e.state?.pageId || 'index';
    showPage(pageId);
  });

  // 5. INITIAL LOAD
  let initialPage = 'index';
  if (window.location.pathname.includes('proyectos')) initialPage = 'proyectos';
  if (window.location.pathname.includes('contacto')) initialPage = 'contacto';

  showPage(initialPage);
  window.history.replaceState({ pageId: initialPage }, '', `${initialPage}.html`);

  // 6. TYPING EFFECT
  const phrases = ["<h1>¡Hola mundo!</h1>", "<h1>Hello, world!</h1>", "KIRSTEIN"];
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let speed = 150;

    function type() {
      const currentPhrase = phrases[phraseIndex % phrases.length];

      typingElement.innerHTML = isDeleting
        ? currentPhrase.substring(0, charIndex - 1)
        : currentPhrase.substring(0, charIndex + 1);

      if (!isDeleting && charIndex === currentPhrase.length) {
        speed = 1000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex++;
        speed = 500;
      } else {
        speed = isDeleting ? 50 : 150;
      }

      isDeleting ? charIndex-- : charIndex++;
      setTimeout(type, speed);
    }
    type();
  }
});

const phrases = [
            "<h1>¡Hola mundo!</h1>",
            "<h1>Hello, world!</h1>",
            "KIRSTEIN"
        ];
        const typingElement = document.getElementById('typing-text');
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 150; // milliseconds

        function type() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                // Deleting characters
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50; // Faster when deleting
            } else {
                // Typing characters
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 150;
            }

            // Check if current phrase is complete
            if (!isDeleting && charIndex === currentPhrase.length) {
                // Pause at end of phrase
                typingSpeed = 1000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Move to next phrase
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500; // Pause before typing next phrase
            }

            setTimeout(type, typingSpeed);
        }

        // Start the typing effect
        type();

        // Brick Wall Animation
        function initBrickWall() {
          const container = document.querySelector('.servicio .brick-wall-container');
          const brickWidth = 58;
          const brickHeight = 28;
          const brickGap = 2;
          const containerWidth = container.offsetWidth;
          const containerHeight = 200;
          const bricksPerRow = 3; // As requested - 5 bricks in bottom row
          const rows = Math.floor(containerHeight / (brickHeight + brickGap));

          let bricks = [];
          let currentBrick = 0;

          // Calculate adjusted brick width to fit exactly 5 bricks with gaps
          const totalGapWidth = (bricksPerRow - 1) * brickGap;
          const adjustedBrickWidth = (containerWidth - totalGapWidth) / bricksPerRow;

          // Create bricks from bottom to top
          for (let row = rows - 1; row >= 0; row--) {
            // Offset every other row for brick pattern
            const offset = row % 2 === 0 ? 0 : (adjustedBrickWidth + brickGap) / 2;

            for (let col = 0; col < bricksPerRow; col++) {
              const brick = document.createElement('div');
              brick.className = 'brick';

              const left = col * (adjustedBrickWidth + brickGap) + offset;
              const top = row * (brickHeight + brickGap);

              // If brick would go outside container, skip it
              if (left + adjustedBrickWidth > containerWidth) continue;

              brick.style.width = `${adjustedBrickWidth}px`;
              brick.style.height = `${brickHeight}px`;
              brick.style.left = `${left}px`;
              brick.style.top = `${top}px`;

              container.appendChild(brick);
              bricks.push(brick);
            }
          }

          // Animate bricks one by one in a continuous loop
          function animateBricks() {
            if (currentBrick >= bricks.length) {
              // Reset animation
              bricks.forEach(brick => brick.classList.remove('visible'));
              currentBrick = 0;
              setTimeout(animateBricks, 1000); // Pause before restarting
              return;
            }

            bricks[currentBrick].classList.add('visible');
            currentBrick++;
            setTimeout(animateBricks, 300);
          }

          // Start the animation
          setTimeout(animateBricks, 1000); // Initial delay
        }

        // Initialize when DOM is loaded
        document.addEventListener('DOMContentLoaded', initBrickWall);
