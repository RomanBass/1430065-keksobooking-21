'use strict';

const roomsNumberSelect = document.querySelector(`#room_number`);
const guestsNumberSelect = document.querySelector(`#capacity`);

window.addressInput.value = `${Math.round(window.mainPinInitialX + window.mainPinWidth / 2)}, ${Math.round(window.mainPinInitialY + window.mainPinHeight / 2)}`;

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
