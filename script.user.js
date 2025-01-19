// ==UserScript==
// @name        所有脚本
// @namespace   lx288
// @description 所有脚本集中管理
// @version     0.0.7
// @author      lx288
// @match       *://*/*
// @grant       GM_registerMenuCommand
// @grant       GM_setClipboard
// @grant       GM_xmlhttpRequest
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       unsafeWindow
// @grant       GM_download
// @run-at      document-end
// @license     MIT
// ==/UserScript==
// https://greasyfork.org/en/scripts/523180

console.log("version 1");

(function () {
    'use strict';
    setTimeout(delayFunc, 5888);

    // 🟧 已读链接紫色
    function addStyle(styleStr) {
        let visitedStyle = document.createElement('style');
        visitedStyle.textContent = styleStr
        document.head.appendChild(visitedStyle);
    }
    addStyle(`a:visited, a:visited * {
          color: purple !important;
        }`)
})();

function delayFunc(){
    // 🟧 m-team
    if(location.href.match(/m-team\./)) {
        document.querySelector('a[href="/profile/detail/325208"] strong').innerText = "niming";    
    }
}

console.log("--- end ---");