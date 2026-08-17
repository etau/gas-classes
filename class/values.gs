'use strict';

/**
 * 2 次元配列の値に関するクラス
 * NOTE: A1 形式表記の解析は Range クラスの静的メソッドに集約している
 */
class Values {

  /**
   * 値に関するコンストラクタ
   * @constructor
   * @param {Array.<Array.<string|number|boolean|Date>>} values - 値
   */
  constructor(values) {
    /** @type {Array.<Array.<string|number|boolean|Date>>} */
    this.values = values;
  }

  /**
   * 特定列の値だけを抜き出すメソッド
   * @param {number} column - 抜き出す列番号 (一番左から 1, 2, 3,...)
   * @return {Array.<string|number|boolean|Date>} 列の値
   */
  getColumnValues(column) {
    const index = column - 1;
    const columnValues = this.values.map(record => record[index]);
    return columnValues;
  }

  /**
   * 特定行の値だけを抜き出すメソッド
   * @param {number} row - 抜き出す行番号 (一番上から 1, 2, 3,...)
   * @return {Array.<string|number|boolean|Date>} 行の値
   */
  getRowValues(row) {
    const index = row - 1;
    const rowValues = this.values[index];
    return rowValues;
  }

  /**
   * 配列内から A1 形式で指定された場所の要素を返すメソッド
   * @param {string} a1Notation - A1 形式表記 例: 'B2'
   * @return {string|number|boolean|Date} 指定された配列内の値
   */
  getValueByA1Notation(a1Notation) {
    const rc = Range.getRcByA1Notation(a1Notation);
    const value = this.values[rc.row - 1][rc.column - 1];
    return value;
  }

  /**
   * 配列内から A1 形式で指定された範囲の要素を返すメソッド
   * @param {string} a1Notation - A1 形式表記 例: 'A1:C3'
   * @return {Array.<Array.<string|number|boolean|Date>>} 指定された範囲の値
   */
  getValuesByA1Notation(a1Notation) {
    const a1Notations = a1Notation.split(':');
    const rcs = a1Notations.map(a1 => Range.getRcByA1Notation(a1));
    const rows = rcs.map(rc => rc.row);
    const columns = rcs.map(rc => rc.column);
    const values = this.values
      .filter((_, i) => Math.min(...rows) <= i + 1 && i + 1 <= Math.max(...rows))
      .map(record =>
        record.filter((_, i) => Math.min(...columns) <= i + 1 && i + 1 <= Math.max(...columns)),
      );
    return values;
  }

  /**
   * ヘッダー行をキーとして持つ Dicts オブジェクトを生成するメソッド
   * @param {number} headerIndex - ヘッダー行のインデックス
   * @return {Dicts} ヘッダーを key, 値を value として持つ Dicts オブジェクト
   */
  getAsDicts(headerIndex = 0) {
    const headers = this.values[headerIndex];
    const dicts = this.values
      .filter((_, i) => i > headerIndex)
      .map(record => record.reduce((acc, cur, i) => acc.set(headers[i], cur), new Map()));
    return new Dicts(dicts);
  }

}
