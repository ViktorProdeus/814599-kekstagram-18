'use strict';

(function () {
  var generateMessage = function (array) {
    var len = Math.random() > 0.5 ? window.data.MESSAGE_LEN_MIN : window.data.MESSAGE_LEN_MAX;

    return window.util.shuffleArray(array).slice(0, len).join(' ');
  };

  // Функция, которая создает массив комментариев
  var createUserComments = function () {
    var userComments = [];
    var count = window.util.getRandomNumber(0, window.data.AMOUNT_COMMENTS);

    for (var i = 1; i <= count; i++) {
      userComments.push({
        avatar: 'img/avatar-' + window.util.getRandomNumber(1, window.data.AMOUNT_AVATARS) + '.svg',
        message: generateMessage(window.data.MESSAGES),
        name: window.util.getRandomElement(window.data.NAMES)
      });
    }

    return userComments;
  };

  // Функция, которая создает массив фотографий с данными
  var createUserPictures = function () {
    var userPictures = [];
    var count = window.data.AMOUNT_IMAGES;

    for (var i = 1; i <= count; i++) {
      userPictures.push({
        url: 'photos/' + i + '.jpg',
        likes: window.util.getRandomNumber(window.data.LIKES_MIN, window.data.LIKES_MAX),
        comments: createUserComments(),
        description: window.util.getRandomElement(window.data.DESCRIPTIONS)
      });
    }

    return userPictures;
  };

  // Созданный массив фотографий запишем в переменную
  var dataPictures = createUserPictures();

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

  // Выводим шаблон на страницу
  addtoContainer(dataPictures);

  window.gallery = {
    dataPictures: dataPictures
  };
})();
