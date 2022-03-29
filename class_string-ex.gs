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
   * プレフィックスとサフィックスに挟まれたすべての文字列を抽出する静的メソッド
   * @param {string} string - 抽出対象の文字列
   * @param {string} prefix - プレフィックス
   * @param {string} suffix - サフィックス
   * @param {boolean} isInclude - プレフィックスとサフィックスを結果にふくむかどうか
   * @return {Array.<string>} 抽出された文字列
   */
  static fetch(string, prefix = '{{', suffix = '}}', isInclude = false) {
    const regExp = isInclude ?
      new RegExp(prefix + '[\\s\\S]*?' + suffix, 'g') :
      new RegExp('(?<=' + prefix + ')[\\s\\S]*?(?=' + suffix + ')', 'g');
    const fetchStrings = string.match(regExp);
    return fetchStrings;
  }

  /**
   * 置換リストにしたがって置換する静的メソッド
   * @param {string} string - 置換対象の文字列
   * @param {Array.<Array.<RegExp|string>>} replacementLists - 置換リスト
   * @return {string} 置換後の文字列
   * NOTE: replacementLists は [[/hoge/g, 'HOGE'] のようなもの
   */
  static replaceWithLists(string, replacementLists) {
    const replaced = replacementLists.reduce((pre, list) => pre.replace(...list), string);
    return replaced;
  }

}