'use strict';

/**
 * シートに関するクラス
 */
class Sheet {

  /**
   * シートに関するコンストラクタ
   * @constructor
   * @param {SpreadsheetApp.Sheet} sheet - 対象となるシート オブジェクト
   * @param {number} headerRows - ヘッダーの行数
   * @param {number} headerIndex - ヘッダー行のインデックス (ユニークなカラム)
   */
  constructor(sheet = SpreadsheetApp.getActiveSheet(), headerRows = 1, headerIndex = headerRows - 1) {
    /** @type {SpreadsheetApp.Sheet} */
    this.sheet = sheet;
    /** @type {number} */
    this.headerRows = headerRows;
    /** @type {number} */
    this.headerIndex = headerIndex;
    /**
     * @type {Object}
     * NOTE: 取得済みの値を保持する。追加するキャッシュはここに集約し、flush メソッドで一括破棄する
     */
    this.cache_ = {};
  }

  /**
   * Class Sheet から委譲されたメソッド
   * NOTE: https://developers.google.com/apps-script/reference/spreadsheet/sheet
   */
  getDataRange() { return this.sheet.getDataRange(); }
  getRange(...args) { return this.sheet.getRange(...args); }
  getLastRow() { return this.sheet.getLastRow(); }
  getLastColumn() { return this.sheet.getLastColumn(); }
  getFormUrl() { return this.sheet.getFormUrl(); }
  getName() { return this.sheet.getName(); }
  getParent() { return this.sheet.getParent(); }
  getSheetId() { return this.sheet.getSheetId(); }
  createTextFinder(...args) { return this.sheet.createTextFinder(...args); }
  activate() { return this.sheet.activate(); }

  /**
   * シートの URL を取得するメソッド
   * @return {string} シートに直接アクセスできる URL
   */
  getUrl() {
    const url = this.getParent().getUrl() + '#gid=' + this.getSheetId();
    return url;
  }

  /**
   * シートの親スプレッドシートの ID を取得するメソッド
   * @return {string} スプレッドシートの ID
   */
  getParentId() {
    const parent = this.getParent();
    const parentId = parent.getId();
    return parentId;
  }

  /**
   * 保留中の変更を反映し、キャッシュを破棄するメソッド
   * @return {Sheet} キャッシュが破棄された Sheet オブジェクト
   */
  flush() {
    SpreadsheetApp.flush();
    this.cache_ = {};
    return this;
  }

  /**
   * シートの値をすべて取得するメソッド
   * @return {Array.<Array.<number|string|boolean|Date>>} シートの値
   */
  getDataRangeValues() {
    if (this.cache_.dataRangeValues !== undefined) return this.cache_.dataRangeValues;
    const dataRangeValues = this.getDataRange().getValues();
    this.cache_.dataRangeValues = dataRangeValues;
    return dataRangeValues;
  }

  /**
   * ヘッダー部分を取得するメソッド
   * @return {Array.<Array.<string>>} ヘッダー部分
   */
  getHeaderValues() {
    if (this.cache_.headerValues !== undefined) return this.cache_.headerValues;
    const values = this.getDataRangeValues();
    const headerValues = values.filter((_, i) => i < this.headerRows);
    this.cache_.headerValues = headerValues;
    return headerValues;
  }

  /**
   * ヘッダーを取得するメソッド
   * @return {Array.<string>} ヘッダー一覧
   */
  getHeaders() {
    if (this.cache_.headers !== undefined) return this.cache_.headers;
    const headerValues = this.getHeaderValues();
    const headers = headerValues[this.headerIndex];
    this.cache_.headers = headers;
    return headers;
  }

  /**
   * ヘッダー行を除いたレコード部分を取得するメソッド
   * @return {Array.<Array.<number|string|boolean|Date>>} レコード
   */
  getDataValues() {
    if (this.cache_.dataValues !== undefined) return this.cache_.dataValues;
    const values = this.getDataRangeValues();
    const dataValues = values.filter((_, i) => i >= this.headerRows);
    this.cache_.dataValues = dataValues;
    return dataValues;
  }

  /**
   * シートの値から、ヘッダーをキーとして持つ Dicts オブジェクトを生成するメソッド
   * @return {Dicts} ヘッダーを key, 値を value として持つ Dicts オブジェクト
   * NOTE: 各 dict の末尾には、シート上の行番号を 'row' キーで持たせている
   */
  getDicts() {
    if (this.cache_.dicts !== undefined) return this.cache_.dicts;
    const headers = this.getHeaders();
    const values = this.getDataValues();
    const dicts = new Dicts(values.map((record, i) => {
      const dict = record.reduce((acc, cur, j) => acc.set(headers[j], cur), new Map());
      return dict.set('row', i + this.headerRows + 1);
    }));
    this.cache_.dicts = dicts;
    return dicts;
  }

