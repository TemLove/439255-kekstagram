'use strict';

var PHOTOS_MIN_NUMBER = 1;
var PHOTOS_MAX_NUMBER = 25;
var photosUrls = getUrls(PHOTOS_MIN_NUMBER, PHOTOS_MAX_NUMBER);
var LIKES_MIN_NUMBER = 15;
var LIKES_MAX_NUMBER = 200;
var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var galleryElement = document.querySelector('.gallery-overlay');
var picturesElement = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');

function getRandomNumber(max, min) {
  min = min || 0;
  return Math.floor(Math.random() * (max - min) + min);
}

function randomizeArray(arr) {
  return arr.slice().sort(function () {
    return 0.5 - Math.random();
  });
}

function getUrls(min, max) {
  var numbers = [];
  while (max >= min) {
    numbers.push(min++);
  }
  return randomizeArray(numbers.map(function (number) {
    return 'photos/' + number + '.jpg';
  }));
}

function getComments() {
  var count = Math.round(Math.random() + 1);
  var comments = randomizeArray(COMMENTS);
  comments.length = count;
  return comments;
}

function Picture() {
  this.url = photosUrls.pop();
  this.likes = getRandomNumber(LIKES_MAX_NUMBER, LIKES_MIN_NUMBER);
  this.comments = getComments(2);
}

function getPictures(count) {
  var pictures = [];
  while (count-- > 0) {
    pictures.push(new Picture());
  }
  return pictures;
}

function renderPicture(picture) {
  var pictureElement = pictureTemplate.cloneNode(true);
  var pictureImgElement = pictureElement.querySelector('img');
  var pictureLikesElement = pictureElement.querySelector('.picture-likes');
  var pictureCommentsElement = pictureElement.querySelector('.picture-comments');
  pictureImgElement.setAttribute('src', picture.url);
  pictureLikesElement.textContent = picture.likes;
  pictureCommentsElement.textContent = picture.comments.length;
  return pictureElement;
}

function getFragment(data, renderMethod) {
  var fragment = document.createDocumentFragment();
  data.forEach(function (item) {
    fragment.appendChild(renderMethod(item));
  });
  return fragment;
}

var pictures = getPictures(25);
var picturesFragment = getFragment(pictures, renderPicture);
picturesElement.appendChild(picturesFragment);
galleryElement.querySelector('img').setAttribute('src', pictures[0].url);
galleryElement.querySelector('.likes-count').textContent = pictures[0].likes;
galleryElement.querySelector('.comments-count').textContent = pictures[0].comments.length;
galleryElement.classList.remove('hidden');
