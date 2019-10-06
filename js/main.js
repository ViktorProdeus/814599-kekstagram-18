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

var MESSAGE_LEN_MAX = 2;
var MESSAGE_LEN_MIN = 1;

var TAG_LEN_MAX = 20;
var TAG_MAX = 5;
// --------------------------------------------------------------------------

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
// ---------------------------------------------------------------------------

var generateMessage = function (array) {
  var len = Math.random() > 0.5 ? MESSAGE_LEN_MIN : MESSAGE_LEN_MAX;

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
// ------------------------------------------------------------------------

var fullPhotoContainer = document.querySelector('.big-picture');
var prewievPhotos = document.querySelectorAll('.picture');
var fullPhoto = fullPhotoContainer.querySelector('.big-picture__img img');
var likesCount = fullPhotoContainer.querySelector('.likes-count');
var commentsCount = fullPhotoContainer.querySelector('.comments-count');
var socialComments = fullPhotoContainer.querySelector('.social__comments');
var socialComment = socialComments.querySelector('.social__comment');
var description = fullPhotoContainer.querySelector('.social__caption');
var socialCommentCount = fullPhotoContainer.querySelector('.social__comment-count');
var commentsLoader = fullPhotoContainer.querySelector('.comments-loader');
var fullPhotoCancel = fullPhotoContainer.querySelector('.big-picture__cancel');

var onFullPhotoEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeFullPhoto();
  }
};

var showFullPhoto = function () {
  fullPhotoContainer.classList.remove('hidden');
  document.addEventListener('keydown', onFullPhotoEscPress);
};

var closeFullPhoto = function () {
  fullPhotoContainer.classList.add('hidden');
  document.removeEventListener('keydown', onFullPhotoEscPress);
};

var renderFullPhoto = function (image) {
  fullPhoto.src = image.url;
  likesCount.textContent = image.likes;
  commentsCount.textContent = image.comments.length;
  description.textContent = image.description;

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < image.comments.length; i++) {
    var cloneComment = socialComment.cloneNode(true);
    cloneComment.querySelector('.social__picture').src = image.comments[i].avatar;
    cloneComment.querySelector('.social__picture').alt = image.comments[i].name;
    cloneComment.querySelector('.social__text').textContent = image.comments[i].message;
    fragment.appendChild(cloneComment);
  }

  socialComments.innerHTML = '';
  socialComments.appendChild(fragment);
};

var changeFullPhoto = function (photo) {
  showFullPhoto();
  renderFullPhoto(photo);
  hideElement(socialCommentCount);
  hideElement(commentsLoader);
};

var onPreviewPhotoClick = function (thumbnail, photo) {
  thumbnail.addEventListener('click', function () {
    changeFullPhoto(photo);
  });
};

var onPreviewPhotoEnterPress = function (thumbnail, photo) {
  thumbnail.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      changeFullPhoto(photo);
    }
  });
};

for (var j = 0; j < prewievPhotos.length; j++) {
  onPreviewPhotoClick(prewievPhotos[j], dataPictures[j]);
  onPreviewPhotoEnterPress(prewievPhotos[j], dataPictures[j]);
}

fullPhotoCancel.addEventListener('click', function () {
  closeFullPhoto();
});

var hideElement = function (element) {
  element.classList.add('visually-hidden');
};
// ----------------------------------------------------------------

var imgUploadForm = document.querySelector('.img-upload__form');
var imgUpload = imgUploadForm.querySelector('.img-upload__overlay');
var uploadCancel = imgUpload.querySelector('.img-upload__cancel');
var imgPrewiev = imgUpload.querySelector('.img-upload__preview img');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
    imgUpload.querySelector('#effect-none').checked = 'true';
  }
};

var openPopup = function () {
  imgUpload.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  setInputValue(scaleControl, SCALE_MAX + '%');
};

var closePopup = function () {
  imgUpload.classList.add('hidden');
  uploadFile.value = '';
  setInputValue(scaleControl, SCALE_MAX + '%');
  document.removeEventListener('keydown', onPopupEscPress);
};

var uploadFile = document.querySelector('#upload-file');
uploadFile.addEventListener('change', function () {
  openPopup();
  getEffect('none');
});

