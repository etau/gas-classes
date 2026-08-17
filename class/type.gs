'use strict';

class Type {

  /**
   * 型判定をする対象と型が一致している場合にはその値を返し、一致していない場合にはエラーを投げる静的メソッド
   * @param {*} value - 型を判定する対象
   * @param {string} type - 型
   * @return {*|Object} 型が一致している場合にはその値、一致していない場合にはエラーを投げる
   */
  static valid(value, type) {
    switch (type) {
      case TYPE.INTEGER: return Number.isInteger(value) ? value : this.throwAlert_(type);
      case TYPE.DATE: return value instanceof Date ? value : this.throwAlert_(type);
      case TYPE.ARRAY: return value instanceof Array ? value : this.throwAlert_(type);
      case TYPE.OBJECT: return (value instanceof Object && !(value instanceof Array)) && !(value instanceof Map) && !(value instanceof Set) ? value : this.throwAlert_(type);
      case TYPE.REGEXP: return value instanceof RegExp ? value : this.throwAlert_(type);
      case TYPE.MAP: return value instanceof Map ? value : this.throwAlert_(type);
      case TYPE.SET: return value instanceof Set ? value : this.throwAlert_(type);
      case TYPE.JSON: return (typeof value === 'string' && JSON.parse(value) instanceof Object) ? value : this.throwAlert_(type);
      case TYPE.FOLDER: return value.getUrl().includes('/drive/folders/') ? value : this.throwAlert_(type);
    }
    if (TYPE.TO_STRINGS.includes(type)) return value.toString() === type ? value : this.throwAlert_(type);
    try {
      if (typeof value === type || value.getMimeType() === type) return value;
    } catch (e) {
      console.error('Type.valid: ' + e.stack);
      this.throwAlert_(type);
    }
  }

  /**
   * 型エラーを投げる静的メソッド
   * @throws 型のエラー
   * NOTE: 静的メソッド valid から this 経由で呼ぶため static である必要がある
   */
  static throwAlert_(type) {
    throw new TypeError('This type is not a "' + type + '".');
  }

}
