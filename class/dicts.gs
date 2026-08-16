'use strict';

class Dicts {

  /**
   * Map 型を要素として持つ配列に関するコンストラクタ
   * @constructor
   * @param {Array.<Map>} dicts - Map 型を要素として持つ配列
   */
  constructor(dicts) {
    /** @type {Array.<Map>} */
    this.dicts = dicts;
  }

  /**
   * Map 型を要素として持つ配列を、2 次元配列化するメソッド
   * @param {boolean} isAddHeaders - ヘッダー情報を配列に含むかどうか
   * @return {Array.<Array>} ヘッダー情報に対応する列の値
   */
  getAsValues(isAddHeaders = false) {
    const headers = [...this.dicts[0].keys()];
    const records = this.dicts.map(dict =>
      headers.map(key => dict.get(key)),
    );
    const values = isAddHeaders ? [headers, ...records] : records;
    return values;
  }

  /**
   * 対象のキーの値に合致した dicts を取得するメソッド
   * @param {string} key - フィルター対象のキー
   * @param {string|number|boolean|Date} value - フィルター対象の値
   * @param {boolean} isSameValue - 値が同一のものをフィルタするかどうか。false の場合は同一でないものをフィルタする
   * @return {Dicts} フィルターされた Dicts オブジェクト
   */
  filter(key, value, isSameValue = true) {
    const filteredDicts = isSameValue ?
      this.dicts.filter(dict => dict.get(key) === value) :
      this.dicts.filter(dict => dict.get(key) !== value);
    return new Dicts(filteredDicts);
  }

  /**
   * 対象のキーの値に一番最初に合致した dict を取得するメソッド
   * @param {string} key - 抽出対象のキー
   * @param {string|number|boolean|Date} value - 抽出対象の値
   * @return {Map|undefined} dict。合致するものがない場合は undefined
   */
  find(key, value) {
    const dict = this.dicts.find(dict => dict.get(key) === value);
    return dict;
  }

  /**
   * 対象のキーの値で並び替えるメソッド
   * @param {string} key - 並び替え対象のキー
   * @param {boolean} ascending - 昇順か降順か
   * @return {Dicts} 並び替えられた Dicts オブジェクト
   */
  sort(key, ascending = true) {
    const sortedDicts = [...this.dicts].sort((a, b) => {
      const valueA = a.get(key);
      const valueB = b.get(key);
      if (valueA === valueB) return 0;
      const isLess = valueA < valueB;
      return (ascending === isLess) ? -1 : 1;
    });
    return new Dicts(sortedDicts);
  }

}
