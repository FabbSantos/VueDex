<script setup>
import { onMounted, reactive, ref } from 'vue';
import FunctionQueue from '../utils/FunctionQueue';

import Card from './Card.vue';
import ShowPokemonDetail from './ShowPokemonDetail.vue';

let functionQueue = new FunctionQueue();
let offset = -8;
let pokemonSearch = '';

const loadPokemonData = async (resolve, reject) => {
    lastFunction.value = loadPokemonData;
    fetchPokemonData(resolve, reject, `https://pokeapi.co/api/v2/pokemon`);
}

let lastFunction = ref(loadPokemonData);

const state = reactive({
    pokemonData: [],
    selectedPokemon: null,
    selectedCardIndex: null,
});

const handleCardClick = (pokemon, index) => {
    state.selectedPokemon = pokemon;
    state.selectedCardIndex = index; 
};

const fetchPokemonData = async (resolve, reject, url) => {
    try {
        offset += 8;
        const response = await fetch(`${url}?limit=8&offset=${offset}`);

        if (!response.ok) {
            lastFunction.value = null;
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


            types.push(...pokemonUrlData.types.map(t => t.type.name))

            abilities.push(...pokemonUrlData.abilities.map(a => ({
                name: a.ability.name,
                isHidden: a.is_hidden
            })))

            stats.push(...pokemonUrlData.stats.map(s => ({
                name: s.stat.name,
                base_stat: s.base_stat
            })));

            let generationVImage = pokemonUrlData.sprites.versions['generation-v'] && pokemonUrlData.sprites.versions['generation-v']['black-white'] && pokemonUrlData.sprites.versions['generation-v']['black-white'].animated && pokemonUrlData.sprites.versions['generation-v']['black-white'].animated.front_default;
            let showdownImage = pokemonUrlData.sprites.other.showdown.front_default;
            let officialArtwork = pokemonUrlData.sprites.other['official-artwork'].front_default;

            let cardImageUrl = generationVImage ? generationVImage : (showdownImage ? showdownImage : officialArtwork);

            state.pokemonData.push({
                name: data.results[i].name,
                url: data.results[i].url,
                cardImageUrl: cardImageUrl,
                abilities: abilities,
                types: types,
                stats: stats
            });
        }
        if (length < 8) lastFunction.value = null;

        resolve();

    } catch (error) {
        console.error(error);
        reject(error);
    };

}


onMounted(() => {  
    const target = document.querySelector('#loader');

    // Create an intersection observer instance
    const observer = new IntersectionObserver(function (entries, observer) {
        // Loop over the entries
        entries.forEach(entry => {
            // Check if the target is visible
            if (entry.isIntersecting) {
                // Run your code for when the div becomes visible
                if (lastFunction.value) {
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

async function searchPokemonData(resolve, reject) {
    offset = -8;

    fetchPokemonData(resolve, reject, `https://pokeapi.co/api/v2/pokemon/${pokemonSearch}`);
}

async function submit() {
    state.pokemonData = [];
    if (lastFunction || state.pokemonData.length) {
        await searchPokemonData();
        return
    }
    lastFunction.value = searchPokemonData;
}

</script>

<template>
    <div class="content-container">

        <div class="dex-container">

            <form action="" @submit.prevent="submit">
                <input type="text" placeholder="enter a pokemon or an id" v-model="pokemonSearch">
            </form>
            {{ pokemonSearch }}

            <div class="dex-innerContainer">

                <p v-if="!state.pokemonData.length">No pokémon found...</p>

                <Card v-for="(pokemon, index) in state.pokemonData" :key="index" :name="pokemon.name"
                    :imageUrl=pokemon.cardImageUrl :number="index + 1" :abilities=pokemon.abilities :types=pokemon.types
                    :stats=pokemon.stats :index="index" :class="{ 'selected-card': index === state.selectedCardIndex }"
                    @card-click="handleCardClick" />



                <div id="loader">
                    <img src="https://media.tenor.com/Cm7KfjVqri4AAAAi/pokemon-pokeball.gif" alt="loader" v-if="lastFunction || state.pokemonData.length">
                </div>


            </div>
        </div>

        <Transition>
            <ShowPokemonDetail :key="state.selectedPokemon.name" v-if="state.selectedPokemon"
                :abilities=state.selectedPokemon.abilities :types=state.selectedPokemon.types
                :stats=state.selectedPokemon.stats :name="state.selectedPokemon.name"
                :imageUrl="state.selectedPokemon.imageUrl" />
        </Transition>

    </div>
</template>

<style>
.content-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100vh;
    width: 100vw;
}
.dex-container {
    height: 100%;
    width: 100%;
    max-height: 100vh;
    background-color: var(--orange-base);
    max-width: 100%;
    clip-path: polygon(0 0, 62% 0, 98% 100%, 0% 100%);
}
.dex-innerContainer {
    background-image: url('data:image/svg+xml, <svg class="pokeball" width="608" height="608" viewBox="0 0 608 608" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M260.875 392.013C276.039 431.968 255.942 476.652 215.987 491.816C176.032 506.981 131.348 486.884 116.184 446.928C101.019 406.973 121.116 362.289 161.072 347.125C201.027 331.961 245.711 352.058 260.875 392.013Z" fill="%231D1D1D" fill-opacity="0.2" /><path fill-rule="evenodd" clip-rule="evenodd" d="M303.852 723.322C456.926 665.225 540.603 503.968 505.778 348.724L327.816 416.267C329.136 473.629 294.653 528.173 237.953 549.693C181.254 571.212 119.265 553.283 82.1918 509.49L-95.7705 577.032C-18.8213 716.289 150.777 781.419 303.852 723.322ZM49.2426 422.675L-128.72 490.218C-163.544 334.973 -79.8677 173.716 73.2072 115.619C226.282 57.5219 395.88 122.652 472.829 261.909L294.867 329.452C257.794 285.659 195.805 267.729 139.106 289.249C82.4061 310.768 47.9232 365.312 49.2426 422.675ZM260.875 392.013C276.039 431.968 255.942 476.652 215.987 491.816C176.032 506.981 131.348 486.884 116.184 446.928C101.019 406.973 121.116 362.289 161.072 347.125C201.027 331.961 245.711 352.058 260.875 392.013Z" fill="%231D1D1D" fill-opacity="0.2" /></svg>');
    background-repeat: no-repeat;
    background-position: bottom left;
     
    width: 100%;
    overflow-y: scroll;
    background-color: var(--orange-light);
    height: 100%;
    max-width: 90%;
    clip-path: polygon(0 0, 62% 0, 100% 100%, 0% 100%);
    padding: 3rem;


    scrollbar-width: none;
        /* Firefox */
    -ms-overflow-style: none;
        /* Internet Explorer 10+ */
}
    .dex-innerContainer::-webkit-scrollbar {
        display: none;
        /* Chrome, Safari, e Opera */
    }

</style>
