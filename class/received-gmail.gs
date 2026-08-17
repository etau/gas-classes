'use strict';

/**
 * 受信した Gmail に関するクラス
 */
class ReceivedGmail {

  /**
   * 受信した Gmail に関するコンストラクタ
   * @constructor
   * @param {string|Array.<GmailApp.GmailThread>} param - Gmail を検索するクエリー、または GmailThread の配列
   */
  constructor(param) {
    /** @type {Array.<GmailApp.GmailThread>} */
    this.threads = typeof param === 'string' ? GmailApp.search(param) : param;
  }

  /**
   * スレッド数を取得するメソッド
   * @return {number} スレッド数
   */
  getLength() {
    const length = this.threads.length;
    return length;
  }

  /**
   * Gmail スレッドの最初のメッセージの本文を取得するメソッド
   * @return {Array.<string>} 対象スレッド最初のメッセージの本文
   */
  getBodies() {
    const bodies = this.threads.map(thread => thread.getMessages()[0].getPlainBody());
    return bodies;
  }

  /**
   * 正規表現にマッチする範囲のメール本文を取得するメソッド
   * @param {RegExp} regExp - 抜き出す範囲の正規表現
   * @return {Array.<string>} マッチした文字列。マッチしないスレッドは空文字
   */
  getMatchedSentences(regExp) {
    const sentences = this.getBodies().map(body => {
      const matched = body.match(regExp);
      return matched === null ? '' : StringEx.deleteNewLine(matched[0]);
    });
    return sentences;
  }

  /**
   * プレフィックスとサフィックスに挟まれた文章をメール本文から取得するメソッド
   * @param {string} prefix - 抜き出したい文章の前の文字列
   * @param {string} suffix - 抜き出したい文章の後の文字列
   * @return {Array.<string>} 抜き出された文字列。合致しないスレッドは空文字
   * NOTE: 文字列の抽出そのものは StringEx クラスに集約している
   */
  getSentencesBetween(prefix, suffix) {
    const sentences = this.getBodies().map(body => {
      const sentence = StringEx.getStringBetween(body, prefix, suffix);
      return sentence === null ? '' : sentence;
    });
    return sentences;
  }

}
