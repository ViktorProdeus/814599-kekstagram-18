'use strict';
(function () {
  window.formPreview.imgUpload.addEventListener('focus', function (evt) {
    var target = evt.target;

    if (target.classList.contains('text__hashtags')) {
      document.removeEventListener('keydown', window.formPreview.onPopupEscPress);
    }

    if (target.classList.contains('text__description')) {
      document.removeEventListener('keydown', window.formPreview.onPopupEscPress);
    }
  }, true);

  window.formPreview.imgUpload.addEventListener('blur', function (evt) {
    var target = evt.target;

    if (target.classList.contains('text__hashtags')) {
      document.addEventListener('keydown', window.formPreview.onPopupEscPress);
    }

    if (target.classList.contains('text__description')) {
      document.addEventListener('keydown', window.formPreview.onPopupEscPress);
    }
  }, true);

  var onInputHashtagsValidate = function (evt) {
    var target = evt.target;

    if (target.classList.contains('text__hashtags')) {
      var textHashtags = window.formPreview.imgUpload.querySelector('.text__hashtags');
      var tags = textHashtags.value.trim().toLowerCase().split(/\s+/g);
      var arrayTags = [];

      textHashtags.setCustomValidity('');

      for (var i = 0; i < tags.length; i++) {

        if (tags[i].indexOf('#') !== 0) {
          textHashtags.setCustomValidity('хэш-тег начинается с символа # (решётка)');
        } else if (tags[i].length === 1 && tags[i].indexOf('#') === 0) {
          textHashtags.setCustomValidity('хеш-тег не может состоять только из одной решётки');
        } else if (tags[i].includes('#', 1)) {
          textHashtags.setCustomValidity('хэш-теги разделяются пробелами');
        } else if (tags.length > window.data.TAG_MAX) {
          textHashtags.setCustomValidity('нельзя указать больше пяти хэш-тегов');
        } else if (tags[i].length > window.data.TAG_LEN_MAX) {
          textHashtags.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
        } else if (arrayTags.includes(tags[i])) {
          textHashtags.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
        }

        arrayTags.push(tags[i]);
      }
    }
  };

  window.formPreview.imgUpload.addEventListener('input', onInputHashtagsValidate);
})();
