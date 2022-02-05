'use strict'

/**
 * グローバル定数宣言
 */
const PROPERTIES = new Properties();
const SS = SpreadsheetApp.getActiveSpreadsheet();
const DT = DATETIME;

/**
 * ツールキット クラス
 */
class Toolkit {

  /**
   * 配列化された Map オブジェクトの中身を確認する静的メソッド
   */
  static logDicts(dicts) {
    dicts.forEach(dict => Toolkit.logDict(dict));
  }

  /**
   * Map オブジェクトの中身を確認する静的メソッド
   */
  static logDict(dict) {
    console.log([...dict]);
  }

}