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
    /** オブジェクト */
    OBJECT: 'Object',
    /** 正規表現 */
    REGEXP: 'RegExp',
    /** Map */
    MAP: 'Map',
    /** JSON */
    JSON: 'JSON',
    /** スプレッドシート オブジェクト*/
    SPREADSHEET: 'Spreadsheet',
    /** シート オブジェクト */
    SHEET: 'Sheet',
    /** カレンダー オブジェクト */
    CALENDAR: 'Calendar',
    /** toString メソッドで型判定をおこなう対象のオブジェクト */
    TO_STRINGS: [
      'Spreadsheet',
      'Sheet',
      'Calendar'
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
    this.value = value;
    /** @private {string} */
    this.type = type;
    /** @private {boolean|Object} */
    this.isValid = this.isValid();
  }

  /**
   * 型判定をする対象と型が一致しているかを返し、一致していない場合にはエラーを投げるプライベート メソッド
   * @retrun {boolean|Object} 型が一致しているかどうか、一致していない場合にはエラーを投げる
   */
  isValid() {
    if (this.type === TYPE.INTEGER) return Number.isInteger(this.value) || this.throwAlert();
    if (this.type === TYPE.DATE) return this.value instanceof Date || this.throwAlert();
    if (this.type === TYPE.ARRAY) return this.value instanceof Array || this.throwAlert();
    if (this.type === TYPE.OBJECT) return (this.value instanceof Object && !(this.value instanceof Array)) && !(this.value instanceof Map) || this.throwAlert();  // TODO: Set 型の判定も必要かな？
    if (this.type === TYPE.REGEXP) return this.value instanceof RegExp || this.throwAlert();
    if (this.type === TYPE.MAP) return this.value instanceof Map || this.throwAlert();
    if (this.type === TYPE.JSON) return (typeof this.value === 'string' && JSON.parse(this.value) instanceof Object) || this.throwAlert();
    if (this.type === TYPE.FOLDER) return this.value.getUrl().includes('/drive/folders/') || this.throwAlert();
    if (TYPE.TOSTRINGS.includes(this.type)) return this.value.toString() === this.type || this.throwAlert();
    try {
      return typeof this.value === this.type || this.value.getMimeType() === this.type;
    } catch (e) { this.throwAlert(); }
  }

  /**
   * 型エラーを投げるプライベート メソッド
   * @throws 型のエラー
   */
  throwAlert() {
    throw new Error('Type Error: This type is not a "' + this.type + '".');
  }

}