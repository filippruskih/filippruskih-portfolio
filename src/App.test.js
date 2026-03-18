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

test('renders portfolio header', () => {
  render(<App />);
  const header = screen.getByRole('heading', { level: 1 });
  expect(header).toBeInTheDocument();
});

test('Back button exists', () => {
  render(<App />);
  const backButton = screen.getByText(/back to overview/i);
  expect(backButton).toBeInTheDocument();
});

test('shoot images render', () => {
  render(<App />);
  const images = screen.getAllByRole('img');
  expect(images.length).toBeGreaterThan(0);
});