'use strict'

/**
 * ツールキット クラス
 */
class Toolkit {

  /**
   * 配列化された Map オブジェクトの中身を確認する静的メソッド
   */
  static viewDicts(dicts) {
    dicts.forEach(dict => Toolkit.viewDict(dict));
  }

  /**
   * Map オブジェクトの中身を確認する静的メソッド
   */
  static viewDict(dict) {
    console.log([...dict]);
  }

}