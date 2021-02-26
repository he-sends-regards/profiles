import React from 'react';
import renderer from 'react-test-renderer';
import Account from './account.jsx';

it('renders correctly', () => {
  const tree = renderer
      .create(<Account />)
      .toJSON();
  expect(tree).toMatchSnapshot();
});
