import React from 'react';
import renderer from 'react-test-renderer';
import UsersList from './users-list.jsx';

it('Renders correctly when is active', () => {
  const tree = renderer
      .create(
          <UsersList
            isActive={true}
          />,
      )
      .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Renders correctly when is not active', () => {
  const tree = renderer
      .create(
          <UsersList
            isActive={false}
          />,
      )
      .toJSON();
  expect(tree).toMatchSnapshot();
});
