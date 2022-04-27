'use strict'

class SlackApi {

  /**
   * slack API に関するコンストラクタ
   * @constructor
   */
  constructor() {
    /** @type {string} */
    this.token = PROPERTIES.get('USER_OAUTH_TOKEN');
    /** @type {string} */
    this.botToken = PROPERTIES.get('BOT_USER_OAUTH_TOKEN');
  }

  /**
   * slackワークスペースの中からアクティブなチャンネル（archiveされていないチャンネル）の
   * チャンネル名とIDを持つ配列をつくるメソッド
   * @return {Array} アクティブなチャンネル（archiveされていないチャンネル）のチャンネル名とIDを持つ配列
   */
  getActiveChannelsValues(teamId) {
    const channelValues = this.getChannelsValues(teamId);
    const activeChannelsValues = channelValues.filter(record => record[2] === false);
    return activeChannelsValues;
  }

  /**
   * slack チャンネルの必要な情報を持つ配列をつくるメソッド
   * @return {Array.<Array.<string|boolean>} slack チャンネルの必要な情報を持つ配列
   */
  getChannelsValues(teamId) {
    const channels = this.getChannels(teamId);
    const channelValues = channels.map(channelInfo => {
      const { name, id, is_archived } = channelInfo;
      return [name, id, is_archived];
    });
    channelValues.sort((a, b) => a[0].localeCompare(b[0], 'ja'));
    return channelValues;
  }

  /**
   * slack チャンネルの情報をオブジェクトとして持つ配列を生成するメソッド
   * @return {Array.<Object>} slack チャンネルの情報
   */
  getChannels(teamId) {
    const conversations = this.getConversations(teamId);
    const channels = conversations.channels;
    return channels;
  }

  /**
   * slack チャンネルの詳細な情報を持つオブジェクトを取得するメソッド
   * @return {Object} slack チャンネルの情報
   */
  getConversations(teamId) {
    const params = this.getParams('GET', this.botToken);
    const url = this.buildConversationsListUrl(teamId);
    const conversations = this.getAsObject(url, params);
    return conversations;
  }

  /**
   * fetch メソッドで利用する conversations.list の URL を生成するメソッド
   * @return {string} fetch メソッド用の URL
   * NOTE: Bot tokens「channels:read, groups:read, im:read, mpim:read」
   * User tokens「channels:read, groups:read, im:read, mpim:read」
   */
  buildConversationsListUrl(teamId) {
    const limit = 1000;
    const url = 'https://slack.com/api/conversations.list?' +
      'limit=' + limit + '&' +
      'team_id=' + teamId;
    return url;
  }

  /**
   * 対象メッセージを削除するメソッド 
   * @param {string} channel - チャンネルID
   * @param {string} ts - 削除するメッセージの ts
   */
  chatDelete(channel, ts) {
    const params = this.getParams();
    const url = this.buildChatDeleteURL(channel, ts);
    UrlFetchApp.fetch(url, params);
  }

  /**
   * fetch メソッドで利用する chat.delete の URL を生成するメソッド
   * @param {string} channel - チャンネル ID
   * @param {stirng} ts - 削除するメッセージの ts
   * @return {string} fetch メソッド用の URL
   */
  buildChatDeleteURL(channel, ts) {
    const url = 'https://slack.com/api/chat.delete?' +
      'channel=' + channel + '&' +
      'ts=' + ts;
    return url;
  }

  /**
   * チャンネルからメッセージを取得するメソッド
   * @param {string} channel - チャンネル ID
   * @param {string} latest - 取得するメッセージの対象となる最終時間範囲
   * @return {Array.<Object>} メッセージ オブジェクトの配列
   */
  conversationsHistory(channel, latest) {
    const url = this.buildConversationsHistoryUrl(channel, latest);
    const params = this.getParams('GET');
    const messages = this.getAsObject(url, params);
    return messages;
  }

  /**
   * fetch メソッドで利用する conversations.history の URL を生成するメソッド
   * @param {string} channel - チャンネル ID
   * @param {string} latest - 取得するメッセージの対象となる最終時間範囲の ts
   * @return {string} fetch メソッド用の URL
   */
  buildConversationsHistoryUrl(channel, latest) {
    const limit = 300;
    const url = 'https://slack.com/api/conversations.history?' +
      'channel=' + channel + '&' +
      'limit=' + limit + '&' +
      'latest=' + latest;
    return url;
  }

  /**
   * メッセージへのリプライを取得する
   * @param {string} channel - チャンネル ID
   * @param {string} ts - メッセージの ts
   * @param {string} latest - 取得するメッセージの対象となる最終時間範囲の ts
   * @return {Array.<Object>} リプライ オブジェクトの配列
   */
  conversationsReply(channel, ts, latest) {
    const url = this.buildConversationsRepliesUrl(channel, ts, latest);
    const params = this.getParams();
    const replies = this.getAsObject(url, params);
    return replies;
  }

