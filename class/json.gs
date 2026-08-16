'use strict'

class Json {  // TODO: プロパティを探し当てるやつを作る

  /**
   * @constructor
   */
  constructor(json) {
    /** @type {string} */
    this.json = json;
  }

  getValueFromProperty(property) {
    const object = this.getAsObject();
    return object[property];
  }

  /**
   * ドット区切りのパスをたどって値を取得するメソッド
   * @param {string} path - ドット区切りのパス 例: 'hoge.fuga.piyo'
   * @return {*} パスに対応する値。見つからない場合は null
   */
  getValueFromPath(path) {
    const value = this.getValueFromObject_(path, this.getAsObject());
    return value;
  }

  /**
   * オブジェクトからドット区切りのパスをたどって値を取得するプライベート メソッド
   * @param {string} path - ドット区切りのパス
   * @param {Object} object - 探索対象のオブジェクト
   * @return {*} パスに対応する値。見つからない場合は null
   * NOTE: デフォルト引数は明示的な undefined でも発動するため、再帰用に引数を必須としたメソッドに分離している
   */
  getValueFromObject_(path, object) {
    if (object === null || object === undefined) return null;
    const paths = path.split('.');
    const key = paths[0];
    if (paths.length === 1) return object[key] === undefined ? null : object[key];
    return this.getValueFromObject_(paths.slice(1).join('.'), object[key]);
  }

  getAsObject() {
    const object = JSON.parse(this.json);
    return object;
  }

  // getAsJson(id) {
  //   const blob = DriveApp.getFileById(id).getBlob();
  //   const json = blob.getDataAsString();
  // }


}