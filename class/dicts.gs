'use strict'

class Dicts {

  constructor(dicts) {
    /** Array.<Map> */
    this.dicts = dicts;
  }

  /**
   * Map 型を要素として持つ配列を、2 次元配列化するメソッド
   * @param {boolean} isAddHeaders - ヘッダー情報を配列に含むかどうか
   * @return {Array.<Array>} ヘッダー情報に対応する列の値
   */
  getAsValues(isAddHeaders = false) {
    const headers = this.dicts[0].keys();
    console.log(headers);
    const records = this.dicts.map(dict => headers.
      map(key => dict.get(key))
    );
    const values = isAddHeaders ? [headers, ...records] : records;
    return values;
  }

}
