
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

  isSunk(length, hitCount){
    if(hitCount = length){
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
        this.ships[aircraftCarrier].hit();
        this.ships[aircraftCarrier].isSunk();
      }
      else if(grid.classList.contains('submarine')){
        grid.classList.add('hit');
        this.ships[submarine].hit();
        this.ships[submarine].isSunk();
      }
      else if(grid.classList.contains('cruiser')){
        grid.classList.add('hit');
        this.ships[cruiser].hit();
        this.ships[cruiser].isSunk();
      }
      else if(grid.classList.contains('patrolBoat')){
        grid.classList.add('hit');
        this.ships[patrolBoat].hit();
        this.ships[patrolBoat].isSunk();
      }
      else{
        grid.classList.add('miss');
      }

      checkAllShipsSunk();
   }

   checkAllShipsSunk(){
    let truthArr = [];
    this.ships.forEach(ship => truthArr.push(ship.sunk));
    console.log('all ships are lost: ' + truthArr.every(element => element === true));
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

  const selectGrid = (e) => {
    return e.target.id;
  }

  const playerTurn = (turn, player1, player2, player1Gameboard, player2Gameboard) => {
    const playerGridA = document.querySelector(`#${player1.playerName}`).childNodes;
    const playerGridB = document.querySelector(`#${player2.playerName}`).childNodes;


      if(turn%2 == 0){
        //player 2 turn to select grid
        playerGridB.forEach(grid => grid.removeEventListener('click', (e) => selectGrid(e)));
        playerGridA.forEach(grid => grid.addEventListener('click', (e) => selectGrid(e)));
        console.log(turn);
        turn++
        return updateBoard(turn, player1, player2, player1Gameboard, player2Gameboard);
      }else{
        //player 1 turn to select grid
        playerGridA.forEach(grid => grid.removeEventListener('click', (e) => selectGrid(e)));
        playerGridB.forEach(grid => grid.addEventListener('click', (e) => selectGrid(e)));
        turn++
        return updateBoard(turn, player1, player2, player1Gameboard, player2Gameboard);
      }
  }

  const checkMove = (id) => {
    let grid = document.querySelector(`#${id}`);
  }

  const initializeGame = () => {
    //create all ships
    let aircraftCarrier = new Ship('aircraftCarrier', 5, 0, false, ['11', '21', '31', '41', '51']);
    let submarine = new Ship('submarine', 4, 0, false, ['13','23','33','43']);
    let cruiser = new Ship('cruiser', 3, 0, false, ['15', '25', '35']);
    let patrolBoat = new Ship('patrolBoat', 2, 0, false, ['17', '27']);
    //create players
    let player1 = new Player('A', false);
    let player2 = new Player('B', false);

    //create board
    let player1Gameboard = new Gameboard(100, player1, [aircraftCarrier, submarine, cruiser, patrolBoat]);
    let player2Gameboard = new Gameboard(100, player2, [aircraftCarrier, submarine, cruiser, patrolBoat]);

    player1Gameboard.createGameBoard();
    player2Gameboard.createGameBoard();

    player1Gameboard.ships.forEach(ship => player1Gameboard.placeShip(ship));
    player2Gameboard.ships.forEach(ship => player2Gameboard.placeShip(ship));

    let turn = 1;
    playerTurn(turn, player1, player2, player1Gameboard, player2Gameboard);
  }

  const updateBoard = (turn, player1, player2, player1Gameboard, player2Gameboard) => {
    player1Gameboard.checkAllShipsSunk();
    player2Gameboard.checkAllShipsSunk();
    playerTurn(turn, player1, player2, player1Gameboard, player2Gameboard);
  }

  return {
     initializeGame
  }
})();


gameModule.initializeGame();



// module.exports = {Ship, Gameboard, Player};
