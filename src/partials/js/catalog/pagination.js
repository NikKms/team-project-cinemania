import { refs } from '../refs';

export default class Pagination {
  constructor(totalPages, page, updatePage) {
    this.totalPages = totalPages;
    this.currentPage = page;
    this.updatePage = updatePage;
  }

  createButton = () => {
    const arrPaginationItems = [];

    this.addFirstPages(arrPaginationItems);
    this.totalPages > 3 && this.addEllipsisIfNeeded(arrPaginationItems);
    this.totalPages > 3 && this.addMiddlePages(arrPaginationItems);
    this.totalPages > 3 && this.addEllipsisIfNeeded(arrPaginationItems, true);
    this.totalPages > 3 && this.addLastPage(arrPaginationItems);

    const markup = this.createPagination(arrPaginationItems.join(''));
    this.render(markup);
    return this.currentPage;
  };

  addFirstPages = arr => {
    for (let page = 1; page <= Math.min(3, this.totalPages); page++) {
      const activeEl = this.currentPage === page ? 'btn-active' : '';
      const btn = this.createPaginationItem(page, activeEl);
      arr.push(btn);
    }
  };

  addMiddlePages = arr => {
    const startPage = Math.max(4, this.currentPage - 2);
    const endPage = Math.min(this.currentPage + 1, this.totalPages - 1);
    for (let page = startPage; page <= endPage; page++) {
      const activeEl = this.currentPage === page ? 'btn-active' : '';
      const btn = this.createPaginationItem(page, activeEl);
      arr.push(btn);
    }
  };

  addEllipsisIfNeeded = (arr, atEnd = false) => {
    if (
      (atEnd && this.currentPage < this.totalPages - 2) ||
      (!atEnd && this.currentPage > 3)
    ) {
      arr.push('<li class="pagination-item">...</li>');
    }
  };

  addLastPage = arr => {
    const lastPage = this.totalPages;
    const activeEl = this.currentPage === lastPage ? 'btn-active' : '';
    const btn = this.createPaginationItem(lastPage, activeEl);
    arr.push(btn);
  };

  createPaginationItem = (page, activeClass) => {
    return `<li class='pagination-item ${activeClass}'>
              <a href='#' data-page='${page}' class='pagination-btn'>${page}</a>
            </li>`;
  };

  createPagination = paginationItems => {
    this.updatePage();
    return `<ul class='pagination'>${paginationItems}</ul>`;
  };

  render = pagination => {
    this.reset();
    refs.catalogFilms.insertAdjacentHTML('afterend', pagination);
    const el = document.querySelector('.pagination');
    el.addEventListener('click', this.handlerBtn);
  };

  reset = () => {
    const el = document.querySelector('.pagination');
    if (el) el.remove();
  };

  getActivePage = () => {
    return this.currentPage;
  };

  handlerBtn = e => {
    e.preventDefault();
    const page = parseInt(e.target.dataset.page);
    if (!isNaN(page)) {
      this.currentPage = page;
      this.createButton();
    }
  };
}
