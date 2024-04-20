<script setup>
import { onMounted, provide, reactive, ref } from 'vue';
import FunctionQueue from '../utils/FunctionQueue';

import Card from './Card.vue';
import ShowPokemonDetail from './ShowPokemonDetail.vue';
import Species from './Species.vue';
import Types from './Types.vue';
import Flags from './Flags.vue';

let functionQueue = new FunctionQueue();
const limit = 10;
let offset = (limit * -1);
let pokemonSearch = ref('');
let showPokeball = ref(true);
let selectedSpecie = ref('');
let selectedType = ref('');
let language = ref('en');
const fallbackLanguage = 'en';

provide('pokemonSearch', pokemonSearch);
provide('selectedSpecie', selectedSpecie);
provide('selectedType', selectedType);
provide('language', language);
provide('fallbackLanguage', fallbackLanguage);

const loadPokemonData = async (resolve, reject) => {
    lastFunction.value = loadPokemonData;
    fetchPokemonData(resolve, reject, `https://pokeapi.co/api/v2/pokemon`);
}

let lastFunction = ref(loadPokemonData);
let isSearching = ref(false);

const state = reactive({
    pokemonData: [],
    selectedPokemon: null,
    selectedCardIndex: null,
});


function clearPokemonList() {
    state.pokemonData = [];
    showPokeball.value = false;
}
// Função para lidar com o clique do card
const handleCardClick = (pokemon, index) => {
    if (state.selectedCardIndex === index) {
        state.selectedPokemon = null;
        state.selectedCardIndex = null;
        return;
    }
    state.selectedPokemon = pokemon;
    state.selectedCardIndex = index; 
};
// função principal que faz a requisição dos dados dos pokemons
const fetchPokemonData = async (resolve, reject, url) => {
    try {
        offset += limit;
        const response = await fetch(`${url}?limit=${limit}&offset=${offset}`);

        if (!response.ok) {
            lastFunction.value = null;
            pokemonSearch.value = '';
            state.pokemonData = [];
            isSearching = false;
            resolve();
            return;
        }

        let data = await response.json();

        if (!data.results) {
            data = { results: [ data ] };
        }

        const length = data.results?.length ?? 0;

        for (let i = 0; i < length; i++) {
            let pokemonUrlData = null;
            if (data.results[i].url) {
                const pokemonResponse = await fetch(data.results[i].url);
                pokemonUrlData = await pokemonResponse.json();
            } else {
                pokemonUrlData = data.results[i];
            }

            let abilities = [];
            let types = [];
            let stats = [];
            let allSprites = [];
            let gameIndices = [];


            gameIndices.push(...pokemonUrlData.game_indices.map(g => g.version.url));


            const validSprites = Object.entries(pokemonUrlData.sprites)
                .filter(([_, sprite]) => sprite  && typeof sprite !== 'object')
                .map(([_, sprite]) => sprite);
            
            const flatSprites = validSprites.flat();

            allSprites.push(...flatSprites);

            types.push(...pokemonUrlData.types.map(t => t.type.url));
            
            abilities.push(...pokemonUrlData.abilities.map(a => ({
                ability: a.ability.url,
                is_hidden: a.is_hidden
            })));

            stats.push(...pokemonUrlData.stats.map(s => ({
                url: s.stat.url,
                base_stat: s.base_stat
            })));

            let generationVImage = pokemonUrlData.sprites.versions['generation-v'] && pokemonUrlData.sprites.versions['generation-v']['black-white'] && pokemonUrlData.sprites.versions['generation-v']['black-white'].animated && pokemonUrlData.sprites.versions['generation-v']['black-white'].animated.front_default;
            let showdownImage = pokemonUrlData.sprites.other.showdown.front_default;
            let officialArtwork = pokemonUrlData.sprites.other['official-artwork'].front_default;

            let cardImageUrl = generationVImage ? generationVImage : (showdownImage ? showdownImage : officialArtwork);

            state.pokemonData.push({
                name: data.results[i].name,
                url: data.results[i].url,
                id: pokemonUrlData.id,
                moves: pokemonUrlData.moves.map(m=>m.move.url),
                cardImageUrl: cardImageUrl,
                abilities: abilities,
                types: types,
                stats: stats,
                sprites: allSprites,
                gameIndices: gameIndices
            });
        }
        showPokeball.value = length === limit;
        if (!showPokeball.value) { lastFunction.value = null};

        resolve();

    } catch (error) {
        console.error(error);
        reject(error);
    };

}

