const History = {
  navigate: null,
  push: (page, ...rest) => History.navigate(page, ...rest)
}

export const push = History.push

export default History
