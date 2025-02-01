const display = document.getElementById('display');
const typesContainer = document.getElementById('types');
const stats = document.querySelectorAll('.stat-text');
const metaText = document.querySelectorAll('.metastats-text');
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const weightValue = document.getElementById('weight');
const heightValue = document.getElementById('height');
const displayImage = document.getElementById('sprite');
const basePokeData = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

const parseInput = (input) => {
    const regex = /[^a-zA-Z0-9-]/g;
    return input.replace(regex, "").toLowerCase();
}
const fetchPokemon = async (input) => {
    try {
        const res = await fetch(`${basePokeData}${parseInput(input)}`)
        .then(response => {
            if(!response.ok) {
                alert(`Pokémon not found`);
                resetDisplays();
                return null;
            }
            return response.json();
        })
        .then(data => {
            updateDisplays(data);
        })
        .catch(error => {
            console.error("there was error with fetching:", error);
        });
    } catch (err) {
        console.log(err);
    }
    return null;
}

const updateDisplays = (datajson) => {
    displayImage.src = datajson.sprites.front_default;
    displayImage.alt = `${datajson.name} Front Default Sprite`;
    displayImage.style.display = "block";
    weightValue.innerText = datajson.weight;
    heightValue.innerText = datajson.height;
    pokemonId.innerText = `#${datajson.id}`;
    typesContainer.innerHTML = "";
    pokemonName.innerText = datajson.name.toUpperCase();
    for(const type of datajson.types) {
        typesContainer.innerHTML += `<div id="${type.type.name}" class="type-text">${type.type.name.toUpperCase()}</div>`;
        //<div id="electric" class="type-text">ELECTRIC</div>
    }
    for(const element of metaText) {
        element.style.display = "block";
    }
    let statIndex = 0;
    for(const stat of datajson.stats) {
        stats[statIndex].innerHTML = stat.base_stat;
        statIndex++;
    }
};
const resetDisplays = () => {
    searchInput.value = "";
    displayImage.src = "";
    displayImage.alt = "";
    displayImage.style.display = "none";
    typesContainer.innerHTML = "";
    weightValue.innerText = "";
    heightValue.innerText = "";
    pokemonId.innerText = "";
    pokemonName.innerText = "";

    for(const element of metaText) {
        element.style.display = "none";
    }
    for(const element of stats) {
        element.innerHTML = "";
    }
};
searchButton.addEventListener("click", () => {
    fetchPokemon(searchInput.value)
});
searchInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        fetchPokemon(searchInput.value);
    }
});

// resetDisplays();