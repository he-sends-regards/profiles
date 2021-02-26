import React from 'react';
import renderer from 'react-test-renderer';
import {ProfileFormType, MenuItem} from '../../../const.js';
import ProfileCardForm from './profile-card-form.jsx';

const profile = {
  _id: '1',
  owner: 'hello@gmail.com',
  birthdate: '2021-02-13',
  gender: 'Male',
  name: 'Harry Potter',
  city: 'London',
};

const noop = () => {};

it('Renders correctly', () => {
  const tree = renderer
      .create(
          <ProfileCardForm
            profile={profile}
            type={ProfileFormType.CREATE}
            listType={MenuItem.PROFILES_NETWORK.id}
            setIsProfileDataChanged={noop}
            setIsCardEditing={noop}
            setIsCardCreating={noop}
          />,
      )
      .toJSON();
  expect(tree).toMatchSnapshot();
});
