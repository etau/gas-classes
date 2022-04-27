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

  /**
   * 特定列情報だけを抜き出すメソッド
   * @param {number} number - 列番号
   * @return {string} A1 表記の列番号
   */
  static getColumnA1NotationByNumber(number) {
    const rangeA1Notation = SpreadsheetApp.getActiveSheet().getRange(1, number).getA1Notation();
    const columnA1Notation = rangeA1Notation.replace(/\d/, '');
    return columnA1Notation;
  }




}