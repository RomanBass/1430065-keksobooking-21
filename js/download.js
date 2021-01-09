'use strict';

window.download = function (onLoad, onError) {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const StatusCode = {
    OK: 200
  };
  const TIMEOUT = 10000;
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, function () {
    if (xhr.status === StatusCode.OK) {
      onLoad(xhr.response);
    } else {
      onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  });

  xhr.addEventListener(`error`, function () {
    onError(`Ошибка соединения`);
  });

  xhr.timeout = TIMEOUT;
  xhr.addEventListener(`timeout`, function () {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + ` мс`);
  });

  xhr.open(`GET`, URL);
  xhr.send();
};

// 06-01-2021 --------------------------------------------------------

window.upload = function (data, onSuccess, onError) {
  const URL = `https://21.javascript.pages.academy/keksobooking`;
  const xhr = new XMLHttpRequest();
  const StatusCode = {
    OK: 200
  };
  const TIMEOUT = 10000;
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, function () {
    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  });

  xhr.addEventListener(`error`, function () {
    onError(`Ошибка соединения`);
  });

  xhr.timeout = TIMEOUT;
  xhr.addEventListener(`timeout`, function () {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + ` мс`);
  });

  xhr.open(`POST`, URL);
  xhr.send(data);
};
/*
const formSuccessTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
const formSuccessNotice = formSuccessTemplate.cloneNode(true);
const formErrorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
window.formErrorNotice = formErrorTemplate.cloneNode(true);
window.main = document.querySelector(`main`); // извлекаем элемент main

window.noticeForm.addEventListener(`submit`, function (evt) { // при отправке данных формы...
  evt.preventDefault();

  window.upload(new FormData(window.noticeForm),

      function () { // функция выполняется, если отправка корректная
        window.main.appendChild(formSuccessNotice); // добавляем объявление об успешной отправке
        window.map.classList.add(`map--faded`); // деактивируем карту
        window.noticeForm.classList.add(`ad-form--disabled`); // деактивируем форму
        window.makeDisabled(true); // делаем недоступными поля фильтра
        window.noticeForm.reset(); // сбрасываем форму

        for (let i = 0; i < window.pinsOffers.length; i++) { // удаляем метки
          window.map.removeChild(window.pinsOffers[i]);
        }
        window.removeNotice(formSuccessNotice); // функция для закрытия объявления
      },

      function (message) { // функция выполняется, если отправка некорректная
        window.main.appendChild(window.formErrorNotice); // добавляем объявление об ошибке
        const formErrorNoticeText = document.querySelector(`.error__message`); // извлекаем параграф с сообщением
        formErrorNoticeText.textContent = message; // корректируем сообщение
        window.removeNotice(window.formErrorNotice); // функция для закрытия объявления
      });
});

window.removeNotice = function (notice) { // функция для закрытия объявления

  document.addEventListener(`keydown`, function (evtKeydown) { // закрытие сообщения по нажатию esc
    if (evtKeydown.key === `Escape` && window.main.contains(notice)) { // блокировка, чтобы не выдавалась ошибка об отсутствии дочернего элемента
      window.main.removeChild(notice);
      window.pinMain.style.left = window.mainPinInitialX + `px`;
      window.pinMain.style.top = window.mainPinInitialY + `px`;
      window.addressInput.value = window.mainPinInitialCoordinates;
    }
  });

  document.addEventListener(`click`, function () { // закрытие сообщения по клику
    if (window.main.contains(notice)) { // блокировка, чтобы не выдавалась ошибка об отсутствии дочернего элемента
      window.main.removeChild(notice);
      window.pinMain.style.left = window.mainPinInitialX + `px`;
      window.pinMain.style.top = window.mainPinInitialY + `px`;
      window.addressInput.value = window.mainPinInitialCoordinates;
    }
  });
};
*/
