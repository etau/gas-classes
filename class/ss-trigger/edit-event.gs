'use strict';

/**
 * スプレッドシートの編集イベントに関するクラス
 */
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
   * @param {number} headerRows - ヘッダーの行数
   * @return {Sheet} Sheet オブジェクト
   */
  getSourceSheet(headerRows = 1) {
    const sourceSheet = this.source.getActiveSheet();
    return new Sheet(sourceSheet, headerRows);
  }

  /**
   * 編集された範囲を取得するメソッド
   * @return {Range} Range オブジェクト
   */
  getSourceRange() {
    return new Range(this.range);
  }

  /**
   * 単一セルの編集かどうか判定するメソッド
   * @return {boolean} 単一セルへの編集かどうか
   * NOTE: 判定そのものは Range クラスに集約している
   */
  isSingleCell() {
    return this.getSourceRange().isSingleCell();
  }

  /**
   * 編集前後の値が同じかどうかを判定するメソッド
   * @return {boolean|undefined} 編集前後の値が同じかどうか。単一セルの編集でない場合は undefined
   * NOTE: 同じ値をコピー・アンド・ペーストした場合でも編集と判定されるため
   */
  isSameValue() {
    if (!this.isSingleCell()) return undefined;
    return this.e.oldValue === this.e.value;
  }

  /**
   * 編集範囲の値をクリアするメソッド
   * @return {TriggerEditEvent} TriggerEditEvent オブジェクト
   */
  clearContent() {
    this.getSourceRange().clearContent();
    return this;
  }

}
