'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];
var PHOTOS_COUNT = 25;
var DISPLAY_COMMENTS = 5;
var FIRST_AVATAR = 1;
var LAST_AVATAR = 6;
var Like = {
  MIN: 15,
  MAX: 200
};
var KeyCode = {
  ENTER: 13,
  ESC: 27
};
var EffectParameter = {
  chrome: {
    CLASS: 'effects__preview--chrome',
    PROPERTY: 'grayscale',
    MIN_VALUE: 0,
    MAX_VALUE: 1,
    UNIT: ''
  },
  sepia: {
    CLASS: 'effects__preview--sepia',
    PROPERTY: 'sepia',
    MIN_VALUE: 0,
    MAX_VALUE: 1,
    UNIT: ''
  },
  marvin: {
    CLASS: 'effects__preview--marvin',
    PROPERTY: 'invert',
    MIN_VALUE: 0,
    MAX_VALUE: 100,
    UNIT: '%'
  },
  phobos: {
    CLASS: 'effects__preview--phobos',
    PROPERTY: 'blur',
    MIN_VALUE: 0,
    MAX_VALUE: 3,
    UNIT: 'px'
  },
  heat: {
    CLASS: 'effects__preview--heat',
    PROPERTY: 'brightness',
    MIN_VALUE: 1,
    MAX_VALUE: 3,
    UNIT: ''
  }
};
var EffectValue = {
  MAX: 100,
  DEFAULT: 100,
};
var PinValue = {
  MIN: 0,
  MAX: 100
};
var ScaleValue = {
  MIN: 25,
  STEP: 25,
  MAX: 100,
  DEFAULT: 100
};
var pictures = [];
var commentsListElement = document.querySelector('.social__comments');

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
var picturesElement = document.querySelector('.pictures');
var bigPictureElement = document.querySelector('.big-picture');
var commentsLoaderElement = document.querySelector('.comments-loader');
var commentCountElement = document.querySelector('.social__comment-count');
commentsLoaderElement.classList.add('visually-hidden');
commentCountElement.classList.add('visually-hidden');

var bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');

// Элементы для работы с формой загрузки нового фото

var uploadElement = document.querySelector('.img-upload');
var uploadFileElement = uploadElement.querySelector('#upload-file');
var uploadPopupElement = uploadElement.querySelector('.img-upload__overlay');
var uploadPopupCloseElement = uploadElement.querySelector('#upload-cancel');
var imgPreviewWrapperElement = uploadElement.querySelector('.img-upload__preview');
var imgPreviewElement = imgPreviewWrapperElement.querySelector('.img-upload__preview img');
var scaleElement = uploadElement.querySelector('.img-upload__scale');
var scaleValueElement = scaleElement.querySelector('.scale__control--value');
var scaleSmallerElement = scaleElement.querySelector('.scale__control--smaller');
var scaleBiggerElement = scaleElement.querySelector('.scale__control--bigger');
//  Элементы для работы со слайдером

var effectLevelElement = uploadElement.querySelector('.effect-level');
var effectsListElement = uploadElement.querySelector('.effects__list');
var effectPinElement = effectLevelElement.querySelector('.effect-level__pin');
var effectDepthElement = effectLevelElement.querySelector('.effect-level__depth');
var effectLevelValueElement = effectLevelElement.querySelector('.effect-level__value');

var radioChecked = effectsListElement.querySelector('.effects__radio[checked]');
var previewEffectName = radioChecked.value;
var currentEffect = 'effects__preview--' + previewEffectName;

// var pictureContainer = document.querySelector('.pictures');
var inputLoadFileElement = document.querySelector('#upload-file');
// var reset = document.querySelector('.img-upload__cancel');
// var line = document.querySelector('.effect-level__depth');
// var preview = document.querySelector('.img-upload__preview img');


// var hashtag = document.querySelector('.text__hashtags');


