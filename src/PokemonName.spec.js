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

    await wrapper.vm.$nextTick();

    // Verifica se o nome do Pokémon é exibido
    expect(wrapper.text()).toContain('Pikachu'); 
 });
});