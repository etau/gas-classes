'use strict';

/**
 * Slack API に関するクラス
 * NOTE: https://api.slack.com/methods
 */
class SlackApi {

  /**
   * Slack API に関するコンストラクタ
   * @constructor
   */
  constructor() {
    /** @type {string} */
    this.token = PROPERTIES.get(PROPERTY_KEYS.USER_OAUTH_TOKEN);
    /** @type {string} */
    this.botToken = PROPERTIES.get(PROPERTY_KEYS.BOT_USER_OAUTH_TOKEN);
  }

  /**
   * すべてのチャンネルの情報をオブジェクトの配列で取得するメソッド
   * @param {string} teamId - チーム ID
   * @return {Array.<Object>} slack チャンネルの情報
   * NOTE: https://api.slack.com/methods/conversations.list
   * Bot tokens scopes: channels:read, groups:read, im:read, mpim:read
   */
  getChannels(teamId) {
    const channels = this.fetchAllItems_('conversations.list', 'channels', { team_id: teamId });
    return channels;
  }

  /**
   * アーカイブされていないチャンネルの情報をオブジェクトの配列で取得するメソッド
   * @param {string} teamId - チーム ID
   * @return {Array.<Object>} アーカイブされていない slack チャンネルの情報
   */
  getActiveChannels(teamId) {
    const activeChannels = this.getChannels(teamId).filter(channel => channel.is_archived === false);
    return activeChannels;
  }

  /**
   * すべてのチャンネルの必要な情報を持つ 2 次元配列をつくるメソッド
   * @param {string} teamId - チーム ID
   * @param {Array.<string>} properties - 取り出すプロパティのドット区切りパス
   * @return {Array.<Array.<string|boolean>>} チャンネルの必要な情報を持つ 2 次元配列
   */
  getChannelsValues(teamId, properties = ['name', 'id', 'is_archived']) {
    const channelsValues = this.getValues_(this.getChannels(teamId), properties);
    return channelsValues;
  }

  /**
   * アーカイブされていないチャンネルの必要な情報を持つ 2 次元配列をつくるメソッド
   * @param {string} teamId - チーム ID
   * @param {Array.<string>} properties - 取り出すプロパティのドット区切りパス
   * @return {Array.<Array.<string|boolean>>} アーカイブされていないチャンネルの必要な情報を持つ 2 次元配列
   */
  getActiveChannelsValues(teamId, properties = ['name', 'id', 'is_archived']) {
    const activeChannelsValues = this.getValues_(this.getActiveChannels(teamId), properties);
    return activeChannelsValues;
  }

  /**
   * チャンネルをアーカイブするメソッド
   * @param {string} channelId - チャンネル ID
   * @return {Object} API のレスポンス
   * NOTE: https://api.slack.com/methods/conversations.archive
   * Bot tokens scopes: channels:manage, groups:write, im:write, mpim:write
   */
  archiveChannel(channelId) {
    const url = this.buildUrl_('conversations.archive', { channel: channelId });
    const response = this.fetchAsObject(url, this.getParams());
    return response;
  }

  /**
   * チャンネルに参加している slack ユーザーの ID を配列で取得するメソッド
   * @param {string} channelId - チャンネル ID
   * @return {Array.<string>} チャンネルに参加している slack ユーザーの ID
   * NOTE: https://api.slack.com/methods/conversations.members
   * Bot tokens scopes: channels:read, groups:read, im:read, mpim:read
   */
  getMemberIdsInChannel(channelId) {
    const memberIds = this.fetchAllItems_('conversations.members', 'members', { channel: channelId });
    return memberIds;
  }

  /**
   * すべての slack ユーザーの情報をオブジェクトの配列で取得するメソッド
   * @param {string} teamId - チーム ID
   * @return {Array.<Object>} slack ユーザーの情報
   * NOTE: https://api.slack.com/methods/users.list
   * Bot tokens scopes: users:read
   */
  getMembers(teamId) {
    const members = this.fetchAllItems_('users.list', 'members', { team_id: teamId });
    return members;
  }

  /**
   * slack 名、slack 表示名、slack ID の情報を持つ 2 次元配列を取得するメソッド
   * @param {string} teamId - チーム ID
   * @param {Array.<string>} properties - 取り出すプロパティのドット区切りパス
   * @return {Array.<Array.<string>>} slack ユーザーの必要な情報を持つ 2 次元配列
   */
  getMembersValues(teamId, properties = ['profile.real_name', 'profile.display_name', 'id']) {
    const membersValues = this.getValues_(this.getMembers(teamId), properties);
    return membersValues;
  }

  /**
   * チャンネルに参加している slack ユーザーの情報を 2 次元配列で取得するメソッド
   * @param {string} channelId - チャンネル ID
   * @param {string} teamId - チーム ID
   * @param {Array.<string>} properties - 取り出すプロパティのドット区切りパス
   * @return {Array.<Array.<string>>} チャンネル参加者の必要な情報を持つ 2 次元配列
   */
  getMembersValuesInChannel(channelId, teamId, properties = ['profile.real_name', 'profile.display_name', 'id']) {
    const memberIds = this.getMemberIdsInChannel(channelId);
    const members = this.getMembers(teamId).filter(member => memberIds.includes(member.id));
    const membersValues = this.getValues_(members, properties);
    return membersValues;
  }

