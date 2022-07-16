/* eslint-disable no-console */
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Signup from './Signup';

test('Sign in page rendering', () => {
  render(<BrowserRouter><Signup /></BrowserRouter>);

  screen.queryAllByPlaceholderText('Full Name');
  screen.queryAllByPlaceholderText('Email');
  screen.queryAllByPlaceholderText('Password');
  screen.queryAllByPlaceholderText('Retype Password');

  const signInButton = screen.getByTestId('getSignin');
  expect(signInButton).toBeInTheDocument();
  console.log('Sign in button present!');

  const signUpButton = screen.getByTestId('getRegister');
  expect(signUpButton).toBeInTheDocument();
  console.log('Sign up button present!');
});
