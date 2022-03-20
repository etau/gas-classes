'use strict'

class FormEvent {

  /**
   * フォーム イベントに関するコンストラクタ
   * @constructor
   * @param {Object} e - フォーム送信時のイベント オブジェクト
   */
  constructor(e) {
    this.namedValues = e.namedValues;
  }

  getAsDict() {
    const keys = Object.keys(this.namedValues);
    const dict = keys.reduce((pre, cur) =>
      // pre.set(cur, this.namedValues[cur][0])
      this.namedValues[cur].length === 1 ?
        pre.set(cur, this.namedValues[cur][0]) :
        pre.set(cur, this.namedValues[cur])
      , new Map());
    return dict;
  }

}

