'use strict'

class Money {

  /**
   * @constructor
   */
  constructor(amount) {
    /** @type {number} */
    this.amount = amount;
    /** @type {string} */
    this.formated = Money.format();
  }

  /**
   * 金額をフォーマットする静的メソッド
   * @param {number} amount - 対象となる金額
   * @return {string} フォーマットされた金額
   */
  static format(amount = this.amount) {
    const formatedAmount = amount.toLocaleString('ja-JP');
    return formatedAmount;
  }

}