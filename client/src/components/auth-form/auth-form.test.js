import React from 'react';
import renderer from 'react-test-renderer';
import AuthForm from './auth-form.jsx';

it('renders correctly', () => {
  const tree = renderer
      .create(<AuthForm />)
      .toJSON();
  expect(tree).toMatchSnapshot();
});
