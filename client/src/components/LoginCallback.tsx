import React, { useEffect } from 'react';
import axios from 'axios';

// 認証後localhost:3000/calbackへリダイレクトされた際のコールバック関数
// アプリケーションの認可を行う(アクセストークンを取得しセッションに保存)
const Callback = () => {
    useEffect(() => {
        const fetchAccessToken = async (code) => {
            const clientId = process.env.REACT_APP_CHANNEL_ID;
            const clientSecret = process.env.REACT_APP_CHANNEL_SECRET;
            const redirectUri = 'http://localhost:3000/callback';

            try {
                // c.f. アクセストークンの取得：https://developers.line.biz/ja/docs/line-login/integrate-line-login/#get-access-token
                const response = await axios.post('https://api.line.me/oauth2/v2.1/token', null, {
                    params: {
                        grant_type: 'authorization_code',
                        code: code,
                        redirect_uri: redirectUri,
                        client_id: clientId,
                        client_secret: clientSecret
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                // c.f. レスポンス形式：https://developers.line.biz/ja/docs/line-login/integrate-line-login/#response
                sessionStorage.setItem('accessToken', response.data.access_token);
            } catch (error) {
                const errUrlPrams = new URLSearchParams(window.location.search);
                const errCode = errUrlPrams.get('error')
                console.error(errCode);
            }
        };

        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');

        if (state == sessionStorage.getItem('loginState')) {
            fetchAccessToken(code);
        }

        // c.f. ユーザー情報の取得：https://developers.line.biz/ja/docs/line-login/verify-id-token/
        // const userInfoResponse = await axios.get('https://api.line.me/v2/profile', {
        //     headers: {
        //         'Authorization': `Bearer ${accessToken}`
        //     }
        // });
    }, []);

    return (
        <div>
            <h1>ログイン処理中...</h1>
        </div>
    );
};

export default Callback;
