'use strict';

(function () {
  var mainImage = document.querySelector('.review__main-image');
  var previousImage = document.querySelector('.review__previous-image');
  var nextImage = document.querySelector('.review__next-image');
  var description = document.querySelector('.review__description');
  var closeButton = document.querySelector('.review__close');

  var imagesData = JSON.parse(localStorage.getItem('imagesData'));
  var currentImage = +localStorage.getItem('currentImage');

  var getPreviousImageSrc = function (num) {
    var previous = num - 1;
    return previous > -1 ? imagesData[previous].src : '';
  };

  var getNextImageSrc = function (num) {
    var next = num + 1;
    return next < imagesData.length ? imagesData[next].src : '';
  };

  var renderImages = function (mainNumber) {
    mainImage.src = imagesData[mainNumber].src;
    description.textContent = imagesData[mainNumber].description;
    previousImage.src = getPreviousImageSrc(mainNumber);
    nextImage.src = getNextImageSrc(mainNumber);
  }

  var resetImages = function () {
    mainImage.src = '';
    previousImage.src = '';
    nextImage.src = '';
    description.textContent = '';
  }

  var onPreviousImageClick = function (evt) {
    currentImage--;
    renderImages(currentImage);
  }

  var onNextImageClick = function (evt) {
    currentImage++;
    renderImages(currentImage);
  }

  var onImageScroll = function (evt) {
    if (evt.wheelDelta > 0 && currentImage < imagesData.length - 1) {
      currentImage++;
      renderImages(currentImage);
    }

    if (evt.wheelDelta < 0 && currentImage > 0) {
      currentImage--;
      renderImages(currentImage);
    }
  }

  var onCloseClick = function (evt) {
    evt.preventDefault();

    resetImages();
    removeEventListeners();

    document.location.href = 'index.html';
  }

  var addEventListeners = function () {
    previousImage.addEventListener('click', onPreviousImageClick);
    nextImage.addEventListener('click', onNextImageClick);
    closeButton.addEventListener('click', onCloseClick);
    document.addEventListener('mousewheel', onImageScroll);
  }

  var removeEventListeners = function () {
    previousImage.removeEventListener('click', onPreviousImageClick);
    nextImage.removeEventListener('click', onNextImageClick);
    closeButton.removeEventListener('click', onCloseClick);
    document.removeEventListener('mousewheel', onImageScroll);
  }

  renderImages(currentImage);
  addEventListeners();
})();
