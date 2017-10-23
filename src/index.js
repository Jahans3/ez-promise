const promisify = (fn, ...args) => {
  return new Promise((resolve, reject) => fn(...args, (e, ...cbArgs) => {
    if (e) reject(e, ...cbArgs)
    else resolve(...cbArgs)
  }))
}

export default promisify
