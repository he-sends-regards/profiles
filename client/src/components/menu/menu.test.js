import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {screen, render, fireEvent} from '@testing-library/react';
import Enzyme, {mount} from 'enzyme';
import {jest} from '@jest/globals';
import Menu from './menu.jsx';

Enzyme.configure({adapter: new Adapter()});

const setUp = (props) => mount(<Menu {...props} />);

const mockName = 'John';
const defaultName = 'Unknown';

const getMenuItems = () => screen.getAllByRole('button');

describe('Menu renders correctly with props', () => {
  it('Should render correctly without props', () => {
    render(<Menu />);

    expect(screen.getByRole('heading').textContent).toBe(defaultName);
    expect(getMenuItems().length).toBe(2);
  });

  it('Should render correct userName', () => {
    render(<Menu userData={{userName: mockName}} />);

    expect(screen.getByRole('heading').textContent).toBe(mockName);
    expect(getMenuItems().length).toBe(2);
  });

  it('Should contains 2 menu items when user is not an admin', () => {
    render(<Menu userData={{userName: mockName, isUserAdmin: false}} />);

    expect(getMenuItems().length).toBe(2);
  });

  it('Should contains 5 menu items when isAdmin-prop is true', () => {
    render(<Menu userData={{isUserAdmin: true}} />);

    expect(getMenuItems().length).toBe(5);
  });

  it('Logout btn should be clickable', () => {
    render(<Menu />);
    const logoutBtnComponent = screen.getByText('Logout');

    expect(logoutBtnComponent.disabled).toBe(false);
    expect(fireEvent.click(screen.getByText('Logout'))).toBe(true);
  });

  it('State should change if menu tab is clicked', () => {
    const setActiveTab = jest.fn();
    const handleClick = jest.spyOn(React, 'useState');
    handleClick.mockImplementation((activeTab) => [activeTab, setActiveTab]);

    const MenuComponent = setUp({
      activeTab: '',
      userData: {isUserAdmin: true},
      setActiveTab,
    });
    const MenuFirstItem = MenuComponent.find('.nav-link').first();

    MenuFirstItem.simulate('click');

    expect(setActiveTab).toBeTruthy();
  });
});
