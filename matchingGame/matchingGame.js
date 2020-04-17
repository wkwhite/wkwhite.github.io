// make array of 8 images (doubled)
// randomly select number from 1-17
// put images in randomImages array and also in usedImages array

var tiles = document.querySelectorAll(".square");
var sams = ["<img src='s1.jpg'>","<img src='s2.jpg'>","<img src='s3.jpg'>","<img src='s4.jpg'>",
"<img src='s5.jpg'>","<img src='s6.jpg'>","<img src='s7.jpg'>","<img src='s8.jpg'>",
"<img src='s1.jpg'>","<img src='s2.jpg'>","<img src='s3.jpg'>","<img src='s4.jpg'>",
"<img src='s5.jpg'>","<img src='s6.jpg'>","<img src='s7.jpg'>","<img src='s8.jpg'>"];
var samsCopy = sams.slice();
var flippedTiles = [];
var gameOver = false;
var numMatched = 0;
var newGame = document.querySelector("#reset");
var winning = document.querySelector("#winning");

function randUpTo(max){
  /*Retuns a random integer between 0 and
  max arg (exclusive)*/
  num = Math.floor(Math.random() * max);
  return num
}

function choose(arr){
  /*Selects a random element in array, removes from
  array, and returns selected element.*/
  var index = randUpTo(arr.length);
  var returnVal = arr[index];
  arr.splice(index, 1);
  return returnVal;
}

function flip(tile){
  if(tile.classList.contains("transparent")){
    //alter display
    tile.classList.remove("transparent");
    //add to flippedTiles array
    flippedTiles.push(tile);
  }
}

function unflipTiles(){
  //alter display
  flippedTiles[0].classList.add("transparent");
  flippedTiles[1].classList.add("transparent");
  //empty flippedTiles
  flippedTiles = [];
}

function updateGameState(){
  if (flippedTiles.length == 2){
    //If the tiles match...
    if(flippedTiles[0].innerHTML===flippedTiles[1].innerHTML){
      numMatched += 2;

      flippedTiles[0].classList.add("matched");
      flippedTiles[1].classList.add("matched");

      flippedTiles = [];
    } else {
      setTimeout(unflipTiles, 1);
    }
  }
  if(numMatched === tiles.length) {
    gameOver = true;
    newGame.textContent = "Play Again?";
    winning.innerHTML="<img src='winner2.png'>";
  }
}

function reset(){
  samsCopy = sams.slice();
  for(var i = 0; i < tiles.length; i++){
    tiles[i].innerHTML = choose(samsCopy);
    tiles[i].classList.add("transparent");
    tiles[i].classList.remove("matched")
    newGame.textContent = "New Sams";
    winning.innerHTML="";
    numMatched = 0;
  }
}

for(var i = 0; i < tiles.length; i++){
  tiles[i].innerHTML = choose(samsCopy);
  tiles[i].classList.add("transparent");
}

for(var i = 0; i < tiles.length; i++){
  tiles[i].addEventListener("click", function(){
    flip(this);
    updateGameState();
  });
}

newGame.addEventListener("click", function(){
  reset();
});

winning.addEventListener("click",function(){
  reset();
});
