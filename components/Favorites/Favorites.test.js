import React from 'react'; 
import { shallow, mount } from 'enzyme';
import Favorites from './Favorites';
import renderer from 'react-test-renderer';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';


describe('Favorites', () => {
  let mockFavorites;
  let mockToken;
  let mockCleanedFaves;
  let wrapper;
  let mockLoadDelete;

  beforeEach(() => {
    mockFavorites = [];
    mockToken = 'a1ag45';
    mockCleanedFaves = [];
    mockLoadDelete = jest.fn()
    
    wrapper = shallow( <Favorites 
      fetchFavorites={jest.fn()} 
      favorites={mockFavorites} 
      userAPIToken={mockToken}
      cleanedFaves={mockCleanedFaves}
      displayFaves={jest.fn()}
      goBack={jest.fn()}
      showInfo={false}

      loadDelete={mockLoadDelete}
    />);
  })

  it('should match the snapshot with all data passed in correctly', () => { 
    expect(wrapper).toMatchSnapshot(); 

  })

    it('should update state of showInfo to be false', () => { 
        wrapper.instance().goBack();
        const expected = false
        expect(wrapper.instance().state.showInfo).toEqual(expected);
      });
    
      it('should call deleteFavorite on press of delete button', () => {
          wrapper.find(TouchableOpacity).simulate('press')
          const instance = wrapper.instance();
          jest.spyOn(instance, 'deleteFavorite');
          expect(instance.deleteFavorite).toHaveBeenCalled()
    })
});