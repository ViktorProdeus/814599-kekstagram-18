'use strict';

(function () {
  var COUNT_RANDOM_PHOTOS = 10;

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

  var resetContainer = function () {
    var pictures = document.querySelectorAll('.picture');

    pictures.forEach(function (node) {
      node.remove();
    });
  };

  var showFilters = function () {
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  };

  var uploadPictures = function (allPictures) {
    addtoContainer(allPictures);
    window.galleryPreview.showPrewiev(allPictures);
  };

  var photosData = [];

  // Функция, успешного вывода данных
  var getSuccessDataPictures = function (data) {
    showFilters();
    photosData = data;
    uploadPictures(photosData);

  };

  window.gallery = {
    onErrorMessageShow: function () {
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
    }
  };

  var updatePictures = window.debounce(function (pictures) {
    resetContainer();
    uploadPictures(pictures);
  });

  window.backend.load(getSuccessDataPictures, window.gallery.onErrorMessageShow);

  var onButtonFilterClick = function (evt) {
    var target = evt.target;

    if (['filter-popular', 'filter-random', 'filter-discussed'].indexOf(target.id) !== -1) {
      var current = document.querySelector('.img-filters__button--active');
      if (current) {
        current.classList.remove('img-filters__button--active');
      }
      target.classList.add('img-filters__button--active');

      var images = photosData.slice();
      if (target.id === 'filter-random') {

        images = window.util.getUniqueElement(images, COUNT_RANDOM_PHOTOS);
      }
      if (target.id === 'filter-discussed') {
        images.sort(function (a, b) {
          return b.comments.length - a.comments.length;
        });
      }

      updatePictures(images);
    }
  };

  document.addEventListener('click', onButtonFilterClick);
})();
