import React from 'react'; 
import { shallow, mount } from 'enzyme';
import Login from '../Login/Login';
import renderer from 'react-test-renderer';

describe('Login', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow( <Login
      showLogin={true}
      updateUserToken={jest.fn()}
    />);
  })

  it('should match the snapshot with all data passed in correctly', () => { 
    expect(wrapper).toMatchSnapshot(); 
  })

  it.skip('should call the submit user func when clicked', () => { 
    const submitUserMock = jest.fn();
  
    let submitUser = wrapper.instance().submitUser()
    wrapper.find('Button').simulate('Press');
    expect(submitUser).toBeCalled(); 
  }); 

  it('should update state and reset error message when setSelected is called', () => {
    wrapper.instance().setSelected('sign up');
    expect(wrapper.state('selectedOption')).toEqual('sign up');
    expect(wrapper.state('error')).toEqual(false);
    expect(wrapper.state('errorMessage')).toEqual('');
  })

  it('should update state when name/email is typed in', () => {
  
  })


});