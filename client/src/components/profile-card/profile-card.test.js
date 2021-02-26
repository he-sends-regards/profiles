import React from 'react';
import renderer from 'react-test-renderer';
import {MenuItem} from '../../const.js';
import ProfileCard from './profile-card.jsx';

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
          <ProfileCard
            profile={profile}
            index={1}
            setIsProfileDataChanged={noop}
            setIsCardCreating={noop}
            isCardCreating={false}
            listType={MenuItem.MY_PROFILES}
          />,
      )
      .toJSON();
  expect(tree).toMatchSnapshot();
});
