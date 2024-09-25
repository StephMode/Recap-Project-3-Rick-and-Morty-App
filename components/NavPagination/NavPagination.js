export default function NavPagination(page, maxPage) {
  const pagination = document.createElement("span");
  pagination.textContent = `${page} / ${maxPage}`;
  return pagination;
}
