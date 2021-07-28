/**
 * Slack メッセージ送信に関するクラス
 */
class SlackMessage {

  /**
   * Slack のメッセージ送信に関するコンストラクタ
   * @constructor
   */
  constructor(webhookUrl) {
    this.webhookUrl = webhookUrl;
  }

  /**
   * slack ID からメンションを作成する関数
   * @param {string} slackId - メンションする対象の slack ID
   * @return {string} メンション
   */
  getMention(slackId) {
    const mention = '<@' + slackId + '>';
    return mention;
  }

  /**
   * Slack にメッセージを送信する
   * @param {string} message - slack に投稿するメッセージ
   * @param {boolean} isChannelMention - チャンネルメンションをつけるかどうか
   */
  send(message, isChannelMention = false) {
    const options = {
      'method': 'POST',
      'payload': JSON.stringify({
        'text': isChannelMention ? '<!channel>\n' + message : message
      })
    };
    UrlFetchApp.fetch(this.webhookUrl, options);
  }

  /** MEMO: class_properties がある場合は不要
   * Webhook URL をセットする静的メソッド
   */
  static setWebhookUrl(webhookUrl) {
    PropertiesService.getScriptProperties().setProperty('WEBHOOK_URL', webhookUrl);
  }

}