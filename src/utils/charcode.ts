export enum CharType {
  /** 全角转半角 */
  FullToHalf = 0,
  /** 半角转全角 */
  HalfToFull = 1,
}

export const convertCharCode = (content: string, r: CharType) => {
  let e = "",t="";
    // t += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // (t += "abcdefghijklmnopqrstuvwxyz");
    // (t += "0123456789");
    // (t += " `~!@#$%^&*()_+-={}|[]:\";'<>?,./");
  (t += " `~!@#$^&*()_+-={}|[]:\";'<>?,./");
  for (let a = 0; a < content.length; a++) {
    let C = content.charAt(a);
    content.charCodeAt(a);
    if (C == "　") {
      e += " ";
      continue;
    }
    if (C === '.') {
      e += "。";
      continue;
    }

    if (t.indexOf(C) > -1) {
      e += String.fromCharCode(content.charCodeAt(a) + 65248);
      continue;
    }

    if (r === CharType.HalfToFull) {
      e += String.fromCharCode(content.charCodeAt(a));
      continue;
    }

    const newChar = String.fromCharCode(content.charCodeAt(a) - 65248);

    if (t.indexOf(newChar) > -1) {
      e += newChar;
      continue;
    }

    e += String.fromCharCode(content.charCodeAt(a));
  }
  return e;
};


export const convertLabelCharCode = (content: string, r: CharType) => {
  let e = "",t="";
  const list = [];
  let temp = true;
  let temp2 = true;
  (t += " `~!@#$^&*()_+-={}|[]:\";'<>?,./");
  for (let a = 0; a < content.length; a++) {
    let C = content.charAt(a);
    content.charCodeAt(a);
    if (C == "　" || C === ' ') {
      e += " ";
      list.push(a);
      continue;
    }
    if (C === '.') {
      e += "。";
      list.push(a);
      continue;
    }
    if (C === '"') {
      e += temp ? '“':'”';

      temp = !temp;
      list.push(a);
      continue;
    }
    if (C === "'") {
      e += temp2 ? '‘':'’';

      temp2 = !temp2;
      list.push(a);
      continue;
    }

    if (t.indexOf(C) > -1) {
      list.push(a);
      e += String.fromCharCode(content.charCodeAt(a) + 65248);
      continue;
    }

    if (r === CharType.HalfToFull) {
      e += String.fromCharCode(content.charCodeAt(a));
      continue;
    }

    const newChar = String.fromCharCode(content.charCodeAt(a) - 65248);

    if (t.indexOf(newChar) > -1) {
      e += newChar;
      continue;
    }

    e += String.fromCharCode(content.charCodeAt(a));
  }
  return {
    str: e,
    list
  };
};