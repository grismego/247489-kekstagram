'use strict';

(function () {

  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram/';
  var TIMEOUT = 10000;
  var CODES = {
    OK: 200,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  };

  var createRequest = function (method, url, xhr) {
    xhr.timeout = TIMEOUT;
    xhr.open(method, url);
  };

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === CODES.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    createRequest('GET', URL_LOAD, xhr);
    xhr.send();
  };

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case CODES.OK:
          onSuccess(xhr.response);
          break;
        case CODES.INTERNAL_SERVER_ERROR:
          onError('Внутренняя ошибка серевра: ' + xhr.status + ' ' + xhr.statusText);
          break;
        case CODES.NOT_FOUND:
          onError('404 Not Found');
          break;
        default:
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    createRequest('POST', URL_UPLOAD, xhr);
    xhr.send(data);
  };

})();
