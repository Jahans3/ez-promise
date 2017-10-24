# EZ Promise
A lightweight way to convert error-first Node.js style callbacks into promises.

Simply take a function that follows the Node.js callback convention, pass it to ezpromise and pass any arguments afterwards.

```
ezpromise(rmdir, './path/to/dir')
```

#### Partial application / Currying / Thunks
Comes with built in support for currying, simply import `ezThunk` and you are ready to go. Pass the function you wish to convert into a promise first, with any arguments in the curried function.

```
import { ezThunk } from 'ez-promise'

const removeDir = ezThunk(rmdir)

removeDir('./path/to/dir').then(() => { console.log('Success!') })
```

### Batteries Included

This library comes with everything required to run. If no `window.Promise` is detected, a polyfill is automatically added.

### `import/require`

```
const ezpromise = require('ez-promise').default
import ezpromise from 'ez-promise'
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
import ezpromise from 'ez-promise'

// Convert ncp into a promise
const copyFile = ({ from, to }) => ezpromise(ncp, from, to)
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
    const result = await copyFile({ to: './env/production.js', to: './src/env.js' })
    // ...
}
```

### Dependencies

The only dependency is a `Promise` polyfill!
