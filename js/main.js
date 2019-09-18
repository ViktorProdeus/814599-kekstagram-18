'use strict';

// Данные из ТЗ

var AMOUNT_IMAGES = 25;

var LIKES_MIN = 15;
var LIKES_MAX = 200;

var AMOUNT_AVATARS = 6;
var NAMES = ['Артем', 'Рома', 'Эльдар', 'Мухамед', 'Вероника', 'Аркадий', 'Кекс', 'Дима', 'Борис', 'Толик'];
var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var AMOUNT_COMMENTS = 10;


// Функция, возвращающая случайное число в диапазоне
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция, возвращающая случайный элемемент массива
var getRandomElement = function (array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  var randomElement = array[randomIndex];

  return randomElement;
};

// Функция, которая создает массив комментариев
var createUserComments = function () {
  var userComments = [];
  var count = getRandomNumber(0, AMOUNT_COMMENTS);

  for (var i = 1; i <= count; i++) {
    userComments.push({
      avatars: 'img/avatar-' + getRandomNumber(1, AMOUNT_AVATARS) + '.svg',
      messages: getRandomElement(MESSAGES),
      names: getRandomElement(NAMES)
    });
  }

  return userComments;
};

// Функция, которая создает массив фотографий с данными
var createUserPictures = function () {
  var userPictures = [];
  var count = AMOUNT_IMAGES;

  for (var i = 1; i <= count; i++) {

    userPictures.push({
      url: 'photos/' + i + '.jpg',
      likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
      comments: createUserComments()
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
