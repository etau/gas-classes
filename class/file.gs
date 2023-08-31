'use strict'

class File {

  /**
   * ファイル オブジェクトに関するコンストラクタ
   * @constructor
   * @param {DriveApp.File} file - ファイル オブジェクト
   */
  constructor(file) {
    /** @type {DriveApp.File} */
    this.file = file;
  }

  /**
   * Class File から委譲されたメソッド
   * NOTE: https://developers.google.com/apps-script/reference/drive/file
   */
  getUrl() { return this.file.getUrl(); }
  getId() { return this.file.getId(); }
  getName() { return this.file.getName() };
  setName(...args) { return this.file.setName(...args); }
  makeCopy(...args) { return this.file.makeCopy(...args); }

  /**
   * ファイルの種類を取得するメソッド
   * @return {string|undefined} ファイルの種類（'spreadsheets' 'document' または undefined）
   */
  getType() {
    const url = this.getUrl();
    if (url.includes('https://docs.google.com/spreadsheets/')) return 'spreadsheets';
    if (url.includes('https://docs.google.com/document/')) return 'document';
    // TODO: 他も必要に応じて追加する
    return undefined;
  }

  /**
   * ファイルの URL からFile オブジェクトを取得する静的メソッド
   * @param {string} fileUrl - ファイルの URL
   * @return {File} 取得した File オブジェクト
   */
  static getByUrl(fileUrl) {
    const fileId = fileUrl.match(/\/d\/(.*?)\//)[1];
    const file = new File(DriveApp.getFileById(fileId));
    return file;
  }

  /**
   * ファイル ID から File オブジェクトを取得する静的メソッド
   * @param {string} fileId - ファイルの ID
   * @return {File} 取得した File オブジェクト
   */
  static getById(fileId) {
    const file = new File(DriveApp.getFileById(fileId));
    return file;
  }

}