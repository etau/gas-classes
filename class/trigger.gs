'use strict'

class Trigger {

  /**
   * トリガーに関するコンストラクタ
   * @constructor
   * @param {string} functionName - 関数名
   */
  constructor(functionName) {
    /** @type {string} */
    this.functionName = functionName;
  }

  /**
   * retryMins 後にトリガーを設定するメソッド
   * @param {number} retryMins - 分
   * @return {Trigger} Trigger オブジェクト
   * NOTE: try...chatch 文とセットで利用する
   */
  retry(retryMins = 1) {
    const date = new Date();
    date.setMinutes(date.getMinutes() + retryMins);
    this.createTimeBased(date);
    return this;
  }

  /**
   * 指定日時のトリガーを設定するメソッド
   * @param {Date} triggerTime - トリガーをセットする指定日時
   * @return {Trigger} Trigger オブジェクト
   */
  createTimeBased(triggerTime) {
    ScriptApp.newTrigger(this.functionName).
      timeBased().
      at(triggerTime).
      create();
    return this;
  }

  /**
   * スプレッドシート変更時のトリガーを設定するメソッド
   * @return {Trigger} Trigger オブジェクト
   */
  createOnChangeForSpreadsheet() {
    this.delete();
    ScriptApp.newTrigger(this.functionName).
      forSpreadsheet(SS).
      onChange().
      create();
    return this;
  }

  /**
   * スプレッドシート編集時のトリガーを設定するメソッド
   * @return {Trigger} Trigger オブジェクト
   */
  createOnEditForSpreadsheet() {
    this.delete();
    ScriptApp.newTrigger(this.functionName).
      forSpreadsheet(SS).
      onEdit().
      create();
    return this;
  }

  /**
   * 時間主導型 - 日付ベースのタイマーを設定するメソッド
   * @param {number} hour - 時間 NOTE: 20 と設定した場合「午後 20 時～ 21 時」に設定
   * @param {number} everyDays - 何日ごとに実行するか
   * @return {Trigger} Trigger オブジェクト
   */
  createAtHour(hour, everyDays) {
    this.delete();
    ScriptApp.newTrigger(this.functionName).
      timeBased().
      atHour(hour).
      everyDays(everyDays).
      create();
    return this;
  }

  /**
   * トリガーを削除するメソッド
   * @return {Trigger} Trigger オブジェクト
   */
  delete() {
    const triggers = ScriptApp.getProjectTriggers();
    triggers.forEach(trigger => {
      if (trigger.getHandlerFunction() !== this.functionName) return;
      ScriptApp.deleteTrigger(trigger);
    });
    return this;
  }

}

/**
 * 初回のトリガーを設定する関数
 */
function setInitialTriggers() {

  const onChangeTriggers = TRIGGER_TYPE.ON_CHANGE;
  onChangeTriggers.forEach(trigger => new Trigger(trigger.NAME).createOnChangeForSpreadsheet());

  const onEditTriggers = TRIGGER_TYPE.ON_EDIT;
  onEditTriggers.forEach(trigger => new Trigger(trigger.NAME).createOnEditForSpreadsheet());

  const timeBasedTriggers = TRIGGER_TYPE.TIME_BASE;
  const atHourTriggers = timeBasedTriggers.AT_HOUR;
  atHourTriggers.forEach(trigger => new Trigger(trigger.NAME).createAtHour(trigger.HOUR, trigger.EVERY_DAYS));

}

// NOTE: 以下のような Enum を設定しておくとよい
/** @enum {string} */
const TRIGGER_TYPE = {
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
          HOUR: 0,
          EVERY_DAYS: 1
        }
      ]
  }
};