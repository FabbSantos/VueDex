<script setup>
import { inject, ref, onMounted } from 'vue';

const props = defineProps({
    pokemonName: String
})
const language = inject('language');
const fallbackLanguage = inject('fallbackLanguage');

let name = ref('');

const fetchPokemonName = async () => {
    try {
        // Primeira tentativa: buscar a espécie do Pokémon
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${props.pokemonName.toLowerCase()}`);
        const data = await response.json();
        const pokemonName = data.names.find(name => name.language.name === language.value) || data.names.find(name => name.language.name === fallbackLanguage);
        if (pokemonName) {
            name.value = pokemonName.name;
        }
    } catch (error) {
        // Se a primeira tentativa falhar, tente buscar o formato do Pokémon
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${props.pokemonName.toLowerCase()}`);
            const data = await response.json();
            const formUrl = data.forms[0].url; // Obter a URL do formato do Pokémon
            const formResponse = await fetch(formUrl);
            const formData = await formResponse.json();

            // Aqui, vamos garantir que estamos buscando o nome corretamente com base na linguagem desejada e na linguagem de fallback
            const pokemonName = formData.form_names.find(name => name.language.name === language.value) || formData.form_names.find(name => name.language.name === fallbackLanguage);
            if (pokemonName) {
                name.value = pokemonName.name;
            }
        } catch (error) {
            console.error(error);
        }
    }
}

onMounted(() => {
    fetchPokemonName();
})
</script>

<template>
    <h2>{{ name }}</h2>
</template>