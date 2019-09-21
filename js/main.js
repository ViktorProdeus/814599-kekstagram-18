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
      avatar: 'img/avatar-' + getRandomNumber(1, AMOUNT_AVATARS) + '.svg',
      message: getRandomElement(MESSAGES),
      name: getRandomElement(NAMES)
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
      comments: createUserComments(),
      description: 'описание фотографии'
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

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');


var fullPhoto = bigPicture.querySelector('.big-picture__img img');
var likesCount = bigPicture.querySelector('.likes-count');
var commentsCount = bigPicture.querySelector('.comments-count');
var socialComments = bigPicture.querySelector('.social__comments');
var socialComment = socialComments.querySelector('.social__comment');
var description = bigPicture.querySelector('.social__caption');


fullPhoto.src = dataPictures[0].url;
likesCount.textContent = dataPictures[0].likes;
commentsCount.textContent = dataPictures[0].comments.length;

var fragment = document.createDocumentFragment();
for (var i = 0; i < dataPictures[0].comments.length; i++) {
  var cloneComment = socialComment.cloneNode(true);
  cloneComment.querySelector('.social__picture').src = dataPictures[0].comments[i].avatar;
  cloneComment.querySelector('.social__picture').alt = dataPictures[0].comments[i].name;
  cloneComment.querySelector('.social__text').textContent = dataPictures[0].comments[i].message;
  fragment.appendChild(cloneComment);
}

socialComments.innerHTML = '';
socialComments.appendChild(fragment);
description.textContent = dataPictures[0].description;

var socialCommentCount = bigPicture.querySelector('.social__comment-count');
var commentsLoader = bigPicture.querySelector('.comments-loader');

var hideElement = function (element) {
  element.classList.add('visually-hidden');
};

hideElement(socialCommentCount);
hideElement(commentsLoader);
