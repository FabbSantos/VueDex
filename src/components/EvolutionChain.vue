<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
    name: String
});

let evolutionChain = ref([]);
let evolutionDetails = ref([]);
let evolutionStatus = ref(''); // Nova propriedade para armazenar o status da evolução
let isAlternativeForm = ref(''); // Nova propriedade para armazenar se o Pokémon é uma forma alternativa

const fetchEvolutionChain = async () => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${props.name}`);
        const data = await response.json();
        const evolutionChainUrl = data.evolution_chain.url;

        const response2 = await fetch(evolutionChainUrl);
        const data2 = await response2.json();
        evolutionChain.value = data2.chain;

        // Verificar se o Pokémon tem evolução
        if (evolutionChain.value.evolves_to.length === 0) {
            evolutionStatus.value = 'Este Pokémon não tem evolução.';
        }
    } catch (error) {
        // Se a busca pela espécie falhar, tentar buscar os dados do Pokémon diretamente
        try {
            const responsePokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${props.name}`);
            const dataPokemon = await responsePokemon.json();
            // Se a busca for bem-sucedida, o Pokémon faz parte de uma espécie e é considerado uma forma alternativa
            isAlternativeForm.value = true;
            evolutionStatus.value = 'Este Pokémon é uma forma alternativa.';
            
        } catch (error) {
            console.error('Erro ao buscar os dados do Pokémon:', error);
        }
    }
    await collectEvolutionDetails(evolutionChain.value);
};

