'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var AMOUNT_IMAGES = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;

var AMOUNT_AVATARS = 6;
var NAMES = ['Артем', 'Рома', 'Эльдар', 'Мухамед', 'Вероника', 'Аркадий', 'Кекс', 'Дима', 'Борис', 'Толик'];
var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var AMOUNT_COMMENTS = 10;
var DESCRIPTIONS = ['Класная фотка!', 'Хороший ракурс', 'Удачный кадр', 'Нужно закинуть в Инстаграмм', 'Эту фотку нужно удалить', 'Крутяк WOW! WOW!'];

var SCALE_MAX = 100;
var SCALE_MIN = 25;
var SCALE_STEP = 25;

var PIN_POSITION_MAX = 100;
var PIN_POSITION_MIN = 0;

var LEN_MESSAGE_MAX = 2;
var LEN_MESSAGE_MIN = 1;

// Функция, возвращающая случайное число в диапазоне
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var shuffleArray = function (array) {
  var tempArray = array.slice();
  for (var i = tempArray.length - 1; i > 0; i--) {
    var j = getRandomNumber(0, i);
    var temp = tempArray[i];
    tempArray[i] = tempArray[j];
    tempArray[j] = temp;
  }
  return tempArray;
};

// Функция, возвращающая случайный элемемент массива
var getRandomElement = function (array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  var randomElement = array[randomIndex];

  return randomElement;
};

var generateMessage = function (array) {
  var len = Math.random() > 0.5 ? LEN_MESSAGE_MIN : LEN_MESSAGE_MAX;
  return shuffleArray(array).slice(0, len).join(' ');
};

