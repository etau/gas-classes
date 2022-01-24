'use strict'

class Form {

  /**
   * フォームに関するコンストラクタ
   * @constructor
   * @param {FormApp.Form}
   */
  constructor(form) {
    this.form = form;
  }

  /**
   * 対象となるリスト形式の質問を更新するメソッド
   * @param {string} title - リスト形式の質問
   * @param {Array.<string>} preChoices - 回答群
   */
  updateListChoices(title, preChoices) {
    const listItem = this.getListItem(title);
    const choices = this.getChoices(preChoices)
    listItem.setChoices(choices);
    return this;
  }

  /**
   * リスト形式の質問の中から対象の ListItem オブジェクトを取得するメソッド
   * @param {string} title - リスト形式の質問
   * @return {FormApp.ListItem} 
   */
  getListItem(title) {
    const listItems = this.form.getItems(FormApp.ItemType.LIST);
    const listItem = listItems.find(item => item.getTitle() === title).asListItem();
    return listItem;
  }

  /**
   * 回答群からリスト形式のオブジェクトを作るメソッド
   * @param {string} title - リスト形式の質問
   * @param {Array.<string>} preChoices - 回答群
   */
  getChoices(title, preChoices) {
    const listItem = this.getListItem(title);
    const choices = preChoices.map(element => listItem.createChoice(element));
    return choices;
  }

}