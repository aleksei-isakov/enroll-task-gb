import { shallowMount } from '@vue/test-utils';
import FunctionTest from '../../src/components/FunctionTest.vue';

describe('FunctionTest', () => {
  const wrapper = shallowMount(FunctionTest);
  it('should correctly convert bytes to kilobytes', () => {
    wrapper.setData({ input: 1024, currentUnit: 'KB' });
    wrapper.find('button').trigger('click');
    expect(wrapper.vm.result).toBe('1 KB');
  });
  it('should correctly convert bytes to megabytes', () => {
    wrapper.setData({ input: 1024, currentUnit: 'MB' });
    wrapper.find('button').trigger('click');
    expect(wrapper.vm.result).toBe('0.0009765625 MB');
  });

  it('should correctly handle negative input', () => {
    wrapper.setData({ input: -1024, currentUnit: 'KB' });
    wrapper.find('button').trigger('click');
    expect(wrapper.vm.error).toBe('Input value must be a non-negative number.');
  });

  it('should correctly handle zero input', () => {
    wrapper.setData({ input: 0, currentUnit: 'KB' });
    wrapper.find('button').trigger('click');
    expect(wrapper.vm.result).toBe('0');
  });

});