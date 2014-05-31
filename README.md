# duplex-transform

Syntactic sugar for making "wrapping" (piping) a duplex stream
with some transforms.

```
npm install duplex-transform
```

## Use Case

Say you have a duplex stream, and it's super cool. Except that it
speaks some protocol you don't particularly like, so you want to
transform it to something else. It's a bit annoying to have to
make three streams and pipe them every time.
This tiny module makes this a tiny bit nicer.

This module uses + plays well with
[through2](https://github.com/rvagg/through2)
and common transform stream patterns.

## Example

```js
var dgramStream = require('dgram-stream')
var duplexTransform = require('duplex-transform')

var ugly = dgramStream('udp4')
ugly.bind(1234)

function encode(data, enc, next) {
  this.push({
    to: { port: 1234 }, // talking to ourselves :S
    payload: data,
  })
  next()
}

function decode(data, enc, next) {
  this.push(data.payload)
  next()
}

var fancy = duplexTransform.obj(encode, ugly, decode)
process.stdin.pipe(fancy).pipe(process.stdout)
```

