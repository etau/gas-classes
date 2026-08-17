'use strict';

/**
 * JSON 形式の文字列を扱うクラス
 */
class Json {

  /**
   * JSON に関するコンストラクタ
   * @constructor
   * @param {string} json - JSON 形式の文字列
   */
  constructor(json) {
    /** @type {string} */
    this.json = json;
  }

  /**
   * JSON 文字列をオブジェクト化するメソッド
   * @return {Object} オブジェクト化された JSON
   */
  getAsObject() {
    const object = JSON.parse(this.json);
    return object;
  }

  /**
   * ドット区切りのパスをたどって値を取得するメソッド
   * @param {string} path - ドット区切りのパス 例: 'hoge.fuga.piyo'
   * @return {*} パスに対応する値。見つからない場合は null
   */
  getValueByPath(path) {
    const value = Json.getValueByPath(this.getAsObject(), path);
    return value;
  }

  /**
   * ネストされたオブジェクトの中から、キーに対応する値を探し当てるメソッド
   * @param {string} key - 探すキー
   * @return {*} 最初に見つかった値。見つからない場合は null
   */
  findValueByKey(key) {
    const value = Json.findValueByKey(this.getAsObject(), key);
    return value;
  }

  /**
   * オブジェクトからドット区切りのパスをたどって値を取得する静的メソッド
   * @param {Object} object - 探索対象のオブジェクト
   * @param {string} path - ドット区切りのパス 例: 'hoge.fuga.piyo'
   * @return {*} パスに対応する値。見つからない場合は null
   */
  static getValueByPath(object, path) {
    if (object === null || object === undefined) return null;
    const paths = path.split('.');
    const key = paths[0];
    if (paths.length === 1) return object[key] === undefined ? null : object[key];
    return Json.getValueByPath(object[key], paths.slice(1).join('.'));
  }

  /**
   * ネストされたオブジェクトの中から、キーに対応する値を探し当てる静的メソッド
   * @param {Object|Array} object - 探索対象のオブジェクト
   * @param {string} key - 探すキー
   * @return {*} 最初に見つかった値。見つからない場合は null
   * NOTE: 深さ優先で探索し、最初に見つかった値を返す
   */
  static findValueByKey(object, key) {
    if (object === null || typeof object !== 'object') return null;
    const isArray = object instanceof Array;
    if (!isArray && object[key] !== undefined) return object[key];
    const children = isArray ? object : Object.values(object);
    const found = children
      .map(child => Json.findValueByKey(child, key))
      .find(value => value !== null);
    return found === undefined ? null : found;
  }

}
