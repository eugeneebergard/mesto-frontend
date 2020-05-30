import "./style.css";

const popupEdit = document.querySelector('.popup_type_edit-profile');
const popupAdd = document.querySelector('.popup_type_add-card');
const popupImg = document.querySelector('.popup_type_full-img');

const buttonOpenAdd = document.querySelector('.user-info__button_add');
const buttonOpenEdit = document.querySelector('.user-info__button_edit')

const buttonCloseAdd = document.querySelector('.popup__close_type_add-card');
const buttonCloseEdit = document.querySelector('.popup__close_type_edit-profile');
const buttonCloseImg = document.querySelector('.popup__close_type_full-img');

const submitAdd = document.querySelector('.popup__button_save_card');
const submitEdit = document.querySelector('.popup__button_save_change');

const formAdd = document.querySelector('.popup__form_type_add-card');
const formEdit = document.querySelector('.popup__form_type_edit-profile');

const placesList = document.querySelector('.places-list');

const fullname = document.querySelector('.popup__input_type_fullname');
const job = document.querySelector('.popup__input_type_job');
const infoName = document.querySelector('.user-info__name');
const infoJob = document.querySelector('.user-info__job');

const validMessage = {
  validationLenght: 'Должно быть от 2 до 30 символов',
  validationVoid: 'Это обязательное поле'
}

const options = {
  baseUrl: 'https://praktikum.tk/cohort10',
  headers: {
    authorization: '786dbc8b-04cf-4abd-8a09-fbdf77c3284b',
    'Content-Type': 'application/json'
  }
}



const api = new Api(options);

const newUserCard = () => new Card();

const cardList = new CardList(placesList, api, newUserCard);

const popupTypeAdd = new Popup(popupAdd);
const popupTypeEdit = new Popup(popupEdit);
const popupTypeImg = new Popup(popupImg);

const userInfo = new UserInfo(fullname, job, infoName, infoJob, api);

const formValidatorAdd = new FormValidator(formAdd, submitAdd, validMessage);
const formValidatorEdit = new FormValidator(formEdit, submitEdit, validMessage);



// Обработчик открытия формы add //

buttonOpenAdd.addEventListener('click', () => {
  formValidatorAdd.setEventListeners();
  formValidatorAdd.setSubmitButtonStateDisactive();
  popupTypeAdd.open();
});

// Обработчик открытия формы edit //

buttonOpenEdit.addEventListener('click', () => {
  formValidatorEdit.setEventListeners();
  formValidatorEdit.setSubmitButtonStateActive();
  popupTypeEdit.open();
  userInfo.setUserInfo();
});

// Обработчик закрытия формы add //

buttonCloseAdd.addEventListener('click', () => {
  popupTypeAdd.close();
  formValidatorAdd.resetAllErrors();
  formAdd.reset();
});

// Обработчик закрытия формы edit //

buttonCloseEdit.addEventListener('click', () => {
  popupTypeEdit.close();
  formValidatorEdit.resetAllErrors();
  formEdit.reset();
});

// Обработчик закрытия формы img //

buttonCloseImg.addEventListener('click', () => {
  popupTypeImg.close();
});

// Обработчик добавления новой карточки //

submitAdd.addEventListener('click', event => {
  event.preventDefault();

  const name = document.querySelector('.popup__input_type_name');
  const link = document.querySelector('.popup__input_type_link-url');
  const newCard = { name: name.value, link: link.value };

  cardList.addCard(newCard);
  formAdd.reset();
  popupTypeAdd.close();
});

// Обработчик редактирования профиля //

submitEdit.addEventListener('click', event => {
  event.preventDefault();
  
  userInfo.updateUserInfo();
  popupTypeEdit.close();
});

// Подгрузка карточек из массива //

cardList.render();

// Подгрузка UserInfo //

userInfo.defaultData();