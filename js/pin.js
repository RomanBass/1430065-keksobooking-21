'use strict';

(function () {
  const OFFERS_NUMBER = 8;
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`); // вытаскиваем образец пина из html

  let renderOffer = function (offer) { // функция клонирует образец пина, заполняет свойствами и возвращает его
    let newPin = pinTemplate.cloneNode(true);
    newPin.querySelector(`img`).src = offer.author.avatar;
    newPin.style.left = offer.location.x - PIN_WIDTH / 2 + `px`;
    newPin.style.top = offer.location.y - PIN_HEIGHT + `px`;
    return newPin;
  };

  window.renderOffers = function (offers) { // функция создаёт пустой фрагмент, генерит пины и вставляет их в этот фрагмент,
    const fragment = document.createDocumentFragment(); // затем этот фрагмент передаёт в карту.
    for (let i = 0; i < offers.length; i++) {
      fragment.appendChild(renderOffer(offers[i]));
    }
    window.map.appendChild(fragment);
  };

  window.offers = window.data.getOffers(OFFERS_NUMBER); // массив предложений
})();
