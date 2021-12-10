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
   * 同じ色かどうかを判定するメソッド
   * @param {string} colerCode - 比較する 16 進数表記の文字色
   * @return {boolean} 文字色が同じかどうか
   */
  isSameFontColor(colerCode) {
    const fontColor = this.getFontColor();
    return fontColor === colerCode;
  }

  /**
   * 文字色を取得するメソッド
   * @return {string} 16 進数表記の文字色
   */
  getFontColor() {
    const color = this.range.getFontColor();
    return color;
  }

  /**
   * 背景色を取得するメソッド
   * @return {string} 16 進数表記の文字色
   */
  getBackgroundColor() {
    const color = this.range.getBackground();
    return color;
  }

  /**
   * 文字色をつけるメソッド
   * @param {string} color - 文字色。デフォルト引数は「red]
   */
  setFontColor(color = 'red') {
    this.range.setFontColor(color);
  }

  /**
   * 背景色をつけるメソッド
   * @param {string} color - 背景色。デフォルト引数は「red]
   */
  setBackgroundColor(color = 'red') {
    this.range.setBackground(color);
  }

  /**
   * 取り消し線をつけるメソッド
   */
  setCancelLine() {
    this.range.setFontLine('line-through');
  }

}