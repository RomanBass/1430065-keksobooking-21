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
    console.log(window.serverOffers[0]);
    window.map.insertBefore(window.renderCard(window.serverOffers[0]), window.mapFilters);

  }, function (message) {
    window.utils.showErrorMessage(message);
  });

};

// 15-12-2020 ---------------------------
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

window.renderCard = function (offer) {
  let newCard = cardTemplate.cloneNode(true);

  newCard.querySelector(`img`).src = offer.author.avatar;
  newCard.querySelector(`.popup__title`).textContent = offer.offer.title;
  newCard.querySelector(`.popup__text--price`).innerHTML = `${offer.offer.price}&#x20bd/ночь`;

  switch (offer.offer.type) {
    case `bungalow`:
      newCard.querySelector(`.popup__type`).textContent = `Бунгало`;
      break;
    case `flat`:
      newCard.querySelector(`.popup__type`).textContent = `Кватрира`;
      break;
    case `house`:
      newCard.querySelector(`.popup__type`).textContent = `Дом`;
      break;
    case `palace`:
      newCard.querySelector(`.popup__type`).textContent = `Дворец`;
      break;
  }

  newCard.querySelector(`.popup__text--capacity`).textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей`;
  newCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}`;

  const possibleFeaturesList = newCard.querySelector(`.popup__features`);
  const featuresList = offer.offer.features;
  possibleFeaturesList.innerHTML = ``;
  for (let i = 0; i < featuresList.length; i++) {
    const element = `<li class="popup__feature popup__feature--${featuresList[i]}"></li>`;
    possibleFeaturesList.insertAdjacentHTML(`beforeend`, element);
  }

  newCard.querySelector(`.popup__description`).textContent = offer.offer.description;

  const photoGallery = newCard.querySelector(`.popup__photos`);
  const photosList = offer.offer.photos;
  photoGallery.innerHTML = ``;
  for (let i = 0; i < photosList.length; i++) {
    const element = `<img src="${photosList[i]}" class="popup__photo" width="45" height="40" alt="Фотография жилья"></img>`;
    photoGallery.insertAdjacentHTML(`beforeend`, element);
  }

  return newCard;

};
