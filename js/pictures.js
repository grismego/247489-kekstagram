'use strict';

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DESCRIPTIONS = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
var COUNT_URL = 25;
var COUNT_COMMENTS = 5;
var pictures = [];
var usedUrls = [];

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var picturesBlock = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');
var socialLoader = document.querySelector('.comments-loader');
var commentsCount = document.querySelector('.social__comment-count');
socialLoader.classList.add('visually-hidden');
commentsCount.classList.add('visually-hidden');

var getRandomElement = function (elements) {
  return elements[Math.floor(Math.random() * elements.length)];
};

var getRandomInt = function (min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

// var getRandom = function (length) {
//   return Math.floor(Math.random() * length);
// };


var getOriginalUrl = function (elements, count) {
  var element = getRandomInt(1, count);
  while (elements.indexOf(element, 0) >= 0) {
    element = getRandomInt(1, count);
  }
  elements.push(element);
  return element;
};

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

var generatePicture = function () {
  return {
    url: 'photos/' + getOriginalUrl(usedUrls, COUNT_URL) + '.jpg',
    likes: getRandomInt(5, 250),
    comments: generateComments(getRandomInt(5, 20)),
    description: getRandomElement(DESCRIPTIONS)
  };
};

var generatePictures = function (count) {
  // var pictures = [];
  for (var i = 0; i < count; i++) {
    pictures[i] = generatePicture();
  }
  return pictures;
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
  pictures = generatePictures(COUNT_URL);
  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(renderPicture(pictures[i]));
  }
  picturesBlock.appendChild(fragment);
};

var renderComments = function (picture, index) {
  var commentsElement = bigPicture.querySelector('.social__comment').cloneNode(true);
  commentsElement.querySelector('.social__picture').src = 'img/avatar-' + getRandomInt(1, 6) + '.svg';
  commentsElement.querySelector('.social__text').textContent = picture.comments[index];
  return commentsElement;
};

// var appendComments = function (count, index) {
//   var fragment = document.createDocumentFragment();
//   for (var i = 0; i < count; i++) {
//     fragment.appendChild(renderComments(picture[index]));
//   }
//   bigPicture.querySelector('.social__comments').appendChild(fragment);
// };

var renderBigPicture = function (picture, index) {
  bigPicture.querySelector('.big-picture__img img').src = picture[index].url;
  bigPicture.querySelector('.likes-count').textContent = picture[index].likes;
  bigPicture.querySelector('.comments-count').textContent = picture[index].comments.length;
  for (var i = 0; i < COUNT_COMMENTS; i++) {
    bigPicture.querySelector('.social__comments').appendChild(renderComments(picture[index], i));
  }
  bigPicture.querySelector('.social__caption').textContent = picture[index].description;
};

appendPicture();

renderBigPicture(pictures, 0);
