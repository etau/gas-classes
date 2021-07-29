/**
 * スプレッドシートに関するクラス
 */
class Spreadsheet {

  /**
   * スプレッドシートに関するコンストラクタ
   * @constructor
   * @param {SpreadsheetApp.spreadsheet} spreadsheet - 対象となるスプレッドシート
   */
  constructor(spreadsheet = SpreadsheetApp.getActiveSpreadsheet()) {
    this.ss = spreadsheet;
  }

  /**
   * 親フォルダを取得するメソッド
   * @return {Object} 親フォルダ
   */
  getParentFolder() {
    const parentFolder = DriveApp.getFileById(this.ss.getId()).getParents().next();
    return parentFolder;
  }

  /**
   * スプレッドシートに存在するすべてのシート情報を取得するメソッド
   * @return {Array.<SpreadsheetApp.Sheet>} スプレッドシートに存在するすべてのシート情報
   */
  getSheetInfos() {
    const sheets = this.ss.getSheets();
    const sheetInfos = sheets.
      map((sheet, i) => ({ sheet: sheet, name: sheet.getName(), index: i }));
    return sheetInfos;
  }

  /**
   * シート情報をシート名から取得するメソッド
   * @param {string} sheetName - シート名
   * @return {Object} シート情報
   */
  getSheetInfoByName(sheetName) {
    const sheetInfo = this.sheetInfos.
      find(sheetInfo => sheetInfo.name === sheetName);
    return sheetInfo;
  }

  /**
   * シート情報をシート名から取得するメソッド
   * @param {number} sheetIndex - シート インデックス
   * @return {Object} シート情報
   */
  getSheetInfoByIndex(sheetIndex) {
    const sheetInfo = this.sheetInfos.
      find(sheetInfo => sheetInfo.index === sheetIndex);
    return sheetInfo;
  }

}

const SS = Object.freeze(new Spreadsheet());