// Função para carregar todos os pokemons após clicar no botão
const loadAllPokemonButton = () => {
    state.selectedPokemon = null;
    state.selectedCardIndex = null;

    pokemonSearch.value = '';
    selectedSpecie.value = '';
    selectedType.value = '';

    offset = (limit * -1);
    state.pokemonData = [];
    lastFunction.value = loadPokemonData;
    functionQueue.enqueue(lastFunction.value);
}

onMounted(() => {  
    const target = document.querySelector('#loader');

    // Create an intersection observer instance
    const observer = new IntersectionObserver(function (entries, observer) {
        // Loop over the entries
        entries.forEach(entry => {
            // Check if the target is visible
            if (entry.isIntersecting && !isSearching.value) {
                // Run your code for when the div becomes visible
                if (lastFunction.value && showPokeball.value) {
                    functionQueue.enqueue(lastFunction.value);
                    console.log('Pokemon data loaded'); 
                } else {
                    console.log('No more pokemon data to load');
                }
            }
        });
    }, {
        root: null, // observing intersections with the viewport
        threshold: 0.1 // 10% of the target's visibility
    });

    // Start observing the target
    observer.observe(target);
});
// Função para pesquisar um pokemon
async function searchPokemonData(resolve, reject) {
    showPokeball.value = false;
    offset = (limit * -1);

    fetchPokemonData(resolve, reject, `https://pokeapi.co/api/v2/pokemon/${pokemonSearch.value.toLowerCase()}`);
}

// Função para submeter a pesquisa
const submit = async () => {
    const clear = document.querySelector('.search');

    if (!isValidSearch(pokemonSearch.value)) {
        clear.setCustomValidity('Invalid search. Please enter a valid pokemon name or id.');
        clear.reportValidity();
        return;
    }

    isSearching = true;
    state.pokemonData = [];
    selectedSpecie.value = '';
    selectedType.value = '';

   

    await new Promise((resolve, reject) => {
            searchPokemonData(resolve, reject);
    })
    .then(() => {
        if (lastFunction.value) lastFunction.value = searchPokemonData;
        isSearching = false;
    }); 
}

// Função para validar o input
function isValidSearch(input) {
    // Verifica se o input é uma string/char ou um inteiro
    const isStringOrInt = /^[a-zA-Z0-9]+$/.test(input);
    // Verifica se o input está vazio
    const isNotEmpty = input.trim() !== '';
    return isStringOrInt && isNotEmpty;
}

</script>

<template>
    <div class="content-container">

        <div class="form-container">
            <form action="" @submit.prevent="submit">
                <div class="button" @click="loadAllPokemonButton">
                    <svg fill="#fff" height="20px" width="20px" version="1.1" id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 482.827 482.827" xml:space="preserve" stroke="#fff">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <g>
                                <g>
                                    <path
                                        d="M241.413,0C171.855,0,106.16,30.011,60.606,81.465v-81.1H40.913v119.433h119.433v-19.692H70.671 c41.954-50.628,104.403-80.413,170.743-80.413c122.26,0,221.721,99.462,221.721,221.721s-99.462,221.721-221.721,221.721 S19.692,363.673,19.692,241.413c0-18.471,2.279-36.851,6.779-54.625l-19.096-4.827C2.481,201.313,0,221.317,0,241.413 c0,133.115,108.298,241.413,241.413,241.413s241.413-108.298,241.413-241.413S374.529,0,241.413,0z">
                                    </path>
                                </g>
                            </g>
                        </g>
                    </svg>
                </div>
                <input @keyup.enter="submit" type="text" oninput="this.setCustomValidity('');
                this.reportValidity()" class="search" placeholder="enter a pokemon or an id" v-model="pokemonSearch" />

                <Species :fetchPokemonData=fetchPokemonData :clearPokemonList=clearPokemonList />
                <Types :fetchPokemonData=fetchPokemonData :clearPokemonList=clearPokemonList />
            </form>

            <Flags/>
        </div>
        <div class="dex-container">

            <div class="dex-innerContainer">

                <p v-if="!state.pokemonData.length &&  !isSearching">No pokémon found...</p>

                <Card v-for="(pokemon, index) in state.pokemonData" :key="index" :name="pokemon.name"
                    :imageUrl=pokemon.cardImageUrl :number="pokemon.id" :abilities=pokemon.abilities
                    :types=pokemon.types :stats=pokemon.stats :index="index" :pokemon=pokemon
                    :gameIndices="pokemon.gameIndices" :allSprites=pokemon.sprites
                    :class="{ 'selected-card': index === state.selectedCardIndex }" @card-click="handleCardClick" />


                <div id="loader">
                    <img src="https://media.tenor.com/Cm7KfjVqri4AAAAi/pokemon-pokeball.gif" alt="loader"
                        v-if="showPokeball">
                </div>

            </div>
        </div>

        <Transition>
            <ShowPokemonDetail :key="state.selectedPokemon.name" v-if="state.selectedPokemon"
                :abilities=state.selectedPokemon.abilities :types=state.selectedPokemon.types
                :number=state.selectedPokemon.number :stats=state.selectedPokemon.stats
                :name="state.selectedPokemon.name" :imageUrl="state.selectedPokemon.imageUrl"
                :gameIndices="state.selectedPokemon.gameIndices"
                :allSprites=state.selectedPokemon.allSprites 
                :selectedPokemon = "state.selectedPokemon" />
        </Transition>


    </div>
