"use strict";

export default class FormValidator {
  constructor(form, submit, validMessage) {
    this.validMessage = validMessage;
    this.form = form;
    this.submit = submit;
  }

  checkInputValidity(element) {
    this.errorElement = document.querySelector(`#error-${element.id}`);

    if (element.value.length <= 0) {
      this.errorElement.textContent = this.validMessage.validationVoid;
      this.errorElement.classList.add('error_is-active');
      this.setSubmitButtonStateDisactive();

      return false;
    }

    if (element.validity.tooShort) {
      this.errorElement.textContent = this.validMessage.validationLenght;
      this.errorElement.classList.add('error_is-active');
      this.setSubmitButtonStateDisactive();

      return false;
    }

    this.resetError();
    return true;
  }

  setSubmitButtonStateActive() {
    this.submit.classList.add('popup__button_is-active');
    this.submit.removeAttribute('disabled')
  }

  setSubmitButtonStateDisactive() {
    this.submit.classList.remove('popup__button_is-active');
    this.submit.setAttribute('disabled', 'disabled');
  }

  resetError() {
    this.errorElement.classList.remove('error_is-active');
    this.errorElement.textContent = '';
  }

  resetAllErrors() {
    const errors = this.form.querySelectorAll('.error');

    errors.forEach((elem) => {
      elem.classList.remove('error_is-active');
      elem.textContent = '';
    });
  }

  setEventListeners() {
    this.inputs = this.form.querySelectorAll('.popup__input');

    this.form.addEventListener('input', () => {
      let isValid = true;
      this.inputs.forEach((element) => {
        if (!this.checkInputValidity(element)) isValid = false;
      });

      if (isValid) this.setSubmitButtonStateActive();
    });
  }
}