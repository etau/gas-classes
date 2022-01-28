'use strict'

/**
 * カレンダーに関するクラス
 */
class Calendar {

  /**
   * カレンダーに関するコンストラクタ
   * @constructor
   * @param {CalendarApp.Calendar} calendar - カレンダー オブジェクト
   */
  constructor(calendar = CalendarApp.getDefaultCalendar()) {
    /** @type {CalendarApp.Calendar} */
    this.calendar = calendar;
    /** @type {HolidayCalendar} */
    this.holiday = new HolidayCalendar();
  }

  /**
   * @param {string} title - カレンダーのタイトル
   * @param {Date} date - カレンダー登録日
   */
  createAllDayEvent(title, date) {
    this.calendar.createAllDayEvent(title, date);
  }

}



/**
 * 祝日のカレンダーに関するクラス
 */
class HolidayCalendar {

  constructor(year = new Date().getFullYear(), calendar = CalendarApp.getCalendarById('ja.japanese#holiday@group.v.calendar.google.com')) {
    /** @type {number} */
    this.year = year;
    /** @type {CalendarApp.Calendar} */
    this.calendar = calendar;

  }

  /**
   * Class CalendarApp から委譲されたメソッド
   * NOTE: https://developers.google.com/apps-script/reference/calendar/calendar-app
   */
  getEvents(...args) { return this.calendar.getEvents(...args); }

  /**
   * 祝日名と日付を取得するメソッド
   * @param {Date} startDate - 開始日
   * @param {Date} endDate - 終了日
   * @return {Array.<Array.<string|Date>>} 祝日名と日付の値
   */
  getValues(startDate = new Date(this.year, 0, 1), endDate = new Date(this.year, 11, 31)) {
    const events = this.getEvents(startDate, endDate);
    const publicHolidayValues = events.map(event => [event.getTitle(), Datetime.format(event.getStartTime())]);
    const specificHolidaysValues = this.getSpecificHolidaysValues();
    const values = [...publicHolidayValues, ...specificHolidaysValues];
    return values;
  }

  /**
   * 固有の休暇を配列で取得するメソッド
   * @return {Array.<Array.<string|Date>>} 固有の休暇
   */
  getSpecificHolidaysValues() {
    const specificHolidayDicts = this.getSpecificHolidayAsDicts();
    const specificHolidaysValues = specificHolidayDicts.map(specificHoliday => [
      specificHoliday.get('name'),
      Datetime.format(specificHoliday.get('date'))
    ]);
    return specificHolidaysValues;
  }

  /**
   * 対象年の固有の休暇を Map 型で取得するメソッド
   * @return {Array.<Map>} 固有の休暇
   */
  getSpecificHolidayAsDicts(year = this.year) {
    const specificHolidays = [
      new Map([['name', '冬季休暇'], ['date', new Date(year + '/01/02')]]),
      new Map([['name', '冬季休暇'], ['date', new Date(year + '/01/03')]]),
      new Map([['name', '冬季休暇'], ['date', new Date(year + '/01/04')]]),
      new Map([['name', '夏季休暇'], ['date', new Date(year + '/08/13')]]),
      new Map([['name', '夏季休暇'], ['date', new Date(year + '/08/14')]]),
      new Map([['name', '夏季休暇'], ['date', new Date(year + '/08/15')]]),
      new Map([['name', '冬季休暇'], ['date', new Date(year + '/12/29')]]),
      new Map([['name', '冬季休暇'], ['date', new Date(year + '/12/30')]]),
      new Map([['name', '冬季休暇'], ['date', new Date(year + '/12/31')]]),
    ];
    return specificHolidays;
  }

}