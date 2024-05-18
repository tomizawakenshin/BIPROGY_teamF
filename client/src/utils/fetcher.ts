import { User } from '@/types/data';
import axios from 'axios';

export async function getPoint() {
  // TODO: ユーザーのポイントを取得する
  return 100;
}

export async function startQuestion() {
  // TODO: 質問状態を開始にする
  return { message: '質問を開始しました' };
}

export async function endQuestion() {
  // TODO: 質問状態を終了にする
  return { message: '質問を終了しました' };
}

export async function getStatus() {
  // TODO: ステータスを取得する
  return { status: '🙅‍♀️' };
}

export async function updateStatus(path: string) {
  // TODO: ステータスを変更する
  return { message: 'ステータスを変更しました' };
}

export async function getUsers() {
  // TODO: ユーザー一覧を取得する
  return [
    { name: 'user1', status: '🙅‍♀️', id: 1 },
    { name: 'user2', status: '🙆‍♀️', id: 2 },
    { name: 'user3', status: '🙆‍♀️', id: 3 },
    { name: 'user4', status: '🙅‍♀️', id: 4 },
    { name: 'user5', status: '🙆‍♀️', id: 5 },
  ] as User[];
}

export async function selectUser(id: number) {
  // TODO: ユーザーを選択する
  return { message: 'ユーザーを選択しました' };
}
