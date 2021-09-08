'use strict'

/**
 * カレンダーに関するクラス
 */
class Calendar {

  /**
   * カレンダーに関するコンストラクタ
   * @constructor
   * @param {string} account - GWS アカウント
   */
  constructor(account) {
    /** @type {string} */
    this.account = account;
    /** @type {CalendarApp.Calendar} */
    this.calendar = CalendarApp.getCalendarById(account);
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
class HolidaysCalendar {

  constructor(calendar) {
    this.calendar = CalendarApp.getCalendarById('ja.japanese#holiday@group.v.calendar.google.com');
  }

  /**
   * 祝日名と日付を取得するメソッド
   * @return {Array.<Array.<string>>} 祝日名と日付の値
   */
  getValues() {
    const events = this.getEvents();
    const values = events.map(
      event => [
        event.getTitle(),
        Datetime.format(event.getStartTime())
      ]
    );
    return values;
  }

  /**
   * x か月前から y か月語までのイベント (祝日情報) を取得するメソッド
   * @return {CalendarApp.CalendarEvent}
   */
  getEvents(x = 1, y = 1) {
    const date = new Date();
    const startDate = new Date(date.getFullYear(), date.getMonth() - x, date.getDate());
    const endDate = new Date(date.getFullYear(), date.getMonth() + y, date.getDate());
    const events = this.calendar.getEvents(startDate, endDate);
    return events;
  }

}