<script setup>
import { inject, onMounted, ref } from 'vue';

const props = defineProps({
    fetchPokemonData: Function,
    clearPokemonList: Function
})

    const types = ref([]);
    let selectedSpecie = inject('selectedSpecie');
    let selectedType = inject('selectedType');
    let pokemonSearch = inject('pokemonSearch');
    const language = inject('language');

const fetchTypes = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/type');
    const data = await response.json();
    const urls = data.results.map((type) => type.url);

    // Busca os detalhes de cada tipo para verificar a correspondência da linguagem
    for (const url of urls) {
        const typeResponse = await fetch(url);
        const typeData = await typeResponse.json();
        const typeName = typeData.names.find(nameObj => nameObj.language.name === language.value)?.name;
        if (typeName) {
            types.value.push(typeName);
        }
    }

    // Se houver uma próxima página de resultados, busca os tipos da próxima página
    while (data.next) {
        const nextResponse = await fetch(data.next);
        const nextData = await nextResponse.json();
        const nextUrls = nextData.results.map((type) => type.url);
        for (const url of nextUrls) {
            const typeResponse = await fetch(url);
            const typeData = await typeResponse.json();
            const typeName = typeData.names.find(nameObj => nameObj.language.name === language.value)?.name;
            if (typeName) {
                types.value.push(typeName);
            }
        }
        data.next = nextData.next;
    }

    types.value.sort();
}

    const searchSelectedPokemon = async () => {
        if (!selectedType.value) {
            return;
        }
        const response = await fetch(`https://pokeapi.co/api/v2/type/${selectedType.value.toLowerCase()}`);
        const data = await response.json();
        const foundPokemon = data.pokemon.map((p) => p.pokemon.url);
        props.clearPokemonList();
        selectedSpecie.value ='';
        pokemonSearch.value ='';
        foundPokemon.forEach(url => {
            props.fetchPokemonData(() =>{} , () =>{}, url);
        });
    }

    onMounted( async () => {
        await fetchTypes();
    });
    
</script>

<template>
    <input list="types" name="types" v-on:change="searchSelectedPokemon" v-model="selectedType"
        :placeholder="$t('message.placeholderTypes')">

    <datalist id="types">
        <option v-for="type in types" :value="type" :key="type" />
    </datalist>

</template>