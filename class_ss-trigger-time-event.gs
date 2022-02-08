class TriggerTimeEvents {

  /**
   * トリガーイベント (時間主導型) に関するコンストラクタ
   * @constructor
   * @param {Object} e - トリガー イベント
   */
  constructor(e) {
    /** @type {Date} NOTE: UTC 以外の値が取れるか不明*/
    e.timezone = 'UTC' ?
      this.utcDate = new Date(e.year, e.month, e['day-of-month'], e.hour, e.minute, e.second) :
      this.date = new Date(e.year, e.month, e['day-of-month'], e.hour, e.minute, e.second)
  }

  /**
   * 現地時間を取得するメソッド
   * @param {number} diffHours - 時差
   * @return {Date} 時差を調整した日付
   */
  getLocaleDate(diffHours = 9) {
    if (this.utcDate === undefined) return new Date(this.date);
    const date = new Date(this.utcDate);
    date.setHours(date.getHours() + diffHours);
    return date;
  }

}

// { year: 2022,
//   'day-of-month': 5,
//   triggerUid: '10000463',
//   'week-of-year': 5,
//   month: 2,
//   second: 45,
//   authMode: 
//    { toString: [Function: toString],
//      name: [Function: toString],
//      toJSON: [Function: toString],
//      ordinal: [Function: ordinal],
//      compareTo: [Function: compareTo],
//      NONE: 
//       { toString: [Function: toString],
//         name: [Function: toString],
//         toJSON: [Function: toString],
//         ordinal: [Function: ordinal],
//         compareTo: [Function: compareTo],
//         NONE: [Circular],
//         CUSTOM_FUNCTION: [Object],
//         LIMITED: [Object],
//         FULL: [Circular] },
//      CUSTOM_FUNCTION: 
//       { toString: [Function: toString],
//         name: [Function: toString],
//         toJSON: [Function: toString],
//         ordinal: [Function: ordinal],
//         compareTo: [Function: compareTo],
//         NONE: [Object],
//         CUSTOM_FUNCTION: [Circular],
//         LIMITED: [Object],
//         FULL: [Circular] },
//      LIMITED: 
//       { toString: [Function: toString],
//         name: [Function: toString],
//         toJSON: [Function: toString],
//         ordinal: [Function: ordinal],
//         compareTo: [Function: compareTo],
//         NONE: [Object],
//         CUSTOM_FUNCTION: [Object],
//         LIMITED: [Circular],
//         FULL: [Circular] },
//      FULL: [Circular] },
//   hour: 15,
//   timezone: 'UTC',
//   minute: 35,
//   'day-of-week': 6 }