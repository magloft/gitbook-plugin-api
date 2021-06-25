'use strict'

const document = require('html-element').document

function element (tag, options, container) {
  options = options || {}
  const cls = options.class
  const text = options.text
  const html = options.html
  const id = options.id

  const el = document.createElement(tag)
  el.id = id;
  el.classList.add(cls)
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
        console.log('api block',block);
        return this.book.renderBlock('markdown', block.body).then(function (body) {
          console.log('api block body',body);
          // Create container
          const container = element('div', { class: 'api-container' })

          // Create header
          const header = element('div', { class: 'api-header' }, container)
          if (block.kwargs.method) { element('small', { text: block.kwargs.method, class: block.kwargs.method.toLowerCase() }, header) }
          element('h2', { text: block.args[0] }, header)
          if (block.kwargs.url) { element('span', { text: block.kwargs.url }, header) }


          // Create content section
          const content = element('div', { class: 'api-content' }, container)
          element('div', { class: 'api-description', html: body }, content)
          return container.outerHTML
        })
      },
      blocks:[
        {
          parameters: {
            process (block) {
              console.log('parameters block',block);
              return this.book.renderBlock('markdown', block.body).then(function (body) {
                console.log('parameters block body',body);
                // Create container
                const container = element('div', { class: 'params-container' })
      
                if(block.kwargs.params)  element('textarea',{id: 'urlParams', value: JSON.stringify(block.kwargs.params || {})}, container)
                if(block.kwargs.data) element('textarea',{id: 'bodyParams', value: JSON.stringify(block.kwargs.data || {})}, container)
      
                console.log(container.outerHTML);
                return container.outerHTML
              })
            }
          },
        },
        {
          response: {
            process (block) {
              console.log('response block',block);
              return this.book.renderBlock('markdown', block.body).then(function (body) {
                console.log('response block body',body);
                // Create container
                const container = element('div', { class: 'response-container' })
      
                // Create inner section
                element('div', { class: 'response-inner' }, container)
                return container.outerHTML
              })
            }
          },
        }
      ]
    },
    parameters: {
      process (block) {
        console.log('parameters block',block);
        return this.book.renderBlock('markdown', block.body).then(function (body) {
          console.log('parameters block body',body);
          // Create container
          const container = element('div', { class: 'params-container' })

          if(block.kwargs.params)  element('textarea',{id: 'urlParams', value: JSON.stringify(block.kwargs.params || {})}, container)
          if(block.kwargs.data) element('textarea',{id: 'bodyParams', value: JSON.stringify(block.kwargs.data || {})}, container)

          console.log(container.outerHTML);
          return container.outerHTML
        })
      }
    },
    response: {
      process (block) {
        console.log('response block',block);
        return this.book.renderBlock('markdown', block.body).then(function (body) {
          console.log('response block body',body);
          // Create container
          const container = element('div', { class: 'response-container' })

          // Create inner section
          element('div', { class: 'response-inner' }, container)
          return container.outerHTML
        })
      }
    },
  }
}
