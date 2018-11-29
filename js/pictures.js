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
var Likes = {
  MIN: 15,
  MAX: 200
};
var KeyCode = {
  ENTER: 13,
  ESC: 27
};

var pictures = [];
var commentsBlock = document.querySelector('.social__comments');

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
var picturesBlock = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
// bigPicture.classList.remove('hidden');
var commentsLoader = document.querySelector('.comments-loader');
var commentsCount = document.querySelector('.social__comment-count');
commentsLoader.classList.add('visually-hidden');
commentsCount.classList.add('visually-hidden');
var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
// нужно будет потом переименовать
var uploadForm = document.querySelector('#upload-file');
var uploadFormClose = document.querySelector('.img-upload__cancel');
var uploadOverlay = document.querySelector('.img-upload__overlay');
// var pictureContainer = document.querySelector('.pictures');
// var upload = document.querySelector('#upload-file');
// var reset = document.querySelector('.img-upload__cancel');
var form = document.querySelector('.img-upload__form');
var pin = document.querySelector('.effect-level__pin');
var bar = document.querySelector('.effect-level__line');
// var line = document.querySelector('.effect-level__depth');
// var preview = document.querySelector('.img-upload__preview img');

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
      likes: getRandomInteger(Likes.MIN, Likes.MAX),
      comments: generateComments(getRandomInteger(0, 20)),
      description: getRandomElement(DESCRIPTIONS)
    };
  }
  return photos;
};

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

var closePhoto = function () {
  bigPicture.classList.add('hidden');
};


var openPhoto = function () {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.social__comments').innerHTML = '';
  document.removeEventListener('keydown', onFormEscPress);
  document.addEventListener('keydown', onPhotoEscPress);
};

var renderPicture = function (picture) {
  var pictureSection = pictureTemplate.cloneNode(true);
  pictureSection.querySelector('.picture__img').src = picture.url;
  pictureSection.querySelector('.picture__likes').textContent = picture.likes;
  pictureSection.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureSection.addEventListener('click', function () {
    openPhoto();
    renderBigPicture(picture);
  });
  return pictureSection;
};

var appendPicture = function () {
  var fragment = document.createDocumentFragment();
  pictures = generatePhotos(PHOTOS_COUNT);
  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(renderPicture(pictures[i]));
  }
  picturesBlock.appendChild(fragment);
};

var createComment = function (comment) {
  var commentSection = commentTemplate.cloneNode(true);
  commentSection.querySelector('.social__picture').src = 'img/avatar-' + getRandomInteger(FIRST_AVATAR, LAST_AVATAR) + '.svg';
  commentSection.querySelector('.social__text').textContent = comment;
  return commentSection;
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
  commentsBlock.appendChild(commentsFragment);
};

var renderBigPicture = function (picture) {
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  appendComments(picture.comments);
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
};

var closeForm = function () {
  uploadOverlay.classList.add('hidden');
  form.reset();
};

var openForm = function () {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onFormEscPress);
};


uploadForm.addEventListener('change', function () {
  openForm();
});

uploadFormClose.addEventListener('click', function () {
  closeForm();
  form.reset();
});

var getEffectLevel = function (currentPosition, maxPosition) {
  return Math.round(currentPosition * 100 / maxPosition);
};

var effectLevelInput = document.querySelector('.effect-level__value');
// Не знаю что делать с пином =\
pin.addEventListener('mouseup', function () {
  var valueEffect = getEffectLevel(pin.offsetLeft, bar.offsetWidth);
  effectLevelInput.value = valueEffect;
  if (fullPhoto.matches('.effects__preview--chrome')) {
    fullPhoto.style.filter = 'grayscale(' + 1 / 100 * valueEffect + ')';
  } else if (fullPhoto.matches('.effects__preview--sepia')) {
    fullPhoto.style.filter = 'sepia(' + 1 / 100 * valueEffect + ')';
  } else if (fullPhoto.matches('.effects__preview--marvin')) {
    fullPhoto.style.filter = 'invert(' + valueEffect + '%)';
  } else if (fullPhoto.matches('.effects__preview--phobos')) {
    fullPhoto.style.filter = 'blur(' + 3 / 100 * valueEffect + 'px)';
  } else if (fullPhoto.matches('.effects__preview--heat')) {
    fullPhoto.style.filter = 'brightness(' + 3 / 100 * valueEffect + ')';
  } else {
    fullPhoto.style.filter = '';
  }
});

appendPicture();

var thumbnails = document.querySelectorAll('.effects__radio');
var fullPhoto = document.querySelector('.img-upload__preview');

var addThumbnailClickHandler = function (thumbnail) {
  thumbnail.addEventListener('click', function () {
    fullPhoto.classList.remove(fullPhoto.classList[1]);
    fullPhoto.classList.add('effects__preview--' + thumbnail.value);
  });
};

for (var i = 0; i < thumbnails.length; i++) {
  addThumbnailClickHandler(thumbnails[i]);
}

bigPictureCancel.addEventListener('click', function () {
  closePhoto();
});
