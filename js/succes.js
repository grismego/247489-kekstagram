'use strict';

(function () {

  var mainElement = document.querySelector('main');
  var closeModal = function () {
    var modalElement = mainElement.querySelector('.modal');
    mainElement.removeChild(modalElement);
    document.removeEventListener('keydown', onModalEscPress);
    modalElement.removeEventListener('click', onDocumentClick);
  };

  var onDocumentClick = function (evt) {
    if (evt.target.tagName === 'SECTION') {
      closeModal();
    }
  };

  var onModalEscPress = function (evt) {
    window.util.isEscEvent(evt, closeModal);
  };
  var showModalSucces = function (element) {
    document.addEventListener('keydown', onModalEscPress);
    mainElement.appendChild(element);
    element.querySelector('.success__button').addEventListener('click', function () {
      closeModal();
    });
    element.addEventListener('click', onDocumentClick);
  };

  window.success = {
    showModalSucces: showModalSucces
  };

})();
