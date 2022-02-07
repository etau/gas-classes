'use strict'

class ChangeEvent {

  /**
   * 変更イベントに関するコンストラクタ
   * @constructor
   * @param {Object} e - イベントオブジェクト
   */
  constructor(e) {
    /** @type {Object} */
    this.e = e;
    /** @type {} */
    this.changeType = e.changeType;
    /** @type {SpreadsheetApp.Sheet} */
    this.sheet = e.source.getActiveSheet();
    /** @type {SpreadsheetApp.Range} */
    this.range = e.source.getActiveRange();
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