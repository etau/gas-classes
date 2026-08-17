'use strict';

/**
 * Google ドライブのファイルに関するクラス
 */
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
  getName() { return this.file.getName(); }
  getMimeType() { return this.file.getMimeType(); }
  getBlob() { return this.file.getBlob(); }
  getDateCreated() { return this.file.getDateCreated(); }
  getLastUpdated() { return this.file.getLastUpdated(); }
  getParents() { return this.file.getParents(); }
  setName(...args) { return this.file.setName(...args); }
  setTrashed(...args) { return this.file.setTrashed(...args); }
  makeCopy(...args) { return this.file.makeCopy(...args); }

  /**
   * ファイルの種類を取得するメソッド
   * @return {string|undefined} TYPE.FILE のキー名。合致するものがない場合は undefined
   * NOTE: 種類を追加する場合は TYPE.FILE に Mime Type を足すだけでよい
   */
  getType() {
    const mimeType = this.getMimeType();
    const fileType = Object.keys(TYPE.FILE).find(key => TYPE.FILE[key] === mimeType);
    return fileType;
  }

  /**
   * 指定した種類のファイルかどうかを判定するメソッド
   * @param {string} mimeType - 判定する Mime Type 例: TYPE.FILE.SPREADSHEET
   * @return {boolean} 指定した種類のファイルかどうか
   */
  isType(mimeType) {
    return this.getMimeType() === mimeType;
  }

  /**
   * 親フォルダーを Folder オブジェクトの配列で取得するメソッド
   * @return {Array.<Folder>} 親フォルダーの Folder オブジェクト
   * NOTE: 複数の親フォルダーを持つ旧設定のファイルがあるため配列で返す
   */
  getParentFolders() {
    const folderIterator = this.getParents();
    const parentFolders = Folder.getIteratorAsArray(folderIterator).map(folder => new Folder(folder));
    return parentFolders;
  }

  /**
   * ファイルの URL から File オブジェクトを取得する静的メソッド
   * @param {string} fileUrl - ファイルの URL
   * @return {File} 取得した File オブジェクト
   */
  static getByUrl(fileUrl) {
    const fileId = fileUrl.match(/\/d\/(.*?)\//)[1];
    const file = File.getById(fileId);
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
