'use strict';

(function () {
  var main = document.querySelector('main');

  var ShowSuccess = function () {
    window.formSubmit.getMessage('success');
    var successMessage = document.querySelector('.success');
    var successBtn = document.querySelector('.success__button');
    successBtn.addEventListener('click', function () {
      window.formSubmit.closeMessage();
    });

    successMessage.addEventListener('click', function (evt) {
      var target = evt.target;

      if (target.closest('.success__inner') !== null) {
        return;
      }

      successMessage.remove();
      evt.stopPropagation();
    });

    document.addEventListener('keydown', window.formSubmit.onMessageEscPress);
  };

  var showError = function () {
    window.formSubmit.getMessage('error');
    var errorMessage = document.querySelector('.error');
    var errorBtns = document.querySelectorAll('.error__button');
    for (var i = 0; i < errorBtns.length; i++) {
      errorBtns[i].addEventListener('click', function () {
        window.formSubmit.closeMessage();
      });

      errorMessage.addEventListener('click', function (evt) {
        var target = evt.target;
        if (target.closest('.error__inner') !== null) {
          return;
        }
        errorMessage.remove();
        evt.stopPropagation();
      });

      document.addEventListener('keydown', window.formSubmit.onMessageEscPress);
    }
  };

  var onFormSubmit = function (evt) {
    var formData = new FormData(window.uploadPreview.form);

    window.backend.upload(formData, ShowSuccess, showError);
    evt.preventDefault();
    window.uploadPreview.form.reset();
    window.uploadPreview.closePopup();
  };

  window.uploadPreview.form.addEventListener('submit', onFormSubmit);

  window.formSubmit = {
    main: main,

    getMessage: function (message) {
      var template = document.querySelector('#' + message)
        .content.querySelector('.' + message);
      var cloneMessage = template.cloneNode(true);
      var fragment = document.createDocumentFragment();
      fragment.appendChild(cloneMessage);
      main.appendChild(fragment);
    },

    onMessageEscPress: function (evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        window.formSubmit.closeMessage();
      }
    },

    closeMessage: function () {
      if (document.querySelector('.success')) {
        document.querySelector('.success').remove();
      } else {
        document.querySelector('.error').remove();
      }
      document.removeEventListener('keydown', window.formSubmit.onMessageEscPress);
    },
  };
})();
