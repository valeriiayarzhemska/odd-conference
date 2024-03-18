$(document).ready(function () {
  console.log('1');
  const swiper = new Swiper('.conference__main-swiper', {
    direction: 'horizontal',
    slidesPerView: 5.4,
    freeMode: true,
    spaceBetween: 10,
    breakpoints: {
      450: {
        slidesPerView: 6.2,
      },
      550: {
        slidesPerView: 7.5,
      },
      580: {
        slidesPerView: 8,
      },
      666: {
        slidesPerView: 9,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 9,
        spaceBetween: 20,
      },
    },
  });
});
