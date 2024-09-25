export default function NavPagination(page, maxPage) {
  const pagination = document.createElement("span");
  pagination.classList.add("navigation__pagination");

  pagination.textContent = `${page} / ${maxPage}`;
  return pagination;
}
