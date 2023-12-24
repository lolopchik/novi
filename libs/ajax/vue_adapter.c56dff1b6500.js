function insert_function(linkTag) {
  var reference = document.querySelector("#start_css_chunk");
  if (reference) {
    reference.parentNode.insertBefore(linkTag, reference);
  }
}

$(function() {
  window.main_jquery = $

  function init_vue(e) {
    var $this = $(e);
    var mshp_require_css = window['mshp_require_css']
    var mshp_require = window['mshp_require']
    var js = $this.data('js') || [];
    var css = $this.data('css') || [];
    mshp_require_css(css).then(() => {
      mshp_require(js).then(() => {
        $this.trigger('kek');
      })
    })
  }

  $.fn.run_after_render('init-vue', init_vue);
});
