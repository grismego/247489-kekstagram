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
var Likes = {
  MIN: 15,
  MAX: 200
};
var FIRST_AVATAR = 1;
var LAST_AVATAR = 6;
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
//нужно будет потом переделать
var pictureContainer = document.querySelector('.pictures');
var upload = document.querySelector('#upload-file');
var uploadOverlay = document.querySelector('.img-upload__overlay');
var reset = document.querySelector('.img-upload__cancel');
var form = document.querySelector('.img-upload__form');
var pin = document.querySelector('.effect-level__pin');
var bar = document.querySelector('.effect-level__line');
var line = document.querySelector('.effect-level__depth');
var preview = document.querySelector('.img-upload__preview img');

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

var renderPicture = function (picture) {
  var pictureSection = pictureTemplate.cloneNode(true);
  pictureSection.querySelector('.picture__img').src = picture.url;
  pictureSection.querySelector('.picture__likes').textContent = picture.likes;
  pictureSection.querySelector('.picture__comments').textContent = picture.comments.length;
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

upload.addEventListener('change', function (evt) {
  uploadOverlay.classList.remove('hidden');
  var selectedFile = upload.files[0];
  preview.src = 'photos/' + selectedFile.name;
});

reset.addEventListener('click', function (evt) {
  uploadOverlay.classList.add('hidden');
  form.reset();
});

pin.addEventListener('mouseup', function (evt) {
  console.log(evt);
});

appendPicture();


var thumbnails = document.querySelectorAll('.picture');

var addThumbnailClickHandler = function (thumbnail, photo) {
  thumbnail.addEventListener('click', function (evt) {
    evt.preventDefault();
    renderBigPicture(pictures[photo]);
    bigPicture.classList.remove('hidden');
  });
};

for (var i = 0; i < thumbnails.length; i++) {
  addThumbnailClickHandler(thumbnails[i], i);
}

bigPictureCancel.addEventListener('click', function () {
  bigPicture.classList.add('hidden');
});
