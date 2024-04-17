<script setup>
import { onMounted, ref } from 'vue';

    const species = ref([]);
    let selectedSpecie = ref('');

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

    onMounted( async () => {
        await fetchSpecies();
    });
    
</script>

<template>
    <input list="species" v-model="selectedSpecie" placeholder="enter a specie of a pokémon">

    <datalist id="species">
        <option v-for="specie in species" :value="specie" :key="specie"/>
    </datalist>

</template>