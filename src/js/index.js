import ChatService from "../service/ChatService";

const { chat } = document.forms
const [$message] = chat.elements
const $messages = document.querySelector('#messages')
const $viewport = document.querySelector('.chat--window-viewport')
const EVENT_VIEW = 'view'

$viewport.addEventListener(EVENT_VIEW, (evt) => {
  const {scrollHeight} = evt.target

  $viewport.scrollTo({behavior: "smooth", top: scrollHeight})
})

const service = new ChatService(
    process.env.API_KEY,
    process.env.API_USER,
    process.env.API_URL)

chat.addEventListener('submit', async evt => {
  evt.preventDefault()

  const { value } = $message

  try {
    const msg = await service.sendMessage(value)

    $message.value = null
    $messages.appendChild(msg.render(false))
    $viewport.dispatchEvent(new CustomEvent(EVENT_VIEW))
    $message.focus()
  } catch (err) {
    console.error(err)
  }
})

const SENDER = process.env.API_USER

;(async () => {
  try {
    const messages = await service.getMessages()

    messages.map(msg => msg.render(msg.author !== SENDER))
        .forEach(n => $messages.appendChild(n))

    if (!messages.length) {
      return
    }

    $viewport.dispatchEvent(new CustomEvent(EVENT_VIEW))
  } catch (err) {
    console.error(err)
  }
})()