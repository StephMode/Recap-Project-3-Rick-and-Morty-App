import CharacterCard from "./components/CharacterCard/CharacterCard.js";
// geschweifte Klammern, um den epxort von mehreren Komponenten zu notieren
// ohne geschweifte Klammern, wenn expo default

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let page = 1;
let maxPage = 1;
let searchQuery = "";

function renderAndAppendCharacterCard() {
  // const card = CharacterCard(); // entweder const mit value fn call und dann append() const aufnehmen
  cardContainer.append(CharacterCard()); // oder einfahc die fn selbst als param in den method
  // return; // brauchen wir nicht, weil
  // a) keine Daten aus dieser fn an eine andere weitergeben wollen, wir wollen einfahc nur was appenden
  // b) in append() schon das return implizit ist
}

async function fetchCharacters() {
  const url = `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`; // die template literals fügen die let page und searchQuery in die URL für den fetch ein
  const response = await fetch(url);
  const data = await response.json();
  cardContainer.innerHTML = "";
  maxPage = data.info.pages;
  data.results.forEach((card) =>
    cardContainer.append(
      CharacterCard(
        card.image,
        card.name,
        card.status,
        card.type,
        card.episode.length
      )
    )
  );
  updatePagination(page, maxPage);
}
fetchCharacters();

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchResult = event.target.query.value; // hier muss ich .query. adressieren, weil das der name meines input ist, der output des event wird quasi als object zurückgegeben, dass via .notation explizit adressiert werden
  searchQuery = searchResult;
  console.log(searchQuery);
  fetchCharacters(); //die fn wird hier einfach nur gecalled, weil die URL in fetch characters sich dynamisch durch die temp literals anpasst und im eventLst die let searchQuery so neu definiert wird, dass in der gecallten fn dann die URL auf den value der form submission hin angepasst wird
});

// nicht vergessen: wenn ich auf das event eines evList zurückgreifen möchte, so muss ich das event als param für die callbakc fn deifnierten

nextButton.addEventListener("click", () => {
  if (page === maxPage) return;

  page += 1; // short: page++;
  fetchCharacters();
});
prevButton.addEventListener("click", () => {
  // if (page !== 1) {
  // 	page -= 1; // short: page--;
  // 	fetchCharacters(page);
  // }

  if (page <= 1) return;

  page -= 1; // short: page--;
  fetchCharacters();
});
function updatePagination(page, maxPage) {
  pagination.textContent = `${page} / ${maxPage}`;
}
