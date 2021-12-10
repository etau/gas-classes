'use strict'

class Money {

  /**
   * @constructor
   */
  constructor(amount) {
    /** @type {number} */
    this.amount_ = amount;
    /** @type {string} */
    this.formated_ = Money.format();
  }

  /**
   * 各プライベート プロパティ value_ のゲッター プロパティ
   */
  get amount() { return this.amount_; }
  get formated() { return this.formated_; }

  /**
   * 金額をフォーマットする静的メソッド
   * @param {number} amount - 対象となる金額
   * @return {string} フォーマットされた金額
   */
  static format(amount = this.amount_) {
    const formatedAmount = amount.toLocaleString('ja-JP');
    return formatedAmount;
  }

}