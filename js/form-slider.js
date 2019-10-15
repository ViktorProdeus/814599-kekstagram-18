'use strict';

(function () {

  var changeEffect = function (current) {
    var effect = 'grayscale';
    var effectValue = current / window.data.PIN_POSITION_MAX;

    if (window.uploadPreview.img.classList.contains('effects__preview--sepia')) {
      effect = 'sepia';
    }

    if (window.uploadPreview.img.classList.contains('effects__preview--marvin')) {
      effect = 'invert';
      effectValue = current + '%';
    }

    if (window.uploadPreview.img.classList.contains('effects__preview--phobos')) {
      effect = 'blur';
      effectValue = (current / window.data.PIN_POSITION_MAX * 3) + 'px';
    }

    if (window.uploadPreview.img.classList.contains('effects__preview--heat')) {
      effect = 'brightness';
      effectValue = current / window.data.PIN_POSITION_MAX * 2 + 1;
    }

    window.uploadPreview.img.style.filter = effect + '(' + effectValue + ')';
  };

  var getCoords = function (element, evt) {
    var rect = element.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  };

  var calculatePinPosition = function (evt, target, shifts) {
    var coords = getCoords(window.uploadPreview.lineEffect, evt);
    var value = (coords.x + target.offsetWidth / 2 - shifts.x) / window.uploadPreview.lineEffect.offsetWidth * window.data.PIN_POSITION_MAX;

    if (value < window.data.PIN_POSITION_MIN) {
      value = window.data.PIN_POSITION_MIN;
    }
    if (value > window.data.PIN_POSITION_MAX) {
      value = window.data.PIN_POSITION_MAX;
    }

    value = Math.ceil(value);

    target.style.left = value + '%';

    window.uploadPreview.getPinPosition(getCoords(window.uploadPreview.lineEffect, evt));
    changeEffect(value);
  };

  window.uploadPreview.pin.addEventListener('mousedown', function (evt) {
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
})();
