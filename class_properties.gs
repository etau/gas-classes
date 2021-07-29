/**
 * プロパティ ストアに関するクラス
 */
class Properties {

  /**
   * プロパティ ストアに関するコンストラクタ
   * @constructor
   */
  constructor() {
    this.scriptProperties = PropertiesService.getScriptProperties();
  }

  /** 
   * プロパティストアの内容をすべてログする
   */
  log() {
    const properties = this.scriptProperties.getProperties();
    console.log(properties);
  }

  /**
   * プロパティストアからキーに対する値を取り出すメソッド
   * @params {String} key - キー
   */
  get(key) {
    return this.scriptProperties.getProperty(key);
  }

  /**
   * プロパティストアからすべてのペアを削除するメソッド
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
    PropertiesService.getScriptProperties().setProperty(String(key), String(value));
  }

}

const PROPERTIES = Object.freeze(new Properties());