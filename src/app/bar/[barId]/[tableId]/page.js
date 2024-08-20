import { Suspense } from 'react';
import OrderPage from '../../../../components/OrderPage';
import LoadingCircle from '../../../../components/LoadingCircle';

export default function BarPage({ params, searchParams }) {
  return (
    <>
      <Suspense fallback={<LoadingCircle />}>
        <OrderPage barId={params.barId} tableNumber={params.tableId} />
      </Suspense>
    </>
  );
}