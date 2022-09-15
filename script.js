
class Ship{
  constructor(name, length, hitCount, sunk, position){
    this.name = name;
    this.length = length;
    this.hitCount = hitCount;
    this.sunk = sunk;
    this.position = position;
  }

  hit(){
    this.hitCount++;
  }

  isSunk(){
    if(this.hitCount == this.length){
      this.sunk = true;
    }
  }
}

class Gameboard{
   constructor(size, player, ships){
     this.size = size;
     this.player = player;
     this.ships = ships;
   }

   createGameBoard(){
      const mainCont = document.querySelector('.main-container');
      const gameBoard = document.createElement('div');
      gameBoard.classList.add('gameboard');
      gameBoard.id = this.player.playerName;
      mainCont.append(gameBoard);

      for(let i = 0; i < 100; i++){
        const grid = document.createElement('div');
        grid.classList.add('gameGrid');
        grid.id = this.player.playerName+i;
        gameBoard.append(grid);
      }

   }

   placeShip(ship){
     let shipSize = ship.length;
     let shipPos = ship.position;

     for(let i = 0; i < shipSize; i++){
         let shipGrid = document.querySelector(`#${this.player.playerName}${shipPos[i]}`);
         shipGrid.classList.add('battleship', `${ship.name}`);
       }

     }

   receiveAttack(coordinates){
      let grid = document.querySelector(`#${coordinates}`);

      if(grid.classList.contains('aircraftCarrier')){
        grid.classList.add('hit');
        let foundShip = this.ships.find(ship => ship.name === 'aircraftCarrier');
        foundShip.hit();
        foundShip.isSunk();
        console.log(foundShip);
      }
      else if(grid.classList.contains('submarine')){
        grid.classList.add('hit');
        let foundShip = this.ships.find(ship => ship.name === 'submarine');
        foundShip.hit();
        foundShip.isSunk();
        console.log(foundShip);
      }
      else if(grid.classList.contains('cruiser')){
        grid.classList.add('hit');
        let foundShip = this.ships.find(ship => ship.name === 'cruiser');
        foundShip.hit();
        foundShip.isSunk();
        console.log(foundShip);
      }
      else if(grid.classList.contains('patrolBoat')){
        grid.classList.add('hit');
        let foundShip = this.ships.find(ship => ship.name === 'patrolBoat');
        foundShip.hit();
        foundShip.isSunk();
        console.log(foundShip);
      }
      else{
        grid.classList.add('miss');
      }
   }

   checkAllShipsSunk(){
    let truthArr = [];
    this.ships.forEach(ship => truthArr.push(ship.sunk));
    return truthArr.every(element => element === true);
   }
}

class Player{
  constructor(playerName, npc){
    this.playerName = playerName;
    this.npc = npc;
  }
}

//DOM interaction

const gameModule = (() => {

  let player1;
  let player2;
  let player1Gameboard;
  let player2Gameboard;
  let playerGridA;
  let playerGridB;
  let turn = 1;

  const selectGrid = (e, playerGameBoard) => {
    let coordinates= e.target.id;
    console.log(turn);
    console.log(playerGameBoard.player.playerName);
    if(turn%2 === 1 && playerGameBoard.player.playerName == 'B'){
      console.log('we got called!');
      if(checkMove(coordinates)){
        playerGameBoard.receiveAttack(coordinates);
        updateBoard();
        return turn++;
      }
    }
    else if(turn%2 === 0 && playerGameBoard.player.playerName == 'A'){
        console.log('we got called!');
        if(checkMove(coordinates)){
          playerGameBoard.receiveAttack(coordinates);
          updateBoard();
          return turn++;
      }
    }
  }

  const checkMove = (id) => {
    let grid = document.querySelector(`#${id}`);
    if(grid.classList.contains('hit') || grid.classList.contains('miss')){
      return false;
    }else{
      return true;
    }
  }

  const initializeGame = () => {
    //create all ships
    let aircraftCarrier = new Ship('aircraftCarrier', 5, 0, false, ['11', '21', '31', '41', '51']);
    let submarine = new Ship('submarine', 4, 0, false, ['13','23','33','43']);
    let cruiser = new Ship('cruiser', 3, 0, false, ['15', '25', '35']);
    let patrolBoat = new Ship('patrolBoat', 2, 0, false, ['17', '27']);

    let aircraftCarrier1 = new Ship('aircraftCarrier', 5, 0, false, ['11', '21', '31', '41', '51']);
    let submarine1 = new Ship('submarine', 4, 0, false, ['13','23','33','43']);
    let cruiser1 = new Ship('cruiser', 3, 0, false, ['15', '25', '35']);
    let patrolBoat1 = new Ship('patrolBoat', 2, 0, false, ['17', '27']);
    //create players
    player1 = new Player('A', false);
    player2 = new Player('B', false);

    //create board
    player1Gameboard = new Gameboard(100, player1, [aircraftCarrier, submarine, cruiser, patrolBoat]);
    player2Gameboard = new Gameboard(100, player2, [aircraftCarrier1, submarine1, cruiser1, patrolBoat1]);

    player1Gameboard.createGameBoard();
    player2Gameboard.createGameBoard();

    player1Gameboard.ships.forEach(ship => player1Gameboard.placeShip(ship));
    player2Gameboard.ships.forEach(ship => player2Gameboard.placeShip(ship));

    playerGridA = document.querySelector(`#${player1.playerName}`).childNodes;
    playerGridB = document.querySelector(`#${player2.playerName}`).childNodes;

    playerGridA.forEach(grid => grid.addEventListener('click', (e) => selectGrid(e, player1Gameboard)));
    playerGridB.forEach(grid => grid.addEventListener('click', (e) => selectGrid(e, player2Gameboard)));
  }

  const updateBoard = () => {
    if(player1Gameboard.checkAllShipsSunk() === true){
      console.log('player 1 ships are all sunk, player 2 Wins!');
    }else if (player2Gameboard.checkAllShipsSunk() === true){
      console.log('player 2 ships are all sunk, player 1 Wins!');
    }
  }

  return {
     initializeGame
  }
})();


gameModule.initializeGame();



// module.exports = {Ship, Gameboard, Player};
