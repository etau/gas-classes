'use strict'

class ExtendedString {

  /**
   * 
   */
  constructor(string) {
    this.stirng = string;
  }

  /**
   * 置換リストにしたがって置換する静的メソッド
   * @param {string} 置換対象の文字列
   * @param {Array.<Array.<RegExp|string>>} 置換リスト
   * @return {string} 置換後の文字列
   */
  static replaceByLists(string, replacementLists) {
    const replaced = replacementLists.reduce((acc, list) => acc.replace(...list), string);
    return replaced;
  }

}