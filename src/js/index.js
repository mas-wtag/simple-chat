import ChatService from "../service/ChatService";

const { chat } = document.forms
const [$message] = chat.elements
const $messages = document.querySelector('#messages')

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
  } catch (err) {
    console.error(err)
  }
})