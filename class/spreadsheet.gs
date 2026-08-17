'use strict';

/**
 * スプレッドシートに関するクラス
 */
class Spreadsheet {

  /**
   * スプレッドシートに関するコンストラクタ
   * @constructor
   * @param {SpreadsheetApp.Spreadsheet} spreadsheet - 対象となるスプレッドシート
   */
  constructor(spreadsheet = SpreadsheetApp.getActiveSpreadsheet()) {
    /** @type {SpreadsheetApp.Spreadsheet} */
    this.spreadsheet = spreadsheet;
  }

  /**
   * Class Spreadsheet から委譲されたメソッド
   * NOTE: https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet
   */
  getId() { return this.spreadsheet.getId(); }
  getName() { return this.spreadsheet.getName(); }
  getUrl() { return this.spreadsheet.getUrl(); }
  moveActiveSheet(...args) { return this.spreadsheet.moveActiveSheet(...args); }

  /**
   * すべてのシートを Sheet オブジェクトの配列で取得するメソッド
   * @param {number} headerRows - ヘッダーの行数
   * @return {Array.<Sheet>} Sheet オブジェクトの配列
   */
  getSheets(headerRows = 1) {
    const sheets = this.spreadsheet.getSheets().map(sheet => new Sheet(sheet, headerRows));
    return sheets;
  }

  /**
   * シート名から Sheet オブジェクトを取得するメソッド
   * @param {string} sheetName - シート名
   * @param {number} headerRows - ヘッダーの行数
   * @return {Sheet} Sheet オブジェクト
   * @throws シート名が存在しない場合のエラー
   */
  getSheetByName(sheetName, headerRows = 1) {
    const sheet = this.spreadsheet.getSheetByName(sheetName);
    if (sheet === null) throw new Error('The sheet "' + sheetName + '" does not exist in the spreadsheet "' + this.getName() + '".');
    return new Sheet(sheet, headerRows);
  }

  /**
   * スプレッドシートのコピーを作成するメソッド
   * @param {string} name - ファイル名
   * @param {DriveApp.Folder} folder - コピーするスプレッドシートを作成するフォルダー
   * @return {Spreadsheet} コピーで生成された Spreadsheet オブジェクト
   */
  copy(name = 'Copy of ' + this.getName(), folder = this.getParentFolder()) {
    const file = DriveApp.getFileById(this.getId());
    const copiedFile = file.makeCopy(name, folder);
    return new Spreadsheet(SpreadsheetApp.openById(copiedFile.getId()));
  }

  /**
   * 親フォルダーを取得するメソッド
   * @return {DriveApp.Folder} 親フォルダー
   * NOTE: 複数の親フォルダーを持つ旧設定の場合、意図しないフォルダーが取れる可能性あり
   */
  getParentFolder() {
    const parentFolder = DriveApp.getFileById(this.getId()).getParents().next();
    return parentFolder;
  }

}
