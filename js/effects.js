'use strict';

(function () {
// модуль для эффектов
  var DEFAULT_EFFECT = 'none';

  var EffectParameter = {
    chrome: {
      CLASS: 'effects__preview--chrome',
      PROPERTY: 'grayscale',
      MIN_VALUE: 0,
      MAX_VALUE: 1,
      UNIT: ''
    },
    sepia: {
      CLASS: 'effects__preview--sepia',
      PROPERTY: 'sepia',
      MIN_VALUE: 0,
      MAX_VALUE: 1,
      UNIT: ''
    },
    marvin: {
      CLASS: 'effects__preview--marvin',
      PROPERTY: 'invert',
      MIN_VALUE: 0,
      MAX_VALUE: 100,
      UNIT: '%'
    },
    phobos: {
      CLASS: 'effects__preview--phobos',
      PROPERTY: 'blur',
      MIN_VALUE: 0,
      MAX_VALUE: 3,
      UNIT: 'px'
    },
    heat: {
      CLASS: 'effects__preview--heat',
      PROPERTY: 'brightness',
      MIN_VALUE: 1,
      MAX_VALUE: 3,
      UNIT: ''
    }
  };
  var PinValue = {
    MIN: 0,
    MAX: 100
  };
  var EffectValue = {
    MAX: 100,
    DEFAULT: 100,
  };

  var uploadElement = document.querySelector('.img-upload');
  var imgPreviewWrapperElement = uploadElement.querySelector('.img-upload__preview');
  var imgPreviewElement = imgPreviewWrapperElement.querySelector('.img-upload__preview img');
  var effectsListElement = uploadElement.querySelector('.effects__list');
  var effectLevelElement = uploadElement.querySelector('.effect-level');
  var effectLevelValueElement = effectLevelElement.querySelector('.effect-level__value');
  var effectPinElement = effectLevelElement.querySelector('.effect-level__pin');
  var effectDepthElement = effectLevelElement.querySelector('.effect-level__depth');
  var effectLineElement = effectLevelElement.querySelector('.effect-level__line');
  var defaultRadioElement = effectsListElement.querySelector('#effect-' + DEFAULT_EFFECT);
  var currentEffectName = effectsListElement.querySelector('.effects__radio:checked').value;
  var currentEffectClass = 'effects__preview--' + currentEffectName;


  var applyEffect = function (value) {
    // debugger;
    switch (currentEffectClass) {
      case EffectParameter.chrome.CLASS:
        imgPreviewElement.style.filter = EffectParameter.chrome.PROPERTY + '(' + (value) / EffectValue.DEFAULT + EffectParameter.chrome.UNIT + ')';
        break;
      case EffectParameter.sepia.CLASS:
        imgPreviewElement.style.filter = EffectParameter.sepia.PROPERTY + '(' + (value) / EffectValue.DEFAULT + EffectParameter.sepia.UNIT + ')';
        break;
      case EffectParameter.marvin.CLASS:
        imgPreviewElement.style.filter = EffectParameter.marvin.PROPERTY + '(' + (value) * EffectParameter.marvin.MAX_VALUE / EffectValue.MAX + EffectParameter.marvin.UNIT + ')';
        break;
      case EffectParameter.phobos.CLASS:
        imgPreviewElement.style.filter = EffectParameter.phobos.PROPERTY + '(' + (value) * EffectParameter.phobos.MAX_VALUE / EffectValue.DEFAULT + EffectParameter.phobos.UNIT + ')';
        break;
      case EffectParameter.heat.CLASS:
        imgPreviewElement.style.filter = EffectParameter.heat.PROPERTY + '(' + ((value) / (EffectValue.MAX / (EffectParameter.heat.MAX_VALUE - EffectParameter.heat.MIN_VALUE)) + EffectParameter.heat.MIN_VALUE) + EffectParameter.heat.UNIT + ')';
        break;
      default:
        imgPreviewElement.style.filter = '';
    }
  };

  var setDefaultPinPosition = function () {
    effectLevelValueElement.value = window.effects.PinValue.MAX;
    effectPinElement.style.left = EffectValue.DEFAULT + '%';
    effectDepthElement.style.width = effectPinElement.style.left;
  };

  var setDefaultEffect = function () {
    defaultRadioElement.checked = true;
    imgPreviewElement.classList = '';
    imgPreviewElement.style.filter = '';
    imgPreviewElement.classList.add(DEFAULT_EFFECT);
    effectLevelElement.classList.add('hidden');
  };

  var setPinPosition = function (value) {
    effectPinElement.style.left = value + '%';
    effectLevelValueElement.value = Math.round(value);
    effectDepthElement.style.width = effectPinElement.style.left;
  };

  var onPhotoEffectClick = function (evt) {
    var target = evt.target;
    if (target.tagName !== 'INPUT') {
      return;
    }

    imgPreviewElement.classList = '';
    currentEffectName = target.value;

    currentEffectClass = 'effects__preview--' + currentEffectName;
    imgPreviewElement.classList.add(currentEffectClass);

    if (currentEffectClass !== 'effects__preview--' + DEFAULT_EFFECT) {
      effectLevelElement.classList.remove('hidden');
    } else {
      effectLevelElement.classList.add('hidden');
    }

    effectLevelValueElement.value = EffectValue.DEFAULT;
    applyEffect(EffectValue.DEFAULT);
    setDefaultPinPosition();
  };

  var onMouseDown = function (evt) {

    var startCoordX = evt.clientX;
    var sliderEffectLineRect = effectLineElement.getBoundingClientRect();
    var clickedPosition = (startCoordX - sliderEffectLineRect.left) / sliderEffectLineRect.width * 100;

    setPinPosition(clickedPosition);
    applyEffect(clickedPosition);

    var onMouseMove = function (moveEvt) {
      var shiftX = startCoordX - moveEvt.clientX;
      startCoordX = moveEvt.clientX;
      var movePosition = (effectPinElement.offsetLeft - shiftX) / sliderEffectLineRect.width * 100;

      if (movePosition <= PinValue.MIN) {
        movePosition = PinValue.MIN;
        effectLevelValueElement.value = PinValue.MIN;
      } else if (movePosition >= PinValue.MAX) {
        movePosition = PinValue.MAX;
        effectLevelValueElement.value = PinValue.MAX;
      }

      setPinPosition(movePosition);
      applyEffect(movePosition);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousemove', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  effectsListElement.addEventListener('click', onPhotoEffectClick);
  effectLineElement.addEventListener('mousedown', onMouseDown);

  window.effects = {
    setDefaultEffect: setDefaultEffect,
    setDefaultPinPosition: setDefaultPinPosition,
    PinValue: PinValue
  };
})();
