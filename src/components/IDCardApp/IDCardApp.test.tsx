import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import IDCardApp from './IDCardApp';

describe('<IDCardApp />', () => {
  test('it should mount', () => {
    render(<IDCardApp />);
    
    const idCardApp = screen.getByTestId('IDCardApp');

    expect(idCardApp).toBeInTheDocument();
  });
});