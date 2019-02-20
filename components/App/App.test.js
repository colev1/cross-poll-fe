import React from 'react'; 
import { shallow, mount } from 'enzyme';
import Home from '../Home/Home';
import renderer from 'react-test-renderer';
import App from '../App/App';


describe('App', () => {
  it('should match the snapshot with all data passed in correctly', () => { 
    const wrapper = shallow( <App  />);

    expect(wrapper).toMatchSnapshot(); 
  })

  describe('signOut', () => {
    it('should update state with showLogin to equal true', () => { 
  
      const wrapper = shallow( <App  />);

      wrapper.instance().signOut();

      const expected = true
      
      expect(wrapper.instance().state.showLogin).toEqual(expected);
    });
  });

  describe('updateUserToken', () => {
    it('should update state with user token', () => { 
  
      const wrapper = shallow( <App  />);

      wrapper.instance().updateUserToken('aksd8246dajX');

      const expected = 'aksd8246dajX'
      
      expect(wrapper.instance().state.userAPIToken).toEqual(expected);
    });
  });

});