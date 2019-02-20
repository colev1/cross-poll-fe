import React from 'react'; 
import { shallow, mount } from 'enzyme';
import Favorites from '../Favorites/Favorites';
import renderer from 'react-test-renderer';

describe('Favorites', () => {
  let mockFavorites;
  let mockToken;
  let mockCleanedFaves;

  beforeEach(() => {
    mockFavorites = [];
    mockToken = 'a1ag45';
    mockCleanedFaves = [];

  })

  it('should match the snapshot with all data passed in correctly', () => { 

    const wrapper = shallow( <Favorites 
      fetchFavorites={jest.fn()} 
      favorites={mockFavorites} userAPIToken={mockToken}
      cleanedFaves={mockCleanedFaves}
      displayFaves={jest.fn()}
      goBack={jest.fn()}
    />);

    expect(wrapper).toMatchSnapshot(); 
  })

  describe('goBack', () => {
    it('should update state of showInfo to be false', () => { 
  
      const wrapper = shallow( <Favorites 
        fetchFavorites={jest.fn()} 
        favorites={mockFavorites} userAPIToken={mockToken}
        cleanedFaves={mockCleanedFaves}
        displayFaves={jest.fn()}
        goBack={jest.fn()}
      />);

      wrapper.instance().goBack();

      const expected = false
      
      expect(wrapper.instance().state.showInfo).toEqual(false);
    });
  });

});