	// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var get_rules = document.getElementById("get_rules");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close_modal")[0];

// When the user clicks on the button, open the modal 
get_rules.onclick = function() {

		var element = document.getElementById("modal_content");



		var h2 = document.createElement("h2");
		h2.innerText = "How to play";
		h2.classList += "how_to_play";

		element.appendChild(h2);

		var p = document.createElement("p");
		p.innerText = "When playing Scrabble, anywhere from two to four players will enjoy the game. The object when playing is to score more points than other players. As words are placed on the game board, points are collected and each letter that is used in the game will have a different point value. The main strategy is to play words that have the highest possible score based on the combination of letters.<br/>";
		p.classList += "how_to_play";


		element.appendChild(p);

		var a = document.createElement("a");
		a.innerText = "Link for the full rules";
		a.href += "http://www.scrabblepages.com/scrabble/rules/";

		element.appendChild(a);


	modal.style.display = "block";
}


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
