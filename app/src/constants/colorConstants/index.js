const colorConstants = [
  { colorId: 0, name: 'grey', hexValue: '#676767' },
  { colorId: 1, name: 'orange', hexValue: '#ffa500' },
  { colorId: 2, name: 'red', hexValue: '#d81159' },
  { colorId: 3, name: 'blue', hexValue: '#2274a5' },
  { colorId: 4, name: 'green', hexValue: '#32936f' },
  { colorId: 5, name: 'yellow', hexValue: '#ffbf00' }
];

const defaultSelectedColors = [
  { id: 0, color: colorConstants[0] },
  {
    id: 1,
    color: colorConstants[0]
  },
  {
    id: 2,
    color: colorConstants[0]
  },
  {
    id: 3,
    color: colorConstants[0]
  }
];

export { colorConstants, defaultSelectedColors };
