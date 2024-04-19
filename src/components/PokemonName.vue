<script setup>
import { inject, ref, onMounted } from 'vue';


const props = defineProps({
    pokemonName: String
})
const language = inject('language');
let name = ref('');

const fetchPokemonName = async () => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${props.pokemonName}`);
        const data = await response.json();
        const pokemonName = data.names.filter((name) => name.language.name === language.value);
        name.value = pokemonName[0].name;
    }
    catch (error) {
        console.error(error);
    }
}

onMounted(() => {
    fetchPokemonName();
})
</script>

<template>
    <h2>{{ name }}</h2>
</template>