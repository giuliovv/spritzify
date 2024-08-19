// src/app/dashboard/[barId]/page.js

import { Suspense } from 'react';
import DashboardWrapper from '../../../components/dashboard/DashboardWrapper';
import LoadingCircle from '@/components/LoadingCircle';

export default function BarPage({ params }) {
  return (
    <>
      <Suspense fallback={<LoadingCircle />}>
        <DashboardWrapper barId={params.barId} />
      </Suspense>
    </>
  );
}