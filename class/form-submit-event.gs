'use strict';

/**
 * フォーム送信イベントに関するクラス
 */
class FormSubmitEvent {

  /**
   * フォーム送信イベントに関するコンストラクタ
   * @constructor
   * @param {Object} e - フォーム送信イベント オブジェクト
   */
  constructor(e) {
    /** @type {Object} */
    this.e = e;
    /** @type {Object} */
    this.namedValues = e.namedValues;
  }

  /**
   * フォーム送信イベントの namedValues オブジェクトを Map オブジェクトで取得するメソッド
   * @return {Map} 質問をキーとして回答を値として持つ Map オブジェクト
   * NOTE: チェック ボックス形式かつ複数回答の場合は、値を文字列化する
   */
  getNamedValuesAsDict() {
    const keys = Object.keys(this.namedValues);
    const dict = keys.reduce((pre, cur) =>
      this.namedValues[cur].length === 1 ?
        pre.set(cur, this.namedValues[cur][0]) :
        pre.set(cur, JSON.stringify(this.namedValues[cur])),
      new Map());
    return dict;
  }

  /**
   * 質問に対する回答を取得するメソッド
   * @param {string} title - 質問
   * @return {string|undefined} 回答。質問が存在しない場合は undefined
   */
  getValueByTitle(title) {
    const dict = this.getNamedValuesAsDict();
    return dict.get(title);
  }

}
