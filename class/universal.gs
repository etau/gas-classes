'use strict';

/**
 * 特定のドメインに属さない汎用機能を提供するクラス
 * NOTE: A1 形式表記の変換は Range クラス、2 次元配列の操作は Values クラスに集約している
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
   * @param {Array.<Map>} dicts - 出力する Map オブジェクトの配列
   */
  static logDicts(dicts) {
    dicts.forEach(dict => Universal.logDict(dict));
  }

  /**
   * Map オブジェクトの中身を確認する静的メソッド
   * @param {Map} dict - 出力する Map オブジェクト
   */
  static logDict(dict) {
    console.log([...dict]);
  }

  /**
   * 配列をランダムにシャッフルする静的メソッド
   * @param {Array} array - もとの配列
   * @return {Array} ランダムにシャッフルされた配列
   */
  static shuffle(array) {
    const copiedArray = [...array];
    // NOTE: 例外 3 - Fisher-Yates シャッフルのため、反復メソッドではなく for 文を使用する
    for (let i = copiedArray.length - 1; i >= 0; i--) {
      const r = Math.floor(Math.random() * (i + 1));
      [copiedArray[i], copiedArray[r]] = [copiedArray[r], copiedArray[i]];
    }
    return copiedArray;
  }

  /**
   * 配列から重複を取り除く静的メソッド
   * @param {Array} array - もとの配列
   * @return {Array} 重複が取り除かれた配列
   */
  static getUniqueValues(array) {
    const uniqueValues = [...new Set(array)];
    return uniqueValues;
  }

}