  /**
   * fetch メソッドで利用する conversations.replies の URL を生成するメソッド
   * @param {string} channel - チャンネル ID
   * @param {string} ts - メッセージの ts
   * @param {string} latest - 取得するメッセージの対象となる最終時間範囲の ts
   * @return {string} fetch メソッド用の URL
   */
  buildConversationsRepliesUrl(channel, ts, latest) {
    const limit = 300;
    const url = 'https://slack.com/api/conversations.replies?' +
      'channel=' + channel + '&' +
      'ts=' + ts + '&' +
      'limit=' + limit + '&' +
      'latest=' + latest;
    return url;
  }

  /**
   * slack 名、slack 表示名、slack IDの情報を持つ二次元配列を取得するメソッド
   * @return {Array.<Array.<string>} slack 名、slack 表示名、slack IDの情報を持つ二次元配列
   */
  getMembersValues(teamId) {
    const members = this.getUsersList(teamId).members;
    const membersValues = members.map(member => {
      const profile = member.profile;
      return [profile.real_name, profile.display_name, member.id];
    });
    membersValues.sort((a, b) => a[0].localeCompare(b[0], 'ja'));
    return membersValues;
  }

  /**
   * slack ユーザーの詳細な情報を持つオブジェクトを取得するメソッド
   * @return {Object} slack ユーザーの情報
   */
  getUsersList(teamId) {
    const params = this.getParams('GET', this.botToken);
    const url = this.buildUsersListUrl(teamId);
    const usersList = this.getAsObject(url, params);
    console.log('usersList', usersList)
    return usersList;
  }

  /**
   * slack のから ユーザーの詳細な情報を持つオブジェクトを取得するメソッド
   * @return {Array.<Objyect>} slack ユーザーの情報
   */
  getMembers(nextCorsor = '') {
    const payload =
    {
      token: this.botToken,
      limit: 1000,
      cursor: nextCorsor
    }
    const params = this.getParamAddPayload('GET', this.botToken, payload);
    const url = 'https://slack.com/api/users.list';
    const response = this.getAsObject(url, params);
    this.members_ = this.members_ === undefined ? response.members : this.members_.concat(response.members);
    this.nextCorsor = response.response_metadata.next_cursor;
    if (this.nextCorsor !== '') return this.getMembers(this.nextCorsor);
    return this.members_;
  }

  /**
   * fetch メソッドで利用する users.list の URL を生成するメソッド
   * @return {string} fetch メソッド用の URL
   */
  buildUsersListUrl(teamId) {
    const limit = 1000;
    const url = 'https://slack.com/api/users.list?' +
      'limit=' + limit + '&' +
      'team_id=' + teamId;
    return url;
  }

  /**
   * channelId を受け取ってslack 名	とslack 表示名を二次元配列で返す関数
   * @param {string} channelId - 特定のチャンネルのID
   * @param {array} slackNameValues - slack 名	とslack 表示名の二次元配列
   */
  getSlackNameValuesById(channelId) {
    const memberIds = this.getConversationsMemberIds(channelId);
    const membersValues = this.getMembersValues();
    const slackNameValues = memberIds.map(memberId => membersValues.
      find(record => record[2] === memberId)).
      map(record => [record[0], record[1], record[2]]);
    return slackNameValues;
  }

  /**
   * slack チャンネルの必要な情報を持つ配列をつくるメソッド
   * @return {Array.<Array.<string|boolean>} slack チャンネルの必要な情報を持つ配列
   */
  getConversationsMemberIds(channel) {
    const memberIds = this.getConversationsMembersList(channel).members;
    return memberIds;
  }

  /**
   * slack ユーザーの詳細な情報を持つオブジェクトを取得するメソッド
   * @return {Object} slack ユーザーの情報
   */
  getConversationsMembersList(channel) {
    const params = this.getParams('GET', this.botToken);
    const url = this.buildConversationsMembersUrl(channel);
    const usersList = this.getAsObject(url, params);
    return usersList;
  }

  /**
   * fetch メソッドで利用する conversations.members の URL を生成するメソッド
   * @return {string} fetch メソッド用の URL
   */
  buildConversationsMembersUrl(channel) {
    const limit = 1000;
    const url = 'https://slack.com/api/conversations.members?' +
      'limit=' + limit + '&' +
      'channel=' + channel;
    return url;
  }

  /**
   * fetch メソッド用のパラメーターを生成するメソッド
   * @param {string} method - GET or POST メソッド。デフォルト引数は「POST」
   * @param {string} token - 利用するトークン。デフォルト引数は this.token
   * @return {Object} fetch メソッド用のパラメーター
   */
  getParams(method = 'POST', token = this.token, payload = {}) {
    const params = {
      method: method,
      headers: {
        Authorization: 'Bearer ' + token
      },
      payload: JSON.stringify(payload)
    };
    return params;
  }

  /**
   * UrlFetchApp を利用して取得した値をオブジェクト化して返す関数
   * @param {string} url - fetch メソッド用の URL
   * @param {Object} params - fetch メソッド用のパラメーター
   */
  getAsObject(url, params) {
    const response = UrlFetchApp.fetch(url, params);
    const json = response.getContentText();
    const object = JSON.parse(json);
    return object;
  }

}