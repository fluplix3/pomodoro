import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Statistic from './pages/Statistic/Statistic';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';
import { rootReducer } from './store/rootReducer';

const store = createStore(rootReducer)
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/pomodoro' />} />
          <Route path='/pomodoro' element={<App />} />
          <Route path='/pomodoro/statistic' element={<Statistic />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

