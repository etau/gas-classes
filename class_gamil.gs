/**
 * Gmail に関するクラス
 */
class Gmail {

  /**
   * Gmail に関するコンストラクタ
   * @constructor
   * @param {string} query - Gmail を検索するクエリー
   */
  constructor(query) {
    this.threads = GmailApp.search(query);
  }

  /**
   * Gmail スレッドの最初のメッセージの本文を取得するメソッド
   * @return {string[]} 対象スレッド最初のメッセージの本文 
   */
  getGmailBodies() {
    const gmailBodies = this.threads.
      map(thread => thread.getMessages()[0].getPlainBody());
    return gmailBodies;
  }

  /**
   * 正規表現にマッチする範囲のメール本文を取得するメソッド
   * @return {string[]} 対象スレッド最初のメッセージのマッチした文字列 
   */
  getSelectedSentences() {
    const regExp = /hogehoge/;
    const sentences = this.getGmailBodies().
      map(gmailBody => gmailBody.match(regExp)[0].replace(/\r?\n/g, ''));
    return sentences;
  }

  /**
   * 正規表現で prefix と suffix の間の文章を取得する静的メソッド
   * @param {string} string - 文章を抜き出す文字列
   * @param {string} prefix - 抜き出したい文章の前の文字列
   * @param {string} suffix - 抜き出したい文章の後の文字列
   * @return {string} 抜き出された文字列
   */
  static fetchSentence(string, prefix, suffix) {
    const regExp = new RegExp(prefix + '.*?' + suffix);
    const sentence = string.match(regExp)[0].
      replace(prefix, '').
      replace(suffix, '');
    return sentence;
  }
  
}