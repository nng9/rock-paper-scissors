// All code should be written in this file.
let playerOneMoveOneType, playerOneMoveOneValue,
		playerOneMoveTwoType, playerOneMoveTwoValue,
		playerOneMoveThreeType, playerOneMoveThreeValue,
		playerTwoMoveOneType, playerTwoMoveOneValue,
		playerTwoMoveTwoType, playerTwoMoveTwoValue,
		playerTwoMoveThreeType, playerTwoMoveThreeValue;

const setPlayerMoves = (player, moveOneType, moveOneValue,
	moveTwoType, moveTwoValue, moveThreeType, moveThreeValue) => {
	if(player !== 'Player One' && player !== 'Player Two') {
		return;
	}	

	if(
			(moveOneType !== 'rock' && moveOneType !== 'paper' && moveOneType !== 'scissors') ||
			(moveTwoType !== 'rock' && moveTwoType !== 'paper' && moveTwoType !== 'scissors') ||
			(moveThreeType !== 'rock' && moveThreeType !== 'paper' && moveThreeType !== 'scissors')
		) {
		return;
	}

	if(
			(moveOneValue < 1 || moveOneValue > 99) ||
			(moveTwoValue < 1 || moveTwoValue > 99) ||
			(moveThreeValue < 1 || moveThreeValue > 99) ||
			(moveOneValue + moveTwoValue + moveThreeValue) > 99 ||
			moveOneValue === undefined || moveTwoValue === undefined ||
			moveThreeValue === undefined
		) {
		return;
	}

	//Reaching this point then we belive the inputs are valid
	if(player === 'Player One') {
		playerOneMoveOneType = moveOneType;
		playerOneMoveOneValue = moveOneValue;
		playerOneMoveTwoType = moveTwoType;
		playerOneMoveTwoValue = moveTwoValue;
		playerOneMoveThreeType = moveThreeType;
		playerOneMoveThreeValue = moveThreeValue;
	} else {
		playerTwoMoveOneType = moveOneType;
		playerTwoMoveOneValue = moveOneValue;
		playerTwoMoveTwoType = moveTwoType;
		playerTwoMoveTwoValue = moveTwoValue;
		playerTwoMoveThreeType = moveThreeType;
		playerTwoMoveThreeValue = moveThreeValue;
	}
};

// Takes in an array and checks that all values are defined
const checkValid = (array) => {
	for(element of array) {
		if(element === undefined) {
			return false;
		}
	}
	return true;
};

const getRoundWinner = (round) => {
	if (round !== 1 && round !== 2 && round !== 3) {
		return null;
	}
	
	let p1Type;
	let p1Value;
	let p2Type;
	let p2Value;

	if(round === 1) {
		if(checkValid([playerOneMoveOneValue, playerOneMoveOneType,
			playerTwoMoveOneValue, playerTwoMoveOneType])) {

			p1Type = playerOneMoveOneType;
			p1Value = playerOneMoveOneValue;
			p2Type = playerTwoMoveOneType;
			p2Value = playerTwoMoveOneValue;

		} else { return null; }

	} else if(round === 2) {
		if(checkValid([playerOneMoveTwoValue, playerOneMoveTwoType,
			playerTwoMoveTwoValue, playerTwoMoveTwoType])) {

			p1Type = playerOneMoveTwoType;
			p1Value = playerOneMoveTwoValue;
			p2Type = playerTwoMoveTwoType;
			p2Value = playerTwoMoveTwoValue;

		} else { return null; }

	} else {
		if(checkValid([playerOneMoveThreeValue, playerOneMoveThreeType,
			playerTwoMoveThreeValue, playerTwoMoveThreeType])) {
			
			p1Type = playerOneMoveThreeType;
			p1Value = playerOneMoveThreeValue;
			p2Type = playerTwoMoveThreeType;
			p2Value = playerTwoMoveThreeValue;

		} else {return null; }
	}

	const p1W = "Player One";
	const p2W = "Player Two";
	const tie = "Tie";

	if(p1Type === p2Type) {
		if(p1Value > p2Value) {
			return p1W; 
		} else if (p1Value === p2Value) {
			return tie;
		} else {
			return p2W
		}
	} else {
		if(p1Type === 'rock'){
			if(p2Type === 'scissors'){
				return p1W;
			} else {
				return p2W
			}
		} else if(p1Type === 'paper'){
			if(p2Type === 'rock'){
				return p1W;
			} else {
				return p2W;
			}
		} else {
			if(p2Type === 'paper'){
				return p1W;
			} else {
				return p2W;
			}
		}
		
	}	
};

const getGameWinner = () => {
	const inputs = [playerOneMoveOneType, playerOneMoveOneValue,
		playerOneMoveTwoType, playerOneMoveTwoValue,
		playerOneMoveThreeType, playerOneMoveThreeValue,
		playerTwoMoveOneType, playerTwoMoveOneValue,
		playerTwoMoveTwoType, playerTwoMoveTwoValue,
		playerTwoMoveThreeType, playerTwoMoveThreeValue];
	
	if(checkValid(inputs) === false) {
		return null;
	}

	let p1Wins = 0;	
	let p2Wins = 0;

	for(let i = 1; i<4; i++) {
		const result = getRoundWinner(i);
		if(result === "Player One") {
			p1Wins++;
		} else if (result === "Player Two") {
			p2Wins++;
		}
	}

	if(p1Wins > p2Wins) {
		return "Player One";
	} else if(p1Wins < p2Wins) {
		return "Player Two";
	} else {
		return "Tie";
	}
};

const setComputerMoves = () => {
	let remainingPoints = 97;

	for (i = 1; i < 4; i++) {
		let type;
		const choice = Math.floor(Math.random()*3);
		
		if(choice === 0) {
			type = 'rock';
		} else if (choice === 1) {
			type = 'paper';
		} else {
			type = 'scissors';
		}

		const value = Math.floor(Math.random()*remainingPoints + 1);
		remainingPoints = remainingPoints - value;
		
		if (remainingPoints <= 0) {
			remainingPoints = 1;
		}

		if (i === 1) {
			playerTwoMoveOneType = type;
			playerTwoMoveOneValue = value;
		} else if (i === 2) {
			playerTwoMoveTwoType = type;
			playerTwoMoveTwoValue = value;
		} else {
			playerTwoMoveThreeType = type;
			playerTwoMoveThreeValue = 99 - playerTwoMoveOneValue - playerTwoMoveTwoValue;
		}
	}
}




