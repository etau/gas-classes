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
    /** ファイル オブジェクト */
    FILE: {
      /** スプレッドシート オブジェクト*/
      SPREADSHEET: 'application/vnd.google-apps.spreadsheet'
    },
    /** スプレッドシート オブジェクト*/
    SPREADSHEET: 'Spreadsheet',
    /** シート オブジェクト */
    SHEET: 'Sheet',
    /** toString メソッドで型判定をおこなう対象のオブジェクト */
    TOSTRINGS: [
      'Spreadsheet', 'Sheet'
    ]
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
   * @retrun {boolean} 型が一致しているかどうか
   */
  get isValidType() {
    if (this.type_ === 'integer') return Number.isInteger(this.value_);
    if (TYPE.TOSTRINGS.includes(this.type_)) return this.value_.toString() === this.type_;
    return typeof this.value_ === this.type_ || this.value_.getMimeType() === this.type_;
  }

}