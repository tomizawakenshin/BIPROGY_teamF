import { User } from '@/types/data';
import baseAxios from 'axios';
import { QUESTION_STATE } from './assets';

const axios = baseAxios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export async function get<T>(path: string, session: string) {
  const response = await axios
    .get<T>(path, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    })
    .then((res) => res.data)
    .catch(() => null);
  return response;
}

export async function post<T>(path: string, session: string, data: any) {
  const response = await axios
    .post<T>(path, null, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
      data,
    })
    .then((res) => res.data)
    .catch(() => ({ message: 'エラーが発生しました' }));
  return response;
}

export async function getSession() {
  return localStorage.getItem('accessToken');
}

export async function setSession(accessToken: string) {
  localStorage.setItem('accessToken', accessToken);
}

export async function checkLogin(accessToken: string) {
  const res = await get(`${process.env.NEXT_PUBLIC_API_URL}/api/check-login`, accessToken);
  return res as any;
}

export async function getLoginState() {
  return localStorage.getItem('loginState');
}

export async function setLoginState(state: string) {
  localStorage.setItem('loginState', state);
}

export async function getAccessToken(data: string) {
  return await axios.post('https://api.line.me/oauth2/v2.1/token', data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_API_URL,
    },
  });
}

export async function getUserInfo(accessToken: string) {
  const res = await get('https://api.line.me/v2/profile', accessToken);
  return res as any;
}

export async function setUserInfo(userInfo: any, idToken: any) {
  const session = await getSession();
  if (!session) return { message: 'ユーザー情報を登録できませんでした' };
  const res = await post(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, session, {
    userId: userInfo.userId,
    displayName: userInfo.displayName,
    idToken: idToken,
  });
  return res;
}

export async function getPoint() {
  const session = await getSession();
  if (!session) return 0;

  const point = await get<number>(`${process.env.NEXT_PUBLIC_API_URL}/point`, session);
  return point ?? 0;
}

export async function usePoint(point: number) {
  const session = await getSession();
  if (!session) return { message: 'ポイントを使用できませんでした' };
  const res = await post(`${process.env.NEXT_PUBLIC_API_URL}/point`, session, { point });
  return res;
}

export async function startQuestion() {
  const session = await getSession();
  if (!session) return { message: '質問を開始できませんでした' };
  const res = await post(
    `${process.env.NEXT_PUBLIC_API_URL}/question`,
    session,
    QUESTION_STATE.START
  );
  return res;
}

export async function endQuestion() {
  const session = await getSession();
  if (!session) return { message: '質問を終了できませんでした' };
  const res = await post(
    `${process.env.NEXT_PUBLIC_API_URL}/question`,
    session,
    QUESTION_STATE.END
  );
  return res;
}

export async function getStatus() {
  const session = await getSession();
  if (!session) return '👍';

  const status = await get<string>(`${process.env.NEXT_PUBLIC_API_URL}/status`, session);
  return status ?? '👍';
}

export async function updateStatus(emoji: string) {
  const session = await getSession();
  if (!session) return { message: 'ステータスを更新できませんでした' };
  const res = await post(`${process.env.NEXT_PUBLIC_API_URL}/status`, session, { emoji });
  return res;
}

export async function getUsers() {
  // return [
  //   { name: 'user1', status: '👍', id: 1 },
  //   { name: 'user2', status: '😶', id: 2 },
  //   { name: 'user3', status: '😶', id: 3 },
  //   { name: 'user4', status: '💦', id: 4 },
  //   { name: 'user5', status: '🙆‍♀️', id: 5 },
  // ] as User[];
  const session = await getSession();
  if (!session) return [];
  const users = await get<User[]>(`${process.env.NEXT_PUBLIC_API_URL}/users`, session);
  return users ?? [];
}

export async function selectUser(id: number) {
  const session = await getSession();
  if (!session) return { message: 'ユーザーを選択できませんでした' };
  const res = await post(`${process.env.NEXT_PUBLIC_API_URL}/user/select`, session, { id });
  return res;
}
