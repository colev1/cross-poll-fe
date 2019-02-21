import React from 'react'; 
import { shallow, mount } from 'enzyme';
import Favorites from '../Favorites/Favorites';
import renderer from 'react-test-renderer';
import { TouchableOpacity } from 'react-native'; 

describe('Favorites', () => {
  let mockFavorites;
  let mockToken;
  let mockCleanedFaves;
  let wrapper;

  beforeEach(() => {
    mockFavorites = [];
    mockToken = 'a1ag45';
    mockCleanedFaves = [];

    wrapper = shallow( <Favorites 
      fetchFavorites={jest.fn()} 
      favorites={mockFavorites} userAPIToken={mockToken}
      cleanedFaves={mockCleanedFaves}
      displayFaves={jest.fn()}
      goBack={jest.fn()}
    />);
  })

  it('should match the snapshot with all data passed in correctly', () => { 

    expect(wrapper).toMatchSnapshot(); 

  })

  describe('goBack', () => {
    it('should update state of showInfo to be false', () => { 

      wrapper.instance().goBack();

      const expected = false
      
      expect(wrapper.instance().state.showInfo).toEqual(false);
    });
  });

  it.skip('should call deleteFavorite on press of delete button', () => {

    const deleteFavorite = jest.fn()
    wrapper.find(TouchableOpacity).at(0).simulate('press')
    expect(deleteFavorite).toHaveBeenCalled()
    
  })

});