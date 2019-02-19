import React from 'react'; 
import { shallow, mount } from 'enzyme';
import Home from '../Home/Home';
import renderer from 'react-test-renderer';


describe('Home', () => {
  it('should match the snapshot with all data passed in correctly', () => { 
    let mockToken = 'aaaaaa'
    let mockLocation = {
      zip_code: '80202',
      latitude: '0000',
      longitude: '9999'
    }
    const wrapper = shallow( <Home 
      showLogin={jest.fn()} addToFavorites={jest.fn()} userAPIToken={mockToken}
      userLocation={mockLocation}
    />);
    expect(wrapper).toMatchSnapshot(); 
  })
});