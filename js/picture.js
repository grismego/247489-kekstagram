'use strict';

(function () {
  // модуль для отрисовки миниатюр
  var PHOTOS_COUNT = 25;

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesElement = document.querySelector('.pictures');
  var pictures = [];


  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.addEventListener('click', function () {
      window.gallery.openPhoto();
      window.preview.renderBigPicture(picture);
    });
    return pictureElement;
  };

  var appendPicture = function () {
    var fragment = document.createDocumentFragment();
    pictures = window.data.generatePhotos(PHOTOS_COUNT);
    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderPicture(pictures[i]));
    }
    picturesElement.appendChild(fragment);
  };

  window.picture = {
    appendPicture: appendPicture
  };

})();
