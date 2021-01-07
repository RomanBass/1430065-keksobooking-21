'use strict';

const roomsNumberSelect = document.querySelector(`#room_number`);
const guestsNumberSelect = document.querySelector(`#capacity`);

// window.addressInput.value = `${Math.round(window.mainPinInitialX + window.mainPinWidth / 2)}, ${Math.round(window.mainPinInitialY + window.mainPinHeight / 2)}`;

const getConformity = function (roomsNumber, guestsNumber) {
  if (roomsNumber.value === `100` && guestsNumber.value !== `0`) {
    guestsNumber.setCustomValidity(`Этот номер не для гостей`);
  } else if (roomsNumber.value !== `100` && guestsNumber.value === `0`) {
    guestsNumber.setCustomValidity(`Этому варианту соответствует номер в 100 комнат`);
  } else if (roomsNumber.value !== `100` && (roomsNumber.value < guestsNumber.value || guestsNumber.value === `0`)) {
    guestsNumber.setCustomValidity(`Количество гостей не соответствует местам в номере`);
  } else {
    guestsNumber.setCustomValidity(``);
  }
};

getConformity(roomsNumberSelect, guestsNumberSelect);
guestsNumberSelect.addEventListener(`change`, function () {
  getConformity(roomsNumberSelect, guestsNumberSelect);
});
roomsNumberSelect.addEventListener(`change`, function () {
  getConformity(roomsNumberSelect, guestsNumberSelect);
});

// 24-12-2020 ------------------------------------------------------------------------------

const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;
const formTitleInput = document.querySelector(`#title`);
const MAX_PRICE = 1000000;

const formPriceInput = document.querySelector(`#price`);
const noticeHousingTypeSelector = document.querySelector(`#type`);
const noticeAddressInput = document.querySelector(`#address`);
const noticeCheckInSelector = document.querySelector(`#timein`);
const noticeCheckOutSelector = document.querySelector(`#timeout`);
const noticeCheckInOptions = document.querySelectorAll(`#timein option`);
const noticeCheckOutOptions = document.querySelectorAll(`#timeout option`);

let minPrice = 1000;

noticeAddressInput.readOnly = true;

formTitleInput.addEventListener(`input`, function () {
  const valueLength = formTitleInput.value.length;

  if (valueLength < TITLE_MIN_LENGTH) {
    formTitleInput.setCustomValidity(`Добавьте ` + (TITLE_MIN_LENGTH - valueLength) + ` симв.`);
  } else if (valueLength > TITLE_MAX_LENGTH) {
    formTitleInput.setCustomValidity(`Удалите ` + (valueLength - TITLE_MAX_LENGTH) + ` симв.`);
  } else {
    formTitleInput.setCustomValidity(``);
  }

  formTitleInput.reportValidity();
});

formTitleInput.addEventListener(`invalid`, function () {
  if (formTitleInput.validity.valueMissing) {
    formTitleInput.setCustomValidity(`Без заголовка не пройдёт!`);
  }
});

const makeSelectorsDependent = function (firstSelector, secondSelectorOptions) {
  firstSelector.addEventListener(`change`, function (evt) {
    for (let i = 0; i < secondSelectorOptions.length; i++) {
      if (secondSelectorOptions[i].value === evt.target.value) {
        secondSelectorOptions[i].selected = true;
      }
    }
  });
};

makeSelectorsDependent(noticeCheckInSelector, noticeCheckOutOptions);
makeSelectorsDependent(noticeCheckOutSelector, noticeCheckInOptions);

noticeHousingTypeSelector.addEventListener(`change`, function (evt) {
  switch (evt.target.value) {
    case `bungalow`:
      minPrice = 0;
      break;
    case `flat`:
      minPrice = 1000;
      break;
    case `house`:
      minPrice = 5000;
      break;
    case `palace`:
      minPrice = 10000;
      break;
  }
  formPriceInput.placeholder = minPrice;
  formPriceInput.value = ``;
});

formPriceInput.addEventListener(`input`, function () {
  const price = formPriceInput.value;

  if (price > MAX_PRICE) {
    formPriceInput.setCustomValidity(`Больше миллиона цен не бывает`);
  } else if (price < minPrice) {
    formPriceInput.setCustomValidity(`Меньше ${minPrice} цены не бывает`);
  } else {
    formPriceInput.setCustomValidity(``);
  }

  formPriceInput.reportValidity();
});

formPriceInput.addEventListener(`invalid`, function () {
  if (formPriceInput.validity.valueMissing) {
    formPriceInput.setCustomValidity(`Как же без цены?`);
  }
});
