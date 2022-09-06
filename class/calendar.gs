'use strict'

class Calendar {

  /**
   * カレンダーに関するコンストラクタ
   * @constructor
   * @param {CalendarApp.Calendar} calendar - カレンダー オブジェクト
   */
  constructor(calendar = CalendarApp.getDefaultCalendar()) {
    /** @type {CalendarApp.Calendar} */
    this.calendar = Type.valid(calendar, TYPE.CALENDAR);
    /** @type {HolidayCalendar} */
    this.holiday = new HolidayCalendar();
  }

  /**
   * Class CalendarApp から委譲されたメソッド
   * NOTE: https://developers.google.com/apps-script/reference/calendar/calendar-app
   */
  getEvents(...args) { return this.calendar.getEvents(...args); }
  createAllDayEvent(...args) { return this.calendar.createAllDayEvent(...args); }

}



/** NOTE: Calendar クラスが充実してきたら、継承するかどうかを判断
 * 祝日のカレンダーに関するクラス
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
   * @param {number} year - 対象となる年
   * @return {Array.<Array.<string>>} 固有の休暇
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

}