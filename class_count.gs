'use strict'

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