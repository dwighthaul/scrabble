


	var array_pioche = [];

	var default_value = default_value;

	var nbr_letter_by_hand = 7;
	var size_board = 15;

	var player = 1;

	var players = [];

	var first_word_set = true;

	var nbr_player = 2;
	var player_submit_word = false;

	var can_play = false;

	var board = [];

	var game_is_stop = "The game is stopped";

	function e(string) {
		echo(string);
	}

	function echo(string){
		console.log(string);
	}


	// Listener
	document.getElementById("start_game_button").addEventListener("click", function(){
		init();
	});

	document.getElementById("reset_hand_user").addEventListener("click", function(){

		if (can_play) {
			players[player-1].array_hand_player = create_hand_player();
			end_of_turn();		

		} else {
			display_info(game_is_stop);
		}

	});

	document.getElementById("skip_turn").addEventListener("click", function(){
		if (can_play) {
			end_of_turn();		

		} else {
			display_info(game_is_stop);
		}

	});


	function close(){


		var name = this.getAttribute("name");
		var fieldset;
		var element;
		var element_cross;
		var is_set = false;

		switch(name){
			case "tab_setting":
				is_set = true;

				fieldset = document.getElementById("field_settings");
				element = document.getElementById("content_settings");
				element_cross = document.getElementById("close_setting");
			break;

			case "tab_all_user":
				is_set = true;
				fieldset = document.getElementById("field_displaydata");
				element = document.getElementById("all_users");
				element_cross = document.getElementById("close_data");
			break;

		}


		if (is_set) {

			if (element.style.visibility === "hidden") {
				fieldset.style.height = "auto";
				element.style.height = "auto";
				element.style.visibility = "visible";
				element_cross.innerText = "x";
			} else {
				fieldset.style.height = "35px";
				element_cross.innerText = "+";
				element.display = "none";
				element.style.height = "0px";
				element.style.visibility = "hidden";
			}
		}
	};



	document.getElementById("nbr_player").addEventListener("change", function(){
		nbr_player = this.value;

		var element = document.getElementById("disp_ask_name_user");
		element.innerText = "";

		for (var i = 1; i <= nbr_player; i++) {

			para = document.createElement("p");
			label = document.createElement("label")
			label.innerText = "Name J"+i+ " : ";

			input = document.createElement("input");
			input.value = 'player'+i;
			input.name = input.value + '_name';
			input.id = input.name;
			input.type = 'text';


			para.appendChild(label);
			para.appendChild(input);
			element.appendChild(para);

		}

	});


	document.getElementById("propose_word").addEventListener("click", function(){
		if (can_play) {
			tour_joueur();

		}else{
			display_info(game_is_stop);
		}
	});



	// Functions to interact with the HTML part
	
	function display_all_users(string) {
			document.getElementById('all_users').innerText = string;
	}

	function display_on_board_table(string) {
			document.getElementById('displayBoardTable').innerText = string;
	}

	function display_on_board(string) {
			document.getElementById('displayBoard').innerText = string;
	}


	function display_void(string){
			document.getElementById('display_void').innerText = string;
	}

	function display_user_hand(string){
			document.getElementById('user_hand').innerText = string;
	}

	function display_info(string){
			document.getElementById('display_info').innerText = string;
	}


	var close_class= document.getElementsByClassName("close");

	for (var i = 0; i < close_class.length; i++) {
		close_class[i].addEventListener('click', close, false);
	}

	// point - letter - nbr_of_occurence
	var list_letter_normal_game = [
		[1 , "A", 9],
		[3 , "B", 4],
		[3 , "C", 2],
		[2 , "D", 4],
		[1 , "E",12],
		[4 , "F", 2],
		[2 , "G", 3],
		[4 , "H", 2],
		[1 , "I", 9],
		[8 , "J", 1],
		[5 , "K", 1],
		[1 , "L", 4],
		[3 , "M", 2],
		[1 , "N", 6],
		[1 , "O", 8],
		[3 , "P", 2],
		[10, "Q", 1],
		[1 , "R", 6],
		[1 , "S", 4],
		[1 , "T", 6],
		[1 , "U", 4],
		[4 , "V", 2],
		[4 , "W", 2],
		[8 , "X", 1],
		[4 , "Y", 2]
		[10, "Z", 1]
	];


	var list_letter = [
		[1 , "A", 9],
		[3 , "B", 2],
		[3 , "C", 2],
		[2 , "D", 3],
		[1 , "E",15],
		[4 , "F", 2],
		[2 , "G", 2],
		[4 , "H", 2],
		[1 , "I", 8],
		[8 , "J", 1],
		[10, "K", 1],
		[1 , "L", 5],
		[2 , "M", 3],
		[1 , "N", 6],
		[1 , "O", 6],
		[3 , "P", 2],
		[8, "Q", 1],
		[1 , "R", 6],
		[1 , "S", 6],
		[1 , "T", 6],
		[1 , "U", 6],
		[4 , "V", 2],
		[10, "W", 1],
		[10, "X", 1],
		[10, "Y", 1]
		[10, "Z", 1]
	];


	var array_matching_word = [
		["CHAT", "https://media.giphy.com/media/o0vwzuFwCGAFO/giphy.gif"],
		["VIN", "https://media.giphy.com/media/3o6ZtqkheGg2uKq2ty/giphy.gif"],
		["CHIEN", "https://media.giphy.com/media/RQSuZfuylVNAY/giphy.gif"],
		["FATIQUE", "https://media.giphy.com/media/ZLxRWG0vhzpiE/giphy.gif"],
		["BONJOUR", "https://media.giphy.com/media/Cmr1OMJ2FN0B2/giphy.gif"],
		["SALUT", "https://media.giphy.com/media/Cmr1OMJ2FN0B2/giphy.gif"],
		["DANCE", "https://media.giphy.com/media/cyyac9sTiN7ji/giphy.gif"],
		["QUOI", "https://media.giphy.com/media/EsmlrgWNx5v0Y/giphy.gif"],
		["TRISE", "https://media.giphy.com/media/k61nOBRRBMxva/giphy.gif"],
		["MER", "https://media.giphy.com/media/Fc32CJcqXzOXm/giphy.gif"],

		["EE", "https://media.giphy.com/media/k61nOBRRBMxva/giphy.gif"],

	]





	function set_col_and_row(){
		document.getElementById("from_user_row").value = this.getAttribute("i").toString();
		document.getElementById("from_user_col").value = this.getAttribute("j").toString();
		document.getElementById("from_user_word").focus();

	}



	function display_board_table(){
		var element = document.getElementById("displayBoardTable");
		element.innerText = "";

		var table = document.createElement("table");
		var loop = 0;



		for (var i = -1; i < size_board; i++) {
			var tr = document.createElement("tr")

			if (i == -1) {

				for (var k = -1; k < size_board; k++) {
					var td = document.createElement("td");
					td.classList += "table_header";

					if (k == -1) {
						td.innerHTML = "";
					}else{
						td.innerHTML = (k+1);
					}
					tr.appendChild(td);
				}

			}else{

				for (var j = -1; j <size_board; j++) {
					var td = document.createElement("td")
					if (j == -1) {
						td.classList += "table_header";
						td.innerHTML = ++loop;
					}else{
						if (board[i][j] != default_value) {
							td.innerHTML = board[i][j];
							td.classList += "not_empty";
						}else{
							td.innerHTML = "";

						}
						td.classList.add("click_set_value");
						td.setAttribute('i', (i+1));
						td.setAttribute('j', (j+1));
						td.addEventListener("click", set_col_and_row);

						
					}
					


					tr.appendChild(td);
				}
				
			}

				
			table.appendChild(tr);
		}
		element.appendChild(table);


	}


	function create_board(rows) {

		for (var i=0;i<size_board;i++) {
			board[i] = new Array(size_board);
			for (var j = 0; j < board[i].length; j++) {
				board[i][j] = default_value;
			}
		}
	}

	function display_board() {

		var string = "";

		for (var i=-1;i<size_board+1;i++) {
			if (i == -1 || i == size_board) {
				if (i == -1)
					string+= "  -- 1  - 2  - 3  - 4  - 5  - 6  - 7  - 8  - 9 - 10 - 11 - 12 - 13 - 14 - 15 --";
			}else{
				if(i <9){
					string += " ";
				}
				string += i + 1;

				for (var j = -1; j < size_board+1; j++) {
					if (j == -1 || j == size_board) {
						string+= " |";
					}else{
						string += " ";
						string += board[i][j];
						if (j != size_board -1) {
							string += "   ";
						}
					}
				}
			}
			string += "\n";
		}
		return string;
	}

	function display_pioche() {
		var string = "";

		for (var i = 0; i < array_pioche.length; i++) {
			string += array_pioche[i];
		}
		return string;
	}


	function create_pioche(){

		array_pioche = [];		

		for (var i = 0; i < list_letter.length-1; i++) {
			var loop = list_letter[i][2];

			for (var j = 0; j < loop; j++) {
				array_pioche.push(list_letter[i][1]);
			}
		}
	}

	function shuffle_pioche() {

		var currentIndex = array_pioche.length
		var temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array_pioche[currentIndex];
		array_pioche[currentIndex] = array_pioche[randomIndex];
		array_pioche[randomIndex] = temporaryValue;
		}
	}


	function create_hand_player(){
		return transform_string_to_array(tirage(nbr_letter_by_hand));
	}

	function display_hand_player(i){ return [i].array_hand_player.join();}


	function pioche_is_empty(){ return (array_pioche.length === 0); }


	function tour_joueur(){

		if (can_play) {
			if(jouer_word()){
				first_word_set = false;
			}

		} else {
			display_info("The game is stopped");
		}

	}


	function end_of_turn(){
		empty_thefields();

		change_player();


		display_info("Switch player to player " + player);


		display_board_table();
//		display_hand_user();

		display_current_hand();
				

		if (pioche_is_empty()) {
			can_play = false;
			var winer = set_winer();

			display_info("The winer is player: " +winer[0] + " with a score of " + winer[1]);
		}
	}


	function set_winer() {

		var max_score = [-1, 0];

		for (var i = 0; i < players.length; i++) {
			if (players[i].score > max_score[1]) {
				max_score = [i+1, players[i].score];
			}
		}
		return max_score;
	}

	function display_current_hand(instantane= false){
		var element = document.getElementById('current_hand');

		var name = players[player-1].name;
		var score = players[player-1].score;
		var current_hand = players[player-1].array_hand_player;

		element.innerText = "";

		var img = document.createElement("img");
		img.src="https://media.giphy.com/media/nZQIwSpCXFweQ/giphy.gif";
		img.style.width ="50%";
		img.style.margin ="auto";
		img.style.display = "block";


		element.appendChild(img);

		if (instantane) {
			element.innerText += "\nCurrent Player: "+ player;
			element.innerText += "\n Name : "+ name;
			element.innerText += "\n Score : "+ score;
			element.innerText += "\n Hand: "+ current_hand.join("");
			display_info("Player: " + player);
		}else{
			setTimeout(function(){
				display_info("Player: " + player);
				element.innerText += "\nCurrent Player: "+ player;
				element.innerText += "\n Name : "+ name;
				element.innerText += "\n Score : "+ score;
				element.innerText += "\n Hand: "+ current_hand.join("");
				
			}, 5000);
			
		}





	}

	function jouer_word(){

		var data=get_data();

		var array = players[(player-1)].array_hand_player;

		display_info("");


		if (not_empty_field(data)) {
			if (word_can_fit(data)) {
				if (first_word_set || board_contain_on_letter(data)) {
					if(letter_match(data)){
						if(compareWordUserProposer(data.word, array)){

							setWordOnBoard(data);
							word = remove_leter(data);

							test_for_a_gif(data.word);

							fill_player_hand();

							players[player-1].score += score(word);
							end_of_turn();

							return true;

						}else{
						display_info("You don't have all the pieces required");
						}
					}else{
						display_info("The letter proposed does not fit with the letter on the board");
					}
				}else{
					display_info("The word has to contain a letter set on the board");
				}
			}else{
				display_info("The word can fit, in this specific area");
			}
		}else{
			display_info("One field is empty, try again");
		}
		return false;

	}


	function fill_player_hand(){
		var nbr_missing_letter = nbr_letter_by_hand - players[player-1].array_hand_player.length;

		var array = transform_string_to_array(tirage(nbr_missing_letter));

		for (var i = 0; i < array.length; i++) {
			players[player-1].array_hand_player.push(array[i]);
		}

	}


	function test_for_a_gif(word) {

		var array_matching_word_name= [];


		for (var i = 0; i < array_matching_word.length; i++) {
			array_matching_word_name.push(array_matching_word[i][0].toUpperCase());
		}

		if (array_matching_word_name.includes(word)) {
			var element = document.getElementById('modal_content');
			element.innerText = "";

			var index = array_matching_word_name.indexOf(word);
			var img = document.createElement("img");

			img.src=array_matching_word[index][1];
			img.style.width ="50%";
			img.style.margin ="auto";
			img.style.display = "block";

			e(img.src);


			element.appendChild(img);

			modal.style.display = "block";

			setTimeout(function(){
				modal.style.display = "none";
				element.innerText += "";
				
			}, 5000);
		}
	}


	function empty_thefields(){
		document.getElementById("from_user_word").value = "";
		document.getElementById("from_user_col").value = "";
		document.getElementById("from_user_row").value = "";

	}

	function remove_leter(data){
		var word_set = "";
		for(var s in data.word){

			for (var i = 0; i < players[player-1].array_hand_player.length; i++) {

				if(players[player-1].array_hand_player[i] == data.word[s]){

					word_set += players[player-1].array_hand_player[i];


					players[player-1].array_hand_player.splice(i, 1);
					break;
				}
			}
		}


		return word_set;
	}

	function transform_string_to_array(string) { return string.split(""); }



	function tirage(val_max){
		var string = "";

		val_max = Math.min(val_max, array_pioche.length);

		for (var i = 0; i <= val_max-1; i++) {
			string += array_pioche.pop();
		}
		return string;
	}

	function score(word){

		var score = 0;
		for (var char in word) {
			for (var i = 0; i < list_letter.length; i++) {
				if(list_letter[i][1] === word[char]){
					score += list_letter[i][0];
					break;
				}
			}
		}
		return score;
	}


	function letter_match(data){

		var char = "";
		var loop = 0;
		var col = parseInt(data.col)-1;
		var row = parseInt(data.row)-1;
		var size = data.word.length;



		switch(parseInt(data.dir)){
			case 1:
				var stop = row-size;
				for (var i = row; i > stop; i--) {

					char =  data.word.charAt(loop);
					loop++;

					if (board[i][col] != default_value && board[i][col] != char) {
						return false;
					}

				}
				return true;

			break;
			case 2:

				var stop = col+size;
				for (var i = col; i < stop; i++) {
					char =  data.word.charAt(loop);
					loop++;

					if (board[row][i] !== default_value && board[row][i] !== char) {
						return false;
					}

				}
				return true;

				return val;
			break;
			case 3:
				var stop = row+size;
				for (var i = row; i < stop; i++) {
					char =  data.word.charAt(loop);
					loop++;

					if (board[i][col] !== default_value && board[i][col] !== char) {
						return false;
					}
				}
				return true;
			break;
			case 4:
				var stop = col - size;
				for (var i = col; i > stop; i--) {

					char =  data.word.charAt(loop);
					loop++;

					if (board[row][i] !== default_value && board[row][i] !== char) {
						return false;
					}
				}
				return true;
			break;
		}
	}


	function setWordOnBoard(data) {
		var size = data.word.length;

		// Nick ta mere de putain de type de string
		var col = parseInt(data.col)-1;
		var row = parseInt(data.row)-1;

		var loop = 0;
		switch(parseInt(data.dir)){
			case 1:
				var stop = row-size;
				for (var i = row; i > stop; i--) {
					board[i][col] = data.word.charAt(loop);
					loop++;
				}

			break;
			case 2:

				var stop = col+size;
				for (var i = col; i < stop; i++) {

					board[row][i] = data.word.charAt(loop);
					loop++;

				}
			break;
			case 3:
				var stop = row+size;
				for (var i = row; i < stop; i++) {
					board[i][col] = data.word.charAt(loop);
					loop++;
				}
				return true;
			break;
			case 4:
				var stop = col - size;
				for (var i = col; i > stop; i--) {
					board[row][i] = data.word.charAt(loop);
					loop++;
				}
			break;


		}



	}



	function board_contain_on_letter(data) {
		var size = data.word.length;

		// Nick ta mere de putain de type de nom
		var col = data.col-1;
		var row = data.row -1;


		switch(parseInt(data.dir)){
			case 1:
				var stop = row-size;
				for (var i = row; i > stop; i--) {

					if (board[i][col] !== default_value) {
						break;
					}

					if (i == stop+1) {
						return false;
					}
				}
				return true;

			break;
			case 2:

				var stop = col+size;
				for (var i = col; i < stop; i++) {

					if (board[row][i] !== default_value) {
						break;
					}
					if (i == stop-1) {
						return false;
					}
				}
				return true;

				return val;
			break;
			case 3:
				var stop = row+size;
				for (var i = row; i < stop; i++) {
					if (board[i][col] !== default_value) {
						break;
					}

					if (i == stop-1) {
						return false;
					}
				}
				return true;
			break;
			case 4:
				var stop = col - size;
				for (var i = col; i > stop; i--) {
					if (board[row][i] !== default_value) {
						break;
					}

					if (i == stop+1) {
						return false;
					}
				}
				return true;
			break;


		}


	}



	function not_empty_field(data) {
		return (!(data.word === "") || (data.col === "") || (data.row === "") || (data.dir === ""));
	}



