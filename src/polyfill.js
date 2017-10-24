import PromisePolyfill from 'promise-polyfill'

if (!Promise) {
  Promise = PromisePolyfill
}
