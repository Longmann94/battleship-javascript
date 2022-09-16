
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
      }
      else if(grid.classList.contains('submarine')){
        grid.classList.add('hit');
        let foundShip = this.ships.find(ship => ship.name === 'submarine');
        foundShip.hit();
        foundShip.isSunk();
      }
      else if(grid.classList.contains('cruiser')){
        grid.classList.add('hit');
        let foundShip = this.ships.find(ship => ship.name === 'cruiser');
        foundShip.hit();
        foundShip.isSunk();
      }
      else if(grid.classList.contains('patrolBoat')){
        grid.classList.add('hit');
        let foundShip = this.ships.find(ship => ship.name === 'patrolBoat');
        foundShip.hit();
        foundShip.isSunk();
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
      if(checkMove(coordinates)){
        playerGameBoard.receiveAttack(coordinates);
        updateBoard();
        return turn++;
      }
    }
    else if(turn%2 === 0 && playerGameBoard.player.playerName == 'A'){
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

  const randomNum = (min, max) => {
    return Math.floor((Math.random()*max) + min);
  }

  const generatePosition = (ship, align, playerBoard) => {
    let shipLength = ship.length;
    let posArr = [];
    let truthArr = [];
    let playerName = playerBoard.player.playerName;
    let startingPoint = randomNum(1, 98);

    if(align === 'horizontal'){
      for(let i = 0; i < shipLength; i++)
      {
        posArr.push(startingPoint++);
      }
    }else if(align === 'vertical'){
      posArr.push(startingPoint);
      for(let i = 0; i < shipLength - 1; i++){
        posArr.push(posArr[i]+10);
      }
    }

    if(posArr.find(element => element > 99)){

      return generatePosition(ship, align, playerBoard);
    }else if(posArr.find(element => element%10 === 9) && posArr.find(element => element%10 === 0)){

      return generatePosition(ship, align, playerBoard);
    }

    posArr.forEach(num => truthArr.push(document.querySelector(`#${playerName+num}`).classList.contains('battleship')));
    if(truthArr.includes(true)){

      return generatePosition(ship, align, playerBoard);
    }

    return posArr;
  }



  const initializeGame = () => {
    //add title
    document.querySelector('.title').textContent = 'BattleShip!';
    document.querySelector('#player1').textContent = 'player 1';
    document.querySelector('#player2').textContent = 'player 2';

    //create players
    player1 = new Player('A', false);
    player2 = new Player('B', true);

    //create all ships
    let aircraftCarrier = new Ship('aircraftCarrier', 5, 0, false);
    let submarine = new Ship('submarine', 4, 0, false);
    let cruiser = new Ship('cruiser', 3, 0, false);
    let patrolBoat = new Ship('patrolBoat', 2, 0, false);

    let aircraftCarrier1 = new Ship('aircraftCarrier', 5, 0, false);
    let submarine1 = new Ship('submarine', 4, 0, false);
    let cruiser1 = new Ship('cruiser', 3, 0, false);
    let patrolBoat1 = new Ship('patrolBoat', 2, 0, false);

    //create board
    player1Gameboard = new Gameboard(100, player1, [aircraftCarrier, submarine, cruiser, patrolBoat]);
    player2Gameboard = new Gameboard(100, player2, [aircraftCarrier1, submarine1, cruiser1, patrolBoat1]);

    player1Gameboard.createGameBoard();
    player2Gameboard.createGameBoard();

    playerGridA = document.querySelector(`#${player1.playerName}`).childNodes;
    playerGridB = document.querySelector(`#${player2.playerName}`).childNodes;

    playerGridA.forEach(grid => grid.addEventListener('click', (e) => selectGrid(e, player1Gameboard)));
    playerGridB.forEach(grid => grid.addEventListener('click', (e) => selectGrid(e, player2Gameboard)));

    async function player1SetShips(){

      try{
        aircraftCarrier.position = await generatePosition(aircraftCarrier, 'horizontal', player1Gameboard);
        player1Gameboard.placeShip(aircraftCarrier);
        submarine.position = await generatePosition(submarine, 'vertical', player1Gameboard);
        player1Gameboard.placeShip(submarine);
        cruiser.position = await generatePosition(cruiser, 'vertical', player1Gameboard);
        player1Gameboard.placeShip(cruiser);
        patrolBoat.position = await generatePosition(patrolBoat, 'horizontal', player1Gameboard);
        player1Gameboard.placeShip(patrolBoat);
      } catch (err){
        console.log(err);
      }

    }

    player1SetShips();

    async function player2SetShips(){

      try{
        aircraftCarrier1.position = await generatePosition(aircraftCarrier1, 'horizontal', player2Gameboard);
        player2Gameboard.placeShip(aircraftCarrier1);
        submarine1.position = await generatePosition(submarine1, 'vertical', player2Gameboard);
        player2Gameboard.placeShip(submarine1);
        cruiser1.position = await generatePosition(cruiser1, 'vertical', player2Gameboard);
        player2Gameboard.placeShip(cruiser1);
        patrolBoat1.position = await generatePosition(patrolBoat1, 'horizontal', player2Gameboard);
        player2Gameboard.placeShip(patrolBoat1);
      } catch (err){
        console.log(err);
      }

    }

    player2SetShips();
  }

  const updateBoard = () => {

    let boardA = document.querySelector(`#${player1.playerName}`);
    let boardB = document.querySelector(`#${player2.playerName}`);

    if(player1Gameboard.checkAllShipsSunk() === true){
      document.querySelector('.title').textContent = 'player 1 ships are all destroyed, player 2 Wins!';
      //clone elements to remove all EventListeners
      boardA.replaceWith(boardA.cloneNode(true));
      boardB.replaceWith(boardB.cloneNode(true));
    }else if (player2Gameboard.checkAllShipsSunk() === true){
      document.querySelector('.title').textContent = 'player 2 ships are all destroyed, player 1 Wins!';
      boardA.replaceWith(boardA.cloneNode(true));
      boardB.replaceWith(boardB.cloneNode(true));
    }
  }

  return {
     initializeGame
  }
})();


gameModule.initializeGame();



// module.exports = {Ship, Gameboard, Player};
