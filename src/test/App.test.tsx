import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../App';

vi.mock('../url', () => ({
  getInvoiceDataFromURL: () => ({ invNumber: undefined, date: undefined, dueDate: undefined }),
  getRowsFromURL: () => [],
  getQueryParams: () => ({}),
}));

// Mock react-date-range to avoid CSS/DOM issues in jsdom
vi.mock('react-date-range', () => ({
  DateRange: () => <div data-testid='date-range' />,
}));

beforeEach(() => {
  localStorage.clear();
});

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('title h1 is contentEditable', () => {
    render(<App />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveAttribute('contenteditable', 'true');
  });

  it('save icon appears after title edit', async () => {
    vi.useFakeTimers();
    render(<App />);

    const h1 = screen.getByRole('heading', { level: 1 });
    fireEvent.blur(h1);

    // Before debounce — no save icon
    expect(screen.queryByAltText('save')).toBeNull();

    // After 300ms debounce
    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(screen.getByAltText('save')).toBeInTheDocument();

    vi.useRealTimers();
  });
});