  /**
   * SHEET_INFO の COLUMN プロパティから、カラム名をプロパティ、カラム インデックスを値としてもつオブジェクトを生成するメソッド
   * @param {Object.<string>} columnEnum - SHEET_INFO の COLUMN プロパティ 例: SHEET_INFO.SHEET1.COLUMN
   * @return {Object.<number>} カラム名をプロパティ、カラム インデックスを値としてもつオブジェクト
   */
  getColumnIndexesObject(columnEnum) {
    const columns = Object.values(columnEnum);
    const headers = this.getHeaders();
    const columnIndexesObject = columns.reduce((pre, cur) => {
      pre[cur] = headers.indexOf(cur);
      return pre;
    }, {});
    return columnIndexesObject;
  }

  /**
   * ヘッダー情報から列インデックスを返すメソッド
   * @param {string} headerName - ヘッダー名
   * @return {number} 列インデックス (一番左から 0, 1, 2,...)
   * @throws ヘッダー名が存在しない場合のエラー
   */
  getColumnIndexByHeaderName(headerName) {
    const headers = this.getHeaders();
    const columnIndex = headers.indexOf(headerName);
    if (columnIndex === -1) throw new Error('The value "' + headerName + '" does not exist in the header row of sheet "' + this.getName() + '".');
    return columnIndex;
  }

  /**
   * ヘッダー情報から列番号を返すメソッド
   * @param {string} headerName - ヘッダー名
   * @return {number} 列番号 (一番左から 1, 2, 3,...)
   * @throws ヘッダー名が存在しない場合のエラー
   */
  getColumnByHeaderName(headerName) {
    const columnIndex = this.getColumnIndexByHeaderName(headerName);
    const column = columnIndex + 1;
    return column;
  }

  /**
   * ヘッダー情報の配列から必要な列だけの値を取得するメソッド
   * @param {Array.<string>} headerNames - 取得対象のヘッダー名
   * @param {boolean} isAddHeaders - ヘッダー情報を配列に含むかどうか
   * @return {Array.<Array.<number|string|boolean|Date>>} ヘッダー情報に対応する列の値
   */
  getValuesByHeaderNames(headerNames, isAddHeaders = true) {
    const values = this.getDicts().getAsValues(headerNames, isAddHeaders);
    return values;
  }

  /**
   * ヘッダー名から列の値を取得するメソッド
   * @param {string} headerName - ヘッダー名
   * @param {boolean} isAddHeader - ヘッダー名を配列に含むかどうか
   * @return {Array.<number|string|boolean|Date>} ヘッダー名に対する列の値
   */
  getColumnValuesByHeaderName(headerName, isAddHeader = false) {
    const columnValues = this.getValuesByHeaderNames([headerName], isAddHeader).flat();
    return columnValues;
  }

  /**
   * 列に値が存在するかどうか返すメソッド
   * @param {string} headerName - 検索対象のヘッダー名
   * @param {number|string|boolean|Date} value - 検索対象の値
   * @return {boolean} 列に値が存在するかどうか
   */
  hasValueInColumn(headerName, value) {
    const columnValues = this.getColumnValuesByHeaderName(headerName);
    return columnValues.includes(value);
  }

  /**
   * 抽出対象の列の一番最初に合致した dict を取得するメソッド
   * @param {string} headerName - 抽出対象の列のヘッダー名
   * @param {string|number|boolean|Date} value - 抽出対象の値
   * @return {Map} dict
   * @throws 合致する dict がない場合のエラー
   * NOTE: 合致しない場合に undefined を許容するときは getDicts().find を利用する
   */
  findDict(headerName, value) {
    const dict = this.getDicts().find(headerName, value);
    if (dict === undefined) throw new Error('The value "' + value + '" does not exist in the "' + headerName + '" column of sheet "' + this.getName() + '".');
    return dict;
  }

  /**
   * 抽出対象の列の一番最初に合致したレコードを取得するメソッド
   * @param {string} headerName - 抽出対象の列のヘッダー名
   * @param {string|number|boolean|Date} value - 抽出対象の値
   * @return {Array.<string|number|boolean|Date>} 対象レコード
   * @throws 合致するレコードがない場合のエラー
   */
  findRecord(headerName, value) {
    const dict = this.findDict(headerName, value);
    const headers = this.getHeaders();
    const record = headers.map(header => dict.get(header));
    return record;
  }

  /**
   * レコードをすべて削除し、値を貼り付けるメソッド
   * @param {Array.<Array.<number|string|boolean|Date>>} values - 貼り付ける値
   * @return {Sheet} Sheet オブジェクト
   */
  setDataValues(values) {
    if (values.length === 0) return this;
    this.clearDataValues();
    this.getRange(this.headerRows + 1, 1, values.length, values[0].length)
      .setValues(values);
    return this;
  }

