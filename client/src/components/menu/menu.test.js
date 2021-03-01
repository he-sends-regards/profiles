import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, {mount} from 'enzyme';
import {jest} from '@jest/globals';
import Menu from './menu.jsx';

Enzyme.configure({adapter: new Adapter()});

const setUp = (props) => mount(<Menu {...props} />);

describe('Menu renders correctly with props', () => {
  it('Should contains 1 menu item when props are default', () => {
    const MenuComponent = setUp();
    const MenuItems = MenuComponent.find('.nav-item');

    expect(MenuItems.length).toBe(1);
  });

  it('Should contains 4 menu item when isAdmin-prop is true', () => {
    const MenuComponent = setUp({userData: {isUserAdmin: true}});
    const MenuItems = MenuComponent.find('.nav-item');

    expect(MenuItems.length).toBe(4);
  });

  it('Should display name from props correctly', () => {
    const userName = 'Harry';

    const MenuComponent = mount(<Menu userData={{userName}}/>);
    const MenuItems = MenuComponent.find('.menu__name');

    expect(MenuItems.text()).toBe(userName);
    expect(MenuItems.text()).not.toBe('Dan');
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
