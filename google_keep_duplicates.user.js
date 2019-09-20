// ==UserScript==
// @name        Google Keep duplicates
// @description Adds a way to search for duplicate lines in google keep. (doesn't work with tick boxes)
// @include     *keep.google.com*
// @version     1.2
// ==/UserScript==

/*
Versions:
= 1.2
- made it case not sensitive
= 1.1
- uses <mark> instead of <span style="color:red>
= 1.0
- adds button
- button colors the identical lines (ignores "- ")
*/

// defining button attributes
var btn = document.createElement("BUTTON");
btn.innerHTML = "DUP";
btn.style = "position:fixed;right:50px;bottom:50px;z-index:9999;background-color: #202124;border-style: solid;border-width: 1px;border-color: #5f6368;color: #e8eaed;padding: 15px 32px;text-align: center;margin: 4px 2px;";
btn.id = "dupButton";
// actually adding button into dom
document.body.appendChild(btn);

// adds event listener so that the function gets executed when the button is pressed
document.getElementById ("dupButton").addEventListener("click", duplicates);

// function to be executed on click of the button
function duplicates() {
  // div we want to check for duplicates
  var dupes_field = document.getElementsByClassName("IZ65Hb-s2gQvd")[document.getElementsByClassName("IZ65Hb-s2gQvd").length -1].querySelectorAll("*")[5].innerHTML;

  // splits for later use
  var arr = dupes_field.split("<br>");
  // makes everything lower case (just in case), splits by "- " and joins back without so we get rid of it, splits by "<br>" so we have one line per array element, sorts so duplicates are next to each other (for easier detection later)
  out = dupes_field.toLowerCase().split("- ").join("").split("<br>").sort();

  var dupes = [];
  // detects duplicates and puts them in array (dupes)
  for (var i = 0; i < out.length - 1; i++) {
    if (out[i + 1] == out[i]) {
        dupes.push(out[i]);
    }
	}

  // prepares new innerHTML for the original div
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < dupes.length; j++) {
      if (arr[i].toLowerCase().replace("- ","") == dupes[j]) {
        arr[i] = "<mark>"+arr[i]+"</mark>";
      }
    }
	}

  // joining back the colorised things
  result = arr.join("<br>");
  // writing them to dom
  document.getElementsByClassName("IZ65Hb-s2gQvd")[document.getElementsByClassName("IZ65Hb-s2gQvd").length -1].querySelectorAll("*")[5].innerHTML = result;
}
