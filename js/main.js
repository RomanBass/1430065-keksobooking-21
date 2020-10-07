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

renderOffers(offers); // вызываем функцию генерации пинов на карте для массива предложений
