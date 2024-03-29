let numberTarget = 1;
function addNumberClassTarget() {
  const targets = $('.conference__targets-target');
  const targetClass = 'conference__targets-target--';
  targets.each(function () {
    $(this).addClass(`${targetClass}${numberTarget}`);
    numberTarget++;
  });
}
function handleProgrammDateClick(button) {
  const buttons = $('.conference__programm-date-button');
  const buttonActiveClass = 'conference__programm-date-button--active';
  buttons.each(function () {
    $(this).removeClass(buttonActiveClass);
  });
  button.addClass(buttonActiveClass);
}
$(document).ready(function () {
  // coference swipers
  const swiperConferenceMain = new Swiper('.conference__main-swiper', {
    direction: 'horizontal',
    slidesPerView: 5.4,
    freeMode: true,
    spaceBetween: 10,
    breakpoints: {
      450: {
        slidesPerView: 6.2
      },
      550: {
        slidesPerView: 7.5
      },
      580: {
        slidesPerView: 8
      },
      666: {
        slidesPerView: 9,
        spaceBetween: 10
      },
      1024: {
        slidesPerView: 9,
        spaceBetween: 20
      }
    }
  });
  const swiperConferenceAbout = new Swiper('.conference__about-swiper', {
    direction: 'horizontal',
    slidesPerView: 1,
    navigation: {
      nextEl: '.conference__about-swiper-button-next',
      prevEl: '.conference__about-swiper-button-prev'
    }
  });
  const swiperConferenceSpeakers = new Swiper('.conference__speakers-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    grid: {
      rows: 4
    },
    breakpoints: {
      1024: {
        slidesPerView: 4,
        grid: {
          rows: 1
        }
      }
    },
    navigation: {
      nextEl: '.conference__speakers-swiper-button-next',
      prevEl: '.conference__speakers-swiper-button-prev'
    }
  });
  const swiperConferenceOrganizators = new Swiper('.conference__organizators-swiper', {
    slidesPerView: 1,
    spaceBetween: 50,
    grid: {
      rows: 3
    },
    breakpoints: {
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
        grid: {
          rows: 1
        }
      }
    },
    navigation: {
      nextEl: '.conference__organizators-swiper-button-next',
      prevEl: '.conference__organizators-swiper-button-prev'
    }
  });
  const swiperConferencePartners = new Swiper('.conference__partners-swiper', {
    slidesPerView: 2,
    spaceBetween: 20,
    grid: {
      rows: 2
    },
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
        grid: {
          rows: 1
        }
      }
    },
    navigation: {
      nextEl: '.conference__partners-swiper-button-next',
      prevEl: '.conference__partners-swiper-button-prev'
    }
  });

  // conference add target classes
  addNumberClassTarget();

  // conference click date
  $('.conference__programm-date-button').on('click', function () {
    handleProgrammDateClick($(this));
  });

  // conference contact-us form
  $('#conference-contact-us-form').submit(function (e) {
    e.preventDefault();
  }).validate({
    errorElement: 'span',
    rules: {
      name: {
        required: true
      },
      phone: {
        required: true,
        digits: true
      },
      email: {
        required: true,
        email: true
      },
      question: {
        required: true
      }
    },
    messages: {
      name: {
        required: ''
      },
      phone: {
        required: '',
        digits: ''
      },
      email: {
        required: '',
        email: ''
      },
      question: {
        required: ''
      }
    },
    highlight: function (element) {
      $(element).closest('.conference__form-label-container').addClass('conference__form-label-container-error');
    },
    unhighlight: function (element) {
      $(element).closest('.conference__form-label-container').removeClass('conference__form-label-container-error');
    },
    submitHandler: function (form) {
      event.preventDefault();
      $.ajax({
        url: form.action,
        type: form.method,
        data: $(form).serialize(),
        success: function (response) {},
        error: function (xhr, status, error) {
          console.log('Error: ', error);
        }
      });
    }
  });
});