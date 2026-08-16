'use strict'

class Range {

  /**
   * Range に関するコンストラクタ
   * @constructor
   * @param {SpreadsheetApp.Range} range - Range オブジェクト
   */
  constructor(range) {
    /** @type {SpreadsheetApp.Range} */
    this.range = range;
  }

  /**
   * Class Range から委譲されたメソッド
   * NOTE: https://developers.google.com/apps-script/reference/spreadsheet/range
   */
  getFontColor() { return this.range.getFontColor(); }
  getBackgroundColor() { return this.range.getBackground(); }
  setBackground(...args) { return this.range.setBackground(...args); }
  setFontLine(...args) { return this.range.setFontLine(...args); }

  /**
   * 同じ色かどうかを判定するメソッド
   * @param {string} colorCode - 比較する 16 進数表記の文字色
   * @return {boolean} 文字色が同じかどうか
   */
  isSameFontColor(colorCode) {
    const fontColor = this.getFontColor();
    return fontColor === colorCode;
  }

  /**
   * 文字色をつけるメソッド
   * @param {string} color - 文字色
   * @return {Range} Range オブジェクト
   * NOTE: 委譲メソッドと同名のため、ここで直接 this.range を操作する
   */
  setFontColor(color = 'red') {
    this.range.setFontColor(color);
    return this;
  }

  /**
   * 背景色をつけるメソッド
   * @param {string} color - 背景色
   * @return {Range} Range オブジェクト
   */
  setBackgroundColor(color = 'red') {
    this.setBackground(color);
    return this;
  }

  /**
   * 取り消し線をつけるメソッド
   * @return {Range} Range オブジェクト
   */
  setCancelLine() {
    this.setFontLine('line-through');
    return this;
  }

}