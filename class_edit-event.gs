'use strict'

class EditEvent {

  /**
   * 編集イベントに関するコンストラクタ
   * @constructor
   * @param {Object} e - 編集イベント オブジェクト
   */
  constructor(e) {
    /** @type {Object} */
    this.e = e;
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
   * 編集前と編集後の値が同じかどうかを判定するメソッド
   * @return {boolean} 編集前と編集後の値が同じかどうか
   * NOTE: 同じ値をコピー・アンド・ペーストした場合でも編集と判定されるため
   */
  isSameValue() {
    return this.e.oldValue === this.e.value;
  }

  /**
   * 単一セルに対する操作かどうかを判定するメソッド
   * @return {boolean} 単一セルに対する操作かどうか
   */
  isSingleCell() {
    const { rowStart, rowEnd, columnStart, columnEnd } = this.e.range;
    return rowStart === rowEnd && columnStart === columnEnd;
  }

}