const collectEvolutionDetails = async (chain) => {
    // Faz uma solicitação para obter os detalhes da espécie atual
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${chain.species.name}`);
    const data = await response.json();

    // Extrai o sprite e os métodos de evolução
    const sprite = data.sprites.front_default;
    const evolutionMethods = chain.evolution_details.map(detail => detail.trigger.name).join(', ');

    // Adiciona os detalhes à lista
    evolutionDetails.value.push({ sprite, evolutionMethods });

    // Se houver evoluções subsequentes, chama a função recursiva para coletar os detalhes das espécies
    if (chain.evolves_to.length > 0) {
        for (const evolution of chain.evolves_to) {
            await collectEvolutionDetails(evolution);
        }
    }
};

onMounted(() => {
    fetchEvolutionChain();
});
</script>

<template>
    <h3>{{ $t('message.Evo') }}</h3>
    <p v-if="evolutionStatus">{{ $t('message.notEvo') }}</p>

    <ul v-else>
        <li v-for="(detail, index) in evolutionDetails" :key="index">
            <svg v-if="detail.evolutionMethods === 'level-up' " width="25px" height="25px" viewBox="0 0 32 32"
                version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <title>arrow-up-circle</title>
                    <desc>Created with Sketch Beta.</desc>
                    <defs> </defs>
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-360.000000, -1087.000000)"
                            fill="#000000">
                            <path
                                d="M376,1117 C368.268,1117 362,1110.73 362,1103 C362,1095.27 368.268,1089 376,1089 C383.732,1089 390,1095.27 390,1103 C390,1110.73 383.732,1117 376,1117 L376,1117 Z M376,1087 C367.163,1087 360,1094.16 360,1103 C360,1111.84 367.163,1119 376,1119 C384.837,1119 392,1111.84 392,1103 C392,1094.16 384.837,1087 376,1087 L376,1087 Z M376.879,1096.46 C376.639,1096.22 376.311,1096.15 376,1096.21 C375.689,1096.15 375.361,1096.22 375.121,1096.46 L369.465,1102.12 C369.074,1102.51 369.074,1103.14 369.465,1103.54 C369.854,1103.93 370.488,1103.93 370.879,1103.54 L375,1099.41 L375,1110 C375,1110.55 375.447,1111 376,1111 C376.553,1111 377,1110.55 377,1110 L377,1099.41 L381.121,1103.54 C381.512,1103.93 382.145,1103.93 382.535,1103.54 C382.926,1103.14 382.926,1102.51 382.535,1102.12 L376.879,1096.46 L376.879,1096.46 Z"
                                id="arrow-up-circle" sketch:type="MSShapeGroup"> </path>
                        </g>
                    </g>
                </g>
            </svg>

            <svg v-if="detail.evolutionMethods === 'trade' " width="40px" height="40px" viewBox="0 0 76 76"
                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
                baseProfile="full" enable-background="new 0 0 76.00 76.00" xml:space="preserve" fill="#000000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path fill="#000000" fill-opacity="1" stroke-width="0.2" stroke-linejoin="round"
                        d="M 57.72,34L 54.0533,34L 53.0933,31.0133L 47.5967,31.0133L 46.6467,34L 43,34L 48.43,19.0667L 52.4133,19.0667L 57.72,34 Z M 52.1967,28.0267L 50.63,23.0767C 50.5078,22.7011 50.4233,22.2533 50.3767,21.7333L 50.2933,21.7333C 50.2667,22.1711 50.1789,22.6045 50.03,23.0333L 48.4333,28.0267L 52.1967,28.0267 Z M 19.2067,57L 19.2067,42.0667L 24.6667,42.0667C 26.34,42.0667 27.6261,42.3711 28.525,42.98C 29.4239,43.5889 29.8733,44.4467 29.8733,45.5533C 29.8733,46.3556 29.6,47.0572 29.0533,47.6583C 28.5067,48.2595 27.8078,48.6778 26.9567,48.9133L 26.9567,48.9567C 28.0367,49.0878 28.8994,49.4806 29.545,50.135C 30.1905,50.7895 30.5133,51.5867 30.5133,52.5267C 30.5133,53.9 30.02,54.9889 29.0333,55.7933C 28.0467,56.5978 26.6989,57 24.99,57L 19.2067,57 Z M 22.62,44.6267L 22.62,48.04L 24.0633,48.04C 24.7411,48.04 25.2744,47.8778 25.6633,47.5533C 26.0522,47.2289 26.2467,46.7822 26.2467,46.2133C 26.2467,45.1556 25.4478,44.6267 23.85,44.6267L 22.62,44.6267 Z M 22.62,50.6L 22.62,54.44L 24.4233,54.44C 25.1922,54.44 25.795,54.2639 26.2317,53.9117C 26.6683,53.5594 26.8867,53.0789 26.8867,52.47C 26.8867,51.8878 26.6722,51.4306 26.2433,51.0983C 25.8144,50.7661 25.2144,50.6 24.4433,50.6L 22.62,50.6 Z M 32.7629,19.736C 36.5904,18.6385 40.4806,18.7972 43.9928,19.9679L 41.1673,23.3352C 38.8262,22.8274 36.3294,22.8745 33.8654,23.5811C 28.7293,25.0538 24.9904,29.0322 23.5957,33.808L 30.9886,31.6881L 28.2461,36.6357L 18.6335,39.3921L 15.8771,29.7794L 18.6196,24.8318L 20.3662,30.923C 22.4775,25.6729 26.902,21.4166 32.7629,19.736 Z M 43.2371,56.264C 39.4095,57.3615 35.5193,57.2028 32.0071,56.032L 34.8326,52.6648C 37.1737,53.1726 39.6706,53.1255 42.1346,52.4189C 47.2707,50.9462 51.0095,46.9678 52.4043,42.192L 45.0114,44.3119L 47.7539,39.3643L 57.3665,36.6079L 60.1229,46.2206L 57.3804,51.1682L 55.6338,45.0769C 53.5225,50.3271 49.098,54.5834 43.2371,56.264 Z ">
                    </path>
                </g>
            </svg>

            <svg v-if="detail.evolutionMethods ==='use-item' " width="30px" height="30px" viewBox="0 0 24 24"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path
                        d="M10.0002 12.25C9.58597 12.25 9.25019 12.5858 9.25019 13C9.25019 13.4142 9.58597 13.75 10.0002 13.75H14.0002C14.4144 13.75 14.7502 13.4142 14.7502 13C14.7502 12.5858 14.4144 12.25 14.0002 12.25H10.0002Z"
                        fill="#000"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M7.32033 4.27529C7.65835 2.55091 9.17665 1.25 11.0002 1.25H13.0002C14.8238 1.25 16.3421 2.55092 16.6801 4.2753C19.6252 5.03147 21.7075 7.66894 21.7495 10.7198C21.7502 10.7665 21.7502 10.8178 21.7502 10.9044V13.9829C21.7504 13.994 21.7504 14.0052 21.7502 14.0163V16.375C21.7502 18.8445 20.035 20.9827 17.6244 21.5184C13.9201 22.3415 10.0803 22.3415 6.37602 21.5184C3.96535 20.9827 2.25019 18.8445 2.25019 16.375V14.0163C2.24994 14.0052 2.24994 13.994 2.25019 13.9829V10.9043C2.25019 10.8177 2.25019 10.7664 2.25083 10.7198C2.2929 7.66892 4.37523 5.03144 7.32033 4.27529ZM9.01465 3.94034C9.39359 3.23199 10.1411 2.75 11.0002 2.75H13.0002C13.8594 2.75 14.6068 3.232 14.9858 3.94035C13.0069 3.63773 10.9935 3.63772 9.01465 3.94034ZM20.2502 10.9111V13.5066C14.9716 15.711 9.02878 15.711 3.75019 13.5066V10.9111C3.75019 10.8157 3.7502 10.7755 3.75069 10.7405C3.78387 8.33419 5.4489 6.25854 7.79074 5.70414C7.82473 5.69609 7.86404 5.68733 7.95714 5.66665C8.04138 5.64793 8.08131 5.63905 8.12071 5.63048C10.6771 5.07434 13.3232 5.07434 15.8797 5.63048C15.9191 5.63905 15.959 5.64793 16.0432 5.66665C16.1363 5.68733 16.1756 5.69609 16.2096 5.70414C18.5515 6.25854 20.2165 8.33419 20.2497 10.7405C20.2502 10.7755 20.2502 10.8157 20.2502 10.9111ZM3.75019 16.375V15.123C7.91456 16.7307 12.4332 17.0771 16.7502 16.1622V17C16.7502 17.4142 17.086 17.75 17.5002 17.75C17.9144 17.75 18.2502 17.4142 18.2502 17V15.7911C18.9242 15.5999 19.5916 15.3772 20.2502 15.123V16.375C20.2502 18.1415 19.0233 19.6709 17.299 20.0541C13.809 20.8296 10.1914 20.8296 6.70141 20.0541C4.97705 19.6709 3.75019 18.1415 3.75019 16.375Z"
                        fill="#000"></path>
                </g>
            </svg>

            <svg v-if="detail.evolutionMethods === 'shed' " width="25px" height="25px" viewBox="0 0 48 48" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path
                        d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
                        stroke="#000000" stroke-width="4" stroke-linejoin="round"></path>
                    <circle cx="24" cy="24" r="6" fill="#E95B1E" stroke="#000000" stroke-width="4"
                        stroke-linejoin="round"></circle>
                    <path d="M30 24H44" stroke="#000000" stroke-width="4" stroke-linecap="round"
                        stroke-linejoin="round"></path>
                    <path d="M4 24H18" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
                    </path>
                    <circle cx="24" cy="24" r="2" fill="white"></circle>
                </g>
            </svg>

            <svg v-if="detail.evolutionMethods === 'spin' " fill="#000000" width="25px" height="25px"
                viewBox="0 -0.5 1001 1001" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path
                        d="M497.571 0c-113.684 .267 -227.301 38.887 -319.725 115.892l.188 .188c172.901 -140.335 427.481 -130.06 588.398 30.857 133.878 133.876 163.485 332.604 88.85 495.173 -10.186 29.288 -5.523 50.219 11.974 67.716 20.709 20.709 60.696 23.151 83.847 0 2.643 -2.643 12.187 -14.411 14.694 -24.041 70.849 -180.224 33.479 -393.197 -112.171 -538.846 -98.281 -98.282 -227.211 -147.238 -356.052 -146.935zm-408.137 273.706c-14.532 .36 -29.101 5.592 -39.954 16.445 -2.643 2.644 -12.187 14.41 -14.694 24.041 -70.849 180.223 -33.479 393.197 112.171 538.846 185.003 185.003 478.607 195.322 675.778 31.044l-.188 -.188c-172.901 140.336 -427.481 130.06 -588.398 -30.857 -133.876 -133.878 -163.485 -332.603 -88.85 -495.173 10.186 -29.287 5.523 -50.219 -11.974 -67.716 -11.002 -11.002 -27.423 -16.852 -43.893 -16.445z">
                    </path>
                </g>
            </svg>

            <svg v-if="detail.evolutionMethods === 'tower-of-waters' || detail.evolutionMethods === 'tower-of-darkness' "
                width="20px" height="20px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <g clip-path="url(#clip0)">
                        <path d="M4 44H44" stroke="#000000" stroke-width="4" stroke-linecap="round"
                            stroke-linejoin="round"></path>
                        <path d="M21.2493 7.47464L36.7041 11.6157L28 44L10.9999 44L21.2493 7.47464Z" stroke="#000000"
                            stroke-width="4" stroke-linejoin="round"></path>
                        <path d="M19.3174 6.957L38.6359 12.1334" stroke="#000000" stroke-width="4"
                            stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M16.2114 18.5481L35.5299 23.7245" stroke="#000000" stroke-width="4"
                            stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M25.4823 20.9318L26.5176 17.0681" stroke="#000000" stroke-width="4"
                            stroke-linecap="round"></path>
                        <path d="M13.106 30.1392L32.4245 35.3156" stroke="#000000" stroke-width="4"
                            stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M22.4823 31.9318L23.5176 28.0681" stroke="#000000" stroke-width="4"
                            stroke-linecap="round"></path>
                        <rect x="25.1826" y="4.38739" width="10" height="4" rx="1"
                            transform="rotate(15 25.1826 4.38739)" stroke="#000000" stroke-width="4"
                            stroke-linecap="round" stroke-linejoin="round"></rect>
                        <path d="M19.4823 42.9318L20.5176 39.0681" stroke="#000000" stroke-width="4"
                            stroke-linecap="round"></path>
                    </g>
                    <defs>
                        <clipPath id="clip0">
                            <rect width="48" height="48" fill="white"></rect>
                        </clipPath>
                    </defs>
                </g>
            </svg>

            <svg v-if="detail.evolutionMethods ==='three-critical-hits' " fill="#000000" version="1.1" id="Layer_1"
                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px"
                viewBox="0 0 260 260" enable-background="new 0 0 260 260" xml:space="preserve">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path
                        d="M218,94h3.023C228.057,108.874,232,125.484,232,143c0,63.411-51.589,115-115,115S2,206.411,2,143S53.589,28,117,28 c17.516,0,34.126,3.943,49,10.977V42v9.574l-7.979,7.979C145.64,53.441,131.715,50,117,50c-51.28,0-93,41.72-93,93s41.72,93,93,93 s93-41.72,93-93c0-14.716-3.441-28.641-9.552-41.022L208.426,94H218z M164,143c0,25.916-21.084,47-47,47s-47-21.084-47-47 s21.084-47,47-47c1.472,0,2.926,0.077,4.363,0.21l18.351-18.351C132.596,75.37,124.957,74,117,74c-38.047,0-69,30.953-69,69 s30.953,69,69,69s69-30.953,69-69c0-7.957-1.37-15.596-3.859-22.714l-18.35,18.35C163.923,140.074,164,141.528,164,143z M218,74 l40-40h-32V2l-40,40v17.857l-61.425,61.425c-2.373-0.828-4.92-1.283-7.575-1.283c-12.703,0-23,10.297-23,23 c0,12.703,10.297,23,23,23c12.703,0,23-10.297,23-23c0-2.655-0.455-5.202-1.283-7.575L200.143,74H218z">
                    </path>
                </g>
            </svg>


            <svg v-if="detail.evolutionMethods ==='take-damage' " width="30px" height="30px" viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg" fill="#000000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path fill="#000000"
                        d="M190.03 21.97c-.71-.003-1.422.01-2.124.03 38.633 74.657 186.967 157.52 307.906 333.03-38.488-159.928-215.34-332.78-305.78-333.06zM83.53 65.374c61.253 98.216 249.157 212.75 375.75 378.844C420.49 283.03 173.3 62.907 83.53 65.374zm-67.31 81.313c59.365 87.324 194.506 155.172 355.03 345.125-38.792-161.19-265.263-347.592-355.03-345.125z">
                    </path>
                </g>
            </svg>

            <svg v-if="detail.evolutionMethods === 'other' || detail.evolutionMethods === 'agile-style-move' || detail.evolutionMethods === 'strong-style-move' || detail.evolutionMethods === 'recoil-damage'"
                width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path
                        d="M6 10.5C5.17157 10.5 4.5 11.1716 4.5 12C4.5 12.8284 5.17157 13.5 6 13.5C6.82843 13.5 7.5 12.8284 7.5 12C7.5 11.1716 6.82843 10.5 6 10.5Z"
                        fill="#000000"></path>
                    <path
                        d="M10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12Z"
                        fill="#000000"></path>
                    <path
                        d="M16.5 12C16.5 11.1716 17.1716 10.5 18 10.5C18.8284 10.5 19.5 11.1716 19.5 12C19.5 12.8284 18.8284 13.5 18 13.5C17.1716 13.5 16.5 12.8284 16.5 12Z"
                        fill="#000000"></path>
                </g>
            </svg>
            <img :src="detail.sprite" alt="Sprite" width="60" height="60">

        </li>
    </ul>

</template>

<style scoped>
    h3 {
        font-size: 1.17em;
        font-weight: 500;
    }
    ul {
        list-style-type: none;
        padding: 0;
        display: flex;
        justify-content: center;
        gap: 1rem;
    }
    svg{
        margin-left: -30px;
    }
    li {
        margin: 0 10px;
        text-align: center; 
        display: flex;
        gap: 1rem;
        align-items: center;
    }
    p {
        font-style: italic;
    }
</style>