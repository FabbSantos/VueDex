<script setup>
    const props = defineProps ({
        moves: Array
    })
import Move from './Move.vue';


</script>


<template>
    <div class="moves-container">
        <h3>Movepool</h3>
        <ul>
            <li v-for="url in moves">
                <Move :url="url"/>
            </li>
        </ul>
    </div>

</template>

<style scoped>
.moves-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: start;
    align-items: start;
}

h3 {
    font-size: 1.17em;
    font-weight: 500;
    text-align: center;
    margin-top: 1rem;
}
ul {
    list-style-type: none;
    padding: 0;
    font-style: italic;
    overflow-y: auto;
    max-height: 15vh;
    direction: rtl;
}
</style>
