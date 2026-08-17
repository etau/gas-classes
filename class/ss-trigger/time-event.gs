'use strict';

/**
 * 時間主導型のトリガー イベントに関するクラス
 */
class TriggerTimeEvent {

  /**
   * 時間主導型のトリガー イベントに関するコンストラクタ
   * @constructor
   * @param {Object} e - 時間主導型のトリガー イベント オブジェクト
   */
  constructor(e) {
    /** @type {Object} */
    this.e = e;
    /** @type {number} */
    this.year = e.year;
    /** @type {number} */
    this.month = e.month;
    /** @type {number} */
    this.date = e['day-of-month'];
    /** @type {number} */
    this.hour = e.hour;
    /** @type {number} */
    this.minute = e.minute;
    /** @type {number} */
    this.second = e.second;
    /**
     * @type {string}
     * NOTE: UTC 以外の値が取れるか不明
     */
    this.timezone = e.timezone;
  }

  /**
   * 時間主導型のトリガーが実行された時間を取得するメソッド
   * @return {Date} 時間主導型のトリガーが実行された日時
   * NOTE: 確認されている状況では UTC の値が設定されている
   */
  getDate() {
    const date = new Date(
      this.year,
      this.month - 1,
      this.date,
      this.hour,
      this.minute,
      this.second
    );
    return date;
  }

  /**
   * 現地時間を取得するメソッド
   * @param {number} diffHours - 時差
   * @return {Date} 時差を調整した日時
   * NOTE: this.timezone が UTC でない場合 (JST であると仮定した) の処理あり
   */
  getLocaleDate(diffHours = 9) {
    const date = this.getDate();
    if (this.timezone !== 'UTC') return date;
    date.setHours(date.getHours() + diffHours);
    return date;
  }

  /**
   * 現地時間の Datetime オブジェクトを取得するメソッド
   * @param {number} diffHours - 時差
   * @return {Datetime} 時差を調整した Datetime オブジェクト
   */
  getDatetime(diffHours = 9) {
    const datetime = new Datetime(this.getLocaleDate(diffHours));
    return datetime;
  }

}
