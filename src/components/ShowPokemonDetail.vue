<script setup>
import PokemonType from './PokemonType.vue';
import PokemonAbilities from './PokemonAbilities.vue';
import PokemonSprites from './PokemonSprites.vue';
import PokemonStats from './PokemonStats.vue';
import Learnset from './Learnset.vue';
import PokemonName from './PokemonName.vue';
import { ref } from 'vue';
import GameIndices from './GameIndices.vue';
import EvolutionChain from './EvolutionChain.vue';

    const props = defineProps({
        name: String,
        imageUrl: String,
        number: Number,
        abilities: Array,
        types: Array,
        stats: Array,
        allSprites: Array,
        gameIndices: Array,
        selectedPokemon: Object
    })

const pTypes = ref([]);

const setTypes = (t1) => {
    pTypes.value.push(t1);
}

</script>

<template>
    <div class="card-details">

        <div class="pokemon-info">
            <div :class="['detailed-info', pTypes.length===1  ? `type-${pTypes[0]}` : '']"
            :style="pTypes.length > 1 ? `background: linear-gradient(60deg, var(--${pTypes[0]}), var(--${pTypes[1]})` : ''"
            >
                <div class="deximg">
                    <img :src="imageUrl" :alt="name" height="120">
                    <PokemonName :pokemonName="selectedPokemon.name"/>
                    <p class="dex"> #{{ number }}</p>
                </div>
            
                <div class="overflow">
                    <div class="types">
                        <span>{{$t('message.Type')}}:</span>
                        <PokemonType :types="types" :setTypes="setTypes"/>
                    </div>
                    <PokemonAbilities :abilities="abilities" />
                    <PokemonSprites :allSprites="allSprites"/>
                    <EvolutionChain :name="name"/>
                    <div class="gameInfo">
                        <Learnset :moves="selectedPokemon.pokemon.moves"/>
                        <GameIndices :gameIndices="selectedPokemon.pokemon.gameIndices"/>
                    </div>
                    <PokemonStats :stats="stats" :types="pTypes"/>
                </div>
            </div>
        </div>
    </div>


</template>

<style>
    .card-details {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 2rem;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    .gameInfo {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        gap: 1rem;
    }
    .dex, .name {
        font-weight: 400;
        text-align: center;
        font-style: italic;
        font-size: clamp(1.5rem, 2vw, 2rem);
    }
    .deximg {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        border-bottom: 1px solid;

        p{
            margin-inline: 10px;
        }
    }
    .overflow {
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding-inline: 1rem;
    }
    .pokemon-info {
        display: flex;
        flex-direction: row;
        gap: 1.2rem;
        max-height: 100vh;
        justify-content: center;
        align-items: center;
        
        .detailed-info {
            display: flex;
            flex-direction: column;
            max-width: 40vw;
            max-height: 100%;
            overflow-y: hidden;
            gap: 1rem;
            padding: 3rem 1.5rem 3rem 1.5rem;
            border-radius: 9px;
            justify-content: start;
            /* align-items: ; */
            span {
                font-weight: 700;
            }
        }
    }
    .types {
        display: flex;
        gap: 1rem;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        span {
            font-weight: 700;
            font-size: 1.17em;
        }
    }
    
    img {
        max-width: 120px;
        max-height: 120px;
        object-fit: contain;
    }
    .carousel {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .carousel-image {
        max-width: 100%;
        max-height: 200px;
        /* Ajuste conforme necessário */
    }

    .carousel-button {
        background-color: #f3f3f3;
        border: 1px solid #ccc;
        padding: 5px 10px;
        cursor: pointer;
        margin: 0 10px;
    }
</style>