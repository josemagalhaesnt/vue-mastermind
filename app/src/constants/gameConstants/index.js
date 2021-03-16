import defaultSelectedColors from '../colorConstants';

const gameDefault = {
  colorPassword: [],
  colorPasswordGuess: [
    {
      id: 0,
      color: defaultSelectedColors[0].color,
      isCorrect: false
    },
    {
      id: 1,
      color: defaultSelectedColors[1].color,
      isCorrect: false
    },
    {
      id: 2,
      color: defaultSelectedColors[2].color,
      isCorrect: false
    },
    {
      id: 3,
      color: defaultSelectedColors[3].color,
      isCorrect: false
    }
  ],
  roundCounter: 0,
  roundPoints: 0,
  gameRounds: [],
  roundStatus: [],
  isAllowedToPlay: true,
  rightAnswer: false
};

export { gameDefault };
