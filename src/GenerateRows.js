import React from 'react';
import moment from 'moment';

import './GenerateRows.css';

class GenerateRows extends React.PureComponent {

  getTemplate = () => {
    if (localStorage.getItem('template')) {
      return localStorage.getItem('template');
    }
    return '{{MMM D, YYYY}} - Daily work';
  }

  getTime = () => {
    if (localStorage.getItem('time')) {
      return localStorage.getItem('time');
    }
    return '{{MMM D, YYYY}}';
  }

  getPrice = () => {
    if (localStorage.getItem('price')) {
      const price = parseFloat(localStorage.getItem('price'));
      if (!isNaN(price)) {
        return price;
      }
    }
    return 100;
  }

  getFrom = () => {
    if (localStorage.getItem('from')) {
      const from = +localStorage.getItem('from');
      if (!isNaN(from)) {
        return from;
      }
    }
    return Date.now();
  }

  getTo = () => {
    if (localStorage.getItem('to')) {
      const to = +localStorage.getItem('to');
      if (!isNaN(to)) {
        return to;
      }
    }
    return Date.now();
  }

  getWeekends = () => {
    if (localStorage.getItem('weekends')) {
      return localStorage.getItem('template') === 'true';
    }
    return true;
  }

  state = {
    template: this.getTemplate(),
    time: this.getTime(),
    price: this.getPrice(),
    from: this.getFrom(),
    to: this.getTo(),
    weekends: this.getWeekends()
  }

  canGenerateRows = () => {
    const from = moment(this.state.from);
    const to = moment(this.state.to);
    const difference = to.diff(from, 'days');
    return difference > 0;
  }

  generateRows = () => {
    const from = moment(this.state.from);
    const to = moment(this.state.to);
    const difference = to.diff(from, 'days') + 1;
    if (difference > 0) {
      const rows = [...(new Array(difference))].map((nothing, index) => {
        const day = moment(from).add(index, 'day');
        if (!this.state.weekends || (this.state.weekends && day.day() >= 1 && day.day() <= 5)) {
          let time = '';
          let name = this.state.template;
          if (this.state.time) {
            time = day.format(this.state.time.replace('{{', '').replace('}}', ''));
            name = this.state.template.replace(this.state.time, time);
          }
          return {
            name,
            price: this.state.price,
            key: day.format('X')
          }
        }
      }).filter(row => row);
      this.props.onGenerateRows(rows);
      this.props.hideGenerateRowsModal();
    }
  }

  updateFrom = (event) => {
    const from = new Date(event.target.value).getTime();
    this.setState({from});
    localStorage.setItem('from', from);
    this.props.onUpdateState();
  }

  updateTo = (event) => {
    const to = new Date(event.target.value).getTime()
    this.setState({to});
    localStorage.setItem('to', to);
    this.props.onUpdateState();
  }

  updateTemplate = (event) => {
    const template = event.target.value
    const templateStart = template.indexOf('{{');
    const templateEnd = template.indexOf('}}');
    let time = '';
    if (templateStart >= 0 && templateStart < templateEnd) {
      time = template.slice(templateStart, templateEnd + 2);
    }
    this.setState({ template, time });
    localStorage.setItem('template', template);
    localStorage.setItem('time', time);
    this.props.onUpdateState();
  }

  onUpdatePrice = (event) => {
    const price = parseFloat(event.target.value);
    this.setState({price});
    localStorage.setItem('price', price);
    this.props.onUpdateState();
  }

  changeWeekends = (event) => {
    const weekends = event.target.checked;
    this.setState({weekends});
    localStorage.setItem('weekends', weekends);
    this.props.onUpdateState();
  }

  render() {
    return (
      <div>
        <div
          className='generate-rows-outside'
          onClick={this.props.hideGenerateRowsModal}
        ></div>
        <div className='generate-rows'>
          <label>
            <span>Template</span>
            <input
              type='text'
              value={this.state.template}
              onChange={this.updateTemplate}
            />
          </label>
          <label>
            <span>Amount</span>
            <input
              type='number'
              value={this.state.price}
              onChange={this.onUpdatePrice}
            />
          </label>
          <label>
            <span>From</span>
            <input
              type='date'
              value={moment(this.state.from).format('YYYY-MM-DD')}
              onChange={this.updateFrom}
            />
          </label>
          <label>
            <span>To</span>
            <input
              type='date'
              value={moment(this.state.to).format('YYYY-MM-DD')}
              onChange={this.updateTo}
            />
          </label>
          <label>
            <span>
              <input
                type='checkbox'
                checked={this.state.weekends}
                onChange={this.changeWeekends}
              />
            </span>
            Exclude weekends
          </label>
          <p>
            <button
              onClick={this.generateRows}
              disabled={!this.canGenerateRows()}
            >
              Generate
            </button>
          </p>
        </div>
      </div>
    );
  }
}

export default GenerateRows;
