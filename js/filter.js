'use strict';

window.mapFilters.addEventListener(`change`, function () { // фильтрация меток при изменении опций селектора типа жилья
  const housingType = document.querySelector(`#housing-type option:checked`).value; // извлекаем текущий параметр типа жилья из селектора
  const housingPrice = document.querySelector(`#housing-price option:checked`).value; // извлекаем текущий параметр диапазона цен из селектора
  const housingRooms = document.querySelector(`#housing-rooms option:checked`).value; // извлекаем текущий параметр количества комнат из селектора
  const housingGuests = document.querySelector(`#housing-guests option:checked`).value; // извлекаем текущий параметр количества гостей из селектора

  window.beforeFilterPinsImages = window.map.querySelectorAll(`.map__pin:not(.map__pin--main) img`); // извлекаем изображения в существующих метках до этого фильтра
  window.beforeFilterPins = window.map.querySelectorAll(`.map__pin:not(.map__pin--main)`); // извлекаем существующие метки до этого фильтра

  for (let i = 0; i < window.beforeFilterPins.length; i++) {
    window.map.removeChild(window.beforeFilterPins[i]); // удаляем текущие метки
  }

  const articleElement = window.map.querySelector(`article`); // извлекаем карточку
  articleElement.classList.add(`visually-hidden`); // скрываем карточку

  const housingTypeFilteredOffers = window.serverOffers.filter(function (serverOffer) { // фильтруются предложения полученные с сервера по критерию типа жилья
    if (housingType === `any`) {
      return window.serverOffers;
    } else {
      return serverOffer.offer.type === housingType;
    }
  });

  const housingPriceFilteredOffers = housingTypeFilteredOffers.filter(function (serverOffer) { // фильтруются предложения (отфильтрованные в предыдущем фильтре) по диапазону цены
    let priceRange;
    switch (housingPrice) {
      case `any`:
        priceRange = housingTypeFilteredOffers;
        break;
      case `low`:
        priceRange = (serverOffer.offer.price <= 10000);
        break;
      case `middle`:
        priceRange = (serverOffer.offer.price > 10000 && serverOffer.offer.price < 50000);
        break;
      case `high`:
        priceRange = (serverOffer.offer.price >= 50000);
    }
    return priceRange;
  });

  const housingRoomsFilteredOffers = housingPriceFilteredOffers.filter(function (serverOffer) { // фильтруются предложения (отфильтрованные в предыдущем фильтре) по количеству комнат
    if (housingRooms === `any`) {
      return housingPriceFilteredOffers;
    } else {
      return serverOffer.offer.rooms === parseInt(housingRooms, 10); // преобразуем строку в целое число, т.к. value содержит строковый параметр
    }
  });

  const housingGuestsFilteredOffers = housingRoomsFilteredOffers.filter(function (serverOffer) { // фильтруются предложения (отфильтрованные в предыдущем фильтре) по количеству гостей
    if (housingGuests === `any`) {
      return housingRoomsFilteredOffers;
    } else {
      return serverOffer.offer.guests === parseInt(housingGuests, 10); // преобразуем строку в целое число, т.к. value содержит строковый параметр
    }
  });

  const facilitiesArray = document.querySelectorAll(`#housing-features input`); // извлекаем массив опций удобств

  let facilitiesFilteredOffers = housingGuestsFilteredOffers; // создаём массив предложений, который далее будем фильтровать по критерию удобств

  for (let i = 0; i < facilitiesArray.length; i++) { // цикл проходит по всем элементам массива опций удобств
    if (facilitiesArray[i].checked) { // если удобство i чекнуто, то...
      facilitiesFilteredOffers = facilitiesFilteredOffers.filter(function (serverOffer) { // фильтруем массив по удобству i
        return serverOffer.offer.features.includes(facilitiesArray[i].value);
      });
    }
  }

  window.filteredOffers = facilitiesFilteredOffers; // создаётся массив окончательно отфильтрованных предложений

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
