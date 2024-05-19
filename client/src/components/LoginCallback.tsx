'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  getAccessToken,
  getLoginState,
  getSession,
  getUserInfo,
  setSession,
  setUserInfo,
} from '@/utils/fetcher';
import { Loading } from '@/components/loading';

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

      try {
        if (await getSession()) {
          router.push('/');
          return;
        }

        // アクセストークンの取得
        const response = await getAccessToken(data.toString());

        const accessToken = response.data.access_token;
        const idToken = response.data.id_token;

        await setSession(accessToken);

        // ユーザ情報を取得
        const userInfo = await getUserInfo(accessToken);

        // バックエンドにユーザ情報を送信してデータベースに登録及びログイン処理
        setUserInfo(userInfo, idToken);

        router.push('/');
      } catch (error) {
        console.error(error);
      }
    };

    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');

      if (state === (await getLoginState())) {
        // stateが正しいかチェック (認可リクエスト送信者本人であるか確認)
        await fetchAccessToken(code);
      } else {
        router.push('/login');
      }
    };

    handleCallback();
  }, [router]);

  return <Loading />;
};

export default LoginCallback;
