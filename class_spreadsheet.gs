'use strict'

/**
 * スプレッドシートに関するクラス
 */
class Spreadsheet {

  /**
   * スプレッドシートに関するコンストラクタ
   * @constructor
   * @param {SpreadsheetApp.spreadsheet} spreadsheet - 対象となるスプレッドシート。デフォルト引数は「SpreadsheetApp.getActiveSpreadsheet()」
   */
  constructor(spreadsheet = SpreadsheetApp.getActiveSpreadsheet()) {
    new Type(spreadsheet, TYPE.SPREADSHEET);
    /** @type {SpreadsheetApp.spreadsheet} */
    this.spreadsheet = spreadsheet;
  }

  /**
   * スプレッドシートのコピーを作成するメソッド
   * @param {string} name - ファイル名。デフォルト引数は、Copy of + コピー元のスプレッドシート名
   * @param {DriveApp.folder} folder - コピーするスプレッドシートを作成するフォルダー。デフォルト引数はコピー元のスプレッドシートの親フォルダ
   * @return {Object} 本クラスで生成された Spreadsheet オブジェクト
   */
  copy(name = 'Copy of ' + this.spreadsheet.getName(), folder = this.getParentFolder()) {
    new Type(name, TYPE.STRING);
    new Type(folder, TYPE.FOLDER);
    const file = DriveApp.getFileById(this.spreadsheet.getId());
    const newFile = file.makeCopy(name, folder);
    const spreadsheet = SpreadsheetApp.openById(newFile.getId());
    return new Spreadsheet(spreadsheet);
  }

  /**
   * 親フォルダを取得するメソッド
   * @return {Object} 親フォルダ
   */
  getParentFolder() {
    const parentFolder = DriveApp.getFileById(this.spreadsheet.getId()).getParents().next();
    return parentFolder;
  }

}