var getRandomInteger = function (min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

var getRandomElement = function (elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
};

var generateComment = function (elements) {
  var comments = [];
  comments.push(getRandomElement(elements));
  if (Math.random() >= 0.5) {
    comments.push(getRandomElement(elements));
  }
  return comments.join(' ');
};

var generateComments = function (count) {
  var comments = [];
  for (var i = 0; i < count; i++) {
    comments[i] = generateComment(COMMENTS);
  }
  return comments;
};


var generatePhotos = function (count) {
  var photos = [];
  for (var i = 0; i < count; i++) {
    photos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomInteger(Like.MIN, Like.MAX),
      comments: generateComments(getRandomInteger(0, 20)),
      description: getRandomElement(DESCRIPTIONS)
    };
  }
  return photos;
};

// взаимодействие с поп-апами

var onFormEscPress = function (evt) {
  if (evt.keyCode === KeyCode.ESC) {
    closeForm();
  }
};

var onPhotoEscPress = function (evt) {
  if (evt.keyCode === KeyCode.ESC) {
    closePhoto();
  }
};

var closeForm = function () {
  uploadPopupElement.classList.add('hidden');
  inputLoadFileElement.value = null;
  document.removeEventListener('keydown', onFormEscPress);
};

var openForm = function () {
  uploadPopupElement.classList.remove('hidden');
  setDefaultPinPosition();
  effectLevelValueElement.setAttribute('value', PinValue.MAX);
  document.addEventListener('keydown', onFormEscPress);
};

var closePhoto = function () {
  bigPictureElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onFormEscPress);
};


var openPhoto = function () {
  bigPictureElement.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  commentsListElement.innerHTML = '';
  document.addEventListener('keydown', onPhotoEscPress);
};

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.addEventListener('click', function () {
    openPhoto();
    renderBigPicture(picture);
  });
  return pictureElement;
};

var appendPicture = function () {
  var fragment = document.createDocumentFragment();
  pictures = generatePhotos(PHOTOS_COUNT);
  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(renderPicture(pictures[i]));
  }
  picturesElement.appendChild(fragment);
};

var createComment = function (comment) {
  var commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = 'img/avatar-' + getRandomInteger(FIRST_AVATAR, LAST_AVATAR) + '.svg';
  commentElement.querySelector('.social__text').textContent = comment;
  return commentElement;
};


var appendComments = function (comments) {
  var commentsFragment = document.createDocumentFragment();
  for (var i = 0; i < comments.length; i++) {
    var comment = createComment(comments[i]);
    if (i >= DISPLAY_COMMENTS) {
      comment.classList.add('visually-hidden');
      commentsFragment.appendChild(comment);
    }
    commentsFragment.appendChild(comment);
  }
  commentsListElement.appendChild(commentsFragment);
};

var renderBigPicture = function (picture) {
  bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
  bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
  appendComments(picture.comments);
  bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = picture.description;
};

uploadFileElement.addEventListener('change', function () {
  openForm();
  setDefaultPinPosition();
});

var setDefaultPinPosition = function () {
  effectPinElement.style.left = EffectValue.DEFAULT + '%';
  effectDepthElement.style.width = effectPinElement.style.left;
};

uploadPopupCloseElement.addEventListener('click', function () {
  closeForm();
});

var setPhotoScale = function (value) {
  var currentScale = parseInt(scaleValueElement.value, 10);
  currentScale += ScaleValue.STEP * value;
  return currentScale;
};

