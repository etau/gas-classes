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
    this.user = CalendarApp.getCalendarById(account);
  }

  /**
   * @param {string} title - カレンダーのタイトル
   * @param {Date} date - カレンダー登録日
   */
  createAllDayEvent(title, date) {
    this.user.createAllDayEvent(title, date);
  }

}