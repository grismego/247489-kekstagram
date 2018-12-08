'use strict';

(function () {
  // модуль для отрисовки миниатюр
  // var PHOTOS_COUNT = 25;

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesElement = document.querySelector('.pictures');
  // var pictures = [];


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


  var onLoad = function (pictures) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderPicture(pictures[i]));
    }
    picturesElement.appendChild(fragment);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: #232321;';
    node.style.position = 'absolute';
    node.style.left = '50%';
    node.style.top = '40%';
    node.style.padding = '40px';
    node.style.transform = 'translate(-50%, -50%)';
    node.style.fontSize = '30px';
    node.style.border = '12px groove #e6d71e';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };


  // var errorHandler = function () {
  //   console.log('error');
  // };

  window.load(onLoad, onError);

  // var appendPicture = function () {
  //   var fragment = document.createDocumentFragment();
  //   pictures = window.data.generatePhotos(PHOTOS_COUNT);
  //   for (var i = 0; i < pictures.length; i++) {
  //     fragment.appendChild(renderPicture(pictures[i]));
  //   }
  //   picturesElement.appendChild(fragment);
  // };

})();
