'use strict';

/**
 * セル範囲に関するクラス
 */
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
  getA1Notation() { return this.range.getA1Notation(); }
  getFontColor() { return this.range.getFontColor(); }
  getBackground() { return this.range.getBackground(); }
  getNumRows() { return this.range.getNumRows(); }
  getNumColumns() { return this.range.getNumColumns(); }
  setBackground(...args) { return this.range.setBackground(...args); }
  setFontLine(...args) { return this.range.setFontLine(...args); }
  clearContent() { return this.range.clearContent(); }

  /**
   * 背景色を取得するメソッド
   * @return {string} 16 進数表記の背景色
   * NOTE: setBackgroundColor と対になる名前で提供する
   */
  getBackgroundColor() {
    const backgroundColor = this.getBackground();
    return backgroundColor;
  }

  /**
   * 文字色が同じかどうかを判定するメソッド
   * @param {string} colorCode - 比較する 16 進数表記の文字色
   * @return {boolean} 文字色が同じかどうか
   */
  isSameFontColor(colorCode) {
    const fontColor = this.getFontColor();
    return fontColor === colorCode;
  }

  /**
   * 背景色が同じかどうかを判定するメソッド
   * @param {string} colorCode - 比較する 16 進数表記の背景色
   * @return {boolean} 背景色が同じかどうか
   */
  isSameBackgroundColor(colorCode) {
    const backgroundColor = this.getBackgroundColor();
    return backgroundColor === colorCode;
  }

  /**
   * 単一セルかどうかを判定するメソッド
   * @return {boolean} 単一セルかどうか
   */
  isSingleCell() {
    const numRows = this.getNumRows();
    const numColumns = this.getNumColumns();
    return numRows * numColumns === 1;
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

  /**
   * 列番号から A1 形式表記の列を取得する静的メソッド
   * @param {number} column - 列番号 (一番左から 1, 2, 3,...)
   * @return {string} A1 形式表記の列 例: 27 -> 'AA'
   * NOTE: 例外 2 - 26 進数への桁上がりを繰り返す処理のため、反復メソッドではなく while 文を使用する
   */
  static getColumnA1Notation(column) {
    let restColumn = column;
    let a1Column = '';
    while (restColumn > 0) {
      const remainder = (restColumn - 1) % 26;
      a1Column = String.fromCharCode(remainder + 65) + a1Column;
      restColumn = (restColumn - remainder - 1) / 26;
    }
    return a1Column;
  }

  /**
   * A1 形式表記の列から列番号を返す静的メソッド
   * @param {string} a1Column - A1 形式表記の列 例: 'AA'
   * @return {number} 列番号 (一番左から 1, 2, 3,...)
   */
  static getColumnByA1Notation(a1Column) {
    const a1ColumnCharacters = a1Column.toUpperCase().split('');
    const column = a1ColumnCharacters.reduce((acc, cur) => acc * 26 + cur.charCodeAt() - 64, 0);
    return column;
  }

  /**
   * A1 形式表記から行番号を返す静的メソッド
   * @param {string} a1Notation - A1 形式表記 例: 'B2'
   * @return {number} 行番号 (一番上から 1, 2, 3,...)
   */
  static getRowByA1Notation(a1Notation) {
    const row = Number(a1Notation.match(/\d*$/)[0]);
    return row;
  }

  /**
   * A1 形式表記から行番号と列番号を返す静的メソッド
   * @param {string} a1Notation - A1 形式表記 例: 'B2'
   * @return {Object.<number>} row と column をプロパティとして持つオブジェクト
   */
  static getRcByA1Notation(a1Notation) {
    const row = Range.getRowByA1Notation(a1Notation);
    const a1Column = a1Notation.split(String(row))[0];
    const column = Range.getColumnByA1Notation(a1Column);
    const rowAndColumn = { row: row, column: column };
    return rowAndColumn;
  }

}
