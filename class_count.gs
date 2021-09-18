'use strict'

/**
 * カウントに関するクラス
 */
class Count {

  /**
   * カウントに関するコンストラクタ
   * @constructor
   * @param {number} initialValue - カウント開始する初期値。デフォルト引数は 0
   */
  constructor(initialValue = 0) {
    new Type(initialValue, TYPE.INTEGER);
    /** @type {number} */
    this.initialValue_ = initialValue;
    /** @type {number} */
    this.value_ = initialValue;
  }

  /**
   * 各プライベート プロパティのゲッター プロパティ
   */
  get initialValue() { return this.initialValue_; }
  get value() { return this.value_; }

  /**
   * カウント アップするメソッド
   */
  up() {
    return this.value_++;
  }

  /**
   * カウント ダウンするメソッド
   */
  down() {
    return this.value_--;
  }

  /**
   * 値を初期値にリセットするメソッド
   */
  reset(resetValue = this.initialValue_) {
    this.value_ = resetValue;
  }

}