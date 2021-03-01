import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, {mount, shallow} from 'enzyme';
import Dashboard from './dashboard.jsx';

Enzyme.configure({adapter: new Adapter()});

const setUp = (props) => shallow(<Dashboard {...props} />);

it('Renders correctly with default isActive prop', () => {
  const setDash = jest.fn();
  const handleClick = jest.spyOn(React, 'useState');
  handleClick.mockImplementation((dash) => [dash, setDash]);

  const DashboardComponent = setUp({
    isActive: true,
  });
  const MenuFirstItem = MenuComponent.find('.nav-link').first();

  MenuFirstItem.simulate('click');

  expect(setActiveTab).toBeTruthy();
});

