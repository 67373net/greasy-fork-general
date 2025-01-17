// ==UserScript==
// @name        所有脚本
// @namespace   lx288
// @description 所有脚本集中管理
// @version     0.0.3
// @author      lx288
// @match       *://*/*
// @grant       GM_registerMenuCommand
// @grant       GM_setClipboard
// @grant       GM_download
// @grant       GM_xmlhttpRequest
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       unsafeWindow
// @grant       GM_download
// @grant       GM_addStyle
// @run-at      document-end
// @license     MIT
// ==/UserScript==
// https://greasyfork.org/en/scripts/523180

(function() {
    'use strict'; console.log("version 1"); // 输出: I am local
    GM_addStyle(`
        a:visited {
            color: purple !important;
        }
    `);
})();
