'use strict';

/**
 * ユーザーインターフェースに関するクラス
 */
class Ui {

  /**
   * ユーザーインターフェースに関するコンストラクタ
   * @constructor
   */
  constructor() {
    /** @type {SpreadsheetApp.Ui} */
    this.ui = SpreadsheetApp.getUi();
  }

  /**
   * Class Ui から委譲されたメソッド
   * NOTE: https://developers.google.com/apps-script/reference/base/ui
   */
  alert(...args) { return this.ui.alert(...args); }
  prompt(...args) { return this.ui.prompt(...args); }
  createMenu(...args) { return this.ui.createMenu(...args); }

  /**
   * アラートに「はい」ボタンが押されたかどうかを判定するメソッド
   * @param {string} alertMessage - アラート メッセージ
   * @return {boolean} 「はい」ボタンが押されたかどうか
   */
  isYesButtonClicked(alertMessage) {
    const response = this.alert(alertMessage, this.ui.ButtonSet.YES_NO);
    return response === this.ui.Button.YES;
  }

  /**
   * アラートに「OK」ボタンが押されたかどうかを判定するメソッド
   * @param {string} alertMessage - アラート メッセージ
   * @return {boolean} 「OK」ボタンが押されたかどうか
   */
  isOkButtonClicked(alertMessage) {
    const response = this.alert(alertMessage, this.ui.ButtonSet.OK_CANCEL);
    return response === this.ui.Button.OK;
  }

}
