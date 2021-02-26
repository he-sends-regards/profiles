import React from 'react';
import renderer from 'react-test-renderer';
import UserCard from './user-сard.jsx';

const user = {
  _id: '1',
  name: 'Dan',
  email: 'test@gmail.com',
  password: '123456',
  isAdmin: true,
};

const noop = () => {};

it('Renders correctly', () => {
  const tree = renderer
      .create(
          <UserCard
            user={user}
            setIsUserDataChanged={noop}
          />,
      )
      .toJSON();
  expect(tree).toMatchSnapshot();
});
