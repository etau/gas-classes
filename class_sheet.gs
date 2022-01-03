'use strict'

class Sheet {

  /**
   * シートに関するコンストラクタ 
   * @constructor
   * @param {SpreadsheetApp.sheet} sheet - 対象となるシート。デフォルト引数は「SpreadsheetApp.getActiveSheet()」
   * @param {number} headerRows - ヘッダー行の数。デフォルト引数は「1」
   */
  constructor(sheet = SpreadsheetApp.getActiveSheet(), headerRows = 1) {
    /** @type {SpreadsheetApp.Sheet} */
    this.sheet = sheet;
    /** @type {number} */
    this.headerRows = headerRows;
  }

  /**
   * シートの値すべて取得するメソッド 
   * @return {Array.<Array.<number|string|boolean|Date>>} シートの値
   */
  getDataRangeValues() {
    const dataRangeValues = this.sheet.getDataRange().getValues();
    return dataRangeValues;
  }

  /**
   * ヘッダーを取得するメソッド
   * @param {number} index - ヘッダーズのヘッダーとなるインデックス。デフォルト引数は「headerRows - 1」
   * @return {Array.<string>} ヘッダー
   */
  getHeaders(index = headerRows - 1) {
    const headerValues = this.getHeaderValues();
    const headers = headerValues[index];
    return headers;
  }

  /**
   * ヘッダー部分を取得するメソッド
   * @return {Array.<Array.<string>>} ヘッダー部分
   */
  getHeaderValues() {
    const values = this.getDataRangeValues();
    const headerValues = values.filter((_, i) => i < this.headerRows);
    return headerValues;
  }

  /**
   * ヘッダー部分を除いた実データ部分を取得するメソッド
   * @return {Array.<Array.<number|string|boolean|Date>>} 実データ
   */
  getDataValues() {
    const values = this.getDataRangeValues();
    const dataValues = values.filter((_, i) => i >= this.headerRows);
    return dataValues;
  }

  /**
   * ヘッダー情報 (各) から列番号を返すメソッド
   * @param {string} header - ヘッダー
   * @param {number} index - ヘッダーズのヘッダーとなるインデックス。デフォルト引数は「headerRows - 1」
   * @return {number} 列番号
   */
  getNumColumnByHeaderName(header, index = headerRows - 1) {
    const columnIndex = this.getColumnIndexByHeaderName(header, index);
    const numColumn = columnIndex + 1;
    return numColumn;
  }

  /**
   * ヘッダー情報 (各) から列インデックスを返すメソッド
   * @param {string} header - ヘッダー
   * @param {number} index - ヘッダーズのヘッダーとなるインデックス。デフォルト引数は「headerRows - 1」
   * @return {number} 列インデックス
   */
  getColumnIndexByHeaderName(header, index = headerRows - 1) {
    const headers = this.getHeaders(index);
    const columnIndex = headers.indexOf(header);
    return columnIndex;
  }

  /**
   * 値範囲を削除し、新しい値を貼り付けるメソッド
   * @param {Array.<Array.<number|string|boolean|Date>>} values - 貼り付ける値
   */
  setValuesHeaderRowAfter(values) {
    this.clearDataValues();
    if (!values.length) return;
    this.sheet.getRange(this.headerRows + 1, 1, values.length, values[0].length).
      setValues(values);
  }

  /**
   * 実データ範囲の値を削除するメソッド
   */
  clearDataValues() {
    const values = this.getDataValues();
    if (!values.length) return;
    this.sheet.
      getRange(1 + this.headerRows, 1, this.sheet.getLastRow() - this.headerRows, this.sheet.getLastColumn()).
      clearContent();
  }

  /**
   * 最終行の下に値を貼り付けるメソッド
   * @param {Array.<Array.<number|string|boolean|Date>>} values - 貼り付ける値
   */
  appendRows(values) {
    if (!values.length) return;
    this.sheet.
      getRange(this.sheet.getLastRow() + 1, 1, values.length, values[0].length).
      setValues(values);
  }

  /**
   * 値範囲でソートするメソッド
   * @param {number} column - ソート対象となる列。デフォルト引数は「1」
   * @param {boolean} ascending - 昇順か降順か。デフォルト引数は「true」
   */
  sortDataRows(column = 1, ascending = true) {
    this.sheet.
      getRange(this.headerRows + 1, 1, this.sheet.getLastRow() - this.headerRows, this.sheet.getLastColumn()).
      sort({ column: column, ascending: ascending });
  }

  /**
   * 必要な列情報だけのリストを取得するメソッド
   * @param {Array.<string>} keys - 辞書のキーとなるヘッダーの値  
   * @return {Array.<Array.<number|string|boolean|Date>>} シートから生成された値
   */
  select(keys) {
    const dicts = this.getAsDicts();
    const values = dicts.map(dict => keys.
      map(key => dict.get(key))
    );
    return values;
  }

  /** TODO: record と row (or rowIndex) を dict 型に持たせたい
    * シートの値から、ヘッダー情報をプロパティとして持つ Map 型を生成するメソッド
    * @return {Array.<Map>} ヘッダー情報を key, 値を value として持つ Map
    */
  getAsDicts() {
    const headers = this.getHeaders();
    const values = this.getDataValues();
    const dicts = values.map(record => record.
      reduce((acc, cur, i) => acc.set(headers[i], cur), new Map())
    );
    return dicts;
  }

  /**
   * URL からシートを取得する静的メソッド
   * @param {string} url - シート ID を含むスプレッドシートの URL
   */
  static getByUrl(url) {
    const sheets = SpreadsheetApp.openByUrl(url).getSheets();
    const sheetId = Number(url.split('#gid=')[1]);
    const sheet = sheets.find(sheet => sheet.getSheetId() === sheetId);
    return sheet;
  }

}
