(function($) {
  // var API = 'https://api.douban.com/v2/book/user/lazurey/collections'

  function _api(start = 0, count = 20, status = 'read') {
    // var url = API + '?status=' + status + '&start=' + start + '&count=' + count;
    var url = 'js/mock.json'
    $.ajax(url)
      .success(function(data) {
        console.log(data);
      })
      .error(function(error) {
        console.log(error);
      });
  }

  function load_data() {
    _api(0, 20)
  }

  function init() {
    load_data(0, 20)
  }
  
  $(document).ready(function() {
    init()
  });
})(jQuery);