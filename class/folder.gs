'use strict'

class Folder {

  /**
   * フォルダー オブジェクトに関するコンストラクタ
   * @constructor
   * @param {DriveApp.folder} folder - フォルダー
   */
  constructor(folder) {
    /** @type {DriveApp.folder} */
    this.folder = folder;
  }

  /**
   * Class Folder から委譲されたメソッド
   * NOTE: https://developers.google.com/apps-script/reference/drive/folder
   */
  getId() { return this.folder.getId(); }
  getFiles() { return this.folder.getFiles(); }
  getUrl() { return this.folder.getUrl(); }
  createFolder(...args) { return this.folder.createFolder(...args); }
  setName(...args) { return this.folder.setName(...args); }

  /**
   * 子フォルダーを作成する (同名のフォルダーがある場合は作成しない) メソッド 
   * @param {string} folderName - 作成する子フォルダーの名前
   * @return {Folder} 新しく作成された (もしくは既に存在していた) フォルダーの Folder オブジェクト
   */
  createChildFolder(folderName) {
    const folders = this.getFoldersByName(folderName);
    const childFolder = folders.hasNext() ? folders.next() : this.createFolder(folderName);
    return new Folder(childFolder);
  }

  /**
   * 任意の文字列を含んだファイルを削除するメソッド
   * @param {string} string - ファイル名に含まれているか鑑定する任意の文字列
   */
  removeFilesInclude(string) {
    const files = this.getFiles();
    files.forEach(file => {
      const isInclude = file.getName().includes(string);
      if (isInclude) file.setTrashed(true);
    });
  }

  /**
   * ファイル イテレーターからファイル オブジェクトを配列として取得するメソッド
   * @param {DriveApp.FileIterator} - ファイル イテレーター
   * @return {Array.<DriveApp.File>} ファイル オブジェクトを要素として持つ配列
   */
  createArrayFiles(files = this.getFiles()) {
    const filesAsArray = [];
    while (files.hasNext()) {
      filesAsArray.push(files.next());
    }
    return filesAsArray;
  }

  // /**
  //  * ファイル名からファイルを取得するメソッド
  //  * @param {string} name - ファイル名
  //  * @return {DriveApp.File} ファイル オブジェクト
  //  */
  // getByName(name) {
  //   const files = DriveApp.getFilesByName(name);
  //   try {
  //     return files.next();
  //   } catch (e) { throw new Error('The specified file could not be found'); }
  // }

  /**
   * フォルダー URL から Folder オブジェクトを取得する静的メソッド
   * @param {string} folderUrl - フォルダーの URL
   * @return {Folder} Folder オブジェクト
   */
  static getByUrl(folderUrl) {
    const folderId = folderUrl.match(/(?<=folders\/).*?(?=\/|$)/);
    const folder = new Folder(DriveApp.getFolderById(folderId));
    return folder;
  }

  /**
   * フォルダー ID から Folder オブジェクトを取得する静的メソッド
   * @param {string} folderId - フォルダーの ID
   * @return {Folder} Folder オブジェクト
   */
  static getById(folderId) {
    const folder = new Folder(DriveApp.getFolderById(folderId));
    return folder;
  }

}