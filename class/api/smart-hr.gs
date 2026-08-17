'use strict';

/**
 * SmartHR の API に関するクラス
 * NOTE: https://developer.smarthr.jp/api/
 */
class SmartHrApi {

  /**
   * SmartHR の API に関するコンストラクタ
   * @constructor
   */
  constructor() {
    /** @type {string} */
    this.tenantId = PROPERTIES.get(PROPERTY_KEYS.TENANT_ID);
    /** @type {string} */
    this.token = PROPERTIES.get(PROPERTY_KEYS.TOKEN);
  }

  /**
   * 従業者 (役員 + 従業員) 情報を取得するメソッド
   * @param {number} numCrews - 1 ページあたりの取得件数
   * @return {Array.<Object>} 従業者 (役員 + 従業員) 情報
   */
  getCrews(numCrews = 100) {
    const url = this.buildUrl(numCrews);
    const params = this.getParams();
    const contentText = UrlFetchApp.fetch(url, params).getContentText();
    const crews = JSON.parse(contentText);
    return crews;
  }

  /**
   * 役員情報を取得するメソッド
   * @return {Array.<Object>} 役員情報
   * NOTE: 「役職」の項目に取締役との明記が必須
   */
  getBoardDirectors() {
    const boardDirectors = this.filterCrewsByPosition_(true);
    return boardDirectors;
  }

  /**
   * 従業員情報を取得するメソッド
   * @return {Array.<Object>} 従業員情報
   * NOTE: 「役職」の項目に取締役との明記がないことが必須
   */
  getEmployees() {
    const employees = this.filterCrewsByPosition_(false);
    return employees;
  }

  /**
   * 役職の記載有無で従業者を絞り込むプライベート メソッド
   * @param {boolean} isBoardDirector - 役員を取得するかどうか
   * @param {string} position - 役員を判定する役職名
   * @return {Array.<Object>} 絞り込まれた従業者情報
   */
  filterCrewsByPosition_(isBoardDirector, position = '取締役') {
    const crews = this.getCrews();
    const filteredCrews = crews.filter(crew => {
      const isMatched = crew.position === null ? false : crew.position.includes(position);
      return isBoardDirector ? isMatched : !isMatched;
    });
    return filteredCrews;
  }

  /**
   * 従業員のフル ネームを取得するメソッド
   * @param {boolean} isBusinessName - ビジネス ネームを取得するかどうか
   * @return {Array.<string>} 従業員のフル ネーム
   */
  getEmployeeFullNames(isBusinessName = false) {
    const employees = this.getEmployees();
    const employeeFullNames = employees.map(employee => isBusinessName ?
      employee.business_last_name + ' ' + employee.business_first_name :
      employee.last_name + ' ' + employee.first_name,
    );
    return employeeFullNames;
  }

  /**
   * UrlFetchApp 用の URL を生成するメソッド
   * @param {number} numCrews - 1 ページあたりの取得件数
   * @param {number} page - 取得するページ番号
   * @return {string} UrlFetchApp 用の URL
   */
  buildUrl(numCrews = 100, page = 1) {
    const url = 'https://' + this.tenantId + '.smarthr.jp/api/v1/crews' +
      '?emp_status=employed' +
      '&page=' + page +
      '&per_page=' + numCrews;
    return url;
  }

  /**
   * UrlFetchApp 用の params を生成するメソッド
   * @param {string} method - GET or POST メソッド
   * @param {Object} object - payload に設定するオブジェクト
   * @return {Object} UrlFetchApp 用の params
   */
  getParams(method = 'GET', object = undefined) {
    const params = {
      method: method,
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    };
    if (object !== undefined) params.payload = JSON.stringify(object);
    return params;
  }

}
