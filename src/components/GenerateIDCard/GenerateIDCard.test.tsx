import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GenerateIDCard from './GenerateIDCard';

describe('<GenerateIDCard />', () => {
  test('it should mount', () => {
    render(<GenerateIDCard />);
    
    const generateIdCard = screen.getByTestId('GenerateIDCard');

    expect(generateIdCard).toBeInTheDocument();
  });
});