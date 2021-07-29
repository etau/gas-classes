/**
 * フォームに関するクラス
 */
class Form {

  /**
   * フォームに関するコンストラクタ
   * @constructor
   * @param {Object} e - フォーム送信時のイベント オブジェクト
   */
  constructor(e) {
    this.ts = e.values[0];
    this.namedValues = e.namedValues;
    this.values = e.values;
    this.range = e.range;
  }

  // constructor(e) {
  //   [this.ts, ...this.values] = e.values;
  // }

}

