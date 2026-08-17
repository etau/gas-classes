'use strict';

/**
 * Slack の Incoming Webhook に関するクラス
 * NOTE: SlackApi クラスを継承しているため、このファイルは slack.gs より後に評価される必要がある
 */
class SlackWebhookApi extends SlackApi {

  /**
   * Slack のメッセージ送信に関するコンストラクタ
   * @constructor
   * @param {string} webhookUrl - Webhook URL
   */
  constructor(webhookUrl = PROPERTIES.get(PROPERTY_KEYS.WEBHOOK_URL)) {
    super();
    /** @type {string} */
    this.webhookUrl = webhookUrl;
  }

  /**
   * Webhook URL に slack のメッセージを送信するメソッド
   * @param {string} message - slack に投稿するメッセージ
   * @param {boolean} isChannelMention - チャンネル メンションをつけるかどうか
   * @return {SlackWebhookApi} SlackWebhookApi オブジェクト
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
    return this;
  }

  /**
   * slack ID からメンションを作成する静的メソッド
   * @param {string} slackId - メンションする対象の slack ID
   * @return {string} メンション
   */
  static getUserMention(slackId) {
    const mention = '<@' + slackId + '>';
    return mention;
  }

  /**
   * Webhook URL をスクリプト プロパティにセットする静的メソッド
   * @param {string} webhookUrl - Webhook URL
   */
  static setWebhookUrl(webhookUrl) {
    PROPERTIES.set(PROPERTY_KEYS.WEBHOOK_URL, webhookUrl);
  }

}
