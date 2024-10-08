// src/components/dashboard/Login.js

"use client"
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import Footer from '../Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const barId = searchParams.get('barId');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push(barId ? `/dashboard/${barId}` : '/dashboard');
      }
    });

    return () => unsubscribe();
  }, [router, barId]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push(barId ? `/dashboard/${barId}` : '/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-900 text-white">
      <div className="flex-grow flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl mb-4">Admin Login</h2>
          {error && <p className="mb-4 text-red-500">{error}</p>}
          <div className="mb-4">
            <label className="block mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <button type="submit" className="w-full bg-white text-black font-bold p-2 rounded">
            Login
          </button>
        </form>
      </div>
      <Footer className="mt-8" />
    </div>
  );
};

export default Login;