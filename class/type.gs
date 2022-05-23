'use strict'

/** @enum {string} */
const TYPE = Object.freeze(
  {
    STRING: 'string',
    NUMBER: 'number',
    INTEGER: 'integer',
    BOOLEAN: 'boolean',
    DATE: 'Date',
    ARRAY: 'Array',
    OBJECT: 'Object',
    REGEXP: 'RegExp',
    MAP: 'Map',
    SET: 'Set',
    JSON: 'JSON',
    SPREADSHEET: 'Spreadsheet',
    SHEET: 'Sheet',
    CALENDAR: 'Calendar',
    TO_STRINGS: Object.freeze([  // toString メソッドで型判定をおこなう対象のオブジェクト NOTE: Type クラスの valid メソッドの 引数 type には指定しない
      'Spreadsheet',
      'Sheet',
      'Calendar'
    ]),
    FOLDER: 'folder',

    FILE: Object.freeze({  // ファイル オブジェクトの各種 Mine Type
      SPREADSHEET: 'application/vnd.google-apps.spreadsheet',
      PRESENTATION: 'application/vnd.google-apps.presentation',
      DOCUMENT: 'application/vnd.google-apps.document',
      SCRIPT: 'application/vnd.google-apps.script'
    })
  }
);



class Type {

  /**
   * 型判定をする対象と型が一致している場合にはその値を返し、一致していない場合にはエラーを投げる静的メソッド
   * @param {*} value - 型を判定する対象
   * @param {string} type - 型
   * @retrun {*|Object} 型が一致している場合にはその値、一致していない場合にはエラーを投げる
   */
  static valid(value, type) {
    switch (type) {
      case TYPE.INTEGER: return Number.isInteger(value) ? value : Type.throwAlert(type);
      case TYPE.DATE: return value instanceof Date ? value : Type.throwAlert(type);
      case TYPE.ARRAY: return value instanceof Array ? value : Type.throwAlert(type);
      case TYPE.OBJECT: return (value instanceof Object && !(value instanceof Array)) && !(value instanceof Map) && !(value instanceof Set) ? value : Type.throwAlert(type);
      case TYPE.REGEXP: return value instanceof RegExp ? value : Type.throwAlert(type);
      case TYPE.MAP: return value instanceof Map ? value : Type.throwAlert(type);
      case TYPE.SET: return value instanceof Set ? value : Type.throwAlert(type);
      case TYPE.JSON: return (typeof value === 'string' && JSON.parse(value) instanceof Object) ? value : Type.throwAlert(type);
      case TYPE.FOLDER: return value.getUrl().includes('/drive/folders/') ? value : Type.throwAlert(type);
    }
    if (TYPE.TO_STRINGS.includes(type)) return value.toString() === type ? value : Type.throwAlert(type);
    try {
      if (typeof value === type || value.getMimeType() === type) return value;
    } catch (e) { Type.throwAlert(type); }
  }

  /**
   * 型エラーを投げる静的メソッド
   * @throws 型のエラー
   */
  static throwAlert(type) {
    throw new Error('This type is not a "' + type + '".');
  }

}


'use strict'

function myFunction_20220509_083011() {

  const string = 'hoge';
  console.log(Type.valid(string, TYPE.STRING));

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  console.log(Type.valid(ss, TYPE.SPREADSHEET));

}




// 'use strict'

// /** @enum {string} */
// const TYPE = Object.freeze(
//   {
//     /** 文字列 */
//     STRING: 'string',
//     /** 数値 */
//     NUMBER: 'number',
//     /** 整数値 */
//     INTEGER: 'integer',
//     /** 真偽値 */
//     BOOLEAN: 'boolean',
//     /** 日付 */
//     DATE: 'Date',
//     /** 配列 */
//     ARRAY: 'Array',
//     /** オブジェクト */
//     OBJECT: 'Object',
//     /** 正規表現 */
//     REGEXP: 'RegExp',
//     /** Map オブジェクト */
//     MAP: 'Map',
//     /** Set オブジェクト */
//     SET: 'Set',
//     /** JSON */
//     JSON: 'JSON',
//     /** スプレッドシート オブジェクト*/
//     SPREADSHEET: 'Spreadsheet',
//     /** シート オブジェクト */
//     SHEET: 'Sheet',
//     /** カレンダー オブジェクト */
//     CALENDAR: 'Calendar',
//     /** toString メソッドで型判定をおこなう対象のオブジェクト */
//     TO_STRINGS: Object.freeze([
//       'Spreadsheet',
//       'Sheet',
//       'Calendar'
//     ]),
//     /** フォルダー オブジェクト */
//     FOLDER: 'folder',
//     /** ファイル オブジェクトの各種 Mine Type */
//     FILE: Object.freeze({
//       SPREADSHEET: 'application/vnd.google-apps.spreadsheet',
//       PRESENTATION: 'application/vnd.google-apps.presentation',
//       DOCUMENT: 'application/vnd.google-apps.document',
//       SCRIPT: 'application/vnd.google-apps.script'
//     })
//   }
// );



// class Type {

//   /**
//    * 型について判定するコンストラクタ
//    * @constructor
//    */
//   constructor(value, type) {
//     /** @private {*} */
//     this.value = value;
//     /** @private {string} */
//     this.type = type;
//     /** @private {boolean|Object} */
//     this.isValid = this.isValid();
//   }

//   /**
//    * 型判定をする対象と型が一致しているかを返し、一致していない場合にはエラーを投げるメソッド
//    * @param {*} value - 型を判定する対象
//    * @param {string} type - 型
//    * @retrun {boolean|Object} 型が一致しているかどうか、一致していない場合にはエラーを投げる
//    */
//   isValid() {
//     switch (this.type) {
//       case TYPE.INTEGER: return Number.isInteger(this.value) || this.throwAlert();
//       case TYPE.DATE: return this.value instanceof Date || this.throwAlert();
//       case TYPE.ARRAY: return this.value instanceof Array || this.throwAlert();
//       case TYPE.OBJECT: return (this.value instanceof Object && !(this.value instanceof Array)) && !(this.value instanceof Map) && !(this.value instanceof Set) || this.throwAlert();
//       case TYPE.REGEXP: return this.value instanceof RegExp || this.throwAlert();
//       case TYPE.MAP: return this.value instanceof Map || this.throwAlert();
//       case TYPE.SET: return this.value instanceof Set || this.throwAlert();
//       case TYPE.JSON: return (typeof this.value === 'string' && JSON.parse(this.value) instanceof Object) || this.throwAlert();
//       case TYPE.FOLDER: return this.value.getUrl().includes('/drive/folders/') || this.throwAlert();
//     }
//     if (TYPE.TO_STRINGS.includes(this.type)) return this.value.toString() === this.type || this.throwAlert();
//     try {  // NOTE: プリミティブ型の判定
//       return typeof this.value === this.type || this.value.getMimeType() === this.type;
//     } catch (e) { this.throwAlert(); }
//   }

//   /**
//    * 型エラーを投げるプライベート メソッド
//    * @throws 型のエラー
//    */
//   throwAlert() {
//     throw new Error('This type is not a "' + this.type + '".');
//   }

// }