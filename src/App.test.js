import { render, screen } from '@testing-library/react';
import Home from './components/HomePage/HomePage';

test('renders learn react link', () => {
  render(<Home />);
  const linkElement = screen.getByText(/what we offer/i);
  expect(linkElement).toBeInTheDocument();
});
