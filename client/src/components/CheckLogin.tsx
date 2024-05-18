import React, { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface CheckLoginProps {
    children: ReactNode;
}

const CheckLogin: React.FC<CheckLoginProps> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkLoginStatus = async () => {
            const accessToken = sessionStorage.getItem('accessToken');
            if (!accessToken) {
                router.push('/login');
                return;
            }

            try {
                const response = await axios.get('http://localhost:3000/api/check-login', { // TODO: エンドポイントはまだ適当
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
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
    }, [router]);

    if (loading) {
        return <div>読込中...</div>;
    }

    if (!isLoggedIn) {
        return null;
    }

    return <>{children}</>;
};

export default CheckLogin;

// 以下のようにログイン状態でないと見れない要素をCheckLoginで囲う
// 未ログイン状態だったらログインページ'/login'にリダイレクトする
// <CheckLogin>
//    <ProtectedComponent />
// </CheckLogin>
