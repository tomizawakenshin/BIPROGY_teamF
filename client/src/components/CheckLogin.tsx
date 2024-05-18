import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const CheckLogin: React.FC = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const checkLoginStatus = async () => {
            const accessToken = sessionStorage.getItem('accessToken');
            if (!accessToken) {
                history.push('/login');
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
                    history.push('/login');
                }
            } catch (error) {
                console.error(error.message);
                history.push('/login');
            } finally {
                setLoading(false);
            }
        };

        checkLoginStatus();
    }, [history]);

    if (loading) {
        return <div>Loading...</div>;
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
