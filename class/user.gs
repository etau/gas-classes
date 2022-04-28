'use strict'

class User {

  /**
   * ユーザー オブジェクトに関するクラス
   * @constructor
   * @param {Session.User} user - ユーザー オブジェクト
   */
  constructor(user = Session.getActiveUser()) {
    this.user = user;
  }

  /**
   * Class User から委譲されたメソッド
   * NOTE: https://developers.google.com/apps-script/reference/base/user
   */
  getEmail() { return this.user.getEmail(); }

  /**
   * 管理者かどうか判定するメソッド
   * @return {boolean} 管理者かどうか
   */
  isAdmin(adminEmails = this.getAdminEmails()) {
    return adminEmails.includes(this.getEmail());
  }

  /**
   * 管理者の email をプロパティ ストアから取得するメソッド
   * @return {Array.<string>} adminEmails - 管理者の email
   * NOTE: Properties クラスを new して利用
   */
  getAdminEmails() {
    const adminEmails = PROPERTIES.get('ADMIN_EMAILS');
    return adminEmails;
  }

  /**
   * 管理者の email をプロパティ ストアに設定する静的メソッド
   * @param {Array.<string>} adminEmails - 管理者の email
   * NOTE: Properties クラスを利用
   */
  static setAdminEmails(adminEmails) {
    Properties.set('ADMIN_EMAILS', adminEmails);
  }

}