  /**
   * チャンネルからメッセージを取得するメソッド
   * @param {string} channelId - チャンネル ID
   * @param {string} latest - 取得するメッセージの対象となる最終時間範囲の ts
   * @param {number} limit - 取得するメッセージ数の上限
   * @return {Array.<Object>} メッセージ オブジェクトの配列
   * NOTE: https://api.slack.com/methods/conversations.history
   * Bot tokens scopes: channels:history, groups:history, im:history, mpim:history
   */
  getMessages(channelId, latest, limit = 300) {
    const url = this.buildUrl_('conversations.history', { channel: channelId, limit: limit, latest: latest });
    const response = this.fetchAsObject(url, this.getParams('GET'));
    return response.messages;
  }

  /**
   * メッセージへのリプライを取得するメソッド
   * @param {string} channelId - チャンネル ID
   * @param {string} ts - メッセージの ts
   * @param {string} latest - 取得するメッセージの対象となる最終時間範囲の ts
   * @param {number} limit - 取得するリプライ数の上限
   * @return {Array.<Object>} リプライ オブジェクトの配列
   * NOTE: https://api.slack.com/methods/conversations.replies
   * Bot tokens scopes: channels:history, groups:history, im:history, mpim:history
   */
  getReplies(channelId, ts, latest, limit = 300) {
    const url = this.buildUrl_('conversations.replies', { channel: channelId, ts: ts, limit: limit, latest: latest });
    const response = this.fetchAsObject(url, this.getParams());
    return response.messages;
  }

  /**
   * 対象メッセージを削除するメソッド
   * @param {string} channelId - チャンネル ID
   * @param {string} ts - 削除するメッセージの ts
   * @return {Object} API のレスポンス
   * NOTE: https://api.slack.com/methods/chat.delete
   * User tokens scopes: chat:write, chat:write:user, chat:write:bot
   */
  deleteMessage(channelId, ts) {
    const url = this.buildUrl_('chat.delete', { channel: channelId, ts: ts });
    const response = this.fetchAsObject(url, this.getParams());
    return response;
  }

  /**
   * fetch メソッド用のパラメーターを生成するメソッド
   * @param {string} method - GET or POST メソッド
   * @param {string} token - 利用するトークン
   * @param {string} payload - payload
   * @return {Object} fetch メソッド用のパラメーター
   */
  getParams(method = 'POST', token = this.token, payload = '') {
    const params = {
      method: method,
      headers: {
        Authorization: 'Bearer ' + token
      },
    };
    if (payload !== '') params.payload = payload;
    return params;
  }

  /**
   * UrlFetchApp を利用して取得した値をオブジェクト化して返すメソッド
   * @param {string} url - fetch メソッド用の URL
   * @param {Object} params - fetch メソッド用のパラメーター
   * @return {Object} オブジェクト化されたレスポンス
   */
  fetchAsObject(url, params) {
    const response = UrlFetchApp.fetch(url, params);
    const json = response.getContentText();
    const object = JSON.parse(json);
    return object;
  }

  /**
   * fetch メソッドで利用する URL を生成するプライベート メソッド
   * @param {string} apiMethod - Slack API のメソッド名 例: 'conversations.list'
   * @param {Object} queries - クエリー パラメーターをプロパティとして持つオブジェクト
   * @return {string} fetch メソッド用の URL
   * NOTE: 値はすべてエスケープするため、呼び出し側でのエスケープは不要
   */
  buildUrl_(apiMethod, queries) {
    const query = Object.keys(queries)
      .map(key => key + '=' + encodeURIComponent(queries[key]))
      .join('&');
    const url = 'https://slack.com/api/' + apiMethod + '?' + query;
    return url;
  }

  /**
   * ページネーションをたどってすべての要素を取得するプライベート メソッド
   * @param {string} apiMethod - Slack API のメソッド名 例: 'users.list'
   * @param {string} itemsKey - レスポンスから取り出す配列のキー 例: 'members'
   * @param {Object} queries - クエリー パラメーターをプロパティとして持つオブジェクト
   * @param {number} limit - 1 回のリクエストで取得する件数
   * @param {Array.<Object>} items - 再帰呼び出しで蓄積される要素
   * @param {string} cursor - ページネーション用のカーソル
   * @return {Array.<Object>} すべての要素
   * NOTE: https://api.slack.com/docs/pagination
   */
  fetchAllItems_(apiMethod, itemsKey, queries, limit = 1000, items = [], cursor = '') {
    const pagingQueries = cursor === '' ?
      { ...queries, limit: limit } :
      { ...queries, limit: limit, cursor: cursor };
    const url = this.buildUrl_(apiMethod, pagingQueries);
    const response = this.fetchAsObject(url, this.getParams('GET', this.botToken));
    const allItems = [...items, ...response[itemsKey]];
    const nextCursor = response.response_metadata === undefined ?
      '' :
      response.response_metadata.next_cursor;
    if (nextCursor === undefined || nextCursor === '') return allItems;
    return this.fetchAllItems_(apiMethod, itemsKey, queries, limit, allItems, nextCursor);
  }

  /**
   * オブジェクトの配列から、指定したプロパティだけを 2 次元配列で取り出すプライベート メソッド
   * @param {Array.<Object>} objects - 取り出し対象のオブジェクトの配列
   * @param {Array.<string>} properties - 取り出すプロパティのドット区切りパス 例: 'profile.real_name'
   * @return {Array.<Array.<string|number|boolean>>} プロパティに対応する値の 2 次元配列
   * NOTE: 先頭のプロパティを基準に日本語で並び替える。パスの解決は Json クラスに集約している
   */
  getValues_(objects, properties) {
    const values = objects.map(object =>
      properties.map(property => Json.getValueByPath(object, property)),
    );
    values.sort((a, b) => String(a[0]).localeCompare(String(b[0]), 'ja'));
    return values;
  }

}