// применение эффекта
var applyEffect = function (value) {
  switch (currentEffect) {
    case '.effects__preview--chrome':
      imgPreviewWrapperElement.style.filter = EffectParameter.chrome.PROPERTY + '(' + (value) / EffectParameter.MAX_VALUE + EffectParameter.chrome.UNITS + ')';
      break;
    case '.effects__preview--sepia':
      imgPreviewWrapperElement.style.filter = EffectParameter.sepia.PROPERTY + '(' + (value) / EffectParameter.MAX_VALUE + EffectParameter.sepia.UNITS + ')';
      break;
    case '.effects__preview--marvin':
      imgPreviewWrapperElement.style.filter = EffectParameter.marvin.PROPERTY + '(' + (value) * EffectParameter.marvin.MAX_VALUE / EffectParameter.MAX_VALUE + EffectParameter.marvin.UNITS + ')';
      break;
    case '.effects__preview--phobos':
      imgPreviewWrapperElement.style.filter = EffectParameter.phobos.PROPERTY + '(' + (value) * EffectParameter.phobos.MAX_VALUE / EffectParameter.MAX_VALUE + EffectParameter.phobos.UNITS + ')';
      break;
    case '.effects__preview--heat':
      imgPreviewWrapperElement.style.filter = EffectParameter.heat.PROPERTY + '(' + (value) * EffectParameter.heat.MAX_VALUE / EffectParameter.MAX_VALUE + EffectParameter.heat.UNITS + ')';
      break;
    default:
      imgPreviewWrapperElement.style.filter = '';
  }
};

// применение эффекта
var onPhotoEffectClick = function (evt) {
  var target = evt.target;
  if (target.tagName !== 'INPUT') {
    return;
  }

  imgPreviewElement.classList = '';
  var effectName = target.value;

  currentEffect = 'effects__preview--' + effectName;

  if (currentEffect !== 'effects__preview--none') {
    effectLevelElement.classList.remove('hidden');
    imgPreviewElement.classList.add(currentEffect);
  } else {
    effectLevelElement.classList.add('hidden');
    imgPreviewElement.classList.add(currentEffect);
  }

  effectLevelValueElement.setAttribute('value', EffectValue.DEFAULT);
  applyEffect(EffectValue.DEFAULT);
  setDefaultPinPosition();
};

effectsListElement.addEventListener('click', onPhotoEffectClick);

appendPicture();

bigPictureCloseElement.addEventListener('click', function () {
  closePhoto();
});


// Увеличение/Уменьшение фото

scaleSmallerElement.addEventListener('click', function () {
  if (parseInt(scaleValueElement.value, 10) <= ScaleValue.MIN) {
    return;
  }
  imgPreviewWrapperElement.style.transform = 'scale(' + setPhotoScale(-1) / 100 + ')';
  scaleValueElement.value = setPhotoScale(-1) + '%';
});

scaleBiggerElement.addEventListener('click', function () {
  if (parseInt(scaleValueElement.value, 10) >= ScaleValue.MAX) {
    return;
  }
  imgPreviewWrapperElement.style.transform = 'scale(' + setPhotoScale(1) / 100 + ')';
  scaleValueElement.value = setPhotoScale(1) + '%';
});


// валидация

// var checkRepeatHashtags = function (array) {
//   for (var i = 0; i < array.length; i++) {
//     var a = array[i];
//     for (var j = 0; j < array.length; j++) {
//       if (a === array[j] && i !== j) {
//         return true;
//       }
//     }
//   }
//   return false;
// };

// var validateHashtags = function (hashtags) {
//   for (var i = 0; i < hashtags.length; i++) {
//     if (hashtags[i][0] !== '#') {
//       hashtag.setCustomValidity('Хэштег должен начинаться с символа #');
//     } else if (hashtags[i].length > 20) {
//       hashtag.setCustomValidity('Длинна хештега не должна превышать 20 символов');
//     } else if (hashtags.length > 5) {
//       hashtag.setCustomValidity('Допстимое значение - не больше 5 хэштегов');
//     } else if (checkRepeatHashtags(hashtags)) {
//       hashtag.setCustomValidity('Не должны повторяться');
//     } else {
//       hashtag.setCustomValidity('');
//     }
//   }
// };
//
// hashtag.addEventListener('input', function () {
//   var hashValue = hashtag.value;
//   var hashArrays = hashValue.split(' ');
//   validateHashtags(hashArrays);
// });
