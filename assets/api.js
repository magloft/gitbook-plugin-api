require(["gitbook"], function(gitbook) {
  gitbook.events.bind("page.change", function() {
    $(".api-header").click(function(event) {
      $(event.currentTarget).parent().toggleClass('expanded');
    });
  });
});
