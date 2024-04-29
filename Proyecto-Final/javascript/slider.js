document.addEventListener('DOMContentLoaded', function() {
  let index = 0;
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;

  function nextSlide() {
    index = (index + 1) % totalSlides;
    const offset = -index * slides[0].offsetWidth;
    document.querySelector('.slider').style.transform = `translateX(${offset}px)`;
  }

  setInterval(nextSlide, 4000); // Cambia de slide cada 3 segundos
});
 