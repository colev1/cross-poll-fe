import React from 'react'; 
import { shallow, mount } from 'enzyme';
import Home from '../Home/Home';
import renderer from 'react-test-renderer';
import Pet from '../Pet/Pet'


describe('Home', () => {
  let wrapper;
  let mockToken;
  let mockLocation;
  
  beforeEach(() => {
    mockToken = 'aaaaaa'
    mockLocation = {
      zip_code: '80202',
      latitude: '0000',
      longitude: '9999'
    }
    wrapper = shallow( <Home 
      showLogin={jest.fn()} addToFavorites={jest.fn()} userAPIToken={mockToken}
      userLocation={mockLocation}
    />);
  })

  it('should match the snapshot with all data passed in correctly', () => { 
    expect(wrapper).toMatchSnapshot(); 
  })

  it('should render a pet component', () => {
    expect(wrapper.find(Pet).length).toEqual(1)
  })
});