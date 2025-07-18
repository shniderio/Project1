const pokeInput = document.getElementById('pokeSearch');
const fetchButton = document.getElementById('fetchButton');



    class PokemonData{
        constructor(pokemonName){
            this.pokemonName = pokemonName;
        }

        get getPokemonPic() {
            fetch(`https://pokeapi.co/api/v2/pokemon/${this.pokemonName.toLowerCase()}`)
                .then(response => {
                    if(!response.ok) throw new Error('Pokemon not found');
                    return response.json();
                })
                .then(data => {
                    const container = document.getElementById('dataContainer');
                    container.innerHTML = '';
                    
                    const img = document.createElement('img');
                    img.src = data.sprites.front_default;
                    img.alt = data.name;
                    
                    const name = document.createElement('h2');
                    name.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);

                    container.appendChild(name);
                    container.appendChild(img);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
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
    poke.getPokemonPic;

    pokeInput.value = '';
}

fetchButton.addEventListener('click', search);

pokeInput.addEventListener('keydown', function(event){
    if(event.key === 'Enter'){
        search(event);
    }
})