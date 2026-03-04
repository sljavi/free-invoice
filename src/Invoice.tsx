import { addDays, format } from 'date-fns';
import { useState } from 'react';
import { getInvoiceDataFromURL } from './url';

import './Invoice.css';

interface InvoiceProps {
  onUpdateState: () => void;
}

const urldata = getInvoiceDataFromURL();

function Invoice({ onUpdateState }: InvoiceProps) {
  const [date, setDate] = useState(
    urldata.date || localStorage.getItem('date') || format(new Date(), 'MMM d, yyyy')
  );
  const [dueDate, setDueDate] = useState(
    urldata.dueDate || localStorage.getItem('dueDate') || format(new Date(), 'MMM d, yyyy')
  );
  const [number, setNumber] = useState(() => getInvoiceNumber());

  const updateState = (key: string, value: string) => {
    if (key === 'date') setDate(value);
    if (key === 'dueDate') setDueDate(value);
    if (key === 'number') setNumber(value);
    localStorage.setItem(key, value);
    onUpdateState();
  };

  const updateNumber = (event: React.FocusEvent<HTMLSpanElement>) => {
    const value = event.target.textContent || '';
    updateState('number', value);
    document.title = `Invoice ${value}`;
  };

  const onChangeDate = (event: React.FocusEvent<HTMLSpanElement>) => {
    updateState('date', event.target.textContent || '');
  };

  const set30days = () => {
    updateState('dueDate', format(addDays(new Date(), 30), 'MMM d, yyyy'));
  };

  const updateDueDate = (event: React.FocusEvent<HTMLSpanElement>) => {
    updateState('dueDate', event.target.textContent || '');
  };

  const increaseInvoiceNumber = () => {
    const digits = number.replace(/\D/g, '');
    if (!Number.isNaN(+digits)) {
      const incremented = +digits + 1;
      const updated = number.replace(digits, String(incremented));
      updateState('number', updated);
      document.title = `Invoice ${updated}`;
    }
  };

  return (
    <div className='invoice'>
      <p className='number'>
        <div className='controls'>
          <button className='left' onClick={increaseInvoiceNumber}>
            Increase
          </button>
        </div>
        <span>Invoice #: </span>
        <span className='invoiceNumber' contentEditable onBlur={updateNumber}>
          {number}
        </span>
      </p>
      <p className='date'>
        <div className='controls'>
          <button
            className='left'
            onClick={() => updateState('date', format(new Date(), 'MMM d, yyyy'))}
          >
            Set today
          </button>
        </div>
        <span>Date: </span>
        <span contentEditable onBlur={onChangeDate}>
          {date}
        </span>
      </p>
      <p className='due'>
        <div className='controls'>
          <button className='left' onClick={set30days}>
            Set 30 days
          </button>
        </div>
        <span>Due: </span>
        <span contentEditable onBlur={updateDueDate}>
          {dueDate}
        </span>
      </p>
    </div>
  );
}

function getInvoiceNumber(): string {
  const value = urldata.invNumber || localStorage.getItem('number') || 'INV-1';
  document.title = `Invoice ${value}`;
  return value;
}

export default Invoice;
