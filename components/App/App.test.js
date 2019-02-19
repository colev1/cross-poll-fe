import React from 'react'; 
import { shallow, mount } from 'enzyme';
import Home from '../Home/Home';
import renderer from 'react-test-renderer';


describe('App', () => {
  it('should match the snapshot with all data passed in correctly', () => { 
    const wrapper = shallow( <Home 
    />);

    expect(wrapper).toMatchSnapshot(); 
  })

  describe('show login', () => {
  

  })
});