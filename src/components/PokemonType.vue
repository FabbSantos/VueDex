<script setup>
import { ref, onMounted, inject } from 'vue'
    const props = defineProps({
        types: Array,
        setTypes: Function
    })

    const language = inject('language');
    const fallbackLanguage = inject('fallbackLanguage');

    let names = ref([]);
    let typesTranslated = ref([]);
    let englishName = ref([]);



    const fetchTypes = async () => {
        props.types.forEach(t => {
            fetch(t)
                .then(response => response.json())
                .then(data => {
                    const englishNameData = data.names.filter((name) => name.language.name === 'en');
                    englishName.value = englishNameData[0].name.toLowerCase();
                    props.setTypes(englishName.value);
                    const dataName = data.names.filter((name) => name.language.name === language.value)
                                                        .concat(data.names.filter((name) => name.language.name === fallbackLanguage));

                    typesTranslated.value.push(dataName[0].name.toLowerCase());

                    names.value.push({
                        name: typesTranslated.value,
                        english: englishName.value
                    })
                });
        });
    }

    onMounted(() => {
        fetchTypes();
    })
</script>

<template>
    <div class="types">
        <div class="type" v-for="(name, index) in names" :key="index"
            :class="['type', `type-${names[index].english}`]">
            {{ name.name[index] }}
        </div>
    </div>
</template>

<style>
    .type {
        padding: 0.4rem 1.1rem;
        border-radius: 1.5rem;
        color: white;
        border: 1px solid rgba(255, 255, 255, .3);
        font-weight: 500;
        letter-spacing: 1px;
        font-size: 0.8rem;
    }
</style>