'use strict'

const Q = require('q')
const document = require('html-element').document

function element (tag, { classes = [], attributes = {}, text = null, html = null } = {}, container = null) {
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

function render (context, blocks) {
  let promises = []
  blocks.forEach((block, index) => {
    promises.push(context.book.renderBlock('markdown', block))
  })
  return Q.all(promises)
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
        return render(this, [block.body]).then(([body, parameters, response]) => {
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
