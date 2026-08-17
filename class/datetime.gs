'use strict';

/**
 * 日時に関するクラス
 */
class Datetime {

  /**
   * 日時に関するコンストラクタ
   * @constructor
   * @param {...*} args - Date オブジェクトでインスタンス生成可能な引数
   */
  constructor(...args) {
    /** @type {Date} */
    this.date = new Date(...args);
  }

  /**
   * Date オブジェクトから委譲されたメソッド
   * NOTE: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date
   */
  getFullYear() { return this.date.getFullYear(); }
  getMonth() { return this.date.getMonth(); }
  getDate() { return this.date.getDate(); }
  getDay() { return this.date.getDay(); }
  getTime() { return this.date.getTime(); }

  /**
   * format 部分が同じものか比較するメソッド
   * @param {Datetime} datetime - 比較対象の Datetime オブジェクト
   * @param {string} format - 比較するフォーマット
   * @return {boolean} format 部分が同じかどうか
   */
  isSame(datetime, format = 'yyyy/MM/dd HH:mm:ss') {
    return this.toString(format) === datetime.toString(format);
  }

  /**
   * format で指定された形式で比較して、対象の日時より前 (以前) かどうかを判定するメソッド
   * @param {Datetime} datetime - 比較対象の Datetime オブジェクト
   * @param {boolean} isOn - 対象の日時もふくむかどうか
   * @param {string} format - 比較するフォーマット
   * @return {boolean} 対象の日時より前 (以前) かどうか
   */
  isBefore(datetime, isOn = false, format = 'yyyy/MM/dd HH:mm:ss') {
    const strDate = this.toString(format);
    const strTargetDate = datetime.toString(format);
    return isOn ? strDate <= strTargetDate : strDate < strTargetDate;
  }

  /**
   * format で指定された形式で比較して、対象の日時より後 (以降) かどうかを判定するメソッド
   * @param {Datetime} datetime - 比較対象の Datetime オブジェクト
   * @param {boolean} isOn - 対象の日時もふくむかどうか
   * @param {string} format - 比較するフォーマット
   * @return {boolean} 対象の日時より後 (以降) かどうか
   */
  isAfter(datetime, isOn = false, format = 'yyyy/MM/dd HH:mm:ss') {
    const strDate = this.toString(format);
    const strTargetDate = datetime.toString(format);
    return isOn ? strDate >= strTargetDate : strDate > strTargetDate;
  }

  /**
   * 指定した時間を超えたらエラーを投げるメソッド
   * @param {number} limitSec - 判定する秒数
   * @throws 時間を超えたエラー
   */
  throwTimeOverError(limitSec = 350) {
    if (this.isTimeOver(limitSec)) throw new Error('Processing time exceeded ' + limitSec + ' seconds.');
  }

  /**
   * インスタンスを生成してからの時間が指定の秒数を超えたかどうかを判定するメソッド
   * @param {number} limitSec - 判定する秒数
   * @return {boolean} インスタンスを生成してからの時間が指定の時間を超えたかどうか
   * NOTE: デフォルト値は GAS の実行時間上限 360 秒に余裕を持たせた値
   */
  isTimeOver(limitSec = 350) {
    const runtimeSec = this.getRuntimeSec();
    return runtimeSec > limitSec;
  }

  /**
   * インスタンスを生成した日時とメソッドを走らせた日時の差分の秒数を返すメソッド
   * @return {number} インスタンス生成からの経過秒数
   */
  getRuntimeSec() {
    const runtimeSec = (Date.now() - this.getTime()) / 1000;
    return runtimeSec;
  }

  /**
   * UNIX 時間を取得するメソッド
   * @return {number} 秒単位までのユニックス タイム
   */
  getUnixTimeSec() {
    const time = this.getTime();
    const unixTime = Math.ceil(time / 1000);
    return unixTime;
  }

  /**
   * x 日前の Datetime オブジェクトを返すメソッド
   * @param {number} x - 日数差
   * @return {Datetime} x 日前の Datetime オブジェクト
   */
  getDtDaysBefore(x) {
    const date = new Date(this.date);
    date.setDate(date.getDate() - x);
    return new Datetime(date);
  }

  /**
   * x 日後の Datetime オブジェクトを返すメソッド
   * @param {number} x - 日数差
   * @return {Datetime} x 日後の Datetime オブジェクト
   */
  getDtDaysLater(x) {
    const dt = this.getDtDaysBefore(-x);
    return dt;
  }

