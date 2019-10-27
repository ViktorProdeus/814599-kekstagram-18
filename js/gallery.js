'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var FILTERS = ['filter-popular', 'filter-random', 'filter-discussed'];

  var picturesTemplate = document.querySelector('#picture')
    .content.querySelector('.picture');

  var errorTemplate = document.querySelector('#error')
    .content.querySelector('.error');

  var MAX_RANDOM_IMAGES = 10;
  var filtersContainer = document.querySelector('.img-filters');
  var filtersButtonsContainer = filtersContainer.querySelector('.img-filters__form');

  // Генерируем шаблон фотографий
  var renderUserPictures = function (picture) {
    var cloneInElement = picturesTemplate.cloneNode(true);

    cloneInElement.querySelector('.picture__img').src = picture.url;
    cloneInElement.querySelector('.picture__likes').textContent = picture.likes;
    cloneInElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return cloneInElement;
  };

  // Добавляем шаблон в контейнер для изображений
  var addToContainer = function (array) {
    var fragment = document.createDocumentFragment();
    var picturesContainer = document.querySelector('.pictures');

    array.forEach(function (element) {
      fragment.appendChild(renderUserPictures(element));
    });

    return picturesContainer.appendChild(fragment);
  };

  var resetContainer = function () {
    var pictures = document.querySelectorAll('.picture');

    pictures.forEach(function (node) {
      node.remove();
    });
  };

  var showFilters = function () {
    filtersContainer.classList.remove('img-filters--inactive');
  };

  var uploadPictures = function (allPictures) {
    addToContainer(allPictures);
    window.galleryPreview.openPhoto(allPictures);
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
      window.formSubmit.getMessage(errorTemplate);
      var errorMessage = document.querySelector('.error');
      var errorBtns = document.querySelectorAll('.error__button');

      errorBtns.forEach(function (errorBtn) {
        errorBtn.addEventListener('click', function () {
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
      });
    }
  };

  var updatePictures = window.debounce(function (pictures) {
    resetContainer();
    uploadPictures(pictures);
  });


  window.backend.makeRequest(URL_LOAD, getSuccessDataPictures, window.gallery.onErrorMessageShow, 'GET');

  var onButtonFilterClick = function (evt) {
    var target = evt.target;


    if (FILTERS.indexOf(target.id) !== -1) {
      var activeFilter = filtersButtonsContainer.querySelector('.img-filters__button--active');
      var images = photosData.slice();

      if (activeFilter) {
        activeFilter.classList.remove('img-filters__button--active');
      }

      target.classList.add('img-filters__button--active');

      if (target.id === 'filter-random') {
        images = window.util.getUniqueElement(images, MAX_RANDOM_IMAGES);
      }

      if (target.id === 'filter-discussed') {
        images.sort(function (a, b) {
          return b.comments.length - a.comments.length;
        });
      }

      updatePictures(images);
    }
  };

  filtersButtonsContainer.addEventListener('click', onButtonFilterClick);
})();
