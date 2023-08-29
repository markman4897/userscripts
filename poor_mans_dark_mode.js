// ==UserScript==
// @name         Poor man's Dark Mode
// @namespace    https://github.com/markman4897/userscripts
// @version      0.1
// @description  Adds a small box on bottom right that allows you to toggle dark mode.
// @author       markman4897
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Inject CSS
    let style = document.createElement('style');
    style.type = 'text/css';
    style.innerText = '#poor-mans-dark-mode{position: fixed;bottom: 1em;right: 1em;height: 3em;background-color: #AAA;border-radius: 0.5em;padding: 0.5em;font-size: 0.5em;display: flex;align-items: center;gap: 0.5em;opacity: 0.7}#poor-mans-dark-mode label{user-select: none}html.dark-mode-on{filter: invert(100%)}html.dark-mode-on img{filter: invert(100%)}';
    document.head.appendChild(style);

    let div = document.createElement('div');
    div.id = 'poor-mans-dark-mode';
    div.innerHTML = '<input type="checkbox" id="poor-mans-dark-mode-checkbox"><label for="poor-mans-dark-mode-checkbox">Invert Colours</label>';

    const pmdm_checkbox = div.querySelector('#poor-mans-dark-mode-checkbox');

    pmdm_checkbox.addEventListener('change', () => {
        if (pmdm_checkbox.checked) {
            document.documentElement.classList.add("dark-mode-on")
        } else {
            document.documentElement.classList.remove("dark-mode-on")
        }
    });

    document.body.appendChild(div);
})();