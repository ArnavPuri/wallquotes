var QUOTES_URL = 'https://talaikis.com/api/quotes/random/'


window.addEventListener('load', function() {
	fetchQuote();

});


function fetchQuote(){
	let request = new XMLHttpRequest();
	request.open('GET', QUOTES_URL, true);

	request.onload = function(){
		let resp = request.responseText;
		result = JSON.parse(resp);
		document.getElementById('quote').innerHTML = result.quote;
		document.getElementById('author').innerHTML = '~ ' + result.author;
	}
	request.onerror = function() {
	  // There was a connection error of some sort
	};

	request.send();

}


document.addEventListener('keypress', (event) => {
  const keyName = event.key;
  if(keyName === ''){
  	fetchQuote();	
  }
  
});