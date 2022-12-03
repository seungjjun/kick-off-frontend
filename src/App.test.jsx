import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import App from './App';

const ko = {};

jest.mock('react-datepicker/dist/react-datepicker.css', () => null);

jest.mock('date-fns/esm/locale', () => () => ({
  ko,
}));

test('App', async () => {
  render((
    <MemoryRouter>
      <App />
    </MemoryRouter>
  ));
});
