'use strict'

/** @enum {string} */
const TYPE = Object.freeze(
  {
    /** 文字列 */
    STRING: 'string',
    /** 数値 */
    NUMBER: 'number',
    /** 整数値 */
    INTEGER: 'integer',
    /** 真偽値 */
    BOOLEAN: 'boolean',
    /** 日付 */
    DATE: 'Date',
    /** 配列 */
    ARRAY: 'Array',
    /** Map */
    MAP: 'Map',
    /** オブジェクト */
    OBJECT: 'Object',
    /** スプレッドシート オブジェクト*/
    SPREADSHEET: 'Spreadsheet',
    /** シート オブジェクト */
    SHEET: 'Sheet',
    /** カレンダー オブジェクト */
    CALENDAR: 'Calendar',
    /** toString メソッドで型判定をおこなう対象のオブジェクト */
    TOSTRINGS: [
      'Spreadsheet', 'Sheet', 'Calendar'
    ],
    /** フォルダー オブジェクト */
    FOLDER: 'folder',
    /** ファイル オブジェクトの各種 Mine Type */
    FILE: {
      SPREADSHEET: 'application/vnd.google-apps.spreadsheet',
      PRESENTATION: 'application/vnd.google-apps.presentation',
      DOCUMENT: 'application/vnd.google-apps.document',
      SCRIPT: 'application/vnd.google-apps.script'
    }
  }
);



/**
 * 型について判定するクラス
 */
class Type {

  /**
   * 型について判定するコンストラクタ
   * @constructor
   * @param {*} value - 型を判定する対象
   * @param {string} type - 型
   */
  constructor(value, type) {
    /** @private {*} */
    this.value_ = value;
    /** @private {string} */
    this.type_ = type;
    /** @private {boolean|Object} */
    this.isValid_ = this.isValid_();
  }

  /**
   * 各プライベート プロパティのゲッター プロパティ
   */
  get value() { return this.value_; }
  get type() { return this.type_; }
  get isValid() { return this.isValid_; }

  /**
   * 型判定をする対象と型が一致しているかを返し、一致していない場合にはエラーを投げるプライベート メソッド
   * @retrun {boolean|Object} 型が一致しているかどうか、一致していない場合にはエラーを投げる
   */
  isValid_() {
    if (this.type_ === TYPE.INTEGER) return Number.isInteger(this.value_) || this.throwAlert_();
    if (this.type_ === TYPE.DATE) return this.value_ instanceof Date || this.throwAlert_();
    if (this.type_ === TYPE.ARRAY) return this.value_ instanceof Array || this.throwAlert_();
    if (this.type_ === TYPE.OBJECT) return this.value_ instanceof Object || this.throwAlert_();
    if (this.type_ === TYPE.MAP) return this.value_ instanceof Map || this.throwAlert_();
    if (this.type_ === TYPE.FOLDER) return this.value_.getUrl().includes('/drive/folders/') || this.throwAlert_();
    if (TYPE.TOSTRINGS.includes(this.type_)) return this.value_.toString() === this.type_ || this.throwAlert_();
    try {
      return typeof this.value_ === this.type_ || this.value_.getMimeType() === this.type_;
    } catch (e) { this.throwAlert_(); }
  }

  /**
   * 型エラーを投げるプライベート メソッド
   * @throws 型のエラー
   */
  throwAlert_() {
    throw new Error('Type Error: This type is not "' + this.type_ + '".');
  }

}