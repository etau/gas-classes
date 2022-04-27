'use strict'

class SmartHrApi {

  /**
   * Smart HR の API に関するコンストラクタ
   * @constructor
   */
  constructor() {
    this.tenantId = PROPERTIES.get('TENANT_ID');
    this.token = PROPERTIES.get('TOKEN');
  }

  /**
   * 従業員のフル ネームを取得するメソッド
   * @return {Array.<string>} 従業員のフル ネーム
   */
  getEmployeeFullNames() {
    const employees = this.getEmployees();
    const employeeFullBusinessNames = employees.map(employee => employee.last_name + ' ' + employee.first_name);
    return employeeFullBusinessNames;
  }

  /**
   * 従業員のフル ビジネス ネームを取得するメソッド
   * @return {Array.<string>} 従業員のフル ビジネス ネーム
   */
  getEmployeeFullBusinessNames() {
    const employees = this.getEmployees();
    const employeeFullBusinessNames = employees.map(employee => employee.business_last_name + ' ' + employee.business_first_name);
    return employeeFullBusinessNames;
  }

  /**
   * 役員情報を取得するメソッド
   * @return {Array.<Object} 役員情報
   * NOTE: 「役職」の項目に取締役との明記が必須
   */
  getBoardDirectors() {
    const crews = this.getCrews();
    const boardDirectors = crews.filter(crew =>
      crew.position === null ?
        false :
        crew.position.includes('取締役')
    );
    return boardDirectors;
  }

  /**
   * 従業員情報を取得するメソッド
   * @return {Array.<Object} 従業員情報
   * NOTE: 「役職」の項目に取締役との明記がないことが必須
   */
  getEmployees() {
    const crews = this.getCrews();
    const employees = crews.filter(crew =>
      crew.position === null ?
        true :
        !crew.position.includes('取締役')
    );
    return employees;
  }

  /**
   * 従業者 (役員 + 従業員) 情報を取得するメソッド
   * @return {Array.<Object>} 従業者 (役員 + 従業員) 情報
   */
  getCrews() {
    const url = this.buildUrl();
    const params = this.getParams();
    const contentText = UrlFetchApp.fetch(url, params).getContentText();
    const crews = JSON.parse(contentText);
    return crews;
  }

  /**
   * UrlFetchApp 用の URL を生成するメソッド
   * @return {string} UrlFetchApp 用の URL
   */
  buildUrl(numCrews = 100) {
    const url = 'https://' + this.tenantId + '.smarthr.jp/api/v1/crews?emp_status=employed&page=1&per_page=' + numCrews;
    return url;
  }

  /**
   * UrlFetchApp 用の params を生成するメソッド
   * @return {Object} UrlFetchApp 用の params
   */
  getParams(method = 'GET', object = undefined) {
    const params = {
      method: method,
      payload: JSON.stringify(object),
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    };
    return params;
  }

}