'use strict';

/**
 * 文字列を拡張して扱うクラス
 */
class StringEx {

  /**
   * 改行を削除する静的メソッド
   * @param {string} string - 改行を削除する文字列
   * @return {string} 改行を削除した文字列
   * NOTE: CRLF・LF のどちらの改行コードにも対応する
   */
  static deleteNewLine(string) {
    const replacementLists = [[/\r?\n/g, '']];
    const replaced = StringEx.replaceWithLists(string, replacementLists);
    return replaced;
  }

  /**
   * プレフィックスとサフィックスに挟まれたすべての文字列を抽出する静的メソッド
   * @param {string} string - 抽出対象の文字列
   * @param {string} prefix - プレフィックス
   * @param {string} suffix - サフィックス
   * @param {boolean} isInclude - プレフィックスとサフィックスを結果にふくむかどうか
   * @return {Array.<string>|null} 抽出された文字列。合致するものがない場合は null
   */
  static getStringsBetween(string, prefix = '{{', suffix = '}}', isInclude = false) {
    const regExp = isInclude ?
      new RegExp(prefix + '[\\s\\S]*?' + suffix, 'g') :
      new RegExp('(?<=' + prefix + ')[\\s\\S]*?(?=' + suffix + ')', 'g');
    const stringsBetween = string.match(regExp);
    return stringsBetween;
  }

  /**
   * プレフィックスとサフィックスに挟まれた最初の文字列を抽出する静的メソッド
   * @param {string} string - 抽出対象の文字列
   * @param {string} prefix - プレフィックス
   * @param {string} suffix - サフィックス
   * @param {boolean} isInclude - プレフィックスとサフィックスを結果にふくむかどうか
   * @return {string|null} 抽出された文字列。合致するものがない場合は null
   */
  static getStringBetween(string, prefix = '{{', suffix = '}}', isInclude = false) {
    const stringsBetween = StringEx.getStringsBetween(string, prefix, suffix, isInclude);
    return stringsBetween === null ? null : stringsBetween[0];
  }

  /**
   * 置換リストにしたがって置換する静的メソッド
   * @param {string} string - 置換対象の文字列
   * @param {Array.<Array.<RegExp|string>>} replacementLists - 置換リスト
   * @return {string} 置換後の文字列
   * NOTE: replacementLists は [[/hoge/g, 'HOGE']] のようなもの
   */
  static replaceWithLists(string, replacementLists) {
    const replaced = replacementLists.reduce((pre, list) => pre.replace(...list), string);
    return replaced;
  }

}
