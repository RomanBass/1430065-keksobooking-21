'use strict';

const formSuccessTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
const formSuccessNotice = formSuccessTemplate.cloneNode(true);
const formErrorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
const formErrorNotice = formErrorTemplate.cloneNode(true);

window.noticeForm.addEventListener(`submit`, function (evt) { // при отправке данных формы...
  evt.preventDefault();

  window.upload(new FormData(window.noticeForm), // функция отправки данных на сервер

      function () { // функция выполняется, если отправка корректная
        window.main.appendChild(formSuccessNotice); // добавляем объявление об успешной отправке
        deactivatePage(); // функция деактивации страницы
        window.removeNotice(formSuccessNotice); // функция для закрытия объявления
      },

      function (message) { // функция выполняется, если отправка некорректная
        window.main.appendChild(formErrorNotice); // добавляем объявление об ошибке
        const formErrorNoticeText = document.querySelector(`.error__message`); // извлекаем параграф с сообщением
        formErrorNoticeText.textContent = message; // корректируем сообщение
        window.removeNotice(formErrorNotice); // функция для закрытия объявления
      });
});

window.removeNotice = function (notice) { // функция для закрытия объявления

  document.addEventListener(`keydown`, function (evtKeydown) { // закрытие сообщения по нажатию esc
    if (evtKeydown.key === `Escape` && window.main.contains(notice)) { // блокировка, чтобы не выдавалась ошибка об отсутствии дочернего элемента
      window.main.removeChild(notice); // удаляется блок объявления
      moveBackMainPin(); // функция возврата главной метки в начальное положение
    }
  });

  document.addEventListener(`click`, function () { // закрытие сообщения по клику
    if (window.main.contains(notice)) { // блокировка, чтобы не выдавалась ошибка об отсутствии дочернего элемента
      window.main.removeChild(notice); // удаляется блок объявления
      moveBackMainPin(); // функция возврата главной метки в начальное положение

      const articleElement = window.map.querySelector(`article`); // извлекаем карточку объявления
      window.map.removeChild(articleElement); // удаляем карточку объявления
    }
  });
};

const formResetButton = window.noticeForm.querySelector(`.ad-form__reset`); // извлекаем кнопку "очистить"

formResetButton.addEventListener(`click`, function () { // при клике на кнопке "очистить" деактивируем страницу и возвращаем форму в исходное состояние
  deactivatePage(); // функция деактивации страницы
  moveBackMainPin(); // функция возврата главной метки в начальное положение
});

const moveBackMainPin = function () { // функция возврата главной метки в начальное положение
  window.pinMain.style.left = window.mainPinInitialX + `px`; // возвращаем главную метку в начальное положение
  window.pinMain.style.top = window.mainPinInitialY + `px`; // возвращаем главную метку в начальное положение
  window.addressInput.value = window.mainPinInitialCoordinates; // задаём в адрес начальные координаты главной метки
};

const deactivatePage = function () { // функция деактивации страницы
  window.map.classList.add(`map--faded`); // деактивируем карту
  window.noticeForm.classList.add(`ad-form--disabled`); // деактивируем форму
  window.makeDisabled(true); // делаем недоступными поля фильтра
  window.noticeForm.reset(); // сбрасываем форму

  const currentPins = window.map.querySelectorAll(`.map__pin:not(.map__pin--main)`); // извлекаем существующие на данный момент метки
  for (let i = 0; i < currentPins.length; i++) {
    window.map.removeChild(currentPins[i]); // удаляем существующие на данный момент метки метки
  }

};
