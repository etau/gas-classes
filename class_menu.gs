'use strict'

class Menu {

  /**
   * @constructor
   */
  constructor() {
    /** @type {Ui} */
    this.ui = SpreadsheetApp.getUi();
  }

  /**
   * Class Menu から委譲されたメソッド
   * NOTE: https://developers.google.com/apps-script/reference/base/menu
   */
  createMenu(...args) { return this.ui.createMenu(...args); }

  /**
   * メニューを作成するメソッド
   * @param {string} title - メニュー名
   * @param {Array.<Object.<string>>} items - メニューの情報
   * @return {Menu} メニュー オブジェクト
   */
  create(title = MENU_INFO.TITLE, items = this.getItems()) {
    const menu = this.createMenu(title);
    items.forEach(item => menu.addItem(item.caption, item.functionName).addToUi());
    return this;
  }

  /**
   * メニューに追加するアイテムを取得するメソッド
   * @return {Array.<Object.<string>>} メニューに追加するアイテム
   */
  getItems() {
    const items = MENU_INFO.FUNCTIONS.map(func => {
      const item = {
        caption: func.CAPTION,
        functionName: func.NAME
      }
      return item;
    });
    return items;
  }

}

// NOTE: 以下のような Enum を設定しておくとよい
/** @enum {string} */
const MENU_INFO = {
  TITLE: '【GAS MENU】',
  FUNCTIONS: [
    {
      NAME: 'myFunction',
      CAPTION: 'hogehoge'
    }
  ],
};