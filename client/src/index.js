import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import App from './App';
import { CartProvider } from "./components/CartConText"


const stripePromise = loadStripe('pk_test_51NdIKuSJbYje4Wc4RXSguIZ760MbzHPidimvZjlqAWTeq1g8htI8gw7Ta65f4j5DXrlvweIJzVobgOUL2ThLbgsL00sCu8rKe3');


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </CartProvider>
  </React.StrictMode>
);


