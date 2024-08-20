// src/components/LoadingCircle.js
import React from 'react';

export default function LoadingCircle() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-400 to-teal-300">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-white"></div>
    </div>
  );
}