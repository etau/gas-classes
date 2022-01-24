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
  setFontColor(...args) { return this.range.setFontColor(...args); }
  getBackgroundColor() { return this.range.getBackground(); }
  setBackground(...args) { return this.range.setBackground(...args); }
  setFontLine(...args) { return this.range.setFontLine(...args); }

  /**
   * 同じ色かどうかを判定するメソッド
   * @param {string} colerCode - 比較する 16 進数表記の文字色
   * @return {boolean} 文字色が同じかどうか
   */
  isSameFontColor(colerCode) {
    const fontColor = this.getFontColor();
    return fontColor === colerCode;
  }

  /**
   * 文字色をつけるメソッド
   * @param {string} color - 文字色。デフォルト引数は「red]
   */
  setFontColor(color = 'red') {
    this.setFontColor(color);
  }

  /**
   * 背景色をつけるメソッド
   * @param {string} color - 背景色。デフォルト引数は「red]
   */
  setBackgroundColor(color = 'red') {
    this.setBackground(color);
  }

  /**
   * 取り消し線をつけるメソッド
   */
  setCancelLine() {
    this.setFontLine('line-through');
  }

}