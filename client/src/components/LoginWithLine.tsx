import React from 'react';
import GenerateRandomString from '@/utils/GenerateRandomString';

const LoginWithLine: React.FC = () => {
    const handleLogin = () => {
        const clientId = process.env.NEXT_PUBLIC_CHANNEL_ID;
        const redirectUri = encodeURIComponent('http://localhost:3000/login/callback');
        const state = GenerateRandomString(8); // セッションごとに固有のランダム文字列を生成
        sessionStorage.setItem('loginState', state); // stateをセッションストレージに保存
        const scope = 'profile%20openid';

        // c.f. https://developers.line.biz/ja/docs/line-login/integrate-line-login/
        const lineLoginUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;

        window.location.href = lineLoginUrl;
    };

    return (
        <div
            id="lineLoginButton"
            style={{
                width: '300px',
                height: '45px',
                background: 'url("https://developers.line.biz/media/sign_in_with_LINE_btn_medium.png") no-repeat center/contain',
                cursor: 'pointer'
            }}
            onClick={handleLogin}
        />
    );
};

export default LoginWithLine;
