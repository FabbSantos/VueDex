// PokemonName.spec.js
import { mount } from '@vue/test-utils';
import PokemonName from '@/components/PokemonName.vue';

describe('PokemonName.vue', () => {
 it('renders the component', () => {
    const wrapper = mount(PokemonName, {
      props: {
        pokemonName: 'pikachu',
      },
      global: {
        provide: {
          language: ref('en'),
          fallbackLanguage: ref('en')
        }
      }
    });

    expect(wrapper.exists()).toBe(true);
 });

 it('displays the Pokémon name', async () => {
    const wrapper = mount(PokemonName, {
      props: {
        pokemonName: 'pikachu',
      },
      global: {
        provide: {
          language: ref('en'),
          fallbackLanguage: ref('en')
        }
      }
    });

    // Aguarda a renderização do componente
    await wrapper.vm.$nextTick();

    // Verifica se o nome do Pokémon é exibido
    expect(wrapper.text()).toContain('Pikachu'); // Substitua 'Pikachu' pelo nome esperado do Pokémon
 });
});