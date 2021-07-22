/**
 * シートに関するクラス
 */
class Sheet {

  constructor(sheet = SpreadsheetApp.getActiveSheet(), numHeaderRows = 1) {
    this.sheet = sheet;
    this.numHeaderRows = numHeaderRows;
  }

  /**
   * シートの値すべて取得するメソッド 
   * @return {Array.<Array.<number|string>>} シートの値
   */
  getDataRangeValues() {
    const dataRangeValues = this.sheet.getDataRange().getValues();
    return dataRangeValues;
  }

  /**
   * ヘッダー部分を取得するメソッド
   * @return {Array.<Array.<number|string>>} ヘッダー部分
   */
  getHeaderValues() {
    const values = this.getDataRangeValues();
    const headerValues = values.
      filter((_, i) => i < this.numHeaderRows);
    return headerValues;
  }

  /**
   * @return {Array.<Array.<number|string>>} 実データ
   */
  getDataValues() {
    const values = this.getDataRangeValues();
    const dataValues = values.
      filter((_, i) => i >= this.numHeaderRows);
    return dataValues;
  }

  /**
   * 値範囲を削除し、新しい値を貼り付けるメソッド
   * @param {Array.<Array.<number|string>>} values - 貼り付ける値
   */
  setValuesHeaderRowAfter(values) {
    this.clearDataValues();
    this.sheet.getRange(this.numHeaderRows + 1, 1, values.length, values[0].length).
      setValues(values);
  }

  /**
   * 実データ範囲の値を削除するメソッド
   */
  clearDataValues() {
    this.sheet.
      getRange(1 + this.numHeaderRows, 1, this.sheet.getLastRow() - this.numHeaderRows, this.sheet.getLastColumn()).
      clearContent();
  }

  /**
   * 最終行の下に値を貼り付けるメソッド
   * @param {Array.<Array.<number|string>>} values - 貼り付ける値
   */
  appendRows(values) {
    this.sheet.
      getRange(this.sheet.getLastRow() + 1, 1, values.length, values[0].length).
      setValues(values);
  }

  /**
   * 値範囲でソートするメソッド
   * @param {number} column - ソート対象となる列
   * @param {boolean} ascending - 昇順か降順か
   */
  sortDataRows(column = 1, ascending = true) {
    this.sheet.
      getRange(this.numHeaderRows + 1, 1, this.sheet.getLastRow() - this.numHeaderRows, this.sheet.getLastColumn()).
      sort({ column: column, ascending: ascending });
  }

  /**
   * シートの値から、ヘッダー情報をプロパティとして持つ Map 型を生成するメソッド
   * @return {Array.<Object>} シートの値から、ヘッダー情報を key として持つ Map
   */
  getDicts() {
    const headers = this.getHeaderValues()[0];
    const values = this.getDataValues();
    const dicts = values.
      map(record => record.
        reduce((acc, cur, i) => acc.set(headers[i], cur), new Map()));
    return dicts;
  }

  /**
   * 必要な列情報だけのリストを取得するメソッド
   * @param {Array.<number|string>} keys - 辞書のキー  
   * @return {Array.<Array.<number|string>>} シートから生成された値
   */
  getSelectedValues(keys) {
    const dicts = this.getDicts();
    const values = dicts.
      map(dict => keys.
        map(key => dict.get(key)));
    return values;
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