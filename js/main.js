'use strict';

const MAP = document.querySelector(`.map`);
const FORM = document.querySelector(`.ad-form`);
const MAP_FILTERS = document.querySelector(`.map__filters`);
const MAIN_PIN = document.querySelector(`.map__pin--main`);

function openMapClick(e) {
  if (e.button === 0) {
    toggleInactiveState(true);
    document.removeEventListener(`keydown`, openMapEnter);
  }
}
function openMapEnter() {
  document.addEventListener(`keydown`, function (e) {
    if (e.key === `Enter`) {
      toggleInactiveState(true);
      MAIN_PIN.removeEventListener(`mousedown`, openMapClick);
    }
  });
}

function toggleInactiveState(isRemoving) {
  if (isRemoving) {
    MAIN_PIN.removeEventListener(`mousedown`, openMapClick);
    MAIN_PIN.removeEventListener(`focus`, openMapEnter);
    MAIN_PIN.addEventListener(`mousedown`, function (e) {
      window.pinModule.mainPinDown(e);
    });
    window.dataModule.fillOffers();
    window.cardModule.createCard();
    MAP.classList.remove(`map--faded`);
    FORM.classList.remove(`ad-form--disabled`);
    window.utilModule.setAddress();
    window.formModule.checkCapacity();
  } else {
    FORM.querySelector(`#address`).value = `${MAIN_PIN.offsetLeft - MAIN_PIN.clientWidth / 2};${MAIN_PIN.offsetLeft - MAIN_PIN.clientHeight / 2}`;
  }
  document.querySelector(`.notice`).querySelectorAll(`fieldset`).forEach(function (field) {
    field.toggleAttribute(`disabled`);
  });

  MAP_FILTERS.toggleAttribute(`disabled`);

  MAP_FILTERS.classList.toggle(`map__filters--disabled`);

  MAP_FILTERS.querySelectorAll(`select`).forEach(function (field) {
    field.toggleAttribute(`disabled`);
  });
}

toggleInactiveState(false);

MAIN_PIN.addEventListener(`mousedown`, openMapClick);

MAIN_PIN.addEventListener(`focus`, openMapEnter);

FORM.addEventListener(`change`, function (e) {
  window.formModule.checkingChanges(e);
});

FORM.addEventListener(`submit`, function () {
  window.formModule.checkCapacity();
});
