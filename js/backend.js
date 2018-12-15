'use strict';

(function () {

  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram/';
  var TIMEOUT = 10000;
  var Code = {
    OK: 200,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  };

  var createRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case Code.OK:
          onSuccess(xhr.response);
          break;
        case Code.INTERNAL_SERVER_ERROR:
          onError('Внутренняя ошибка серевра: ' + xhr.status + ' ' + xhr.statusText);
          break;
        case Code.NOT_FOUND:
          onError('404 Not Found');
          break;
        default:
          onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
          break;
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    return xhr;
  };
  var load = function (onLoad, onError) {
    var xhr = createRequest(onLoad, onError);
    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  var upload = function (data, onLoad, onError) {
    var xhr = createRequest(onLoad, onError);
    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };

})();
