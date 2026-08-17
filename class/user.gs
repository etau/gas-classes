'use strict';

/**
 * ユーザーに関するクラス
 */
class User {

  /**
   * ユーザー オブジェクトに関するコンストラクタ
   * @constructor
   * @param {Session.User} user - ユーザー オブジェクト
   */
  constructor(user = Session.getActiveUser()) {
    /** @type {Session.User} */
    this.user = user;
  }

  /**
   * Class User から委譲されたメソッド
   * NOTE: https://developers.google.com/apps-script/reference/base/user
   */
  getEmail() { return this.user.getEmail(); }

  /**
   * 管理者かどうか判定するメソッド
   * @param {Array.<string>} adminEmails - 管理者の email
   * @return {boolean} 管理者かどうか
   */
  isAdmin(adminEmails = User.getAdminEmails()) {
    return adminEmails.includes(this.getEmail());
  }

  /**
   * 管理者の email をプロパティ ストアから取得する静的メソッド
   * @return {Array.<string>} 管理者の email。未設定の場合は空配列
   */
  static getAdminEmails() {
    const adminEmails = PROPERTIES.get(PROPERTY_KEYS.ADMIN_EMAILS);
    return adminEmails === null ? [] : adminEmails;  // NOTE: プロパティ未設定の場合に null が返るため
  }

  /**
   * 管理者の email をプロパティ ストアに設定する静的メソッド
   * @param {Array.<string>} adminEmails - 管理者の email
   */
  static setAdminEmails(adminEmails) {
    PROPERTIES.set(PROPERTY_KEYS.ADMIN_EMAILS, adminEmails);
  }

}
