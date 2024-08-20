"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';
import LoadingCircle from './LoadingCircle';

const AuthGuard = ({ children, barId }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        router.push(`/login${barId ? `?barId=${barId}` : ''}`);
      }
    });

    return () => unsubscribe();
  }, [router, barId]);

  if (loading) {
    return <LoadingCircle />;
  }

  return user ? children : null;
};

export default AuthGuard;