<script setup> 
import { defineProps, inject, ref, onMounted } from 'vue'
    const props = defineProps({
        abilities: Array
    })
    let abilitiesTranslated = ref([]);
    const language = inject('language');
    const fallbackLanguage = inject('fallbackLanguage');


    const fetchAbilities = async () => {
        props.abilities.forEach(a => {
            fetch(a.ability)
                .then(response => response.json())
                .then(data => {
                    const dataName = data.names.filter((name) => name.language.name === language.value)
                        .concat(data.names.filter((name) => name.language.name === fallbackLanguage));
                    abilitiesTranslated.value.push({
                        name: dataName[0].name,
                        isHidden: a.is_hidden
                    })
            });
        });
    }

onMounted(() => {
    fetchAbilities();
})
</script>

<template>
    <div class="abilities">
        <span>{{ $t('message.Abilities') }}:</span>
        <div class="ab-names">
            <p v-for="(ability, index) in abilitiesTranslated" :key="index"
                :class="{ 'hiddenAbility': ability.isHidden }">
                {{index > 0 ? '' : '' }} {{ ability.name }}
            </p>
        </div>
    </div>
</template>

<style>
    .abilities {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        margin-block: .8rem;
        justify-content: start;
        align-items: center;
    }

    .abilities span {
        font-weight: 500;
        font-size: 1.17em;
    }
    .hiddenAbility {
        position: relative;
    }
    .ab-names {
        display: flex;
        flex-direction: column;
        gap: .6rem;
        justify-content: center;
        align-items: start;
        p {
            text-align: left;
            font-size: .9rem;
            margin-left: 10px;
            font-weight: 500;
            text-transform: capitalize;
        }
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
</style>