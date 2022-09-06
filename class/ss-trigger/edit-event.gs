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
   * 編集前後の値が同じかどうかを判定するメソッド
   * @return {boolean|undefined} 編集前後の値が同じかどうか
   * NOTE: 同じ値をコピー・アンド・ペーストした場合でも編集と判定されるため
   */
  isSameValue() {
    if (!this.isSingleCell()) return undefined;
    return this.e.oldValue === this.e.value;
  }

  /**
   * 単一セルの編集かどうか判定するメソッド
   * @return {boolean} 単一セルへの編集かどうか
   */
  isSingleCell() {
    const numRows = this.range.getNumRows();
    const numColumns = this.range.getNumColumns();
    return numRows * numColumns === 1;
  }

  /**
   * 編集範囲の値をクリアする関数
   */
  clearContent() {
    const range = this.range;
    range.clearContent();
  }

}