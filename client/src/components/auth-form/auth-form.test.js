import React from 'react';
import {screen, render, fireEvent, act, waitFor} from '@testing-library/react';
import {jest} from '@jest/globals';

import AuthForm from './auth-form.jsx';

const AuthorizationType = {
  LOGIN: 'login',
  REGISTER: 'register',
};

const mockOnSubmit = jest.fn();

const setUp = (props = {
  formType: AuthorizationType.REGISTER,
  onSubmit: mockOnSubmit,
}) => render(<AuthForm {...props} />);

describe('Auth Form tests', () => {
  beforeEach(() => {
    setUp();
  });

  it('Should render correctly', () => {
    expect(screen.getAllByRole('button').length).toBe(1);
    expect(screen.getAllByRole('textbox')).toBeTruthy();
  });

  it('Appearence of required alert', async () => {
    act(() => {
      fireEvent.change(
          screen.getAllByRole('textbox')[0],
          {target: {value: ''}},
      );
      fireEvent.change(
          screen.getAllByRole('textbox')[1],
          {target: {value: ''}},
      );
      fireEvent.change(
          screen.queryByTestId('password-field'),
          {target: {value: ''}},
      );
    });

    await waitFor(() => {
      fireEvent.submit(screen.getByTestId('form'));
    });

    const reqMessages = await screen.findAllByText('This is required');
    expect(reqMessages.length).toBe(3);
  });

  it('Appearence of minLength alert', async () => {
    act(() => {
      fireEvent.change(
          screen.getAllByRole('textbox')[0],
          {target: {value: 'q'}},
      );
      fireEvent.change(
          screen.queryByTestId('password-field'),
          {target: {value: 'q'}},
      );
    });

    await waitFor(() => {
      fireEvent.submit(screen.getByTestId('form'));
    });

    const reqMessages = await screen.findAllByText('Min length exceeded');
    expect(reqMessages.length).toBe(2);
  });

  it('Appearence of maxLength alert', async () => {
    act(() => {
      fireEvent.change(
          screen.getAllByRole('textbox')[0],
          {target: {value: 'qwerty'}},
      );
      fireEvent.change(
          screen.getAllByRole('textbox')[1],
          {target: {value: 'test@gmail.com'}},
      );
      fireEvent.change(
          screen.queryByTestId('password-field'),
          {target: {value: '123456789123456123456123123123'}},
      );
    });

    await waitFor(() => {
      fireEvent.submit(screen.getByTestId('form'));
    });

    const reqMessages = await screen.findByText('Max length exceeded');
    expect(reqMessages).toBeTruthy();
  });

  it('On sumbit call', async () => {
    fireEvent.change(
        screen.queryAllByRole('textbox')[0],
        {target: {value: 'Harry'}},
    );
    fireEvent.change(
        screen.queryAllByRole('textbox')[1],
        {target: {value: 'test@gmail.com'}},
    );
    fireEvent.change(
        screen.queryByTestId('password-field'),
        {target: {value: '123456'}},
    );
    await waitFor(() => {
      fireEvent.submit(screen.getByTestId('form'));
    });

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
