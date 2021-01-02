'use strict';

const pinMainImage = window.pinMain.querySelector(`img`);
window.MAIN_PIN_ARROW_HEIGHT = 22;

pinMainImage.addEventListener(`mousedown`, function (evt) {
  if (evt.button === 2) {
    evt.preventDefault();

    const pinMainInitialX = window.pinMain.offsetLeft + Math.round(window.pinMain.offsetWidth / 2);
    const pinMainInitialY = window.pinMain.offsetTop + window.pinMain.offsetHeight + window.MAIN_PIN_ARROW_HEIGHT;

    window.addressInput.value = `${pinMainInitialX}, ${pinMainInitialY}`;
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      const pinMainX = window.pinMain.offsetLeft + Math.round(window.pinMain.offsetWidth / 2);
      const pinMainY = window.pinMain.offsetTop + window.pinMain.offsetHeight + window.MAIN_PIN_ARROW_HEIGHT;


      let shift = {
        x: moveEvt.clientX - startCoords.x,
        y: moveEvt.clientY - startCoords.y
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (pinMainX + shift.x > 0 && pinMainX + shift.x < 1200) {
        window.pinMain.style.left = (window.pinMain.offsetLeft + shift.x) + `px`;
      } else {
        document.removeEventListener(`mousemove`, onMouseMove);
      }

      if (pinMainY + shift.y > 130 && pinMainY + shift.y < 630) {
        window.pinMain.style.top = (window.pinMain.offsetTop + shift.y) + `px`;
      } else {
        document.removeEventListener(`mousemove`, onMouseMove);
      }

      window.addressInput.value = `${pinMainX + shift.x}, ${pinMainY + shift.y}`;
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  }

});

pinMainImage.addEventListener(`contextmenu`, function (evt) {
  evt.preventDefault();
});
