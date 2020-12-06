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
    },
    showErrorMessage(message) {
      const node = document.createElement(`div`);
      node.style = `border: 10px solid red; z-index: 100; margin: 0 auto; text-align: center; background-color: yellow; color: red; padding: 80px 0;`;
      node.style.position = `fixed`;
      node.style.left = 0;
      node.style.right = 0;
      node.style.top = `33vh`;
      node.style.width = `70%`;
      node.style.fontSize = `50px`;
      node.textContent = message;
      document.body.insertAdjacentElement(`afterbegin`, node);
    }
  };
})();
