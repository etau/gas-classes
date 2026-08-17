'use strict';

/**
 * 数値を拡張して扱うクラス
 */
class NumberEx {

  /**
   * 最小値 min, 最大値 max の間からランダムな整数を取得する静的メソッド
   * @param {number} min - 最小値
   * @param {number} max - 最大値
   * @return {number} 最小値 min, 最大値 max の間のランダムな整数
   */
  static getRandomInteger(min, max) {
    const randomInteger = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomInteger;
  }

  /**
   * 3 桁をカンマで区切る静的メソッド
   * @param {number} number - 3 桁区切り対象の数値
   * @return {string} 3 桁区切りされた文字列
   */
  static getThousandSeparated(number) {
    const string = number.toLocaleString('ja-JP');
    return string;
  }

  /**
   * Count オブジェクトを取得する静的メソッド
   * @param {number} initialValue - カウント開始する初期値
   * @return {Count} Count オブジェクト
   */
  static getCounter(initialValue = 0) {
    const counter = new Count(initialValue);
    return counter;
  }

}

/**
 * カウントに関するクラス
 */
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
    return ++this.value;
  }

  /**
   * カウント ダウンするメソッド
   * @return {number} 1 減算された this.value
   */
  down() {
    return --this.value;
  }

  /**
   * 値を初期値にリセットするメソッド
   * @param {number} resetValue - リセット後の値
   * @return {number} リセットされた this.value
   */
  reset(resetValue = this.initialValue) {
    this.value = resetValue;
    return this.value;
  }

}
