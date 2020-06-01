
export default class Card {
  // eslint-disable-next-line class-methods-use-this
  like(event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }

  remove(event) {
    this.removeEventListeners();
    event.target.closest('.place-card').remove();
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
    this.cardContainer = document.createElement('div');
    this.cardContainer.classList.add('place-card');
    this.cardContainer.insertAdjacentHTML(
      'beforeend',

      ` <div class="place-card__image" style="background-image: url(${obj.link})">
          <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
          <h3 class="place-card__name">${obj.name}</h3>
          <button class="place-card__like-icon"></button>
        </div>`,
    );

    this.setEventListeners();

    return this.cardContainer;
  }

  setEventListeners() {
    this
      .cardContainer
      .querySelector('.place-card__like-icon')
      .addEventListener('click', this.like);
    this
      .cardContainer
      .querySelector('.place-card__delete-icon')
      // eslint-disable-next-line no-restricted-globals
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
      .removeEventListener('click', this.like);
    this
      .cardContainer
      .querySelector('.place-card__delete-icon')
      // eslint-disable-next-line no-restricted-globals
      .removeEventListener('click', () => this.remove(event));
    this
      .cardContainer
      .querySelector('.place-card__image')
      .removeEventListener('click', this.zoom);
  }
}
