/**
 * お金に関するオブジェクトを生成するクラス
 */
class Money {

  /**
   * 金額をフォーマットする静的メソッド
   * @return {string} フォーマットされた金額
   */
  static format(amount = this.amount) {
    const formatter = new Intl.NumberFormat(
      'ja-JP',
      {
        style: 'currency',
        currency: 'JPY'
      }
    );
    const formatedAmount = formatter.format(amount);
    return formatedAmount;
  }

}