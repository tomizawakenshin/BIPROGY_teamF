'use client';

import React, { useEffect, useState, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import { Loading } from '@/components/loading';

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
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/check-login`, {
          // TODO: エンドポイントはまだ適当
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.data.loggedIn) {
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
  }, [router, pathname]);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default CheckLogin;
