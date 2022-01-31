'use strict'

class Properties {

  /**
   * スクリプト プロパティに関するコンストラクタ
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
  deleteAll() { return this.scriptProperties.deleteAllProperties(); }

  /**
   * スクリプト プロパティの内容をすべてログ出力するメソッド
   */
  log() {
    const properties = this.scriptProperties.getProperties();
    console.log(properties);
  }

  /**
   * スクリプト プロパティから値を取得するメソッド
   * @param {string} key - キーとなる文字列
   * @return {string|Array|Object} 値
   * NOTE: JSON 形式のものは、オブジェクトにして返す
   */
  get(key) {
    const strValue = this.scriptProperties.getProperty(key);
    const value = typeof JSON.parse(strValue) instanceof Object ? JSON.parse(strValue) : strValue;
    return value;
  }

  /**
   * スクリプト プロパティにキーと値をセットする静的メソッド
   * @param {string} key - キーとなる文字列
   * @param {string|Array|Object} value - 値
   * NOTE: オブジェクトは JSON 形式にしてセットする
   */
  static set(key, value) {
    PropertiesService.getScriptProperties().
      setProperty(key, typeof value === 'object' ? JSON.stringify(value) : value);
  }

}