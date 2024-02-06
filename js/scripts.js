const pokemonContainer = document.querySelector(".pokemon-container");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const btn_sprite = document.getElementById("btn_sprite");
const btn_stats = document.getElementById("btn_stats");
const btn_id = document.getElementById("btn_id");
const inpt_id = document.getElementById("inpt_id");

let offset = 1;
let limit = 8;

function fetchPokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(res => res.json())
    .then(data => {
        createPokemon(data);
    })
}

function fetchPokemons(offset, limit){
    for(let i = offset; i <= offset + limit; i++){
        fetchPokemon(i);
    }
}

function createPokemon(pokemon){
    if(btn_sprite.disabled){
        const card = document.createElement('div');
        card.classList.add('pokemon-block');
    
        const spriteContainer = document.createElement('div');
        spriteContainer.classList.add('img-container');
    
        const sprite = document.createElement('img');
        sprite.src = pokemon.sprites.front_default
    
        spriteContainer.appendChild(sprite);
    
        const number = document.createElement('p');
        number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;
    
        const name = document.createElement('p');
        name.classList.add('name');
        name.textContent = pokemon.name
    
        card.appendChild(spriteContainer);
        card.appendChild(number);
        card.appendChild(name);

        pokemonContainer.appendChild(card);
    }else{
        const cardContainer = document.createElement('div');
        cardContainer.classList.add("card-container");

        const cardBack = document.createElement('div');
        cardBack.classList.add('pokemon-block');

        const nameBack = document.createElement('p');
        nameBack.classList.add('name');
        nameBack.textContent = pokemon.name;
        

        for (let i = 0; i < 3; i++){
            const stat = pokemon.stats[i];

            const statName = document.createElement('div');    
            if(i == 0){
                statName.classList.add('stat_hp');
            }
            if(i == 1){
                statName.classList.add('stat_atk');
            }
            if(i == 2){
                statName.classList.add('stat_def');
            }
            statName.textContent = stat.stat.name + " : " + stat.base_stat;

            const progressBar = document.createElement('progress');
            progressBar.max = 255;
            progressBar.value = stat.base_stat;

            nameBack.appendChild(statName);

            nameBack.appendChild(progressBar);

            cardBack.appendChild(nameBack);
        }
        cardContainer.appendChild(cardBack);

        pokemonContainer.appendChild(cardContainer);
    }
}

function removeChildNodes(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

previous.addEventListener("click", () =>{
    if(offset != 1){
        removeChildNodes(pokemonContainer);
        offset -= 9;
        fetchPokemons(offset, limit);
    }
})

next.addEventListener("click", () =>{
    removeChildNodes(pokemonContainer);
    offset += 9;
    fetchPokemons(offset, limit);
})

btn_sprite.addEventListener("click", () =>{
    btn_sprite.disabled = true;
    btn_stats.disabled = false;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
})

btn_stats.addEventListener("click", () =>{
    btn_sprite.disabled = false;
    btn_stats.disabled = true;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
})

btn_id.addEventListener("click", ()=>{
    if(inpt_id.value < 1 || inpt_id.value == "" || inpt_id.value > 1025){
        window.alert("No hay ningún pokemon con ese id");
        removeChildNodes(pokemonContainer);
        fetchPokemons(1, 8);

    }else{
        removeChildNodes(pokemonContainer);
        fetchPokemon(inpt_id.value);
    }
})

fetchPokemons(offset, limit);