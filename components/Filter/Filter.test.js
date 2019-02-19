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
});