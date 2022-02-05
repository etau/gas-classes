'use strict'

/**
 * グローバル定数宣言
 */
const DT = new Datetime();
const PROPERTIES = new Properties();
const SS = SpreadsheetApp.getActiveSpreadsheet();

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


class TestSheet {

  constructor() {
    this.s_ = new Sheet();
    this.sheet = this.s_.sheet;
  }

  getDataRangeValues() { return this.s_.getDataRangeValues(); }

  getHoge() {
    return 'hoge';
  }

}