import React from 'react';
import {MenuItem} from '../../const.js';
import {screen, render, fireEvent, act, waitFor} from '@testing-library/react';
import ProfilesList from './profiles-list.jsx';
import {mockProfiles, ProfilesMockProps} from '../../mocks/profiles.js';

const setUp = (props=ProfilesMockProps) => render(<ProfilesList {...props} />);

describe('Profiles list tests', () => {
  it('MyProfiles list should render correctly', () => {
    setUp();
    expect(screen.getAllByTestId('profile-card').length).toBe(2);
    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('ProfilesNetwork list should render correctly', () => {
    setUp(Object.assign(
        {},
        ProfilesMockProps,
        {listType: MenuItem.PROFILES_NETWORK.id},
    ));

    expect(screen.getAllByTestId('profile-card').length).toBe(2);
    expect(screen.queryByRole('button')).toBe(null);
  });

  it('Click on profile edit should replace one card with form', async () => {
    setUp();
    act(() => {
      fireEvent.click(
          screen.getAllByTestId('profile-card__edit-btn')[0],
      );
    });

    expect(screen.queryByTestId('profile-card-edit')).toBeTruthy();
    expect(screen.queryAllByTestId('profile-card').length).toBe(
        mockProfiles.length - 1,
    );
  });

  it('Click on close btn should replace one form with common card',
      async () => {
        setUp();
        act(() => {
          fireEvent.click(
              screen.getAllByTestId('profile-card__edit-btn')[0],
          );
        });

        await waitFor(() => {
          fireEvent.click(
              screen.queryByTestId('profile-card-edit__close-img'),
          );
        });

        expect(screen.queryAllByTestId('profile-card').length).toBe(
            mockProfiles.length,
        );
      });
});

const setUpForCreateForm = () => setUp(Object.assign(
    {},
    ProfilesMockProps,
    {
      isCardCreating: true,
      activeCardForm: null,
    },
));

describe('Profile creation form tests', () => {
  it('Should render create form', () => {
    setUpForCreateForm();
    expect(screen.getByTestId('profile-card-edit')).toBeTruthy();
  });

  it('Isminuired alert should appear twice', async () => {
    setUpForCreateForm();
    act(() => {
      fireEvent.change(
          screen.getAllByRole('textbox')[0],
          {target: {value: ''}},
      );
      fireEvent.change(
          screen.getAllByRole('textbox')[1],
          {target: {value: ''}},
      );
    });

    await waitFor(() => {
      fireEvent.submit(screen.getByTestId('profile-card-edit'));
    });

    const reqMessages = await screen.findAllByText('This is required');
    expect(reqMessages.length).toBe(2);
  });
});
