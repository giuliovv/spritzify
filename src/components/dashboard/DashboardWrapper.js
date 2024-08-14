// src/components/DashboardWrapper.js

"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import Dashboard from './Dashboard';

const DashboardWrapper = ({ barId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push(`/login?barId=${barId}`);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, barId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null; // This will prevent a flash of content before redirect
  }

  return <Dashboard barId={barId} />;
};

export default DashboardWrapper;