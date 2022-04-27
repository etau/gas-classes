'use strict'

class NumberEx {

  /**
   * 最小値 min, 最大値 max の間からランダムな整数を取得する静的メソッド
   * @param {number} min - 最小値
   * @param {number} max - 最大値
   * @return {number} 最小値 min, 最大値 max の間のランダムな整数
   */
  static randomInteger(min, max) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  }

  /**
   * 3 桁をカンマで区切る静的メソッド
   * @param {number} number - 3 桁区切り対象の数値
   * @return {string} 3 桁区切りされた文字列
   */
  static thousandSeparator(number) {
    const string = number.toLocaleString('ja-JP');
    return string;
  }

}