import { useState, useRef, useCallback } from 'react';

import Table from './Table';
import FromTo from './FromTo';
import Invoice from './Invoice';

import printer from './printer.svg';
import save from './save.svg';

function App() {
  const [title, setTitle] = useState(localStorage.getItem('title') || 'Invoice');
  const [saved, setSaved] = useState(0);
  const savedRef = useRef(0);

  const onUpdateState = useCallback(() => {
    setSaved(0);
    savedRef.current = 0;
    setTimeout(() => {
      const newSaved = Date.now() + 2 * 1000;
      savedRef.current = newSaved;
      setSaved(newSaved);
      setTimeout(() => {
        if (Date.now() > savedRef.current) {
          setSaved(0);
          savedRef.current = 0;
        }
      }, 2500);
    }, 300);
  }, []);

  const updateTitle = (event: React.FocusEvent<HTMLHeadingElement>) => {
    const newTitle = event.target.textContent || '';
    setTitle(newTitle);
    localStorage.setItem('title', newTitle);
    onUpdateState();
  };

  return (
    <div>
      <div className='App'>
        <div className='page'>
          <h1 contentEditable onBlur={updateTitle}>
            {title}
          </h1>
          <FromTo onUpdateState={onUpdateState} />
          <Invoice onUpdateState={onUpdateState} />
          <Table onUpdateState={onUpdateState} />
        </div>
        <img className='print' src={printer} onClick={() => window.print()} alt='print' />
      </div>
      {!!saved && <img className='save' src={save} alt='save' />}
    </div>
  );
}

export default App;
