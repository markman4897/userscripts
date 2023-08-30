// ==UserScript==
// @name        Google Keep duplicates
// @description Adds a way to search for duplicate lines in google keep. (doesn't work with tick boxes)
// @include     *keep.google.com*
// @grant       GM_addStyle
// @version     1.2
// @namespace   https://github.com/markman4897/userscripts
// @downloadURL https://raw.githubusercontent.com/markman4897/userscripts/master/userscripts/google_keep/google_keep_duplicates.user.js
// @updateURL   https://raw.githubusercontent.com/markman4897/userscripts/master/userscripts/google_keep/google_keep_duplicates.user.js
// @author      markman4897
// @match       *://*/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// ==/UserScript==

/*
Versions:
= 1.3
- makes alert when done (so you know its done even if nothing is marked)
- migrating style to GM_addStyle tag
= 1.2
- made it case not sensitive
= 1.1
- uses <mark> instead of <span style="color:red>
= 1.0
- adds button
- button colors the identical lines (ignores "- ")
*/

GM_addStyle(`
#dupButton {
position:fixed;
right:50px;
bottom:50px;
z-index:9999;
background-color: #202124;
border-style: solid;
border-width: 1px;
border-color: #5f6368;
color: #e8eaed;
padding: 15px 32px;
text-align: center;
margin: 4px 2px;
}

#toast{
position:fixed;
right:200px;bottom:50px;
z-index:9999;
background-color: #202124;
border-style: solid;
border-width: 1px;
border-color: #5f6368;
color: #e8eaed;
padding: 15px 32px;
text-align: center;
margin: 4px 2px;
visibility: hidden;
}

#toast.show{
visibility: visible;
}
`);

// defining custom toast message
var toast = document.createElement("div");
//toast.appendChild(document.createTextNode("Done."));
toast.id = "toast";
document.body.appendChild(toast);

// defining button attributes
var btn = document.createElement("BUTTON");
btn.innerHTML = "DUP";
btn.id = "dupButton";
// actually adding button into dom
document.body.appendChild(btn);

// adds event listener so that the function gets executed when the button is pressed
document.getElementById ("dupButton").addEventListener("click", duplicates);

// function to display alert
function launch_toast(message) {
    var x = document.getElementById("toast")
    x.innerHTML = message;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1500);
};

// function to be executed on click of the button
function duplicates() {
  // div we want to check for duplicates
  var dupes_field = document.getElementsByClassName("IZ65Hb-s2gQvd")[document.getElementsByClassName("IZ65Hb-s2gQvd").length -1].querySelectorAll("*")[5].innerHTML;

  // splits for later use
  var arr = dupes_field.split("<br>");
  // makes everything lower case (just in case), splits by "- " and joins back without so we get rid of it, splits by "<br>" so we have one line per array element, sorts so duplicates are next to each other (for easier detection later)
  var out = dupes_field.toLowerCase().split("- ").join("").split("<br>").sort();

  var dupes = [];
  // detects duplicates and puts them in array (dupes)
  for (var i = 0; i < out.length - 1; i++) {
    if (out[i + 1] == out[i]) {
        dupes.push(out[i]);
    }
  }

  // prepares new innerHTML for the original div
  for (i = 0; i < arr.length; i++) {
    for (var j = 0; j < dupes.length; j++) {
      if (arr[i].toLowerCase().replace("- ","") == dupes[j]) {
        arr[i] = "<mark>"+arr[i]+"</mark>";
      }
    }
	}

  // joining back the colorised things
  var result = arr.join("<br>");
  // writing them to dom
  document.getElementsByClassName("IZ65Hb-s2gQvd")[document.getElementsByClassName("IZ65Hb-s2gQvd").length -1].querySelectorAll("*")[5].innerHTML = result;
  if(dupes.length == 0) {
    launch_toast("No duplicated.");
  } else {
    launch_toast("Done.");
  };
};
