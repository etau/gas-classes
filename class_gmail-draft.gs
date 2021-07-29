class GmailDraft {

  /**
   * Gmail の下書きに関するコンストラクタ
   * @constructor
   * @param {Array.<string>} record - Gmail の下書きを作成するための配列の値
   */
  constructor(record) {
    [
      this.recipient,
      this.subject,
      this.body,
      this.from,
      this.name,
      this.cc,
      this.bcc,
      this.htmlBody
    ] = record;

  }

  /**
   * 下書きを作成するメソッド
   */
  create() {
    const { recipient, subject, body, options } = this.getParameter();
    GmailApp.createDraft(recipient, subject, body, options);
  }

  /**
   * メールの下書きに必要なパラメーターを取得するメソッド
   * return {Object} メールの下書きを作成するために必要なパラメーター
   */
  getParameter() {
    const parameter = {
      recipient: this.recipient,
      subject: this.subject,
      body: this.body
    };
    const options = {
      from: this.from,
      name: this.name,
      cc: this.cc,
      bcc: this.bcc,
      attachments: this.getAttachments(),
      htmlBody: this.htmlBody
    };
    parameter.options = options;
    return parameter;
  }

  /**
   * 添付ファイルを取得するメソッド
   * @param {string} folderId - 添付ファイルを格納している対象のフォルダ ID
   * @return {Array.<Object>} Blob オブジェクトの配列
   */
  getAttachments(folderId = 'hogehoge') {
    const folder = DriveApp.getFolderById(folderId);
    const files = folder.getFiles();
    const attachments = [];
    while (files.hasNext()) {
      attachments.push(files.next().getBlob());
    }
    return attachments;
  }

  /**
   * フォントのサイズと色を変更する静的メソッド
   * @param {string} string - 対象となる文字列
   * @param {string} color - フォント カラー
   * @param {number} size - フォント サイズ
   * @param {boolean} isBold - 太字かどうか
   * @return {string} HTML 化した文字列
   */
  static setHtmlFont(string, color = 'black', size = 2, isBold = false) {
    const sentences = string.split('\n');
    const htmlSentences = sentences.map(sentence =>
      isBold ?
        '<font size=' + size + ' color=' + color + '><b>' + sentence + '</b></font>' :
        '<font size=' + size + ' color=' + color + '>' + sentence + '</font>');
    const htmlSentence = htmlSentences.join('<br>') + '<br>';
    return htmlSentence;
  }

}