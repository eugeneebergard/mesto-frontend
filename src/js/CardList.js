class CardList {
    constructor(container, api, func) {
      this.container = container;
      this.func = func;
      this.api = api;
    }

    addCard(obj) {
      this.container.appendChild(this.func().create(obj));
    }
    
    render() {
      this.api.getInitialCards()
          .then(cards => {
            for (const card of cards) {
              this.addCard(card);
            }
        })
    }
}