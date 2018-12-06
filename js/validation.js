'use strict';

(function () {

  var Hashtag = {
    QUANITY: 5,
    HASH_SYMBOL: '#',
    MAX_LENGTH: 20,
    MIN_LENGTH: 2
  };

  var hashtagElement = document.querySelector('.text__hashtags');
  var uploadElement = document.querySelector('.img-upload');
  var uploadTextAreaElement = uploadElement.querySelector('.img-upload__text');
  var uploadSubmitElement = uploadElement.querySelector('.img-upload__submit');
  // var descriptionElement = document.querySelector('.text__description');

  var checkRepeatHashtags = function (hashtags) {
    for (var i = 0; i < hashtags.length; i++) {
      var currentHashtag = hashtags[i];
      for (var j = 0; j < hashtags.length; j++) {
        if (currentHashtag === hashtags[j] && i !== j) {
          return true;
        }
      }
    }
    return false;
  };

  var validateHashtags = function (hashtags) {
    for (var i = 0; i < hashtags.length; i++) {
      hashtags[i] = hashtags[i].toLowerCase();
      if (hashtags[i][0] !== Hashtag.HASH_SYMBOL && hashtags[i][0] !== ' ') {
        hashtagElement.setCustomValidity('Хэштег должен начинаться с символа # и не содержать пробелов');
      } else if (hashtags[i].length > Hashtag.MAX_LENGTH) {
        hashtagElement.setCustomValidity('Длина хештега не должна превышать 20 символов');
      } else if (hashtags[i].length === 1) {
        hashtagElement.setCustomValidity('Хештег не может состоять только из одной решётки');
      } else if (hashtags.length > Hashtag.QUANITY) {
        hashtagElement.setCustomValidity('Допустимое количество  хэштегов  не более 5');
      } else if (checkRepeatHashtags(hashtags)) {
        hashtagElement.setCustomValidity('Хэштеги не должны повторяться');
      } else if (hashtags[i].indexOf('#', 1) !== -1) {
        hashtagElement.setCustomValidity('Хэштеги должны разделяться пробелами');
      } else {
        hashtagElement.setCustomValidity('');
      }
    }
  };

  var highlightInvalidField = function (field) {
    if (!field.validity.valid) {
      field.style.border = '2px solid red';
    } else {
      field.style.border = 'none';
    }
  };


  hashtagElement.addEventListener('input', function () {
    var hashtags = hashtagElement.value.toLowerCase().split(' ');
    validateHashtags(hashtags);
    highlightInvalidField(hashtagElement);
  });

  uploadSubmitElement.addEventListener('submit', function () {
    highlightInvalidField(hashtagElement);
    highlightInvalidField(uploadTextAreaElement);
  });


})();
