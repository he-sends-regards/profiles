import React from 'react';
import renderer from 'react-test-renderer';
import Dashboard from './dashboard.jsx';

it('Renders correctly without isActive prop', () => {
  const tree = renderer
      .create(<Dashboard isActive={false} />)
      .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Renders correctly with isActive prop', () => {
  const tree = renderer
      .create(<Dashboard isActive={true} />)
      .toJSON();
  expect(tree).toMatchSnapshot();
});
