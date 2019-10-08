(function($) {
  function render_level() {
    $('.level').each(function() {
      var count = parseInt($(this).attr('data-level'));
      for (var i = 0; i < count; i++) {
        $(this).append('<i class="icon-cup"></i>')
      }
    })
  }

  function show_layer() {
    $('.menu--link').click(function() {
      var layer = $(this).attr('data-open');
      $('.' + layer).fadeIn();
    });
  }

  function hide_layer() {
    $('.layer .return').click(function() {
      $('.layer').fadeOut();
    })
  }

  $(document).ready(function() {
    render_level();
    show_layer();
    hide_layer();
  })
})(jQuery);
