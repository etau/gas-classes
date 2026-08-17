'use strict';

/**
 * Google ドライブのフォルダーに関するクラス
 */
class Folder {

  /**
   * フォルダー オブジェクトに関するコンストラクタ
   * @constructor
   * @param {DriveApp.Folder} folder - フォルダー
   */
  constructor(folder) {
    /** @type {DriveApp.Folder} */
    this.folder = folder;
  }

  /**
   * Class Folder から委譲されたメソッド
   * NOTE: https://developers.google.com/apps-script/reference/drive/folder
   */
  getId() { return this.folder.getId(); }
  getUrl() { return this.folder.getUrl(); }
  getName() { return this.folder.getName(); }
  getParents() { return this.folder.getParents(); }
  createFolder(...args) { return this.folder.createFolder(...args); }
  setName(...args) { return this.folder.setName(...args); }
  setTrashed(...args) { return this.folder.setTrashed(...args); }

  /**
   * フォルダー内にファイルを作成するメソッド
   * @param {...*} args - DriveApp.Folder の createFile メソッドに渡す引数
   * @return {File} 作成されたファイルの File オブジェクト
   */
  createFile(...args) {
    const file = this.folder.createFile(...args);
    return new File(file);
  }

  /**
   * フォルダー内のファイルを配列で取得するメソッド
   * @return {Array.<File>} フォルダー内のファイルの配列
   */
  getFiles() {
    const fileIterator = this.folder.getFiles();
    const files = Folder.getIteratorAsArray(fileIterator).map(file => new File(file));
    return files;
  }

  /**
   * フォルダー内のフォルダーを配列で取得するメソッド
   * @return {Array.<Folder>} フォルダー内のフォルダーの配列
   */
  getFolders() {
    const folderIterator = this.folder.getFolders();
    const folders = Folder.getIteratorAsArray(folderIterator).map(folder => new Folder(folder));
    return folders;
  }

  /**
   * 子フォルダーを作成する (同名のフォルダーがある場合は作成しない) メソッド
   * @param {string} folderName - 作成する子フォルダーの名前
   * @return {Folder} 新しく作成された (もしくは既に存在していた) フォルダーの Folder オブジェクト
   */
  createChildFolder(folderName) {
    const folders = this.folder.getFoldersByName(folderName);
    const childFolder = folders.hasNext() ? folders.next() : this.createFolder(folderName);
    return new Folder(childFolder);
  }

  /**
   * 任意の文字列をファイル名に含んだファイルをゴミ箱に移動するメソッド
   * @param {string} partialName - ファイル名に含まれているか判定する任意の文字列
   * @return {Folder} Folder オブジェクト
   */
  trashFilesByPartialName(partialName) {
    const files = this.getFiles();
    files
      .filter(file => file.getName().includes(partialName))
      .forEach(file => file.setTrashed(true));
    return this;
  }

  /**
   * イテレーターを配列化する静的メソッド
   * @param {DriveApp.FileIterator|DriveApp.FolderIterator} iterator - ファイル・フォルダー オブジェクトのイテレーター
   * @return {Array.<DriveApp.File|DriveApp.Folder>} 配列化されたファイル・フォルダー オブジェクト
   */
  static getIteratorAsArray(iterator) {
    const array = Array.from(Folder.generator_(iterator));
    return array;
  }

  /**
   * イテレーターからジェネレーターを生成するプライベートな静的メソッド
   * @param {DriveApp.FileIterator|DriveApp.FolderIterator} iterator - ファイル・フォルダー オブジェクトのイテレーター
   * @return {Generator} ジェネレーター オブジェクト
   * NOTE: 例外 1 - DriveApp のイテレータは配列ではないため反復メソッドが使えない
   */
  static * generator_(iterator) {
    while (iterator.hasNext()) {
      yield iterator.next();
    }
  }

  /**
   * フォルダー URL から Folder オブジェクトを取得する静的メソッド
   * @param {string} folderUrl - フォルダーの URL
   * @return {Folder} Folder オブジェクト
   */
  static getByUrl(folderUrl) {
    const folderId = folderUrl.match(/(?<=folders\/).*?(?=\/|$)/)[0];
    const folder = Folder.getById(folderId);
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
