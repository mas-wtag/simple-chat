export const createElement = (name, children = [], attrs = {}) => {
  const element = document.createElement(name)

  children.map(c =>
    (c instanceof HTMLElement) ? c : document.createTextNode(c)
  )
      .forEach(n => element.appendChild(n))

  if (!attrs) {
    return
  }

  Object.entries(attrs)
      .forEach(([name, value]) => element.setAttribute(name, value))

  return element
}

export const toDateTime = timestamp =>
    new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    })
      .format(timestamp)