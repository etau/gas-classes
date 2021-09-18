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
    new Type(date, TYPE.DATE);
    /** @type {Date} */
    this.date = new Date(date);
  }

  /**
   * 時間部分を 0 時に設定したも Date オブジェクトを取得するメソッド
   * @return {Date} 
   */
  getAM0Date() {
    const date = new Date(this.toString());
    return date;
  }

  /**
   * 同じものか比較するメソッド
   * @param {Date} time - 比較対象の時間を含む Date オブジェクト 
   * @return {boolean} 同じ時間かどうか
   */
  isSameMoment(date) {
    new Type(date, TYPE.DATE);
    return this.date.getTime() === date.getTime();
  }

  /**
   * yyyyMMdd 部分が同じものか比較するメソッド
   * @param {Date} date - 比較対象の日付を含む Date オブジェクト
   * @return {boolean} 同じ日付かどうか
   */
  isSameDate(date) {
    new Type(date, TYPE.DATE);
    return Datetime.format() === Datetime.format(date);
  }

  /**
   * HH:mm 部分が同じものか比較するメソッド
   * @param {Date} time - 比較対象の時間を含む Date オブジェクト 
   * @return {boolean} 同じ時間かどうか
   */
  isSameTime(time) {
    new Type(time, TYPE.DATE);
    return Datetime.format(this.date, 'HH:mm') === Datetime.format(time, 'HH:mm');
  }

  /**
   * インスタンスを生成してからの時間が指定の秒数を超えたかどうかを判定するメソッド
   * @param {number} limitSec - 判定する秒数
   * @return {boolean} インスタンスを生成してからの時間が指定の時間を超えたかどうか
   */
  isTimeOver(limitSec = /* GAS 360 秒の壁*/ 345) {
    new Type(limitSec, TYPE.NUMBER);
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
   * x 日前の Date オブジェクトを返すメソッド
   * @param {number} x - 日数差
   * @return {Date} x 日前の Date オブジェクト
   */
  getDaysAgo(x) {
    new Type(x, TYPE.INTEGER);
    const date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() - x);
    return new Datetime(date);
  }

  /**
   * x か月の Date オブジェクトを返すメソッド
   * @param {number} x - 月数差
   * @return {Date} x 日前の Date オブジェクト
   */
  getMonthsAgo(x) {
    new Type(x, TYPE.INTEGER);
    const date = new Date(this.date.getFullYear(), this.date.getMonth() - x, this.date.getDate());
    return new Datetime(date);
  }

  /**
   * x 年の Date オブジェクトを返すメソッド
   * @param {number} x - 年数差
   * @return {Date} x 日前の Date オブジェクト
   */
  getYearsAgo(x) {
    new Type(x, TYPE.INTEGER);
    const date = new Date(this.date.getFullYear() - x, this.date.getMonth(), this.date.getDate());
    return new Datetime(date);
  }

  /**
   * コンストラクタの date オブジェクトを指定のフォーマットで文字列化するメソッド
   * @param {string} format - 日付を文字列化するための指定のフォーマット
   * @return {string}  日付を文字列化したもの
   */
  toString(format = 'yyyy/MM/dd') {
    new Type(format, TYPE.STRING);
    const strDate = Datetime.format(this.date, format);
    return strDate;
  }

  /**
   * 指定のフォーマットで日付を文字列化する静的メソッド
   * @param {Date} d - Date オブジェクト 文字列型も可
   * @param {string} format - フォーマットする形式
   * @return {string} フォーマットされた文字列型の日付
   */
  static format(d = new Date(), format = 'yyyy/MM/dd') {
    new Type(d, TYPE.DATE);
    new Type(format, TYPE.STRING);
    const date = new Date(d);
    const strDate = Utilities.formatDate(date, 'JST', format);
    return strDate;
  }

}

const DATETIME = new Datetime();