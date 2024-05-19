export type Emoji = {
  label: string;
  text: string;
  path: string;
};

export const emojis: Emoji[] = [
  {
    label: '🙅‍♀️',
    text: '質問対応中',
    path: '/x',
  },
  {
    label: '🙆‍♀️',
    text: '待機中',
    path: '/o',
  },
  {
    label: '🙇‍♀️',
    text: '忙しい',
    path: '/b',
  },
  {
    label: '🏄‍♀️',
    text: '休み',
    path: '/v',
  },
];

export const QUESTION_STATE = {
  START: 1,
  END: 0,
};
