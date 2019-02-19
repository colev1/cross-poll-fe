import React from 'react'; 
import { shallow, mount } from 'enzyme';
import Login from '../Login/Login';
import renderer from 'react-test-renderer';

describe('Login', () => {

  beforeEach(() => {
  })

  it('should match the snapshot with all data passed in correctly', () => { 

    const wrapper = shallow( <Login
      showLogin={jest.fn()}
      updateUserToken={jest.fn()}
    />);

    expect(wrapper).toMatchSnapshot(); 
  })
});