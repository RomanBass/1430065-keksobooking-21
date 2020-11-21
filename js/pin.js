'use strict';

(function () {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`); // вытаскиваем образец пина из html

  window.renderOffer = function (offer) { // функция клонирует образец пина, заполняет свойствами и возвращает его
    let newPin = pinTemplate.cloneNode(true);
    newPin.querySelector(`img`).src = offer.author.avatar;
    newPin.style.left = offer.location.x - PIN_WIDTH / 2 + `px`;
    newPin.style.top = offer.location.y - PIN_HEIGHT + `px`;
    return newPin;
  };

  window.getOffersFromServer = function () {
    window.download(function (serverOffers) { // функция создаёт пустой фрагмент, генерит пины и вставляет их в этот фрагмент,
      const fragment = document.createDocumentFragment(); // затем этот фрагмент передаёт в карту.
      for (let i = 0; i < serverOffers.length; i++) {
        fragment.appendChild(window.renderOffer(serverOffers[i]));
      }
      window.map.appendChild(fragment);
    }, function (message) {
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
    });
  };

})();
