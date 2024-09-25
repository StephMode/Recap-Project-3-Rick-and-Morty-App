import CharacterCard from "./components/CharacterCard/CharacterCard.js";
// geschweifte Klammern, um den epxort von mehreren Komponenten zu notieren
// ohne geschweifte Klammern, wenn expo default

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector('[data-js="search-bar-container"]');
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

async function fetchCharacters(page) {
	const url = `https://rickandmortyapi.com/api/character?page=${page}`;
	const response = await fetch(url);
	const data = await response.json();
	cardContainer.innerHTML = "";
	maxPage = data.info.pages;
	data.results.forEach((card) => cardContainer.append(CharacterCard(card.image, card.name, card.status, card.type, card.episode.length)));
	updatePagination(page, maxPage);
}
fetchCharacters(page);

nextButton.addEventListener("click", () => {
	if (page === maxPage) return;

	page += 1; // short: page++;
	fetchCharacters(page);
});
prevButton.addEventListener("click", () => {
	// if (page !== 1) {
	// 	page -= 1; // short: page--;
	// 	fetchCharacters(page);
	// }

	if (page <= 1) return;

	page -= 1; // short: page--;
	fetchCharacters(page);
});
function updatePagination(page, maxPage) {
	pagination.textContent = `${page} / ${maxPage}`;
}
