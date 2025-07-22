const pokeInput = document.getElementById('pokeSearch');
const fetchButton = document.getElementById('fetchButton');
const topTen = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
const topTenDiv = document.querySelector('.centered');
const randomStarterPokemon = document.getElementById('randomStarterPokemon');


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
        type.textContent = "Type: " + pokeDetails.types.map(type => type.type.name).join(', ');

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
        fetch(`https://pokeapi.co/api/v2/pokemon/${this.pokemonName}`)
            .then(response => {
                if(!response.ok) alert('Pokemon not found');
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

class randomStarter extends PokemonData{
    constructor(){
        super('stuff');
    }
    getRandomStarter(){
        let starters = [1, 4, 7];
        const randomID = starters[Math.floor(Math.random() * starters.length)];
        return randomID;
    }
}

function randomThreeStarter(event){
    event.preventDefault();

    const starter =  new randomStarter();
    const randomID = starter.getRandomStarter();

    const poke = new PokemonData(randomID);
    poke.getPokemonPic();
}

randomStarterPokemon.addEventListener('click', randomThreeStarter);

function search(event){
    event.preventDefault();

    const pokemonText = pokeInput.value.trim();

    if(pokemonText === ''){
        alert('Please enter a Pokemon Name or ID!');
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