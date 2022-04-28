'use strict'

class Form {

  /**
   * フォームに関するコンストラクタ
   * @constructor
   * @param {FormApp.Form} フォーム オブジェクト
   */
  constructor(form) {
    this.form = form;
  }

  /**
   * ラジオ ボタン・チェック ボックス・プルダウンの質問項目を更新するメソッド
   * @param {string} type - 質問のタイプ
   * @param {string} title - 質問
   * @param {Array.<number|string>} choices - 更新する項目
   * @return {Form} Form オブジェクト
   */
  updateChoiceValues(type, title, choices) {
    const item = this.getItem(type, title);
    item.setChoiceValues(choices);
    return this;
  }

  /**
   * フォームの質問のタイプと質問から Item オブジェクトを取得するメソッド
   * @param {string} type - 質問のタイプ
   * @param {string} title - 質問
   * @return {FormApp.Item} Item オブジェクト
   */
  getItem(type, title) {
    const items = this.form.getItems(type);
    if (items.length === 0) throw new Error('There is no type "' + type + '" item.');

    const item = items.find(item => item.getTitle() === title);
    if (item === undefined) throw new Error('There is no title "' + title + '" in type ' + type + '.');

    switch (type) {
      case FormApp.ItemType.MULTIPLE_CHOICE: return item.asMultipleChoiceItem();
      case FormApp.ItemType.CHECKBOX: return item.asCheckboxItem();
      case FormApp.ItemType.LIST: return item.asListItem();
      default: throw new Error('The type is not available for the method.')
    }
  }

}