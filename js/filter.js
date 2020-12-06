'use strict';

(function () {

  const housingTypeSelector = document.querySelector(`#housing-type`);

  housingTypeSelector.addEventListener(`change`, function (evt) {
    const housingType = evt.target.value;
    window.map.innerHTML = ``;
    window.map.appendChild(window.pinMain);
    window.map.appendChild(window.mapFilters);
    window.noticeForm.classList.add(`ad-form--disabled`);
    const filteredOffers = window.serverOffers.filter(function (serverOffer) {
      if (housingType === `any`) {
        return window.serverOffers;
      } else {
        return serverOffer.offer.type === housingType;
      }
    });

    let fragment = document.createDocumentFragment();
    const takeNumber = filteredOffers.length > window.MAX_PINS_NUMBER ? window.MAX_PINS_NUMBER : filteredOffers.length;
    for (let i = 0; i < takeNumber; i++) {
      fragment.appendChild(window.renderOffer(filteredOffers[i]));
    }
    window.map.appendChild(fragment);

  });

})();
