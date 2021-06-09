'use strict'


/**
 * Takes a string and masks all characters that have a special meaning
 * in a Regex with two backslashes.
 * 
 * @param {String} string 
 * @returns 
 */
function escapeRegExString (string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
// Source: https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript/3561711#3561711

module.exports = { escapeRegExString } 