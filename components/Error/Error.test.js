import React from 'react'; 
import { shallow, mount } from 'enzyme';
import Error from './Error';

describe('error page', () => {

  it('matches snapshot', () => {
    let wrapper = shallow(<Error />)
    expect(wrapper).toMatchSnapshot(); 
  })
})