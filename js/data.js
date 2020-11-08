'use strict';

(function () {
  const TITLES = [`Замок с приведениями.`, `В тесноте, но не в обиде.`, `Царские покои.`, `Хрущёвка ХХI века.`];
  const PRICE = [`10000 руб/мес`, `20000 руб/мес`, `30000 руб/мес`, `40000 руб/мес`, `50000 руб/мес`];
  const TYPE = [`palace`, `flat`, `house`, `bungalo`];
  const ROOMS_MAX_NUMBER = 5;
  const GUEST_MAX_NUMBER = 8;
  const CHECK_IN_OUT = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const DESCRIPTIONS = [`Уютное место, рядом вокзал`, `Тихое место, рядом казино.`, `Соседи повышенного уровня культуры, рядом прачечная.`, `Для постояльцев с IQ не выше 90.`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`, `https://i2.wp.com/www.sonmezrealestate.com/wp-content/uploads/2018/05/080-1.jpg?fit=1688%2C1125&ssl=1`, `https://elets-adm.ru/assets/images/resources/4281/c50acc2e5c569e61107070cc7fdb5ac0ae840194.jpg`];

  let getOffer = function (index) { // функция создаёт предложение
    const locationX = window.utils.getRandomNumber(0, 1200);
    const locationY = window.utils.getRandomNumber(130, 630);
    const checkInOut = CHECK_IN_OUT[window.utils.getRandomNumber(0, CHECK_IN_OUT.length - 1)];

    return {
      author: {
        avatar: `img/avatars/user0${index}.png`
      },
      offer: {
        title: TITLES[window.utils.getRandomNumber(0, TITLES.length - 1)],
        address: `${locationX}, ${locationY}`,
        price: PRICE[window.utils.getRandomNumber(0, PRICE.length - 1)],
        type: TYPE[window.utils.getRandomNumber(0, TYPE.length - 1)],
        rooms: window.utils.getRandomNumber(1, ROOMS_MAX_NUMBER),
        guests: window.utils.getRandomNumber(1, GUEST_MAX_NUMBER),
        checkin: checkInOut,
        checkout: checkInOut,
        features: window.utils.reduceArray(FEATURES),
        description: DESCRIPTIONS[window.utils.getRandomNumber(0, DESCRIPTIONS.length - 1)],
        photos: window.utils.reduceArray(PHOTOS)
      },
      location: {
        x: locationX,
        y: locationY,
      }
    };
  };

  window.data = {
    getOffers(number) { // функция создаёт и возвращает массив предложений
      const offers = [];
      for (let i = 0; i < number; i++) {
        offers.push(getOffer(i + 1));
      }
      return offers;
    }
  };
})();
