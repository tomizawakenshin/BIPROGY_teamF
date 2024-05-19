export type Emoji = {
  label: string;
  text: string;
};

export const emojis: Emoji[] = [
  {
    label: '😶',
    text: 'フリー',
  },
  {
    label: '👍',
    text: '質問受付中！',
  },
  {
    label: '💦',
    text: '忙しい',
  },
  {
    label: '😣',
    text: '手こずってる',
  },
  {
    label: '😵',
    text: '助けて！',
  },
];

export const QUESTION_STATE = {
  START: 1,
  END: 0,
};
