// src/app/login/page.js

import { Suspense } from 'react';
import Login from '../../components/dashboard/Login';
import LoadingCircle from '@/components/LoadingCircle';

export default function LoginPage() {
  return (
    <>
      <Suspense fallback={<LoadingCircle />}>
        <Login />
      </Suspense>
    </>
  );
}