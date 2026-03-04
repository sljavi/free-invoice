import { addDays, differenceInDays, format, getDay, getUnixTime } from 'date-fns';
import { useState } from 'react';
import type { RangeKeyDict } from 'react-date-range';
import { DateRange } from 'react-date-range';
import type { Row } from './url';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './GenerateRows.css';

interface GenerateRowsProps {
  hideGenerateRowsModal: () => void;
  onGenerateRows: (rows: Row[]) => void;
  onUpdateState: () => void;
}

function GenerateRows({ hideGenerateRowsModal, onGenerateRows, onUpdateState }: GenerateRowsProps) {
  const [template, setTemplate] = useState(() => getTemplate());
  const [time, setTime] = useState(() => getTime());
  const [price, setPrice] = useState(() => getPrice());
  const [from, setFrom] = useState(() => getFrom());
  const [to, setTo] = useState(() => getTo());
  const [weekends, setWeekends] = useState(() => getWeekends());

  const canGenerateRows = () => {
    return differenceInDays(new Date(to), new Date(from)) > 0;
  };

  const generateRows = () => {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const difference = differenceInDays(toDate, fromDate) + 1;
    if (difference > 0) {
      const rows = [...new Array<undefined>(difference)]
        .map((_, index) => {
          const day = addDays(fromDate, index);
          if (!weekends || (weekends && getDay(day) >= 1 && getDay(day) <= 5)) {
            let timePart = '';
            let name = template;
            if (time) {
              timePart = format(day, time.replace('{{', '').replace('}}', ''));
              name = template.replace(time, timePart);
            }
            return {
              name,
              price,
              key: String(getUnixTime(day)),
            } as Row;
          }
          return undefined;
        })
        .filter((row): row is Row => row !== undefined);
      onGenerateRows(rows);
      hideGenerateRowsModal();
    }
  };

  const updateFrom = (date: Date) => {
    const fromTs = date.getTime();
    setFrom(fromTs);
    localStorage.setItem('from', String(fromTs));
    onUpdateState();
  };

  const updateTo = (date: Date) => {
    const toTs = date.getTime();
    setTo(toTs);
    localStorage.setItem('to', String(toTs));
    onUpdateState();
  };

  const updateTemplate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tmpl = event.target.value;
    const templateStart = tmpl.indexOf('{{');
    const templateEnd = tmpl.indexOf('}}');
    let timePart = '';
    if (templateStart >= 0 && templateStart < templateEnd) {
      timePart = tmpl.slice(templateStart, templateEnd + 2);
    }
    setTemplate(tmpl);
    setTime(timePart);
    localStorage.setItem('template', tmpl);
    localStorage.setItem('time', timePart);
    onUpdateState();
  };

  const onUpdatePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const p = parseFloat(event.target.value);
    setPrice(p);
    localStorage.setItem('price', String(p));
    onUpdateState();
  };

  const changeWeekends = (event: React.ChangeEvent<HTMLInputElement>) => {
    const w = event.target.checked;
    setWeekends(w);
    localStorage.setItem('weekends', String(w));
    onUpdateState();
  };

  const updateDates = (dates: RangeKeyDict) => {
    const selection = dates['selection'];
    if (selection.startDate) updateFrom(selection.startDate);
    if (selection.endDate) updateTo(selection.endDate);
  };

  return (
    <div>
      <div className="generate-rows-outside" onClick={hideGenerateRowsModal}></div>
      <div className="generate-rows">
        <label>
          <span>Template</span>
          <input type="text" value={template} onChange={updateTemplate} />
        </label>
        <label>
          <span>Amount</span>
          <input type="number" value={price} onChange={onUpdatePrice} />
        </label>
        <DateRange
          editableDateInputs
          onChange={updateDates}
          moveRangeOnFirstSelection={false}
          ranges={[
            {
              startDate: new Date(from),
              endDate: new Date(to),
              key: 'selection',
            },
          ]}
        />
        <label className="weekend">
          <span>
            <input type="checkbox" checked={weekends} onChange={changeWeekends} />
          </span>
          Exclude weekends
        </label>
        <p>
          <button onClick={generateRows} disabled={!canGenerateRows()}>
            Generate
          </button>
        </p>
      </div>
    </div>
  );
}

/** Migrate moment format tokens inside {{...}} to date-fns tokens */
function migrateTemplate(tmpl: string): string {
  return tmpl.replace(/\{\{([^}]+)\}\}/g, (_, fmt: string) => {
    const migrated = fmt.replace(/\bD\b/g, 'd').replace(/YYYY/g, 'yyyy');
    return `{{${migrated}}}`;
  });
}

function getTemplate(): string {
  const stored = localStorage.getItem('template');
  if (stored) return migrateTemplate(stored);
  return '{{MMM d, yyyy}} - Daily work';
}

function getTime(): string {
  const stored = localStorage.getItem('time');
  if (stored) return migrateTemplate(stored);
  return '{{MMM d, yyyy}}';
}

function getPrice(): number {
  const stored = localStorage.getItem('price');
  if (stored) {
    const price = parseFloat(stored);
    if (!isNaN(price)) return price;
  }
  return 100;
}

function getFrom(): number {
  const stored = localStorage.getItem('from');
  if (stored) {
    const from = +stored;
    if (!isNaN(from)) return from;
  }
  return Date.now();
}

function getTo(): number {
  const stored = localStorage.getItem('to');
  if (stored) {
    const to = +stored;
    if (!isNaN(to)) return to;
  }
  return Date.now();
}

function getWeekends(): boolean {
  if (localStorage.getItem('weekends')) {
    return localStorage.getItem('template') === 'true';
  }
  return true;
}

export default GenerateRows;
