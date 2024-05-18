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
