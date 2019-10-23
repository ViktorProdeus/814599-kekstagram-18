'use strict';

(function () {
  var FIVE_COMMENTS = 5;

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
    commentsLoader.removeEventListener('click', window.onLoadComments);
  };

  var hideElement = function (element) {
    element.classList.add('visually-hidden');
  };

  var showElement = function (element) {
    element.classList.remove('visually-hidden');
  };


  var renderFullPhoto = function (image) {
    fullPhoto.src = image.url;
    likesCount.textContent = image.likes;
    commentsCount.textContent = image.comments.length;
    description.textContent = image.description;
  };

  var getCloneComment = function (data, iterator, container) {
    var cloneElement = socialComment.cloneNode(true);
    cloneElement.querySelector('.social__picture').src = data.comments[iterator].avatar;
    cloneElement.querySelector('.social__picture').alt = data.comments[iterator].name;
    cloneElement.querySelector('.social__text').textContent = data.comments[iterator].message;
    container.appendChild(cloneElement);
  };

  var renderComments = function (image) {
    if (image.comments.length > 5) {
      showElement(commentsLoader);
    } else {
      hideElement(commentsLoader);
    }

    var lenComments = image.comments.length > FIVE_COMMENTS ? FIVE_COMMENTS : image.comments.length;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < lenComments; i++) {
      getCloneComment(image, i, fragment);
    }

    socialComments.innerHTML = '';
    socialComments.appendChild(fragment);

    window.onLoadComments = function () {
      var currentLenComments = document.querySelectorAll('.social__comment').length;
      lenComments = currentLenComments + FIVE_COMMENTS;
      if (currentLenComments + FIVE_COMMENTS >= image.comments.length) {
        hideElement(commentsLoader);
        lenComments = image.comments.length;
      }

      fragment = document.createDocumentFragment();
      for (i = currentLenComments; i < lenComments; i++) {
        getCloneComment(image, i, fragment);
      }

      socialComments.appendChild(fragment);
    };

    commentsLoader.addEventListener('click', window.onLoadComments);
  };


  var changeFullPhoto = function (photo) {
    showFullPhoto();
    renderFullPhoto(photo);
    renderComments(photo);
    hideElement(socialCommentCount);
  };

  fullPhotoCancel.addEventListener('click', function () {
    closeFullPhoto();

  });

  window.galleryPreview = {
    onPhotoClick: function (thumbnail, photo) {
      thumbnail.addEventListener('click', function () {
        changeFullPhoto(photo);
      });
    },

    onPhotoEnterPress: function (thumbnail, photo) {
      thumbnail.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.data.ENTER_KEYCODE) {
          changeFullPhoto(photo);
        }
      });
    },

    showPrewiev: function (photo) {
      var prewievPhotos = document.querySelectorAll('.picture');

      for (var i = 0; i < prewievPhotos.length; i++) {
        window.galleryPreview.onPhotoClick(prewievPhotos[i], photo[i]);
        window.galleryPreview.onPhotoEnterPress(prewievPhotos[i], photo[i]);
      }
    }

  };
})();
