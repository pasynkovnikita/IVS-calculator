import React from 'react';
import ReactDOM from 'react-dom/client';
import CalculatorApp from './App';

import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<CalculatorApp />);
