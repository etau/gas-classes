'use strict'

/**
 * 値に関するクラス
 */
class Values {

  /**
   * 値に関するコンストラクタ
   * @constructor
   * @param {Array.<Array.<string|number|boolean|Date>>} values - 値
   */
  constructor(values) {
    this.values = values;
  }

  /**
   * 特定列情報だけを抜き出すメソッド
   * @return {Array.<Array.<string|number|boolean|Date>>} 列情報を 2 次元配列
   */
  getColumnValues(numColumn) {
    const index = numColumn - 1;
    const columnValues = this.values.
      map(record => record[index]);
    return columnValues;
  }

  /**
   * 配列内から A1 型式の場所の要素を返すメソッド
   * @param {string} a1Notation - A1 形式表記
   * @return {stirng|number|boolean|Date} 指定された配列内の値
   */
  getValueByA1Notation(a1Notation) {
    const rc = this.getRCByA1Notation(a1Notation);
    const value = this.values[rc.row - 1][rc.column - 1];
    return value;
  }

  /**
   * 配列内から A1 型式の場所の要素を返すメソッド
   * @param {string} a1Notation - A1 形式表記
   * @return {stirng|number|boolean|Date} 指定された配列内の値
   */
  getValuesByA1Notation(a1Notation) {
    const a1Notations = a1Notation.split(':');
    const rcs = a1Notations.map(a1 => this.getRCByA1Notation(a1));
    const rows = rcs.map(rc => rc.row);
    const columns = rcs.map(rc => rc.column);

    const values = this.values.filter(
      (_, i) => Math.min(...rows) <= i + 1 && i + 1 <= Math.max(...rows)).map(
        r => r.filter((_, i) => Math.min(...columns) <= i + 1 && i + 1 <= Math.max(...columns)));
    return values;
  }

  /**
   * A1 形式表記から行数と列数を返すメソッド
   * @param {string} a1Notation - A1 形式表記
   * @return {Object} row と column をプロパティとして持つ
   */
  getRCByA1Notation(a1Notation) {
    const row = this.getRow(a1Notation);
    const a1Column = a1Notation.split(String(row))[0];
    const column = this.getColumn(a1Column);
    const rowAndColumn = { row, column };
    return rowAndColumn;
  }

  /**
   * A1 形式表記から行数を返すメソッド
   * @param {string} a1Notation - A1 形式表記
   * @return {number} 行数 
   */
  getRow(a1Notation) {
    const row = Number(a1Notation.match(/\d*$/)[0]);
    return row;
  }

  /**
   * A1 形式表記の列数から列数を返すメソッド
   * @param {string} a1Column - A1 形式表記の列数
   * @return {number} 列数
   */
  getColumn(a1Column) {
    const a1ColumnCharacters = a1Column.split('');
    const column = a1ColumnCharacters.
      reduce((acc, cur) => acc * 26 + cur.charCodeAt() - 64, 0);
    return column;
  }

}