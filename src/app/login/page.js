// src/app/login/page.js

import { Suspense } from 'react';
import Login from '../../components/dashboard/Login';
import Footer from '../../components/Footer';

export default function LoginPage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
      <Footer />
    </>
  );
}