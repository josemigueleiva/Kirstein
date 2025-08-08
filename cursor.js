document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.querySelector('.custom-cursor');

  // Follow mouse movement
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  // Handle hover states
  const setHover = () => cursor.classList.add('hover');
  const removeHover = () => cursor.classList.remove('hover');

  // Apply to all links
  document.querySelectorAll('a').forEach(el => {
    el.addEventListener('mouseenter', setHover);
    el.addEventListener('mouseleave', removeHover);
  });

  // Optional: Apply to buttons or other elements
  document.querySelectorAll('button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('button-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('button-hover'));
  });

  // Hide cursor when mouse leaves window
  document.addEventListener('mouseout', () => cursor.style.opacity = '0');
  document.addEventListener('mouseover', () => cursor.style.opacity = '1');
});
