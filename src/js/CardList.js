/* eslint-disable no-console */

export default class CardList {
  constructor(container, api, func) {
    this.container = container;
    this.func = func;
    this.api = api;
  }

  addCard(obj, myCard) {
    if (myCard) {
      this.container.insertBefore(this.func().create(obj), this.container.firstChild);
    } else {
      this.container.appendChild(this.func().create(obj));
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
