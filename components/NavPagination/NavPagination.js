export default function UpdatePagination(page, maxPage) {
  const pagination = document.querySelector('[data-js="pagination"]');

  pagination.textContent = `${page} / ${maxPage}`;
}
