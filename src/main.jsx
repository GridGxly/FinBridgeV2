import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./i18n.js";

import { Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<div className="h-screen w-screen bg-white"></div>}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>,
)
