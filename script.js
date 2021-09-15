// get elements from the DOM
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const spinningLoader = document.getElementById("loader");

// ----------------------------------------- FETCHING QUOTES FROM API

// show spinning loader
const showLoader = () => {
	spinningLoader.hidden = false;
	quoteContainer.hidden = true;
};

// hide spinning loader
const hideLoader = () => {
	spinningLoader.hidden = true;
	quoteContainer.hidden = false;
};

// store data from API
let listOfQuotes = [];

// get random quote
const getRandomQuote = () => {
	showLoader();
	const quote = listOfQuotes[Math.floor(Math.random() * listOfQuotes.length)];
	// check if author exists, if not display as 'Unknown'
	!quote.author
		? (authorText.textContent = "Unknown")
		: (authorText.textContent = quote.author);
	// check if quote text is > 90 characters
	if (quote.text.length > 90) {
		quoteText.classList.add("long-quote");
	} else {
		quoteText.classList.remove("long-quote");
	}
	quoteText.textContent = quote.text;
	hideLoader();
};

// fetch Quote from API
const fetchQuotes = async () => {
	showLoader();
	const APIUrl = "https://type.fit/api/quotes";
	try {
		const response = await fetch(APIUrl);
		listOfQuotes = await response.json();
		getRandomQuote();
	} catch (error) {
		alert("There was an error fetching the quote " + error);
	}
};

//--------- EVENT LISTENERS
// fetch new quote when clicking button
newQuoteBtn.addEventListener("click", getRandomQuote);
// tweet quote
twitterBtn.addEventListener("click", (e) => {
	e.preventDefault();
	const twitterPost = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterPost, "_blank");
});

fetchQuotes();

// ----------------------------------------- FETCHING QUOTES LOCALLY (quotes.js)

/*
// Show new quote
function newQuote() {
	// pick a random quote from the API
	// const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
	const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
	// check if author field is blank. If is empty, replace name with 'Unknown'
	if (!quote.author) {
		authorText.textContent = "Unknown";
	} else {
		authorText.textContent = quote.author;
	}

	// check if quote has more than 90 characters. If so, add class 'long-quote' to decrease font-size
	if (quote.text.length > 90) {
		quoteText.classList.add("long-quote");
		quoteText.textContent = quote.text;
	} else {
		quoteText.classList.remove("long-quote");
		quoteText.textContent = quote.text;
	}
}

// Open Twitter to post quote from API
function tweetQuote() {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterUrl, "_blank");
}

//---- EVENT LISTENERS

// fetch a new quote when New Quote button
newQuoteBtn.addEventListener("click", (e) => {
	e.preventDefault();
	newQuote();
});

// Tweet Quote when clicking twitter button
twitterBtn.addEventListener("click", tweetQuote);

newQuote();
*/
