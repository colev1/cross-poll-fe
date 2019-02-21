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
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Something went wrong'
    }))

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

  describe('ShowInfo', () => {
    it('should update state with false when ShowInfo is called', () => { 
  
      const wrapper = shallow(<Home showLogin={jest.fn()} addToFavorites={jest.fn()} userAPIToken={mockToken}
      userLocation={mockLocation}/>);
  
      const expected = true

      wrapper.instance().showInfo();

      expect(wrapper.instance().state.showInfo).toEqual(expected);
    });
  });

  describe('ShowFilter', () => {
    it('should update state with true when ShowFilter is called', () => { 
  
      const wrapper = shallow(<Home showLogin={jest.fn()} addToFavorites={jest.fn()} userAPIToken={mockToken}
      userLocation={mockLocation}/>);
  
      const expected = true

      wrapper.instance().showFilter();
      
      expect(wrapper.instance().state.showFilter).toEqual(expected);
    });
  });

  describe('ShowFavorites', () => {
    it('should update state with true when ShowFavorites is called', () => { 
  
      const wrapper = shallow(<Home showLogin={jest.fn()} addToFavorites={jest.fn()} userAPIToken={mockToken}
      userLocation={mockLocation}/>);
  
      const expected = true

      wrapper.instance().showFavorites();
      
      expect(wrapper.instance().state.showFavorites).toEqual(expected);
    });
  });

  describe('returnHome', () => {
    it('should update state with showFavorites to be false and showInfo to be false when returnHome is called', () => { 
  
      const wrapper = shallow(<Home showLogin={jest.fn()} addToFavorites={jest.fn()} userAPIToken={mockToken}
      userLocation={mockLocation}/>);

      wrapper.instance().returnHome();
      
      expect(wrapper.instance().state.showFavorites).toEqual(false);
      expect(wrapper.instance().state.showInfo).toEqual(false);
    });
  });

  describe('fetch calls', () => {
    it('fetch user zip is called with the correct params', async () => {
      let mockUrl = 'https://adoptr-be.herokuapp.com/api/v1/locations'
      await wrapper.instance().fetchUserZip()
      expect(window.fetch).toHaveBeenCalled()
    })
  
  })

 
  
});