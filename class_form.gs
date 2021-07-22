/**
 * フォームに関するクラス
 */
class Form {

  /**
   * @param {Object} e - フォーム送信時のイベント オブジェクト
   */
  constructor(e) {
    this.ts = e.values[0];
    this.namedValues = e.namedValues;  // ここ確認
    this.values = e.values;
    this.range = e.range;
  }

}

