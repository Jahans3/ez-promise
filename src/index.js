import './polyfill'

module.exports = (fn, ...args) => {
  return new Promise((resolve, reject) => fn(...args, (e, ...cbArgs) => {
    if (e) reject(e, ...cbArgs)
    else resolve(...cbArgs)
  }))
}

export const ezThunk = fn => (...args) => {
  return new Promise((resolve, reject) => fn(...args, (e, ...cbArgs) => {
    if (e) reject(e, ...cbArgs)
    else resolve(...cbArgs)
  }))
}
