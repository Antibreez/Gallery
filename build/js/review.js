'use strict';

(function () {
  var container = document.querySelector('.review__container');
  var mainImage = document.querySelector('.review__main-image');
  var previousImage = document.querySelector('.review__previous-image');
  var nextImage = document.querySelector('.review__next-image');
  var description = document.querySelector('.review__description');
  var closeButton = document.querySelector('.review__close');

  var imagesData = JSON.parse(localStorage.getItem('imagesData'));
  var currentNum = +localStorage.getItem('currentImage');
  var previousNum = currentNum - 1 < 0
    ? imagesData.length - 1
    : currentNum -1;
  var nextNum = currentNum + 1 > imagesData.length - 1
    ? 0
    : currentNum + 1;

  var decreaseValue = function (num) {
    return num - 1 < 0 ? imagesData.length - 1 : num - 1;
  }

  var increaseValue = function (num) {
    return num + 1 > imagesData.length - 1 ? 0 : num + 1;
  }

  var getDecreasedValues = function () {
    currentNum = decreaseValue(currentNum);
    previousNum = decreaseValue(previousNum);
    nextNum = decreaseValue(nextNum);
  }

  var getIncreasedValues = function () {
    currentNum = increaseValue(currentNum);
    previousNum = increaseValue(previousNum);
    nextNum = increaseValue(nextNum);
  }

  var renderImages = function () {
    mainImage.src = imagesData[currentNum].src;
    description.textContent = imagesData[currentNum].description;
    previousImage.src = imagesData[previousNum].src;
    nextImage.src = imagesData[nextNum].src;
  }

  var resetImages = function () {
    mainImage.src = '';
    previousImage.src = '';
    nextImage.src = '';
    description.textContent = '';
  }

  var onPreviousImageClick = function (evt) {
    getDecreasedValues();
    renderImages();
  }

  var onNextImageClick = function (evt) {
    getIncreasedValues();
    renderImages();
  }

  var onImageScroll = function (evt) {
    var delta = evt.detail ? evt.detail * (-1) : evt.wheelDelta;

    delta < 0 ? getIncreasedValues() : getDecreasedValues();
    renderImages();

    // if (delta > 0 && currentNum < imagesData.length - 1) {
    //   currentNum++;
    //   renderImages(currentNum);
    // }

    // if (delta < 0 && currentNum > 0) {
    //   currentNum--;
    //   renderImages(currentNum);
    // }
  }

  var onCloseClick = function (evt) {
    evt.preventDefault();

    resetImages();
    removeEventListeners();

    document.location.href = 'index.html';
  }

  var mousewheleEvent = (/Firefox/i.test(navigator.userAgent))
    ? 'DOMMouseScroll'
    : 'mousewheel'

  var addEventListeners = function () {
    previousImage.addEventListener('click', onPreviousImageClick);
    nextImage.addEventListener('click', onNextImageClick);
    closeButton.addEventListener('click', onCloseClick);
    container.addEventListener(mousewheleEvent, onImageScroll);
  }

  var removeEventListeners = function () {
    previousImage.removeEventListener('click', onPreviousImageClick);
    nextImage.removeEventListener('click', onNextImageClick);
    closeButton.removeEventListener('click', onCloseClick);
    container.removeEventListener(mousewheleEvent, onImageScroll);
  }

  renderImages();
  addEventListeners();
})();
