<script setup>
import { inject, onMounted, ref } from 'vue';

const language = inject('language');
const fallbackLanguage = inject('fallbackLanguage');

const props = defineProps({
    url: String
})
let move =ref([]);

const fetchMoves = async () => {
    try {
        await fetch(props.url)
            .then(response => response.json())
            .then(data => {
                const dataName = data.names.filter((name) => name.language.name === language.value)
                                .concat(data.names.filter((name) => name.language.name === fallbackLanguage));
                move.value = dataName[0].name;
            });
    } catch (error) {
        console.error('Erro ao buscar movimentos:', error);
    }
}

onMounted(() => {
    fetchMoves();
})

</script>

<template>
    {{ move  }}
</template>