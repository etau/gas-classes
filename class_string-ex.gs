'use strict'

class StringEx {

  /**
   * 3 桁をカンマで区切る静的メソッド
   * @param {number} number - 3 桁区切り対象の数値
   * @return {string} 3 桁区切りされた文字列
   */
  static thousandSeparator(number) {
    const string = number.toLocaleString('ja-JP');
    return string;
  }

  /**
   * 置換リストにしたがって置換する静的メソッド
   * @param {string} string - 置換対象の文字列
   * @param {Array.<Array.<RegExp|string>>} replacementLists - 置換リスト
   * @return {string} 置換後の文字列
   * NOTE: replacementLists は [[/hoge/g, 'HOGE'] のようなもの
   */
  static replaceWithLists(string, replacementLists) {
    const replaced = replacementLists.reduce((acc, list) => acc.replace(...list), string);
    return replaced;
  }

}