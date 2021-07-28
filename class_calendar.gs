/**
 * カレンダーに関するクラス
 */
class Calennder {

  /**
   * カレンダーに関するコンストラクタ
   * @constructor
   * @param {string} account - GWS アカウント
   */
  constructor(account) {
    this.account = account;
    this.user = CalennderApp.getCalendarById(account);
  }

  /**
   * @param {string} title - カレンダーのタイトル
   * @param {Date} date - カレンダー登録日
   */
  createAllDayEvent(title, date) {
    this.user.createAllDayEvent(title, date);
  }

}