'use strict';

(function () {
// модуль для отрисовки увеличенного изображения
  var DISPLAY_COMMENTS = 5;
  var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  var commentsListElement = document.querySelector('.social__comments');
  var bigPictureElement = document.querySelector('.big-picture');
  var commentsLoaderElement = document.querySelector('.comments-loader');
  var commentCountElement = document.querySelector('.social__comment-count');
  commentsLoaderElement.classList.add('visually-hidden');
  commentCountElement.classList.add('visually-hidden');

  var createComment = function (comment) {
    var commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').title = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    return commentElement;
  };


  var appendComments = function (comments) {
    commentsListElement.innerHTML = '';
    var commentsFragment = document.createDocumentFragment();
    for (var i = 0; i < comments.length; i++) {
      var comment = createComment(comments[i]);
      if (i >= DISPLAY_COMMENTS) {
        comment.classList.add('visually-hidden');
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

  window.preview = {
    renderBigPicture: renderBigPicture
  };

})();
