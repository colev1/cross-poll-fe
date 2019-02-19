import React from 'react'; 
import { shallow, mount } from 'enzyme';
import Favorites from '../Favorites/Favorites';
import renderer from 'react-test-renderer';

describe('Favorites', () => {
  it('should match the snapshot with all data passed in correctly', () => { 
    let mockFavorites = [];
    let mockToken = 'a1ag45';
    let mockCleanedFaves = [];

    const wrapper = shallow( <Favorites 
      fetchFavorites={jest.fn()} 
      favorites={mockFavorites} userAPIToken={mockToken}
      cleanedFaves={mockCleanedFaves}
      displayFaves={jest.fn()}
      goBack={jest.fn()}
    />);

    expect(wrapper).toMatchSnapshot(); 
  })
});