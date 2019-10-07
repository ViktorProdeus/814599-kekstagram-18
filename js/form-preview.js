'use strict';

(function () {
  var imgUploadForm = document.querySelector('.img-upload__form');
  var imgUpload = imgUploadForm.querySelector('.img-upload__overlay');
  var uploadCancel = imgUpload.querySelector('.img-upload__cancel');
  var imgPrewiev = imgUpload.querySelector('.img-upload__preview img');

  var scaleControl = imgUpload.querySelector('.scale__control--value');
  var sliderEffect = imgUpload.querySelector('.img-upload__effect-level');
  var lineEffect = sliderEffect.querySelector('.effect-level__line');
  var pin = lineEffect.querySelector('.effect-level__pin');
  var depth = lineEffect.querySelector('.effect-level__depth');
  var level = sliderEffect.querySelector('.effect-level__value');
  var uploadFile = document.querySelector('#upload-file');

  var openPopup = function () {
    imgUpload.classList.remove('hidden');
    document.addEventListener('keydown', window.formPreview.onPopupEscPress);
    window.formPreview.setInputValue(scaleControl, window.data.SCALE_MAX + '%');
  };

  var closePopup = function () {
    imgUpload.classList.add('hidden');
    getEffect('none');
    uploadFile.value = '';
    window.formPreview.setInputValue(scaleControl, window.data.SCALE_MAX + '%');
    document.removeEventListener('keydown', window.formPreview.onPopupEscPress);
  };

  uploadFile.addEventListener('change', function () {
    openPopup();
    getEffect('none');
  });

  uploadCancel.addEventListener('click', function () {
    closePopup();
    imgUploadForm.reset();
  });

  uploadCancel.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      closePopup();
    }
  });

  var checksRange = function (min, max, current) {
    return (current > min && current < max);
  };

  var changeImgSize = function (step, valueRange, current) {
    current -= step;

    if (!checksRange(window.data.SCALE_MIN, window.data.SCALE_MAX, current)) {
      current = valueRange;
    }
    imgPrewiev.style.transform = 'scale(' + (current / window.data.SCALE_MAX) + ')';

    return current + '%';
  };

  var getEffect = function (effect) {
    window.formPreview.setInputValue(scaleControl, window.data.SCALE_MAX + '%');
    window.formPreview.getPinPosition(window.data.PIN_POSITION_MAX + '%');
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
      scaleControl.value = changeImgSize(window.data.SCALE_STEP, window.data.SCALE_MIN, parseInt(scaleControl.value, 10));
      window.formPreview.setInputValue(scaleControl, scaleControl.value);
    }

    if (target.classList.contains('scale__control--bigger')) {
      // получили текущее значение при уменьшении картинки
      scaleControl.value = changeImgSize(-(window.data.SCALE_STEP), window.data.SCALE_MAX, parseInt(scaleControl.value, 10));
      window.formPreview.setInputValue(scaleControl, scaleControl.value);
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

  window.formPreview = {
    img: imgPrewiev,
    lineEffect: lineEffect,
    pin: pin,
    imgUpload: imgUploadForm,

    onPopupEscPress: function (evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        closePopup();
        imgUpload.querySelector('#effect-none').checked = 'true';
      }
    },

    setInputValue: function (element, value) {
      element.setAttribute('value', value);
      element.value = value;
    },

    getPinPosition: function (position) {
      pin.style.left = position;
      depth.style.width = pin.style.left;
      var pinValue = parseInt(pin.style.left, 10);
      this.setInputValue(level, pinValue);
    }
  };
})();
