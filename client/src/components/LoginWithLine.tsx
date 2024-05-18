import React from 'react';
import Image from 'next/image';
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
            onClick={handleLogin}
            style={{ cursor: 'pointer' }}
        >
            <Image
                src="/btn_login_base.png"
                alt="Line login button"
                priority={true}
                quality={100}
            />
        </div>
    );
};

export default LoginWithLine;
