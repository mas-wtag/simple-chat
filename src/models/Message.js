import { createElement as h, toDateTime } from "../js/helpers";

export default class Message {
  author;
  message;
  timestamp;
  id;

  constructor({ author, message, timestamp, _id }) {
    this.id = _id
    this.author = author
    this.message = message
    this.timestamp = timestamp
  }

  render(incoming = true) {
    return h('li', [
      h('div', [
        incoming && h('span', [this.author]),
        h('p', [this.message]),
        h('span', [
            toDateTime(this.timestamp)
        ], {class: 'timestamp'})
      ].filter(Boolean), {class: 'message'})
    ], {class: incoming ? 'incoming' : 'outgoing'})
  }
}