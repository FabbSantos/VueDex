<script setup>
import PokemonType from './PokemonType.vue';

    const props = defineProps({
        name: String,
        imageUrl: String,
        number: Number,
        abilities: Array,
        types: Array,
        stats: Array
    })
</script>

<template>
    <div class="card-details">

        <div class="pokemon-info">
            <img :src="imageUrl" :alt="name" height="120">

            <div class="detailed-info">
                <span>Type:</span>
                <div class="types">
                    <PokemonType :types="types" />
                </div>
                <div class="abilities">
                    <span>Abilities:</span>
                    <p v-for="ability in abilities" :key="ability.name" :class=" {'hiddenAbility' : ability.isHidden} "> {{
                        ability.name }}</p>
                </div>
            </div>
        </div>


        <div>
            <div class="stats">
                <div v-for="stat in stats" key="stat" class="stat">
                    {{ stat.name }}
                    <div class="progress-bar">
                        <div class="progress" :class="`type-${types[0]}`"
                            :style="{ width: `${stat.base_stat / 255 * 100}%` }" </div>
                        </div>
                        <span class="total_per_stat">
                            {{ stat.base_stat }}
                        </span>
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
    .hiddenAbility {
        position: relative;
    }
    .hiddenAbility::after {
        content: 'Hidden';
        font-size: .7rem;
        position: absolute;
        top: 0%;
        margin-left: 5%;
        text-transform: lowercase;
        font-weight: 300;
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
            gap: 1rem;
            padding: 1rem;
            border-radius: 9px;
            justify-content: start;
            align-items: start;
            background-color: aquamarine;
        
        }
    }
    .types {
        display: flex;
        gap: 1rem;
        flex-direction: row;
        justify-content: start;
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
    .abilities {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        justify-content: start;
        align-items: start; 
    }
    .abilities span {
        font-weight: 700;
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
</style>