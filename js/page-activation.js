'use strict';

const mainPinWidth = window.pinMain.offsetWidth;
const mainPinHeight = window.pinMain.offsetHeight;
const filterSelects = document.querySelectorAll(`.map__filter`);
const filterFieldset = document.querySelector(`.map__features`);
const noticeFieldsets = document.querySelectorAll(`.ad-form__element`);
const noticeHeaderInput = document.querySelector(`.ad-form-header__input`);

window.mainPinInitialX = window.pinMain.offsetLeft;
window.mainPinInitialY = window.pinMain.offsetTop;
window.addressInput = document.querySelector(`#address`);
window.mainPinInitialCoordinates = `${window.mainPinInitialX + Math.round(mainPinWidth / 2)}, ${window.mainPinInitialY + Math.round(mainPinHeight / 2)}`;

window.makeDisabled = function (boolean) {
  for (let i = 0; i < filterSelects.length; i++) {
    filterSelects[i].disabled = boolean;
  }
  filterFieldset.disabled = boolean;

  for (let i = 0; i < noticeFieldsets.length; i++) {
    noticeFieldsets[i].disabled = boolean;
  }
  noticeHeaderInput.disabled = boolean;
};

window.makeDisabled(true);
window.addressInput.value = window.mainPinInitialCoordinates;

window.pinMain.addEventListener(`mousedown`, function (evt) {
  if (evt.button === 0 && window.map.classList.contains(`map--faded`)) {
    window.getOffersFromServer();
    window.makeDisabled(false);
    window.map.classList.remove(`map--faded`);
    window.noticeForm.classList.remove(`ad-form--disabled`);
    window.addressInput.value = `${window.mainPinInitialX + Math.round(mainPinWidth / 2)}, ${window.mainPinInitialY + mainPinHeight + window.MAIN_PIN_ARROW_HEIGHT}`;
  }
});

window.pinMain.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter` && window.map.classList.contains(`map--faded`)) {
    window.getOffersFromServer();
    window.makeDisabled(false);
    window.map.classList.remove(`map--faded`);
    window.noticeForm.classList.remove(`ad-form--disabled`);
    window.addressInput.value = `${Math.round(window.mainPinInitialX + mainPinWidth / 2)}, ${Math.round(window.mainPinInitialY + mainPinHeight + window.MAIN_PIN_ARROW_HEIGHT)}`;
  }
});
