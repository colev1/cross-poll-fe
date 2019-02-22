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
  let mockReturnHome;

  beforeEach(() => {
    mockFavorites = ['pet','pet'];
    mockToken = 'a1ag45';
    mockCleanedFaves = [];
    mockLoadDelete = jest.fn()
    mockReturnHome =jest.fn()
    wrapper = shallow( <Favorites 
      fetchFavorites={jest.fn()} 
      favorites={mockFavorites} 
      userAPIToken={mockToken}
      cleanedFaves={mockCleanedFaves}
      displayFaves={jest.fn()}
      goBack={jest.fn()}
      showInfo={false}
      returnHome={mockReturnHome}
      loadDelete={mockLoadDelete}
    />);
  })

  it('should match the snapshot with all data passed in correctly', () => { 
    expect(wrapper).toMatchSnapshot(); 

  })
    it('should call get pet on press of button', () => { 
      let mockCleanedFaves = [
        {id: 
         {$t: 0},
         name: {
           $t: 'Bob'
         }
        },
        ]
        let wrapper = shallow( <Favorites 
          fetchFavorites={jest.fn()} 
          favorites={mockFavorites} 
          userAPIToken={mockToken}
          cleanedFaves={mockCleanedFaves}
          displayFaves={jest.fn()}
          goBack={jest.fn()}
          showInfo={false}
          loadDelete={mockLoadDelete}
        />);

        const spy = jest.spyOn(wrapper.instance(), 'getPet')
        wrapper.instance().forceUpdate()
        wrapper.find('TouchableOpacity').at(1).simulate('press')
        expect(spy).toHaveBeenCalled();
        expect(mockLoadDelete).toHaveBeenCalled();
      });

      it('should initially have state of show info false', () => {
        expect(wrapper.instance().state.showInfo).toEqual(false);
        expect(wrapper.instance().state.loading).toEqual(false);
      })

      it('should update state on get pet', () => {

      })
    
      it('should call deleteFavorite on press of delete button', () => {
       let mockCleanedFaves = [
         {id: 
          {$t: 0},
          name: {
            $t: 'Bob'
          }
         },
         ]
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

        const spy = jest.spyOn(wrapper.instance(), 'deleteFavorite')
        wrapper.find('TouchableOpacity').at(0).simulate('press')
        expect(spy).toHaveBeenCalled();
        expect(mockLoadDelete).toHaveBeenCalled();
    })

    it('should call return home if show info is shown and button is pressed', () => {
      wrapper.find('TouchableOpacity').at(0).simulate('press')
      expect(mockReturnHome).toHaveBeenCalled();
    })
});