import ChatService from "../service/ChatService";

const { chat } = document.forms
const [$message] = chat.elements
const $messages = document.querySelector('#messages')
const $viewport = document.querySelector('.chat--window-viewport')

const SENDER = process.env.API_USER
const EVENT_VIEW = 'view'
const EVENT_MESSAGE = 'message'
let lastMessageTimestamp, timer

document.addEventListener(EVENT_MESSAGE, (evt) => {
  lastMessageTimestamp = evt.detail
})

$viewport.addEventListener(EVENT_VIEW, (evt) => {
  const {scrollHeight} = evt.target

  $viewport.scrollTo({behavior: "smooth", top: scrollHeight})
})

const handleError = fn => {
  try {
    fn()
  } catch (err) {
    console.error(err)
  }
}

$viewport.addEventListener('scroll', async () => {
  if (timer) {
    clearTimeout(timer)
  }

  // fetch newer messages when scroll ends
  timer = setTimeout(() => {
    handleError(async () => {
      const messages = await service.getMessages(lastMessageTimestamp, 5)

      messages.map(msg => msg.render(msg.author !== SENDER))
          .forEach(n => $messages.appendChild(n))

      if (!messages.length) {
        return
      }

      const {timestamp} = messages.pop()
      document.dispatchEvent(new CustomEvent(EVENT_MESSAGE, {detail: timestamp}))
    })
  }, 128)
})

const service = new ChatService(
    process.env.API_KEY,
    process.env.API_USER,
    process.env.API_URL)

chat.addEventListener('submit', evt => {
  evt.preventDefault()

  const { value } = $message

  handleError(async () => {
    const msg = await service.sendMessage(value)

    $message.value = null
    $messages.appendChild(msg.render(false))
    $viewport.dispatchEvent(new CustomEvent(EVENT_VIEW))
    $message.focus()

    document.dispatchEvent(new CustomEvent(EVENT_MESSAGE, {detail: msg.timestamp}))
  })
})

handleError(async () => {
    const messages = await service.getMessages()

    messages.map(msg => msg.render(msg.author !== SENDER))
        .forEach(n => $messages.appendChild(n))

    if (!messages.length) {
      return
    }

    $viewport.dispatchEvent(new CustomEvent(EVENT_VIEW))

    const {timestamp} = messages.pop()

    document.dispatchEvent(new CustomEvent(EVENT_MESSAGE, {detail: timestamp}))
})