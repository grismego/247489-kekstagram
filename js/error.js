'use strict';

(function () {

  var mainElement = document.querySelector('main');
  var onDocumentClick = function (evt) {
    if (evt.target.tagName === 'SECTION') {
      closeModal();
    }
  };

  var closeModal = function () {
    var modalElement = mainElement.querySelector('.modal');
    mainElement.removeChild(modalElement);
    document.removeEventListener('keydown', onModalEscPress);
    modalElement.removeEventListener('click', onDocumentClick);
  };

  var onModalEscPress = function (evt) {
    window.util.isEscEvent(evt, closeModal);
  };

  var showModalError = function (element, text) {
    mainElement.appendChild(element);
    element.querySelector('.error__title').textContent = text;
    element.querySelector('.error__button').addEventListener('click', function () {
      closeModal();
    });
    element.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onModalEscPress);
  };

  window.error = {
    showModalError: showModalError
  };

})();
