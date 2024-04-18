<script setup>
    const props = defineProps({
        stats: Array,
        types: Array
    })
</script>

<template>

    <div class="stats">
        <div v-for="stat in stats" key="stat" class="stat">
            {{ stat.name }}
            <div class="progress-bar">
                <div class="progress" :class="`type-${types[0]}`" :style="{ width: `${stat.base_stat / 255 * 100}%` }"
                </div>
            </div>
            <span class="total_per_stat">
                {{ stat.base_stat }}
            </span>
        </div>
    </div>

</template>