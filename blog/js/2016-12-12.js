
(function($) {
  "use strict"

  const DB_API = 'https://api.douban.com/v2/book/';
  const BOOK_LINK = 'https://book.douban.com/subject/';
  const IMAGE_LINK = 'https://img3.doubanio.com/lpic/';

  const book_list = $('#book-list');

  function book_markup(book) {
    let book_link = `${BOOK_LINK}${book.book_id}`;
    return `<li class="book-item">
      <a href="${book_link}" class="book-img" target="_blank" style="background-image: url(${IMAGE_LINK}${book.image}.jpg)"></a>
      <a href="${book_link}" class="book-title" target="_blank">${book.name}</a>
    </li>`;
  }

  function label_markup(label) {
    return `<li class="book-label">${label}</li>`;
  }

  function attach(item) {
    book_list.append(item);
  }

  function init() {
    $.getJSON('../js/2016-book.json', function(response) {
      let data = response.data;
      for (let i = 0; i < data.length; i++) {
        attach(label_markup(data[i].display_name));
        for (let j = 0; j < data[i].items.length; j++) {
          attach(book_markup(data[i].items[j]));
        }
      }
    });
  }

  $(document).ready(function() {
    init();
  })
})(jQuery);
