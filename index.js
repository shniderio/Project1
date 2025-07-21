const pokeInput = document.getElementById('pokeSearch');
const fetchButton = document.getElementById('fetchButton');
const topTen = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
const topTenDiv = document.querySelector('.centered');


const topTenPokemon = async () => {
    const response = await fetch(topTen);
    const data = await response.json();

    for(let x = 0; x < data.results.length; x++){
        const pokemon = data.results[x];

        const newPokemon = document.createElement('div');
        newPokemon.classList.add("grid-item");

        const pokeDetails = await fetch(pokemon.url).then(response => response.json());

        const img = document.createElement('img');
        img.src = pokeDetails.sprites.front_default;
        img.alt = pokemon.name;

        const type = document.createElement('p');
        type.textContent = "Type: " + pokeDetails.types.map(t => t.type.name).join(', ');

        const statsList = document.createElement('p');

        pokeDetails.stats.forEach(stat => {
            const statItem = document.createElement('p');
            statItem.textContent = `${stat.stat.name.toUpperCase()}: ${stat.base_stat}`;
            statsList.appendChild(statItem);
        })

        const abilityList = document.createElement('p');

        pokeDetails.abilities.forEach(ability => {
            const abilityItem = document.createElement('p');
            abilityItem.textContent = `${ability.ability.name.toUpperCase()}`;
            abilityList.appendChild(abilityItem);
        })

        const pokeID = document.createElement('p');

        pokeID.textContent = `ID: ${pokeDetails.id}`;
        

        newPokemon.innerText = `${pokemon.name.toUpperCase()}`;
        newPokemon.appendChild(pokeID);
        topTenDiv.appendChild(newPokemon);
        newPokemon.appendChild(img);
        newPokemon.appendChild(type);
        newPokemon.appendChild(statsList);
        newPokemon.appendChild(abilityList);
    }
};

topTenPokemon();


class PokemonData{
    constructor(pokemonName){
        this.pokemonName = pokemonName;
    }

    getPokemonPic() {
        fetch(`https://pokeapi.co/api/v2/pokemon/${this.pokemonName.toLowerCase()}`)
            .then(response => {
                if(!response.ok) throw new Error('Pokemon not found');
                return response.json();
            })
            .then(data => {
                const container = document.querySelector('.containerItem');
                container.innerHTML = '';
                
                const img = document.createElement('img');
                img.src = data.sprites.front_default;
                img.alt = data.name;
                
                const name = document.createElement('h2');
                name.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);

                const statsList = document.createElement('p');

                data.stats.forEach(stat => {
                    const statItem = document.createElement('p');
                    statItem.textContent = `${stat.stat.name.toUpperCase()}: ${stat.base_stat}`;
                    statsList.appendChild(statItem);
                })

                const abilityList = document.createElement('p');

                data.abilities.forEach(ability => {
                    const abilityItem = document.createElement('p');
                    abilityItem.textContent = `${ability.ability.name.toUpperCase()}`;
                    abilityList.appendChild(abilityItem);
                })

                const pokeID = document.createElement('p');

                pokeID.textContent = `ID: ${data.id}`;

                const type = document.createElement('p');
                type.textContent = "Type: " + data.types.map(t => t.type.name).join(', ');

                container.appendChild(name);
                container.appendChild(pokeID);
                container.appendChild(img);
                container.appendChild(type);
                container.appendChild(statsList);
                container.appendChild(abilityList)
                container.classList.remove('hidden');
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                const container = document.querySelector('.containerItem');
                container.innerHTML = '';
                container.classList.add('hidden');
            });
    }
}



function search(event){
    event.preventDefault();

    const pokemonText = pokeInput.value.trim();

    if(pokemonText === ''){
        alert('Please enter a Pokemon Name!');
        return;
    }

    const poke = new PokemonData(pokemonText);
    poke.getPokemonPic();

    pokeInput.value = '';
}

fetchButton.addEventListener('click', search);

pokeInput.addEventListener('keydown', function(event){
    if(event.key === 'Enter'){
        search(event);
    }
})