// ==UserScript==
// @name         Poor man's Dark Mode
// @description  Adds a small box on bottom right that allows you to toggle dark mode.
// @copyright    ISC licence, https://raw.githubusercontent.com/markman4897/userscripts/master/LICENCE.md
// @version      0.4
// @namespace    https://github.com/markman4897/userscripts
// @downloadURL  https://raw.githubusercontent.com/markman4897/userscripts/master/userscripts/general/poor_mans_dark_mode.user.js
// @updateURL    https://raw.githubusercontent.com/markman4897/userscripts/master/userscripts/general/poor_mans_dark_mode.user.js
// @author       markman4897
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        GM.addStyle
// @grant        GM.getValue
// @grant        GM.setValue
// @run-at       document-body
// ==/UserScript==

(async () => {
    'use strict';

    GM.addStyle(`
        #poor-mans-dark-mode {
            position: fixed;
            bottom: 1em;
            right: 1em;
            height: 3em;
            background-color: #AAA;
            border-radius: 0.5em;
            padding: 0.5em;
            font-size: 0.6em;
            font-weight: bold;
            color: #113;
            display: flex;
            align-items: center;
            gap: 0.5em;
            opacity: 0.7;
            z-index: 100000;
        }
        #poor-mans-dark-mode label {
            user-select: none
        }
        html.dark-mode-on {
            filter: invert(100%)
        }
        html.dark-mode-on img,
        html.dark-mode-on svg {
            filter: invert(100%)
        }`
    );

    let div = document.createElement('div');
    div.id = 'poor-mans-dark-mode';
    div.innerHTML = '<input type="checkbox" id="poor-mans-dark-mode-checkbox"><label for="poor-mans-dark-mode-checkbox">Invert Colours</label>';

    const pmdm_checkbox = div.querySelector('#poor-mans-dark-mode-checkbox');

    const toggleDarkMode = async () => {
        if (pmdm_checkbox.checked) {
            document.documentElement.classList.add("dark-mode-on")
        } else {
            document.documentElement.classList.remove("dark-mode-on")
        }

        await GM.setValue('poor-mans-dark-mode-checkbox', pmdm_checkbox.checked);
    }

    pmdm_checkbox.addEventListener('change', toggleDarkMode);

    document.body.appendChild(div);

    pmdm_checkbox.checked = await GM.getValue('poor-mans-dark-mode-checkbox', false);
    toggleDarkMode();
})();
