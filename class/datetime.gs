'use strict'

class Datetime {

  /**
   * 日時に関するコンストラクタ
   * @constructor
   * @param {Date|string|number|...number} date - Date オブジェクトでインスタンス生成可能な引数
   */
  constructor(...args) {
    /** @type {Date} */
    this.date = new Date(...args);
  }

  /**
   * Date オブジェクトから委譲されたメソッド
   * NOTE: getMonth, setMonth の戻り値、仮引数は 0 - 11 を 1 - 12 に変更  
   */
  getFullYear() { return this.date.getFullYear(); }
  getMonth() { return this.date.getMonth() + 1; }
  getDate() { return this.date.getDate(); }
  getTime() { return this.date.getTime(); }
  setFullYear(arg) { return this.date.setFullYear(arg); }
  setMonth(arg) { return this.date.setMonth(arg - 1); }
  setDate(arg) { return this.date.setDate(arg); }

  /**
   * format 部分が同じものか比較するメソッド
   * @param {Date} date - 比較対象の Date オブジェクト
   * @param {string} format - 比較するフォーマット
   * @return {boolean} format 部分が同じかどうか
   */
  isSame(date, format = 'yyyy/MM/dd HH:mm:ss') {
    return Datetime.format(date, format) === Datetime.format(this.date, format);
  }

  /**
   * 日時をformatで指定された形式を比較して、その日時より前かを判定するメソッド
   * @param {Date} date - 比較対象の Date オブジェクト
   * @param {string} format - 比較するフォーマット
   * @return {boolean}
   */
  isBefore(date, format = 'yyyy/MM/dd HH:mm:ss') {
    return Datetime.format(date, format) < Datetime.format(this.date, format);
  }

  /**
   * 日時を format で指定された形式を比較して、その日時以前かを判定するメソッド
   * @param {Date} date - 比較対象の Date オブジェクト
   * @param {string} format - 比較するフォーマット
   * @return {boolean}
   */
  isOnOrBefore(date, format = 'yyyy/MM/dd HH:mm:ss') {
    return Datetime.format(date, format) <= Datetime.format(this.date, format);
  }

  /**
   * 日時をformatで指定された形式を比較して、その日時より後かを判定するメソッド
   * @param {Date} date - 比較対象の Date オブジェクト
   * @param {string} format - 比較するフォーマット
   * @return {boolean}
   */
  isAfter(date, format = 'yyyy/MM/dd HH:mm:ss') {
    return Datetime.format(date, format) > Datetime.format(this.date, format);
  }

