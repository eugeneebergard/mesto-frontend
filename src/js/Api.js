"use strict";

export default class Api {
    constructor(options) {
        this.options = options;
    }

    getUserInfo() {
        return fetch(`${this.options.baseUrl}/users/me`, {
            headers: this.options.headers
        })
        
        .then(res => {
            if (res.ok) return res.json();

            return Promise.reject(`Ошибка: ${res.status}`);
        })
            
        .then((user) => {
            return user;
        })
        
        .catch ((err) => {
            console.log(err);
        });
    }

    getInitialCards() {
        return fetch(`${this.options.baseUrl}/cards`, {
            headers: this.options.headers
        })
        
        .then(res => {
            if (res.ok) return res.json();

            return Promise.reject(`Ошибка: ${res.status}`);
        })
            
        .then((cards) => {
            return cards;
        })
        
        .catch ((err) => {
            console.log(err);
        });
    }

    sendUserUpdate(name, about) {
        return fetch(`${this.options.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.options.headers,

            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        
        .then(res => {
            if (res.ok) return res.json();

            return Promise.reject(`Ошибка: ${res.status}`);
        })
            
        .then((update) => {
            console.log(update);
        })
        
        .catch ((err) => {
            console.log(err);
        });
    }
}