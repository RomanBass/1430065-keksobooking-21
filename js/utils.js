'use strict';
(function () {

  window.utils = {
    getRandomNumber(min, max) { // функция генератор случайных чисел
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    reduceArray(array) { // функция сортирует массив случайным образом, затем отрезает и возвращает часть этого массива случайной длины
      let tinyArray = [];
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      for (let k = 0; k < window.utils.getRandomNumber(0, array.length); k++) {
        tinyArray[k] = array[k];
      }
      return tinyArray;
    }
  };
})();
