'use strict'

class Datetime {

  /**
   * 日付に関するコンストラクタ
   * @constructor
   * @param {Date} date - 対象となる日付。デフォルト引数は「new Date()」
   */
  constructor(date = new Date()) {
    /** @type {Date} */
    this.date = new Date(date);
  }

  /**
   * Class Date から委譲されたメソッド
   */
  getTime() { return this.date.getTime(); }
  getFullYear() { return this.date.getFullYear(); }
  getMonth() { return this.date.getMonth(); }
  getDate() { return this.date.getDate(); }

  /**
   * 対象月かどうかを判定するメソッド
   * @param {number} month - 対象月
   * @return {boolean} 対象月かどうか
   */
  isMonth(month) {
    return this.getMonth() === month - 1;
  }

  /**
   * format 部分が同じものか比較するメソッド
   * @param {Date} time - 比較対象の Date オブジェクト
   * @param {string} format - 比較するフォーマット
   * @return {boolean} format 部分が同じかどうか
   */
  isSame(date, format) {
    return Datetime.format(this.date, format) === Datetime.format(date, format);
  }

  /**
   * 同じ日時か判定するメソッド
   * @param {Date} time - 比較対象の Date オブジェクト
   * @return {boolean} 同じ日時かどうか
   */
  isSameMoment(date) {
    return this.getTime() === date.getTime();
  }

  /**
   * 昨日以前かどうかを判定するメソッド
   * @param {Date} time - 比較対象の Date オブジェクト
   * @return {boolean}
   */
  isBefore(date) {
    return date.getTime() + (24 * 60 * 60 * 1000) < this.getTime();
  }

  /**
   * 明日以降かどうかを判定するメソッド
   * @param {Date} time - 比較対象の Date オブジェクト
   * @return {boolean}
   */
  isAfter(date) {
    return date.getTime() > this.getTime();
  }

  /**           
   * Date オブジェクトに n 日足すメソッド            
   * @param {Date} time - Date オブジェクト            
   * @param {number} n -  追加する日数            
   * @return {Date} time - Date オブジェクト            
   */
  addDays(n) {
    this.date.setDate(this.getDate() + n);
    return this.date;
  }

  /**            
   * 終了時間に達したらエラーを投げるメソッド            
   */
  endLoopIfTimeOver() {
    const limitSec = 350;
    if (this.isTimeOver(limitSec)) throw new Error('Processing time exceeded' + limitSec + 'seconds.');
  }

  /**
   * インスタンスを生成してからの時間が指定の秒数を超えたかどうかを判定するメソッド
   * @param {number} limitSec - 判定する秒数
   * @return {boolean} インスタンスを生成してからの時間が指定の時間を超えたかどうか
   */
  isTimeOver(limitSec = /* GAS 360 秒の壁*/ 350) {
    const runtime_sec = this.getRuntimeSec();
    return runtime_sec > limitSec;
  }

  /**
   * インスタンスを生成した日時とメソッドを走らせた日時の差分の秒数を返すメソッド
   * @return {number} runtimeSec
   */
  getRuntimeSec() {
    const runtimeSec = (Date.now() - this.getTime()) / 1000;
    return runtimeSec;
  }

  /**
   * x 日前の Date オブジェクトを返すメソッド
   * NOTE: 時間部分は 00:00
   * @param {number} x - 日数差
   * @return {Date} x 日前の Date オブジェクト
   */
  createDaysAgo(x) {
    const date = new Date(this.getFullYear(), this.getMonth(), this.getDate() - x);
    return new Datetime(date);
  }

  /**
   * x か月の Date オブジェクトを返すメソッド
   * NOTE: 時間部分は 00:00
   * @param {number} x - 月数差
   * @return {Datetime} x 日前の Date オブジェクト
   */
  createMonthsAgo(x) {
    const date = new Date(this.getFullYear(), this.getMonth() - x, this.getDate());
    return new Datetime(date);
  }

  /**
   * x 年の Date オブジェクトを返すメソッド
   * NOTE: 時間部分は 00:00
   * @param {number} x - 年数差
   * @return {Datetime} x 日前の Date オブジェクト
   */
  createYearsAgo(x) {
    const date = new Date(this.getFullYear() - x, this.getMonth(), this.getDate());
    return new Datetime(date);
  }

