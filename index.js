import SearchBar from "./components/SearchBar/SearchBar.js";
import CharacterCard from "./components/CharacterCard/CharacterCard.js";
import NavButton from "./components/NavButton/NavButton.js";
import NavPagination from "./components/NavPagination/NavPagination.js";


// geschweifte Klammern, um den epxort von mehreren Komponenten zu notieren
// ohne geschweifte Klammern, wenn expo default

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector('[data-js="search-bar-container"]');
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');

// States
let page = 1;
let maxPage = 1;
let searchQuery = "";
const pagination = NavPagination(page, maxPage);

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
  pagination.textContent = `${page} / ${maxPage}`;

}

fetchCharacters();



searchBarContainer.append(SearchBar(handleSearch)); // append Search Bar Component
navigation.append(pagination);
function handleSearch(query) {
	searchQuery = query;
	console.log(searchQuery);
	fetchCharacters(); //die fn wird hier einfach nur gecalled, weil die URL in fetch characters sich dynamisch durch die temp literals anpasst und im eventLst die let searchQuery
}

// searchBar.addEventListener("submit", (event) => {
// 	event.preventDefault();
// 	const searchResult = event.target.query.value; // hier muss ich .query. adressieren, weil das der name meines input ist, der output des event wird quasi als object zurückgegeben, dass via .notation explizit adressiert werden
// 	searchQuery = searchResult;
// 	console.log(searchQuery);
// 	fetchCharacters(); //die fn wird hier einfach nur gecalled, weil die URL in fetch characters sich dynamisch durch die temp literals anpasst und im eventLst die let searchQuery


// nicht vergessen: wenn ich auf das event eines evList zurückgreifen möchte, so muss ich das event als param für die callbakc fn deifnierten

navigation.append(NavButton(handleButtonNext, "Next"));
navigation.prepend(NavButton(handleButtonPrev, "Prev"));

function handleButtonNext() {
  if (page === maxPage) return;

  page += 1; // short: page++;
  fetchCharacters();
}

function handleButtonPrev() {
  if (page !== 1) {
    page -= 1; // short: page--;
    fetchCharacters(page);
  }
}

// nextButton.addEventListener("click", () => {
//   if (page === maxPage) return;

//   page += 1; // short: page++;
//   fetchCharacters();
// });

// prevButton.addEventListener("click", () => {
//   // if (page !== 1) {
//   // 	page -= 1; // short: page--;
//   // 	fetchCharacters(page);
//   // }

//   if (page <= 1) return;

//   page -= 1; // short: page--;
//   fetchCharacters();
// });
