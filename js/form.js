'use strict';

(function () {

  var uploadFormElement = document.querySelector('#upload-select-image');
  var uploadElement = document.querySelector('.img-upload');
  var uploadPopupElement = uploadElement.querySelector('.img-upload__overlay');
  var uploadFileElement = uploadElement.querySelector('#upload-file');
  var uploadSendButtonElement = uploadElement.querySelector('.img-upload__submit');
  var descriptionElement = document.querySelector('.text__description');
  var hashtagElement = document.querySelector('.text__hashtags');
  var uploadPopupCloseElement = uploadElement.querySelector('#upload-cancel');

  var openForm = function () {
    uploadPopupElement.classList.remove('hidden');
    uploadSendButtonElement.disabled = false;
    window.effects.setDefaultEffect();
    document.addEventListener('keydown', window.util.onFormEscPress);
  };

  var closeForm = function () {
    uploadPopupElement.classList.add('hidden');
    uploadFileElement.value = null;
    descriptionElement.value = null;
    hashtagElement.value = null;
    window.scale.setDefaultScale();
    document.removeEventListener('keydown', window.util.onFormEscPress);
  };

  uploadFileElement.addEventListener('change', function () {
    openForm();
    window.fileReader.init();
  });

  uploadPopupCloseElement.addEventListener('click', function () {
    closeForm();
  });

  var onError = function (errorMessage) {
    closeForm();
    window.error.show(errorMessage);
  };

  var onSuccess = function () {
    closeForm();
    window.success.show();
  };

  uploadFormElement.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(uploadFormElement), onSuccess, onError);
    uploadSendButtonElement.disabled = true;
    evt.preventDefault();
  });

  window.form = {
    closeForm: closeForm
  }

})();
