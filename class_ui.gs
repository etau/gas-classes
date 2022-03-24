'use strict'

class Ui {

  constructor() {
    /** @type {Ui} */
    this.ui = SpreadsheetApp.getUi();
  }

  /**
   * Class Ui から委譲されたメソッド
   * NOTE: https://developers.google.com/apps-script/reference/base/ui
   */
  alert(...args) { return this.ui.alert(...args) };

  /**
   * アラートに「はい」と答えたかどうか判定するメソッド
   * @param {string} alertMessage - アラート メッセージ
   * @return {boolean} アラートに「はい」と答えたかどうか
   */
  isAnswerYesToAlert(alertMessage) {
    const response = this.alert(alertMessage, this.ui.ButtonSet.YES_NO);
    return response === this.ui.Button.YES;
  }

}
