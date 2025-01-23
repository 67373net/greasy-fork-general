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

// 🟢 微信表情包批量下载
urlTrigger(/sticker\.weixin\.qq\.com/, wxStickerDownload);
// 🟢 公众号后台图片下载
urlTrigger(/mp\.weixin\.qq\.com/, wxConsoleStickerDownload);
// 🟢 m-team 馒头去掉名字
urlTrigger(/[\/\.]m-team\./, mtDelName);
// 🟩 已读链接紫色
addStyle(`a:visited, a:visited * {
  color: purple !important;
}`);

// 🟠 url mather
function urlTrigger(urlReg, funcName) {
  if (location.href.match(urlReg)) funcName();
}

// 🟠 addstyle
function addStyle(styleStr) {
  let visitedStyle = document.createElement("style");
  visitedStyle.textContent = styleStr;
  document.head.appendChild(visitedStyle);
}

// 🟧 微信表情包批量下载
function wxStickerDownload() {
  GM_registerMenuCommand("下载表情包1", () => {
    let nodeList = document.querySelectorAll(".stiker_content_ele");
    let title = document.querySelector(".stiker_head_msg_title").innerText;
    for (let i = 0; i < nodeList.length; i++) {
      GM_download(
        nodeList[i].src,
        title + "_" + String(i + 101).substring(1, 3),
      );
    }
  });
}

// 🟧 公众号后台图片下载
function wxConsoleStickerDownload() {
  GM_registerMenuCommand("下载表情包2", () => {
    let nodeList = document.querySelectorAll(".you .bubble_cont img");
    for (let i = 0; i < nodeList.length; i++) {
      console.log(nodeList[i].src);
      GM_download(
        nodeList[i].src,
        "公众号后台图片下载" + (Math.random() + 100 + i) + ".gif",
      );
    }
  });
}

// 🟧 m-team 馒头去掉名字
function mtDelName() {
  setTimeout(() => {
    document.querySelector('a[href="/profile/detail/325208"]').remove();
    GM_registerMenuCommand("馒头主页", function () {
      window.location.href = "/profile/detail/325208";
    });
  }, 5888);
}