  /**
   * レコードの最終行の下に値を貼り付けるメソッド
   * @param {Array.<Array.<number|string|boolean|Date>>} values - 貼り付ける値
   * @return {Sheet} Sheet オブジェクト
   */
  appendRows(values) {
    if (values.length === 0) return this;
    this.getRange(this.getLastRow() + 1, 1, values.length, values[0].length)
      .setValues(values);
    return this;
  }

  /**
   * レコードをすべて削除するメソッド
   * @return {Sheet} Sheet オブジェクト
   */
  clearDataValues() {
    const values = this.getDataValues();
    if (values.length === 0) return this;
    this.getRange(this.headerRows + 1, 1, values.length, values[0].length)
      .clearContent();
    return this;
  }

  /**
   * 列の値をクリアするメソッド
   * @param {string} headerName - ヘッダー名
   * @return {Sheet} Sheet オブジェクト
   */
  clearColumn(headerName) {
    const column = this.getColumnByHeaderName(headerName);
    this.getRange(this.headerRows + 1, column, this.getLastRow() - this.headerRows)
      .clearContent();
    return this;
  }

  /**
   * レコード範囲でソートするメソッド
   * @param {number} column - ソート対象となる列
   * @param {boolean} ascending - 昇順か降順か
   * @return {Sheet} Sheet オブジェクト
   */
  sortDataRows(column = 1, ascending = true) {
    this.getRange(this.headerRows + 1, 1, this.getLastRow() - this.headerRows, this.getLastColumn())
      .sort({ column: column, ascending: ascending });
    return this;
  }

  /**
   * シートの文字列を一括置換するメソッド
   * @param {string} string - 置換対象の文字列
   * @param {string} replaced - 置換後の文字列
   * @return {Sheet} 文字列置換後の Sheet オブジェクト
   */
  replaceAllText(string, replaced) {
    const textFinder = this.createTextFinder(string);
    textFinder.replaceAllWith(replaced);
    return this;
  }

  /**
   * シートを対象のスプレッドシートにコピーするメソッド
   * @param {SpreadsheetApp.Spreadsheet} spreadsheet - コピー先のスプレッドシート
   * @return {Sheet} コピーで生成された Sheet オブジェクト
   */
  copyTo(spreadsheet = SS) {
    const copiedSheet = this.sheet.copyTo(spreadsheet);
    return new Sheet(copiedSheet, this.headerRows, this.headerIndex);
  }

  /**
   * アクティブなシートを移動させるメソッド
   * @param {number} pos - シートの位置 (一番左から 1, 2, 3,...)
   * @return {Sheet} Sheet オブジェクト
   */
  move(pos = 1) {
    this.activate();
    SS.moveActiveSheet(pos);
    return this;
  }

  /**
   * シートに回答するフォーム オブジェクトを取得するメソッド
   * @return {Form} シートに回答するフォームの Form オブジェクト
   */
  getAssociatedForm() {
    const url = this.getFormUrl();
    const form = FormApp.openByUrl(url);
    return new Form(form);
  }

  /**
   * Sheet オブジェクトから xlsx 形式の Excel ファイルを作成するメソッド
   * @param {string} xlsxName - 出力される xlsx ファイル名
   * @param {string} folderId - 出力先の Google ドライブ フォルダ ID
   * @return {File} 生成された xlsx ファイルの File オブジェクト
   */
  exportToExcel(xlsxName, folderId) {
    this.flush();
    const url = 'https://docs.google.com/feeds/download/spreadsheets/Export?key=' + this.getParentId() + '&exportFormat=xlsx';
    const params = {
      headers: {
        Authorization: 'Bearer ' + ScriptApp.getOAuthToken()
      },
      muteHttpExceptions: true
    };
    const blob = UrlFetchApp.fetch(url, params).getBlob().setName(xlsxName);
    const file = DriveApp.getFolderById(folderId).createFile(blob);
    return new File(file);
  }

  /**
   * URL から Sheet オブジェクトを取得する静的メソッド
   * @param {string} url - シート ID を含むスプレッドシートの URL
   * @return {Sheet} Sheet オブジェクト
   * @throws URL に合致するシートがない場合のエラー
   */
  static getByUrl(url) {
    const sheets = SpreadsheetApp.openByUrl(url).getSheets();
    const sheetId = Number(url.split('#gid=')[1]);
    const sheet = sheets.find(sheet => sheet.getSheetId() === sheetId);
    if (sheet === undefined) throw new Error('The sheet does not exist in the URL "' + url + '".');
    return new Sheet(sheet);
  }

}
