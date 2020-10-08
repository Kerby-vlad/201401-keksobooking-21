'use strict';

(function () {
  let featuresWrapper;
  let photosWrapper;
  const CARD_TEMPLATE = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const CARD_PHOTO_TEMPLATE = document.querySelector(`#card`).content.querySelector(`.popup__photo`);

  window.cardModule = {
    fillCard(ad) {
      mainCard.removeAttribute(`style`);
      mainCard.querySelector(`.popup__title`).textContent = ad.offer.title;
      mainCard.querySelector(`.popup__text--address`).textContent = ad.offer.address;
      mainCard.querySelector(`.popup__text--price`).textContent = `${ad.offer.price} ₽/ночь`;
      mainCard.querySelector(`.popup__type`).textContent = `${window.dataModule.ROOM_TYPE_TRANSLATER[ad.offer.type]}`;
      mainCard.querySelector(`.popup__text--capacity`).textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
      mainCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${ad.offer.checkin}, выезд\t до ${ad.offer.checkout}`;
      mainCard.querySelector(`.popup__description `).textContent = ad.offer.description;
      mainCard.querySelector(`.popup__description `).textContent = ad.offer.description;
      mainCard.querySelector(`.popup__avatar`).src = ad.author.avatar;
      this.refactorLists(mainCard);
      this.fillCardList(featuresWrapper, `features`, ad, null);
      this.fillCardList(photosWrapper, `photos`, ad, CARD_PHOTO_TEMPLATE);
    },
    refactorLists(fragment) {
      featuresWrapper = fragment.querySelector(`.popup__features`);
      featuresWrapper.innerHTML = ``;
      photosWrapper = fragment.querySelector(`.popup__photos`);
      if (photosWrapper.querySelector(`.popup__photo`) !== null) {
        photosWrapper.removeChild(photosWrapper.querySelector(`.popup__photo`));
      }
    },
    fillCardList(wrapper, objectKey, adItem, elementTemplate) {
      for (let j = 0; j < adItem.offer[objectKey].length; j++) {
        let element;
        if (objectKey === `features`) {
          element = document.createElement(`li`);
          element.className = `popup__feature popup__feature--${adItem.offer[objectKey][j]}`;
        } else {
          element = elementTemplate.cloneNode(true);
          element.src = adItem.offer[objectKey][j];
        }
        wrapper.appendChild(element);
      }
    },
    createCard() {
      let fragment = CARD_TEMPLATE.cloneNode(true);
      document.querySelector(`.map__filters-container`).insertAdjacentHTML(`beforebegin`, fragment.outerHTML);
      mainCard = document.querySelector(`.map__card`);
      mainCard.setAttribute(`style`, `display: none`);
    },
    closeCardEsc(e) {
      if (e.key === `Escape`) {
        mainCard.setAttribute(`style`, `display: none`);
      }
    },
    closeCardClick() {
      mainCard.setAttribute(`style`, `display: none`);
    }
  };
}());