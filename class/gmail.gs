'use strict';

/**
 * 送信する Gmail に関するクラス
 */
class Gmail {

  /**
   * Gmail に関するコンストラクタ
   * @constructor
   * @param {Array.<string>} record - Gmail を作成するための配列の値
   * NOTE: 配列で各種要素を取得する設計。要素の順番は分割代入の並びと対応する
   */
  constructor(record) {
    /** @type {Array.<string>} */
    this.record = record;
    [
      this.recipient,
      this.subject,
      this.body,
      this.from,
      this.name,
      this.cc,
      this.bcc,
      this.htmlBody,
      this.attachmentFolderId
    ] = record;
  }

  /**
   * メールを送信するメソッド
   * @return {Gmail} Gmail オブジェクト
   */
  send() {
    const { recipient, subject, body, options } = this.getParams();
    GmailApp.sendEmail(recipient, subject, body, options);
    return this;
  }

  /**
   * 下書きを作成するメソッド
   * @return {Gmail} Gmail オブジェクト
   */
  createDraft() {
    const { recipient, subject, body, options } = this.getParams();
    GmailApp.createDraft(recipient, subject, body, options);
    return this;
  }

  /**
   * メールの送信・下書き作成に必要なパラメーターを取得するメソッド
   * @return {Object} GmailApp に渡すパラメーター
   */
  getParams() {
    const params = {
      recipient: this.recipient,
      subject: this.subject,
      body: this.body
    };
    params.options = {
      from: this.from,
      name: this.name,
      cc: this.cc,
      bcc: this.bcc,
      attachments: this.getAttachments(),
      htmlBody: this.htmlBody
    };
    return params;
  }

  /**
   * 添付ファイルを取得するメソッド
   * @param {string} folderId - 添付ファイルを格納している対象のフォルダ ID
   * @return {Array.<Object>} Blob オブジェクトの配列。フォルダ ID がない場合は空配列
   */
  getAttachments(folderId = this.attachmentFolderId) {
    if (folderId === undefined || folderId === '') return [];
    const folder = Folder.getById(folderId);
    const attachments = folder.getFiles().map(file => file.getBlob());
    return attachments;
  }

  /**
   * フォントのサイズと色を指定した HTML 文字列を生成する静的メソッド
   * @param {string} string - 対象となる文字列
   * @param {string} color - フォント カラー
   * @param {number} size - フォント サイズ
   * @param {boolean} isBold - 太字かどうか
   * @return {string} HTML 化した文字列
   */
  static getFontHtml(string, color = 'black', size = 2, isBold = false) {
    const sentences = string.split('\n');
    const htmlSentences = sentences.map(sentence =>
      isBold
        ? '<font size=' + size + ' color=' + color + '><b>' + sentence + '</b></font>'
        : '<font size=' + size + ' color=' + color + '>' + sentence + '</font>',
    );
    const htmlSentence = htmlSentences.join('<br>') + '<br>';
    return htmlSentence;
  }

}
