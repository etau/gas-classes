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
    /** @type {Object} */
    this.range = e.range;
  }

  /**
   * 単一セルに対する操作かどうかを判定するメソッド
   * @return {boolean} 単一セルに対する操作かどうか
   */
  isSingleCell_() {
    const { rowStart, rowEnd, columnStart, columnEnd } = this.e.range;
    return rowStart === rowEnd && columnStart === columnEnd;
  }

}