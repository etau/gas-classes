/**
 * プロパティ ストアに関するクラス
 */
class Properties {

  constructor() {
    this.scriptProperties = PropertiesService.getScriptProperties();
    this.hoge = this.scriptProperties.getProperty('HOGE');
  }

  /** 
   * プロパティストアの内容をすべてログする
   */
  log() {
    const properties = this.scriptProperties.getProperties();
    console.log(properties);
  }

  /**
   * スクリプト プロパティにキーと値をセットする静的メソッド
   * @param {string} key - キーとなる文字列 (アッパースネーク)
   * @param {string} value - 値
   */
  static set(key, value) {
    PropertiesService.getScriptProperties().setProperty(String(key), String(value));
  }

  // /**
  //  * プロパティストアからキーに対する値を取り出す
  //  * @params {String} key - キー
  //  */
  // get(key) {
  //   return this.scriptProperties.getProperty(key);
  // }

  /**
   * プロパティストアからすべてのペアを削除する
   */
  deleteAll() {
    this.scriptProperties.deleteAllProperties();
  }

}

const PROPERTIES = Object.freeze(new Properties());