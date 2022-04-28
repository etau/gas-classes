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

  /**
   * Count クラスオブジェクトを取得する静的メソッド
   * @param {number} initialValue - カウント開始する初期値
   * @return {Count} Count オブジェクト
   */
  static getCounter(initialValue = 0) {
    return new Count(initialValue);
  }

}

class Count {

  /**
   * カウントに関するコンストラクタ
   * @constructor
   * @param {number} initialValue - カウント開始する初期値
   */
  constructor(initialValue = 0) {
    /** @type {number} */
    this.initialValue = initialValue;
    /** @type {number} */
    this.value = initialValue;
  }

  /**
   * カウント アップするメソッド
   * @return {number} 1 加算された this.value
   */
  up() {
    return this.value++;
  }

  /**
   * カウント ダウンするメソッド
   * @return {number} 1 減算された this.value
   */
  down() {
    return this.value--;
  }

  /**
   * 値を初期値にリセットするメソッド
   * @return {number} 初期値に戻された this.value
   */
  reset(resetValue = this.initialValue) {
    this.value = resetValue;
  }

}