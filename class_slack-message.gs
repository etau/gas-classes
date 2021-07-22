/**
 * Slack メッセージ送信に関するクラス
 */
class SlackMessage {

  constructor(webhookUrl) {
    this.webhookUrl = webhookUrl;
  }

  /**
   * Slack にメッセージを送信する
   * @param {string} slack に投稿するメッセージ
   */
  send(message) {
    const options = {
      'method': 'POST',
      'payload': JSON.stringify({
        'text': message
      })
    };
    UrlFetchApp.fetch(this.webhookUrl, options);
  }

  /**
   * Webhook URL をセットする静的メソッド
   */
  static setWebhookUrl(webhookUrl) {
    PropertiesService.getScriptProperties().setProperty('WEBHOOK_URL', webhookUrl);
  }

}