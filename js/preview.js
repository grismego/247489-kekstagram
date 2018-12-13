'use strict';

(function () {

  var DISPLAY_COMMENTS = 5;
  var SliceValue = {
    START: 0,
    END: 5
  };
  var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  var commentsListElement = document.querySelector('.social__comments');
  var bigPictureElement = document.querySelector('.big-picture');
  var commentsLoaderElement = document.querySelector('.comments-loader');
  var commentCountElement = document.querySelector('.social__comment-count');

  var loadComments = function (evt) {
    var commentElements = bigPictureElement.querySelectorAll('.social__comment.visually-hidden');
    [].slice.call(commentElements).slice(SliceValue.START, SliceValue.END).forEach(function (item) {
      item.classList.remove('visually-hidden');
    });
    if (bigPictureElement.querySelectorAll('.social__comment.visually-hidden').length === 0) {
      evt.target.classList.add('visually-hidden');
    }
  };

  var showCommentsCount = function (comments) {
    var displayedComments = bigPictureElement.querySelectorAll('.social__comment:not(.visually-hidden)').length;
    var commentsCount = displayedComments + ' из ' + '<span class="comments-count">' + comments.length + '</span>' + ' комментариев';
    commentCountElement.innerHTML = commentsCount;
  };


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
    bigPictureElement.querySelector('.social__caption').textContent = picture.description;
    appendComments(picture.comments);
    showCommentsCount(picture.comments);
    bigPictureElement.querySelector('.comments-loader').addEventListener('click', loadComments);
    bigPictureElement.querySelector('.comments-loader').addEventListener('click', function () {
      showCommentsCount(picture.comments);
    });
    if (bigPictureElement.querySelectorAll('.social__comment.visually-hidden').length > 1) {
      commentsLoaderElement.classList.remove('visually-hidden');
    }
  };

  window.preview = {
    renderBigPicture: renderBigPicture,
    loadComments: loadComments
  };

})();