uploadCancel.addEventListener('click', function () {
  closePopup();
  imgUploadForm.reset();
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
  var effect = 'grayscale';
  var effectValue = current / PIN_POSITION_MAX;

  if (imgPrewiev.classList.contains('effects__preview--sepia')) {
    effect = 'sepia';
  }

  if (imgPrewiev.classList.contains('effects__preview--marvin')) {
    effect = 'invert';
    effectValue = current + '%';
  }

  if (imgPrewiev.classList.contains('effects__preview--phobos')) {
    effect = 'blur';
    effectValue = (current / PIN_POSITION_MAX * 3) + 'px';
  }

  if (imgPrewiev.classList.contains('effects__preview--heat')) {
    effect = 'brightness';
    effectValue = current / PIN_POSITION_MAX * 2 + 1;
  }

  imgPrewiev.style.filter = effect + '(' + effectValue + ')';
};

var setInputValue = function (element, value) {
  element.setAttribute('value', value);
  element.value = value;
};

var getPinPosition = function (position) {
  pin.style.left = position;
  depth.style.width = pin.style.left;
  var pinValue = parseInt(pin.style.left, 10);
  setInputValue(level, pinValue);
};

var getEffect = function (effect) {
  setInputValue(scaleControl, SCALE_MAX + '%');
  getPinPosition(PIN_POSITION_MAX + '%');
  sliderEffect.classList.remove('hidden');
  imgPrewiev.removeAttribute('style');

  if (effect === 'none') {
    sliderEffect.classList.add('hidden');
  }

  imgPrewiev.setAttribute('class', 'effects__preview--' + effect);
};

var chooseZoom = function (target) {
  if (target.classList.contains('scale__control--smaller')) {
    // получили текущее значение при уменьшении картинки
    scaleControl.value = changeImgSize(SCALE_STEP, SCALE_MIN, parseInt(scaleControl.value, 10));
    setInputValue(scaleControl, scaleControl.value);
  }

  if (target.classList.contains('scale__control--bigger')) {
    // получили текущее значение при уменьшении картинки
    scaleControl.value = changeImgSize(-(SCALE_STEP), SCALE_MAX, parseInt(scaleControl.value, 10));
    setInputValue(scaleControl, scaleControl.value);
  }
};

var chooseEffect = function (target) {
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
};

imgUpload.addEventListener('click', function (evt) {
  var target = evt.target;

  chooseZoom(target);
  chooseEffect(target);
});

var getCoords = function (element, evt) {
  var rect = element.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};

var calculatePinPosition = function (evt, target, shifts) {
  var coords = getCoords(lineEffect, evt);
  var value = (coords.x + target.offsetWidth / 2 - shifts.x) / lineEffect.offsetWidth * PIN_POSITION_MAX;

  if (value < PIN_POSITION_MIN) {
    value = PIN_POSITION_MIN;
  }
  if (value > PIN_POSITION_MAX) {
    value = PIN_POSITION_MAX;
  }

  value = Math.ceil(value);

  target.style.left = value + '%';

  getPinPosition(getCoords(lineEffect, evt));
  changeEffect(value);
};

pin.addEventListener('mousedown', function (evt) {
  var target = evt.target;

  if (target.classList.contains('effect-level__pin')) {
    var shifts = getCoords(target, evt);

    var onTargetDrag = function (moveEvt) {
      moveEvt.preventDefault();
      calculatePinPosition(moveEvt, target, shifts);
    };

    var onTargetDrop = function (upEvt) {

      document.removeEventListener('mousemove', onTargetDrag);
      document.removeEventListener('mouseup', onTargetDrop);

      calculatePinPosition(upEvt, target, shifts);
    };

    document.addEventListener('mousemove', onTargetDrag);
    document.addEventListener('mouseup', onTargetDrop);
  }
});

imgUploadForm.addEventListener('focus', function (evt) {
  var target = evt.target;

  if (target.classList.contains('text__hashtags')) {
    document.removeEventListener('keydown', onPopupEscPress);
  }

  if (target.classList.contains('text__description')) {
    document.removeEventListener('keydown', onPopupEscPress);
  }
}, true);

imgUploadForm.addEventListener('blur', function (evt) {
  var target = evt.target;

  if (target.classList.contains('text__hashtags')) {
    document.addEventListener('keydown', onPopupEscPress);
  }

  if (target.classList.contains('text__description')) {
    document.addEventListener('keydown', onPopupEscPress);
  }
}, true);

var onInputHashtagsValidate = function (evt) {
  var target = evt.target;

  if (target.classList.contains('text__hashtags')) {
    var textHashtags = imgUploadForm.querySelector('.text__hashtags');
    var tags = textHashtags.value.trim().toLowerCase().split(/\s+/g);
    var arrayTags = [];

    textHashtags.setCustomValidity('');

    for (var i = 0; i < tags.length; i++) {

      if (tags[i].indexOf('#') !== 0) {
        textHashtags.setCustomValidity('хэш-тег начинается с символа # (решётка)');
      } else if (tags[i].length === 1 && tags[i].indexOf('#') === 0) {
        textHashtags.setCustomValidity('хеш-тег не может состоять только из одной решётки');
      } else if (tags[i].includes('#', 1)) {
        textHashtags.setCustomValidity('хэш-теги разделяются пробелами');
      } else if (tags.length > TAG_MAX) {
        textHashtags.setCustomValidity('нельзя указать больше пяти хэш-тегов');
      } else if (tags[i].length > TAG_LEN_MAX) {
        textHashtags.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
      } else if (arrayTags.includes(tags[i])) {
        textHashtags.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
      }

      arrayTags.push(tags[i]);
    }
  }
};

imgUploadForm.addEventListener('input', onInputHashtagsValidate);
