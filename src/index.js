import './polyfill'

export default (fn, ...args) => {
  return new Promise((resolve, reject) => fn(...args, (e, ...cbArgs) => {
    if (e) reject(e, ...cbArgs)
    else resolve(...cbArgs)
  }))
}
