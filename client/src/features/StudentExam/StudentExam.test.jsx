/* eslint-disable no-console */
import { render, waitFor, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ListQues from './ListQues';

test('Examination page', () => {
  render(<BrowserRouter><ListQues /></BrowserRouter>);

  waitFor(() => {
    expect(document.getElementById('timer')).toBeInTheDocument();
    console.log('Timer visible');

    expect(document.getElementsByClassName('questionName')).toBeInTheDocument();
    console.log('Question visible');

    expect(document.getElementById('navigator')).toBeInTheDocument();
    console.log('Pagination is visible');

    expect(document.getElementsByClassName('question')).toBeInTheDocument();
    console.log('Drag and Drop is visible');
  });

  const nextButton = screen.getByTestId('nextButton');
  const prevButton = screen.getByTestId('prevButton');

  expect(nextButton).toBeInTheDocument();
  expect(prevButton).toBeInTheDocument();
  console.log('Next and Previous buttons are visible');
});
