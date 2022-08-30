import {Ship, Gameboard, Player} from './script.js';

const mockShip = new Ship('battleship', 3, 0, false);

//test if Ship object is created with correct values
test('should create an object mockShip', () => {
  expect(mockShip).toBeDefined();
});

test('mockShip should have battleship as value for name', () => {
  expect(mockShip.name).toBe('battleship');
});

test('mockShip should have 3 as value for length', () => {
  expect(mockShip.length).toBe(3);
});

test('mockShip should have 0 as value for hitCount', () => {
  expect(mockShip.hitCount).toBe(0);
});

test('mockShip should have false as value for sunk', () => {
  expect(mockShip.sunk).toBe(false);
});


const mockGameboard = new Gameboard(5, 6, 'player');

//test if gamebord is created with correct values
test('should create an object mockGameboard', () => {
  expect(mockGameboard).toBeDefined();
});

test('mockgameboard should have 5 as value for length', () => {
  expect(mockGameboard.length).toBe(5);
});

test('mockgameboard should have 6 as value for width', () => {
  expect(mockGameboard.width).toBe(6);
});

test('mockgameboard should have player as value for player', () => {
  expect(mockGameboard.player).toBe('player');
});

//test if placeShip is returning an array with correct values using mockShip

const mockPlaceShipHorizontal = mockGameboard.placeShip(mockShip, '11', 'horizontal');
const mockPlaceShipVertical = mockGameboard.placeShip(mockShip, '88', 'vertical');

test('mockPlaceShip should have 3 as value for length', () => {
  expect(mockPlaceShipHorizontal.length).toBe(3);
});

test('mockPlaceShipHorizontal should return an array matching expected array', () => {
  expect(mockPlaceShipHorizontal).toEqual(['11', '21', '31']);
});

test('mockPlaceShipVertical should return an array matching expected array', () => {
  expect(mockPlaceShipVertical).toEqual(['88', '87', '86']);
});


//test Player class create objects with correct values

const mockPlayer = new Player('layfon');

test('mockplayer should have name set as layfon', () => {
  expect(mockPlayer.playerName).toBe('layfon');
});
