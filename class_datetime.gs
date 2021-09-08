'use strict'

/**
 * 日付に関するオブジェクトを生成するクラス
 * @param {Date} date - Date オブジェクト 文字列型も可
 */
class Datetime {

  /**
   * 日付に関するコンストラクタ
   * @constructor
   * @param {Date} date - 対象となる日付。デフォルト引数は「new Date()」
   */
  constructor(date = new Date()) {
    const type = new Type(date, TYPE.OBJECT);
    if (!type.isValidType) throw new Error('Type Error');

    /** @type {Date} */
    this.date = new Date(date);
    /** @type {string} */
    this.strDate = Datetime.format();
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

  /**
   * インスタンスを生成してからの時間が指定の秒数を超えたかどうかを判定するメソッド
   * @param {number} limitSec - 判定する秒数
   * @return {boolean} インスタンスを生成してからの時間が指定の時間を超えたかどうか
   */
  isTimeOver(limitSec = /* GAS 360 秒の壁*/ 345) {
    const runtime_sec = this.getRuntimeSec();
    return runtime_sec > limitSec;
  }

  /**
   * インスタンスを生成した日時とメソッドを走らせた日時の差分の秒数を返すメソッド
   * @return {number} runtimeSec
   */
  getRuntimeSec() {
    const now = this.getNow();
    const runtimeSec = (now.getTime() - this.start.getTime()) / 1000;
    return runtimeSec;
  }

  /**
   * 今の日時の Date オブジェクトを時間を返すメソッド
   * @return {Date} 今の日時の Date オブジェクト
   */
  getNow() {
    const now = new Date();
    return now;
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

}

const DATETIME = new Datetime();