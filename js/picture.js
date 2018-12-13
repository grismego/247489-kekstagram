'use strict';

(function () {

  var NewPhoto = {
    MIN: 0,
    MAX: 10
  };

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesElement = document.querySelector('.pictures');
  var filterElement = document.querySelector('.img-filters');
  var filterFormElement = document.querySelector('.img-filters__form');
  var filtersButtonElements = filterFormElement.querySelectorAll('.img-filters__button');
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

  var changeFilters = function (evt) {
    var target = evt.target;
    var pictures = picturesElement.querySelectorAll('.picture');
    pictures.forEach(function (item) {
      picturesElement.removeChild(item);
    });
    switch (target.id) {
      case 'filter-popular':
        appendPicture(photos);
        break;
      case 'filter-new':
        appendPicture(getNewPhotos(photos));
        break;
      case 'filter-discussed':
        appendPicture(sortingByComments(photos));
        break;
    }
  };

  var changeAcitveClass = function (currentFilter) {
    filtersButtonElements.forEach(function (item) {
      item.classList.remove('img-filters__button--active');
    });
    filterFormElement.querySelector('#' + currentFilter).classList.add('img-filters__button--active');
  };

  var getNewPhotos = function (photo) {
    return window.util.shuffleArray(photo).slice(NewPhoto.MIN, NewPhoto.MAX);
  };

  var sortingByComments = function (posts) {
    return posts.slice().sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
  };

  var debounceFilters = window.debounce(changeFilters);
  filterFormElement.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.tagName === 'BUTTON') {
      changeAcitveClass(target.id);
      debounceFilters(evt);
    }
  });

  var onLoad = function (data) {
    filterElement.classList.remove('img-filters--inactive');
    photos = data;
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

  window.load(onLoad, onError);

})();
