<script setup>
const props = defineProps({
    allSprites: Array
})

</script>

<template>

    <div class="sprites">
        <p>Sprites:</p>
        <div class="sprite-container">
            <div v-for="sprite in allSprites" :key="sprite.name" class="sprite">
                <img :src="sprite" :alt="sprite.name" />
                <p>{{ sprite.name }}</p>
            </div>
        </div>
    </div>
</template> 

<style>
.sprites {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    max-width: 100%;
    p {
        font-size: 1.17em   ;
        font-weight: 700;
    }
}
.sprite-container {
    max-width: 100%;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    gap: 1rem;
}

.sprite-container::-webkit-scrollbar {
    border-radius: 8px;
    max-height: 8px;
    /* Largura da barra de rolagem */
}

.sprite-container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 8px;
    /* Cor de fundo da barra de rolagem */
}

.sprite-container::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: var(--orange-light);
    /* Cor da alça da barra de rolagem */
}

.sprite-container::-webkit-scrollbar-thumb:hover {
    background: var(--orange-base);
    /* Cor da alça da barra de rolagem ao passar o mouse */
}
</style>