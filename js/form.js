'use strict';

(function () {

  var uploadFormElement = document.querySelector('#upload-select-image');
  var uploadElement = document.querySelector('.img-upload');
  var uploadPopupElement = uploadElement.querySelector('.img-upload__overlay');
  var uploadFileElement = uploadElement.querySelector('#upload-file');
  var uploadSendButtonElement = uploadElement.querySelector('.img-upload__submit');

  var hashtagElement = document.querySelector('.text__hashtags');
  var descriptionElement = document.querySelector('.text__description');
  var uploadPopupCloseElement = uploadElement.querySelector('#upload-cancel');

  var errorModalTemplate = document.querySelector('#error').content.querySelector('.error');
  var successModalTemplate = document.querySelector('#success').content.querySelector('.success');
  var mainElement = document.querySelector('main');


  var openForm = function () {
    uploadPopupElement.classList.remove('hidden');
    uploadSendButtonElement.disabled = false;
    window.effects.setDefaultPinPosition();
    window.effects.setDefaultEffect();
    document.addEventListener('keydown', onFormEscPress);
  };

  var closeForm = function () {
    uploadPopupElement.classList.add('hidden');
    uploadFileElement.value = null;
    document.removeEventListener('keydown', onFormEscPress);
  };

  var onFormEscPress = function (evt) {
    window.util.isEscEvent(evt, closeForm);
  };

  uploadFileElement.addEventListener('change', function () {
    openForm();
  });

  uploadPopupCloseElement.addEventListener('click', function () {
    closeForm();
  });

  hashtagElement.addEventListener('focusin', function () {
    document.removeEventListener('keydown', onFormEscPress);
  });

  hashtagElement.addEventListener('focusout', function () {
    document.addEventListener('keydown', onFormEscPress);
  });

  descriptionElement.addEventListener('focusin', function () {
    document.removeEventListener('keydown', onFormEscPress);
  });

  descriptionElement.addEventListener('focusout', function () {
    document.addEventListener('keydown', onFormEscPress);
  });

  var showModalError = function (element, text) {
    mainElement.appendChild(element);
    element.querySelector('.error__title').textContent = text;
    element.querySelector('.error__button').addEventListener('click', function () {
      closeModal();
    });
    document.addEventListener('keydown', onModalEscPress);
  };

  var closeModal = function () {
    var modalElement = mainElement.querySelector('.modal');
    mainElement.removeChild(modalElement);
    document.removeEventListener('keydown', onModalEscPress);
    modalElement.removeEventListener('click', onDocumentClick);
  };

  var showModalSucces = function (element) {
    document.addEventListener('keydown', onModalEscPress);
    mainElement.appendChild(element);
    element.querySelector('.success__button').addEventListener('click', function () {
      closeModal();
    });
    element.addEventListener('click', onDocumentClick);
  };

  var onDocumentClick = function (evt) {
    if (evt.target.tagName === 'SECTION') {
      closeModal();
    }
  };

  var onModalEscPress = function (evt) {
    window.util.isEscEvent(evt, closeModal);
  };


  var onError = function (errorMessage) {
    closeForm();
    showModalError(errorModalTemplate, errorMessage);
  };

  var onSuccess = function () {
    closeForm();
    showModalSucces(successModalTemplate);
  };

  uploadFormElement.addEventListener('submit', function (evt) {
    window.upload(new FormData(uploadFormElement), onSuccess, onError);
    uploadSendButtonElement.disabled = true;
    evt.preventDefault();
  });
})();
