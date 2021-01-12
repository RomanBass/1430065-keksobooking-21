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
