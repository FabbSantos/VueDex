// EvolutionChain.spec.js
import { mount } from '@vue/test-utils';
import EvolutionChain from '@/components/EvolutionChain.vue';

describe('EvolutionChain.vue', () => {
 it('renders the component', () => {
    const wrapper = mount(EvolutionChain, {
      props: {
        name: 'pikachu',
      },
    });

    expect(wrapper.exists()).toBe(true);
 });

 it('displays the sprite and evolution methods', async () => {
    const wrapper = mount(EvolutionChain, {
      props: {
        name: 'pikachu',
      },
    });

    // Aguarda a renderização do componente
    await wrapper.vm.$nextTick();

    // Verifica se o sprite e os métodos de evolução são exibidos
    expect(wrapper.find('img').exists()).toBe(true);
    expect(wrapper.text()).toContain('level-up'); // Substitua 'level-up' pelo método de evolução esperado
 });

 it('conditionally renders the SVG', async () => {
    const wrapper = mount(EvolutionChain, {
      props: {
        name: 'pikachu',
      },
    });

    // Aguarda a renderização do componente
    await wrapper.vm.$nextTick();

    // Verifica se o SVG é renderizado condicionalmente
    expect(wrapper.find('svg').exists()).toBe(true);
 });
});