import { render, screen } from '@testing-library/react';
import App from './App';

test('app renders', () => {
  render(<App />);
});

test('renders portfolio name', () => {
  render(<App />);
  const textElements = screen.getAllByText(/filipp/i);
  expect(textElements.length).toBeGreaterThan(0);
});