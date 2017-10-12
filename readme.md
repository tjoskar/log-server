# Log server


### Motivation

It can be really difficult to debug in IE/Edge sometimes where you don't always can get access to console.log prints or the debugger.

### Usage

```
$ npm install -g tjoskar/log-server
$ log-server 5000 
```

Send a post message to the server

```js
const body = JSON.stringify({ someKey: 'someValue' });
const headers = new Headers({ 'Content-Type': 'application/json' });

fetch('http://localhost:5000/log', {
  method: 'POST',
  body,
  headers
})
```

### Example code to create a log queue

```js
function loggerFactory() {
  let logQueue = Promise.resolve();
  return level => (...args) => {
    if (level in console) {
      console[level](...args);
    }
    logQueue = logQueue.then(() => {
      const body = JSON.stringify(args);
      return new Promise((yes, no) => {
        ajax.post('http://localhost:5000/log', body, { 'Content-Type': 'application/json' })
          .subscribe(yes, no);
      });
    });
  };
}
```
