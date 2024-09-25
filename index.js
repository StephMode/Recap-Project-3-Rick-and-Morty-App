import CharacterCard from "./components/CharacterCard/CharacterCard.js";
// geschweifte Klammern, um den epxort von mehreren Komponenten zu notieren

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

CharacterCard();

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";
