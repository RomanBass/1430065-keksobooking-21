'use strict';

const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

window.card = {
  pinClickHandlerForActivation(evt) {
    const articleElement = window.map.querySelector(`article`);

    if (!isNaN(parseInt(evt.target.id, 10))) {
      window.map.removeChild(articleElement);

      for (let i = 0; i < window.pinsOffers.length; i++) {
        window.pinsOffers[i].classList.remove(`map__pin--active`); // деактивируются все метки (кроме главной), существующие в ДОМе после активации страницы
      }

      window.map.insertBefore(window.renderCard(window.serverOffers[evt.target.id]), window.mapFilters); // вставляется элемент карточки перед блоком фильтров
      evt.target.closest(`button`).classList.add(`map__pin--active`); // активируется нажатая метка
    }

    if (evt.target.classList.contains(`popup__close`)) { // при нажатии на крестик у карточки, она скрывается
      articleElement.classList.add(`visually-hidden`);
    }

  },

  pinClickHandlerForFilter(evt) {
    const articleElement = window.map.querySelector(`article`);

    if (!isNaN(parseInt(evt.target.id, 10))) {
      window.map.removeChild(articleElement);

      for (let i = 0; i < window.afterFilterPins.length; i++) {
        window.afterFilterPins[i].classList.remove(`map__pin--active`); // деактивируются все метки (кроме главной), существующие в ДОМе после применения фильтра
      }

      window.map.insertBefore(window.renderCard(window.filteredOffers[evt.target.id]), window.mapFilters); // вставляется элемент карточки перед блоком фильтров
      evt.target.closest(`button`).classList.add(`map__pin--active`); // активируется нажатая метка
    }

    if (evt.target.classList.contains(`popup__close`)) { // при нажатии на крестик у карточки, она скрывается
      articleElement.classList.add(`visually-hidden`);
    }

  },

  escPressHandler(evt) { // при нажатии на ESC карточка скрывается
    const articleElement = window.map.querySelector(`article`);
    if (evt.key === `Escape` && !articleElement.classList.contains(`visually-hidden`)) {
      evt.preventDefault();
      articleElement.classList.add(`visually-hidden`);
    }
  }
};

window.renderCard = function (offer) {
  let newCard = cardTemplate.cloneNode(true);

  newCard.querySelector(`img`).src = offer.author.avatar;
  newCard.querySelector(`.popup__title`).textContent = offer.offer.title;
  newCard.querySelector(`.popup__text--address`).innerHTML = offer.offer.address;
  newCard.querySelector(`.popup__text--price`).innerHTML = `${offer.offer.price}&#x20bd/ночь`;

  switch (offer.offer.type) {
    case `bungalow`:
      newCard.querySelector(`.popup__type`).textContent = `Бунгало`;
      break;
    case `flat`:
      newCard.querySelector(`.popup__type`).textContent = `Квартира`;
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
