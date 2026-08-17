'use strict';

/**
 * スクリプト プロパティを操作する Properties オブジェクト
 * @type {Properties}
 */
const PROPERTIES = new Properties();

/**
 * スクリプトが紐づくアクティブなスプレッドシート
 * @type {SpreadsheetApp.Spreadsheet}
 */
const SS = SpreadsheetApp.getActiveSpreadsheet();
