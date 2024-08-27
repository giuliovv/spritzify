// src/components/dashboard/DashboardWrapper.js

"use client"
import { useEffect, useState } from 'react'; // Ensure useState is imported
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import Dashboard from './Dashboard';
import Footer from '../Footer'; // Import Footer
import LoadingCircle from '../LoadingCircle';
import Header from './Header'; // Import Header

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
    return (
        <LoadingCircle />
    );
  }

  if (!user) {
    return null; // Prevents a flash of content before redirect
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-400 to-teal-300">
      <Header barId={barId} /> {/* Add the Header component */}
      <div className="flex-grow">
        <Dashboard barId={barId} />
      </div>
      <Footer className="mt-8" />
    </div>
  );
};

export default DashboardWrapper;