/* eslint-disable no-console */
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import StudentDashboard from './StudentDB';

test('Dashboard page rendering', () => {
  render(<BrowserRouter><StudentDashboard /></BrowserRouter>);

  const logoutButton = screen.getByTestId('getLogout');
  expect(logoutButton).toBeInTheDocument();

  waitFor(() => expect(document.getElementsByClassName('available_tests')).toBeInTheDocument());
  console.log('examinations are available');
});
