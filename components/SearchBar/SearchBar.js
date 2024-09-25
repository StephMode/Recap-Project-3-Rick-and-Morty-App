export default function SearchBar(handleSearch) {
	const form = document.createElement("form");
	form.setAttribute("data-js", "search-bar");
	form.classList.add("search-bar");
	form.innerHTML = `
        <input name="query" class="search-bar__input" type="text" placeholder="search characters" aria-label="character name" />
        <button class="search-bar__button" aria-label="search for character">
            <img class="search-bar__icon" src="assets/magnifying-glass.png" alt="" />
        </button>
    `;

	form.addEventListener("submit", (event) => {
		event.preventDefault();

		handleSearch(event.target.query.value);
	});

	return form;
}
