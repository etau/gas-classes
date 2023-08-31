'use strict'

class Ui {

  /**
   * ユーザーインターフェースに関するコンストラクタ
   * @constructor
   */
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
   * アラートに「はい」ボタンが押されたかどうかを判定するメソッド
   * @param {string} alertMessage - アラート メッセージ
   * @return {boolean} 「はい」ボタンが押されたかどうか
   */
  isClickYesButton(alertMessage) {
    const response = this.alert(alertMessage, this.ui.ButtonSet.YES_NO);
    return response === this.ui.Button.YES;
  }

}