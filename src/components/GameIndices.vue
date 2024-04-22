<script setup>
    const props = defineProps ({
        gameIndices: Array
    })
import Game from './Game.vue';


</script>


<template>

    <div class="games-container">
        <h3> {{ $t('message.Games') }} </h3>
        <ul>
            <li v-for="url in gameIndices">
                <Game :url="url" />
            </li>
            <p v-if="gameIndices.length==0">{{ $t('message.noGame') }}</p>
        </ul>
    </div>

</template>

<style scoped>
h3 {
    font-size: 1.17em;
    font-weight: 500;
    text-align: center;
    margin-top: 1rem;
}
.games-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: end;
    align-items: end;

}
ul {
    list-style-type: none;
    padding-right: 1rem;
    font-style: italic;
    overflow-y: auto;
    max-height: 15vh;
} 
li {
    text-align: left;
}

@media (min-width: 1024px) {
    ul {
        max-width: 10vw;
    }
}
</style>
