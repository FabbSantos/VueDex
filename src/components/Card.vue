<script setup>

    const props = defineProps ({
        name: String,
        imageUrl: String,
        number: Number,
        abilities: Array,
        types: Array,
        index: Number, 
        stats: Array,
        allSprites: Array
    })
    const emit = defineEmits(['card-click']);
    const emitCardClick = () => {
        emit('card-click', props, props.index);
    };
</script>

<template>
    <div class="card-wrapper" @click="emitCardClick">
        <div class="card">
            <img :src="imageUrl" alt="Pokemon" height="50">
            <span>#{{number}}</span>
            <h2>{{name}}</h2>
        </div>
    </div>
</template>

<style>
    .card-wrapper {
        margin-bottom: .8rem;
        max-width: 60%;
        filter: drop-shadow(-1px 3px 2px rgba(50, 50, 0, 0.5));
        transition: all .3s ease-in-out;

        &:hover {
            transform: translateX(50px);
            filter:
                drop-shadow(-2px 2px 0px white) drop-shadow(1px -1px 0px white) drop-shadow(1px 0px 0px white);
                ;
            cursor: url('../assets/pokeball_cursor.svg'), pointer;          
        }

        &:hover .card {
            background-color: var(--orange-light);
        }
    }

    .card {
        background-color: var(--orange-base);

        position: relative;
        width: 100%;
        padding-block: .5rem;
        padding-inline: 1rem;
        display: grid;
        grid-template-columns: .4fr .3fr 1fr;
        justify-content: start;
        align-items: center;
        z-index: 9;
        gap: 1rem;
        color: white;
        transition: all .3s ease-in-out;
        clip-path: polygon(0% 7.317%, 0% 7.317%, 0.017% 6.13%, 0.067% 5.004%, 0.148% 3.954%, 0.255% 2.996%, 0.387% 2.143%, 0.541% 1.412%, 0.714% 0.817%, 0.904% 0.373%, 1.107% 0.096%, 1.322% 0%, 85.27% 0%, 85.27% 0%, 85.385% 0.027%, 85.497% 0.108%, 85.608% 0.242%, 85.715% 0.426%, 85.819% 0.66%, 85.919% 0.942%, 86.015% 1.27%, 86.105% 1.644%, 86.19% 2.061%, 86.269% 2.52%, 99.534% 87.124%, 99.534% 87.124%, 99.717% 88.614%, 99.824% 90.202%, 99.86% 91.829%, 99.83% 93.434%, 99.738% 94.957%, 99.59% 96.338%, 99.391% 97.516%, 99.146% 98.432%, 98.859% 99.026%, 98.536% 99.237%, 1.322% 99.237%, 1.322% 99.237%, 1.107% 99.142%, 0.904% 98.864%, 0.714% 98.421%, 0.541% 97.826%, 0.387% 97.094%, 0.255% 96.242%, 0.148% 95.283%, 0.067% 94.233%, 0.017% 93.107%, 0% 91.92%, 0% 7.317%);

        img {
            max-width: 100px;
            object-fit: contain;
        }
        h2 {
            text-transform: capitalize;
            font-weight: 500;
            font-size: 1.2rem;
        }
        span {
            font-weight: 500;
        }
    }
    .selected-card {
        transform: translateX(50px);
        filter:
            drop-shadow(-2px 2px 0px white) drop-shadow(1px -1px 0px white) drop-shadow(1px 0px 0px white);
        ;
    }
    .selected-card .card {
        background-color: var(--black);
    }
</style>