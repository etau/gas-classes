'use strict'

/**
 * フォルダー オブジェクトに関するクラス
 */
class Folder {

  /**
   * フォルダー オブジェクトに関するコンストラクタ
   * @constructor
   * @param {DriveApp.folder} folder - フォルダー
   */
  constructor(folder = DriveApp.getFolderById(PROPERTIES.get('FOLDER_ID'))) {
    /** @type {DriveApp.folder} */
    this.folder = folder;
  }

  /**
   * Class Folder から委譲されたメソッド
   * NOTE: https://developers.google.com/apps-script/reference/drive/folder
   */
  getId(...args) { return this.folder.getId(...args); }
  getFiles(...args) { return this.folder.getFiles(...args); }

  /**
   * 任意の文字列を含んだファイルを削除するメソッド
   * @param {string} string - ファイル名に含まれているか鑑定する任意の文字列
   */
  removeFilesInclude(string) {
    const files = this.getFiles(true);
    files.forEach(file => {
      const isInclude = file.getName().includes(string);
      if (isInclude) file.setTrashed(true);
    });
  }

  /**
   * フォルダー オブジェクト内のファイルを取得するメソッド
   * @param {boolean} isArray - 配列として返すかどうか。デフォルト引数は「false」
   * @return {DriveApp.FileIterator|Array.<DriveApp.File>} ファイル イテレーターかファイルオブジェクトを要素として持つ配列
   */
  getFiles(isArray = false) {
    const files = this.getFiles();
    if (!isArray) return files;
    const filesAsArray = this.getFilesAsArray(files);
    return filesAsArray;
  }

  /**
   * ファイル イテレーターからファイル オブジェクトを配列として取得するメソッド
   * @return {Array.<DriveApp.File>} ファイル オブジェクトを要素として持つ配列
   */
  createArrayFiles(files) {
    const filesAsArray = [];
    while (files.hasNext()) {
      filesAsArray.push(files.next());
    }
    return filesAsArray;
  }

  /**
   * ファイル名からファイルを取得する関数
   * @return {DriveApp.File}
   */
  getByName(name) {
    const files = DriveApp.getFilesByName(name);
    try {
      return files.next();
    } catch (e) { throw new Error('指定されたファイルが見つかりません'); }
  }

}