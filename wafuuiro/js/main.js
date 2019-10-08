
(function($) {

  function text_color(code) {
    code = code.substr(1);
    var r = parseInt(code.substr(0, 2), 16),
        g = parseInt(code.substr(2, 2), 16),
        b = parseInt(code.substr(4, 2), 16);

    var ratio = 1 - ( 0.299 * r + 0.587 * g + 0.114 * b) / 255;
    var hex = (ratio < 0.5) ? 0 : 255;
    return 'rgba(' + hex + ', ' + hex + ', '+ hex + ', 0.8)';
  }

  function load_data(callback) {
    $.getJSON("data/data.json", callback);
  }

  function render(color) {
    return $('<li><h3>' + color.kanji + '</h3></li>').css({
      'background-color': color.color,
      'color': text_color(color.color)
    }).append($('<div><p>' + color.romaji + '</p><p>' + color.color + '</p></div>').addClass('detail'));
  }

  function init_colors() {
    load_data(function(colors) {
      for (var i in colors) {
        $('#color-list').append(render(colors[i]));
      }
    })
  }

  $(document).ready(function() {
    init_colors()
  });
})(jQuery);