  /**
   * コンストラクタの date オブジェクトとの日付差を返すメソッド
   * @param {Date} date - コンストラクタの date オブジェクトとの日付差を計算する対象となる Date オブジェクト
   * @return {number} コンストラクタの date オブジェクトと param との日数差
   */
  calculateDiffDays(date) {
    const start = new Date(this.toString());
    const end = new Date(Datetime.format(date));
    const diffDays = Math.abs(start.getTime() - end.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays;
  }

  /**
   * コンストラクタの date オブジェクトから diffDays 分、1 日ずつの Date オブジェクトを配列化する関数
   * @param {number} diffDays - コンストラクタの date オブジェクトからの日数差
   * @return {Array.<Date>} コンストラクタの date オブジェクトから diffDays 分、1 日ずつの Date オブジェクト
   */
  getDates(diffDays) {
    const nums = new Array(Math.abs(diffDays) + 1).fill().map((_, i) => i);
    const dates = nums.map(num => new Date(this.getFullYear(), this.getMonth(), this.getDate() + num));
    return dates;
  }

  /**
   * x 営業日後の Datetime オブジェクトを返すメソッド
   * @param {number} x - 日数差
   * @return {Datetime} x 日前の Date オブジェクト
   */
  createBusinessDaysLater(x) {
    let count = 0;
    let dt = this;
    while (count !== x) {
      dt = dt.createNextBussinessDay();
      count++;
    }
    return dt;
  }

  /**
   * 翌営業日の Datetime オブジェクトを返すメソッド
   * @param {Datetime} dt - 判定対象となる Datetime オブジェクト。デフォルト引数は「this」
   * @return {Datetime} 翌営業日の Datetime オブジェクト
   */
  createNextBussinessDay(dt = this) {
    let nextDt = dt.createDaysAgo(-1);
    while (this.isHoliday(nextDt.date)) {
      nextDt = nextDt.createDaysAgo(-1);
    }
    return nextDt;
  }

  /**
   * x 営業日前の Datetime オブジェクトを返すメソッド
   * @param {number} x - 日数差
   * @return {Datetime} x 日前の Date オブジェクト
   */
  createBusinessDaysBefore(x) {
    if (x <= 0) throw new Error('The parameter must be greater than 0.');
    let count = 0;
    let dt = this;
    while (count !== x) {
      dt = dt.createPrevBussinessDay();
      count++;
    }
    return dt;
  }

  /**
   * 前営業日の Datetime オブジェクトを返すメソッド
   * @param {Datetime} dt - 判定対象となる Datetime オブジェクト。デフォルト引数は「this」
   * @return {Datetime} 翌営業日の Datetime オブジェクト
   */
  createPrevBussinessDay(dt = this) {
    if (x <= 0) throw new Error('The parameter must be greater than 0.');
    let prevDt = dt.createDaysAgo(1);
    while (this.isHoliday(prevDt.date)) {
      prevDt = prevDt.createDaysAgo(1);
    }
    return prevDt;
  }

  /**
   * 営業日かどうかを判定するメソッド
   * @param {Date} date - 判定する日
   * @return {boolean} 営業日かどうか
   */
  isBussinessDay(date = this.date) {
    return !this.isHoliday(date);
  }

  /**
   * 土日祝かどうかを判定するメソッド
   * @param {Date} date - 判定する日
   * @return {boolean} 土日祝のかどうか
   */
  isHoliday(date = this.date) {
    if (date.getDay() % 6 === 0) return true;
    if (this.holidays !== undefined) return this.holidays.map(holiday => Datetime.format(holiday)).includes(this.toString());
    if (this.holidaysCalendar_ === undefined) this.holidaysCalendar_ = CalendarApp.getCalendarById('ja.japanese#holiday@group.v.calendar.google.com');
    return this.holidaysCalendar_.getEventsForDay(date).length !== 0;
  }

  /**
   * 休日判定用の休日をプロパティに追加するメソッド
   * @param {Array.<Date>} holidays - 追加する祝日
   * @return {Datetime} Datetime オブジェクト
   */
  addHolidays(holidays) {
    this.holidays = holidays;
    return this;
  }

  /**
   * コンストラクタの date オブジェクトを指定のフォーマットで文字列化するメソッド
   * @param {string} format - 日付を文字列化するための指定のフォーマット
   * @return {string}  日付を文字列化したもの
   */
  toString(format = 'yyyy/MM/dd') {
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
    const date = new Date(d);
    const strDate = Utilities.formatDate(date, 'JST', format);
    return strDate;
  }

}

const DATETIME = new Datetime();