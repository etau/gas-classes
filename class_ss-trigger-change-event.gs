'use strict'

class TriggerChangeEvent {

  /**
   * 変更イベントに関するコンストラクタ
   * @constructor
   * @param {Object} e - イベントオブジェクト
   */
  constructor(e) {
    /** @type {Object} */
    this.e = e;
    /** @type {string} */
    this.changeType = e.changeType;
    /** @type {Object} */
    this.source = e.source;
  }

  /**
   * イベントが実行されたシートを取得するメソッド
   * @return {SpreadsheetApp.Sheet} Sheet オブジェクト
   */
  getSourceSheet() {
    const sourceSheet = this.source.getActiveSheet();
    return sourceSheet;
  }

  /**
   * イベントが実行された範囲を取得するメソッド
   * @return {SpreadsheetApp.Range} Range オブジェクト
   */
  getSourceRange() {
    const sourceRange = this.source.getActiveRange();
    return sourceRange;
  }

  /**
   * 単一セルの操作かどうか判定するメソッド
   * @return {boolean}
   */
  isSingleCell() {
    const numRows = this.range.getNumRows();
    const numColumns = this.range.getNumColumns();
    return numRows * numColumns === 1;
  }

}