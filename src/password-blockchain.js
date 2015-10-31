
function getPassword(passphrase, serviceName) {

  // Highest prime number available in the Bitcoin blockchain to use as the modulo
  primeBlock = 381323;

  // No (security) need to make the user remember case sensitive service names
  serviceName = serviceName.toLowerCase();

  // Blockchain's Block which its hash is the target password
  passwordBlock = parseInt('0x' + sha256(passphrase + serviceName)) % primeBlock;

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      block = JSON.parse(xhttp.responseText);
        document.getElementById('password').value = block.data.blockhash;
    }
  }

  url = 'https://chain.so/api/v2/get_blockhash/BTC/' + passwordBlock;
  xhttp.open('GET', url, true);
  xhttp.send();
}
