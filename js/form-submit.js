'use strict';

(function () {
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';

  var main = document.querySelector('main');

  var successTemplate = document.querySelector('#success')
  .content.querySelector('.success');

  var onSuccessMessageShow = function () {
    window.formSubmit.getMessage(successTemplate);
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

  var onFormSubmit = function (evt) {
    var formData = new FormData(window.uploadPreview.form);

    window.backend.makeRequest(URL_UPLOAD, onSuccessMessageShow, window.gallery.onErrorMessageShow, 'POST', formData);
    evt.preventDefault();
    window.uploadPreview.form.reset();
    window.uploadPreview.closePopup();
  };

  window.uploadPreview.form.addEventListener('submit', onFormSubmit);

  window.formSubmit = {

    getMessage: function (message) {
      var cloneMessage = message.cloneNode(true);
      var fragment = document.createDocumentFragment();
      fragment.appendChild(cloneMessage);
      main.appendChild(fragment);
    },

    onMessageEscPress: function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        window.formSubmit.closeMessage();
      }
    },

    closeMessage: function () {
      var success = document.querySelector('.success');
      var error = document.querySelector('.error');

      if (success) {
        success.remove();
      } else {
        error.remove();
      }
      document.removeEventListener('keydown', window.formSubmit.onMessageEscPress);
    }
  };
})();
