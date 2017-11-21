let QUOTES_URL = 'https://talaikis.com/api/quotes/random/';

let API_KEY = '75a23ddcb004e1d05a70e46c083430569d302908392fb1007a7f5014307561f3';
let WALL_URL = 'https://api.unsplash.com/photos/random?client_id=' + API_KEY;

let image_urls = ['https://source.unsplash.com/random/','https://source.unsplash.com/random/']
let counter = 0;

// let image_urls = ["https://source.unsplash.com/random/",
// "https://source.unsplash.com/random/",
// "https://images.unsplash.com/photo-1509486196753-ea8d7cc829a5?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=fab2a9b11c797a5d598d7527b5abe465",
// "https://images.unsplash.com/photo-1494439861535-211bb3a27ad4?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=c3101a0691d27b5f43fe2f8f1fb2911b",
// "https://images.unsplash.com/photo-1434187939267-b31c7b0ff193?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=1a6b8c9ffbb4fb14bd2234a2f246fd48",
// "https://images.unsplash.com/photo-1507978861137-c8242421278e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=f69194823218981883e26fe7272a4401",
// "https://images.unsplash.com/photo-1470225466406-547bab433a93?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=8593a6e246aade71e14c6466a4664fb8",
// "https://images.unsplash.com/photo-1493657654585-9df74851c60e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=af5e4c67c25bb1ca72aeac1e6f0f218b",
//  "https://images.unsplash.com/photo-1478815716600-15f0c3eb8e4b?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=6e0bb2a78921cf1a374755700b3c5070",
//  "https://images.unsplash.com/photo-1491389490029-0523da51ce81?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=3dcefd18c635a8d84f877dd14ae000ab",
// "https://images.unsplash.com/photo-1488952467585-b273b0f9d565?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=87e1b2b7e6005cff07d902af5d7db9e4"];


window.addEventListener('load', function() {
	changeQuoteWall();

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

function fetchImage(){
	
	let wallRequest = new XMLHttpRequest();
	wallRequest.open('GET', WALL_URL, true);

	wallRequest.onload = function(){
		let resp = wallRequest.responseText;
		let result = JSON.parse(resp);
		console.log(result);
		image_urls.push(result.urls.regular);
		let photoBy = result.user.first_name;
		let userLink = result.user.links.html;
		document.getElementById("user-name").innerHTML = '<a href="'+userLink+'?utm_source=arnavpuri&utm_medium=referral&utm_campaign=api-credit" target="_blank">' +photoBy+ '</a>';

		document.getElementById("quote-container").style.backgroundImage = "url(" + image_urls[counter] + ")";
	}

	wallRequest.onerror = function(){
		console.log(wallRequest.errorText);
	}

	wallRequest.send();
	// document.getElementById("quote-container").style.backgroundImage = "url(" + image_urls[counter] + ")";
	counter += 1;

}

function changeQuoteWall(){
	fetchQuote();	
  	fetchImage();
}


document.addEventListener('keypress', (event) => {
  const keyName = event.key;
  if(keyName === ' '){
  	changeQuoteWall();
  }
  
});