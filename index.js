'use strict'

const document = require('html-element').document

function element (tag, options, container) {
  options = options || {}
  const classes = options.classes || {}
  const attributes = options.attributes || {}
  const text = options.text
  const html = options.html

  const el = document.createElement(tag)
  for (let cls of classes) {
    el.classList.add(cls)
  }
  for (let [name, value] of Object.entries(attributes)) {
    el.setAttribute(name, value)
  }
  if (container != null) {
    container.appendChild(el)
  }
  if (text != null) {
    el.textContent = text
  }
  if (html != null) {
    el.innerHTML = html
  }
  return el
}

module.exports = {
  book: {
    assets: './assets',
    css: ['api.css'],
    js: ['api.js']
  },

  blocks: {
    api: {
      process (block) {
        return this.book.renderBlock('markdown', block.body).then(function (body) {
          // Create container
          const container = element('article', { classes: ['api-container'] })

          // Create header
          const header = element('header', {}, container)
          if (block.kwargs.method) { element('small', { text: block.kwargs.method, classes: [block.kwargs.method.toLowerCase()] }, header) }
          element('h2', { text: block.args[0] }, header)
          if (block.kwargs.url) { element('span', { text: block.kwargs.url }, header) }

          // Create content section
          const content = element('section', {}, container)
          element('div', { classes: ['api-description'], html: body }, content)
          return container.outerHTML
        })
      }
    }
  }
}
