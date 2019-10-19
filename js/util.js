'use strict';

(function () {
  window.util = {

    // Функция, возвращающая случайное число в диапазоне
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Функция, перемешивающая элемементы массива
    shuffleArray: function (array) {
      var tempArray = array.slice();
      for (var i = tempArray.length - 1; i > 0; i--) {
        var j = this.getRandomNumber(0, i);
        var temp = tempArray[i];
        tempArray[i] = tempArray[j];
        tempArray[j] = temp;
      }
      return tempArray;
    },

    // Функция, возвращающая случайный элемемент массива
    getRandomElement: function (array) {
      var randomIndex = Math.floor(Math.random() * array.length);
      var randomElement = array[randomIndex];

      return randomElement;
    },

    getUniqueElement: function (arr, quantity) {
      var uniqueElement = [];
      var buffer = arr.slice();

      for (var i = 0; i < quantity; i++) {
        var randomIndex = window.util.getRandomNumber(0, buffer.length - 1);

        if (randomIndex >= 0) {

          uniqueElement.push(buffer[randomIndex]);
          buffer.splice(randomIndex, 1);
        }
      }
      return uniqueElement;
    }
  };
})();
