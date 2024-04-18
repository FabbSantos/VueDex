<script setup>

    const props = defineProps({
        types: Array
    })
</script>

<template>
    <span class="type" v-for="type in types" :key="type"
        :class="{ 'type-grass': type === 'grass', 'type-fire': type === 'fire', 'type-water': type === 'water', 'type-normal': type === 'normal', 'type-electric': type === 'electric', 'type-ice': type === 'ice', 'type-fighting': type === 'fighting', 'type-poison': type === 'poison', 'type-ground': type === 'ground', 'type-flying': type === 'flying', 'type-psychic': type === 'psychic', 'type-bug': type === 'bug', 'type-rock': type === 'rock', 'type-ghost': type === 'ghost', 'type-dragon': type === 'dragon', 'type-dark': type === 'dark', 'type-steel': type === 'steel', 'type-fairy': type === 'fairy' }">
        {{ type }}
    </span>
</template>

<style>
    .type {
        padding: 0.4rem 1.1rem;
        border-radius: 1.5rem;
        color: white;
        border: 1px solid rgba(255, 255, 255, .3);
        font-weight: 500;
        letter-spacing: 1px;
        font-size: 0.8rem;
    }
</style>