'use strict'

/**
 * 汎用機能を提供するクラス
 */
class Universal {

  /**
   * 与えられたオブジェクトの型と値をコンソールに出力する静的メソッド
   * @param {Object|Array|string|number|boolean} object - 出力するオブジェクト
   */
  static logObject(object) {
    console.log('type: ', typeof object, JSON.stringify(object));
  }

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
   * 配列をランダムにシャッフルする静的メソッド
   * @param {Array.<>} array - もとの配列
   * @return {Array.<>} ランダムにシャッフルされた配列
   */
  static shuffle(array) {
    const copiedArray = [...array];
    for (let i = copiedArray.length - 1; i >= 0; i--) {
      const r = Math.floor(Math.random() * (i + 1));
      [copiedArray[i], copiedArray[r]] = [copiedArray[r], copiedArray[i]];
    }
    return copiedArray;
  }

  /** TODO: Range クラスができたら移植
   * 列番号から A1 表記を取得するメソッド
   * @param {number} number - 列番号
   * @return {string} A1 表記の列番号
   */
  static getColumnA1NotationByNumber(number) {
    const rangeA1Notation = SpreadsheetApp.getActiveSheet().getRange(1, number).getA1Notation();
    const columnA1Notation = rangeA1Notation.replace(/\d/, '');
    return columnA1Notation;
  }

}