'use strict'

class EditingEvent {

  /**
   * 編集イベントに関するコンストラクタ
   * @constructor
   * @param {Object} e - 編集イベント オブジェクト
   */
  constructor(e) {
    /** @type {Object} */
    this.e = e;
    /** @tyep {SpreadsheetApp.sheet} */
    this.sheet = e.source.getActiveSheet();
    /** @type {SpreadsheetApp.Range} */
    this.range = e.source.getActiveRange();
  }

  /**
   * 編集前の値と同じかどうかを判定するメソッド NOTE: 同じ値をコピー・アンド・ペーストした場合でも編集と判定されるため
   * @return {boolean} 編集前の値と同じかどうか
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