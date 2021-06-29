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
          if (block.kwargs.method) { element('small', { text: block.kwargs.method, class: block.kwargs.method.toLowerCase(), id: 'method' }, header) }
          element('h2', { text: block.args[0] }, header)
          if (block.kwargs.url) { element('span', { text: block.kwargs.url, id: 'apiUrl' }, header) }

          // Create content wrapper
          const content = element('div', { class: 'api-content' }, container)
          element('div', {class: 'api-description', html: body}, content)

          // create parameters container
          const contentWrapper = element('div', { class: 'params-container'}, content)
          if(block.kwargs.params) {
            const urlParamsContainer = element('div', {class: 'params-wrapper'}, contentWrapper);
            element('h4', { class: 'params-title',text: 'url参数：'}, urlParamsContainer);
            const textarea = element('textarea',{id: 'urlParams', class: 'params-content', html: JSON.stringify(block.kwargs.params || {}, undefined, 4)}, urlParamsContainer)
            textarea.rows = 5;
          }
          if(block.kwargs.data) {
            const urlDataContainer = element('div', {class: 'params-wrapper'}, contentWrapper);
            element('h4', { class: 'params-title',text: '请求体参数：'}, urlDataContainer);
            const textarea = element('textarea',{id: 'data', class: 'params-content', html: JSON.stringify(block.kwargs.data || {}, undefined, 4)}, urlDataContainer)
            textarea.rows = 5;
          }

          // Create response container
          const resContainer = element('div', { class: 'response-container' }, content)
          element('button',{class: 'btn request-btn', html: '模拟请求'}, resContainer)
          element('h4', { class: 'params-title',text: '请求结果：'}, resContainer);
          const inner = element('div', { class: 'response-inner' }, resContainer)
          const resResult = element('textarea',{id: 'result', class: 'response-content'}, inner)
          resResult.readOnly = true;

          return container.outerHTML
        })
      }
    },
  }
}
