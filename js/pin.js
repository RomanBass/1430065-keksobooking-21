'use strict';

const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
window.MAX_PINS_NUMBER = 5;
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`); // вытаскиваем образец пина из html

window.renderOffer = function (offer) { // функция клонирует образец пина, заполняет свойствами и возвращает его
  let newPin = pinTemplate.cloneNode(true);
  newPin.querySelector(`img`).src = offer.author.avatar;
  newPin.style.left = offer.location.x - PIN_WIDTH / 2 + `px`;
  newPin.style.top = offer.location.y - PIN_HEIGHT + `px`;
  return newPin;
};

window.getOffersFromServer = function () {
  window.download(function (data) { // функция создаёт пустой фрагмент, генерит пины и вставляет их в этот фрагмент,
    window.serverOffers = data;
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < window.MAX_PINS_NUMBER; i++) {
      fragment.appendChild(window.renderOffer(window.serverOffers[i]));
    }
    window.map.appendChild(fragment); // затем этот фрагмент передаёт в карту.
  }, function (message) {
    window.utils.showErrorMessage(message);
  });
};
