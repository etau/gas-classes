'use strict';

/**
 * スプレッドシートの変更イベントに関するクラス
 */
class TriggerChangeEvent {

  /**
   * 変更イベントに関するコンストラクタ
   * @constructor
   * @param {Object} e - 変更イベント オブジェクト
   */
  constructor(e) {
    /** @type {Object} */
    this.e = e;
    /** @type {string} */
    this.changeType = e.changeType;
    /** @type {SpreadsheetApp.Spreadsheet} */
    this.source = e.source;
  }

  /**
   * イベントが実行されたシートを取得するメソッド
   * @param {number} headerRows - ヘッダーの行数
   * @return {Sheet} Sheet オブジェクト
   */
  getSourceSheet(headerRows = 1) {
    const sourceSheet = this.source.getActiveSheet();
    return new Sheet(sourceSheet, headerRows);
  }

  /**
   * イベントが実行された範囲を取得するメソッド
   * @return {Range} Range オブジェクト
   */
  getSourceRange() {
    const sourceRange = this.source.getActiveRange();
    return new Range(sourceRange);
  }

  /**
   * 単一セルの操作かどうか判定するメソッド
   * @return {boolean} 単一セルへの操作かどうか
   * NOTE: 判定そのものは Range クラスに集約している
   */
  isSingleCell() {
    return this.getSourceRange().isSingleCell();
  }

}
