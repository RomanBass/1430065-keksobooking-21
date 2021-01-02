'use strict';

const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
window.MAX_PINS_NUMBER = 10;
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
      if (window.serverOffers[i].offer !== null && window.serverOffers[i].offer !== undefined) {
        fragment.appendChild(window.renderOffer(window.serverOffers[i]));
      }
    }

    window.map.appendChild(fragment); // затем этот фрагмент передаёт в карту.
    window.map.insertBefore(window.renderCard(window.serverOffers[0]), window.mapFilters);
    window.map.querySelector(`article`).classList.add(`visually-hidden`);

    window.pinsOffersImages = window.map.querySelectorAll(`.map__pin:not(.map__pin--main) img`);
    window.pinsOffers = window.map.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    window.map.addEventListener(`click`, function (evt) {
      window.card.pinClickHandler(evt);
    });

    document.addEventListener(`keydown`, function (evt) {
      window.card.escPressHandler(evt);
    });

    for (let i = 0; i < window.pinsOffersImages.length; i++) {
      window.pinsOffersImages[i].id = i;
      window.pinsOffers[i].id = i;
    }

  }, function (message) {
    window.utils.showErrorMessage(message);
  });
};
