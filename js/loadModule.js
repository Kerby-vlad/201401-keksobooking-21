'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;

  window.loadModule = function (onSuccess, onError) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.open(`GET`, URL);

    xhr.addEventListener(`load`, ()=> {
      if (xhr.status === window.utilModule.StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.addEventListener(`error`, ()=> {
      onError(`Произошла ошибка соединения`);
    });

    xhr.send();
  };

})();
