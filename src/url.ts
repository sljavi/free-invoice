import { format, parse } from 'date-fns';

export function getQueryParams(): Record<string, string> {
  return Object.fromEntries(new URL(window.location.href).searchParams);
}

const qp = getQueryParams();

export interface InvoiceURLData {
  invNumber: string | undefined;
  date: string | undefined;
  dueDate: string | undefined;
}

export interface Row {
  key: string | number;
  name: string;
  price: number;
}

/** Get Invoice data (number, date, due date) from the URL querystring */
export function getInvoiceDataFromURL(): InvoiceURLData {
  const invNumber = qp.number ? `INV-${qp.number}` : undefined;
  const date = qp.date
    ? format(parse(qp.date.replace(/-/g, ''), 'yyyyMMdd', new Date()), 'MMM d, yyyy')
    : undefined;
  const dueDate = qp.duedate
    ? format(parse(qp.duedate.replace(/-/g, ''), 'yyyyMMdd', new Date()), 'MMM d, yyyy')
    : undefined;

  return { invNumber, date, dueDate };
}

/**
 * Get the rows (description + price) from the URL querystring.
 *
 * - The descripcion and price of each row must be separated by "|"
 * - The different rows must be separated by "||"
 *
 */
export function getRowsFromURL(): Row[] {
  const urlItems = qp.rows;
  if (!urlItems) return [];

  const rows: Row[] = [];

  for (const line of urlItems.split('||')) {
    const [name, value] = line.split('|');
    const price = parseFloat(value);

    if (name && price && !isNaN(price)) rows.push({ name, price, key: random() });
  }

  return rows;
}

function random(): string {
  return `${Date.now()}${Math.floor(Math.random() * 100000)}`;
}
