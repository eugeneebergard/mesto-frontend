
import './style.css';

import Api from './js/Api';
import Card from './js/Card';
import CardList from './js/CardList';
import FormValidator from './js/FormValidator';
import Popup from './js/Popup';
import UserInfo from './js/UserInfo';

const popup = document.querySelector('.popup_type_full-img');

const popupEdit = document.querySelector('.popup_type_edit-profile');
const popupAdd = document.querySelector('.popup_type_add-card');
const popupImg = document.querySelector('.popup_type_full-img');
const popupAva = document.querySelector('.popup_type_update-avatar');

const buttonOpenAdd = document.querySelector('.user-info__button_add');
const buttonOpenEdit = document.querySelector('.user-info__button_edit');
const buttonOpenAva = document.querySelector('.user-info__photo');

const buttonCloseAdd = document.querySelector('.popup__close_type_add-card');
const buttonCloseEdit = document.querySelector('.popup__close_type_edit-profile');
const buttonCloseAva = document.querySelector('.popup__close_type_update-avatar');

const submitAdd = document.querySelector('.popup__button_save_card');
const submitEdit = document.querySelector('.popup__button_save_change');
const submitAva = document.querySelector('.popup__button_save_ava');

const formAdd = document.querySelector('.popup__form_type_add-card');
const formEdit = document.querySelector('.popup__form_type_edit-profile');
const formAva = document.querySelector('.popup__form_type_update-avatar');

const placesList = document.querySelector('.places-list');

const fullname = document.querySelector('.popup__input_type_fullname');
const job = document.querySelector('.popup__input_type_job');
const infoName = document.querySelector('.user-info__name');
const infoJob = document.querySelector('.user-info__job');

const loading = document.querySelector('.root__loading');

const myId = '0e6ebf1765e7b3bfcf6853fe';

const validMessage = {
  validationLenght: 'Должно быть от 2 до 30 символов',
  validationVoid: 'Это обязательное поле',
};

const options = {
  // eslint-disable-next-line no-undef
  baseUrl: NODE_ENV === 'development' ? 'http://praktikum.tk/cohort10' : 'https://praktikum.tk/cohort10',
  headers: {
    authorization: '786dbc8b-04cf-4abd-8a09-fbdf77c3284b',
    'Content-Type': 'application/json',
  },
};

const popupTypeAdd = new Popup(popupAdd);
const popupTypeEdit = new Popup(popupEdit);
const popupTypeImg = new Popup(popupImg);
const popupTypeAva = new Popup(popupAva);

const api = new Api(options);

const newUserCard = () => new Card(api);

const cardList = new CardList(placesList, api, newUserCard, myId);

const userInfo = new UserInfo(fullname, job, infoName, infoJob, api, buttonOpenAva);

const formValidatorAdd = new FormValidator(formAdd, submitAdd, validMessage);
const formValidatorEdit = new FormValidator(formEdit, submitEdit, validMessage);
const formValidatorAva = new FormValidator(formAva, submitAva, validMessage);


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

// Обработчик открытия формы avatar //

buttonOpenAva.addEventListener('click', () => {
  formValidatorAva.setEventListeners();
  formValidatorAva.setSubmitButtonStateDisactive();
  popupTypeAva.open();
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

// Обработчик закрытия формы avatar //

buttonCloseAva.addEventListener('click', () => {
  popupTypeAva.close();
  formValidatorAva.resetAllErrors();
  formAva.reset();
});

// Обработчик закрытия формы img //

popup.addEventListener('click', () => {
  popupTypeImg.close();
});

// Обработчик добавления новой карточки //

submitAdd.addEventListener('click', (event) => {
  event.preventDefault();

  const name = document.querySelector('.popup__input_type_name');
  const link = document.querySelector('.popup__input_type_link-url');
  const newCard = { name: name.value, link: link.value };

  submitAdd.textContent = 'Загрузка...';

  api.sendNewCard(newCard)
    .then((res) => {
      cardList.addCard(res, true);
      submitAdd.textContent = '+';
    })
    // eslint-disable-next-line no-console
    .catch((err) => console.log(err));


  formAdd.reset();
  popupTypeAdd.close();
});

// Обработчик редактирования профиля //

submitEdit.addEventListener('click', (event) => {
  event.preventDefault();

  userInfo.updateUserInfo(popupTypeEdit, submitEdit);
});

// Обработчик загрузки аватара //

submitAva.addEventListener('click', (event) => {
  event.preventDefault();

  const link = document.querySelector('.popup__input_type_link-ava');

  userInfo.updateUserAvatar(popupTypeAva, link.value);
});

// Подгрузка карточек из массива //

cardList.render(loading);

// Подгрузка UserInfo //

userInfo.defaultData();
