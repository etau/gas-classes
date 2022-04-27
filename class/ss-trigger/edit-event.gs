'use strict'

class TriggerEditEvent {

  /**
   * 編集イベントに関するコンストラクタ
   * @constructor
   * @param {Object} e - 編集イベント オブジェクト
   */
  constructor(e) {
    /** @type {Object} */
    this.e = e;
    /** @type {SpreadsheetApp.Spreadsheet} */
    this.source = e.source;
    /** @type {SpreadsheetApp.Range} */
    this.range = e.range;
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
   * 編集前後の値が同じかどうかを判定するメソッド
   * @return {boolean|undefined} 編集前後の値が同じかどうか
   * NOTE: 同じ値をコピー・アンド・ペーストした場合でも編集と判定されるため
   */
  isSameValue() {
    if (!this.isSingleCell()) return undefined;
    return this.e.oldValue === this.e.value;
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