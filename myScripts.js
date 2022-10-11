// We prefer to use let keyword instead of var!
var playerone,playertwo;
var player1color = 'rgb(244, 65, 65)';
var player2color = 'rgb(66, 134, 244)';


const startBtn= document.getElementById("start");
const nameInput= document.getElementById('nameInput')
let playtTime = document.getElementById("timeforplay")

var timer;
var timeLeft;

async function inputs(){
  startBtn.style.display="none";
  nameInput.style.display="block";
}
function Close(){
  nameInput.style.display="none";
  startBtn.style.display="block";
}

var currentPlayer=1;
var currentName=playerone;
var currentColor=player1color;

// Used to make changes when a move is made or timer runs out
function makeMove(){
    currentPlayer = currentPlayer * -1;
    if (currentPlayer === 1){
      currentName = playerone;
      $('.plyr1').text(currentName + ", it is your turn!").css('color','red');
      $('#timer-wrap').css('background-color', 'red');
      $('.plyr1').css('font-weight','bolder');
      $('.plyr2').text(playertwo).css('font-weight','lighter');
      currentColor = player1color;
    }
    else {
      currentName = playertwo;
      $('.plyr2').text(currentName + ", it is your turn!").css('color','blue');
      $('#timer-wrap').css('background-color', 'blue');
      $('.plyr2').css('font-weight','bolder');
      $('.plyr1').text(playerone).css('font-weight','lighter');
      currentColor = player2color;
    }
}

async function namesInput(){
  const nameInput=await document.getElementById('nameInput')
  nameInput.style.display="none";
  const footer=await document.querySelectorAll('.footer')[0];
  footer.style.position="unset";
  const container= await document.getElementById("gamepage");
  container.style.display="block";
  const plr1= await document.getElementById("player1")
  playerone=plr1.value;
  const plr2= await document.getElementById("player2")
  playertwo=plr2.value;
  if(playerone=="" || playerone==null)
    playerone="player 1"
  if(playertwo==="" || playertwo==null)
    playertwo="player 2"
  // Start with Player 1

  $('.plyr1').text(playerone + ", it is your turn!").css('color','red');
  $('.plyr2').text(playertwo).css('color','blue');
  $('.plyr1').css('font-weight','bolder');
  $('.plyr2').css('font-weight','lighter');


  $('.board button').on('click', function(){

  	var col = $(this).closest('td').index();

  	var bottomAvail = checkBottom(col);

  	changeColor(bottomAvail, col, currentColor);

  	if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
  		$('h1').text(currentName + " You have won!");
  		$('h3').fadeOut('fast');
  		$('h2').fadeOut('fast');
      clearInterval(timer);
      document.getElementById("timer-wrap").style.display = "none";
  	}

  	makeMove();
  });
}

//grab elements on table
var game_on = true;
var table = $('table tr');



function reportWin(rowNum, colNum) {
	console.log("You won starting at this row, col");
	console.log(rowNum);
	console.log(colNum);
}

//toggle color for element
function changeColor(row,col,color){
  return table.eq(row).find('td').eq(col).find('button').css('background-color',color);

}


function returnColor(row,col){
  return table.eq(row).find('td').eq(col).find('button').css('background-color');
}


function checkBottom(col){
  var colorReport=returnColor(5,col);
  for (var row = 5; row > -1; row--) {
    colorReport=returnColor(row,col);
    if (colorReport ==='rgb(128, 128, 128)'){
      return row
    }
  }
}


function colorMatchCheck(one,two,three,four){
  return (one===two && one===three && one===four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}


// Check for Horizontal Wins
function horizontalWinCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row,col+1) ,returnColor(row,col+2), returnColor(row,col+3))) {
        console.log('horiz');
        return true;
      }else {
        continue;
      }
    }
  }
}


// Check for vertical wins
function verticalWinCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 7; col++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col) ,returnColor(row+2,col), returnColor(row+3,col))) {
        console.log('vertical');
        return true;
      }else {
        continue;
      }
    }
  }
}

// Check for diagonal wins
function diagonalWinCheck(){
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))) {
        console.log('diag');
        reportWin(row,col);
        return true;
      }else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
        console.log('diag');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

// Skips the current player if the timer runs out
function skipCurrentPlayer() {
  // this.currentPlayer = this.currentPlayer * -1;
  console.log(this.currentPlayer);
  makeMove();
  startTimer();
}

//Updates timer on the UI
function updateTimer() {
  timeLeft = timeLeft - 1;
  if(timeLeft >= 0)
    $('#timer').html(timeLeft);
  else {
    skipCurrentPlayer();
  }
}

// Starts the timer when the move is made
function startTimer() {
  // timeLeft is assigned the value given by the user 
  if(playtTime.value == ""){
    timeLeft = 31;
  }
  else timeLeft = playtTime.value;
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
  updateTimer();
}
