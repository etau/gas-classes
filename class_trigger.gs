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
   * トリガーを削除するメソッド
   */
  delete() {
    const triggers = ScriptApp.getScriptTriggers();
    triggers.forEach(trigger => {
      if (trigger.getHandlerFunction() === this.functionName) ScriptApp.deleteTrigger(trigger);
    });
  }

  /**
   * トリガーを設定するメソッド
   */
  create(triggerTimes) {
    if (triggerTimes.length === 0) return;
    triggerTimes.forEach(triggerTime => ScriptApp.newTrigger(this.functionName).timeBased().at(triggerTime).create());
  }

}