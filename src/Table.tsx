import { useState } from 'react';
import GenerateRows from './GenerateRows';
import { getRowsFromURL } from './url';
import type { Row } from './url';

import './Table.css';

interface TableProps {
  onUpdateState: () => void;
}

const urlRows = getRowsFromURL();

function getRowList(): Row[] {
  const rows = localStorage.getItem('rows');
  if (rows) {
    try {
      return JSON.parse(rows) as Row[];
    } catch (err) {
      console.error(err);
      return [];
    }
  }
  return [];
}

function Table({ onUpdateState }: TableProps) {
  const [rows, setRows] = useState<Row[]>(() =>
    urlRows.length > 0 ? urlRows : getRowList()
  );
  const [showGenerateRowsModal, setShowGenerateRowsModal] = useState(false);

  const updateRows = (newRows: Row[]) => {
    setRows(newRows);
    localStorage.setItem('rows', JSON.stringify(newRows));
    onUpdateState();
  };

  const onChangeRowName = (event: React.FocusEvent<HTMLSpanElement>, aKey: Row['key']) => {
    updateRows(
      rows.map((row) =>
        row.key === aKey ? { ...row, name: event.currentTarget.textContent || '' } : row
      )
    );
  };

  const onChangeRowPrice = (event: React.FocusEvent<HTMLSpanElement>, aKey: Row['key']) => {
    updateRows(
      rows.map((row) =>
        row.key === aKey
          ? { ...row, price: parseFloat(event.currentTarget.textContent || '0') }
          : row
      )
    );
  };

  const addRow = () => {
    updateRows([...rows, { name: 'Daily work', price: 20, key: Date.now() }]);
  };

  const removeRow = (aKey: Row['key']) => {
    updateRows(rows.filter(({ key }) => aKey !== key));
  };

  const removeRows = () => {
    updateRows([]);
  };

  const toggleGenerateRowsModal = () => {
    setShowGenerateRowsModal((prev) => !prev);
  };

  const hideGenerateRowsModal = () => {
    setShowGenerateRowsModal(false);
  };

  const onGenerateRows = (newRows: Row[]) => {
    updateRows([...rows, ...newRows]);
  };

  const total = rows.reduce((count, { price }) => count + price, 0);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr className={String(row.key)} key={row.key}>
              <td>
                <span contentEditable onBlur={(e) => onChangeRowName(e, row.key)}>
                  {row.name}
                </span>
                <div className='controls'>
                  <button className='right' onClick={() => removeRow(row.key)}>
                    x
                  </button>
                </div>
              </td>
              <td>
                $
                <span contentEditable onBlur={(e) => onChangeRowPrice(e, row.key)}>
                  {row.price}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='add-row-table-controls'>
        <button className='left' onClick={addRow}>
          Add row
        </button>
      </div>
      <div className='generate-rows-table-controls'>
        <button className='left' onClick={toggleGenerateRowsModal}>
          Generate rows
        </button>
      </div>
      {showGenerateRowsModal && (
        <GenerateRows
          hideGenerateRowsModal={hideGenerateRowsModal}
          onGenerateRows={onGenerateRows}
          onUpdateState={onUpdateState}
        />
      )}
      {rows.length > 0 && (
        <div className='right-table-controls'>
          <button className='right' onClick={removeRows}>
            Remove rows
          </button>
        </div>
      )}
      <p className='total'>
        <span>Total: </span>
        <span className='total-number'>${total}</span>
      </p>
    </div>
  );
}

export default Table;
