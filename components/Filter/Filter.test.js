import React from 'react'; 
import { shallow, mount } from 'enzyme';
import Filter from '../Filter/Filter';
import renderer from 'react-test-renderer';

describe('Filter', () => {

  beforeEach(() => {
  })

  it('should match the snapshot with all data passed in correctly', () => { 

    const wrapper = shallow( <Filter
      showFilter={jest.fn()}
      fetchByFilters={jest.fn()}
    />);

    expect(wrapper).toMatchSnapshot(); 
  })

  describe('handleSlider', () => {
    it('should update state with miles', () => { 
  
      const wrapper = shallow( <Filter
        showFilter={jest.fn()}
        fetchByFilters={jest.fn()}
      />);

      wrapper.instance().handleSliderChange('50');

      const expected = '50'
      
      expect(wrapper.instance().state.miles).toEqual(expected);
    });
  });

  describe('setSelectedAnimal', () => {
    it('should update state with selected animal', () => { 
  
      const wrapper = shallow( <Filter
        showFilter={jest.fn()}
        fetchByFilters={jest.fn()}
      />);

      wrapper.instance().setSelectedAnimal('cat');

      const expected = 'cat'
      
      expect(wrapper.instance().state.selectedAnimal).toEqual(expected);
    });
  });

  describe('setSelectedSize', () => {
    it('should update state with selected size', () => { 
  
      const wrapper = shallow( <Filter
        showFilter={jest.fn()}
        fetchByFilters={jest.fn()}
      />);

      wrapper.instance().setSelectedSize('L');

      const expected = 'L'
      
      expect(wrapper.instance().state.selectedSize).toEqual(expected);
    });
  });

  describe('setSelectedGender', () => {
    it('should update state with selected gender', () => { 
  
      const wrapper = shallow( <Filter
        showFilter={jest.fn()}
        fetchByFilters={jest.fn()}
      />);

      wrapper.instance().setSelectedGender('female');

      const expected = 'female'
      
      expect(wrapper.instance().state.selectedGender).toEqual(expected);
    });
  });

  

  
});