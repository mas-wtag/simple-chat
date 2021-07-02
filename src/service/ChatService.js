import Message from "../models/Message";

const PARAM_TOKEN = 'token'

export default class ChatService {

  #apiUrl;
  #apiKey;
  #username;

  constructor(key, username, apiUrl) {
    this.#apiKey = key
    this.#username = username
    this.#apiUrl = apiUrl
  }

  getMessages(since, limit = 10) {
    const query = new URLSearchParams()

    query.append(PARAM_TOKEN, this.#apiKey)

    if (parseInt(limit)) {
      query.append('limit', limit)
    }

    if (parseInt(since)) {
      query.append('since', since)
    }

    return fetch(`${this.#apiUrl}?${query.toString()}`)
        .then(r => r.json())
        .then((messages = []) => messages.map(msg => new Message(msg)))
  }

  sendMessage(msg) {
    return fetch(this.#apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [PARAM_TOKEN]: this.#apiKey
      },
      body: JSON.stringify({
        message: msg,
        author: this.#username
      })
    }).then(r => r.json())
      .then(msg => new Message(msg))
  }
}