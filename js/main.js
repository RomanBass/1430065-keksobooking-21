'use strict';

const OFFERS_NUMBER = 8;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const TITLES = [`Замок с приведениями.`, `В тесноте, но не в обиде.`, `Царские покои.`, `Хрущёвка ХХI века.`];
const PRICE = [`10000 руб/мес`, `20000 руб/мес`, `30000 руб/мес`, `40000 руб/мес`, `50000 руб/мес`];
const TYPE = [`palace`, `flat`, `house`, `bungalo`];
const ROOMS_MAX_NUMBER = 5;
const GUEST_MAX_NUMBER = 8;
const CHECK_IN_OUT = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const DESCRIPTIONS = [`Уютное место, рядом вокзал`, `Тихое место, рядом казино.`, `Соседи повышенного уровня культуры, рядом прачечная.`, `Для постояльцев с IQ не выше 90.`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`, `https://i2.wp.com/www.sonmezrealestate.com/wp-content/uploads/2018/05/080-1.jpg?fit=1688%2C1125&ssl=1`, `https://elets-adm.ru/assets/images/resources/4281/c50acc2e5c569e61107070cc7fdb5ac0ae840194.jpg`];

const map = document.querySelector(`.map`); // вытаскиваем карту из html
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`); // вытаскиваем образец пина из html

let getOffer = function (index) { // функция создаёт предложение
  const locationX = getRandomNumber(0, 1200);
  const locationY = getRandomNumber(130, 630);
  const checkInOut = CHECK_IN_OUT[getRandomNumber(0, CHECK_IN_OUT.length - 1)];

  return {
    author: {
      avatar: `img/avatars/user0${index}.png`
    },
    offer: {
      title: TITLES[getRandomNumber(0, TITLES.length - 1)],
      address: `${locationX}, ${locationY}`,
      price: PRICE[getRandomNumber(0, PRICE.length - 1)],
      type: TYPE[getRandomNumber(0, TYPE.length - 1)],
      rooms: getRandomNumber(1, ROOMS_MAX_NUMBER),
      guests: getRandomNumber(1, GUEST_MAX_NUMBER),
      checkin: checkInOut,
      checkout: checkInOut,
      features: reduceArray(FEATURES),
      description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)],
      photos: reduceArray(PHOTOS)
    },
    location: {
      x: locationX,
      y: locationY,
    }
  };
};

let getOffers = function (number) { // функция создаёт и возвращает массив предложений
  const offers = [];
  for (let i = 0; i < number; i++) {
    offers.push(getOffer(i + 1));
  }
  return offers;
};

let getRandomNumber = function (min, max) { // функция генератор случайных чисел
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let reduceArray = function (array) { // функция сортирует массив случайным образом, затем отрезает и возвращает часть этого массива случайной длины
  let tinyArray = [];
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  for (let k = 0; k < getRandomNumber(0, array.length); k++) {
    tinyArray[k] = array[k];
  }
  return tinyArray;
};

let renderOffer = function (offer) { // функция клонирует образец пина, заполняет свойствами и возвращает его
  let newPin = pinTemplate.cloneNode(true);
  newPin.querySelector(`img`).src = offer.author.avatar;
  newPin.style.left = offer.location.x - PIN_WIDTH / 2 + `px`;
  newPin.style.top = offer.location.y - PIN_HEIGHT + `px`;
  return newPin;
};

let renderOffers = function (offers) { // функция создаёт пустой фрагмент, генерит пины и вставляет их в этот фрагмент,
  const fragment = document.createDocumentFragment(); // затем этот фрагмент передаёт в карту.
  for (let i = 0; i < offers.length; i++) {
    fragment.appendChild(renderOffer(offers[i]));
  }
  map.appendChild(fragment);
};

const offers = getOffers(OFFERS_NUMBER); // массив предложений

// --23-10-2020--  ///////////////////////////////////////////////////////////////////////////////

const MAIN_PIN_ARROW_HEIGHT = 22;
const pinMain = document.querySelector(`.map__pin--main`); // вытащить главный пин
const mainPinWidth = pinMain.offsetWidth;
const mainPinHeight = pinMain.offsetHeight;
const filterSelects = document.querySelectorAll(`.map__filter`);
const filterFieldset = document.querySelector(`.map__features`);
const noticeFieldsets = document.querySelectorAll(`.ad-form__element`);
const noticeHeaderInput = document.querySelector(`.ad-form-header__input`);
const noticeForm = document.querySelector(`.ad-form`);
const mainPinInitialX = pinMain.offsetLeft;
const mainPinInitialY = pinMain.offsetTop;
const addressInput = document.querySelector(`#address`);
const roomsNumberSelect = document.querySelector(`#room_number`);
const guestsNumberSelect = document.querySelector(`#capacity`);

addressInput.value = `${Math.round(mainPinInitialX + mainPinWidth / 2)}, ${Math.round(mainPinInitialY + mainPinHeight / 2)}`;

const makeAnabledOrDisabled = function (boolean) {
  for (let i = 0; i < filterSelects.length; i++) {
    filterSelects[i].disabled = boolean;
  }
  filterFieldset.disabled = boolean;

  for (let i = 0; i < noticeFieldsets.length; i++) {
    noticeFieldsets[i].disabled = boolean;
  }
  noticeHeaderInput.disabled = boolean;
};

makeAnabledOrDisabled(true);

pinMain.addEventListener(`mousedown`, function (evt) {
  if (evt.button === 0) {
    renderOffers(offers);
    makeAnabledOrDisabled(false);
    map.classList.remove(`map--faded`);
    noticeForm.classList.remove(`ad-form--disabled`);
    addressInput.value = `${Math.round(mainPinInitialX + mainPinWidth / 2)}, ${Math.round(mainPinInitialY + mainPinHeight + MAIN_PIN_ARROW_HEIGHT)}`;
  }
});

pinMain.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    renderOffers(offers);
    makeAnabledOrDisabled(false);
    map.classList.remove(`map--faded`);
    noticeForm.classList.remove(`ad-form--disabled`);
    addressInput.value = `${Math.round(mainPinInitialX + mainPinWidth / 2)}, ${Math.round(mainPinInitialY + mainPinHeight + MAIN_PIN_ARROW_HEIGHT)}`;
  }
});

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

