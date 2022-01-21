'use strict'


class Trigger {

  /**
   * トリガーに関するコンストラクタ
   * @constructor
   * @param {string} functionName - 関数名
   */
  constructor(functionName) {
    this.functionName = functionName;
  }

  /**
   * 指定日時のトリガーを設定するメソッド
   * @param {Date} triggerTime - トリガーをセットする指定日時
   */
  createTimeBased(triggerTime) {
    ScriptApp.newTrigger(this.functionName).
      timeBased().
      at(triggerTime).
      create();
  }

  /**
   * スプレッドシート変更時のトリガーを設定するメソッド
   */
  createOnChangeForSpreadsheet() {
    this.delete();
    ScriptApp.newTrigger(this.functionName).
      forSpreadsheet(SS).
      onChange().
      create();
  }

  /**
   * スプレッドシート編集時のトリガーを設定するメソッド
   */
  createOnEditForSpreadsheet() {
    this.delete();
    ScriptApp.newTrigger(this.functionName).
      forSpreadsheet(SS).
      onEdit().
      create();
  }

  /**
   * 時間主導型 - 日付ベースのタイマーを設定するメソッド
   * @param {number} hour - 時間 NOTE: 20 と設定した場合「午後 20 時～ 21 時」に設定
   * @param {number} everyDays - 何日ごとに実行するか
   */
  createAtHour(hour, everyDays) {
    this.delete();
    ScriptApp.newTrigger(this.functionName).
      timeBased().
      atHour(hour).
      everyDays(everyDays).
      create();
  }

  /**
   * トリガーを削除するメソッド
   */
  delete() {
    const triggers = ScriptApp.getProjectTriggers();
    triggers.forEach(trigger => {
      if (trigger.getHandlerFunction() === this.functionName) ScriptApp.deleteTrigger(trigger);
    });
  }

}


// NOTE: 以下のような Enum を設定しておくとよい
/** @enum {string} */
const TRIGGER_TYPE = Object.freeze({
  ON_CHANGE: [
    { NAME: 'hoge' }
  ],
  ON_EDIT: [
    { NAME: 'fuga' }
  ],
  TIME_BASE: {
    AT_HOUR:
      [
        {
          NAME: 'piyo',
          HOUR: 23,
          EVERY_DAYS: 1
        }
      ]
  }
});