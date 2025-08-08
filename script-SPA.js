document.addEventListener('DOMContentLoaded', function() {
  // ======================
  // 1. CUSTOM CURSOR
  // ======================
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

  // ======================
  // 2. PAGE TRANSITIONS (SIMPLIFIED)
  // ======================
  const navLinks = document.querySelectorAll('.navegacion a');
  const contentContainer = document.getElementById('content-container');

  // Hide all content sections by default
  const pages = {
    'index': document.getElementById('index-content'),
    'proyectos': document.getElementById('proyectos-content'),
    'contacto': document.getElementById('contacto-content')
  };

  // Function to show a page
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
    navLinks.forEach(link => {
      link.classList.remove('active');
    });
    document.querySelector(`[data-page="${pageId}"]`).classList.add('active');

    // Initialize page-specific effects
    if (pageId === 'index') {
      initTypingEffect();
      initBrickWall();
    }
  }

  // Set up navigation
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const pageId = this.getAttribute('data-page');
      history.pushState({ pageId }, '', `${pageId}.html`);
      showPage(pageId);
    });
  });

  // Handle browser history
  window.addEventListener('popstate', (e) => {
    const pageId = e.state?.pageId || 'index';
    showPage(pageId);
  });

  // Initialize
  const initialPage = window.location.pathname.includes('proyectos') ? 'proyectos' :
                    window.location.pathname.includes('contacto') ? 'contacto' : 'index';
  showPage(initialPage);

  // ======================
  // 3. TYPING EFFECT (SIMPLIFIED)
  // ======================
  function initTypingEffect() {
    const phrases = [
      "<h1>¡Hola mundo!</h1>",
      "<h1>Hello, world!</h1>",
      "KIRSTEIN"
    ];
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    function type() {
      const currentPhrase = phrases[phraseIndex % phrases.length];

      if (isDeleting) {
        typingElement.innerHTML = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingElement.innerHTML = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 1000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex++;
        typingSpeed = 500;
      }

      setTimeout(type, typingSpeed);
    }

    type();
  }

  // ======================
  // 4. BRICK WALL (SIMPLIFIED)
  // ======================
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
