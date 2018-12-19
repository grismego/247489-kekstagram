'use strict';

(function () {

  var Hashtag = {
    QUANITY: 5,
    HASH_SYMBOL: '#',
    MAX_LENGTH: 20
  };

  var hashtagElement = document.querySelector('.text__hashtags');
  var uploadElement = document.querySelector('.img-upload');
  var uploadTextAreaElement = uploadElement.querySelector('.img-upload__text');
  var uploadSubmitElement = uploadElement.querySelector('.img-upload__submit');
  var descriptionElement = document.querySelector('.text__description');

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

  var hashtagValidity = function () {
    hashtagElement.style.outline = '';
    var errorMessage = '';
    var hashtagValue = hashtagElement.value.trim();

    if (hashtagValue === '') {
      hashtagElement.setCustomValidity(errorMessage);
      return;
    }
    var hashtags = hashtagValue.toLowerCase().split(' ');
    hashtags.forEach(function (hashtagItem) {
      if (hashtagItem.charAt(0) !== Hashtag.HASH_SYMBOL) {
        errorMessage = 'Хэштег должен начинаться с символа #';
      } else if (hashtagItem.indexOf(Hashtag.HASH_SYMBOL, 1) > 1) {
        errorMessage = 'Хэш-теги разделяются пробелами';
      } else if (hashtagItem.charAt(0) === Hashtag.HASH_SYMBOL && hashtagItem.length === 1) {
        errorMessage = 'Хеш-тег не может состоять только из одной решётки';
      } else if (hashtags.length > Hashtag.QUANITY) {
        errorMessage = 'Допустимое количество  хэштегов  не более 5';
      } else if (hashtagItem.length > Hashtag.MAX_LENGTH) {
        errorMessage = 'Максимальная длина одного хэш-тега 20 символов, включая решётку';
      } else if (checkRepeatHashtags(hashtags)) {
        errorMessage = 'Хэштеги не должны повторяться';
      }
    });
    hashtagElement.setCustomValidity(errorMessage);
  };

  hashtagElement.addEventListener('input', hashtagValidity);

  var highlightInvalidField = function (field) {
    if (!field.validity.valid) {
      field.style.outline = '2px solid red';
    } else {
      field.style.outline = 'none';
    }
  };

  uploadSubmitElement.addEventListener('click', function () {
    highlightInvalidField(hashtagElement);
    highlightInvalidField(uploadTextAreaElement);
  });


  hashtagElement.addEventListener('focusin', function () {
    document.removeEventListener('keydown', window.util.onFormEscPress);
  });

  hashtagElement.addEventListener('focusout', function () {
    document.addEventListener('keydown', window.util.onFormEscPress);
  });

  descriptionElement.addEventListener('focusin', function () {
    document.removeEventListener('keydown', window.util.onFormEscPress);
  });

  descriptionElement.addEventListener('focusout', function () {
    document.addEventListener('keydown', window.util.onFormEscPress);
  });


})();
