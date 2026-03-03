import moment from 'moment';

export function getQueryParams() {
  return Object.fromEntries(new URL(window.location.href).searchParams);
}

const qp = getQueryParams();

/** Get Invoice data (number, date, due date) from the URL querystring */
export function getInvoiceDataFromURL() {
  const invNumber = qp.number ? `INV-${qp.number}` : undefined;
  const date = qp.date
    ? moment(qp.date, 'YYYY-MM-DD').format('MMM D, YYYY')
    : undefined;
  const dueDate = qp.duedate
    ? moment(qp.duedate, 'YYYY-MM-DD').format('MMM D, YYYY')
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
export function getRowsFromURL() {
  const urlItems = qp.rows;
  if (!urlItems) return [];

  const rows = [];

  for (const line of urlItems.split('||')) {
    const [name, value] = line.split('|');
    const price = parseFloat(value);

    if (name && price && !isNaN(price))
      rows.push({ name, price, key: random() });
  }

  return rows;
}

function random() {
  return `${Date.now()}${Math.floor(Math.random() * 100000)}`;
}
