import contract from 'truffle-contract';
import Web3 from 'web3';

import squaresArtifacts from '../../../build/contracts/Squares.json';

import { logError } from '../utils/loggingUtils';

import { DEFAULT_GAS } from '../constants';

const toNumber = bigNumber => bigNumber.toNumber();

export default class SquaresUtils {
  constructor() {
    this.initWeb3();

    this.SquaresContract = contract(squaresArtifacts);
    this.SquaresContract.setProvider(this.web3.currentProvider);
  }

  getActiveAccount() {
    return new Promise((resolve, reject) => {
      this.web3.eth.getAccounts((error, accounts) => {
        if (error) {
          logError('Failed to get activeAccount')(error);
          return reject(error);
        }

        if (!accounts.length) {
          logError('Not logged in');
          return reject(new Error('Not logged in'));
        }

        return resolve(accounts[0]);
      });
    });
  }

  getBalance() {
    return this.SquaresContract.deployed().then(instance => {
      return instance.getBalance.call()
        .then(toNumber)
        .catch(error => {
          logError('Failed to get balance')(error);
          throw error;
        });
    });
  }

  getSquareInfo(x, y) {
    return this.SquaresContract.deployed().then(instance => {
      return instance.grid.call(x, y)
        .then(([r, g, b, currentOwner, placedAtBlock, pricePaid, timesRented]) => ({
          r: toNumber(r),
          g: toNumber(g),
          b: toNumber(b),
          currentOwner,
          placedAtBlock: toNumber(placedAtBlock),
          pricePaid: toNumber(pricePaid),
          timesRented: toNumber(timesRented),
        }))
        .catch(error => {
          logError('Failed to get square info')(error);
          //throw error;
        });
    });
  }

  getOwner() {
    return this.SquaresContract.deployed().then(instance => {
      return instance.owner.call().catch(error => {
        logError('Failed to get owner')(error);
        throw error;
      });
    });
  }

  getTimeLimit() {
    return this.SquaresContract.deployed().then(instance => {
      return instance.timeLimit.call()
        .then(toNumber)
        .catch(error => {
          logError('Failed to get time limit')(error);
          throw error;
        });
    });
  }

  getGridSizeX() {
    return this.SquaresContract.deployed().then(instance => {
      return instance.GRID_SIZE_X.call()
        .then(toNumber)
        .catch(error => {
          logError('Failed to get grid size x')(error);
          throw error;
        });
    });
  }

  getGridSizeY() {
    return this.SquaresContract.deployed().then(instance => {
      return instance.GRID_SIZE_Y.call()
        .then(toNumber)
        .catch(error => {
          logError('Failed to get grid size y')(error);
          throw error;
        });
    });
  }

  initWeb3() {
    if (typeof web3 !== 'undefined') {
      logError('Using web3 detected from external source')();
      this.web3 = new Web3(web3.currentProvider);
    }
  }

  rentSquare(x, y, r, g, b, value) {
    return this.SquaresContract.deployed().then(instance => {
      return this.getActiveAccount().then(activeAccount => {
        return instance.rentSquare(x, y, r, g, b, {
          value,
          from: activeAccount,
          gas: DEFAULT_GAS,
        })
        .then(success => {
          console.log('Success:', success);
        })
        .catch(error => {
          logError('Failed to rent square')(error);
          //throw error;
        });
      });
    });
  }

  setGridSizeX(x) {
    return this.SquaresContract.deployed().then(instance => {
      return this.getActiveAccount().then(activeAccount => {
        return instance.setGridSizeX(x, {
          from: activeAccount,
          gas: DEFAULT_GAS,
        })
        .then(success => {
          console.log('Success:', success);
        })
        .catch(error => {
          logError('Failed to set grid size y')(error);
          //throw error;
        });
      });
    });
  }

  setGridSizeY(y) {
    return this.SquaresContract.deployed().then(instance => {
      return this.getActiveAccount().then(activeAccount => {
        return instance.setGridSizeY(y, {
          from: activeAccount,
          gas: DEFAULT_GAS,
        })
        .then(success => {
          console.log('Success:', success);
        })
        .catch(error => {
          logError('Failed to set grid size y')(error);
          //throw error;
        });
      });
    });
  }


  setTimeLimit(newTimeLimit) {
    return this.SquaresContract.deployed().then(instance => {
      return this.getActiveAccount().then(activeAccount => {
        return instance.setTimeLimit(newTimeLimit, {
          from: activeAccount,
          gas: DEFAULT_GAS,
        })
        .catch(error => {
          logError('Failed to set grid size y')(error);
          //throw error;
        });
      });
    });
  }

  transferOwner(newOwner) {
    return this.SquaresContract.deployed().then(instance => {
      return this.getActiveAccount().then(activeAccount => {
        return instance.transferOwner(newOwner, {
          from: activeAccount,
          gas: DEFAULT_GAS,
        })
        .catch(error => {
          logError('Failed to set grid size y')(error);
          //throw error;
        });
      });
    });
  }

  withdraw() {
    return this.SquaresContract.deployed().then(instance => {
      return this.getActiveAccount().then(activeAccount => {
        return instance
          .withdraw({
            from: activeAccount,
            gas: DEFAULT_GAS,
          })
          .then(success => {
            console.log('Success:', success);
          })
          .catch(error => {
            logError('Failed to withdraw')(error);
            //throw error;
          });
      });
    });
  }
}
