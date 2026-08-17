'use strict';

/**
 * Google フォームに関するクラス
 */
class Form {

  /**
   * フォームに関するコンストラクタ
   * @constructor
   * @param {FormApp.Form} form - フォーム オブジェクト
   * NOTE: スプレッドシート バウンドのスクリプトでは FormApp.getActiveForm が使えないため、既定値は設けない
   */
  constructor(form) {
    /** @type {FormApp.Form} */
    this.form = form;
  }

  /**
   * Class Form から委譲されたメソッド
   * NOTE: https://developers.google.com/apps-script/reference/forms/form
   */
  getId() { return this.form.getId(); }
  getTitle() { return this.form.getTitle(); }
  getEditUrl() { return this.form.getEditUrl(); }
  getPublishedUrl() { return this.form.getPublishedUrl(); }
  getItems(...args) { return this.form.getItems(...args); }

  /**
   * ラジオ ボタン・チェック ボックス・プルダウンの質問項目を更新するメソッド
   * @param {string} type - 質問のタイプ 例: FormApp.ItemType.LIST
   * @param {string} title - 質問
   * @param {Array.<number|string>} choices - 更新する項目
   * @return {Form} Form オブジェクト
   * @throws 質問が存在しない場合や、選択式でない質問を指定した場合のエラー
   */
  updateChoiceValues(type, title, choices) {
    const item = this.getChoiceItem(type, title);
    item.setChoiceValues(choices);
    return this;
  }

  /**
   * フォームの質問のタイプと質問から選択式の Item オブジェクトを取得するメソッド
   * @param {string} type - 質問のタイプ 例: FormApp.ItemType.LIST
   * @param {string} title - 質問
   * @return {FormApp.MultipleChoiceItem|FormApp.CheckboxItem|FormApp.ListItem} 選択式の Item オブジェクト
   * @throws 質問が存在しない場合や、選択式でない質問を指定した場合のエラー
   */
  getChoiceItem(type, title) {
    const item = this.getItemByTitle(type, title);
    switch (type) {
      case FormApp.ItemType.MULTIPLE_CHOICE: return item.asMultipleChoiceItem();
      case FormApp.ItemType.CHECKBOX: return item.asCheckboxItem();
      case FormApp.ItemType.LIST: return item.asListItem();
      default: throw new Error('The type "' + type + '" is not available for the method.');
    }
  }

  /**
   * フォームの質問のタイプと質問から Item オブジェクトを取得するメソッド
   * @param {string} type - 質問のタイプ 例: FormApp.ItemType.LIST
   * @param {string} title - 質問
   * @return {FormApp.Item} Item オブジェクト
   * @throws 質問が存在しない場合のエラー
   */
  getItemByTitle(type, title) {
    const items = this.getItems(type);
    if (items.length === 0) throw new Error('There is no type "' + type + '" item.');
    const item = items.find(item => item.getTitle() === title);
    if (item === undefined) throw new Error('There is no title "' + title + '" in type "' + type + '".');
    return item;
  }

}
