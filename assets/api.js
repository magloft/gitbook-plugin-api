document.body.querySelectorAll("article.api-container").forEach(function(container) {
  container.querySelector("header").addEventListener('click', function() {
    container.classList.toggle('expanded')
  })
})
