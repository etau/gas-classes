'use strict'

/** @enum {string} */
const TYPE = Object.freeze(
  {
    /** 文字列 */
    STRING: 'string',
    /** 数値 */
    NUMBER: 'number',
    /** 真偽値 */
    BOOLEAN: 'boolean',
    /** オブジェクト */
    OBJECT: 'object',
    /** 整数値 */
    INT: 'integer',
  }
);



/**
 * 型について判定するクラス
 */
class Type {

  /**
   * @constructor
   * @param {*} value 型を判定する対象
   * @param {string} type 型
   */
  constructor(value, type) {
    /** @private {*} */
    this.value_ = value;
    /** @private {string} */
    this.type_ = type;
  }

  /**
   * 型判定をする対象と型が一致しているかを返す getter プロパティ
   * @retrun {boolean}
   */
  get isValidType() {
    if (this.type_ === 'integer') return Number.isInteger(this.value_);  // MEMO: 型が増えた場合は、判定を増やす
    return typeof this.value_ === this.type_;
  }

}


// function myFunction() {

//   const dt1 = new Datetime(new Date());
//   console.log(dt1.date);  // Sun Aug 29 2021 23:53:09 GMT+0900 (Japan Standard Time)

//   const dt2 = new Datetime(2);  // エラー	Error: Type Error

// }