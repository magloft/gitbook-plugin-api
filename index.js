'use strict'

const document = require('html-element').document

function element (tag, options, container) {
  options = options || {}
  const cls = options.class
  const text = options.text
  const html = options.html
  const id = options.id
  const type = options.type
  const src = options.src

  const el = document.createElement(tag)
  el.id = id
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
  if (type != null) {
    // input框
    el.type = type
    el.value = text
  }
  if (src) {
    el.src = src
  }
  return el
}

module.exports = {
  book: {
    assets: './assets',
    css: ['api.css'],
    js: ['api.js']
  },

  hooks: {
		'page:before': function (page) {
      console.log('gitbook-plugin-api-page', page)
			return page;
		}
	},
  blocks: {
    api: {
      process (block) {
        return this.book.renderBlock('markdown', block.body).then(function (body) {
          // container
          const container = element('div', { class: 'api-container' })
          // header
          const header = element('div', { class: 'api-header', text: '在线调试工具' }, container)
          element('span', { class: 'icon-btn-right', html: `
            <svg 
              t="1626403766502" 
              class="icon" 
              viewBox="0 0 1024 1024" 
              version="1.1" xmlns="http://www.w3.org/2000/svg" 
              p-id="4538" 
              width="20" 
              height="20"
              style="margin-top:8px;"
            >
              <path 
                d="M411.562667 271.104l225.834666 225.792a21.333333 21.333333 0 0 1 0 30.208l-225.834666 225.792a21.333333 21.333333 0 1 0 30.208 30.208l225.792-225.834667a64 64 0 0 0 0-90.538666l-225.792-225.834667a21.333333 21.333333 0 0 0-30.208 30.208z" 
                p-id="4539" 
                fill="#1472FF">
              </path>
            </svg>` 
          }, header)

          if (block.kwargs.method) {
            element('input', {
              type: 'hidden',
              text: block.kwargs.method,
              class: block.kwargs.method.toLowerCase(),
              id: 'method'
            }, container)
          }
          if (block.kwargs.url) {
            element('input', {
              type: 'hidden',
              text: block.kwargs.url,
              id: 'apiUrl'
            }, container)
          }

          if (block.kwargs.data) {
            element('input', {
              type: 'hidden',
              text: JSON.stringify(block.kwargs.data, undefined, 4),
              id: 'initialValue'
            }, container)
          }

          // content
          const content = element('div', { class: 'api-content' }, container)

          const paramsContainer = element('div', { class: 'params-container' }, content)
          element('h4', {
            class: 'params-title',
            text: '请求'
          }, paramsContainer)

          element('textarea', {
            id: 'data',
            class: 'params-content',
            html: JSON.stringify(block.kwargs.data, undefined, 4)
          }, paramsContainer)

          // Create response container
          const resContainer = element('div', { class: 'response-container' }, content)
          element('h4', {
            class: 'params-title',
            text: '响应'
          }, resContainer)

          const resResult = element('textarea', {
            id: 'result',
            class: 'response-content'
          }, resContainer)
          resResult.readOnly = true

          // footer
          const footer = element('footer', { class: 'api-footer' }, content)
          const footerInner = element('div', { class: 'footer-inner' }, footer)
          element('button', { class: 'btn reset-btn', html: '重置' }, footerInner)
          element('button', { class: 'btn request-btn', html: '提交请求' }, footerInner)
          return container.outerHTML
        })
      }
    }
  },
  
}
