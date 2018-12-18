'use strict';

(function () {

  var DISPLAY_COMMENTS = 5;

  var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

  var bigPictureElement = document.querySelector('.big-picture');

  var commentsListElement = document.querySelector('.social__comments');
  var commentsLoaderElement = document.querySelector('.comments-loader');
  var commentCountElement = document.querySelector('.social__comment-count');

  var createComment = function (comment) {
    var commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').title = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    return commentElement;
  };

  var loadComments = function (commentsCount) {
    var commentElements = bigPictureElement.querySelectorAll('.social__comment.visually-hidden');
    [].slice.call(commentElements).slice(0, DISPLAY_COMMENTS).forEach(function (item) {
      item.classList.remove('visually-hidden');
    });
    if (!bigPictureElement.querySelector('.social__comment.visually-hidden')) {
      commentsLoaderElement.classList.add('visually-hidden');
    }
    updateCommentsCount(commentsCount);
  };

  var updateCommentsCount = function (count) {
    var displayedComments = bigPictureElement.querySelectorAll('.social__comment:not(.visually-hidden)').length;
    var commentsCount = displayedComments + ' из ' + '<span class="comments-count">' + count + '</span>' + ' комментариев';
    commentCountElement.innerHTML = commentsCount;
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
    updateCommentsCount(comments.length);
  };

  var renderBigPicture = function (picture) {
    bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
    bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
    bigPictureElement.querySelector('.social__caption').textContent = picture.description;
    appendComments(picture.comments);
    commentsLoaderElement.addEventListener('click', function () {
      loadComments(picture.comments.length);
    });
  };

  window.preview = {
    renderBigPicture: renderBigPicture,
    loadComments: loadComments
  };

})();
