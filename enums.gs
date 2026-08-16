'use strict';

/**
 * スクリプト プロパティのキー名
 * NOTE: 値そのものはスクリプト プロパティに格納し、ここにはキー名のみを書く
 * @enum {string}
 */
const PROPERTY_KEYS = {
  ADMIN_EMAILS: 'ADMIN_EMAILS',
  TENANT_ID: 'TENANT_ID',
  TOKEN: 'TOKEN',
  USER_OAUTH_TOKEN: 'USER_OAUTH_TOKEN',
  BOT_USER_OAUTH_TOKEN: 'BOT_USER_OAUTH_TOKEN',
  WEBHOOK_URL: 'WEBHOOK_URL',
};

/**
 * Type クラスの valid メソッドで使用する型の一覧
 * @enum {string}
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
  TO_STRINGS: Object.freeze([
    // toString メソッドで型判定をおこなう対象のオブジェクト NOTE: Type クラスの valid メソッドの 引数 type には指定しない
    'Spreadsheet',
    'Sheet',
    'Calendar',
  ]),
  FOLDER: 'folder',
  FILE: Object.freeze({
    // ファイル オブジェクトの各種 Mime Type
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
const SHEET_INFO = {
  SHEET1: {
    NAME: 'シート1',
    HEADERS: {
      ROWS: 1,
      ROW_INDEX: 0,
    },
    COLUMN: {
      NAME: '名前',
      AGE: '年齢',
    },
  },
};

/**
 * トリガーのハンドラー関数名の一覧の例
 * @enum {Object}
 */
const TRIGGER_TYPE = {
  ON_CHANGE: [{ NAME: 'hoge' }],
  ON_EDIT: [{ NAME: 'fuga' }],
  TIME_BASE: {
    AT_HOUR: [
      {
        NAME: 'piyo',
        HOUR: 0,
        EVERY_DAYS: 1,
      },
    ],
  },
};

/**
 * カスタム メニューの定義の例
 * @enum {Object}
 */
const MENU_INFO = {
  TITLE: '【GAS MENU】',
  FUNCTIONS: [
    {
      NAME: 'myFunction',
      CAPTION: 'hogehoge',
    },
  ],
};