</template>

<style>
.content-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
}
.dex-container {
    max-height: 100%;
    overflow: hidden;
    padding-top: 5rem;
    display: flex;
    flex-direction: column;
    background-color: var(--orange-base);
    clip-path: polygon(0 0, 70% 0, 100% 100%, 0% 100%);
}
.dex-innerContainer {
    background-image: url('data:image/svg+xml, <svg class="pokeball" width="608" height="608" viewBox="0 0 608 608" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M260.875 392.013C276.039 431.968 255.942 476.652 215.987 491.816C176.032 506.981 131.348 486.884 116.184 446.928C101.019 406.973 121.116 362.289 161.072 347.125C201.027 331.961 245.711 352.058 260.875 392.013Z" fill="%231D1D1D" fill-opacity="0.2" /><path fill-rule="evenodd" clip-rule="evenodd" d="M303.852 723.322C456.926 665.225 540.603 503.968 505.778 348.724L327.816 416.267C329.136 473.629 294.653 528.173 237.953 549.693C181.254 571.212 119.265 553.283 82.1918 509.49L-95.7705 577.032C-18.8213 716.289 150.777 781.419 303.852 723.322ZM49.2426 422.675L-128.72 490.218C-163.544 334.973 -79.8677 173.716 73.2072 115.619C226.282 57.5219 395.88 122.652 472.829 261.909L294.867 329.452C257.794 285.659 195.805 267.729 139.106 289.249C82.4061 310.768 47.9232 365.312 49.2426 422.675ZM260.875 392.013C276.039 431.968 255.942 476.652 215.987 491.816C176.032 506.981 131.348 486.884 116.184 446.928C101.019 406.973 121.116 362.289 161.072 347.125C201.027 331.961 245.711 352.058 260.875 392.013Z" fill="%231D1D1D" fill-opacity="0.2" /></svg>');
    background-repeat: no-repeat;
    background-position: bottom left;
     
    overflow-y: scroll;
    background-color: var(--orange-light);
    height: 100%;
    max-width: 95%;
    clip-path: polygon(0 0, 73% 0, 100% 100%, 0% 100%);
    padding: 2rem;


    scrollbar-width: none;
        /* Firefox */
    -ms-overflow-style: none;
        /* Internet Explorer 10+ */
}
::-webkit-scrollbar {
    width: 5px;
}

/* Personaliza a cor de fundo da barra de rolagem */
::-webkit-scrollbar-track {
    background: #fff;
    border-radius: 8px;
}

/* Personaliza a cor do controle deslizante da barra de rolagem */
::-webkit-scrollbar-thumb {
    background: var(--orange-base);
    border-radius: 8px;
}

/* Personaliza a cor do controle deslizante da barra de rolagem ao passar o mouse */

.form-container {
    position: fixed;
    top: 0;
    width: 100%;
    left: 0;
    z-index: 10;
    background-color: var(--orange-base);
    display: grid;
    grid-template-columns: .5fr;
    padding: 1rem;
    justify-content: start;
    align-items: start;
    gap: 1rem;
    
    div.button {
        margin-left: 1rem;
        display: grid;
        max-width: min-content;
        place-items: center;
        background-color: transparent;
        cursor: pointer;
        border: none;
        &:hover svg {
            animation: rotate 2s cubic-bezier(0, 0, 0, 0) infinite;
        }
    }
}

form {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    grid-column: 1;
    /* grid-template-columns: .2fr repeat(3, 1fr); */
}
.form-container button {
    grid-column: 2;
}

input {
    padding: .5rem;
    font-size: .8rem;
    border-radius: 7px;
    margin-left: 1rem;
    background-color: var(--orange);
    border: 2px solid black;
    width: 100%;
    color: white;
    max-width: 300px;
    font-size: 1rem;
    transition: background-color .3s ease;
    font-family: inherit;
    &:hover {
        border: 2px solid white;
        background-color: black;
    }
}
::placeholder {
    font-size: .8rem;
    color: rgba(255, 255, 255, .8);
}


@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(-360deg);
    }

}
</style>
