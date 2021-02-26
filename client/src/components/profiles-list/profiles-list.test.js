import React from 'react';
import renderer from 'react-test-renderer';
import {MenuItem} from '../../const.js';
import ProfilesList from './profiles-list.jsx';

it('Renders correctly', () => {
  const tree = renderer
      .create(
          <ProfilesList
            isActive={true}
            listType={MenuItem.PROFILES_NETWORK.id}
          />,
      )
      .toJSON();
  expect(tree).toMatchSnapshot();
});
