'use strict';

(function () {
  var fullPhotoContainer = document.querySelector('.big-picture');
  var fullPhoto = fullPhotoContainer.querySelector('.big-picture__img img');
  var likesCount = fullPhotoContainer.querySelector('.likes-count');
  var commentsCount = fullPhotoContainer.querySelector('.comments-count');
  var socialComments = fullPhotoContainer.querySelector('.social__comments');
  var socialComment = socialComments.querySelector('.social__comment');
  var description = fullPhotoContainer.querySelector('.social__caption');
  var socialCommentCount = fullPhotoContainer.querySelector('.social__comment-count');
  var commentsLoader = fullPhotoContainer.querySelector('.comments-loader');
  var fullPhotoCancel = fullPhotoContainer.querySelector('.big-picture__cancel');

  var onFullPhotoEscPress = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      closeFullPhoto();
    }
  };

  var showFullPhoto = function () {
    fullPhotoContainer.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onFullPhotoEscPress);
  };

  var closeFullPhoto = function () {
    fullPhotoContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onFullPhotoEscPress);
  };

  var renderFullPhoto = function (image) {
    fullPhoto.src = image.url;
    likesCount.textContent = image.likes;
    commentsCount.textContent = image.comments.length;
    description.textContent = image.description;

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < image.comments.length; i++) {
      var cloneComment = socialComment.cloneNode(true);
      cloneComment.querySelector('.social__picture').src = image.comments[i].avatar;
      cloneComment.querySelector('.social__picture').alt = image.comments[i].name;
      cloneComment.querySelector('.social__text').textContent = image.comments[i].message;
      fragment.appendChild(cloneComment);
    }

    socialComments.innerHTML = '';
    socialComments.appendChild(fragment);
  };

  window.changeFullPhoto = function (photo) {
    showFullPhoto();
    renderFullPhoto(photo);
    hideElement(socialCommentCount);
    hideElement(commentsLoader);
  };

  window.onPreviewPhotoClick = function (thumbnail, photo) {
    thumbnail.addEventListener('click', function () {
      window.changeFullPhoto(photo);
    });
  };

  window.onPreviewPhotoEnterPress = function (thumbnail, photo) {
    thumbnail.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ENTER_KEYCODE) {
        window.changeFullPhoto(photo);
      }
    });
  };

  fullPhotoCancel.addEventListener('click', function () {
    closeFullPhoto();
  });

  var hideElement = function (element) {
    element.classList.add('visually-hidden');
  };
})();
