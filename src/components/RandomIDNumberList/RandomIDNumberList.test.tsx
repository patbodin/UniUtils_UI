import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RandomIDNumberList from './RandomIDNumberList';

describe('<RandomIDNumberList />', () => {
  test('it should mount', () => {
    render(<RandomIDNumberList count={0} except={''} />);
    
    const randomIdNumberList = screen.getByTestId('RandomIDNumberList');

    expect(randomIdNumberList).toBeInTheDocument();
  });
});