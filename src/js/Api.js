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
      });
  }

  getInitialCards() {
    return fetch(`${this.options.baseUrl}/cards`, {
      headers: this.options.headers,
    })
      .then((res) => {
        if (res.ok) return res.json();

        return Promise.reject(new TypeError(`Ошибка: ${res.status}`));
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
      });
  }

  sendNewCard(card) {
    const { name } = card;
    const { link } = card;
    return fetch(`${this.options.baseUrl}/cards`, {
      method: 'POST',
      headers: this.options.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();

        return Promise.reject(new TypeError(`Ошибка: ${res.status}`));
      });
  }

  deleteCard(id) {
    return fetch(`${this.options.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this.options.headers,
    })
      .then((res) => {
        if (res.ok) return res.json();

        return Promise.reject(new TypeError(`Ошибка: ${res.status}`));
      });
  }

  toPutLike(id) {
    return fetch(`${this.options.baseUrl}/cards/like/${id}`, {
      method: 'PUT',
      headers: this.options.headers,
    })
      .then((res) => {
        if (res.ok) return res.json();

        return Promise.reject(new TypeError(`Ошибка: ${res.status}`));
      });
  }

  deleteLike(id) {
    return fetch(`${this.options.baseUrl}/cards/like/${id}`, {
      method: 'DELETE',
      headers: this.options.headers,
    })
      .then((res) => {
        if (res.ok) return res.json();

        return Promise.reject(new TypeError(`Ошибка: ${res.status}`));
      });
  }

  sendAvatarUpdate(avatar) {
    return fetch(`${this.options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.options.headers,

      body: JSON.stringify({
        avatar,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();

        return Promise.reject(new TypeError(`Ошибка: ${res.status}`));
      });
  }
}
