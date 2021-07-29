/**
 * csv に関するクラス
 */
class Csv {

  /**
   * csv に関するコンストラクタ
   * @constructor
   * @param {Array.<Array.<string|number|boolean|Date>>} values - csv に変換する値
   * @param {string} os - 文字コードを判定するための OS を指定
   * @param {boolean} hasNewLine - csv ファイルのセルに改行があるかどうか
   */
  constructor(values, os = 'unix', hasNewLine = false) {
    this.values = values;
    this.os = os;
    this.hasNewLine = hasNewLine;
  }

  /**
   * csv ファイルを Google ドライブに生成するメソッド
   * @param {string} folderId - 出力先のフォルダー ID
   * @param {string} fileName - 出力される csv ファイル名 (要拡張子)
   */
  create(folderId, fileName) {
    const format = this.getFormat();
    const data = this.getData(format);
    const folder = DriveApp.getFolderById(folderId);
    const blob = Utilities.newBlob('', MimeType.CSV, fileName).setDataFromString(data, format.characterCode);
    folder.createFile(blob);
  }

  /**
   * OS や改行の有無に応じてフォーマット形式をオブジェクト形式で生成するメソッド
   * @return {Object} フォーマットの形式をプロパティとして持つオブジェクト
   */
  getFormat() {
    const format = this.os === 'unix' ?
      {
        newLine: '\n',
        characterCode: 'UTF-8',
      } :
      {
        newLine: '\r\n',
        characterCode: 'Shift-JIS',
        hasNewLine: this.hasNewLine
      }
    return format;
  }

  /**
   * csv ファイル生成用のデータを生成するメソッド
   * @param {Object} format - フォーマット情報を持つオブジェクト
   * @return {Array.<Array.<string|number|boolean|Date>>} csv ファイル生成用の 2 次元配列のデータ
   */
  getData(format) {
    if (!format.hasNewLine) return this.values.join(format.newLine);

    const data = this.values.map(record => record.map(value =>
      '"' + String(value).replace(/\"/g, '\""') + '"')).
      join(format.newLine);
    return data;
  }

  /**
   * csv ファイルを 2 次元配列化して返すメソッド
   * @param {DriveApp.file} file - 対象となるファイルオブジェクト
   * @param {string} characterCode - 文字コード
   * @return {Array.<Array<string|number>>} csv ファイルから取得した 2 次元配列  
   */
  static read(file, characterCode = 'UTF-8') {
    const blob = file.getBlob();
    const csv = blob.getDataAsString(characterCode);
    const values = Utilities.parseCsv(csv);
    return values;
  }

}