function getBlockchainPassword(passphrase, serviceName) {
  // Highest prime number available in the Bitcoin blockchain to use as the modulo
  var primeBlock = 381323;

  // No (security) need to make the user remember case sensitive service names
  serviceName = serviceName.toLowerCase();

  var block = parseInt('0x' + sha256(passphrase + serviceName)) % primeBlock;

  var xhttp = new XMLHttpRequest();
  var url = 'https://chain.so/api/v2/get_blockhash/BTC/' + block;

  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var block = JSON.parse(xhttp.responseText);
      document.getElementById('password').value = sha256(block.data.blockhash);
    }
  }

  xhttp.open('GET', url, true);
  xhttp.send();
}
