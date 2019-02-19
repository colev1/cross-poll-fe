import React from 'react'; 
import { shallow, mount } from 'enzyme';
import Loading from '../Loading/Loading';
import renderer from 'react-test-renderer';

describe('Loading', () => {

  beforeEach(() => {
  })

  it('should match the snapshot with all data passed in correctly', () => { 

    const wrapper = shallow( <Loading />);

    expect(wrapper).toMatchSnapshot(); 
  })
});