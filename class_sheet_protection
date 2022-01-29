class SheetProtection {

  /**
   * シート保護に関するコンストラクタ
   * @constructor
   * @param {SpreadsheetApp.sheet} sheet - 対象となるシート。デフォルト引数は「SpreadsheetApp.getActiveSheet()」
   */
  constructor(sheet = SpreadsheetApp.getActiveSheet()) {
    /** @type {SpreadsheetApp.Sheet} */
    this.sheet = sheet;
    /** @type {Array} */
    this.protections = this.sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET);  //注：配列になっており[0]がシートのprotection  
  }

  /**　シート全体を保護する
  * @param {SpreadsheetApp.spreadsheet} sheet 保護するスプレッドシートオブジェクト
  */
  protectSheet() {
    this.sheet.protect(SpreadsheetApp.ProtectionType.SHEET);
    return this.protections[0];
  }

  /**
  * シートの保護の編集者を表示する
  */
  showEditors() {
    const editors = this.protections[0].getEditors();
    editors.forEach(editor => {
      console.log(`Username: ${editor.getUsername()},e-mail: ${editor.getEmail()}`);
    })
  }

  /**
  * シートの保護に編集者を追加
  * 注：シートの編集権限は付与しないため、必要であれば先に設定する
  * e-mailの代わりにユーザー名でもたぶん可能(メソッドがある)
  *  @param {string} email 追加する編集者のemail
  */
  addEditor(email) {
    this.protections[0].addEditor(email);    //protectionsは配列なので、最初を要素を取りして追加
    console.log(email, 'をシート保護の編集者に追加しました。');
    return this.protections[0];
  }

  /**
* シートの保護に複数の編集者を追加
* 注：シートの編集権限は付与しないため、必要であれば先に設定する
* ユーザー名では動かない
*  @param {Array} emailArray 追加する編集者のemailの配列
*/
  addEditors(emailArray) {
    this.protections[0].addEditors(emailArray);    //protectionsは配列なので、最初を要素を取りして追加
    console.log(emailArray, 'をシート保護の編集者に追加しました。');
    return this.protections[0];
  }

  /**
  * シートの保護から指定した編集者を削除
  * @param {string} email 削除する編集者のemail
  */
  removeEditor(email) {
    this.protections[0].removeEditor(email);
    console.log(email, 'を保護の編集者から削除しました。');
    return this.protections[0];
  }

  /**
  * シートの保護から自分以外の編集者を削除
  * 注：そもそもシートのオーナーとスクリプト実行ユーザーは削除できない。（エラーも出ない）
  */
  removeAllEditorsButMe() {
    const me = Session.getEffectiveUser();
    const editors = this.protections[0].getEditors();

    //自分がグループアカウントのみで編集権限を付与されていると、そのグループアカウントを削除できずエラーになる。
    //予防的に個人アカウントを追加する。
    this.protections[0].addEditor(me); 　

    this.protections[0].removeEditors(editors);

    return this.protections[0];
  }
}


// editorsのメソッド
// console.log(editors[0].getEmail());
// console.log(editors[0].getUsername());
// console.log(editors[0].toString());
// console.log(editors[0].getUserLoginId());



