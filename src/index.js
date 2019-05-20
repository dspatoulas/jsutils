/**
 * Checks if the given value is null or empty
 * @param {any object} val 
 */
export const isNullOrEmpty = val => {
  return val === ''
    || val === undefined
    || val === 'undefined'
    || val === null;
}

/**
 * Immutable filtering of object to include only the keys specified
 * @param {Object to be filtered} obj 
 * @param {Keys to be included in new object} keys 
 */
export const objectWithKeys = (obj, keys) => {
  return Object.entries(obj)
    .filter(([key]) => keys.includes(key))
    .reduce((obj, [key, val]) => Object.assign(obj, {[key]: val}), {});
}

/**
 * Immutable filtering of object to include all keys besides the ones specified
 * @param {Object to be filtered} obj 
 * @param {Keys to be removed from new object} keys 
 */
export const objectWithoutKeys = (obj, keys) => {
  return Object.entries(obj)
    .filter(([key]) => !keys.includes(key))
    .reduce((obj, [key, val]) => Object.assign(obj, {[key]: val}), {});
}

/**
 * Immutable filtering of object to remove null and empty values
 * @param {Object before filtering null and empty values} obj 
 */
export const objectWithoutNullOrEmpty = (obj) => {
  return Object.entries(obj)
    .filter(([key, val]) => !isNullOrEmpty(val))
    .map(([key, val]) => {
        if (typeof(val) === 'object' && !Array.isArray(val)) {
            val = objectWithoutNullOrEmpty(val)
        }
        return [key, val];
    })
    .reduce((obj, [key, val]) => Object.assign(obj, {[key]: val}), {});
}

export const combineArrays = (arr1, arr2, removeDups=false) => {
  if (removeDups) {
    return [...arr1, ...arr2.filter(item => !arr1.includes(item))];
  }
  return [...arr1, ...arr2];
};

export const fallbackCopyTextToClipboard = (text) => {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}
export const copyTextToClipboard = (text) => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}
