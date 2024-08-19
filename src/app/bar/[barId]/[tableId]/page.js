import { Suspense } from 'react';
import OrderPage from '../../../../components/OrderPage';
import Footer from '../../../../components/Footer';

export default function BarPage({ params, searchParams }) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <OrderPage barId={params.barId} tableNumber={params.tableId} />
      </Suspense>
      <Footer />
    </>
  );
}