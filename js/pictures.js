'use strict';

var COMMENTS = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DESCRIPTIONS = ['Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'];
var PHOTOS_COUNT = 25;
var DISPLAY_COMMENTS = 5;
var MAX_COUNT_LIKE = 250;
var FIRST_AVATAR = 1;
var LAST_AVATAR = 6;
var pictures = [];

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var picturesBlock = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');
// var commentsLoader = document.querySelector('.comments-loader');
// var commentsCount = document.querySelector('.social__comment-count');
// commentsLoader.classList.add('visually-hidden');
// commentsCount.classList.add('visually-hidden');


var getRandomInteger = function (min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

var getRandomElement = function (elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
};


// var getRandom = function (length) {
//   return Math.floor(Math.random() * length);
// };


// var getOriginalUrl = function (elements, count) {
//   var element = getRandomInteger(1, count);
//   while (elements.indexOf(element, 0) >= 0) {
//     element = getRandomInteger(1, count);
//   }
//   elements.push(element);
//   return element;
// };

var generateComment = function (elements) {
  var element = [];
  element.push(getRandomElement(elements));
  if (Math.random() >= 0.5) {
    element.push(getRandomElement(elements));
  }
  return element.join(' ');
};

var generateComments = function (count) {
  var comments = [];
  for (var i = 0; i < count; i++) {
    comments[i] = generateComment(COMMENTS);
  }
  return comments;
};

// var generatePicture = function () {
//   return {
//     url: 'photos/' + getOriginalUrl(usedUrls, PHOTOS_COUNT) + '.jpg',
//     likes: getRandomInteger(0, MAX_COUNT_LIKE),
//     comments: generateComments(getRandomInteger(5, 20)),
//     description: getRandomElement(DESCRIPTIONS)
//   };
// };

// var generatePhotos = function (count) {
//   // var photos = [];
//   for (var i = 0; i < count; i++) {
//     pictures[i] = generatePicture();
//   }
//   return pictures;
// };

var generatePhotos = function (count) {
  var photos = [];
  for (var i = 0; i < count; i++) {
    photos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomInteger(0, MAX_COUNT_LIKE),
      comments: generateComments(getRandomInteger(5, 20)),
      description: getRandomElement(DESCRIPTIONS)
    };
  }
  return photos;
};

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments;
  return pictureElement;
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
  var commentsElement = bigPicture.querySelector('.social__comment').cloneNode(true);
  commentsElement.querySelector('.social__picture').src = 'img/avatar-' + getRandomInteger(FIRST_AVATAR, LAST_AVATAR) + '.svg';
  commentsElement.querySelector('.social__text').textContent = comment;
  return commentsElement;
};

// var appendComments = function (count, index) {
//   var comment = createComment(comments[i]);
//     if (i >= DISPLAY_COMMENTS) {
//       comment.classList.add('visually-hidden');
//       commentsFragment.appendChild(comment);
//     }
//     commentsFragment.appendChild(comment);
//  };

var appendComments = function (comments) {
  var commentsFragment = document.createDocumentFragment();
  for (var i = 0; i < comments.length; i++) {
    var comment = createComment(comment[i]);
    if (i >= DISPLAY_COMMENTS) {
      comment.classList.add('visually-hidden');
      commentsFragment.appendChild(comment);
    }
  }
  commentsFragment.appendChild(comment);
};

var renderBigPicture = function (currentPicture) {
  bigPicture.querySelector('.big-picture__img img').src = currentPicture.url;
  bigPicture.querySelector('.likes-count').textContent = currentPicture.likes;
  bigPicture.querySelector('.comments-count').textContent = currentPicture.comments.length;
  appendComments(currentPicture.comments);
  // for (var i = 0; i < DISPLAY_COMMENTS; i++) {
  //   bigPicture.querySelector('.social__comments').appendChild(renderComments(currentPicture, i));
  // }

  bigPicture.querySelector('.social__caption').textContent = currentPicture.description;
};

appendPicture();

renderBigPicture(pictures[0]);
