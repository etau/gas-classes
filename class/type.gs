'use strict';

/**
 * 型判定をおこなうクラス
 */
class Type {

  /**
   * 型判定をする対象と型が一致している場合にはその値を返し、一致していない場合にはエラーを投げる静的メソッド
   * @param {*} value - 型を判定する対象
   * @param {string} type - 型 例: TYPE.STRING
   * @return {*} 型が一致している場合はその値
   * @throws 型が一致していない場合のエラー
   */
  static valid(value, type) {
    switch (type) {
      case TYPE.INTEGER: return Number.isInteger(value) ? value : this.throwTypeError_(type);
      case TYPE.DATE: return value instanceof Date ? value : this.throwTypeError_(type);
      case TYPE.ARRAY: return value instanceof Array ? value : this.throwTypeError_(type);
      case TYPE.OBJECT: return (value instanceof Object && !(value instanceof Array)) && !(value instanceof Map) && !(value instanceof Set) ? value : this.throwTypeError_(type);
      case TYPE.REGEXP: return value instanceof RegExp ? value : this.throwTypeError_(type);
      case TYPE.MAP: return value instanceof Map ? value : this.throwTypeError_(type);
      case TYPE.SET: return value instanceof Set ? value : this.throwTypeError_(type);
      case TYPE.JSON: return (typeof value === 'string' && JSON.parse(value) instanceof Object) ? value : this.throwTypeError_(type);
      case TYPE.FOLDER: return value.getUrl().includes('/drive/folders/') ? value : this.throwTypeError_(type);
    }
    if (TYPE.TO_STRINGS.includes(type)) return value.toString() === type ? value : this.throwTypeError_(type);
    if (typeof value === type) return value;
    try {
      if (this.hasMimeType_(value) && value.getMimeType() === type) return value;
    } catch (e) {
      console.error('Type.valid: ' + e.stack);
    }
    return this.throwTypeError_(type);  // NOTE: いずれの分岐にも合致しなかった場合は型エラーとする
  }

  /**
   * getMimeType メソッドを持つオブジェクトかどうかを判定するプライベートな静的メソッド
   * @param {*} value - 判定する対象
   * @return {boolean} getMimeType メソッドを持つかどうか
   * NOTE: プリミティブ値の型不一致で不要なエラー ログが出るのを防ぐために判定する
   */
  static hasMimeType_(value) {
    return value !== null && value !== undefined && typeof value.getMimeType === 'function';
  }

  /**
   * 型エラーを投げる静的メソッド
   * @param {string} type - 型
   * @throws 型のエラー
   * NOTE: 静的メソッド valid から this 経由で呼ぶため static である必要がある
   */
  static throwTypeError_(type) {
    throw new TypeError('This type is not a "' + type + '".');
  }

}
