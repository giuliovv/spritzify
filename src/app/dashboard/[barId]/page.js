// src/app/dashboard/[barId]

import { Suspense } from 'react';
import DashboardWrapper from '../../../components/DashboardWrapper';

export default function BarPage({ params }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardWrapper barId={params.barId} />
    </Suspense>
  );
}
