/* eslint-disable no-console */
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import Home from './Home';

test('Home page rendering', () => {
  render(<BrowserRouter><Home /></BrowserRouter>);

  const heading = screen.getByText('Welcome to the portal');
  expect(heading).toBeInTheDocument();
  console.log('Heading present!');

  const signInButton = screen.getByTestId('getSignin');
  expect(signInButton).toBeInTheDocument();
  console.log('Sign in button present!');

  userEvent.click(signInButton);
});
