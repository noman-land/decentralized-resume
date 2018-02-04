import contract from 'truffle-contract';
import Web3 from 'web3';

import squaresArtifacts from '../../../build/contracts/Squares.json';

import { logAndRethrow } from '../utils/loggingUtils';

import { DEFAULT_GAS } from '../constants';

const toNumber = bigNumber => bigNumber.toNumber();

export default class SquaresUtils {
  constructor() {
    this.SquaresContract = contract(squaresArtifacts);
    this.initWeb3().then(this.SquaresContract.setProvider);
  }

  getActiveAccount() {
    return new Promise((resolve, reject) => {
      this.web3.eth.getAccounts((error, accounts) => {
        if (error) {
          logAndRethrow('Failed to get activeAccount')(error);
          return reject(error);
        }

        if (!accounts.length) {
          logAndRethrow('Not logged in');
          return reject(new Error('Not logged in'));
        }

        return resolve(accounts[0]);
      });
    });
  }

  getBalance() {
    return this.SquaresContract.deployed().then(instance =>
      instance.getBalance
        .call()
        .then(toNumber)
        .catch(error => {
          logAndRethrow('Failed to get balance')(error);
          throw error;
        }));
  }

  getGridSizeX() {
    return this.SquaresContract.deployed().then(instance =>
      instance.GRID_SIZE_X
        .call()
        .then(toNumber)
        .catch(logAndRethrow('Failed to get grid size x')));
  }

  getGridSizeY() {
    return this.SquaresContract.deployed().then(instance =>
      instance.GRID_SIZE_Y
        .call()
        .then(toNumber)
        .catch(logAndRethrow('Failed to get grid size y')));
  }

  getOwner() {
    return this.SquaresContract.deployed().then(instance =>
      instance.owner
        .call()
        .catch(logAndRethrow('Failed to get owner')));
  }

  getSquareInfo(x, y) {
    return this.SquaresContract.deployed().then(instance =>
      instance.getSquareInfo
        .call(x, y)
        .then(([r, g, b, currentOwner, placedAtBlock, pricePaid, timesRented]) => ({
          r: toNumber(r),
          g: toNumber(g),
          b: toNumber(b),
          currentOwner,
          placedAtBlock: toNumber(placedAtBlock),
          pricePaid: toNumber(pricePaid),
          timesRented: toNumber(timesRented),
          x,
          y,
        }))
        .catch(logAndRethrow('Failed to get square info')));
  }

  getTimeLimit() {
    return this.SquaresContract.deployed().then(instance =>
      instance.timeLimit
        .call()
        .then(toNumber)
        .catch(logAndRethrow('Failed to get time limit')));
  }

  initWeb3() {
    return new Promise((resolve, reject) => {
      if (typeof web3 !== 'undefined') {
        this.web3 = new Web3(web3.currentProvider);
        return resolve(this.web3.currentProvider);
      }

      return reject(new Error('No web3 found. Please install MetaMask browser extension or use a web3 enabled browser.'));
    });
  }

  rentSquare(x, y, r, g, b, value) {
    return this.SquaresContract.deployed().then(instance =>
      this.getActiveAccount().then(activeAccount =>
        instance
          .rentSquare(x, y, r, g, b, {
            value,
            from: activeAccount,
            gas: DEFAULT_GAS,
          })
          .then(success => {
            console.log('Success:', success);
          })
          .catch(logAndRethrow('Failed to rent square'))));
  }

  setGridSizeX(x) {
    return this.SquaresContract.deployed().then(instance =>
      this.getActiveAccount().then(activeAccount =>
        instance
          .setGridSizeX(x, {
            from: activeAccount,
            gas: DEFAULT_GAS,
          })
          .then(success => {
            console.log('Success:', success);
          })
          .catch(logAndRethrow('Failed to set grid size x'))));
  }

  setGridSizeY(y) {
    return this.SquaresContract.deployed().then(instance =>
      this.getActiveAccount().then(activeAccount =>
        instance
          .setGridSizeY(y, {
            from: activeAccount,
            gas: DEFAULT_GAS,
          })
          .catch(logAndRethrow('Failed to set grid size y'))));
  }


  setTimeLimit(newTimeLimit) {
    return this.SquaresContract.deployed().then(instance =>
      this.getActiveAccount().then(activeAccount =>
        instance
          .setTimeLimit(newTimeLimit, {
            from: activeAccount,
            gas: DEFAULT_GAS,
          })
          .catch(logAndRethrow('Failed to set time limit'))));
  }

  transferOwner(newOwner) {
    return this.SquaresContract.deployed().then(instance =>
      this.getActiveAccount().then(activeAccount =>
        instance
          .transferOwner(newOwner, {
            from: activeAccount,
            gas: DEFAULT_GAS,
          })
          .catch(logAndRethrow('Failed to transfer owner'))));
  }

  withdraw() {
    return this.SquaresContract.deployed().then(instance =>
      this.getActiveAccount().then(activeAccount =>
        instance
          .withdraw({
            from: activeAccount,
            gas: DEFAULT_GAS,
          })
          .catch(logAndRethrow('Failed to withdraw'))));
  }
}
