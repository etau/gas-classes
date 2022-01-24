'use strict'

class Properties {

  /**
   * プロパティーズ サービスに関するコンストラクタ
   * @constructor
   */
  constructor() {
    /** @type {PropertiesService.Properties} */
    this.scriptProperties = PropertiesService.getScriptProperties();
  }

  /**
   * Class Properties から委譲されたメソッド
   * NOTE: https://developers.google.com/apps-script/reference/properties/properties
   */
  get(...args) { return this.scriptProperties.getProperty(...args); }
  deleteAll() { return this.scriptProperties.deleteAllProperties(); }

  /**
   * スクリプト プロパティの内容をすべてログ出力するメソッド
   */
  log() {
    const properties = this.scriptProperties.getProperties();
    console.log(properties);
  }

  /**
   * スクリプト プロパティにキーと値をセットする静的メソッド
   * @param {string} key - キーとなる文字列
   * @param {string} value - 値
   */
  static set(key, value) {
    PropertiesService.getScriptProperties().setProperty(key, value);
  }

}