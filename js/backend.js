'use strict';

(function () {

  var STATUS_OK = 200;
  var SET_TIME = 10000; // 10s

  window.backend = {
    makeRequest: function (url, onSuccess, onError, method, data) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === STATUS_OK) {
          onSuccess(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения!!!');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс!!!');
      });

      xhr.timeout = SET_TIME;

      xhr.open(method, url);
      xhr.send(data);
    }
  };
})();
