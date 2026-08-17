'use strict';

/**
 * スクリプト プロパティのキー名
 * @enum {string}
 * NOTE: 値そのものはスクリプト プロパティに格納し、ここにはキー名のみを書く
 */
const PROPERTY_KEYS = Object.freeze({
  ADMIN_EMAILS: 'ADMIN_EMAILS',
  TENANT_ID: 'TENANT_ID',
  TOKEN: 'TOKEN',
  USER_OAUTH_TOKEN: 'USER_OAUTH_TOKEN',
  BOT_USER_OAUTH_TOKEN: 'BOT_USER_OAUTH_TOKEN',
  WEBHOOK_URL: 'WEBHOOK_URL',
});

/**
 * Type クラスの valid メソッドで使用する型の一覧
 * @enum {string|Array.<string>|Object.<string>}
 */
const TYPE = Object.freeze({
  STRING: 'string',
  NUMBER: 'number',
  INTEGER: 'integer',
  BOOLEAN: 'boolean',
  DATE: 'Date',
  ARRAY: 'Array',
  OBJECT: 'Object',
  REGEXP: 'RegExp',
  MAP: 'Map',
  SET: 'Set',
  JSON: 'JSON',
  SPREADSHEET: 'Spreadsheet',
  SHEET: 'Sheet',
  CALENDAR: 'Calendar',
  /**
   * toString メソッドで型判定をおこなう対象のオブジェクト
   * NOTE: Type クラスの valid メソッドの引数 type には指定しない
   */
  TO_STRINGS: Object.freeze(['Spreadsheet', 'Sheet', 'Calendar']),
  FOLDER: 'folder',
  /**
   * ファイル オブジェクトの各種 Mime Type
   * NOTE: File クラスの getType メソッドは、このキー名を返す
   */
  FILE: Object.freeze({
    SPREADSHEET: 'application/vnd.google-apps.spreadsheet',
    PRESENTATION: 'application/vnd.google-apps.presentation',
    DOCUMENT: 'application/vnd.google-apps.document',
    SCRIPT: 'application/vnd.google-apps.script',
  }),
});

/**
 * SHEET_INFO enum の例
 * @enum {Object}
 */
const SHEET_INFO = Object.freeze({
  SHEET1: Object.freeze({
    NAME: 'シート1',
    HEADERS: Object.freeze({
      ROWS: 1,
      ROW_INDEX: 0,
    }),
    COLUMN: Object.freeze({
      NAME: '名前',
      AGE: '年齢',
    }),
  }),
});

/**
 * トリガーのハンドラー関数名の一覧の例
 * @enum {Object}
 */
const TRIGGER_TYPE = Object.freeze({
  ON_CHANGE: Object.freeze([{ NAME: 'hoge' }]),
  ON_EDIT: Object.freeze([{ NAME: 'fuga' }]),
  TIME_BASE: Object.freeze({
    AT_HOUR: Object.freeze([
      {
        NAME: 'piyo',
        HOUR: 0,
        EVERY_DAYS: 1,
      },
    ]),
  }),
});

/**
 * カスタム メニューの定義の例
 * @enum {Object}
 */
const MENU_INFO = Object.freeze({
  TITLE: '【GAS MENU】',
  FUNCTIONS: Object.freeze([
    {
      NAME: 'myFunction',
      CAPTION: 'hogehoge',
    },
  ]),
});
