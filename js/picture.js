'use strict';

(function () {

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesElement = document.querySelector('.pictures');
  var filterElement = document.querySelector('.img-filters');

  var errorModalTemplate = document.querySelector('#error').content.querySelector('.error');
  var photos = [];

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

  var onLoad = function (data) {
    filterElement.classList.remove('img-filters--inactive');
    photos = data;
    window.filter.filter(photos);
    appendPicture(photos);
  };

  var appendPicture = function (pictures) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderPicture(pictures[i]));
    }
    picturesElement.appendChild(fragment);
  };

  var onError = function (errorMessage) {
    window.form.error(errorModalTemplate, errorMessage);
  };


  window.backend.load(onLoad, onError);

  window.picture = {
    render: appendPicture
  };

})();
