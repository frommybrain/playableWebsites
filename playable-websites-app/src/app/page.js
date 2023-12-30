'use client'
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation';
import { handleQueryResponse } from '../../utils/responseHandler';
import MainCanvas from './three/mainCanvas';

export default function Home() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Ensure this runs only on the client side
    if (typeof window !== 'undefined' && searchParams && searchParams.length > 0) {
      const queryParams = new URLSearchParams(window.location.search);
      const service = queryParams.get('service');
      const status = queryParams.get('status');
      handleQueryResponse(service, status);
    }
  }, [searchParams]);

  return (
    <main>
      <ToastContainer />
      <MainCanvas />
    </main>
  );
}