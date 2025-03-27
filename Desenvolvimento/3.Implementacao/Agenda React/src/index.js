import React from 'react';
import App from './App';
import './index.css';
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <div class="main">
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  </div>
);