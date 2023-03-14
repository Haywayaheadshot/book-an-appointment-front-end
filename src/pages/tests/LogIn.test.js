import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import LogIn from '../LogIn';

describe('LogIn', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <MemoryRouter>
        <LogIn />
      </MemoryRouter>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
