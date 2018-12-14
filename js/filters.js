'use strict';

(function () {

  var NewPhoto = {
    MIN: 0,
    MAX: 10
  };

  window.filter = {
    filter: function (photos) {
      var filterFormElement = document.querySelector('.img-filters__form');
      var filtersButtonElements = filterFormElement.querySelectorAll('.img-filters__button');
      var picturesElement = document.querySelector('.pictures');

      var getNewPhotos = function (photo) {
        return window.util.shuffleArray(photo).slice(NewPhoto.MIN, NewPhoto.MAX);
      };

      var sortingByComments = function (posts) {
        return posts.slice().sort(function (first, second) {
          return second.comments.length - first.comments.length;
        });
      };

      var changeFilters = function (evt) {
        var target = evt.target;
        var pictures = picturesElement.querySelectorAll('.picture');
        pictures.forEach(function (item) {
          picturesElement.removeChild(item);
        });
        switch (target.id) {
          case 'filter-popular':
            window.picture.render(photos);
            break;
          case 'filter-new':
            window.picture.render(getNewPhotos(photos));
            break;
          case 'filter-discussed':
            window.picture.render(sortingByComments(photos));
            break;
        }
      };

      var debounceFilters = window.debounce(changeFilters);
      filterFormElement.addEventListener('click', function (evt) {
        var target = evt.target;
        if (target.tagName === 'BUTTON') {
          changeAcitveClass(target.id);
          debounceFilters(evt);
        }
      });

      var changeAcitveClass = function (currentFilter) {
        filtersButtonElements.forEach(function (item) {
          item.classList.remove('img-filters__button--active');
        });
        filterFormElement.querySelector('#' + currentFilter).classList.add('img-filters__button--active');
      };
    }
  };
})();
