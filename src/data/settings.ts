export const difficulty = {
  minPasswordLength: 6,
  minUsernameLength: 5,
  nameSplicer: {
    threshold: 3,
    chance: 0.3,
    count: 2,
  },
  signup: {
    minAttempts: 2,
    randomErrorChance: 0.4,
  },
  login: {
    minAttempts: 3,
    randomErrorChance: 0.6,
  },
  restoreTable: {
    minAttempts: 4,
    failureChance: 0.7,
  },
};
