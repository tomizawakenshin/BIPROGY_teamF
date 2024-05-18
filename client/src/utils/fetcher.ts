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
  return { status: '質問対応中🙅‍♀️' };
}

export async function updateStatus(path: string) {
  // TODO: ステータスを変更する
  return { message: 'ステータスを変更しました' };
}

export async function getUsers() {
  // TODO: ユーザー一覧を取得する
  return [
    { name: 'user1', status: '質問対応中🙅‍♀️', id: 1 },
    { name: 'user2', status: '待機中🙆‍♀️', id: 2 },
    { name: 'user3', status: '待機中🙆‍♀️', id: 3 },
    { name: 'user4', status: '質問対応中🙅‍♀️', id: 4 },
    { name: 'user5', status: '待機中🙆‍♀️', id: 5 },
  ];
}

export async function selectUser(id: number) {
  // TODO: ユーザーを選択する
  return { message: 'ユーザーを選択しました' };
}
