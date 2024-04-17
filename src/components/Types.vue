<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
    fetchPokemonData: Function,
    clearPokemonList: Function
})

    const types = ref([]);
    let selectedType = ref('');

    const fetchTypes = async () => {
        const response = await fetch('https://pokeapi.co/api/v2/type');
        const data = await response.json();
        
        types.value.push(...data.results.map((types) => types.name));

        while (data.next) {
            const nextResponse = await fetch(data.next);
            const nextData = await nextResponse.json();
            types.value.push(...nextData.results.map((types) => types.name));
            data.next = nextData.next;
        }
    }

    const searchSelectedPokemon = async () => {
        if (!selectedType.value) {
            return;
        }
        const response = await fetch(`https://pokeapi.co/api/v2/type/${selectedType.value}`);
        const data = await response.json();
        const foundPokemon = data.pokemon.map((p) => p.pokemon.url);
        props.clearPokemonList();
        foundPokemon.forEach(url => {
            props.fetchPokemonData(() =>{} , () =>{}, url);
        });
    }

    onMounted( async () => {
        await fetchTypes();
    });
    
</script>

<template>
    <input list="types" v-on:change="searchSelectedPokemon" v-model="selectedType"
        placeholder="enter a type of a pokémon">

    <datalist id="types">
        <option v-for="type in types" :value="type" :key="type" />
    </datalist>

</template>