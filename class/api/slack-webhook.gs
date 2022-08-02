'use strict'

/** TODO: SlackApi クラスに変更して、SlackWebhookApi は継承する形に変更
 * slack メッセージ送信に関するクラス
 */
class SlackWebhook {

  /**
   * slack のメッセージ送信に関するコンストラクタ
   * @constructor
   * @param {string} webhookUrl - Webhook URL
   */
  constructor(webhookUrl) {
    /** @type {string} */
    this.webhookUrl = webhookUrl;
  }

  /**
   * slack ID からメンションを作成する関数
   * @param {string} slackId - メンションする対象の slack ID
   * @return {string} メンション
   */
  getUserMention(slackId) {
    const mention = '<@' + slackId + '>';
    return mention;
  }

  /**
   * slack にメッセージを送信する
   * @param {string} message - slack に投稿するメッセージ
   * @param {boolean} isChannelMention - チャンネルメンションをつけるかどうか
   */
  send(message, isChannelMention = false) {
    const options = {
      method: 'POST',
      contentType: 'application/json',
      payload: JSON.stringify({
        text: isChannelMention ? '<!channel>\n' + message : message
      })
    };
    UrlFetchApp.fetch(this.webhookUrl, options);
  }

  /**
   * Webhook URL をセットする静的メソッド
   * NOTE: class properties がある場合は不要
   */
  static setWebhookUrl(webhookUrl) {
    PropertiesService.getScriptProperties().setProperty('WEBHOOK_URL', webhookUrl);
  }

}