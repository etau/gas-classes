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
  getId() { return this.folder.getId(); }
  getFiles() { return this.folder.getFiles(); }

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
   * ファイル イテレーターからファイル オブジェクトを配列として取得するメソッド
   * @return {Array.<DriveApp.File>} ファイル オブジェクトを要素として持つ配列
   */
  createArrayFiles(files = this.folder.getFiles() ) {
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
    } catch (e) { throw new Error('The specified file could not be found'); }
  }

  /**
   * グーグルドライブフォルダのURLからフォルダを取得する静的メソッド
   * @param {string} url - フォルダー ID を含む グーグルドライブフォルダの URL
   * @return {DriveApp.folder}
   */
  static getByUrl(url){
    const folderId = url.match("(?<=drive\/folders\/).*?(?=\/|$)");
    const folder = DriveApp.getFolderById(folderId);
    return folder;
  }

}