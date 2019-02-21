import React from 'react'; 
import PetInfo from './PetInfo';
import { shallow } from 'enzyme';
import { TouchableOpacity } from 'react-native';

describe('pet info', () => {
  let mockPet;
  let mockShelter;
  let mockEmailShelter;
  let mockReturnHome;
  let mockSendText;
  let wrapper;
  let mockLoading;

  beforeEach(() => {
    mockLoading = false;
    mockSendText = jest.fn()
    mockEmailShelter = jest.fn()
    mockPet = {
      animal: 'Cat',
      breed: 'Domestic Short Hair',contactInfo: {},
      description: '12 year old..',
      id: '42736275',
      name: 'Zoey',
      photos: ['http://photos.petfinder.com/photos/pets/42736275/1/?bust=1536778269&width=60&-pnt.jpg',
      'http://photos.petfinder.com/photos/pets/42736275/1/?bust=1536778269&width=95&-fpm.jpg',
      'http://photos.petfinder.com/photos/pets/42736275/1/?bust=1536778269&width=500&-x.jpg',
      'http://photos.petfinder.com/photos/pets/42736275/1/?bust=1536778269&width=300&-pn.jpg'],
      sex: 'F',
      shelterId: 'CO186',
      size: 'M'
    };

    mockShelter = {
      city: 'Denver',
      email: 'barnwatercat@aol.com',
      id: 'CO186',
      latitude: '39.6788',
      longitude: '-104.9636',
      name: 'Barnwater Cats Rescue Organization',
      phone: '(303) 759-2855',
      state: 'CO',
      zip: '80210'
    };
    wrapper = shallow( <PetInfo 
      pet={mockPet}
      shelter={mockShelter}
      sendText={mockSendText}
      emailShelter={mockEmailShelter}
      returnHome={mockReturnHome}
      loading={false}
    />);
  })

  it('should match the snapshot with all data passed in correctly', () => { 
    expect(wrapper).toMatchSnapshot(); 
  })

  it('should be initialized with state of false', () => {
    let mockState = {
      sendText: false,
      recipientPhone: ''
    }
    expect(wrapper.state('sendText')).toEqual(mockState.sendText)
    expect(wrapper.state('recipientPhone')).toEqual(mockState.recipientPhone)

  })

  it('should set state of send text true on button press', () => {
    wrapper.find(TouchableOpacity).at(2).simulate('press')
    expect(wrapper.state('sendText')).toEqual(true)
  })

  it('should call send text on button press', () => {
    wrapper.find(TouchableOpacity).at(0).simulate('press')
    expect(mockSendText).toHaveBeenCalled()
  })

  it('should call email shelter on button press', () => {
    wrapper.find(TouchableOpacity).at(1).simulate('press')
    expect(mockEmailShelter).toHaveBeenCalled()
  })
});