  /**
   * 日時をformatで指定された形式を比較して、その日時以降かを判定するメソッド
   * @param {Date} date - 比較対象の Date オブジェクト
   * @param {string} format - 比較するフォーマット
   * @return {boolean}
   */
  isOnOrAfter(date, format = 'yyyy/MM/dd HH:mm:ss') {
    return Datetime.format(date, format) >= Datetime.format(this.date, format);
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
   * 指定した時間を超えたらエラーを投げるメソッド
   * @throws 時間を超えたエラー        
   */
  thorowTimeOverError(limitSec = 350) {
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
   * UNIX 時間を取得する関数
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
  getDtDaysAgo(x) {
    const d = new Date(this.date);
    d.setDate(d.getDate() - x);
    return new Datetime(d);
  }

  /**
   * コンストラクタの date オブジェクトとの日数差を返すメソッド
   * @param {Date} date - コンストラクタの date オブジェクトとの日数差を計算する対象となる Date オブジェクト
   * @return {number} コンストラクタの date オブジェクトと param との日数差
   */
  calculateDiffDays(date) {
    const start = new Date(this.toString());
    const end = new Date(Datetime.format(date, 'yyyy/MM/dd'));
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
  getDtBusinessDaysLater(x) {
    if (x <= 0) throw new Error('The parameter must be greater than 0.');
    let count = 0;
    let dt = this;
    while (count !== x) {
      dt = dt.getDtNextBussinessDay();
      count++;
    }
    return dt;
  }

  /**
   * 翌営業日の Datetime オブジェクトを返すメソッド
   * @param {Datetime} dt - 判定対象となる Datetime オブジェクト。
   * @return {Datetime} 翌営業日の Datetime オブジェクト
   */
  getDtNextBussinessDay(dt = this) {
    let nextDt = dt.getDtDaysAgo(-1);
    while (this.isHoliday(nextDt.date)) {
      nextDt = nextDt.getDtDaysAgo(-1);
    }
    return nextDt;
  }

  /**
   * x 営業日前の Datetime オブジェクトを返すメソッド
   * @param {number} x - 日数差
   * @return {Datetime} x 日前の Date オブジェクト
   */
  getDtBusinessDaysBefore(x) {
    if (x <= 0) throw new Error('The parameter must be greater than 0.');
    let count = 0;
    let dt = this;
    while (count !== x) {
      dt = dt.getDtPrevBussinessDay();
      count++;
    }
    return dt;
  }

  /**
   * 前営業日の Datetime オブジェクトを返すメソッド
   * @param {Datetime} dt - 判定対象となる Datetime オブジェクト
   * @return {Datetime} 翌営業日の Datetime オブジェクト
   */
  getDtPrevBussinessDay(dt = this) {
    let prevDt = dt.getDtDaysAgo(1);
    while (this.isHoliday(prevDt.date)) {
      prevDt = prevDt.getDtDaysAgo(1);
    }
    return prevDt;
  }

  /**
   * 最終営業日の Datetime オブジェクトを返すメソッド
   * @param {Date} date - 判定対象となる Date オブジェクト
   * @return {Datetime} 最終営業日の Datetime オブジェクト
   * NOTE: this の holidays, repeatedHolidays プロパティに値がある場合には引き継ぐ
   */
  getDtLastBussinessDayOfMonth(date = this.date) {
    const dtFirstDayOfNextMonth = new Datetime(date.getFullYear(), date.getMonth() + 1, 1);
    this.setProperties(dtFirstDayOfNextMonth);
    const dtLastBussinessDayOfMonth = dtFirstDayOfNextMonth.getDtPrevBussinessDay();
    return dtLastBussinessDayOfMonth;
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
   * @param {string} holidaysCalendarId - カレンダー Id
   * @return {boolean} 土日祝のかどうか
   */
  isHoliday(date = this.date, holidaysCalendarId = 'ja.japanese#holiday@group.v.calendar.google.com') {
    if (date.getDay() % 6 === 0) return true;
    if (this.holidays !== undefined) return this.holidays.map(holiday => Datetime.format(holiday, 'yyyy/MM/dd')).includes(Datetime.format(date, 'yyyy/MM/dd'));
    if (this.repeatedHolidays !== undefined) return this.repeatedHolidays.includes(Datetime.format(date, 'MM/dd'));
    if (this.holidaysCalendar_ === undefined) this.holidaysCalendar_ = CalendarApp.getCalendarById(holidaysCalendarId);
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
   * 繰り返される休日をプロパティに追加するメソッド
   * @param {Array.<string>} repeatedHolidays - 繰り返される休日 MM/dd か M/d 形式の文字列
   * @return {Datetime} Datetime オブジェクト
   */
  addRepeatedHolidays(repeatedHolidays) {
    const zeroPaddedRepeatedHolidays = repeatedHolidays.map(day => day.split('/')).map(md => md.map(n => n.padStart(2, 0)).join('/'));  // HACK: MM/dd 形式に変換
    this.repeatedHolidays = zeroPaddedRepeatedHolidays;
    return this;
  }

  /**
   * holidays, repeatedHolidays プロパティに値がある場合にはセットするメソッド
   * @param {Datetime} プロパティをセットされる Datetime オブジェクト
   * @return {Datetime} プロパティをセットされた Datetime オブジェクト
   */
  setProperties(dt) {
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
   * @param {Date} d - Date オブジェクト 文字列型も可
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
   * @param {{Date|string|number}} date1 - Date オブジェクトでインスタンス生成可能な引数
   * @param {{Date|string|number}} date2 - Date オブジェクトでインスタンス生成可能な引数
   * @return {string} strDiffTime - 時間の差分
   */
  static getStrDiffTime(date1, date2) {
    const diffTime = new Date(Math.abs(new Date(date1).getTime() - new Date(date2).getTime()));
    const strDiffTime = Utilities.formatDate(diffTime, 'UTC', 'HH:mm:ss');
    return strDiffTime;
  }

}