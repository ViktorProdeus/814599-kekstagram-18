'use strict';
(function () {
  var TAG_LEN_MAX = 20;
  var TAG_MAX = 5;

  window.uploadPreview.form.addEventListener('focus', function (evt) {
    var target = evt.target;

    if (target.classList.contains('text__hashtags')) {
      document.removeEventListener('keydown', window.uploadPreview.onPopupEscPress);
    }

    if (target.classList.contains('text__description')) {
      document.removeEventListener('keydown', window.uploadPreview.onPopupEscPress);
    }
  }, true);

  window.uploadPreview.form.addEventListener('blur', function (evt) {
    var target = evt.target;

    if (target.classList.contains('text__hashtags')) {
      document.addEventListener('keydown', window.uploadPreview.onPopupEscPress);
    }

    if (target.classList.contains('text__description')) {
      document.addEventListener('keydown', window.uploadPreview.onPopupEscPress);
    }
  }, true);

  var onInputHashtagsValidate = function (evt) {
    var target = evt.target;

    if (target.classList.contains('text__hashtags')) {
      var textHashtags = window.uploadPreview.form.querySelector('.text__hashtags');
      var tags = textHashtags.value.trim().toLowerCase().split(/\s+/g);
      var arrayTags = [];

      textHashtags.setCustomValidity('');

      for (var i = 0; i < tags.length; i++) {
        var tag = tags[i];

        if (tag.trim() === '') {
          textHashtags.setCustomValidity('');
        } else if (tag.indexOf('#') !== 0) {
          textHashtags.setCustomValidity('хэш-тег начинается с символа # (решётка)');
        } else if (tag.length === 1 && tag.indexOf('#') === 0) {
          textHashtags.setCustomValidity('хеш-тег не может состоять только из одной решётки');
        } else if (tag.includes('#', 1)) {
          textHashtags.setCustomValidity('хэш-теги разделяются пробелами');
        } else if (tags.length > TAG_MAX) {
          textHashtags.setCustomValidity('нельзя указать больше пяти хэш-тегов');
        } else if (tag.length > TAG_LEN_MAX) {
          textHashtags.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
        } else if (arrayTags.includes(tag)) {
          textHashtags.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
        }

        arrayTags.push(tag);
      }
    }
  };

  window.uploadPreview.form.addEventListener('input', onInputHashtagsValidate);
})();
