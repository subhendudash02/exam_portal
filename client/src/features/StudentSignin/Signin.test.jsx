/* eslint-disable no-console */
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Signin from './Signin';

test('Sign in page rendering', () => {
  render(<BrowserRouter><Signin /></BrowserRouter>);

  screen.queryAllByPlaceholderText('Email');
  screen.queryAllByPlaceholderText('Password');

  const signInButton = screen.getByTestId('getSignin');
  expect(signInButton).toBeInTheDocument();
  console.log('Sign in button present!');

  const signUpButton = screen.getByTestId('getSignup');
  expect(signUpButton).toBeInTheDocument();
  console.log('Sign up button present!');
});
