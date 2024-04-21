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
    const language = inject('language');


    const fetchSpecies = async () => {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon-species');
        const data = await response.json();
        const urls = data.results.map((species) => species.url);

        // Busca os detalhes de cada espécie para verificar a correspondência da linguagem
        for (const url of urls) {
            const speciesResponse = await fetch(url);
            const speciesData = await speciesResponse.json();
            const speciesName = speciesData.names.find(nameObj => nameObj.language.name === language.value)?.name;
            if (speciesName) {
                species.value.push(speciesName);
            }
        }

        // Se houver uma próxima página de resultados, busca as espécies da próxima página
        while (data.next) {
            const nextResponse = await fetch(data.next);
            const nextData = await nextResponse.json();
            const nextUrls = nextData.results.map((species) => species.url);
            for (const url of nextUrls) {
                const speciesResponse = await fetch(url);
                const speciesData = await speciesResponse.json();
                const speciesName = speciesData.names.find(nameObj => nameObj.language.name === language.value)?.name;
                if (speciesName) {
                    species.value.push(speciesName);
                }
            }
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
    <input list="species" name="species" v-on:change="searchSelectedPokemon" v-model="selectedSpecie"
        :placeholder="$t('message.placeholderSpecies')">

    <datalist id="species">
        <option v-for="specie in species" :value="specie" :key="specie" />
    </datalist>

</template>