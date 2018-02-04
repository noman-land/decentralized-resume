pragma solidity ^0.4.19;

contract Squares {
  address public owner;
  uint256 public timeLimit = 25;

  uint256 public GRID_SIZE_X = 10;
  uint256 public GRID_SIZE_Y = 10;
  uint8 public DEFAULT_COLOR = 255;

  modifier ownerOnly() {
    require(msg.sender == owner);
    _;
  }

  function Squares() public {
    owner = msg.sender;
  }

  struct Square {
    uint8 r;
    uint8 g;
    uint8 b;
    address currentOwner;
    uint256 placedAtBlock;
    uint256 pricePaid;
    uint256 timesRented;
  }

  mapping (uint256 => mapping (uint256 => Square)) private grid;

  function getBalance() public constant returns(uint256 balance) {
    return this.balance;
  }

  function getSquareInfo(uint256 x, uint256 y)
    constant
    public
    returns (
      uint8 r,
      uint8 g,
      uint8 b,
      address currentOwner,
      uint256 placedAtBlock,
      uint256 pricePaid,
      uint256 timesRented
  ) {
    Square memory square = grid[x][y];
    bool isOwned = square.currentOwner != 0x0;
    return (
      isOwned ? square.r : DEFAULT_COLOR,
      isOwned ? square.g : DEFAULT_COLOR,
      isOwned ? square.b : DEFAULT_COLOR,
      square.currentOwner,
      square.placedAtBlock,
      square.pricePaid,
      square.timesRented
    );
  }

  function setGridSizeX(uint256 x) public ownerOnly {
    GRID_SIZE_X = x;
  }

  function setGridSizeY(uint256 y) public ownerOnly {
    GRID_SIZE_Y = y;
  }

  function rentSquare(
    uint256 x,
    uint256 y,
    uint8 r,
    uint8 g,
    uint8 b
  ) public payable {
    require(x < GRID_SIZE_X && y < GRID_SIZE_Y);
    require(msg.value > grid[x][y].pricePaid);
    require(block.number - grid[x][y].placedAtBlock > timeLimit);
    grid[x][y] = Square(
      r,
      g,
      b,
      msg.sender,
      block.number,
      msg.value,
      grid[x][y].timesRented + 1
    );
  }

  function setTimeLimit(uint256 newTimeLimit) public ownerOnly {
    timeLimit = newTimeLimit;
  }

  function transferOwner(address newOwner) public ownerOnly {
    owner = newOwner;
  }

  function withdraw() public ownerOnly {
    owner.transfer(this.balance);
  }
}
