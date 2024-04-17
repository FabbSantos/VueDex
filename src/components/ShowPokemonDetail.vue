<script setup>
import { ref, computed } from 'vue';
import PokemonType from './PokemonType.vue';

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
            <div class="carousel">
                <!-- <button @click="prevImage" class="carousel-button prev">Anterior</button> -->
                <img :src="imageUrl" :alt="name" height="120" class="carousel-image">
                <!-- <button @click=" nextImage" class="carousel-button next">Próximo</button> -->
            </div>

            <div class="detailed-info">
                <span>Type:</span>
                <div class="types">
                    <PokemonType :types="types" />
                </div>
                <div class="abilities">
                    <span>Abilities:</span>
                    <p v-for="ability in abilities" :key="ability.name" :class=" {'hiddenAbility' : ability.isHidden} ">
                        {{
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
        content: url("data: image/svg+xml,%3Csvg width='24px' height='24px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' %3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0' %3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round' %3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier' %3E%3Cpath d='M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z' stroke='%23000000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' %3E%3C/path%3E%3Cpath d='M21 12C19.1114 14.991 15.7183 18 12 18C8.2817 18 4.88856 14.991 3 12C5.29855 9.15825 7.99163 6 12 6C16.0084 6 18.7015 9.1582 21 12Z' stroke='%23000000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' %3E%3C/path%3E%3C/g%3E%3C/svg%3E");
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