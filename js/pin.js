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

    // console.log(window.serverOffers);

    let fragment = document.createDocumentFragment();
    const takesNumber = window.serverOffers.length <= window.MAX_PINS_NUMBER ? window.serverOffers.length : window.MAX_PINS_NUMBER; // считается количество итераций, на случай, если с сервера придёт данных меньше, чем максимальное количество показываемых предложений
    for (let i = 0; i < takesNumber; i++) {
      if (window.serverOffers[i].offer !== null && window.serverOffers[i].offer !== undefined) {
        fragment.appendChild(window.renderOffer(window.serverOffers[i]));
      }
    }

    window.map.appendChild(fragment); // затем этот фрагмент передаёт в карту.
    window.map.insertBefore(window.renderCard(window.serverOffers[0]), window.mapFilters); // генерится карточка первого элемента из серверных данных
    const firstCard = window.map.querySelector(`article`);
    firstCard.classList.add(`visually-hidden`); // скрывается карточка первого элемента, чтобы её не было при активации карты

    window.pinsOffersImages = window.map.querySelectorAll(`.map__pin:not(.map__pin--main) img`);
    window.pinsOffers = window.map.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    window.map.addEventListener(`click`, function (evt) {
      window.card.pinClickHandler(evt); // генерится карточка при клике по пину

      const cardPhotosSection = window.map.querySelector(`.popup__photos`); // секция фоток жилья в карточке
      const cardFeaturesSection = window.map.querySelector(`.popup__features`); // секция опций жилья в карточке
      const cardDescriptionSection = window.map.querySelector(`.popup__description`); // секция описания жилья в карточке

      const hideCardsEmptySection = function (cardsEmptySection) { // функция скрывает пустую секцию в карточке
        if (cardsEmptySection.innerHTML === ``) {
          cardsEmptySection.classList.add(`visually-hidden`);
        }
      };

      hideCardsEmptySection(cardPhotosSection); // скрываю <div> с фотками жилья, если они отсутствуют в данных, полученных с сервера
      hideCardsEmptySection(cardFeaturesSection); // скрываю <ul> с опциями жилья, если они отсутствуют в данных, полученных с сервера
      hideCardsEmptySection(cardDescriptionSection); // скрываю <p> с описанием, если оно отсутствуют в данных, полученных с сервера

    });

    document.addEventListener(`keydown`, function (evt) { // скрываю карточку нажатием ESC
      window.card.escPressHandler(evt);
      for (let i = 0; i < window.pinsOffers.length; i++) {
        window.pinsOffers[i].classList.remove(`map__pin--active`); // делаю активную метку неактивной
      }
    });

    for (let i = 0; i < window.pinsOffersImages.length; i++) {
      window.pinsOffersImages[i].id = i;
      window.pinsOffers[i].id = i;
    }

  },

  function (message) {
    window.utils.showErrorMessage(message);
  });
};
