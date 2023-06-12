import { refs } from '../refs';
import { saveLocal } from './catalogUtils';
import svg from '../../../images/sprite.svg';

export default class Pagination {
  constructor({ totalPages, page, parentSection }, getMovies, params = []) {
    this.totalPages = totalPages;
    this.currentPage = page;
    this.parentSection = parentSection;
    this.getMovies = getMovies;
    this.params = params;
    this.arrPaginationItems = [];
  }

  createButton = async () => {
    if (this.totalPages <= 1) {
      this.reset();
      return;
    }

    this.arrPaginationItems = [];

    if (this.currentPage <= 4) {
      this.addFirstPages(this.arrPaginationItems);
    }
    if (this.currentPage > 9) {
      this.addBeforeMiddlePages(this.arrPaginationItems);
    }

    if (this.totalPages > 6) {
      if (this.currentPage >= 5)
        this.addEllipsisIfNeeded(this.arrPaginationItems, true);
      this.addMiddlePages(this.arrPaginationItems);
      if (this.currentPage < this.totalPages - 4)
        this.addEllipsisIfNeeded(this.arrPaginationItems, true);
      this.addLastPage(this.arrPaginationItems);
    }

    const markup = this.createPagination(this.arrPaginationItems.join(''));
    this.render(markup);
    saveLocal('currentPage', this.currentPage);
  };

  addFirstPages = arr => {
    for (let page = 1; page <= Math.min(3, this.totalPages); page++) {
      const activeEl = this.currentPage === page ? 'btn-active' : '';
      const btn = this.createPaginationItem('0' + page, activeEl);
      arr.push(btn);
    }
  };

  addBeforeMiddlePages = arr => {
    const startPage = this.currentPage - 9;

    console.log(startPage, this.currentPage - 5);

    for (let page = startPage; page < this.currentPage - 5; page++) {
      const activeEl = this.currentPage === page ? 'btn-active' : '';
      let btn = [];
      if (page <= 9) {
        btn = this.createPaginationItem('0' + page, activeEl);
      } else {
        btn = this.createPaginationItem(page, activeEl);
      }
      arr.push(btn);
    }
  };

  addMiddlePages = arr => {
    const startPage = Math.max(4, this.currentPage - 2);
    const endPage = Math.min(this.currentPage + 1, this.totalPages - 1);
    for (let page = startPage; page <= endPage; page++) {
      const activeEl = this.currentPage === page ? 'btn-active' : '';
      let btn = [];
      if (page <= 9) {
        btn = this.createPaginationItem('0' + page, activeEl);
      } else {
        btn = this.createPaginationItem(page, activeEl);
      }
      arr.push(btn);
    }
  };

  addEllipsisIfNeeded = (arr, atEnd = false) => {
    arr.push('<li class="pagination-item ellipsis">...</li>');
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
    const paginationContainer = `
      <div class='pagination ${
        this.totalPages <= 1 ? 'pagination-hidden' : ''
      }'>
      <button type="button" class='pagination-arrow pagination-arrows-prev${
        this.totalPages <= 1 ? 'pagination-arrows-hidden' : ''
      }'><svg class="icon" width="32" height="32">
      <use href="${svg}#icon-arrow-prev"></use>
    </svg></button>
        <ul class='pagination-list'>${paginationItems}</ul>
        <button type="button" class='pagination-arrow pagination-arrows-next${
          this.totalPages <= 1 ? 'pagination-arrows-hidden' : ''
        }'><svg class="icon" width="32" height="32">
        <use href="${svg}#icon-arrow-next"></use>
      </svg></button>
      </div>`;
    return paginationContainer;
  };

  render = pagination => {
    this.reset();
    refs.catalogFilms.insertAdjacentHTML('afterend', pagination);
    const el = document.querySelector('.pagination');
    const paginationContainer = document.querySelector('.pagination');

    el.addEventListener('click', this.handlerBtn);
    paginationContainer.addEventListener('click', this.arrowHandler);

    const prevButton = document.querySelector(
      '.pagination-arrow.pagination-arrows-prev'
    );
    if (this.currentPage === 1) {
      prevButton.style.display = 'none';
    } else {
      prevButton.style.display = 'block';
    }

    const nextButton = document.querySelector(
      '.pagination-arrow.pagination-arrows-next'
    );
    if (this.currentPage === this.totalPages) {
      nextButton.style.display = 'none';
    } else {
      nextButton.style.display = 'block';
    }
  };

  arrowHandler = e => {
    const targetEl = e.target;

    if (targetEl.classList.contains('pagination-arrows-prev')) {
      this.prev();
    }
    if (targetEl.classList.contains('pagination-arrows-next')) {
      this.next();
    }
  };

  reset = () => {
    const el = document.querySelector('.pagination');
    if (el) el.remove();
  };

  scrollToTop = () => {
    if (this.parentSection !== undefined) {
      this.parentSection.scrollIntoView({
        behavior: 'instant',
      });
    }
    return;
  };

  prev = async () => {
    if (this.currentPage === 1) return;
    this.currentPage -= 1;
    this.createButton();
    await this.getMovies(this.currentPage, ...this.params);
    this.scrollToTop();

    const prevButton = document.querySelector(
      '.pagination-arrow.pagination-arrows-prev'
    );
    if (this.currentPage === 1) {
      prevButton.style.display = 'none';
    } else {
      prevButton.style.display = 'block';
    }
  };

  next = async () => {
    if (this.currentPage === this.totalPages) return;
    this.currentPage += 1;
    this.createButton();
    await this.getMovies(this.currentPage, ...this.params);
    this.scrollToTop();

    const nextButton = document.querySelector(
      '.pagination-arrow.pagination-arrows-next'
    );
    if (this.currentPage === this.totalPages) {
      nextButton.style.display = 'none';
    } else {
      nextButton.style.display = 'block';
    }
  };

  updatePage(page) {
    this.currentPage = page;
    this.createButton();
  }

  handlerBtn = async e => {
    e.preventDefault();
    const page = parseInt(e.target.dataset.page);
    if (!isNaN(page)) {
      this.currentPage = page;
      this.createButton();

      await this.getMovies(this.currentPage, ...this.params);
      this.scrollToTop();
    }
  };
}
