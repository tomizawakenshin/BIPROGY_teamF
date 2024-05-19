'use client';

import React, { useEffect, useState, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Loading } from '@/components/loading';
import { checkLogin } from '@/utils/fetcher';

interface CheckLoginProps {
  children: ReactNode;
}

const CheckLogin: React.FC<CheckLoginProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkLoginStatus = async () => {
      if (isLoggedIn && pathname !== '/') {
        setLoading(false);
        router.push('/');
        return;
      }

      if (pathname === '/login' || pathname === '/login/callback') {
        setLoading(false);
        return;
      }

      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        router.push('/login');
        return;
      }

      try {
        const response = await checkLogin(accessToken);

        if (response?.loggedIn) {
          setIsLoggedIn(true);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error(error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, [router, pathname, isLoggedIn]);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default CheckLogin;
