'use strict'

class ChangingEvent {

  /**
   * 変更イベントに関するコンストラクタ
   * @constructor
   * @param {Object} e - イベントオブジェクト
   */
  constructor(e) {
    /** @type {Object} */
    this.e = e;
    /** */
    this.changeType = e.changeType;
    /** @type {SpreadsheetApp.Sheet} */
    this.sheet = e.source.getActiveSheet();
    /** @type {SpreadsheetApp.Range} */
    this.range = e.source.getActiveSheet().getActiveRange();
  }

  /**
   * 単一セルの操作かどうか判定するメソッド
   * @return {boolean}
   */
  isSingleCell() {
    const numRows = this.range.getNumRows();
    const numColumns = this.range.getNumColumns();
    return numRows + numColumns === 2;
  }

}