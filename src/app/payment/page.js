// src/app/payment/page.js

import { Suspense } from 'react';
import PaymentPage from '../../components/PaymentPage';
import LoadingCircle from '@/components/LoadingCircle';

export default function Payment() {
  return (
    <>
      <Suspense fallback={<LoadingCircle />}>
        <PaymentPage />
      </Suspense>
    </>
  );
}