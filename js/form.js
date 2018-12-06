'use strict';

(function () {
// модуль для форы
  var uploadElement = document.querySelector('.img-upload');
  var uploadPopupElement = uploadElement.querySelector('.img-upload__overlay');
  var uploadFileElement = uploadElement.querySelector('#upload-file');
  var inputLoadFileElement = document.querySelector('#upload-file');

  var hashtagElement = document.querySelector('.text__hashtags');
  var descriptionElement = document.querySelector('.text__description');
  var uploadPopupCloseElement = uploadElement.querySelector('#upload-cancel');
  var effectLevelElement = uploadElement.querySelector('.effect-level');
  var effectLevelValueElement = effectLevelElement.querySelector('.effect-level__value');

  var openForm = function () {
    uploadPopupElement.classList.remove('hidden');
    window.effects.setDefaultPinPosition();
    window.effects.setDefaultEffect();
    effectLevelValueElement.value = window.effects.PinValue.MAX;
    document.addEventListener('keydown', onFormEscPress);
  };

  var closeForm = function () {
    uploadPopupElement.classList.add('hidden');
    inputLoadFileElement.value = null;
    document.removeEventListener('keydown', onFormEscPress);
  };

  var onFormEscPress = function (evt) {
    window.util.isEscEvent(evt, closeForm);
  };

  uploadFileElement.addEventListener('change', function () {
    openForm();
    window.effects.setDefaultPinPosition();
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
})();
