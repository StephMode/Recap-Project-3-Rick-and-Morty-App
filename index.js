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

function renderAndAppendCharacterCard() {
  // const card = CharacterCard(); // entweder const mit value fn call und dann append() const aufnehmen
  cardContainer.append(CharacterCard()); // oder einfahc die fn selbst als param in den method
  // return; // brauchen wir nicht, weil
  // a) keine Daten aus dieser fn an eine andere weitergeben wollen, wir wollen einfahc nur was appenden
  // b) in append() schon das return implizit ist
}

async function fetchCharacters() {
  const url = "https://rickandmortyapi.com/api/character";
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
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
}
fetchCharacters();


// States
const maxPage = 1;
const page = 1;
const searchQuery = "";
