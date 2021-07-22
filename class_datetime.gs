/**
 * 日付に関するオブジェクトを生成するクラス
 * @param {Date} date - Date オブジェクト 文字列型も可
 */
class Datetime {

  constructor(date = new Date()) {
    this.date = new Date(date);
    this.formated = Datetime.format();
  }

  /**
   * 文字列型の日付を生成するメソッド
   * @param {Date} d - Date オブジェクト 文字列型も可
   * @param {string} format - フォーマットする形式
   * @return {string} フォーマットされた文字列型の日付
   */
  static format(d = new Date(), format = 'yyyy/MM/dd') {
    const date = new Date(d);
    const strDate = Utilities.formatDate(date, 'JST', format);
    return strDate;
  }

  /**
   * 時間部分を 0 時に設定したも Date オブジェクトを取得するメソッド
   * @return {Date} 
   */
  getAM0Date() {
    const date = new Date(this.format());
    return date;
  }

  /**
   * 同じものか比較するメソッド
   * @param {Date} time - 比較対象の時間を含む Date オブジェクト 
   * @return {boolean} 同じ時間かどうか
   */
  isSameMoment(date) {
    return this.date.getTime() === date.getTime();
  }

  /**
   * yyyyMMdd 部分が同じものか比較するメソッド
   * @param {Date} date - 比較対象の日付を含む Date オブジェクト
   * @return {boolean} 同じ日付かどうか
   */
  isSameDate(date) {
    return this.formatDate() === this.formatDate(date);
  }

  /**
   * HH:mm 部分が同じものか比較するメソッド
   * @param {Date} time - 比較対象の時間を含む Date オブジェクト 
   * @return {boolean} 同じ時間かどうか
   */
  isSameTime(time) {
    return this.formatDate(this.date, 'HH:mm') === this.fomatDate(time, 'HH:mm');
  }

}

const DT = Object.freeze(new Datetime());