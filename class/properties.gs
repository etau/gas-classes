'use strict';

/**
 * スクリプト プロパティに関するクラス
 */
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
  getKeys() { return this.scriptProperties.getKeys(); }
  deleteAll() { return this.scriptProperties.deleteAllProperties(); }

  /**
   * スクリプト プロパティから値を取得するメソッド
   * @param {string} key - キーとなる文字列
   * @return {string|Array|Object|null} 値。キーが存在しない場合は null
   * NOTE: JSON 形式のものは、オブジェクトにして返す
   */
  get(key) {
    const strValue = this.scriptProperties.getProperty(key);
    const value = this.parse(strValue);
    return value;
  }

  /**
   * スクリプト プロパティにキーと値をセットするメソッド
   * @param {string} key - キーとなる文字列
   * @param {string|Array|Object} value - 値
   * @return {Properties} Properties オブジェクト
   * NOTE: オブジェクトは JSON 形式にしてセットする
   */
  set(key, value) {
    this.scriptProperties.setProperty(
      key,
      typeof value === 'object' ? JSON.stringify(value) : value,
    );
    return this;
  }

  /**
   * スクリプト プロパティからキーと値を削除するメソッド
   * @param {string} key - キーとなる文字列
   * @return {Properties} Properties オブジェクト
   */
  delete(key) {
    this.scriptProperties.deleteProperty(key);
    return this;
  }

  /**
   * JSON 形式のものは、オブジェクトにして返すメソッド
   * @param {string} value - パースする値
   * @return {string|Array|Object|null} パースされた値
   */
  parse(value) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;  // NOTE: JSON 形式でないプロパティは想定内のため、文字列としてそのまま返す
    }
  }

  /**
   * スクリプト プロパティの内容をすべてログ出力するメソッド
   * @return {Properties} Properties オブジェクト
   */
  log() {
    const properties = this.scriptProperties.getProperties();
    console.log(properties);
    return this;
  }

}
