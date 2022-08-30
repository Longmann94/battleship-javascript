
class Ship{
  constructor(name, length, hitCount, sunk){
    this.name = name;
    this.length = length;
    this.hitCount = hitCount;
    this.sunk = sunk;
  }

  hit(){
    this.length++;
  }

  isSunk(length, hitCount){
    if(hitCount >= length){
      this.sunk = true;
    }
  }

}


class Gameboard{
   constructor(length, width, player){
     this.length = length;
     this.width = width;
     this.player = player;
   }

   placeShip(ship, position, alignment){

     let shipSize = ship.length;
     let xCoord = Number(position.slice(0, 1));
     let yCoord = Number(position.slice(1, 2));
     let shipCoordArr = [];

     for(let i = 0; i < ship.length; i++){

       if(alignment == 'vertical'){
         shipCoordArr.push(String(xCoord) + (yCoord - i));
       }

       else if(alignment == 'horizontal'){
         shipCoordArr.push((xCoord + i) + String(yCoord));
       }
     }
     return shipCoordArr;
   }

   receiveAttack(coordinates){
      if(coordinates == 'ship'){
        //hit ship.hit();

      }

   }

   gridStatus(status){

     if(status == 'hit'){
       //grid hit
     }

     if(status == 'miss'){
       //miss
     }
   }

   checkShips(gamegrid){
     //check if any ship grids are left
   }
}

class Player{
  constructor(playerName, npc, gameboard){
    this.playerName = playerName;
    this.npc = npc;
    this.gameboard = gameboard;
  }

  playMove(coordinate){
    this.gameboard.receiveAttack(coordinate, )
  }

}


module.exports = {Ship, Gameboard, Player};
