<script setup>
    const props = defineProps({
        stats: Array,
        types: Array
    })
    import { ref, onMounted, inject} from 'vue';

    const language = inject('language');
    const fallbackLanguage = inject('fallbackLanguage');
    const statsTranslated = ref([]);

    const fetchStats = async () => {
        props.stats.forEach(s => {
            fetch(s.url)
                .then(response => response.json())
                .then(data => {
                    const dataName = data.names.filter((name) => name.language.name === language.value)
                                    .concat(data.names.filter((name) => name.language.name === fallbackLanguage));
                    statsTranslated.value.push({
                        name: dataName[0].name,
                        base_stat: s.base_stat
                    })
                });
        });
    }

    onMounted(() => {
        fetchStats();
    })
</script>

<template>
    <div class="stats">
        <h3>Base Stats</h3>
        <div v-for="(stat, index) in statsTranslated" :key="index" class="stat">
            {{ stat.name }}
            <div class="progress-bar">
                <div class="progress" :class="`type-${types[0]}`"
                    :style="{ width: `${stat.base_stat / 255 * 100}%` }">
                </div>
            </div>
            <span class="total_per_stat">
                {{ stat.base_stat }}
            </span>
        </div>
    </div>
</template>

<style>
.stats {
    display: grid;
    grid-template-rows: repeat(6, .6fr);
    justify-content: start;
    margin-top: 1rem;
    align-items: start;
    h3 {
        margin-bottom: 1rem;
    }
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
</style>