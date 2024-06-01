import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import UserContextProvider from './store/user-context';
import ReviewsContextProvider from './store/reviews-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <ReviewsContextProvider>
        <App />
      </ReviewsContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);