// <option value="1" selected="selected">Up</option>
// <option value="2">Right</option>
// <option value="3">Bottom</option>
// <option value="4">Left</option>
	function word_can_fit(data){
		var size = data.word.length;

		// Nick ta mere de putain de type de nom
		var col = data.col;
		var row = data.row;

		switch(parseInt(data.dir)){
			case 1:
				var val = (row - size)>=0;
				return val;
			break;
			case 2:
				var val = (col + size)<size_board+2;
				return val;
			break;
			case 3:
			var val = (row + size)<size_board+2;
				return val;
			break;
			case 4:
				var val = (col - size)>=0;
				return val;
			break;
		}
	}

	function get_data(){
		var data = {}; 

		data.word = document.getElementById("from_user_word").value;
		data.word = data.word.toUpperCase();
		data.dir = parseInt(document.getElementById("from_user_dir").value);
		data.col = parseInt(document.getElementById("from_user_col").value);
		data.row = parseInt(document.getElementById("from_user_row").value);

		return data;


	}


	function change_player(){
			player = ((player == nbr_player) ? 1 :++player);
	}

	function set_letter_board(row, collumn, letter,) {
		board[row][collumn] = letter;
	}

	function get_the_first_letter() {
		return array_pioche.pop();
	}

	function nbr_tile_player(i) {
		return (i <= nbr_player) ? players[i].array_hand_player.length :0;

	}

	function count(arr){

		array_buffer = [];
		arr.word.forEach(function(x) { array_buffer[x] = (array_buffer[x] || 0)+1; });

		array_return = [];
		for (var key in array_buffer) {
			array_return.push([key, array_buffer[key]]);
		}
		return array_return;
	}

	function compareWordUserProposer(word_proposed, in_array_user) {

		word_proposed = word_proposed.split("");

		var word_proposed_array = [];
		word_proposed_array.word = word_proposed;
		word_proposed_array.array = count(word_proposed_array);

		var array_user = [];
		array_user.word = in_array_user;
		array_user.array = count(array_user);

		var match = false;
		var find = true;
		var index = -1;


		for (var i = 0; i < word_proposed_array.array.length; i++) {

			match = false;
			index = -1;
			for (var j = 0; j < array_user.array.length; j++) {

				if (!match && word_proposed_array.array[i][0] === array_user.array[j][0]) {
					match = true;
					index = j;
				}

			}	

			if (!(match && word_proposed_array.array[i][1] <= array_user.array[index][1])) {
				find = false;
			}
		}
		return find;



	}

	function display_hand_user() {
		var element = document.getElementById('all_users');

		element.innerText = "";

		for (var i = 0; i < nbr_player; i++) {

				var p_player = document.createElement("div");
	
				p_player.innerText += "Player " + (1 + i) + "\n";
				p_player.innerText += "\n    Score: " + players[i].score + "\n";
				p_player.innerText += "\n    hand:  ";

				for(var val in  players[i].array_hand_player){
					var char = players[i].array_hand_player[val];
					p_player.innerText += char;

					element.appendChild(p_player);
				}
		}


	element.appendChild(document.createElement("hr"));

	var pioche = document.createElement("p");
	pioche.innerText = "There is only "+array_pioche.length + " left in the pioche";

	element.appendChild(pioche);


	var whose_turn = document.createElement("p");
	whose_turn.innerText = "Current player : Player "+ player;
	if (players[player-1].name != ("player"+(player-1))) {
		whose_turn.innerText += "\n    "+ players[player-1].name;
	}


	element.appendChild(whose_turn);

	}


	function init(){
		can_play = true;
		create_pioche();
		shuffle_pioche();

		players = [];

		for (var i = 0; i < nbr_player; i++) {
			player = [];
			var name = "player"+(i+1)+"_name";
			player.name = document.getElementById(name).value;
			player.score = 0;
			player.array_hand_player = create_hand_player();

			players.push(player);
		}

		player = 1;

//		display_hand_user();
		display_current_hand(true);


		create_board(15);

		var loop_limit = 0;

		display_board_table();

//		str = display_board();

	}





init();
