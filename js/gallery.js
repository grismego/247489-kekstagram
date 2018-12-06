'use strict';

(function () {
// модуль для взаимодействия с изображениями
  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');

  var openPhoto = function () {
    bigPictureElement.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onPhotoEscPress);
  };

  var closePhoto = function () {
    bigPictureElement.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onPhotoEscPress);
  };


  var onPhotoEscPress = function (evt) {
    window.util.isEscEvent(evt, closePhoto);
  };

  bigPictureCloseElement.addEventListener('click', function () {
    closePhoto();
  });

  window.picture.appendPicture();

  window.gallery = {
    openPhoto: openPhoto,
    closePhoto: closePhoto
  };
})();
