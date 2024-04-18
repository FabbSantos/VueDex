<script setup>
const props = defineProps({
    allSprites: Array
})

</script>

<template>

    <div class="sprites">
        <p>Sprites</p>
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
    justify-content: center;
    align-items: center;
    max-width: 100%;
    p {
        font-weight: 700;
    }
}
.sprite-container {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    gap: 1rem;
}
</style>