// Функция, которая создает массив комментариев
var createUserComments = function () {
  var userComments = [];
  var count = getRandomNumber(0, AMOUNT_COMMENTS);

  for (var i = 1; i <= count; i++) {
    userComments.push({
      avatar: 'img/avatar-' + getRandomNumber(1, AMOUNT_AVATARS) + '.svg',
      message: generateMessage(MESSAGES),
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
      description: getRandomElement(DESCRIPTIONS)
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

// var bigPicture = document.querySelector('.big-picture');
// bigPicture.classList.remove('hidden');

// var fullPhoto = bigPicture.querySelector('.big-picture__img img');
// var likesCount = bigPicture.querySelector('.likes-count');
// var commentsCount = bigPicture.querySelector('.comments-count');
// var socialComments = bigPicture.querySelector('.social__comments');
// var socialComment = socialComments.querySelector('.social__comment');
// var description = bigPicture.querySelector('.social__caption');

// fullPhoto.src = dataPictures[0].url;
// likesCount.textContent = dataPictures[0].likes;
// commentsCount.textContent = dataPictures[0].comments.length;

// var fragment = document.createDocumentFragment();
// for (var i = 0; i < dataPictures[0].comments.length; i++) {
//   var cloneComment = socialComment.cloneNode(true);
//   cloneComment.querySelector('.social__picture').src = dataPictures[0].comments[i].avatar;
//   cloneComment.querySelector('.social__picture').alt = dataPictures[0].comments[i].name;
//   cloneComment.querySelector('.social__text').textContent = dataPictures[0].comments[i].message;
//   fragment.appendChild(cloneComment);
// }

// socialComments.innerHTML = '';
// socialComments.appendChild(fragment);
// description.textContent = dataPictures[0].description;

// var socialCommentCount = bigPicture.querySelector('.social__comment-count');
// var commentsLoader = bigPicture.querySelector('.comments-loader');

// var hideElement = function (element) {
//   element.classList.add('visually-hidden');
// };

// hideElement(socialCommentCount);
// hideElement(commentsLoader);

var imgUploadForm = document.querySelector('.img-upload__form');
var imgUpload = imgUploadForm.querySelector('.img-upload__overlay');
var uploadCancel = imgUpload.querySelector('.img-upload__cancel');
var imgPrewiev = imgUpload.querySelector('.img-upload__preview img');


var onEscPopupPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
    imgUpload.querySelector('#effect-none').checked = 'true';
  }
};

var openPopup = function () {
  imgUpload.classList.remove('hidden');
  document.addEventListener('keydown', onEscPopupPress);
};

var closePopup = function () {
  imgUpload.classList.add('hidden');
  uploadFile.value = '';
  document.removeEventListener('keydown', onEscPopupPress);
};

var uploadFile = document.querySelector('#upload-file');
uploadFile.addEventListener('change', function () {
  openPopup();
  getEffect('none');
});

uploadCancel.addEventListener('click', function () {
  closePopup();
});

uploadCancel.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var scaleControl = imgUpload.querySelector('.scale__control--value');
var sliderEffect = imgUpload.querySelector('.img-upload__effect-level');
var lineEffect = sliderEffect.querySelector('.effect-level__line');
var pin = lineEffect.querySelector('.effect-level__pin');
var depth = lineEffect.querySelector('.effect-level__depth');
var level = sliderEffect.querySelector('.effect-level__value');

var checksRange = function (min, max, current) {
  return (current > min && current < max);
};

var changeImgSize = function (step, valueRange, current) {
  current -= step;

  if (!checksRange(SCALE_MIN, SCALE_MAX, current)) {
    current = valueRange;
  }
  imgPrewiev.style.transform = 'scale(' + (current / SCALE_MAX) + ')';

  return current + '%';
};

var changeEffect = function (current) {

  var Effect = 'grayscale';
  var effectValue = current / PIN_POSITION_MAX;

  if (imgPrewiev.classList.contains('effects__preview--sepia')) {
    Effect = 'sepia';
  }

  if (imgPrewiev.classList.contains('effects__preview--marvin')) {
    Effect = 'invert';
    effectValue = current + '%';
  }
  if (imgPrewiev.classList.contains('effects__preview--phobos')) {
    Effect = 'blur';
    effectValue = (current / PIN_POSITION_MAX * 3) + 'px';

  }
  if (imgPrewiev.classList.contains('effects__preview--heat')) {
    Effect = 'brightness';
    effectValue = current / PIN_POSITION_MAX * 2 + 1;
  }

  imgPrewiev.style.filter = Effect + '(' + effectValue + ')';
};

var getEffect = function (effect) {
  pin.style.left = PIN_POSITION_MAX + '%';
  scaleControl.value = SCALE_MAX + '%';
  depth.style.width = pin.style.left;
  level.setAttribute('value', parseInt(pin.style.left, 10));
  sliderEffect.classList.remove('hidden');
  imgPrewiev.removeAttribute('style');

  if (effect === 'none') {
    sliderEffect.classList.add('hidden');
  }

  imgPrewiev.setAttribute('class', 'effects__preview--' + effect);
};

imgUpload.addEventListener('click', function (evt) {
  var target = evt.target;

  if (target.classList.contains('scale__control--smaller')) {
    // получили текущее значение при уменьшении картинки
    scaleControl.value = changeImgSize(SCALE_STEP, SCALE_MIN, parseInt(scaleControl.value, 10));
    scaleControl.setAttribute('value', parseInt(scaleControl.value, 10));
  }

  if (target.classList.contains('scale__control--bigger')) {
    // получили текущее значение при уменьшении картинки
    scaleControl.value = changeImgSize(-(SCALE_STEP), SCALE_MAX, parseInt(scaleControl.value, 10));
    scaleControl.setAttribute('value', parseInt(scaleControl.value, 10));
  }

  switch (target.id) {
    case 'effect-none':
      getEffect('none');
      break;
    case 'effect-chrome':
      getEffect('chrome');
      break;
    case 'effect-sepia':
      getEffect('sepia');
      break;
    case 'effect-marvin':
      getEffect('marvin');
      break;
    case 'effect-phobos':
      getEffect('phobos');
      break;
    case 'effect-heat':
      getEffect('heat');
      break;
  }
});

var getCoords = function (element, evt) {
  var rect = element.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};

pin.addEventListener('mousedown', function (evt) {
  var target = evt.target;

  if (target.classList.contains('effect-level__pin')) {
    var shifts = getCoords(target, evt);

    var onTargetDrag = function (moveEvt) {
      moveEvt.preventDefault();

      var coords = getCoords(lineEffect, moveEvt);
      var value = (coords.x + target.offsetWidth / 2 - shifts.x) / lineEffect.offsetWidth * PIN_POSITION_MAX;

      if (value < PIN_POSITION_MIN) {
        value = PIN_POSITION_MIN;
      }
      if (value > PIN_POSITION_MAX) {
        value = PIN_POSITION_MAX;
      }

      pin.style.left = getCoords(lineEffect, evt);
      depth.style.width = pin.style.left;
      level.setAttribute('value', parseInt(pin.style.left, 10));
      changeEffect(parseInt(pin.style.left, 10));
      target.style.left = Math.ceil(value) + '%';
    };

    var onTargetDrop = function () {

      document.removeEventListener('mousemove', onTargetDrag);
      document.removeEventListener('mouseup', onTargetDrop);

      pin.style.left = getCoords(lineEffect, evt);
      depth.style.width = pin.style.left;
      level.setAttribute('value', parseInt(pin.style.left, 10));
      changeEffect(parseInt(pin.style.left, 10));

    };

    document.addEventListener('mousemove', onTargetDrag);
    document.addEventListener('mouseup', onTargetDrop);

  }
});
