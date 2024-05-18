"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// 認証後localhost:3000/callbackへリダイレクトされた際のコールバック関数
// アプリケーションの認可を行う(アクセストークンを取得しセッションに保存)
const LoginCallback: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        const fetchAccessToken = async (code: string | null) => {
            const clientId = process.env.NEXT_PUBLIC_CHANNEL_ID;
            const clientSecret = process.env.NEXT_PUBLIC_CHANNEL_SECRET;
            const redirectUri = 'http://localhost:3000/login/callback';
            const data = new URLSearchParams({
                grant_type: 'authorization_code',
                code: code || '',
                redirect_uri: redirectUri,
                client_id: clientId || '',
                client_secret: clientSecret || '',
            });
            console.log("data is " + JSON.stringify(data));

            try {
                // アクセストークンの取得
                const response = await axios.post('https://api.line.me/oauth2/v2.1/token', data.toString(), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                const accessToken = response.data.access_token;
                const idToken = response.data.id_token;

                sessionStorage.setItem('accessToken', accessToken);

                // ユーザ情報を取得
                const userInfoResponse = await axios.get('https://api.line.me/v2/profile', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                const userInfo = userInfoResponse.data;

                // バックエンドにユーザ情報を送信してデータベースに登録及びログイン処理
                await axios.post('http://localhost:3000/api/register', {
                    userId: userInfo.userId,
                    displayName: userInfo.displayName,
                    idToken: idToken
                });

                router.push('/');
            } catch (error) {
                console.error(error);
            }
        };

        const handleCallback = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            const state = urlParams.get('state');

            if (state === sessionStorage.getItem('loginState')) {
                await fetchAccessToken(code);
            }
        };

        handleCallback();
    }, [router]);

    return (
        <div>
            <h1>ログイン処理中...</h1>
        </div>
    );
};

export default LoginCallback;
