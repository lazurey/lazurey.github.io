
(function($) {
  "use strict"

  const REPO_LENTH = 2;
  const PAGE_KEY = '@yiyaya';

  const fetchByPage = (page) => {
    $.getJSON(`./repo/${page}.json`, (poem) => {
      $('.title h1').text(poem.title);
      $('.title .subtitle').text(poem.subtitle ? `(${poem.subtitle})`: '');
      $('.content .wrapper').html(poem.content.map(line => `<p>${line}</p>`));
    });
  }

  const getCurrentPage = () => {
    return parseInt(localStorage.getItem(PAGE_KEY), 10) || 1;
  }

  const setCurrentPage = (page) => {
    localStorage.setItem(PAGE_KEY, page);
  }

  const initPagination = () => {
    $('.pagination .prev').click((event) => {
      event.preventDefault();
      const currentPage = getCurrentPage();
      const prevPage = (currentPage === 1) ? REPO_LENTH : currentPage - 1;
      fetchByPage(prevPage);
      setCurrentPage(prevPage);
    });
    $('.pagination .next').click(() => {
      event.preventDefault();
      const currentPage = getCurrentPage();
      const nextPage = (currentPage === REPO_LENTH) ? 1 : currentPage + 1;
      fetchByPage(nextPage);
      setCurrentPage(nextPage);
    });
  }

  $(document).ready(() => {
    fetchByPage(getCurrentPage());
    initPagination();
  })
})(jQuery);
