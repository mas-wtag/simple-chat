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
}