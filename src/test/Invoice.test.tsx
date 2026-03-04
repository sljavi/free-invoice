import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { format, addDays } from 'date-fns';
import Invoice from '../Invoice';

vi.mock('../url', () => ({
  getInvoiceDataFromURL: () => ({ invNumber: undefined, date: undefined, dueDate: undefined }),
  getQueryParams: () => ({}),
}));

const noop = () => {};

beforeEach(() => {
  localStorage.clear();
});

describe('Invoice', () => {
  it('renders invoice number, date, due date', () => {
    render(<Invoice onUpdateState={noop} />);
    expect(screen.getByText(/Invoice #:/)).toBeInTheDocument();
    expect(screen.getByText(/Date:/)).toBeInTheDocument();
    expect(screen.getByText(/Due:/)).toBeInTheDocument();
    expect(screen.getByText('INV-1')).toBeInTheDocument();
  });

  it('Increase button increments the invoice number', () => {
    render(<Invoice onUpdateState={noop} />);
    const btn = screen.getByRole('button', { name: 'Increase' });
    fireEvent.click(btn);
    expect(screen.getByText('INV-2')).toBeInTheDocument();
  });

  it('Set today button sets today\'s date', () => {
    render(<Invoice onUpdateState={noop} />);
    const btn = screen.getByRole('button', { name: 'Set today' });
    fireEvent.click(btn);
    const today = format(new Date(), 'MMM d, yyyy');
    // There are multiple spans with today's date (date and dueDate default to today)
    const dateSpans = screen.getAllByText(today);
    expect(dateSpans.length).toBeGreaterThan(0);
  });

  it('Set 30 days button sets due date 30 days from now', () => {
    render(<Invoice onUpdateState={noop} />);
    const btn = screen.getByRole('button', { name: 'Set 30 days' });
    fireEvent.click(btn);
    const expected = format(addDays(new Date(), 30), 'MMM d, yyyy');
    expect(screen.getByText(expected)).toBeInTheDocument();
  });
});
