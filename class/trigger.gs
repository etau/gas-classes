'use strict';

/**
 * トリガーに関するクラス
 */
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
   * NOTE: try...catch 文とセットで利用する
   * NOTE: リトライを重ねられるよう、既存のトリガーは削除しない
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
    ScriptApp.newTrigger(this.functionName)
      .timeBased()
      .at(triggerTime)
      .create();
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
    ScriptApp.newTrigger(this.functionName)
      .timeBased()
      .atHour(hour)
      .everyDays(everyDays)
      .create();
    return this;
  }

  /**
   * スプレッドシート変更時のトリガーを設定するメソッド
   * @return {Trigger} Trigger オブジェクト
   */
  createOnChangeForSpreadsheet() {
    this.delete();
    ScriptApp.newTrigger(this.functionName)
      .forSpreadsheet(SS)
      .onChange()
      .create();
    return this;
  }

  /**
   * スプレッドシート編集時のトリガーを設定するメソッド
   * @return {Trigger} Trigger オブジェクト
   */
  createOnEditForSpreadsheet() {
    this.delete();
    ScriptApp.newTrigger(this.functionName)
      .forSpreadsheet(SS)
      .onEdit()
      .create();
    return this;
  }

  /**
   * 対象の関数に紐づくトリガーをすべて取得するメソッド
   * @return {Array.<ScriptApp.Trigger>} 対象の関数に紐づくトリガー
   */
  getTriggers() {
    const triggers = ScriptApp.getProjectTriggers()
      .filter(trigger => trigger.getHandlerFunction() === this.functionName);
    return triggers;
  }

  /**
   * 対象の関数に紐づくトリガーをすべて削除するメソッド
   * @return {Trigger} Trigger オブジェクト
   */
  delete() {
    this.getTriggers().forEach(trigger => ScriptApp.deleteTrigger(trigger));
    return this;
  }

}

/**
 * TRIGGER_TYPE enum の定義にしたがって初回のトリガーを設定する関数
 */
function setInitialTriggers() {
  const onChangeTriggers = TRIGGER_TYPE.ON_CHANGE;
  onChangeTriggers.forEach(trigger => new Trigger(trigger.NAME).createOnChangeForSpreadsheet());

  const onEditTriggers = TRIGGER_TYPE.ON_EDIT;
  onEditTriggers.forEach(trigger => new Trigger(trigger.NAME).createOnEditForSpreadsheet());

  const atHourTriggers = TRIGGER_TYPE.TIME_BASE.AT_HOUR;
  atHourTriggers.forEach(trigger => new Trigger(trigger.NAME).createAtHour(trigger.HOUR, trigger.EVERY_DAYS));
}
