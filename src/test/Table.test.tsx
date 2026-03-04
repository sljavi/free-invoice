import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Table from '../Table';

vi.mock('../url', () => ({
  getRowsFromURL: () => [],
  getQueryParams: () => ({}),
}));

vi.mock('react-date-range', () => ({
  DateRange: () => <div data-testid='date-range' />,
}));

const noop = () => {};

beforeEach(() => {
  localStorage.clear();
});

describe('Table', () => {
  it('renders with no rows and total $0', () => {
    render(<Table onUpdateState={noop} />);
    expect(screen.getByText('$0')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Remove rows' })).toBeNull();
  });

  it('Add row adds a row and total updates', () => {
    render(<Table onUpdateState={noop} />);
    fireEvent.click(screen.getByRole('button', { name: 'Add row' }));
    expect(screen.getByText('Daily work')).toBeInTheDocument();
    expect(screen.getByText('$20')).toBeInTheDocument();
  });

  it('adding multiple rows totals all prices', () => {
    render(<Table onUpdateState={noop} />);
    fireEvent.click(screen.getByRole('button', { name: 'Add row' }));
    fireEvent.click(screen.getByRole('button', { name: 'Add row' }));
    fireEvent.click(screen.getByRole('button', { name: 'Add row' }));
    expect(screen.getByText('$60')).toBeInTheDocument();
  });

  it('editing a row price recalculates total', () => {
    render(<Table onUpdateState={noop} />);
    fireEvent.click(screen.getByRole('button', { name: 'Add row' }));
    fireEvent.click(screen.getByRole('button', { name: 'Add row' }));

    // Find the price span (shows "20")
    const priceSpan = screen.getAllByText('20')[0];
    
    expect(screen.getByText('$40')).toBeInTheDocument();

    // Simulate contentEditable edit
    Object.defineProperty(priceSpan, 'textContent', { value: '50', configurable: true });
    fireEvent.blur(priceSpan);

    expect(screen.getByText('$70')).toBeInTheDocument();
  });

  it('Remove rows button clears all rows and resets total to $0', () => {
    render(<Table onUpdateState={noop} />);
    fireEvent.click(screen.getByRole('button', { name: 'Add row' }));
    fireEvent.click(screen.getByRole('button', { name: 'Add row' }));

    fireEvent.click(screen.getByRole('button', { name: 'Remove rows' }));

    expect(screen.getByText('$0')).toBeInTheDocument();
    expect(screen.queryByText('Daily work')).toBeNull();
    expect(screen.queryByRole('button', { name: 'Remove rows' })).toBeNull();
  });
});
