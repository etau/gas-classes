'use strict';

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
    ScriptApp.newTrigger(this.functionName)
      .timeBased()
      .at(triggerTime)
      .create();
    return this;
  }

  /**
   * スプレッドシート変更時のトリガーを設定するメソッド
   * @return {Trigger} Trigger オブジェクト
   * NOTE: 常設トリガーは手動設置 (GUI) とし障害通知を設定することが【必須】。
   * このメソッドでの設置は障害通知を設定できないため、検証用途に限定する。
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
   * NOTE: 常設トリガーは手動設置 (GUI) とし障害通知を設定することが【必須】。
   * このメソッドでの設置は障害通知を設定できないため、検証用途に限定する。
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