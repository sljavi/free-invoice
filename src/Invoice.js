import React from 'react';
import moment from 'moment';

import './Invoice.css';

class Invoice extends React.PureComponent {

  getInvoiceNumber = () => {
    const value = localStorage.getItem('number') || 'INV-1';
    document.title = `Invoice ${value}`;
    return value;
  }

  state = {
    date: localStorage.getItem('date') || moment().format('MMM D, YYYY'),
    dueDate: localStorage.getItem('dueDate') || moment().format('MMM D, YYYY'),
    number: this.getInvoiceNumber()
  }

  updateState = (key, value ) => {
    this.setState({[key]: value});
    localStorage.setItem(key, value);
    this.props.onUpdateState();
  }

  updateNumber = (event) => {
    const value = event.target.textContent;
    this.updateState('number', value);
    document.title = `Invoice ${value}`;
  }

  onChangeDate = (event) => {
    const value = event.target.textContent;
    this.updateState('date', value);
  }

  getDueDate = () => {
    return moment(this.state.dueDate).format('MMM D, YYYY')
  }

  set30days = () => {
    const date = moment().add(30, 'days').format('MMM D, YYYY');
    this.updateState('dueDate', date);
  }

  updateDueDate = (event) => {
    const value = event.target.textContent;
    this.updateState('dueDate', value);
  }

  increaseInvoiceNumber = () => {
    const text = this.state.number;
    const number = text.replace(/\D/g,'');
    if (!Number.isNaN(+number)) {
      const incrementedNumber = +number + 1;
      const updatedText = text.replace(number, incrementedNumber);
      this.updateState('number', updatedText);
    }
  }

  render() {
    return (
      <div className='invoice'>
        <p className='number'>
          <div className='controls'>
            <button
              className='left'
              onClick={this.increaseInvoiceNumber}
            >Increase</button>
          </div>
          <span>Invoice #: </span>
          <span
            className='invoiceNumber'
            contentEditable
            onBlur={this.updateNumber}
          >
            {this.state.number}
          </span>
        </p>
        <p className='date'>
          <div className='controls'>
            <button
              className='left'
              onClick={() => this.updateState('date', moment().format('MMM D, YYYY'))}
            >Set today</button>
          </div>
            <span>Date: </span>
            <span contentEditable onBlur={this.onChangeDate}>
              {this.state.date}
            </span>
        </p>
        <p className='due'>
          <div className='controls'>
            <button
              className='left'
              onClick={this.set30days}>Set 30 days</button>
          </div>
          <span>Due: </span>
          <span
            contentEditable
            onBlur={this.updateDueDate}
          >
            {this.state.dueDate}
          </span>
        </p>
      </div>
    );
  }
}

export default Invoice;
