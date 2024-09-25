export default function NavButton(handleClick, label) {
  const button = document.createElement("button");
  button.classList.add("button");
  button.setAttribute("data-js", `button-${label.toLowerCase()}`);
  button.textContent = label;

  button.addEventListener("click", handleClick);

  return button;
}

// Komponenten mit Großbuchstaben schreiben, weil das Konvention in react ist
// In Komponenten denken - in diesem Fall: nicht beide buttons als innerHTML, sondern einen button, der an derer Stelle als component aufgerfunfen werden und spezifiziert werden kann

/*
das brauchen wir nicht:

card.innerHTML = `
      <button></button>
      `;


    weil: der button nix anderes wie seinen text content hat und alles, was ursprünglich im html code war, ist schon in den DOM methods definiert

    wir wollen einf ach nur plain text adden

  */
