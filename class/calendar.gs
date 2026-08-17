'use strict';

/**
 * カレンダーに関するクラス
 * NOTE: 高度な Google サービスの Calendar API を有効化すると、同名のグローバル オブジェクトと衝突する
 */
class Calendar {

  /**
   * カレンダーに関するコンストラクタ
   * @constructor
   * @param {CalendarApp.Calendar} calendar - カレンダー オブジェクト
   */
  constructor(calendar = CalendarApp.getDefaultCalendar()) {
    /** @type {CalendarApp.Calendar} */
    this.calendar = Type.valid(calendar, TYPE.CALENDAR);
  }

  /**
   * Class Calendar から委譲されたメソッド
   * NOTE: https://developers.google.com/apps-script/reference/calendar/calendar
   */
  getId() { return this.calendar.getId(); }
  getName() { return this.calendar.getName(); }
  getEvents(...args) { return this.calendar.getEvents(...args); }
  getEventsForDay(...args) { return this.calendar.getEventsForDay(...args); }
  createEvent(...args) { return this.calendar.createEvent(...args); }
  createAllDayEvent(...args) { return this.calendar.createAllDayEvent(...args); }

  /**
   * 祝日カレンダーの HolidayCalendar オブジェクトを取得するメソッド
   * @param {number} year - 対象となる年
   * @return {HolidayCalendar} HolidayCalendar オブジェクト
   * NOTE: カレンダーの取得コストが高いため、必要になったタイミングで生成してキャッシュする
   */
  getHolidayCalendar(year = new Date().getFullYear()) {
    if (this.holidayCalendar_ === undefined) this.holidayCalendar_ = new HolidayCalendar(year);
    return this.holidayCalendar_;
  }

}

/**
 * 祝日のカレンダーに関するクラス
 * NOTE: Calendar クラスが充実してきたら、継承するかどうかを判断
 */
class HolidayCalendar {

  /**
   * 祝日のカレンダーに関するコンストラクタ
   * @constructor
   * @param {number} year - 対象となる年
   * @param {CalendarApp.Calendar} calendar - 祝日カレンダー
   */
  constructor(year = new Date().getFullYear(), calendar = CalendarApp.getCalendarById('ja.japanese#holiday@group.v.calendar.google.com')) {
    /** @type {number} */
    this.year = year;
    /** @type {CalendarApp.Calendar} */
    this.calendar = calendar;
  }

  /**
   * Class Calendar から委譲されたメソッド
   * NOTE: https://developers.google.com/apps-script/reference/calendar/calendar
   */
  getEvents(...args) { return this.calendar.getEvents(...args); }

  /**
   * 祝日名と日付を取得するメソッド
   * @param {Date} startDate - 開始日
   * @param {Date} endDate - 終了日
   * @return {Array.<Array.<string>>} 祝日名と yyyy/MM/dd 形式の日付の値
   */
  getValues(startDate = new Date(this.year, 0, 1), endDate = new Date(this.year, 11, 31)) {
    const publicHolidayValues = this.getPublicHolidaysValues(startDate, endDate);
    const specificHolidaysValues = this.getSpecificHolidaysValues();
    const values = [...publicHolidayValues, ...specificHolidaysValues];
    return values;
  }

  /**
   * カレンダーに登録されている祝日を配列で取得するメソッド
   * @param {Date} startDate - 開始日
   * @param {Date} endDate - 終了日
   * @return {Array.<Array.<string>>} 祝日名と yyyy/MM/dd 形式の日付の値
   */
  getPublicHolidaysValues(startDate = new Date(this.year, 0, 1), endDate = new Date(this.year, 11, 31)) {
    const events = this.getEvents(startDate, endDate);
    const publicHolidayValues = events.map(event => [event.getTitle(), Datetime.format(event.getStartTime(), 'yyyy/MM/dd')]);
    return publicHolidayValues;
  }

  /**
   * 固有の休暇を配列で取得するメソッド
   * @param {number} year - 対象となる年
   * @return {Array.<Array.<string>>} 休暇名と yyyy/MM/dd 形式の日付の値
   * NOTE: 組織ごとに異なるため、利用するプロジェクトに合わせて書き換える
   */
  getSpecificHolidaysValues(year = this.year) {
    const specificHolidaysValues = [
      ['冬季休暇', year + '/01/02'],
      ['冬季休暇', year + '/01/03'],
      ['冬季休暇', year + '/01/04'],
      ['夏季休暇', year + '/08/13'],
      ['夏季休暇', year + '/08/14'],
      ['夏季休暇', year + '/08/15'],
      ['冬季休暇', year + '/12/29'],
      ['冬季休暇', year + '/12/30'],
      ['冬季休暇', year + '/12/31'],
    ];
    return specificHolidaysValues;
  }

  /**
   * 祝日の日付だけを配列で取得するメソッド
   * @param {number} year - 対象となる年
   * @return {Array.<Date>} 祝日の Date オブジェクト
   * NOTE: Datetime クラスの addHolidays メソッドに渡して利用する
   */
  getHolidays(year = this.year) {
    const values = this.getValues(new Date(year, 0, 1), new Date(year, 11, 31));
    const holidays = values.map(record => new Date(record[1]));
    return holidays;
  }

}
