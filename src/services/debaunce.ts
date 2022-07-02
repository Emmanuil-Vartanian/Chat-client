export const debaunce = (fn, ms) => {
  let timeout
  return function () {
    const fnCall = () => {
      // eslint-disable-next-line prefer-rest-params
      fn.apply(this, arguments)
    }
    clearTimeout(timeout)
    timeout = setTimeout(fnCall, ms)
  }
}
