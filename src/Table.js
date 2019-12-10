import React from 'react';
import GenerateRows from './GenerateRows';

import './Table.css';

class Table extends React.PureComponent {

  getRowList = () => {
    const rows = localStorage.getItem('rows');
    if (rows) {
      try {
        return JSON.parse(rows);
      } catch (err) {
        console.error(err);
        return [];
      }
    }
    return [];
  }

  state = {
    rows: this.getRowList(),
    showGenerateRowsModal: false
  }

  onChangeRowName = (event, aKey) => {
    const rows = this.state.rows.map((row) => {
      if (row.key === aKey) {
        return {
          ...row,
          name: event.currentTarget.textContent
        }
      }
      return row;
    });
    this.updateRows(rows);
  }

  onChangeRowPrice = (event, aKey) => {
    const rows = this.state.rows.map((row) => {
      if (row.key === aKey) {
        return {
          ...row,
          price: parseFloat(event.currentTarget.textContent)
        }
      }
      return row;
    });
    this.updateRows(rows);
  }

  getRows = () => {
    return this.state.rows.map((row) => {
      return (
        <tr className={row.key}>
          <td>
            <span
              contentEditable
              onBlur={(e) => this.onChangeRowName(e, row.key)}
            >{row.name}</span>
            <div className='controls'>
              <button
                className='right'
                onClick={() => this.removeRow(row.key)}>x</button>
            </div>
          </td>
          <td>
            $
            <span
              contentEditable
              onBlur={(e) => this.onChangeRowPrice(e, row.key)}
            >
              {row.price}  
            </span>
          </td>
        </tr>
      );
    });
  }

  addRow = () => {
    const rows = [
      ...this.state.rows,
      {
        name: 'Daily work',
        price: 20,
        key: Date.now()
      }
    ]
    this.updateRows(rows);
  }

  getTotal = () => {
    return this.state.rows.reduce((count, {price}) => count + price, 0);
  }

  removeRow = (aKey) => {
    const rows = this.state.rows.filter(({key}) => aKey !== key);
    this.updateRows(rows);
  }

  removeRows = () => {
    this.updateRows([]);
  }

  toggleGenerateRowsModal = () => {
    this.setState({
      showGenerateRowsModal: !this.state.showGenerateRowsModal
    });
  }

  hideGenerateRowsModal = () => {
    this.setState({
      showGenerateRowsModal: false
    });
  }

  onGenerateRows = (rows) => {
    this.updateRows([
      ...this.state.rows,
      ...rows
    ]);
  }

  updateRows = (rows) => {
    this.setState({ rows });
    localStorage.setItem('rows', JSON.stringify(rows));
    this.props.onUpdateState();
  }

  render() {
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
            {this.getRows()}
          </tbody>
        </table>
        <div className='add-row-table-controls'>
          <button
            className='left'
            onClick={this.addRow}>Add row</button>
        </div>
        <div className='generate-rows-table-controls'>
          <button
            className='left'
            onClick={this.toggleGenerateRowsModal}
          >
            Generate rows
          </button>
        </div>
        {this.state.showGenerateRowsModal && (
          <GenerateRows
            hideGenerateRowsModal={this.hideGenerateRowsModal}
            onGenerateRows={this.onGenerateRows}
            onUpdateState={this.props.onUpdateState}
          />
        )}
        {this.state.rows.length > 0 && (
          <div className='right-table-controls'>
            <button
              className='right'
              onClick={this.removeRows}
            >Remove rows</button>
          </div>
        )}
        <p className='total'>
          <span>Total: </span>
          <span className='total-number'>${this.getTotal()}</span>
        </p>
      </div>
    );
  }
}

export default Table;
