import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { QuoteProvider } from './context/QuoteContext.jsx';
import './global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/LEADERWG">
      <QuoteProvider>
        <App />
      </QuoteProvider>
    </BrowserRouter>
  </React.StrictMode>
);
