'use strict';

(function () {
  // Функция, возвращающая случайное число в диапазоне
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.util = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,

    getUniqueElement: function (arr, quantity) {
      var uniqueElements = [];
      var buffer = arr.slice();

      for (var i = 0; i < quantity; i++) {
        var randomIndex = getRandomNumber(0, buffer.length - 1);

        uniqueElements.push(buffer[randomIndex]);
        buffer.splice(randomIndex, 1);
      }

      return uniqueElements;
    }
  };
})();
