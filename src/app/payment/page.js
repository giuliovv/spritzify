// src/app/payment/page.js

import { Suspense } from 'react';
import PaymentPage from '../../components/PaymentPage';

export default function Payment() {
  return <Suspense fallback={<div>Loading...</div>}>
      <PaymentPage />
    </Suspense>;
}