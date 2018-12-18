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
    descriptionElement.value = null;
    hashtagElement.value = null;
    window.scale.setDefaultScale();
    document.removeEventListener('keydown', onFormEscPress);
  };

  var onFormEscPress = function (evt) {
    window.util.isEscEvent(evt, closeForm);
  };

  uploadFileElement.addEventListener('change', function () {
    openForm();
    window.fileReader.init();
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


  var onError = function (errorMessage) {
    closeForm();
    window.error.showModalError(errorModalTemplate, errorMessage);
  };

  var onSuccess = function () {
    closeForm();
    window.success.showModalSucces(successModalTemplate);
  };

  uploadFormElement.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(uploadFormElement), onSuccess, onError);
    uploadSendButtonElement.disabled = true;
    evt.preventDefault();
  });


})();
