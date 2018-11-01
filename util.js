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


// 公開鍵生成リクエストのパラメータ
const publicKey = {
  challenge: challengeBuf,
  rp: {
    name: 'Example',
    id: 'example.com',
  },
  user: {
    id: str2buf('ExampleId'),
    name: 'example@example.com',
    displayName: 'Example Name',
  },
  pubKeyCredParams: [{
    alg: -7,
    type: 'public-key',
  }],
  authenticatorSelection: {
    authenticatorAttachment: 'cross-platfrom',
    requireResidentKey: false,
    userVerification: 'preferred',
  },
};

// 公開鍵生成リクエスト
navigator.credentials.create({ publicKey })
  .then(function(attestation) {
    // 公開鍵の作成に成功
    console.dir(attestation);
    /**
    // attestation に含まれるデータ
    attestation = {
      rawId,
      id,
      type,
      response: {
        clientDataJSON,
        attestationObject,
      }
    };
    */
    console.dir(JSON.parse(
      buf2str(attestation.response.clientDataJSON)
    ));
    /**
    // attestation.response.clientDataJSONに含まれるデータ
    clientDataJSON = {
      challenge,
      clientExtensions,
      hashAlgorithm,
      origin,
      type
    }
    */
  })
  .catch(function(error) {
    // 公開鍵の作成に失敗
  });

