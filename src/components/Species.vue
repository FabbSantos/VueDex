<script setup>
import { inject, onMounted, ref } from 'vue';

const props = defineProps({
    fetchPokemonData: Function,
    clearPokemonList: Function
})

    const species = ref([]);
    let selectedSpecie = inject('selectedSpecie');
    let selectedType = inject('selectedType');
    let pokemonSearch = inject('pokemonSearch');

    const fetchSpecies = async () => {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon-species');
        const data = await response.json();
        
        species.value.push(...data.results.map((species) => species.name));

        while (data.next) {
            const nextResponse = await fetch(data.next);
            const nextData = await nextResponse.json();
            species.value.push(...nextData.results.map((species) => species.name));
            data.next = nextData.next;
        }
    }

    const searchSelectedPokemon = async () => {
        if (!selectedSpecie.value) {
            return;
        }
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${selectedSpecie.value}`);
        const data = await response.json();
        const foundPokemon = data.varieties.map((variety) => variety.pokemon.url);
        props.clearPokemonList();
        selectedType.value ='';
        pokemonSearch.value ='';
        foundPokemon.forEach(url => {
            props.fetchPokemonData(() =>{} , () =>{}, url);
        });
    }

    onMounted( async () => {
        await fetchSpecies();
    });
    
</script>

<template>
    <input list="species" v-on:change="searchSelectedPokemon" v-model="selectedSpecie"
        placeholder="enter a specie of a pokémon">

    <datalist id="species">
        <option v-for="specie in species" :value="specie" :key="specie" />
    </datalist>

</template>