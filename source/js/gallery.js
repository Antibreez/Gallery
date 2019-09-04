'use strict';

(function () {
  var gallery = document.querySelector('.gallery__list');
  var images = gallery.querySelectorAll('.gallery__image')
  var descriptions = gallery.querySelectorAll('.gallery__description');

  for (var i = 0; i < images.length; i++) {
    images[i].setAttribute('id', i);
  }

  var setImageData = function (image, idx) {
    return {
      src: images[idx].attributes.src.nodeValue,
      description: descriptions[idx]
        .textContent
        .replace(/[\n\r]+|[\s]{2,}/g, ' ').trim()
    }
  }

  var imagesData = Array(images.length).fill(null).map(setImageData);

  var onImageClick = function (evt) {
    if (evt.target.classList.contains('gallery__image')) {
      localStorage.setItem('currentImage', evt.target.id);
      localStorage.setItem('imagesData', JSON.stringify(imagesData));
      document.location.href = "review.html";
    }

    gallery.removeEventListener('click', onImageClick);
  }

  gallery.addEventListener('click', onImageClick);
})();
