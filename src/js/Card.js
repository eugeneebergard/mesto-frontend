/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-globals */

export default class Card {
  constructor(api) {
    this.api = api;
  }

  like(event) {
    const like = event.target;
    if (like.classList.contains('place-card__like-icon_liked')) {
      this.api.deleteLike(this.card._id);
      this.likeCounting(like, true);
      like.classList.remove('place-card__like-icon_liked');
    } else {
      this.api.toPutLike(this.card._id);
      this.likeCounting(like, false);
      like.classList.add('place-card__like-icon_liked');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  likeCounting(heart, value) {
    const counter = heart.nextElementSibling;
    const counterValue = +counter.textContent;
    if (value) {
      counter.textContent = counterValue - 1;
    } else {
      counter.textContent = counterValue + 1;
    }
  }

  remove(event) {
    const clickCard = event.target.closest('.place-card');
    this.api.deleteCard(this.card._id);
    this.removeEventListeners();
    clickCard.remove();
  }

  // eslint-disable-next-line class-methods-use-this
  zoom(event) {
    const popupImg = document.querySelector('.popup_type_full-img');
    const fullImage = document.querySelector('.popup__bg-img');
    const imageSrc = event.target.style.backgroundImage.slice();

    fullImage.setAttribute('style', 'background-image');
    fullImage.style.backgroundImage = imageSrc;

    popupImg.classList.add('popup_is-opened');
  }

  create(obj) {
    this.card = obj;
    this.cardContainer = document.createElement('div');
    this.cardContainer.classList.add('place-card');
    this.cardContainer.insertAdjacentHTML(
      'beforeend',

      ` <div class="place-card__image" style="background-image: url(${this.card.link})">
          <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
          <h3 class="place-card__name">${this.card.name}</h3>
          <div class="place-card__container">
            <button class="place-card__like-icon"></button>
            <span class="place-card__like-counter">${this.card.likes.length}</span>
          </div>
        </div>`,
    );

    this.setEventListeners();

    return this.cardContainer;
  }

  setEventListeners() {
    this
      .cardContainer
      .querySelector('.place-card__like-icon')
      .addEventListener('click', () => this.like(event));
    this
      .cardContainer
      .querySelector('.place-card__delete-icon')
      .addEventListener('click', () => this.remove(event));
    this
      .cardContainer
      .querySelector('.place-card__image')
      .addEventListener('click', this.zoom);
  }

  removeEventListeners() {
    this
      .cardContainer
      .querySelector('.place-card__like-icon')
      .removeEventListener('click', () => this.like(event));
    this
      .cardContainer
      .querySelector('.place-card__delete-icon')
      .removeEventListener('click', () => this.remove(event));
    this
      .cardContainer
      .querySelector('.place-card__image')
      .removeEventListener('click', this.zoom);
  }
}
