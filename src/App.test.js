import { render, screen } from '@testing-library/react';
import App from './App';

test('app renders', () => {
  render(<App />);
});

test('renders portfolio name', () => {
  render(<App />);
  const textElement = screen.getByText(/filipp/i);
  expect(textElement).toBeInTheDocument();
});
