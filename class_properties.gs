'use strict'

class Properties {

  /**
   * プロパティズ サービスに関するコンストラクタ
   * @constructor
   */
  constructor() {
    /** @type {PropertiesService.Properties} */
    this.scriptProperties = PropertiesService.getScriptProperties();
  }

  /**
   * スクリプト プロパティの内容をすべてログ出力するメソッド
   */
  log() {
    const properties = this.scriptProperties.getProperties();
    console.log(properties);
  }

  /**
   * プロパティ ストアからキーに対する値を取り出すメソッド
   * @params {String} key - キー
   */
  get(key) {
    const value = this.scriptProperties.getProperty(key)
    return value;
  }

  /**
   * プロパティ ストアからすべてのペアを削除するメソッド
   */
  deleteAll() {
    this.scriptProperties.deleteAllProperties();
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