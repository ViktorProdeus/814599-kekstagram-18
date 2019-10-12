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
  var successDataPictures = function (data) {
    var photosData = data;
    addtoContainer(data);

    var prewievPhotos = document.querySelectorAll('.picture');

    for (var i = 0; i < prewievPhotos.length; i++) {
      window.onPreviewPhotoClick(prewievPhotos[i], photosData[i]);
      window.onPreviewPhotoEnterPress(prewievPhotos[i], photosData[i]);
    }
  };

  // Функция, вывода ошибки
  var erorrMessage = function () {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var main = document.querySelector('main');
    var fragment = document.createDocumentFragment();
    fragment.appendChild(errorTemplate);
    main.appendChild(fragment);
    return fragment;
  };

  window.backend.load(successDataPictures, erorrMessage);
})();
