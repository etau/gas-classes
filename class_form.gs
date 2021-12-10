'use strict'

class Form {

  /**
   * フォームに関するコンストラクタ
   * @constructor
   * @param {Object} e - フォーム送信時のイベント オブジェクト
   */
  constructor(e) {
    [this.ts, ...this.values] = e.values;
    this.ts = e.values[0];
    this.namedValues = e.namedValues;
    this.values = e.values;
    this.range = e.range;
  }

  /**
   * イベント オブジェクトから Range オブジェクトを取得するメソッド
   * @return {SpreadsheetApp.Range} イベントオブジェクト 範囲のスプレッドシートの Range オブジェクト
   */
  getRange() {
    const sheet = this.e.source.getActiveSheet();
    const { rowStart, rowEnd, columnStart, columnEnd } = this.e.range;
    const numRows = Math.abs(rowStart - rowEnd) + 1;
    const numColumns = Math.abs(columnStart - columnEnd) + 1;
    const sheetRange = sheet.getRange(rowStart, columnStart, numRows, numColumns);
    return sheetRange;
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

