'use strict';

/**
 * csv に関するクラス
 */
class Csv {

  /**
   * csv に関するコンストラクタ
   * @constructor
   * @param {Array.<Array.<string|number|boolean|Date>>} values - csv に変換する値
   * @param {string} os - 文字コードと改行コードを判定するための OS 'unix' もしくはそれ以外
   * @param {boolean} isQuoted - 各値をダブル クォーテーションで囲むかどうか
   * NOTE: セル内に改行やカンマが含まれる場合は isQuoted を true にする
   */
  constructor(values, os = 'unix', isQuoted = false) {
    /** @type {Array.<Array.<string|number|boolean|Date>>} */
    this.values = values;
    /** @type {string} */
    this.os = os;
    /** @type {boolean} */
    this.isQuoted = isQuoted;
  }

  /**
   * OS に応じてフォーマット形式を生成するメソッド
   * @return {Map} newLine と characterCode をプロパティとして持つ Map オブジェクト
   */
  getFormat() {
    const format = this.os === 'unix' ?
      new Map([
        ['newLine', '\n'],
        ['characterCode', 'UTF-8']
      ]) :
      new Map([
        ['newLine', '\r\n'],
        ['characterCode', 'Shift-JIS']
      ]);
    return format;
  }

  /**
   * csv ファイル生成用のデータを生成するメソッド
   * @param {Map} format - フォーマット情報を持つ Map オブジェクト
   * @return {string} csv ファイル生成用の文字列データ
   */
  getData(format = this.getFormat()) {
    const newLine = format.get('newLine');
    const data = this.values
      .map(record => record.map(value => this.getCell_(value)).join(','))
      .join(newLine);
    return data;
  }

  /**
   * 1 つの値を csv のセルの文字列に変換するプライベート メソッド
   * @param {string|number|boolean|Date} value - 変換する値
   * @return {string} csv のセルの文字列
   */
  getCell_(value) {
    const strValue = String(value);
    return this.isQuoted ? '"' + strValue.replace(/"/g, '""') + '"' : strValue;
  }

  /**
   * csv ファイルを Google ドライブに生成するメソッド
   * @param {string} folderId - 出力先のフォルダー ID
   * @param {string} fileName - 出力される csv ファイル名 (要拡張子)
   * @return {File} 生成された csv ファイルの File オブジェクト
   */
  create(folderId, fileName) {
    const format = this.getFormat();
    const data = this.getData(format);
    const blob = Utilities.newBlob('', MimeType.CSV, fileName)
      .setDataFromString(data, format.get('characterCode'));
    const file = Folder.getById(folderId).createFile(blob);
    return file;
  }

  /**
   * csv ファイルを 2 次元配列化して返す静的メソッド
   * @param {DriveApp.File|File} file - 対象となるファイル オブジェクト
   * @param {string} characterCode - 文字コード
   * @return {Array.<Array.<string>>} csv ファイルから取得した 2 次元配列
   */
  static read(file, characterCode = 'UTF-8') {
    const blob = file.getBlob();
    const csv = blob.getDataAsString(characterCode);
    const values = Utilities.parseCsv(csv);
    return values;
  }

}
