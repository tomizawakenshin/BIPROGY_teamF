export const generateRandomString = (length: number): string => { // 指定の長さのランダム文字列生成
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => ('0' + byte.toString(16)).slice(-2)).join(''); // 16進数に変換し文字列に変換
};
