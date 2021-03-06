export default class CardList {
  constructor(container, api, func, myId) {
    this.container = container;
    this.func = func;
    this.api = api;
    this.myId = myId;
  }

  addCard(card, newCard) {
    const cardId = card.owner._id;
    const placeCard = this.func()
      .create(card);
    const buttonDelete = placeCard.querySelector('.place-card__delete-icon');
    const buttonLike = placeCard.querySelector('.place-card__like-icon');
    const likeWasClick = card.likes.find((item) => item._id === this.myId);

    if (newCard) {
      this.container.insertBefore(placeCard, this.container.firstChild);
    } else {
      this.container.appendChild(placeCard);
    }

    if (cardId === this.myId) {
      buttonDelete.classList.add('place-card__delete-icon_show');
    }

    if (likeWasClick) buttonLike.classList.add('place-card__like-icon_liked');
  }

  render(loading) {
    const load = loading;
    this.api.getInitialCards()
      .then((cards) => {
        cards.reverse();
        // eslint-disable-next-line no-restricted-syntax
        for (const card of cards) {
          this.addCard(card, false);
        }
        load.classList.add('root__loading_done');
      })
      .catch((err) => console.log(err));
  }
}
