export const log = message => additionalData => {
  console.log(message, additionalData); // eslint-disable-line
};

export const logAndRethrow = message => error => {
  console.error(message, error); // eslint-disable-line
  throw error;
};

export default {
  log,
  logAndRethrow,
};
