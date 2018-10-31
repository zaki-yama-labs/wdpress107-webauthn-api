// 文字列からArrayBufferへの変換
function str2buf(str) {
  return (new Uint8Array(str.length)).map(
    function(x, i) { return str.charCodeAt(i) }
  );
}

// ArrayBufferから文字列への変換
function buf2str(buf) {
  let str = '';
  if (!(buf.constructor === Uint8Array)) {
    buf = new Uint8Array(buf);
  }
  buf.map(function(x) {
    return str += String.fromCharCode(x);
  });
  return str;
}

// チャレンジ値の生成
let challengeBuf = new Uint8Array(16);
window.crypto.getRandomValues(challengeBuf);
