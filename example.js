var dgramStream = require('dgram-stream')
var duplexTransform = require('./')

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
