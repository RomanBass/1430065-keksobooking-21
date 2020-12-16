'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

let avatarFileChooser = document.querySelector(`.ad-form__field input[type=file]`);
let avatarPreview = document.querySelector(`.ad-form-header__preview img`);
let housingFileChooser = document.querySelector(`.ad-form__upload input[type=file]`);
let housingPreviewBlock = document.querySelector(`.ad-form__photo`);

avatarFileChooser.addEventListener(`change`, function () {

  let file = avatarFileChooser.files[0];
  let fileName = file.name.toLowerCase();

  let matches = FILE_TYPES.some(function (ending) {
    return fileName.endsWith(ending);
  });

  if (matches) {
    let reader = new FileReader();

    reader.addEventListener(`load`, function () {
      avatarPreview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }

});

housingFileChooser.addEventListener(`change`, function () {

  let file = housingFileChooser.files[0];
  let fileName = file.name.toLowerCase();

  let matches = FILE_TYPES.some(function (ending) {
    return fileName.endsWith(ending);
  });

  if (matches) {
    let reader = new FileReader();

    reader.addEventListener(`load`, function () {
      housingPreviewBlock.innerHTML = `<img src="${reader.result}" alt="Фото жилья" width="70" height="70"></img>`;
    });
    reader.readAsDataURL(file);
  }

});
