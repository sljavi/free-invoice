import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('getQueryParams', () => {
  it('returns empty object when no params', async () => {
    history.pushState({}, '', '/');
    const { getQueryParams } = await import('../url');
    expect(getQueryParams()).toEqual({});
  });

  it('returns parsed params', async () => {
    history.pushState({}, '', '/?foo=bar&baz=qux');
    const { getQueryParams } = await import('../url');
    expect(getQueryParams()).toMatchObject({ foo: 'bar', baz: 'qux' });
  });
});

describe('getInvoiceDataFromURL', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('formats number as INV-{n}', async () => {
    history.pushState({}, '', '/?number=5');
    const { getInvoiceDataFromURL } = await import('../url');
    expect(getInvoiceDataFromURL().invNumber).toBe('INV-5');
  });

  it('parses date from yyyy-MM-dd to MMM d, yyyy', async () => {
    history.pushState({}, '', '/?date=2024-01-15');
    const { getInvoiceDataFromURL } = await import('../url');
    expect(getInvoiceDataFromURL().date).toBe('Jan 15, 2024');
  });

  it('parses duedate from yyyy-MM-dd to MMM d, yyyy', async () => {
    history.pushState({}, '', '/?duedate=2024-02-15');
    const { getInvoiceDataFromURL } = await import('../url');
    expect(getInvoiceDataFromURL().dueDate).toBe('Feb 15, 2024');
  });

  it('returns undefined when params absent', async () => {
    history.pushState({}, '', '/');
    const { getInvoiceDataFromURL } = await import('../url');
    const result = getInvoiceDataFromURL();
    expect(result.invNumber).toBeUndefined();
    expect(result.date).toBeUndefined();
    expect(result.dueDate).toBeUndefined();
  });
});

describe('getRowsFromURL', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('parses rows=Work|100||Extra|50', async () => {
    history.pushState({}, '', '/?rows=Work|100||Extra|50');
    const { getRowsFromURL } = await import('../url');
    const rows = getRowsFromURL();
    expect(rows).toHaveLength(2);
    expect(rows[0]).toMatchObject({ name: 'Work', price: 100 });
    expect(rows[1]).toMatchObject({ name: 'Extra', price: 50 });
  });

  it('returns empty array when rows param absent', async () => {
    history.pushState({}, '', '/');
    const { getRowsFromURL } = await import('../url');
    expect(getRowsFromURL()).toEqual([]);
  });

  it('handles malformed input (missing price)', async () => {
    history.pushState({}, '', '/?rows=Work||Extra|50');
    const { getRowsFromURL } = await import('../url');
    const rows = getRowsFromURL();
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ name: 'Extra', price: 50 });
  });
});
