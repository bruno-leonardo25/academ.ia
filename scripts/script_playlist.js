let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function goToSlide(index) {
  const slidesContainer = document.querySelector('.slides');
  slidesContainer.style.transform = `translateX(-${index * 100}%)`;
  currentIndex = index;
  updateDots();
}

function updateDots() {
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}