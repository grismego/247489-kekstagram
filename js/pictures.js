'use strict';

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DESCRIPTIONS = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
var usedUrls = [];
var COUNT_URL = 25;

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var picturesBlock = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

var getRandomElement = function (elements) {
  return elements[Math.floor(Math.random() * elements.length)];
};

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandom = function (length) {
  return Math.floor(Math.random() * length);
};


var getOriginalUrl = function (elements, count) {

  var element = getRandom(count);
  while (elements.indexOf(element, 0) >= 0 && element === 0) {
    elements.push(element);
  }
  elements.push(element);
  return element;
};

var getComment = function (elements) {
  var element = [];
  element.push(getRandomElement(elements));
  if (Math.random() >= 0.5) {
    element.push(getRandomElement(elements));
  }
  return element.join(' ');
};

// var getComments = function (count) {
//   var array = [];
//   for (var i = 0; i < count.length; i++) {
//     count[i]
//   }
//

var generatePicture = function () {
  return {
    url: 'photos/' + getOriginalUrl(usedUrls, COUNT_URL) + '.jpg',
    likes: getRandomInt(5, 250),
    comments: getComment(COMMENTS),
    description: getRandomElement(DESCRIPTIONS)
  };
};

var generatePictures = function (count) {
  var pictures = [];
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
  var pictures = generatePictures(COUNT_URL);
  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(renderPicture(pictures[i]));
  }
  picturesBlock.appendChild(fragment);
};

appendPicture();
