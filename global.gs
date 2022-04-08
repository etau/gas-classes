'use strict'

/**
 * グローバル定数宣言
 */
const DT = new Datetime();
const PROPERTIES = new Properties();
const SS = SpreadsheetApp.getActiveSpreadsheet();

/**
 * Universal クラス
 */
class Universal {

  /**
   * 配列化された Map オブジェクトの中身を確認する静的メソッド
   */
  static logDicts(dicts) {
    dicts.forEach(dict => Universal.logDict(dict));
  }

  /**
   * Map オブジェクトの中身を確認する静的メソッド
   */
  static logDict(dict) {
    console.log([...dict]);
  }






}