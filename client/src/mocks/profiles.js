import {jest} from '@jest/globals';
import {MenuItem} from '../const';

export const mockFn = jest.fn();

export const mockProfiles = [
  {
    _id: '1',
    owner: 'hello@gmail.com',
    birthdate: '2021-02-13',
    gender: 'Male',
    name: 'Harry Potter',
    city: 'London',
  },
  {
    _id: '2',
    owner: 'hello2@gmail.com',
    birthdate: '1921-02-13',
    gender: 'Female',
    name: 'Quenn Elizabeth',
    city: 'London',
  },
];

export const ProfilesMockProps = {
  profiles: mockProfiles,
  listType: MenuItem.MY_PROFILES.id,
  onAddProfileClick: mockFn,
  setIsProfileDataChanged: mockFn,
  isCardCreating: false,
  setIsCardCreating: mockFn,
  activeCardForm: '1',
  setActiveCardForm: mockFn,
};
