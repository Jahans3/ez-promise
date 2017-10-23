# todo

* Bundle as module
* Promise polyfill
* Tests

# Simple Promisify

An extremely lightweight way to promisify error-first Node.js style callbacks.

Simply take a function that follows the Node.js callback convention, pass it to promisify, and pass any arguments afterwards. The promise is called immediately, simply wrap in a function if you wish to call later:

```
const removeDir = ({ dir }) => promisify(rmdir, dir)
```

### Example
We have an environment script that takes an environment config object from a set of available configs and dumps it into and environment folder inside your source code.

Libraries like `fs`, `ncp`, and `rmdir` all make heavy use of callbacks, and since they follow the [error-first callback convention](https://nodejs.org/api/errors.html#errors_node_js_style_callbacks) (AKA Node.js-style callbacks), we can easily convert them into promises.

Let's start with the callback pattern:

```
import ncp from 'ncp'

function copyFile (from, to) {
    ncp(from, to, err => {
        if (err) {
            console.log(`Error copying file: ${err}`)
        } else {
            console.log('Successfully copied file!')
        }
    )
}

copyFile('./env/production.js', './src/env.js')
```

Now, let's convert our `copyFile` function so that it instead returns a promise:

```
import ncp from 'ncp'
import promisify from 'simple-promisify'

// Convert ncp into a promise
const copyFile = ({ from, to }) => promisify(ncp, from, to)
```

Once this is done, we can use the promise however we prefer:

Chaining promise methods:
```
copyFile({ from: './env/production.js', to: './src/env.js' })
    .then(() => { console.log('Success!') })
    .catch(err => { console.log(`Error: ${err}`) })
```

Async/await:
```
async function multipleTasks () {
    // ...
    const result = await copyFile({ to: './env/production.js', to: './src/env.js' })
}
```

### Dependencies
None!
