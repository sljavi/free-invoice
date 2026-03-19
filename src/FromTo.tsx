import { useState } from 'react';

import './FromTo.css';

interface FromToProps {
  onUpdateState: () => void;
}

function FromTo({ onUpdateState }: FromToProps) {
  const [state, setState] = useState({
    fromName: localStorage.getItem('fromName') || 'Your name',
    fromAddress:
      localStorage.getItem('fromAddress') || '123 Street, City, State, Country, Zip Code',
    fromTelephone: localStorage.getItem('fromTelephone') || '(+1) 123 123 1234',
    fromEmail: localStorage.getItem('fromEmail') || 'your.mail@gmail.com',
    toName: localStorage.getItem('toName') || 'Company name',
    toAddress: localStorage.getItem('toAddress') || '123 Street, City, State, Country, Zip Code',
    toTelephone: localStorage.getItem('toTelephone') || '(+1) 123 123 1234',
    toEmail: localStorage.getItem('toEmail') || 'company@gmail.com',
  });

  const updateField = (key: keyof typeof state, event: React.FocusEvent<HTMLParagraphElement>) => {
    const value = event.target.textContent || '';
    setState((prev) => ({ ...prev, [key]: value }));
    localStorage.setItem(key, value);
    onUpdateState();
  };

  return (
    <div className='from-to'>
      <div className='from'>
        <h3>From</h3>
        <p className='name' contentEditable onBlur={(e) => updateField('fromName', e)}>
          {state.fromName}
        </p>
        <p className='address' contentEditable onBlur={(e) => updateField('fromAddress', e)}>
          {state.fromAddress}
        </p>
        <p className='telephone' contentEditable onBlur={(e) => updateField('fromTelephone', e)}>
          {state.fromTelephone}
        </p>
        <p className='email' contentEditable onBlur={(e) => updateField('fromEmail', e)}>
          {state.fromEmail}
        </p>
      </div>
      <div className='to'>
        <h3>To</h3>
        <p className='name' contentEditable onBlur={(e) => updateField('toName', e)}>
          {state.toName}
        </p>
        <p className='address' contentEditable onBlur={(e) => updateField('toAddress', e)}>
          {state.toAddress}
        </p>
        <p className='telephone' contentEditable onBlur={(e) => updateField('toTelephone', e)}>
          {state.toTelephone}
        </p>
        <p className='email' contentEditable onBlur={(e) => updateField('toEmail', e)}>
          {state.toEmail}
        </p>
      </div>
    </div>
  );
}

export default FromTo;
