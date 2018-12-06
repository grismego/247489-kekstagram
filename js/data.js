'use strict';

(function () {
// модуль для генерации данных
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

  var Like = {
    MIN: 15,
    MAX: 200
  };

  var generateComment = function (elements) {
    var comments = [];
    comments.push(window.util.getRandomElement(elements));
    if (Math.random() >= 0.5) {
      comments.push(window.util.getRandomElement(elements));
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

  window.data = {
    generatePhotos: function (count) {
      var photos = [];
      for (var i = 0; i < count; i++) {
        photos[i] = {
          url: 'photos/' + (i + 1) + '.jpg',
          likes: window.util.getRandomInteger(Like.MIN, Like.MAX),
          comments: generateComments(window.util.getRandomInteger(0, 20)),
          description: window.util.getRandomElement(DESCRIPTIONS)
        };
      }
      return photos;
    }
  };


})();
