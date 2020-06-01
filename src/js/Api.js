
export default class Api {
  constructor(options) {
    this.options = options;
  }

  getUserInfo() {
    return fetch(`${this.options.baseUrl}/users/me`, {
      headers: this.options.headers,
    })

      .then((res) => {
        if (res.ok) return res.json();

        return Promise.reject(new TypeError(`Ошибка: ${res.status}`));
      })

      .then((user) => user)

      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }

  getInitialCards() {
    return fetch(`${this.options.baseUrl}/cards`, {
      headers: this.options.headers,
    })

      .then((res) => {
        if (res.ok) return res.json();

        return Promise.reject(new TypeError(`Ошибка: ${res.status}`));
      })

      .then((cards) => cards)

      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }

  sendUserUpdate(name, about) {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.options.headers,

      body: JSON.stringify({
        name,
        about,
      }),
    })

      .then((res) => {
        if (res.ok) return res.json();

        return Promise.reject(new TypeError(`Ошибка: ${res.status}`));
      })

      .then((update) => {
        // eslint-disable-next-line no-console
        console.log(update);
      })

      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }
}
