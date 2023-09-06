// ==UserScript==
// @name             Google Keep quick symbols
// @description      Displays some special symbols on the bottom of opened note for easy access
// @include          *keep.google.com*
// @version          1.0
// @namespace        https://github.com/markman4897/userscripts
// @downloadURL      https://raw.githubusercontent.com/markman4897/userscripts/master/userscripts/google_keep/google_keep_quick_symbols.user.js
// @updateURL        https://raw.githubusercontent.com/markman4897/userscripts/master/userscripts/google_keep/google_keep_quick_symbols.user.js
// @author           markman4897
// ==/UserScript==

// TODO:
//  - use mutation observer on body to see when openedNoteElement loses display:none
//  - make the symbols that when clicked, copy them to clipboard

(() => {
    'use strict';
  
    const openedNoteElement = document.body.querySelector('.VIpgJd-TUo6Hb.XKSfm-L9AdLc.eo9XGd');
  
    let div = document.createElement('div');
    div.style.padding = "1em";
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.innerHTML = `
      <div style="display: flex;gap: 1em;font-size: 1em">
        <div>□</div>
        <div>▢</div>
        <div>◻</div>
        <div>▷</div>
        <div>◇</div>
        <div>◌</div>
        <div>○</div>
        <div>◯</div>
        <div>⭕︎</div>
        <div>🗸</div>
        <div>✓</div>
        <div>✔</div>
        <div>🗴</div>
        <div>✗</div>
        <div>✘</div>
      </div>`;
    openedNoteElement.appendChild(div);
  })();