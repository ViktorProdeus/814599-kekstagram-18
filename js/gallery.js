'use strict';

(function () {

  // Генерируем шаблон фотографий
  var renderUserPictures = function (picture) {
    var picturesTemplate = document.querySelector('#picture')
      .content.querySelector('.picture');

    var cloneInElement = picturesTemplate.cloneNode(true);

    cloneInElement.querySelector('.picture__img').src = picture.url;
    cloneInElement.querySelector('.picture__likes').textContent = picture.likes;
    cloneInElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return cloneInElement;
  };

  // Добавляем шаблон в контейнер для изображений
  var addtoContainer = function (array) {
    var fragment = document.createDocumentFragment();
    var picturesContainer = document.querySelector('.pictures');

    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderUserPictures(array[i]));
    }

    return picturesContainer.appendChild(fragment);
  };

  // Функция, успешного вывода данных
  var getSuccessDataPictures = function (data) {
    var photosData = data;
    addtoContainer(data);

    var prewievPhotos = document.querySelectorAll('.picture');

    for (var i = 0; i < prewievPhotos.length; i++) {
      window.galleryPreview.onPhotoClick(prewievPhotos[i], photosData[i]);
      window.galleryPreview.onPhotoEnterPress(prewievPhotos[i], photosData[i]);
    }
  };

  // Функция, вывода ошибки
  var showErorrMessage = function () {
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
  window.backend.load(getSuccessDataPictures, showErorrMessage);
})();
