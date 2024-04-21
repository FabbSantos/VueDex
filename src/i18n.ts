// src/i18n.js
import { createI18n } from 'vue-i18n';

const messages = {
 en: {
    message: {
      Type: 'Type',
      Abilities: 'Abilities',
      Sprites: 'Sprites',
      Evo: 'Evolutionary Chain',
      Movepool: 'Movepool',
      Games: 'Game Indices',
      Stats: 'Base Stats',

      placeholderSearch: 'pokemon or id, enter to search',
      placeholderSpecies: 'select a specie',
      placeholderTypes: 'select a type',
    },
},
pt: {
    message: {
        Type: 'Tipo',
        Abilities: 'Habilidades',
        Sprites: 'Sprites',
        Evo: 'Cadeia de Evolução',
        Movepool: 'Golpes',
        Games: 'Jogos',
        Stats: 'Status Base',
        
        placeholderSearch: 'pokemon ou id, enter para pesquisar',
        placeholderSpecies: 'selecione uma espécie',
        placeholderTypes: 'selecione um tipo',
    },
 },

 es: {
    message: {
      Type: 'Tipo',
      Abilities: 'Habilidades',
      Sprites: 'Sprites',
      Evo: 'Cadena de Evolución',
      Movepool: 'Movimientos',
      Games: 'Juegos',
      Stats: 'Estadísticas Base',

        placeholderSearch: 'pokemon o id, enter para buscar',
        placeholderSpecies: 'selecciona una especie',
        placeholderTypes: 'selecciona un tipo',
    },
 },

 ko: {
    message: {
      Type: '유형',
      Abilities: '능력',
      Sprites: '스프라이트',
      Evo: '진화 체인',
      Movepool: '이동 풀',
      Games: '게임 인덱스',
      Stats: '기본 통계',

    placeholderSearch: '포켓몬 또는 ID, 검색하려면 입력',
    placeholderSpecies: '종을 선택하십시오',
    placeholderTypes: '유형 선택',
    },
 },
 ja: {
    message: {
      Type: 'タイプ',
      Abilities: 'とくせい',
      Sprites: 'スプライト',
      Evo: '進化チェーン',
      Movepool: 'わざ',
      Games: 'ゲームインデックス',
      Stats: 'ベースステータス',

    placeholderSearch: 'ポケモンまたはID、検索するには入力',
    placeholderSpecies: '種を選択',
    placeholderTypes: 'タイプを選択',
    },
 },

};

const i18n = createI18n({
  legacy: false,
 locale: 'en', // idioma padrão
 fallbackLocale: 'en', // idioma de fallback
 messages,
});

export default i18n;