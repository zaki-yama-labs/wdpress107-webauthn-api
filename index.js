// WebAuthn API が利用できるかを確認
if (!PublicKeyCredential) {
  console.log('PublicKeyCredentialインタフェースがない');
}
// NOTE: 後半の判定は逆だと思う
if (navigator === undefined || !('credentials' in navigator)) {
  console.log('CrendentialsContainerインターフェースがない');
}

// isUserVerifyingPlatformAuthenticatorAvailable() メソッドを使った判定
PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
  .then(function(available) {
    if (available) {
      console.log('利用可能');
    } else {
      console.log('利用不可能');
    }
  })
  .catch(function(error) {
    console.log('利用不可能', error);
  });


// navigator.credentials.store()
const credential = new PasswordCredential({
  id,
  password,
  name,
  iconURL
});
navigator.credentials.store(credential)
  .then(function() {
    // 後続処理
  });

// navigator.credentials.get()
navigator.credentials.get({ password: true })
  .then(function(credential) {
    // credential は保存した PasswordCredential
  });

