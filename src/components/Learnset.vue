<script setup>
    const props = defineProps ({
        moves: Array
    })
import Move from './Move.vue';


</script>


<template>
    <h3>Movepool</h3>
    <ul>
        <li v-for="url in moves">
            <Move :url="url"/>
        </li>
    </ul>

</template>

<style>
h3 {
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    margin-top: 1rem;
}
ul {
    list-style-type: none;
    padding: 0;
    font-style: italic;
    overflow-y: auto;
    max-height: 15vh;
}
</style>
