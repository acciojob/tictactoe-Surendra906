//your JS code here. If required.
document.getElementById('submit').addEventListener('click',function () {
	const player1=document.getElementById('player 1').value.trim();
	const player2=document.getElementById('player 2').value.trim();
	if(!player1||!player2){
		alert('please enter names for both players.');
		return;
	}

	document.getElementById('player-input-section').style.display='none';
	document.getElementById('game-section').style.display='block';
	const messageDiv=document.querySelector('.message');
	let currentPlayer=player1;
	let currentSymbol='x';
	let boardState=Array(9).fill(null);
	let gameActive=true;

	messageDiv.textContent=`${currentPlayer}, you're up`;
	const winningCombinations=[
		[0,1,2], [3,4,5],[6,7,8],
		[0,3,6],[1,4,7],[2,5,8],
		[0,4,8],[2,4,6]
	];

	const cells=document.querySelectorAll('.cell');
	cells.forEach((cell,index)=>{
		cell.addEventListener('click',function(){
       if(!gameActive||boardState[index]!==null) return;
			boardState[index]=currentSymbol;
			cell.textContent=currentSymbol;

			let roundWon=winningCombinations.some(combination=>{
				return combination.every(i=>boardState[i]===currentSymbol);
			});
			if(roundWon){
				messageDiv.textContent=`${currentPlayer},congrulations you won!`;
				gameActive=false;
				return;
			}
			if(!boardState.includes(null)){
				messageDiv.textContent=`It's a draw`;
				gameActive=false;
				return;
			}
			if(currentPlayer===player1){
				currentPlayer=player2;
				currentSymbol='o';
			}else{
				currentPlayer=player1;
				currentSymbol='x';
			}
			messageDiv.textContent=`${currentPlayer}, you're up`;
		});
	});
});