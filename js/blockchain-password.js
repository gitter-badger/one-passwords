function getBlockchainPassword(passphrase, serviceName) {
  // Highest prime number available in the Bitcoin blockchain to use as the modulo
  var primeBlock = 381323;

  // No (security) need to make the user remember case sensitive service names
  serviceName = serviceName.toLowerCase();

  var block = parseInt('0x' + sha256(passphrase + serviceName)) % primeBlock;

  var xhttp = new XMLHttpRequest();
  var url = 'https://bitcoin.toshi.io/api/v0/blocks/' + block;

  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var block = JSON.parse(xhttp.responseText);
      document.getElementById('password').value = block.hash;
    }
  }

  xhttp.open('GET', url, true);
  xhttp.send();
}
