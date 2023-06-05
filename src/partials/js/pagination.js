import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import refs from './refs';

const VISIBLE_PAGE = 4;

function createPagination(items, pages) {
  const options = {
    itemPerPage: pages,
    items,
    pages: Math.min(pages, VISIBLE_PAGE),
  };

  const pagination = new Pagination(refs.pagination, options);
  refs.pagination.style.display = pages > 1 ? 'block' : 'none';

  return pagination;
}

export { createPagination };