  /**
   * 対象の Datetime オブジェクトとの日数差を返すメソッド
   * @param {Datetime} datetime - 日数差を計算する対象となる Datetime オブジェクト
   * @return {number} 日数差
   * NOTE: 時刻部分を含めると小数になるため、日付のみで比較する
   */
  getDiffDays(datetime) {
    const start = new Date(this.toString('yyyy/MM/dd'));
    const end = new Date(datetime.toString('yyyy/MM/dd'));
    const diffDays = Math.abs(start.getTime() - end.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays;
  }

  /**
   * 今月の日付を配列として取得するメソッド
   * @return {Array.<Date>} 今月の日付
   */
  getThisMonthDates() {
    const firstDate = new Date(this.getFullYear(), this.getMonth(), 1);
    const dates = this.getDates(31, firstDate);
    const thisMonthDates = dates.filter(date => date.getMonth() === this.getMonth());
    return thisMonthDates;
  }

  /**
   * Date オブジェクトから diffDays 分、1 日ずつの Date オブジェクトを配列化するメソッド
   * @param {number} diffDays - Date オブジェクトからの日数差
   * @param {Date} date - 起点となる日付
   * @return {Array.<Date>} Date オブジェクトから diffDays 分、1 日ずつの Date オブジェクト
   */
  getDates(diffDays, date = this.date) {
    const nums = new Array(Math.abs(diffDays) + 1).fill().map((_, i) => i);
    const dates = nums.map(num => new Date(date.getFullYear(), date.getMonth(), date.getDate() + num));
    return dates;
  }

  /**
   * x 営業日後の Datetime オブジェクトを返すメソッド
   * @param {number} x - 営業日数
   * @return {Datetime} x 営業日後の Datetime オブジェクト
   * @throws 引数が 0 以下の場合のエラー
   */
  getDtBusinessDaysLater(x) {
    const dt = this.getDtBusinessDays_(x, 1);
    return dt;
  }

  /**
   * x 営業日前の Datetime オブジェクトを返すメソッド
   * @param {number} x - 営業日数
   * @return {Datetime} x 営業日前の Datetime オブジェクト
   * @throws 引数が 0 以下の場合のエラー
   */
  getDtBusinessDaysBefore(x) {
    const dt = this.getDtBusinessDays_(x, -1);
    return dt;
  }

  /**
   * x 営業日ずらした Datetime オブジェクトを返すプライベート メソッド
   * @param {number} x - 営業日数
   * @param {number} step - 進める向き 1: 未来 / -1: 過去
   * @return {Datetime} x 営業日ずらした Datetime オブジェクト
   * @throws 引数が 0 以下の場合のエラー
   * NOTE: 例外 2 - 営業日を N 日ずらす処理のため、反復メソッドではなく while 文を使用する
   */
  getDtBusinessDays_(x, step) {
    if (x <= 0) throw new Error('The parameter must be greater than 0.');
    let count = 0;
    let dt = this;
    while (count !== x) {
      dt = step === 1 ? dt.getDtNextBusinessDay() : dt.getDtPrevBusinessDay();
      count++;
    }
    return dt;
  }

  /**
   * 翌営業日の Datetime オブジェクトを返すメソッド
   * @param {Datetime} dt - 判定対象となる Datetime オブジェクト
   * @return {Datetime} 翌営業日の Datetime オブジェクト
   */
  getDtNextBusinessDay(dt = this) {
    const nextDt = this.getDtBusinessDay_(dt, 1);
    return nextDt;
  }

  /**
   * 前営業日の Datetime オブジェクトを返すメソッド
   * @param {Datetime} dt - 判定対象となる Datetime オブジェクト
   * @return {Datetime} 前営業日の Datetime オブジェクト
   */
  getDtPrevBusinessDay(dt = this) {
    const prevDt = this.getDtBusinessDay_(dt, -1);
    return prevDt;
  }

  /**
   * 1 営業日ずらした Datetime オブジェクトを返すプライベート メソッド
   * @param {Datetime} dt - 判定対象となる Datetime オブジェクト
   * @param {number} step - 進める向き 1: 未来 / -1: 過去
   * @return {Datetime} 1 営業日ずらした Datetime オブジェクト
   * NOTE: 例外 2 - 休日をスキップする処理のため、反復メソッドではなく while 文を使用する
   * NOTE: 連続して呼び出せるよう、返り値に holidays, repeatedHolidays を引き継ぐ
   */
  getDtBusinessDay_(dt, step) {
    let businessDt = dt.getDtDaysLater(step);
    while (this.isHoliday(businessDt.date)) {
      businessDt = businessDt.getDtDaysLater(step);
    }
    return this.inheritHolidays_(businessDt);
  }

  /**
   * 最終営業日の Datetime オブジェクトを返すメソッド
   * @param {Date} date - 判定対象となる Date オブジェクト
   * @return {Datetime} 最終営業日の Datetime オブジェクト
   * NOTE: this の holidays, repeatedHolidays プロパティに値がある場合には引き継ぐ
   */
  getDtLastBusinessDayOfMonth(date = this.date) {
    const dtFirstDayOfNextMonth = new Datetime(date.getFullYear(), date.getMonth() + 1, 1);
    this.inheritHolidays_(dtFirstDayOfNextMonth);
    const dtLastBusinessDayOfMonth = dtFirstDayOfNextMonth.getDtPrevBusinessDay();
    return dtLastBusinessDayOfMonth;
  }

  /**
   * 営業日かどうかを判定するメソッド
   * @param {Date} date - 判定する日
   * @return {boolean} 営業日かどうか
   */
  isBusinessDay(date = this.date) {
    return !this.isHoliday(date);
  }

  /**
   * 土日祝かどうかを判定するメソッド
   * @param {Date} date - 判定する日
   * @param {string} holidaysCalendarId - 祝日カレンダーの ID
   * @return {boolean} 土日祝かどうか
   * NOTE: holidays と repeatedHolidays は併用できる
   */
  isHoliday(date = this.date, holidaysCalendarId = 'ja.japanese#holiday@group.v.calendar.google.com') {
    if (date.getDay() % 6 === 0) return true;
    const hasHolidays = this.holidays !== undefined;
    const hasRepeatedHolidays = this.repeatedHolidays !== undefined;
    if (hasHolidays &&
      this.holidays.map(holiday => Datetime.format(holiday, 'yyyy/MM/dd')).includes(Datetime.format(date, 'yyyy/MM/dd'))) return true;
    if (hasRepeatedHolidays &&
      this.repeatedHolidays.includes(Datetime.format(date, 'MM/dd'))) return true;
    if (hasHolidays || hasRepeatedHolidays) return false;  // NOTE: 休日が指定されている場合はカレンダーを参照しない
    return this.getHolidaysCalendar_(holidaysCalendarId).getEventsForDay(date).length !== 0;
  }

  /**
   * 祝日カレンダーを取得するプライベート メソッド
   * @param {string} holidaysCalendarId - 祝日カレンダーの ID
   * @return {CalendarApp.Calendar} 祝日カレンダー
   * NOTE: ID が変わった場合には取得し直す
   */
  getHolidaysCalendar_(holidaysCalendarId) {
    if (this.holidaysCalendarId_ !== holidaysCalendarId) {
      this.holidaysCalendar_ = CalendarApp.getCalendarById(holidaysCalendarId);
      this.holidaysCalendarId_ = holidaysCalendarId;
    }
    return this.holidaysCalendar_;
  }

  /**
   * 休日判定用の休日をプロパティに追加するメソッド
   * @param {Array.<Date>} holidays - 追加する祝日
   * @return {Datetime} Datetime オブジェクト
   */
  addHolidays(holidays) {
    /** @type {Array.<Date>} */
    this.holidays = holidays;
    return this;
  }

  /**
   * 繰り返される休日をプロパティに追加するメソッド
   * @param {Array.<string>} repeatedHolidays - 繰り返される休日 MM/dd か M/d 形式の文字列
   * @return {Datetime} Datetime オブジェクト
   */
  addRepeatedHolidays(repeatedHolidays) {
    /** @type {Array.<string>} */
    this.repeatedHolidays = repeatedHolidays.map(day => Datetime.getZeroPaddedMonthDay(day));
    return this;
  }

  /**
   * M/d 形式の文字列を MM/dd 形式に変換する静的メソッド
   * @param {string} monthDay - MM/dd か M/d 形式の文字列
   * @return {string} MM/dd 形式の文字列
   */
  static getZeroPaddedMonthDay(monthDay) {
    const zeroPaddedMonthDay = monthDay.split('/').map(n => n.padStart(2, '0')).join('/');
    return zeroPaddedMonthDay;
  }

  /**
   * holidays, repeatedHolidays プロパティに値がある場合には引き継ぐプライベート メソッド
   * @param {Datetime} dt - プロパティを引き継ぐ Datetime オブジェクト
   * @return {Datetime} プロパティを引き継いだ Datetime オブジェクト
   */
  inheritHolidays_(dt) {
    if (this.holidays !== undefined) dt.holidays = this.holidays;
    if (this.repeatedHolidays !== undefined) dt.repeatedHolidays = this.repeatedHolidays;
    return dt;
  }

  /**
   * コンストラクタの date プロパティを指定のフォーマットで文字列化するメソッド
   * @param {string} format - フォーマットする形式
   * @return {string} フォーマットされた文字列型の日時
   */
  toString(format = 'yyyy/MM/dd HH:mm:ss') {
    const strDate = Datetime.format(this.date, format);
    return strDate;
  }

  /**
   * 指定のフォーマットで日時を文字列化する静的メソッド
   * @param {Date|string|number} d - Date オブジェクトでインスタンス生成可能な引数
   * @param {string} format - フォーマットする形式
   * @return {string} フォーマットされた文字列型の日時
   */
  static format(d = new Date(), format = 'yyyy/MM/dd HH:mm:ss') {
    const date = new Date(d);
    const strDate = Utilities.formatDate(date, 'JST', format);
    return strDate;
  }

  /**
   * 時間の差分を HH:mm:ss 形式で返す静的メソッド
   * @param {Date|string|number} date1 - Date オブジェクトでインスタンス生成可能な引数
   * @param {Date|string|number} date2 - Date オブジェクトでインスタンス生成可能な引数
   * @return {string} 時間の差分
   */
  static getStrDiffTime(date1, date2) {
    const diffTime = new Date(Math.abs(new Date(date1).getTime() - new Date(date2).getTime()));
    const strDiffTime = Utilities.formatDate(diffTime, 'UTC', 'HH:mm:ss');
    return strDiffTime;
  }

}
