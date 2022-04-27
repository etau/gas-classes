'use strict'

class Spreadsheet {

  /**
   * スプレッドシートに関するコンストラクタ
   * @constructor
   * @param {SpreadsheetApp.spreadsheet} spreadsheet - 対象となるスプレッドシート。デフォルト引数は「SpreadsheetApp.getActiveSpreadsheet()」
   */
  constructor(spreadsheet = SpreadsheetApp.getActiveSpreadsheet()) {
    /** @type {SpreadsheetApp.spreadsheet} */
    this.spreadsheet = spreadsheet;
  }

  /**
   * Class SpreadsheetApp から委譲されたメソッド
   * NOTE: https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app
   */
  getId() { return this.spreadsheet.getId(); }
  getById() { return this.spreadsheet.openById(); }

  /**
   * スプレッドシートのコピーを作成するメソッド
   * @param {string} name - ファイル名。デフォルト引数は、Copy of + コピー元のスプレッドシート名
   * @param {DriveApp.folder} folder - コピーするスプレッドシートを作成するフォルダー。デフォルト引数はコピー元のスプレッドシートの親フォルダ
   * @return {Object} 本クラスで生成された Spreadsheet オブジェクト
   */
  copy(name = 'Copy of ' + this.spreadsheet.getName(), folder = this.getParentFolder()) {
    const file = DriveApp.getFileById(this.getId());
    const newFile = file.makeCopy(name, folder);
    const spreadsheet = this.getById(newFile.getId());
    return new Spreadsheet(spreadsheet);
  }

  /**
   * 親フォルダを取得するメソッド
   * @return {Object} 親フォルダ NOTE: 旧設定の場合意図しないフォルダが取れる可能性あり
   */
  getParentFolder() {
    const parentFolder = DriveApp.getFileById(this.getId()).getParents().next();
    return parentFolder;
  }

}