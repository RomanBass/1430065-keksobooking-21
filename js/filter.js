'use strict';

const housingTypeSelector = document.querySelector(`#housing-type`); // извлекаем селектор типа жилья

housingTypeSelector.addEventListener(`change`, function (evt) { // фильтрация меток при изменении опций селектора типа жилья
  const housingType = evt.target.value; // извлекаем текущий параметр типа жилья из селектора

  window.beforeFilterPinsImages = window.map.querySelectorAll(`.map__pin:not(.map__pin--main) img`); // извлекаем изображения в существующих метках до этого фильтра
  window.beforeFilterPins = window.map.querySelectorAll(`.map__pin:not(.map__pin--main)`); // извлекаем существующие метки до этого фильтра

  for (let i = 0; i < window.beforeFilterPins.length; i++) {
    window.map.removeChild(window.beforeFilterPins[i]); // удаляем текущие метки
  }

  const articleElement = window.map.querySelector(`article`); // извлекаем карточку
  articleElement.classList.add(`visually-hidden`); // скрываем карточку

  window.filteredOffers = window.serverOffers.filter(function (serverOffer) { // фильтруются предложения полученные с сервера
    if (housingType === `any`) {
      return window.serverOffers;
    } else {
      return serverOffer.offer.type === housingType;
    }
  });

  let fragment = document.createDocumentFragment(); // создаётся фрагмент из отфильтрованных предложений
  const takesNumber = window.filteredOffers.length > window.MAX_PINS_NUMBER ? window.MAX_PINS_NUMBER : window.filteredOffers.length;
  for (let i = 0; i < takesNumber; i++) {
    fragment.appendChild(window.renderOffer(window.filteredOffers[i])); // фрагмент заполняется отфильтрованными предложениями
  }
  window.map.appendChild(fragment); // отрисовывается фрагмент из отфильтрованных предложений

  window.afterFilterPinsImages = window.map.querySelectorAll(`.map__pin:not(.map__pin--main) img`); // извлекаем изображения в текущих (отфильтрованных) метках
  window.afterFilterPins = window.map.querySelectorAll(`.map__pin:not(.map__pin--main)`); // извлекаем текущие (отфильтрованные) метки

  for (let i = 0; i < window.afterFilterPinsImages.length; i++) {
    window.afterFilterPinsImages[i].id = i; // присваиваются id изображениям меток отфильтрованных предложений
    window.afterFilterPins[i].id = i; // присваиваются id меткам отфильтрованных предложений
  }

  window.map.addEventListener(`click`, function (evtClick) { // генерация карточки при клике по метке
    window.card.pinClickHandlerForFilter(evtClick);

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

  document.addEventListener(`keydown`, function (evtEsc) { // скрываю карточку нажатием ESC
    window.card.escPressHandler(evtEsc);
    for (let i = 0; i < window.afterFilterPins.length; i++) {
      window.afterFilterPins[i].classList.remove(`map__pin--active`); // делаю активную метку неактивной
    }
  });

});
