// src/app/dashboard/[barId]/page.js

import { Suspense } from 'react';
import DashboardWrapper from '../../../components/dashboard/DashboardWrapper';
import Footer from '../../../components/Footer';

export default function BarPage({ params }) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardWrapper barId={params.barId} />
      </Suspense>
    </>
  );
}