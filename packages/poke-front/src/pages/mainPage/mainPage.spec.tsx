import { render } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import MainPage from './mainPage';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );

    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );

    expect(getByText(/Welcome poke-front/gi)).toBeTruthy();
  });
});
