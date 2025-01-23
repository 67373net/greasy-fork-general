// ==UserScript==
// @name        所有脚本
// @namespace   lx288
// @description 所有脚本集中管理
// @version     0.20250123.8
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

// some constants
const menuHeight = 24;
const chromeHeightSmall = 62;
const blockColumn = 12;
const blockRow = 12;
const blockWidth = screen.width/blockColumn;
const blockHeight = (screen.height - menuHeight)/blockRow;

// 🟢 微信表情包批量下载
urlTrigger(/sticker\.weixin\.qq\.com/, wxStickerDownload);
// 🟢 公众号后台图片下载
urlTrigger(/mp\.weixin\.qq\.com/, wxConsoleStickerDownload);
// 🟢 m-team 馒头去掉名字
urlTrigger(/[\/\.]m-team\./, mtDelName);
// 🟢 popout youtube chat room
urlTrigger(/(?:live\/|watch\?v=|embed\/)([a-zA-Z0-9_-]{11})/, ytbChatPop)
// 🟢 ytb chat realtime
urlTrigger(/youtube\.com\/live_chat/, ytbChatRealtime)

// 🟩 已读链接紫色
addStyle(`a:visited, a:visited * {
  color: purple !important;
}`);

// 🟩 极简输入框
GM_registerMenuCommand("极简窗口", () => {
  const currentUrl = window.location.href;
  const url = prompt("请输入网址:", currentUrl);
  if (url) window.open(url, '__blank', 'height=588,width=588,top=588,left=888')
});


// 🟠 url matcher
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

// 🟧 popout youtube + twitch set
function ytbChatPop(){
  const liveId = window.location.href.match(/(?:live\/|watch\?v=|embed\/)([a-zA-Z0-9_-]{11})/)[1];
  const url_ytb = "https://www.youtube.com/live_chat?v=" + liveId;
  const url_twitch1 = "https://www.twitch.tv/popout/thebs_chen/chat?popout=";
  const url_twitch2 = "https://www.twitch.tv/popout/luoshushu0/chat?popout=";
  const size1 = `height=${blockHeight * 8 - chromeHeightSmall},width=${blockWidth},top=0,left=${blockWidth*6}`;
  const size2 = `height=${blockHeight * 4 - chromeHeightSmall},width=${blockWidth},top=${menuHeight + blockHeight * 8},left=${blockWidth*6}`;
  GM_registerMenuCommand("ytb > Twitch Pop", () => {
    window.open("https://www.youtube.com/embed/" + liveId, String(Math.random()));
    window.open("https://player.twitch.tv/?channel=thebs_chen&parent=localhost", String(Math.random()));
    window.open(url_ytb, String(Math.random()), size1);
    window.open(url_twitch1, String(Math.random()), size2);
  });
  GM_registerMenuCommand("luoshushu Pop", () => {
    window.open("https://player.twitch.tv/?channel=luoshushu0&parent=localhost", String(Math.random()));
    window.open(url_twitch2, String(Math.random()), size1);
    window.open(url_ytb, String(Math.random()), size2);
  });
}

// 🟧 ytb chat realtime
function ytbChatRealtime(){
  setTimeout(() => {
    document.querySelectorAll("tp-yt-paper-item-body.style-scope.yt-dropdown-menu")[1].click();
  }, 5888)
}