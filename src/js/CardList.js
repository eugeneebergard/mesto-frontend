/* eslint-disable no-console */

export default class CardList {
  constructor(container, api, func, myId) {
    this.container = container;
    this.func = func;
    this.api = api;
    this.myId = myId;
  }

  addCard(obj, newCard) {
    // eslint-disable-next-line no-underscore-dangle
    const cardId = obj.owner._id;
    const placeCard = this.func().create(obj);
    const buttonDelete = placeCard.querySelector('.place-card__delete-icon');

    if (newCard) {
      this.container.insertBefore(placeCard, this.container.firstChild);
    } else {
      this.container.appendChild(placeCard);
    }

    if (cardId === this.myId) {
      buttonDelete.classList.add('place-card__delete-icon_show');
    }
  }

  render() {
    this.api.getInitialCards()
      .then((cards) => {
        cards.reverse();
        // eslint-disable-next-line no-restricted-syntax
        for (const card of cards) {
          this.addCard(card, false);
        }
      })
      .catch((err) => console.log(err));
  }
}
