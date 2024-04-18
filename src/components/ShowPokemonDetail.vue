<script setup>
import { ref, computed } from 'vue';
import PokemonType from './PokemonType.vue';
import PokemonAbilities from './PokemonAbilities.vue';
import PokemonSprites from './PokemonSprites.vue';
import PokemonStats from './PokemonStats.vue';

    const props = defineProps({
        name: String,
        imageUrl: String,
        number: Number,
        abilities: Array,
        types: Array,
        stats: Array,
        allSprites: Array
    })

</script>

<template>
    <div class="card-details">

        <div class="pokemon-info">
            <img :src="imageUrl" :alt="name" height="120" class="carousel-image">
            
            <div :class="['detailed-info', types.length===1  ? `type-${types[0]}` : '']"
                :style="types.length > 1 ? `background: linear-gradient(60deg, var(--${types[0]}), var(--${types[1]})` : ''"
            >

                <p class="dex"> #{{ number }}</p>
                <div class="types">
                    <span>Type:</span>
                    <PokemonType :types="types" />
                </div>
                <PokemonAbilities :abilities="abilities" />

                <PokemonSprites :allSprites="allSprites"/>
                <PokemonStats :stats="stats" :types="types"/>
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
    .dex {
        font-weight: 600;
        border-bottom: 1px solid;
        width: 100%;
        text-align: center;
        font-style: italic;
        font-size: clamp(1.5rem, 2vw, 2rem);
    }
    .pokemon-info {
        display: flex;
        flex-direction: row;
        gap: 1.2rem;
        justify-content: center;
        align-items: center;
        
        .detailed-info {
            display: flex;
            flex-direction: column;
            max-width: 30vw;
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
        }
    }
    .stats {
        display: grid;
        grid-template-rows: repeat(6, 1fr);
        gap: 1rem;
        justify-content: start;
        align-items: start;
    }
    .stat {
        display: grid;
        grid-template-columns: 1fr 2fr .5fr;
        gap: 1rem;
        align-items: center;
        text-transform: uppercase;
        font-weight: 700;
        text-align: right;
        font-size: 0.8rem;
    }
    
    .progress-bar {
        width: 100%;
        background-color: #f3f3f3;
        border-radius: 8px;
        border: 1px solid black;
    }
    
    .progress {
        height: 20px;
        border-radius: 8px;
        width: 0;
        transition: width 0.5s ease-in-out;
    }

    .total_per_stat {
        text-align: left;
        font-weight: 700;
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