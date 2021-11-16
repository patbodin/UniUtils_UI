import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ModalPopup from './ModalPopup';

describe('<ModalPopup />', () => {
  test('it should mount', () => {
    render(<ModalPopup onClose={null} show={false} />);
    
    const modalPopup = screen.getByTestId('ModalPopup');

    expect(modalPopup).toBeInTheDocument();
  });
});