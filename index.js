var through2 = require('through2')
var bun = require('bun')

// syntactic sugar for wrapping a duplex stream with two transforms.
module.exports = duplexTransform

function duplexTransform(outgoing, stream, incoming) {
  if (typeof(outgoing) === 'function')
    outgoing = through2(outgoing)

  if (typeof(incoming) === 'function')
    incoming = through2(incoming)

  var wrapped = bun([outgoing, stream, incoming])
  wrapped.outgoing = outgoing
  wrapped.middle = stream
  wrapped.incoming = incoming
  return wrapped
}

// sugar for not having to include through2 just for `.obj`
duplexTransform.obj = function(outgoing, stream, incoming) {
  if (typeof(outgoing) === 'function')
    outgoing = through2.obj(outgoing)

  if (typeof(incoming) === 'function')
    incoming = through2.obj(incoming)

  return duplexTransform(outgoing, stream, incoming)
}
