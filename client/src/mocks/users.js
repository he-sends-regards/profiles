import {jest} from '@jest/globals';

export const mockFn = jest.fn();

export const mockUsers = [
  {
    _id: '1',
    email: 'test@gmail.com',
    name: 'Dan Abramov',
    password: '123456',
    isAdmin: true,
  },
  {
    _id: '2',
    email: 'test2@gmail.com',
    name: 'Ivan Ivanov',
    password: '123456',
    isAdmin: false,
  },
];

export const UsersMockProps = {
  users: mockUsers,
  setIsUserDataChanged: mockFn,
};
