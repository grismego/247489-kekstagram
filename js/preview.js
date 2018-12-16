'use strict';

(function () {

  var DISPLAY_COMMENTS = 5;

  var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  var commentsListElement = document.querySelector('.social__comments');
  var bigPictureElement = document.querySelector('.big-picture');
  var commentsLoaderElement = document.querySelector('.comments-loader');

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
    comments.forEach(function (currentItem, index) {
      var comment = createComment(currentItem);
      if (index >= DISPLAY_COMMENTS) {
        comment.classList.add('visually-hidden');
      }
      commentsFragment.appendChild(comment);
    });
    commentsListElement.appendChild(commentsFragment);
  };

  var renderBigPicture = function (picture) {
    bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
    bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
    bigPictureElement.querySelector('.social__caption').textContent = picture.description;
    appendComments(picture.comments);
    window.comments.showCommentsCount(picture.comments);
    bigPictureElement.querySelector('.comments-loader').addEventListener('click', window.comments.loadComments);
    bigPictureElement.querySelector('.comments-loader').addEventListener('click', function () {
      window.comments.showCommentsCount(picture.comments);
    });
    if (bigPictureElement.querySelectorAll('.social__comment.visually-hidden').length > 1) {
      commentsLoaderElement.classList.remove('visually-hidden');
    }
  };

  window.preview = {
    renderBigPicture: renderBigPicture
  };

})();
