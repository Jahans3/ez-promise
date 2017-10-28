import './polyfill'

const spreadArgs = (...args) => {
  if (args.length < 1) return
  if (args.length === 1) return args[0]

  return args
}

const promisify = ({ fn, args }) => {
  return new Promise((resolve, reject) => fn(...args, (e, ...cbArgs) => {
    if (e) reject(e)
    else resolve(cbArgs)
  })).then(spreadArgs)
}

export default (fn, ...args) => promisify({ fn, args })

export const ezThunk = fn => (...args) => promisify({ fn, args })
