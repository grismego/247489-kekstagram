'use strict';

(function () {
  var SliceValue = {
    START: 0,
    END: 5
  };

  var bigPictureElement = document.querySelector('.big-picture');
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

  window.comments = {
    loadComments: loadComments,
    showCommentsCount: showCommentsCount
  };

})();
