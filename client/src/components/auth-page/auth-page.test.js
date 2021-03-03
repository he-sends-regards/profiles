import React from 'react';
import {screen, render, fireEvent} from '@testing-library/react';
import AuthPage from './auth-page.jsx';

const setUp = () => render(<AuthPage />);

describe('Auth page tests', () => {
  beforeEach(() => {
    setUp();
  });

  it('Should render correctly', () => {
    expect(screen.getByTestId('auth-form')).toBeTruthy();
    expect(screen.getAllByRole('button').length).toBe(2);
  });

  it('Buttons should be clickable and become being disabled', () => {
    const authButtons = screen.getAllByRole('button');
    expect(fireEvent.click(authButtons[0])).toBe(true);
    expect(authButtons[0].disabled).toBe(true);
    expect(screen.getByTestId('form')).toBeTruthy();

    expect(fireEvent.click(authButtons[1])).toBe(true);
    expect(authButtons[1].disabled).toBe(true);
    expect(screen.getByTestId('form')).toBeTruthy();
  });
});
