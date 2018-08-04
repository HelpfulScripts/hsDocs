/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./_dist/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../node_modules/base64-js/index.js":
/*!**************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/base64-js/index.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "../../../node_modules/buffer/index.js":
/*!***********************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/buffer/index.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "../../../node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "../../../node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "../../../node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../../node_modules/hsdatab/Data.js":
/*!***********************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hsdatab/Data.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const DataFilters_1 = __webpack_require__(/*! ./DataFilters */ "../../../node_modules/hsdatab/DataFilters.js");
;
class Data {
    constructor(data) {
        this.data = [];
        this.meta = [];
        this.import(data);
    }
    static toDataSet(data, name) {
        data = data || [{}];
        const names = Object.keys(data[0]);
        const rows = data.map((r) => names.map((n) => r[n]));
        return { rows: rows, colNames: names, name: name || undefined };
    }
    getName() {
        return this.name;
    }
    import(data) {
        this.name = data.name;
        this.setData(data.rows, data.colNames);
    }
    export() {
        return {
            rows: this.getData(),
            colNames: this.colNames()
        };
    }
    getData() {
        return this.data;
    }
    getColumn(col) {
        const cn = this.colNumber(col);
        return this.data.map((row) => row[cn]);
    }
    colAdd(col) {
        let m = this.getMeta(col);
        if (m === undefined) {
            m = this.meta[col] = {};
            m.name = col;
            m.column = this.meta.length;
            this.meta.push(m);
            m.cast = false;
            m.accessed = false;
        }
        return m.column;
    }
    colInitialize(col, initializer) {
        const cn = this.colNumber(col);
        if (!cn && typeof col === 'string') {
            this.colAdd(col);
        }
        const fn = typeof initializer === 'function';
        if (cn !== undefined) {
            this.data.map((r, i) => r[cn] = fn ? initializer(r[cn], i, r) : initializer);
        }
    }
    colNumber(col) {
        const m = this.getMeta(col);
        if (!m) {
            return undefined;
        }
        else {
            m.accessed = true;
            return m.column;
        }
    }
    colName(col) {
        var m = this.getMeta(col);
        if (!m) {
            return undefined;
        }
        m.accessed = true;
        return m.name;
    }
    colNames() {
        return this.meta.map((m) => m.name);
    }
    colType(col) {
        const meta = this.getMeta(col);
        return meta ? meta.types[0].type : Data.type.name;
    }
    findDomain(col, domain) {
        if (domain === undefined) {
            domain = [];
        }
        if (col === undefined) {
            domain[0] = 0;
            domain[1] = this.data.length - 1;
        }
        else {
            const c = this.colNumber(col);
            const type = this.colType(col);
            if (this.data === undefined) {
                console.log('no data');
            }
            switch (type) {
                case Data.type.name:
                    this.data.forEach((r) => {
                        const nomDom = domain;
                        if (nomDom.indexOf('' + r[c]) < 0) {
                            nomDom.push('' + r[c]);
                        }
                    });
                    break;
                default:
                    this.data.forEach((r) => {
                        let v = r[c];
                        if (domain[0] === undefined) {
                            domain[0] = v;
                        }
                        if (domain[1] === undefined) {
                            domain[1] = v;
                        }
                        if (v !== undefined && v !== null) {
                            if (v < domain[0]) {
                                domain[0] = v;
                            }
                            else if (v > domain[1]) {
                                domain[1] = v;
                            }
                        }
                    });
            }
        }
        return domain;
    }
    castData() {
        this.meta.forEach((c) => {
            const col = c.column;
            if (!c.cast) {
                this.data.forEach((row) => row[col] = this.castVal(c.types[0].type, row[col]));
            }
            c.cast = true;
        });
    }
    filter(condition) {
        return DataFilters_1.filter(this, condition);
    }
    sort(sortFn, col) {
        let fn = sortFn;
        if (!col) {
            this.data.sort(fn);
        }
        else {
            col = this.colNumber(col);
            if (sortFn === 'descending') {
                fn = (a, b) => (b > a) ? 1 : ((b < a) ? -1 : 0);
            }
            if (sortFn === 'ascending') {
                fn = (a, b) => (b < a) ? 1 : ((b > a) ? -1 : 0);
            }
            this.data.sort((r1, r2) => fn(r1[col], r2[col]));
        }
        return this;
    }
    map(col, mapFn) {
        const noop = (val) => val;
        const cumulate = () => {
            let sum = 0;
            return (val, i) => { sum += +val; return sum; };
        };
        function getFn() {
            let fn;
            switch (mapFn) {
                case 'cumulate':
                    fn = cumulate();
                    break;
                case 'noop':
                    fn = noop;
                    break;
                default: fn = mapFn;
            }
            return fn;
        }
        let result = new Data({ colNames: this.colNames(), rows: this.data.slice(), name: this.getName() });
        const names = col['length'] ? col : [col];
        names.map((cn) => {
            const c = this.colNumber(cn);
            let fn = getFn();
            result.data = result.data.map((row, i, rows) => {
                row[c] = fn(row[c], c, i, rows);
                return row;
            });
        });
        return result;
    }
    getMeta(col) {
        if (!this.meta) {
            this.meta = [];
        }
        if (!this.meta[col]) {
            return undefined;
        }
        this.meta[col].accessed = true;
        return this.meta[col];
    }
    setData(data, names, autoType = true) {
        this.meta = [];
        this.data = data;
        if (!names) {
            console.log();
        }
        names.forEach((col) => this.colAdd(col));
        names.forEach((col) => this.findTypes(col));
        this.castData();
    }
    findTypes(col) {
        const m = this.getMeta(col);
        const types = [];
        Object.keys(Data.type).forEach((t) => {
            const ts = { type: Data.type[t], count: 0 };
            types.push(ts);
            types[Data.type[t]] = ts;
        });
        for (let v of this.allRows(col)) {
            const t = this.findType(v);
            if (t !== null) {
                types[t].count++;
            }
        }
        types.sort(function (a, b) {
            if (a.type === 'currency' && a.count > 0) {
                return -1;
            }
            if (b.type === 'currency' && b.count > 0) {
                return 1;
            }
            return b.count - a.count;
        });
        m.types = types;
        return types[0].type;
    }
    findType(val) {
        if (val && val !== '') {
            if (val instanceof Date) {
                return Data.type.date;
            }
            if (typeof val === 'number') {
                return Data.type.number;
            }
            const strVal = '' + val;
            if ('' + parseFloat(strVal) === strVal) {
                return Data.type.number;
            }
            if (strVal.startsWith('$') && !isNaN(parseFloat(strVal.slice(1)))) {
                return Data.type.currency;
            }
            if (strVal.endsWith('%') && !isNaN(parseFloat(strVal))) {
                return Data.type.percent;
            }
            if (!isNaN(this.toDate(strVal).getTime())) {
                return Data.type.date;
            }
            if ((/^\$\d{0,2}((,\d\d\d)*)/g).test(val)) {
                if (!isNaN(parseFloat(val.trim().replace(/[^eE\+\-\.\d]/g, '').replace(/,/g, '')))) {
                    return Data.type.currency;
                }
            }
            switch (strVal.toLowerCase()) {
                case "null": break;
                case "#ref!": break;
                default: if (val.length > 0) {
                    return Data.type.name;
                }
            }
        }
        return null;
    }
    *allRows(column) {
        const c = this.colNumber(column);
        for (let r = 0; r < this.data.length; r++) {
            yield this.data[r][c];
        }
    }
    toDate(val, limitYear = 1970) {
        let d;
        if (val instanceof Date) {
            d = val;
        }
        else {
            d = new Date(val);
        }
        let yr = d.getFullYear();
        if (yr < 100) {
            yr += 1900;
            d.setFullYear((yr < limitYear) ? yr + 100 : yr);
        }
        return d;
    }
    castVal(type, val) {
        switch (type) {
            case Data.type.date:
                if (val instanceof Date) {
                    return val;
                }
                val = this.toDate(val);
                if (isNaN(val.getTime())) {
                    val = null;
                }
                break;
            case Data.type.percent:
                if (typeof val === 'string') {
                    const num = parseFloat(val);
                    val = val.endsWith('%') ? num / 100 : num;
                }
                if (isNaN(val)) {
                    val = null;
                }
                break;
            case Data.type.currency:
                if (typeof val === 'string') {
                    val = val.replace(/[^eE\+\-\.\d]/g, '');
                }
            case Data.type.number:
                if (typeof val === 'string') {
                    val = parseFloat(val);
                }
                if (isNaN(val)) {
                    val = null;
                }
                break;
            default: val = '' + val;
        }
        return val;
    }
}
Data.type = {
    number: 'number',
    name: 'name',
    date: 'date',
    currency: 'currency',
    percent: 'percent',
};
exports.Data = Data;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9EYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsK0NBQWtEO0FBdUNFLENBQUM7QUFrQnJEO0lBZ0NJLFlBQVksSUFBYTtRQWdUakIsU0FBSSxHQUFpQixFQUFFLENBQUM7UUFDeEIsU0FBSSxHQUFpQixFQUFFLENBQUM7UUFoVDVCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQVZNLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBbUIsRUFBRSxJQUFZO1FBQ3JELElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwQixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFLLEVBQUUsRUFBRSxDQUM1QixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sRUFBRSxJQUFJLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFDLElBQUksSUFBRSxTQUFTLEVBQUUsQ0FBQztJQUMvRCxDQUFDO0lBU00sT0FBTztRQUNWLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBTU0sTUFBTSxDQUFDLElBQVk7UUFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUtNLE1BQU07UUFDVCxPQUFPO1lBQ0gsSUFBSSxFQUFFLElBQUks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

/***/ }),

/***/ "../../../node_modules/hsdatab/DataFilters.js":
/*!******************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hsdatab/DataFilters.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Data_1 = __webpack_require__(/*! ./Data */ "../../../node_modules/hsdatab/Data.js");
;
;
function resolveTerminalCondition(name, val, row, colNumber) {
    const col = colNumber(name);
    const valIsFunction = (typeof val === 'function');
    const valIsArray = ((typeof val === 'object') && (val.length !== undefined));
    if (isNaN(col)) {
        console.log(`column name '${name}' cannot be resolved in terminal condition ${name}=${val}`);
        console.log(row);
        return false;
    }
    else if (valIsFunction) {
        return val(row[col], row);
    }
    else if (valIsArray) {
        return (val.length === 0) || val.some((v) => row[col] === v);
    }
    else {
        return (row[col] === val);
    }
}
function resolveCondition(condition, row, r, colNumber, and) {
    let orResult = false;
    let andResult = true;
    if (condition === undefined) {
        return true;
    }
    else if (typeof condition === 'number') {
        return (condition === r);
    }
    else if (typeof condition === 'object') {
        const mc = condition;
        if (mc.length !== undefined) {
            if (and === undefined) {
                and = false;
            }
            if (mc.length === 0) {
                return false;
            }
            return and ?
                mc.every((cd) => resolveCondition(cd, row, r, colNumber, and)) :
                mc.some((cd) => resolveCondition(cd, row, r, colNumber, and));
        }
        else {
            if (and === undefined) {
                and = true;
            }
            for (const name in condition) {
                let conditionMet = and;
                const setCond = condition;
                switch (name) {
                    case 'or':
                        conditionMet = resolveCondition(setCond.or, row, r, colNumber, false);
                        break;
                    case 'and':
                        conditionMet = resolveCondition(setCond.and, row, r, colNumber, true);
                        break;
                    case 'not':
                        conditionMet = !resolveCondition(setCond.not, row, r, colNumber);
                        break;
                    default: conditionMet = resolveTerminalCondition(name, condition[name], row, colNumber);
                }
                if (conditionMet) {
                    orResult = true;
                    if (!and) {
                        break;
                    }
                }
                else {
                    andResult = false;
                    if (and) {
                        break;
                    }
                }
            }
        }
    }
    else {
        console.error(`unrecognized condition: ${JSON.stringify(condition)}`);
        return false;
    }
    return and ? andResult : orResult;
}
function filter(data, cond) {
    const colNumber = (name) => data.colNumber(name);
    try {
        return new Data_1.Data({
            name: data.getName(),
            colNames: data.colNames(),
            rows: data.getData().filter((row, i) => {
                const keep = resolveCondition(cond, row, i, colNumber);
                return keep;
            })
        });
    }
    catch (err) {
        console.log(err);
        console.log(err.stack);
    }
}
exports.filter = filter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YUZpbHRlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvRGF0YUZpbHRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUEySEEsaUNBR2dCO0FBZWYsQ0FBQztBQVFELENBQUM7QUFJRixrQ0FBa0MsSUFBVyxFQUFFLEdBQU8sRUFBRSxHQUFXLEVBQUUsU0FBK0I7SUFDaEcsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLE1BQU0sYUFBYSxHQUFHLENBQUMsT0FBTyxHQUFHLEtBQUssVUFBVSxDQUFDLENBQUM7SUFDbEQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sS0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzNFLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsSUFBSSw4Q0FBOEMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDN0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixPQUFPLEtBQUssQ0FBQztLQUNoQjtTQUFNLElBQUksYUFBYSxFQUFFO1FBRXRCLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztLQUM3QjtTQUFNLElBQUksVUFBVSxFQUFFO1FBRW5CLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFLLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUNwRTtTQUFNO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztLQUM3QjtBQUNM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

/***/ }),

/***/ "../../../node_modules/hsdatab/index.js":
/*!************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hsdatab/index.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Data_1 = __webpack_require__(/*! ./Data */ "../../../node_modules/hsdatab/Data.js");
exports.Data = Data_1.Data;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFXQSwrQkFBOEI7QUFBckIsc0JBQUEsSUFBSSxDQUFBIn0=

/***/ }),

/***/ "../../../node_modules/hsgraph/Axes.js":
/*!***********************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hsgraph/Axes.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mithril_1 = __webpack_require__(/*! hsutil/mithril */ "../../../node_modules/hsutil/mithril.js");
;
const SVGElem_1 = __webpack_require__(/*! ./SVGElem */ "../../../node_modules/hsgraph/SVGElem.js");
function getCrossAt(cross, scale) {
    let crossesAt;
    switch (cross) {
        case 'min':
            crossesAt = scale.domain()[0];
            break;
        case 'max':
            crossesAt = scale.domain()[1];
            break;
        default: crossesAt = cross || 0;
    }
    return scale.convert(crossesAt);
}
class Axes extends SVGElem_1.SVGElem {
    static defaultConfig(cfg) {
        function scaleCfg() {
            return {
                type: Axes.type.linear,
                domain: ['auto', 'auto']
            };
        }
        function labelCfg(primary, x, major) {
            return {
                visible: major, text: '',
                xpos: x ? SVGElem_1.TextHAlign.middle : (primary ? SVGElem_1.TextHAlign.end : SVGElem_1.TextHAlign.start),
                ypos: x ? (primary ? SVGElem_1.TextVAlign.top : SVGElem_1.TextVAlign.bottom) : SVGElem_1.TextVAlign.center,
                hOffset: x ? 0 : (primary ? -0.7 : 0.7),
                vOffset: x ? (primary ? 0.7 : -0.7) : 0
            };
        }
        function markCfg(primary, major) {
            return {
                visible: major,
                length: (primary ? 1 : -1) * (major ? 10 : 5)
            };
        }
        function titleCfg(primary, x) {
            return {
                visible: true, text: (x ? 'x' : 'y') + (primary ? '' : '2'),
                xpos: x ? SVGElem_1.TextHAlign.end : (primary ? SVGElem_1.TextHAlign.middle : SVGElem_1.TextHAlign.start),
                ypos: x ? SVGElem_1.TextVAlign.top : (primary ? SVGElem_1.TextVAlign.bottom : SVGElem_1.TextVAlign.top),
                hOffset: x ? -2 : (primary ? 0 : 0.3),
                vOffset: x ? (primary ? 0.4 : -1.2) : (primary ? -0.5 : 0.7)
            };
        }
        function axisCfg(primary, x) {
            return {
                visible: primary ? true : false,
                crossesAt: primary ? 'min' : 'max',
                scale: scaleCfg(),
                title: titleCfg(primary, x),
                ticks: {
                    major: {
                        marks: markCfg(primary, true),
                        labels: labelCfg(primary, x, true),
                        labelFmt: undefined
                    },
                    minor: {
                        marks: markCfg(primary, false),
                        labels: labelCfg(primary, x, false),
                        labelFmt: undefined
                    }
                }
            };
        }
        cfg.axes = {
            primary: {
                x: axisCfg(true, true),
                y: axisCfg(true, false)
            },
            secondary: {
                x: axisCfg(false, true),
                y: axisCfg(false, false)
            }
        };
    }
    static adjustConfig(cfg) {
    }
    drawAxisLine(x, range, cross) {
        return x ? this.horLine(range[0], range[1], cross, 'hs-graph-axis-line') :
            this.verLine(cross, range[0], range[1], 'hs-graph-axis-line');
    }
    drawTitle(x, ttlCfg, type, range, cross) {
        ttlCfg.cssClass = 'hs-graph-axis-title';
        const xy = { transform: `translate(${x ? range[1] : cross}, ${x ? cross : range[1]})` };
        return !ttlCfg.visible ? undefined :
            mithril_1.m('g', xy, this.text(ttlCfg, ttlCfg.text));
    }
    drawTickMarks(x, type, crossesAt, scale, ticks, cfg) {
        return mithril_1.m('svg', { class: `hs-graph-axis-${type}-tick-marks` }, !cfg.marks.visible ? '' : ticks.marks.map((t) => {
            return x ? this.verLine(scale.convert(t), crossesAt, crossesAt + cfg.marks.length) :
                this.horLine(crossesAt, crossesAt - cfg.marks.length, scale.convert(t));
        }));
    }
    drawTickLabels(x, type, crossesAt, scale, ticks, cfg) {
        scale.setLabelFormat(cfg.labelFmt);
        return mithril_1.m('svg', { class: `hs-graph-axis-${type}-tick-label` }, !cfg.labels.visible ? '' : ticks.labels.map((t) => {
            const v = scale.convert(t.pos);
            const xy = { transform: `translate(${x ? v : crossesAt}, ${x ? crossesAt : v})` };
            return mithril_1.m('g', xy, this.text(cfg.labels, t.text));
        }));
    }
    drawAxis(dir, scales, type, axisCfg) {
        const x = dir === 'x';
        const range = scales[dir].range();
        const cfg = axisCfg[type][dir];
        scales[dir].scaleType(cfg.scale.type);
        const crossesAt = getCrossAt(cfg.crossesAt, scales[x ? 'y' : 'x']);
        const ticks = scales[dir].ticks();
        return !cfg.visible ? undefined : mithril_1.m('svg', { class: `hs-graph-axis-${dir} hs-graph-axis-${type}` }, [
            this.drawAxisLine(x, range, crossesAt),
            this.drawTitle(x, cfg.title, type, range, crossesAt),
            this.drawTickMarks(x, 'minor', crossesAt, scales[dir], ticks.minor, cfg.ticks.minor),
            this.drawTickMarks(x, 'major', crossesAt, scales[dir], ticks.major, cfg.ticks.major),
            this.drawTickLabels(x, 'minor', crossesAt, scales[dir], ticks.minor, cfg.ticks.minor),
            this.drawTickLabels(x, 'major', crossesAt, scales[dir], ticks.major, cfg.ticks.major)
        ]);
    }
    view(node) {
        const cfg = node.attrs.cfg;
        const scales = node.attrs.scales;
        return mithril_1.m('svg', { class: 'hs-graph-axis' }, [
            this.drawAxis('x', scales.primary, 'primary', cfg),
            this.drawAxis('y', scales.primary, 'primary', cfg),
            this.drawAxis('x', scales.secondary, 'secondary', cfg),
            this.drawAxis('y', scales.secondary, 'secondary', cfg)
        ]);
    }
}
Axes.type = {
    linear: 'linear axis',
    log: 'log axis',
    date: 'date axis',
    index: 'index axis',
    percent: 'percent axis',
    ordinal: 'ordinal axis',
    nominal: 'nominal axis'
};
exports.Axes = Axes;
class ExampleLinearAxis {
}
class ExampleLogAxis {
}
class ExampleDateAxis {
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXhlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9BeGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBNkRBLDRDQUEwQztBQVUxQyxDQUFDO0FBS0QsdUNBR3FDO0FBUXJDLG9CQUFvQixLQUFtQixFQUFFLEtBQVc7SUFDaEQsSUFBSSxTQUFnQixDQUFDO0lBQ3JCLFFBQVEsS0FBSyxFQUFFO1FBQ1gsS0FBSyxLQUFLO1lBQUUsU0FBUyxHQUFXLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU07UUFDekQsS0FBSyxLQUFLO1lBQUUsU0FBUyxHQUFXLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU07UUFDekQsT0FBTyxDQUFDLENBQUksU0FBUyxHQUFXLEtBQUssSUFBSSxDQUFDLENBQUM7S0FDOUM7SUFDRCxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDcEMsQ0FBQztBQUVELFVBQWtCLFNBQVEsaUJBQU87SUFrRzdCLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBVTtRQUMzQjtZQUNJLE9BQU87Z0JBQ0gsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTTtnQkFDdEIsTUFBTSxFQUFTLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQzthQUNsQyxDQUFDO1FBQ04sQ0FBQztRQUNELGtCQUFrQixPQUFlLEVBQUUsQ0FBUyxFQUFFLEtBQWE7WUFDdkQsT0FBTztnQkFDSCxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFO2dCQUN4QixJQUFJLEVBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQyxvQkFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUEsQ0FBQyxDQUFDLG9CQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxvQkFBVSxDQUFDLEtBQUssQ0FBQztnQkFDekUsSUFB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

/***/ }),

/***/ "../../../node_modules/hsgraph/Canvas.js":
/*!*************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hsgraph/Canvas.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mithril_1 = __webpack_require__(/*! hsutil/mithril */ "../../../node_modules/hsutil/mithril.js");
const SVGElem_1 = __webpack_require__(/*! ./SVGElem */ "../../../node_modules/hsgraph/SVGElem.js");
class Canvas extends SVGElem_1.SVGElem {
    static defaultConfig(cfg) {
        cfg.canvas = {
            range: {
                w: 100, wunit: '%',
                h: 100, hunit: '%'
            }
        };
    }
    static adjustConfig(cfg) {
    }
    view(node) {
        const cg = node.attrs.cfg;
        return mithril_1.m('svg', { class: 'hs-graph-canvas', width: '100%', height: '100%' }, [
            this.rect({ x: 0, y: 0 }, { w: cg.range.w, h: cg.range.h, wunit: cg.range.wunit, hunit: cg.range.hunit }, '')
        ]);
    }
}
exports.Canvas = Canvas;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FudmFzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0NhbnZhcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWVBLDRDQUFzRDtBQUN0RCx1Q0FBaUQ7QUFTakQsWUFBb0IsU0FBUSxpQkFBTztJQW1CL0IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFVO1FBQzNCLEdBQUcsQ0FBQyxNQUFNLEdBQWlCO1lBQ3ZCLEtBQUssRUFBUztnQkFDVixDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBQyxHQUFHO2dCQUNqQixDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBQyxHQUFHO2FBQ3BCO1NBQ0osQ0FBQztJQUNOLENBQUM7SUFNRCxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQVU7SUFDOUIsQ0FBQztJQUVELElBQUksQ0FBQyxJQUFZO1FBQ2IsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFDMUIsT0FBTyxXQUFDLENBQUMsS0FBSyxFQUFFLEVBQUMsS0FBSyxFQUFDLGlCQUFpQixFQUFFLEtBQUssRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFFO1lBQ3BFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFDaEIsRUFBRSxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUMsRUFDekUsRUFBRSxDQUNMO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBNUNELHdCQTRDQyJ9

/***/ }),

/***/ "../../../node_modules/hsgraph/Chart.js":
/*!************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hsgraph/Chart.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mithril_1 = __webpack_require__(/*! hsutil/mithril */ "../../../node_modules/hsutil/mithril.js");
const SVGElem_1 = __webpack_require__(/*! ./SVGElem */ "../../../node_modules/hsgraph/SVGElem.js");
;
class Chart extends SVGElem_1.SVGElem {
    static defaultConfig(cfg) {
        cfg.chart = {
            visible: true,
            title: {
                visible: true,
                text: '',
                hOffset: 0,
                vOffset: -1.5,
                xpos: 'middle',
                ypos: 'top'
            }
        };
        return cfg;
    }
    static adjustConfig(cfg) {
    }
    onupdate(node) {
        this.updateTitleSize(node);
    }
    updateTitleSize(node) {
        if (node.dom) {
            const c = node.dom.lastChild;
            if (c && c.clientWidth > 0) {
                if (Chart.clientWidth !== c.clientWidth) {
                    Chart.clientWidth = c.clientWidth;
                    Chart.clientHeight = c.clientHeight;
                }
            }
        }
    }
    drawBackground(plotArea) {
        const tl = plotArea.tl;
        const br = plotArea.br;
        return this.rect({ x: tl.x, y: tl.y }, { w: br.x - tl.x, h: br.y - tl.y }, '');
    }
    drawTitle(plotArea, cfg) {
        const tl = plotArea.tl;
        const br = plotArea.br;
        cfg.title.cssClass = 'hs-graph-chart-title';
        switch (cfg.title.xpos) {
            case 'start':
                cfg.title.x = tl.x + '';
                break;
            case 'middle':
                cfg.title.x = (tl.x + br.x) / 2 + '';
                break;
            case 'end':
                cfg.title.x = br.x + '';
                break;
        }
        switch (cfg.title.ypos) {
            case 'top':
                cfg.title.y = tl.y + '';
                break;
            case 'center':
                cfg.title.y = (tl.y + br.y) / 2 + '';
                break;
            case 'bottom':
                cfg.title.y = br.y + '';
                break;
        }
        return !cfg.title.visible ? undefined : this.text(cfg.title, cfg.title.text);
    }
    view(node) {
        const cfg = node.attrs.cfg;
        const plotArea = node.attrs.plotArea;
        return mithril_1.m('svg', { class: 'hs-graph-chart' }, [
            this.drawBackground(plotArea),
            this.drawTitle(plotArea, cfg)
        ]);
    }
}
exports.Chart = Chart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvQ2hhcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFnQkEsNENBQWtEO0FBSWxELHVDQUE2QztBQU81QyxDQUFDO0FBS0YsV0FBbUIsU0FBUSxpQkFBTztJQXNCOUIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFVO1FBQzNCLEdBQUcsQ0FBQyxLQUFLLEdBQWdCO1lBQ3JCLE9BQU8sRUFBRSxJQUFJO1lBQ2IsS0FBSyxFQUFhO2dCQUNkLE9BQU8sRUFBRSxJQUFJO2dCQUNiLElBQUksRUFBQyxFQUFFO2dCQUNQLE9BQU8sRUFBRSxDQUFDO2dCQUNWLE9BQU8sRUFBRSxDQUFDLEdBQUc7Z0JBQ2IsSUFBSSxFQUFDLFFBQVE7Z0JBQ2IsSUFBSSxFQUFDLEtBQUs7YUFDYjtTQUNKLENBQUM7UUFDTixPQUFPLEdBQUcsQ0FBQztJQUNYLENBQUM7SUFNRCxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQVU7SUFDOUIsQ0FBQztJQUtELFFBQVEsQ0FBQyxJQUFZO1FBQ2pCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFL0IsQ0FBQztJQUVELGVBQWUsQ0FBQyxJQUFXO1FBRXZCLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNWLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO1lBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEdBQUMsQ0FBQyxFQUFFO2dCQUN0QixJQUFJLEtBQUssQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLFdBQVcsRUFBRTtvQkFDckMsS0FBSyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDO29CQUNsQyxLQUFLLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUM7aUJBQ3ZDO2FBQ0o7U0FDSjtJQUNMLENBQUM7SUFFRCxjQUFjLENBQUMsUUFBYTtRQUN4QixNQUFN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

/***/ }),

/***/ "../../../node_modules/hsgraph/Graph.js":
/*!************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hsgraph/Graph.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mithril_1 = __webpack_require__(/*! hsutil/mithril */ "../../../node_modules/hsutil/mithril.js");
const hsdatab_1 = __webpack_require__(/*! hsdatab */ "../../../node_modules/hsdatab/index.js");
const Axes_1 = __webpack_require__(/*! ./Axes */ "../../../node_modules/hsgraph/Axes.js");
const Scale_1 = __webpack_require__(/*! ./Scale */ "../../../node_modules/hsgraph/Scale.js");
const Canvas_1 = __webpack_require__(/*! ./Canvas */ "../../../node_modules/hsgraph/Canvas.js");
const Series_1 = __webpack_require__(/*! ./Series */ "../../../node_modules/hsgraph/Series.js");
const Chart_1 = __webpack_require__(/*! ./Chart */ "../../../node_modules/hsgraph/Chart.js");
const Grid_1 = __webpack_require__(/*! ./Grid */ "../../../node_modules/hsgraph/Grid.js");
const Legend_1 = __webpack_require__(/*! ./Legend */ "../../../node_modules/hsgraph/Legend.js");
const SVGElem_1 = __webpack_require__(/*! ./SVGElem */ "../../../node_modules/hsgraph/SVGElem.js");
const hsutil_1 = __webpack_require__(/*! hsutil */ "../../../node_modules/hsutil/index.js");
const viewBoxWidth = 1000;
let viewBoxHeight = 700;
function copy(def) {
    let result = {};
    Object.keys(def).map((k) => {
        if (typeof def[k] === 'object' && !Array.isArray(def[k]) && def[k] !== null) {
            result[k] = copy(def[k]);
        }
        else {
            result[k] = def[k];
        }
    });
    return result;
}
class Graph extends SVGElem_1.SVGElem {
    constructor() {
        super(...arguments);
        this.marginOffset = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        };
    }
    static makeConfig(userCfg) {
        const cfg = {};
        Graph.defaultConfig(cfg);
        Canvas_1.Canvas.defaultConfig(cfg);
        Axes_1.Axes.defaultConfig(cfg);
        Series_1.Series.defaultConfig(cfg);
        Grid_1.Grid.defaultConfig(cfg);
        Chart_1.Chart.defaultConfig(cfg);
        Legend_1.Legend.defaultConfig(cfg);
        if (userCfg) {
            try {
                userCfg(cfg);
            }
            catch (e) {
                console.log('error in usercfg');
                console.log(e);
                console.log(e.stack);
            }
        }
        return cfg;
    }
    static defaultConfig(cfg) {
        cfg.graph = {
            margin: {
                top: 10,
                left: 10,
                bottom: 10,
                right: 10
            },
            timeCond: {}
        };
    }
    static adjustConfig(cfg) {
        Canvas_1.Canvas.adjustConfig(cfg);
        Axes_1.Axes.adjustConfig(cfg);
        Series_1.Series.adjustConfig(cfg);
        Grid_1.Grid.adjustConfig(cfg);
        Chart_1.Chart.adjustConfig(cfg);
        Legend_1.Legend.adjustConfig(cfg);
    }
    createPlotArea(cfgm) {
        const tl = {
            x: cfgm.left + this.marginOffset.left,
            y: cfgm.top + this.marginOffset.top
        };
        const br = {
            x: viewBoxWidth - cfgm.right - this.marginOffset.right,
            y: viewBoxHeight - cfgm.bottom - this.marginOffset.bottom
        };
        return { tl: tl, br: br };
    }
    createData(cfg) {
        if (!cfg.series.data) {
            console.log('cfg.series.data not set');
        }
        if (!(cfg.series.data.length > 0)) {
            console.log('cfg.series.data not initialised with array of DataSets');
        }
        const timeCond = cfg.graph.timeCond;
        return cfg.series.data.map((d) => ((d instanceof hsdatab_1.Data) ? d : new hsdatab_1.Data(d)).filter(timeCond));
    }
    createScales(axes) {
        if (!this.scales) {
            this.scales = {
                primary: { x: new Scale_1.Scale(axes.primary.x.scale), y: new Scale_1.Scale(axes.primary.y.scale) },
                secondary: { x: new Scale_1.Scale(axes.secondary.x.scale), y: new Scale_1.Scale(axes.secondary.y.scale) }
            };
        }
        return this.scales;
    }
    adjustRange(plotArea, scales) {
        scales.primary.x.range([plotArea.tl.x, plotArea.br.x]);
        scales.primary.y.range([plotArea.br.y, plotArea.tl.y]);
        scales.secondary.x.range([plotArea.tl.x, plotArea.br.x]);
        scales.secondary.y.range([plotArea.br.y, plotArea.tl.y]);
    }
    adjustHeight(node) {
        if (node.dom && node.dom.parentElement) {
            const p = node.dom.parentElement;
            const temp = viewBoxWidth * p.clientHeight / p.clientWidth;
            if (!isNaN(temp) && temp !== viewBoxHeight) {
                viewBoxHeight = temp;
            }
        }
    }
    adjustMargins(cfg) {
        const cfgm = cfg.graph.margin;
        function getBBox(css) {
            const elems = document.getElementsByClassName(css);
            const box = Array.prototype.map.call(elems, (e) => e.getBBox());
            if (box && box[0]) {
                margin.t = Math.max(margin.t, cfgm.top - box[0].y);
                margin.l = Math.max(margin.l, cfgm.left - box[0].x);
                margin.b = Math.max(margin.b, box[0].y + box[0].height + cfgm.bottom - viewBoxHeight);
                margin.r = Math.max(margin.r, box[0].x + box[0].width + cfgm.right - viewBoxWidth);
            }
            margin.t = Math.min(margin.t, 40);
            margin.b = 30;
            margin.l = 40;
        }
        const margin = { t: -1e6, l: -1e6, b: -1e6, r: -1e6 };
        getBBox('hs-graph-axis');
        getBBox('hs-graph-chart');
        this.marginOffset.top += Math.max(margin.t);
        this.marginOffset.left += Math.max(margin.l);
        this.marginOffset.bottom += Math.max(margin.b);
        this.marginOffset.right += Math.max(margin.r);
    }
    onupdate(node) {
        this.adjustHeight(node);
    }
    oncreate(node) {
        window.addEventListener("resize", function () { mithril_1.m.redraw(); });
        this.adjustHeight(node);
        Promise.resolve(node.attrs.cfg)
            .then(hsutil_1.delay(10))
            .then(this.adjustMargins.bind(this))
            .then(mithril_1.m.redraw);
    }
    adjustDomains(cfg, scales, data) {
        const domains = [[1e20, -1e20], [1e20, -1e20]];
        cfg.series.map((s) => {
            if (s.x) {
                data[s.dataIndex].findDomain(s.x, domains[0]);
            }
            else {
                domains[0][0] = 0;
                domains[0][1] = data[s.dataIndex].export().rows.length - 1;
            }
            if (s.y) {
                data[s.dataIndex].findDomain(s.y, domains[1]);
            }
            if (s.yBase) {
                data[s.dataIndex].findDomain(s.yBase, domains[1]);
            }
        });
        scales.primary.x.setAutoDomain(domains[0]);
        scales.primary.y.setAutoDomain(domains[1]);
    }
    view(node) {
        const cfgFn = node.attrs.cfgFn;
        const cfg = Graph.makeConfig(cfgFn);
        const plotArea = this.createPlotArea(cfg.graph.margin);
        const scales = this.createScales(cfg.axes);
        this.adjustRange(plotArea, scales);
        const data = this.createData(cfg);
        this.adjustDomains(cfg.series, scales, data);
        Graph.adjustConfig(cfg);
        node.attrs.cfg = cfg;
        return mithril_1.m('svg', { class: 'hs-graph', width: '100%', height: '100%',
            viewBox: `0 0 ${SVGElem_1.round(viewBoxWidth)} ${SVGElem_1.round(viewBoxHeight)}` }, [
            mithril_1.m(Canvas_1.Canvas, { cfg: cfg.canvas }),
            mithril_1.m(Chart_1.Chart, { cfg: cfg.chart, plotArea: plotArea }),
            mithril_1.m(Grid_1.Grid, { cfg: cfg.grid, scales: scales }),
            mithril_1.m(Axes_1.Axes, { cfg: cfg.axes, scales: scales }),
            mithril_1.m(Series_1.Series, { cfg: cfg.series, scales: scales, data: data }),
            mithril_1.m(Legend_1.Legend, { cfg: cfg.legend })
        ]);
    }
}
exports.Graph = Graph;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JhcGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvR3JhcGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFpRUEsNENBQThDO0FBQzlDLHFDQUV1QztBQUN2QyxpQ0FBc0M7QUFHdEMsbUNBQXVDO0FBQ3ZDLHFDQUN3QztBQUN4QyxxQ0FFd0M7QUFDeEMsbUNBQ3VDO0FBQ3ZDLGlDQUNzQztBQUN0QyxxQ0FDd0M7QUFDeEMsdUNBR3lDO0FBQ3pDLG1DQUFzQztBQUV0QyxNQUFNLFlBQVksR0FBVyxJQUFJLENBQUM7QUFDbEMsSUFBTSxhQUFhLEdBQVUsR0FBRyxDQUFDO0FBaURqQyxjQUFjLEdBQU87SUFDakIsSUFBSSxNQUFNLEdBQU8sRUFBRSxDQUFDO0lBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBUSxFQUFFLEVBQUU7UUFDOUIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBRyxJQUFJLEVBQUU7WUFDdkUsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1QjthQUFNO1lBQ0gsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QjtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQVdELFdBQW1CLFNBQVEsaUJBQU87SUFBbEM7O1FBa0ZZLGlCQUFZLEdBQUc7WUFDbkIsSUFBSSxFQUFJLENBQUM7WUFDVCxLQUFLLEVBQUcsQ0FBQztZQUNULEdBQUcsRUFBSyxDQUFDO1lBQ1QsTUFBTSxFQUFFLENBQUM7U0FDWixDQUFDO0lB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QUFDLENBQUM7WUFDbEUsSUFBRyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNkLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEdBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxHQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEQsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ2pGLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRSxJQUFJLENBQUMsS0FBSyxHQUFFLFlBQVksQ0FBQyxDQUFDO2FBQ2xGO1lBQ0QsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDbEMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDZCxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNsQixDQUFDO1FBQ0QsTUFBTSxNQUFNLEdBQUcsRUFBQyxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMs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

/***/ }),

/***/ "../../../node_modules/hsgraph/Grid.js":
/*!***********************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hsgraph/Grid.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mithril_1 = __webpack_require__(/*! hsutil/mithril */ "../../../node_modules/hsutil/mithril.js");
const SVGElem_1 = __webpack_require__(/*! ./SVGElem */ "../../../node_modules/hsgraph/SVGElem.js");
class Grid extends SVGElem_1.SVGElem {
    static defaultConfig(cfg) {
        cfg.grid = {
            major: {
                hor: { visible: true },
                ver: { visible: true }
            },
            minor: {
                hor: { visible: false },
                ver: { visible: false }
            }
        };
    }
    static adjustConfig(cfg) {
    }
    drawHorGrid(cfg, scale, range, ticks) {
        return !cfg.visible ? mithril_1.m('svg') : mithril_1.m('svg', { class: 'hs-graph-grid-hor' }, ticks.marks.map((t) => this.horLine(range[0], range[1], scale.convert(t))));
    }
    drawVerGrid(cfg, scale, range, ticks) {
        return !cfg.visible ? mithril_1.m('svg') : mithril_1.m('svg', { class: 'hs-graph-grid-ver' }, ticks.marks.map((t) => this.verLine(scale.convert(t), range[0], range[1])));
    }
    view(node) {
        const cfg = node.attrs.cfg;
        const scales = node.attrs.scales;
        const ps = scales.primary;
        return mithril_1.m('svg', { class: 'hs-graph-grid' }, [
            mithril_1.m('svg', { class: 'hs-graph-grid-minor' }, [
                this.drawHorGrid(cfg.minor.hor, ps.y, ps.x.range(), ps.y.ticks().minor),
                this.drawVerGrid(cfg.minor.ver, ps.x, ps.y.range(), ps.x.ticks().minor)
            ]),
            mithril_1.m('svg', { class: 'hs-graph-grid-major' }, [
                this.drawHorGrid(cfg.major.hor, ps.y, ps.x.range(), ps.y.ticks().major),
                this.drawVerGrid(cfg.major.ver, ps.x, ps.y.range(), ps.x.ticks().major)
            ])
        ]);
    }
}
exports.Grid = Grid;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9HcmlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBaUJBLDRDQUE4QztBQUc5Qyx1Q0FBeUM7QUF5QnpDLFVBQWtCLFNBQVEsaUJBQU87SUFxQjdCLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBVTtRQUMzQixHQUFHLENBQUMsSUFBSSxHQUFnQjtZQUNwQixLQUFLLEVBQUU7Z0JBQ0gsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFDLElBQUksRUFBRTtnQkFDckIsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFDLElBQUksRUFBRTthQUN4QjtZQUNELEtBQUssRUFBRTtnQkFDSCxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUMsS0FBSyxFQUFFO2dCQUN0QixHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUMsS0FBSyxFQUFFO2FBQ3pCO1NBQ0osQ0FBQztJQUNOLENBQUM7SUFNRCxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQVU7SUFDOUIsQ0FBQztJQUtPLFdBQVcsQ0FBQyxHQUFxQixFQUFFLEtBQVcsRUFBRSxLQUFjLEVBQUUsS0FBYztRQUNsRixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQSxDQUFDLENBQUMsV0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFDLG1CQUFtQixFQUFFLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUMxRixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNyRCxDQUFDLENBQUM7SUFDUCxDQUFDO0lBS08sV0FBVyxDQUFDLEdBQXFCLEVBQUUsS0FBVyxFQUFFLEtBQWMsRUFBRSxLQUFjO1FBQ2xGLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFBLENBQUMsQ0FBQyxXQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUMsbUJBQW1CLEVBQUUsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQzFGLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ3JELENBQUMsQ0FBQztJQUNQLENBQUM7SUFHRCxJQUFJLENBQUMsSUFBWTtRQUNiLE1BQU0sR0FBRyxHQUFlLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQ3ZDLE1BQU0sTUFBTSxHQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ3hDLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDMUIsT0FBTyxXQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFDLGVBQWUsRUFBQyxFQUFFO1lBQ3RDLFdBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUMscUJBQXFCLEVBQUUsRUFBRTtnQkFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0JBQ3ZFLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDO2FBQzFFLENBQUM7WUFDRixXQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFDLHFCQUFxQixFQUFFLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDO2dCQUN2RSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQzthQUMxRSxDQUFDO1NBQ0wsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBM0VELG9CQTJFQyJ9

/***/ }),

/***/ "../../../node_modules/hsgraph/Legend.js":
/*!*************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hsgraph/Legend.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mithril_1 = __webpack_require__(/*! hsutil/mithril */ "../../../node_modules/hsutil/mithril.js");
;
class Legend {
    static defaultConfig(cfg) {
        cfg.legend = {};
    }
    static adjustConfig(cfg) {
    }
    view(node) {
        return mithril_1.m('svg', { class: 'hs-graph-legend', width: '100%', height: '100%' });
    }
}
exports.Legend = Legend;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGVnZW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0xlZ2VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWdCQSw0Q0FBMEM7QUFPekMsQ0FBQztBQUVGO0lBYUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFVO1FBQzNCLEdBQUcsQ0FBQyxNQUFNLEdBQWlCLEVBQzFCLENBQUM7SUFDTixDQUFDO0lBTUQsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFVO0lBRTlCLENBQUM7SUFFRCxJQUFJLENBQUMsSUFBWTtRQUNiLE9BQU8sV0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBQyxpQkFBaUIsRUFBRSxLQUFLLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO0lBQzdFLENBQUM7Q0FDSjtBQTdCRCx3QkE2QkMifQ==

/***/ }),

/***/ "../../../node_modules/hsgraph/Plot.js":
/*!***********************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hsgraph/Plot.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mithril_1 = __webpack_require__(/*! hsutil/mithril */ "../../../node_modules/hsutil/mithril.js");
const SVGElem_1 = __webpack_require__(/*! ./SVGElem */ "../../../node_modules/hsgraph/SVGElem.js");
const Series_1 = __webpack_require__(/*! ./Series */ "../../../node_modules/hsgraph/Series.js");
const hsutil_1 = __webpack_require__(/*! hsutil */ "../../../node_modules/hsutil/index.js");
class Plot extends SVGElem_1.SVGElem {
    drawLine(clipID, data, x, y, scales, sStyle, title) {
        const style = `stroke: ${sStyle.line.color}; stroke-width:${sStyle.line.width};`;
        return !sStyle.line.visible ? mithril_1.m('.invisible-line', '') : this.polyline(data, x, y, scales, clipID, style, title);
    }
    drawMarker(clipID, data, x, y, scales, sStyle, title) {
        const mrk = Series_1.Series.marker;
        let style = `fill:${sStyle.marker.color}`;
        return !sStyle.marker.visible ? mithril_1.m('.invisible-marker', '') : mithril_1.m('svg', { class: 'hs-graph-series-markers' }, data.map((p) => {
            const cx = scales.x.convert(p[x]);
            const cy = scales.y.convert(p[y]);
            const r = sStyle.marker.size;
            switch (sStyle.marker.shape) {
                case mrk.circle:
                    return this.circle({ x: cx, y: cy }, r, style, title);
                case mrk.square:
                    return this.rect({ x: cx - r, y: cy - r }, { w: 2 * r, h: 2 * r }, style, title);
                case mrk.diamond:
                    return this.shape([[cx - r, cy], [cx, cy + r], [cx + r, cy], [cx, cy - r]], undefined, style, title);
                case mrk.upTriangle:
                    return this.shape([[cx - r, cy + r], [cx + r, cy + r], [cx, cy - r]], undefined, style, title);
                case mrk.downTriangle:
                    return this.shape([[cx - r, cy - r], [cx + r, cy - r], [cx, cy + r]], undefined, style, title);
            }
            return mithril_1.m(`.unkown-marker-${sStyle.marker.shape}`, '');
        }));
    }
    drawLabel(clipID, data, x, y, lbl, scales, sDef) {
        const sStyle = sDef.style;
        const cfg = {
            text: '',
            cssClass: ``,
            style: `fill:${sStyle.label.color}`,
            xpos: SVGElem_1.TextHAlign.middle,
            ypos: SVGElem_1.TextVAlign.center,
            hOffset: sDef.hOffset,
            vOffset: sDef.vOffset
        };
        return !sStyle.marker.visible ? mithril_1.m('.invisible-marker', '') : mithril_1.m('svg', { class: 'hs-graph-series-labels' }, data.map((p) => {
            cfg.x = '' + scales.x.convert(p[x]);
            cfg.y = '' + scales.y.convert(p[y]);
            return this.text(cfg, hsutil_1.round(p[lbl], 3));
        }));
    }
    drawArea(clipID, data, x, yFore, yBack, scales, sStyle, title) {
        if (sStyle.fill.visible) {
            const style = `fill: ${sStyle.fill.color};`;
            const drawFore = data;
            const drawBack = data.slice().reverse();
            return this.polygon(drawFore, drawBack, x, yFore, yBack, scales, clipID, style, title);
        }
        else {
            mithril_1.m('.invisible-line', '');
        }
    }
    setDefaults(data, series, scales) {
    }
}
exports.Plot = Plot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxvdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9QbG90LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBS0EsNENBQThDO0FBQzlDLHVDQUd5QztBQUl6QyxxQ0FFd0M7QUFDeEMsbUNBQXNDO0FBRXRDLFVBQTJCLFNBQVEsaUJBQU87SUFDdEMsUUFBUSxDQUFDLE1BQWEsRUFBRSxJQUFjLEVBQUUsQ0FBUSxFQUFFLENBQVEsRUFBRSxNQUFjLEVBQUUsTUFBa0IsRUFBRSxLQUFhO1FBQ3pHLE1BQU0sS0FBSyxHQUFHLFdBQVcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLGtCQUFrQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDO1FBQ2pGLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQSxDQUFDLENBQUMsV0FBQyxDQUFDLGlCQUFpQixFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ25ILENBQUM7SUFFRCxVQUFVLENBQUMsTUFBYSxFQUFFLElBQWMsRUFBRSxDQUFRLEVBQUUsQ0FBUSxFQUFFLE1BQWMsRUFBRSxNQUFrQixFQUFFLEtBQWE7UUFDM0csTUFBTSxHQUFHLEdBQUcsZUFBTSxDQUFDLE1BQU0sQ0FBQztRQUMxQixJQUFJLEtBQUssR0FBRyxRQUFRLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDMUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFBLENBQUMsQ0FBQyxXQUFDLENBQUMsbUJBQW1CLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBQyxLQUFLLEVBQUMseUJBQXlCLEVBQUMsRUFDakcsSUFB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

/***/ }),

/***/ "../../../node_modules/hsgraph/PlotArea.js":
/*!***************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hsgraph/PlotArea.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mithril_1 = __webpack_require__(/*! hsutil/mithril */ "../../../node_modules/hsutil/mithril.js");
const Plot_1 = __webpack_require__(/*! ./Plot */ "../../../node_modules/hsgraph/Plot.js");
class PlotArea extends Plot_1.Plot {
    plot(data, series, scales, i, clipID) {
        const x = data.colNumber(series.x);
        const y = data.colNumber(series.y);
        const yBase = data.colNumber(series.yBase);
        const yMax = data.colNumber('$sum');
        const mapRow = (row) => (yMax === undefined) ? [
            row[x],
            row[y] + row[yBase],
            row[yBase]
        ] : [
            row[x],
            (row[y] + row[yBase]) / row[yMax],
            row[yBase] / row[yMax]
        ];
        if (y === undefined) {
            return mithril_1.m('.error', '');
        }
        if (series.map) {
            const d = data.getData().map(mapRow);
            return [this.drawArea(clipID, d, 0, 1, 2, scales, series.style, series.y)];
        }
        else {
            const d = data.getData();
            return [this.drawArea(clipID, d, x, y, yBase, scales, series.style, series.y)];
        }
    }
}
exports.PlotArea = PlotArea;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxvdEFyZWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvUGxvdEFyZWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUF1REEsNENBQThDO0FBRzlDLGlDQUFzQztBQUd0QyxjQUFzQixTQUFRLFdBQUk7SUFDOUIsSUFBSSxDQUFDLElBQVMsRUFBRSxNQUFnQixFQUFFLE1BQWMsRUFBRSxDQUFRLEVBQUUsTUFBYTtRQUNyRSxNQUFNLENBQUMsR0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QyxNQUFNLENBQUMsR0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxNQUFNLElBQUksR0FBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sTUFBTSxHQUFHLENBQUMsR0FBUyxFQUFFLEVBQUUsQ0FDekIsQ0FBQyxJQUFJLEtBQUcsU0FBUyxDQUFDLENBQUEsQ0FBQyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDTixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUNqQixHQUFHLENBQUMsS0FBSyxDQUFDO1NBQ2IsQ0FBQyxDQUFDLENBQUM7WUFDQSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ04sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztZQUMvQixHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztTQUN6QixDQUFDO1FBQ04sSUFBSSxDQUFDLEtBQUcsU0FBUyxFQUFFO1lBQUUsT0FBTyxXQUFDLENBQUMsUUFBUSxFQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQUU7UUFDN0MsSUFBSSxNQUFNLENBQUMsR0FBRyxFQUFFO1lBQ1osTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzlFO2FBQU07WUFDSCxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDekIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsRjtJQUNMLENBQUM7Q0FDSjtBQXpCRCw0QkF5QkMifQ==

/***/ }),

/***/ "../../../node_modules/hsgraph/PlotBar.js":
/*!**************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hsgraph/PlotBar.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mithril_1 = __webpack_require__(/*! hsutil/mithril */ "../../../node_modules/hsutil/mithril.js");
const Plot_1 = __webpack_require__(/*! ./Plot */ "../../../node_modules/hsgraph/Plot.js");
class PlotBar extends Plot_1.Plot {
    drawBar(clipID, data, x, y, y0, scales, sStyle, s) {
        const style = `fill: ${sStyle.bar.color};`;
        const index = (x === undefined);
        const domain = scales.x.domain();
        const offset = s * sStyle.bar.offset * (domain[1] - domain[0]) / (100 * data.getData().length);
        const width = sStyle.bar.width * (domain[1] - domain[0]) / (100 * data.getData().length);
        return mithril_1.m('svg', { class: 'hs-graph-series-bars' }, data.getData().map((p, i) => {
            const rx0 = scales.x.convert((index ? i : p[x]) + offset - width / 2);
            const rx1 = scales.x.convert((index ? i : p[x]) + offset + width / 2);
            const ry0 = scales.y.convert(y0 === undefined ? 0 : p[y0]);
            const ry = scales.y.convert(p[y]);
            return this.rect({ x: rx0, y: ry0 }, { h: ry - ry0, w: rx1 - rx0 }, style);
        }));
    }
    setDefaults(data, series, scales) {
        super.setDefaults(data, series, scales);
        let dom = scales.y.domain();
        if (dom[0] > 0) {
            dom[0] = 0;
            scales.y.domain(dom);
        }
        if (series.x === undefined) {
            scales.x.domain([-0.5, data.getData().length - 0.5]);
        }
    }
    plot(data, series, scales, i, clipID) {
        const x = data.colNumber(series.x);
        const y = data.colNumber(series.y);
        const yBase = series.yBase ? data.colNumber(series.yBase) : undefined;
        if (y === undefined) {
            return mithril_1.m('.error', '');
        }
        return [
            this.drawBar(clipID, data, x, y, yBase, scales, series.style, i),
        ];
    }
}
exports.PlotBar = PlotBar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxvdEJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9QbG90QmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBaURBLDRDQUE4QztBQUk5QyxpQ0FBc0M7QUFJdEMsYUFBcUIsU0FBUSxXQUFJO0lBQzdCLE9BQU8sQ0FBQyxNQUFhLEVBQUUsSUFBUyxFQUFFLENBQVEsRUFBRSxDQUFRLEVBQUUsRUFBUyxFQUFFLE1BQWMsRUFBRSxNQUFrQixFQUFFLENBQVE7UUFDekcsTUFBTSxLQUFLLEdBQUcsU0FBUyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDO1FBQzNDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sTUFBTSxHQUFjLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDNUMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFFLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1RixNQUFNLEtBQUssR0FBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUYsT0FBTyxXQUFDLENBQUMsS0FBSyxFQUFFLEVBQUMsS0FBSyxFQUFDLHNCQUFzQixFQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FDOUQsQ0FBQyxDQUFVLEVBQUUsQ0FBUSxFQUFFLEVBQUU7WUFDckIsTUFBTSxHQUFH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

/***/ }),

/***/ "../../../node_modules/hsgraph/PlotLine.js":
/*!***************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hsgraph/PlotLine.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mithril_1 = __webpack_require__(/*! hsutil/mithril */ "../../../node_modules/hsutil/mithril.js");
const Plot_1 = __webpack_require__(/*! ./Plot */ "../../../node_modules/hsgraph/Plot.js");
class PlotLine extends Plot_1.Plot {
    plot(data, series, scales, i, clipID) {
        const x = data.colNumber(series.x);
        const y = data.colNumber(series.y);
        if (x === undefined) {
            return mithril_1.m('.error', '');
        }
        if (y === undefined) {
            return mithril_1.m('.error', '');
        }
        return [
            this.drawLine(clipID, data.getData(), x, y, scales, series.style, series.y),
            this.drawMarker(clipID, data.getData(), x, y, scales, series.style, series.y)
        ];
    }
}
exports.PlotLine = PlotLine;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxvdExpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvUGxvdExpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFnQ0EsNENBQTBDO0FBRzFDLGlDQUFrQztBQUdsQyxjQUFzQixTQUFRLFdBQUk7SUFDOUIsSUFBSSxDQUFDLElBQVMsRUFBRSxNQUFnQixFQUFFLE1BQWMsRUFBRSxDQUFRLEVBQUUsTUFBYTtRQUNyRSxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsS0FBRyxTQUFTLEVBQUU7WUFBRSxPQUFPLFdBQUMsQ0FBQyxRQUFRLEVBQUMsRUFBRSxDQUFDLENBQUM7U0FBRTtRQUM3QyxJQUFJLENBQUMsS0FBRyxTQUFTLEVBQUU7WUFBRSxPQUFPLFdBQUMsQ0FBQyxRQUFRLEVBQUMsRUFBRSxDQUFDLENBQUM7U0FBRTtRQUM3QyxPQUFPO1lBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUMzRSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ2hGLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFYRCw0QkFXQyJ9

/***/ }),

/***/ "../../../node_modules/hsgraph/PlotMarkers.js":
/*!******************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hsgraph/PlotMarkers.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mithril_1 = __webpack_require__(/*! hsutil/mithril */ "../../../node_modules/hsutil/mithril.js");
const Plot_1 = __webpack_require__(/*! ./Plot */ "../../../node_modules/hsgraph/Plot.js");
class PlotMarkers extends Plot_1.Plot {
    plot(data, series, scales, i, clipID) {
        const x = data.colNumber(series.x);
        const y = data.colNumber(series.y);
        const l = series.l ? data.colNumber(series.l) : undefined;
        if (x === undefined) {
            return mithril_1.m('.error', '');
        }
        if (y === undefined) {
            return mithril_1.m('.error', '');
        }
        return [
            this.drawMarker(clipID, data.getData(), x, y, scales, series.style, series.y),
            (l === undefined) ? undefined :
                this.drawLabel(clipID, data.getData(), x, y, l, scales, series)
        ];
    }
}
exports.PlotMarkers = PlotMarkers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxvdE1hcmtlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvUGxvdE1hcmtlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFpQ0EsNENBQTBDO0FBRzFDLGlDQUFrQztBQUdsQyxpQkFBeUIsU0FBUSxXQUFJO0lBQ2pDLElBQUksQ0FBQyxJQUFTLEVBQUUsTUFBZ0IsRUFBRSxNQUFjLEVBQUUsQ0FBUSxFQUFFLE1BQWE7UUFDckUsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUN6RCxJQUFJLENBQUMsS0FBRyxTQUFTLEVBQUU7WUFBRSxPQUFPLFdBQUMsQ0FBQyxRQUFRLEVBQUMsRUFBRSxDQUFDLENBQUM7U0FBRTtRQUM3QyxJQUFJLENBQUMsS0FBRyxTQUFTLEVBQUU7WUFBRSxPQUFPLFdBQUMsQ0FBQyxRQUFRLEVBQUMsRUFBRSxDQUFDLENBQUM7U0FBRTtRQUM3QyxPQUFPO1lBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM3RSxDQUFDLENBQUMsS0FBRyxTQUFTLENBQUMsQ0FBQSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1NBQ3RFLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFiRCxrQ0FhQyJ9

/***/ }),

/***/ "../../../node_modules/hsgraph/SVGElem.js":
/*!**************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hsgraph/SVGElem.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mithril_1 = __webpack_require__(/*! hsutil/mithril */ "../../../node_modules/hsutil/mithril.js");
function round(num) {
    const result = num.toFixed(1);
    if (result === 'Infinity') {
        return '1e20';
    }
    return result;
}
exports.round = round;
var TextHAlign;
(function (TextHAlign) {
    TextHAlign["start"] = "start";
    TextHAlign["middle"] = "middle";
    TextHAlign["end"] = "end";
})(TextHAlign = exports.TextHAlign || (exports.TextHAlign = {}));
var TextVAlign;
(function (TextVAlign) {
    TextVAlign["top"] = "top";
    TextVAlign["center"] = "center";
    TextVAlign["bottom"] = "bottom";
})(TextVAlign = exports.TextVAlign || (exports.TextVAlign = {}));
class SVGElem {
    text(cfg, text) {
        let yShift = 0;
        let hAlign = cfg.xpos;
        switch (cfg.xpos) {
            case TextHAlign.start: break;
            case TextHAlign.end: break;
            case TextHAlign.middle:
            default:
                hAlign = TextHAlign.middle;
                break;
        }
        switch (cfg.ypos) {
            case TextVAlign.top:
                yShift = 0.7;
                break;
            case TextVAlign.center:
                yShift = 0.35;
                break;
            case TextVAlign.bottom:
            default:
                yShift = 0;
                break;
        }
        const param = {
            x: cfg.x || '',
            y: cfg.y || '',
            dx: round(cfg.hOffset || 0) + 'em',
            dy: round((cfg.vOffset || 0) + yShift) + 'em',
            style: `text-anchor:${hAlign}; ${cfg.style || ''}`,
            class: cfg.cssClass,
        };
        return mithril_1.m('text', param, text);
    }
    rect(tl, area, style, title) {
        if (area.w < 0) {
            tl.x += area.w;
            area.w = -area.w;
        }
        if (area.h < 0) {
            tl.y += area.h;
            area.h = -area.h;
        }
        const param = {
            x: round(tl.x), y: round(tl.y),
            width: round(area.w) + (area.wunit || ''),
            height: round(area.h) + (area.hunit || ''),
            style: style
        };
        return mithril_1.m('rect', param);
    }
    circle(c, r, style, title) {
        return mithril_1.m('circle', { cx: round(c.x), cy: round(c.y), r: round(r), style: style }, mithril_1.m('title', title));
    }
    clipRect(tl, area, id) {
        if (area.h < 0) {
            console.log(area);
        }
        const param = {
            x: round(tl.x), y: round(tl.y),
            width: round(Math.abs(area.w)) + (area.wunit || ''),
            height: round(Math.abs(area.h)) + (area.hunit || '')
        };
        return mithril_1.m('defs', mithril_1.m('clipPath', { id: id }, mithril_1.m('rect', param)));
    }
    line(x0, x1, y0, y1, cssClass) {
        const param = {
            x1: round(x0), y1: round(y0),
            x2: round(x1), y2: round(y1),
            class: cssClass
        };
        return mithril_1.m('line', param);
    }
    horLine(x0, x1, y, cssClass) {
        const param = {
            x1: round(x0), y1: round(y),
            x2: round(x1), y2: round(y),
            class: cssClass
        };
        return mithril_1.m('line', param);
    }
    verLine(x, y0, y1, cssClass) {
        const param = {
            x1: round(x), y1: round(y0),
            x2: round(x), y2: round(y1),
            class: cssClass
        };
        return mithril_1.m('line', param);
    }
    polyline(data, x, y, scales, id, style, title) {
        return mithril_1.m('polyline', {
            'clip-path': id ? `url(#${id})` : undefined,
            style: style,
            points: data.map((row) => `${round(scales.x.convert(row[x]))},${round(scales.y.convert(row[y]))}`).join(' ')
        }, mithril_1.m('title', title));
    }
    polygon(dataFore, dataBack, x, yFore, yBack, scales, id, style, title) {
        const indexed = (x === undefined);
        const sx = (_x) => round(scales.x.convert(_x));
        const sy = (_y) => round(scales.y.convert(_y));
        const clip = id ? `url(#${id})` : undefined;
        const points = dataFore.map((row, i) => `${sx(indexed ? i : row[x])},${sy(row[yFore])}`)
            .concat(dataBack.map((row, i) => `${sx(indexed ? (dataBack.length - i - 1) : row[x])},${sy(yBack ? row[yBack] : 0)}`)).join(' ');
        return mithril_1.m('polygon', { 'clip-path': clip, style: style, points: points }, mithril_1.m('title', title));
    }
    shape(points, id, style, title) {
        return mithril_1.m('polyline', {
            'clip-path': id ? `url(#${id})` : undefined,
            style: style,
            points: points.map((row) => `${round(row[0])},${round(row[1])}`).join(' ')
        }, mithril_1.m('title', title));
    }
}
exports.SVGElem = SVGElem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1ZHRWxlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9TVkdFbGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQTBDO0FBd0UxQyxlQUF1QixHQUFVO0lBQzdCLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUIsSUFBSSxNQUFNLEtBQUssVUFBVSxFQUFFO1FBQ3ZCLE9BQU8sTUFBTSxDQUFDO0tBQ2pCO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQU5ELHNCQU1DO0FBRUQsSUFBWSxVQUlYO0FBSkQsV0FBWSxVQUFVO0lBQ2xCLDZCQUFpQixDQUFBO0lBQ2pCLCtCQUFrQixDQUFBO0lBQ2xCLHlCQUFlLENBQUE7QUFDbkIsQ0FBQyxFQUpXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBSXJCO0FBRUQsSUFBWSxVQUlYO0FBSkQsV0FBWSxVQUFVO0lBQ2xCLHlCQUFlLENBQUE7SUFDZiwrQkFBa0IsQ0FBQTtJQUNsQiwrQkFBa0IsQ0FBQTtBQUN0QixDQUFDLEVBSlcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFJckI7QUFFRDtJQU1JLElBQUksQ0FBQyxHQUFZLEVBQUUsSUFBVztRQUMxQixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLE1BQU0sR0FBYyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ2pDLFFBQU8sR0FBRyxDQUFDLElBQUksRUFBRTtZQUNiLEtBQUssVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFFLE1BQU07WUFDOUIsS0FBSyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUksTUFBTTtZQUM5QixLQUFLLFVBQVUsQ0FBQyxNQUFNLENBQUM7WUFDdkI7Z0JBQWUsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7Z0JBQUMsTUFBTTtTQUNwRDtRQUNELFFBQU8sR0FBRyxDQUFDLElBQUksRUFBRTtZQUNiLEtB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

/***/ }),

/***/ "../../../node_modules/hsgraph/Scale.js":
/*!************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hsgraph/Scale.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Axes_1 = __webpack_require__(/*! ./Axes */ "../../../node_modules/hsgraph/Axes.js");
const hsutil_1 = __webpack_require__(/*! hsutil */ "../../../node_modules/hsutil/index.js");
function addTickNumber(t, v) {
    t.labels.push({ pos: v, text: '' + Math.round(v * 1000000) / 1000000 });
}
function addTickDate(t, v, fmt) {
    t.labels.push({ pos: v.getTime(), text: hsutil_1.date(fmt, v) });
}
function linScaleTickMarks(dom, ticks, numTicks) {
    function addTicks(unit, ticks) {
        let exp = Math.pow(10, Math.floor(Math.log10(unit)));
        unit = Math.floor(unit / exp) * exp;
        const min = Math.floor(dom[0] / unit) * unit;
        const max = Math.ceil(dom[1] / unit) * unit;
        for (let v = min; v <= max; v += unit) {
            addTickNumber(ticks, v);
        }
        return unit;
    }
    const majorUnit = addTicks((dom[1] - dom[0]) / numTicks, ticks.major);
    addTicks(majorUnit / numTicks, ticks.minor);
}
function percentScaleTickMarks(dom, ticks, numTicks) {
    const formatPercent = (m) => m.text = `${Math.round(m.pos) * 100}%`;
    linScaleTickMarks(dom, ticks, numTicks);
    ticks.major.labels.forEach(formatPercent);
    ticks.minor.labels.forEach(formatPercent);
}
function logScaleTickMarks(dom, ticks) {
    dom[0] = Math.max(dom[0], 1e-20);
    dom[1] = Math.max(dom[1], 1e-20);
    let dif = Math.pow(10, Math.floor(Math.log10(dom[1] - dom[0])));
    let min = Math.pow(10, Math.floor(Math.log10(dom[0])));
    let max = Math.pow(10, Math.ceil(Math.log10(dom[1])));
    if (dif > min) {
        for (let v = min; v <= max; v *= 10) {
            for (let i = 1; i <= 20; i++) {
                if (i === 1 && v * i < max) {
                    addTickNumber(ticks.major, v * i);
                }
                else if (i % 10 === 0) { }
                else if (i < 10) {
                    addTickNumber(ticks.minor, v * i);
                }
                else if (i % 2 === 0) {
                    addTickNumber(ticks.minor, v * i);
                }
            }
        }
    }
    else {
        min = Math.floor(dom[0] / dif) * dif;
        max = Math.ceil(dom[1] / dif) * dif;
        if ((max - min) / dif < 4) {
            dif /= 2;
        }
        for (let v = min; v <= max; v += dif) {
            addTickNumber(ticks.major, v);
        }
        addTickNumber(ticks.major, min);
        addTickNumber(ticks.major, max);
    }
}
const tickCategories = [
    [10, 0, 0, 0], [5, 0, 0, 0], [2, 0, 0, 0], [1, 0, 0, 0], [0, 6, 0, 0], [0, 3, 0, 0], [0, 1, 0, 0], [0, 0, 7, 0], [0, 0, 1, 0], [0, 0, 0, 4], [0, 0, 0, 1]
];
function dateScaleTickMarks(dom, ticks, fmt = '%MM/%DD/%YY') {
    function addDates(i, tickDefs) {
        const createDate = (idx) => new Date(Math.floor(dateDom[idx].getFullYear() / modYr) * modYr + (idx ? incYr : 0), (incYr > 0) ? 0 : Math.floor(dateDom[idx].getMonth() / modMo) * modMo + (idx ? incMo : 0), (incMo > 0) ? 1 : (dateDom[idx].getDate() - ((incDay === 7) ? dateDom[idx].getDay() : 0)) + (idx ? incDay : 0), (incDay > 0) ? 0 : (dateDom[idx].getHours()) + (idx ? incHour : 0));
        const incYr = tickCategories[i][0];
        const incMo = tickCategories[i][1];
        const incDay = tickCategories[i][2];
        const incHour = tickCategories[i][3];
        const modYr = incYr || 1;
        const modMo = incMo || 1;
        const date0 = createDate(0);
        const date1 = createDate(1);
        fmt = incHour ? '%hh:%mm' : '%MM/%DD/%YY';
        for (let d = date0; d <= date1; d = new Date(d.getFullYear() + incYr, d.getMonth() + incMo, d.getDate() + incDay, d.getHours() + incHour)) {
            addTickDate(tickDefs, d, fmt);
        }
    }
    const dateDom = [
        (typeof dom[0] === 'number') ? new Date(dom[0]) : dom[0],
        (typeof dom[1] === 'number') ? new Date(dom[1]) : dom[1]
    ];
    if (isNaN(dateDom[0].getTime())) {
        dateDom[0] = new Date('1/1/1980');
    }
    if (isNaN(dateDom[1].getTime())) {
        dateDom[0] = new Date();
    }
    const d = dateDom[1].getTime() - dateDom[0].getTime();
    tickCategories.some((cat, i) => {
        const dMin = hsutil_1.ms.fromDays((cat[0] * 365 + cat[1] * 30 + cat[2])) + hsutil_1.ms.fromHours(cat[3]);
        if (d > 3 * dMin) {
            addDates(i, ticks.major);
            addDates(Math.min(i + 1, tickCategories.length - 1), ticks.minor);
            return true;
        }
        else {
            return false;
        }
    });
}
function createTickLabels(type, domain, numTicks, fmt) {
    const sort = (a, b) => a.pos - b.pos;
    function sortTicks() {
        ticks.minor.labels.sort(sort);
        ticks.major.labels.sort(sort);
    }
    ;
    const dom = [domain[0], domain[1]];
    const ticks = {
        major: { marks: [], labels: [] },
        minor: { marks: [], labels: [] }
    };
    switch (type) {
        case Axes_1.Axes.type.log:
            logScaleTickMarks(dom, ticks);
            sortTicks();
            break;
        case Axes_1.Axes.type.date:
            dateScaleTickMarks(dom, ticks, fmt);
            sortTicks();
            break;
        case Axes_1.Axes.type.percent:
            percentScaleTickMarks(dom, ticks, numTicks);
            sortTicks();
            break;
        case Axes_1.Axes.type.ordinal: break;
        case Axes_1.Axes.type.nominal: break;
        case Axes_1.Axes.type.index:
        case Axes_1.Axes.type.linear:
        default:
            linScaleTickMarks(dom, ticks, numTicks);
            sortTicks();
    }
    return ticks;
}
class Scale {
    constructor(cfg) {
        this.cfg = cfg;
        this.typeVal = Axes_1.Axes.type.linear;
        this.rangeVal = [0, 1];
        this.domVal = [0, 1];
        this.domMinAuto = 0;
        this.domMaxAuto = 0;
        this.scaleType(cfg.type);
        this.domain(cfg.domain);
    }
    setLabelFormat(labelFmt) {
        this.labelFmt = labelFmt;
    }
    range(r) {
        if (r) {
            this.rangeVal = r;
        }
        return this.rangeVal;
    }
    domain(dom) {
        if (dom) {
            if (this.scaleType() === Axes_1.Axes.type.date) {
                if (typeof dom[0] === 'string' || typeof dom[1] === 'string') {
                    this.domVal[0] = (dom[0] === 'auto') ? 0 : Date.parse(dom[0]);
                    this.domVal[1] = (dom[1] === 'auto') ? 1 : Date.parse(dom[1]);
                }
            }
            else {
                this.domVal[0] = (dom[0] === 'auto') ? 0 : dom[0];
                this.domVal[1] = (dom[1] === 'auto') ? 1 : dom[1];
            }
            switch (dom[0]) {
                case 'tight':
                    this.domMinAuto = 2;
                    break;
                case 'auto':
                    this.domMinAuto = 1;
                    break;
                default: this.domMinAuto = 0;
            }
            switch (dom[1]) {
                case 'tight':
                    this.domMaxAuto = 2;
                    break;
                case 'auto':
                    this.domMaxAuto = 1;
                    break;
                default: this.domMaxAuto = 0;
            }
        }
        if (this.typeVal === Axes_1.Axes.type.log) {
            if (this.domVal[1] <= 0) {
                this.domVal[1] = 10;
            }
            if (this.domVal[0] <= 0) {
                this.domVal[0] = this.domVal[1] / 10;
            }
        }
        return this.domVal;
    }
    scaleType(s) {
        if (s) {
            this.typeVal = s;
        }
        return this.typeVal;
    }
    setAutoDomain(dom) {
        const ticks = createTickLabels(this.scaleType(), dom, 4, this.labelFmt);
        switch (this.domMinAuto) {
            case 1:
                this.domVal[0] = ticks.major.labels[0] ? ticks.major.labels[0].pos : dom[0];
                break;
            case 2:
                this.domVal[0] = dom[0];
                break;
        }
        switch (this.domMaxAuto) {
            case 1:
                this.domVal[1] = ticks.major.labels[ticks.major.labels.length - 1].pos;
                break;
            case 2:
                this.domVal[1] = dom[1];
                break;
        }
    }
    ticks(numTicks = 4) {
        function marksFromLabels(ticks, type) {
            switch (type) {
                case Axes_1.Axes.type.nominal:
                case Axes_1.Axes.type.index:
                    const numLabels = ticks.major.labels.length;
                    ticks.major.marks = Array(numLabels + 1).fill(1).map((e, i) => i - 0.5);
                    ticks.minor.marks = ticks.minor.labels ? ticks.minor.labels.map((l) => l.pos) : [];
                    break;
                case Axes_1.Axes.type.log:
                case Axes_1.Axes.type.date:
                case Axes_1.Axes.type.percent:
                case Axes_1.Axes.type.ordinal:
                case Axes_1.Axes.type.linear:
                default:
                    ticks.major.marks = ticks.major.labels ? ticks.major.labels.map((l) => l.pos) : [];
                    ticks.minor.marks = ticks.minor.labels ? ticks.minor.labels.map((l) => l.pos) : [];
            }
        }
        const dom = [this.domain()[0], this.domain()[1]];
        const inRange = (t) => t.pos >= dom[0] && t.pos <= dom[1];
        const ticks = createTickLabels(this.scaleType(), this.domain(), numTicks, this.labelFmt);
        ticks.minor.labels = ticks.minor.labels.filter(inRange);
        ticks.major.labels = ticks.major.labels.filter(inRange);
        if (ticks.major.labels.length === 0) {
            ticks.major.labels = ticks.minor.labels;
            ticks.minor.labels = [];
        }
        marksFromLabels(ticks, this.scaleType());
        return ticks;
    }
    convert(domVal) {
        const dom = this.domain();
        const range = this.range();
        const domMin = dom[0];
        const domMax = dom[1];
        let result;
        switch (this.scaleType()) {
            case Axes_1.Axes.type.log:
                result = Math.log(domVal / domMin) / Math.log(domMax / domMin) * (range[1] - range[0]) + range[0];
                break;
            case Axes_1.Axes.type.nominal: break;
            case Axes_1.Axes.type.date:
            case Axes_1.Axes.type.percent:
            case Axes_1.Axes.type.index:
            case Axes_1.Axes.type.ordinal:
            case Axes_1.Axes.type.linear:
            default:
                result = (domVal - domMin) / (domMax - domMin) * (range[1] - range[0]) + range[0];
        }
        return result;
    }
}
exports.Scale = Scale;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NhbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvU2NhbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFPQSxpQ0FBc0M7QUFDdEMsbUNBQXNDO0FBT3RDLHVCQUF1QixDQUFVLEVBQUUsQ0FBUTtJQUN2QyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBQyxPQUFPLENBQUMsR0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQ3RFLENBQUM7QUFFRCxxQkFBcUIsQ0FBVSxFQUFFLENBQU0sRUFBRSxHQUFVO0lBQy9DLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUMsYUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDM0QsQ0FBQztBQUlELDJCQUEyQixHQUFZLEVBQUUsS0FBVyxFQUFFLFFBQWU7SUFDakUsa0JBQWtCLElBQVcsRUFBRSxLQUFjO1FBQ3pDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckQsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFDLEdBQUcsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBQyxJQUFJLENBQUM7UUFDekMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUMs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

/***/ }),

/***/ "../../../node_modules/hsgraph/Series.js":
/*!*************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hsgraph/Series.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mithril_1 = __webpack_require__(/*! hsutil/mithril */ "../../../node_modules/hsutil/mithril.js");
const SVGElem_1 = __webpack_require__(/*! ./SVGElem */ "../../../node_modules/hsgraph/SVGElem.js");
const Axes_1 = __webpack_require__(/*! ./Axes */ "../../../node_modules/hsgraph/Axes.js");
const PlotLine_1 = __webpack_require__(/*! ./PlotLine */ "../../../node_modules/hsgraph/PlotLine.js");
const PlotMarkers_1 = __webpack_require__(/*! ./PlotMarkers */ "../../../node_modules/hsgraph/PlotMarkers.js");
const PlotBar_1 = __webpack_require__(/*! ./PlotBar */ "../../../node_modules/hsgraph/PlotBar.js");
const PlotArea_1 = __webpack_require__(/*! ./PlotArea */ "../../../node_modules/hsgraph/PlotArea.js");
function copyDefault(target, source, defaults) {
    Object.keys(source).forEach((key) => {
        if (typeof source[key] === 'object') {
            if (target[key] === undefined) {
                target[key] = {};
            }
            copyDefault(target[key], source[key], defaults);
        }
        else {
            if (target[key] === undefined) {
                target[key] = source[key];
            }
            if (target[key] === 'default') {
                target[key] = defaults[key];
            }
        }
    });
}
class Series extends SVGElem_1.SVGElem {
    static defaultConfig(cfg) {
        cfg.series = new SeriesConfig();
    }
    static adjustConfig(cfg) {
        cfg.series.series.forEach((s) => {
            if (s.x === undefined) {
                cfg.axes.primary.x.title.hOffset = 0;
                cfg.axes.primary.x.scale.type = Axes_1.Axes.type.index;
                cfg.grid.minor.ver.visible = false;
            }
        });
    }
    drawClipRect(clipID, scales) {
        return !clipID ? mithril_1.m('') : this.clipRect({ x: scales.x.range()[0], y: scales.y.range()[1] }, {
            w: scales.x.range()[1] - scales.x.range()[0],
            h: scales.y.range()[0] - scales.y.range()[1]
        }, clipID);
    }
    view(node) {
        const cfg = node.attrs.cfg;
        const scales = node.attrs.scales.primary;
        const data = node.attrs.data;
        const clipID = cfg.clip ? 'hs' + Math.floor(Math.random() * 10000) : undefined;
        cfg.series.map((s) => {
            if (s.map === Series.map.shared) {
                s.ySum = '$sum';
                data[s.dataIndex].colAdd(s.ySum);
                data[s.dataIndex].colInitialize(s.ySum, 0);
            }
        });
        cfg.series.map((s) => {
            const dt = data[s.dataIndex];
            if (s.map === Series.map.shared) {
                const valCol = dt.colNumber(s.y);
                dt.colInitialize(s.ySum, (v, i, row) => { return v + row[valCol]; });
            }
            if (s.map) {
                s.yBase = '$' + s.map;
                dt.colAdd(s.yBase);
                dt.colInitialize(s.yBase, 0);
            }
        });
        return mithril_1.m('svg', { class: 'hs-graph-series' }, [
            this.drawClipRect(clipID, scales),
            mithril_1.m('svg', cfg.series.map((s, i) => {
                const dt = data[s.dataIndex];
                const type = Series.plot[s.type] || Series.plot.line;
                type.setDefaults(dt, s, scales);
                const d = s.cond ? dt.filter(s.cond) : dt;
                const plot = type.plot(d, s, scales, i, clipID);
                if (s.map) {
                    const valCol = d.colNumber(s.y);
                    d.colInitialize(s.yBase, (v, i, row) => { return v + row[valCol]; });
                }
                return mithril_1.m('svg', { class: `hs-graph-series-${i}` }, plot);
            }))
        ]);
    }
}
Series.marker = {
    circle: Symbol('circle marker'),
    square: Symbol('square marker'),
    diamond: Symbol('diamond marker'),
    upTriangle: Symbol('upward triangle marker'),
    downTriangle: Symbol('downward triangle marker')
};
Series.plot = {
    line: new PlotLine_1.PlotLine(),
    marker: new PlotMarkers_1.PlotMarkers(),
    bar: new PlotBar_1.PlotBar(),
    area: new PlotArea_1.PlotArea()
};
Series.map = {
    stacked: 'stacked',
    shared: 'shared'
};
Series.defaultStyle = {
    line: { color: 'default', visible: true, width: 2 },
    marker: { color: 'default', visible: false, size: 10, shape: Series.marker.circle },
    label: { color: 'default', visible: false },
    fill: { color: 'default', visible: false },
    bar: { color: 'default', visible: false, width: 50, offset: 30 }
};
Series.defaultColors = ['#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f', '#000', '#444', '#888', '#ccc'];
exports.Series = Series;
class SeriesConfig {
    constructor() {
        this.seriesDefs = [];
        this.clip = true;
    }
    set series(cfg) {
        const defStyle = Series.defaultStyle;
        const defColors = Series.defaultColors;
        cfg.forEach((s) => {
            s.type = s.type || 'line';
            s.style = s.style || {};
            s.dataIndex = s.dataIndex || 0;
            const defaults = {
                color: defColors[this.seriesDefs.length]
            };
            copyDefault(s.style, defStyle, defaults);
            this.seriesDefs.push(s);
            switch (s.type) {
                case 'line':
                    s.style.line.visible = true;
                    break;
                case 'marker':
                    s.style.marker.visible = true;
                    break;
                case 'area':
                    s.style.fill.visible = true;
                    break;
                case 'bar':
                    s.style.fill.visible = true;
                    break;
            }
        });
    }
    get series() { return this.seriesDefs; }
}
exports.SeriesConfig = SeriesConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VyaWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1Nlcmllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQW9CQSw0Q0FBOEM7QUFNOUMsdUNBQXlDO0FBQ3pDLGlDQUFzQztBQUV0Qyx5Q0FBMEM7QUFDMUMsK0NBQTZDO0FBQzdDLHVDQUF5QztBQUN6Qyx5Q0FBMEM7QUFHMUMscUJBQXFCLE1BQVUsRUFBRSxNQUFVLEVBQUUsUUFBWTtJQUNyRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQVUsRUFBRSxFQUFFO1FBQ3ZDLElBQUksT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxFQUFFO1lBQ2pDLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsRUFBRTtnQkFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQUU7WUFDcEQsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDbkQ7YUFBTTtZQUNILElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsRUFBRTtnQkFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQUU7WUFDN0QsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxFQUFFO2dCQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7YUFBRTtTQUNsRTtJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUtELFlBQW9CLFNBQVEsaUJBQU87SUFnRy9CLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBVTtRQUMzQixHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJ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

/***/ }),

/***/ "../../../node_modules/hsgraph/index.js":
/*!************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hsgraph/index.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Graph_1 = __webpack_require__(/*! ./Graph */ "../../../node_modules/hsgraph/Graph.js");
exports.Graph = Graph_1.Graph;
var Series_1 = __webpack_require__(/*! ./Series */ "../../../node_modules/hsgraph/Series.js");
exports.Series = Series_1.Series;
var Axes_1 = __webpack_require__(/*! ./Axes */ "../../../node_modules/hsgraph/Axes.js");
exports.Axes = Axes_1.Axes;
var Scale_1 = __webpack_require__(/*! ./Scale */ "../../../node_modules/hsgraph/Scale.js");
exports.Scale = Scale_1.Scale;
var Grid_1 = __webpack_require__(/*! ./Grid */ "../../../node_modules/hsgraph/Grid.js");
exports.Grid = Grid_1.Grid;
var Legend_1 = __webpack_require__(/*! ./Legend */ "../../../node_modules/hsgraph/Legend.js");
exports.Legend = Legend_1.Legend;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBbUM7QUFBMUIsd0JBQUEsS0FBSyxDQUFBO0FBQ2QsbUNBRW9DO0FBRjNCLDBCQUFBLE1BQU0sQ0FBQTtBQUdmLCtCQUFrQztBQUF6QixzQkFBQSxJQUFJLENBQUE7QUFDYixpQ0FBbUM7QUFBMUIsd0JBQUEsS0FBSyxDQUFBO0FBQ2QsK0JBQWtDO0FBQXpCLHNCQUFBLElBQUksQ0FBQTtBQUNiLG1DQUFvQztBQUEzQiwwQkFBQSxNQUFNLENBQUEifQ==

/***/ }),

/***/ "../../../node_modules/hslayout/hsConfig.js":
/*!****************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hslayout/hsConfig.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mithril_1 = __webpack_require__(/*! ./mithril */ "../../../node_modules/hslayout/mithril.js");
const layout = __webpack_require__(/*! ./ */ "../../../node_modules/hslayout/index.js");
function copy(struct) {
    let result;
    if (Array.isArray(struct)) {
        result = [];
    }
    else if (typeof struct === 'object') {
        result = {};
    }
    else {
        return struct;
    }
    Object.keys(struct).map((k) => result[k] = copy(struct[k]));
    return result;
}
function resolve(sym, context) {
    let cl;
    context.concat(layout).some((c) => cl = c[sym]);
    return cl;
}
function recurse(config, context) {
    if (['string', 'number', 'boolean', 'function'].indexOf(typeof config) >= 0) {
        return config;
    }
    const keys = Object.keys(config);
    let result = config.length ? [] : {};
    keys.map((k) => {
        const content = recurse(config[k], context);
        const cl = resolve(k, context);
        if (cl) {
            const r = {
                compClass: cl,
                attrs: content
            };
            (!Array.isArray(config) && keys.length === 1) ?
                result = r :
                result[k] = r;
        }
        else {
            result[k] = content;
        }
    });
    return result;
}
class HsConfig {
    constructor(context) {
        this.context = context;
    }
    attachNodeTree(config, root) {
        function decodeRoute(route) {
            const rp = route.params = [];
            route.paths.map((p0) => {
                const params = p0.match(/:(.+?)\b/g);
                if (params) {
                    params.map((p1) => p1.substr(1))
                        .map((p2) => rp.indexOf(p2) < 0 ? rp.push(p2) : '');
                }
            });
            return route;
        }
        function decode(config) {
            let result = {};
            if (config.compClass && !result.root) {
                result.root = config;
            }
            else {
                Object.keys(config).map((k) => {
                    if (config[k].compClass && !result.root) {
                        result.root = config[k];
                    }
                    else if (k === 'route') {
                        result.route = decodeRoute(config.route);
                    }
                    else {
                        result[k] = config[k];
                    }
                });
            }
            return result;
        }
        function prepareRoutes(content) {
            const cr = content.root;
            class Router {
                view(node) {
                    cr.attrs.route = {};
                    content.route.params.map((k) => cr.attrs.route[k] = node.attrs[k]);
                    return mithril_1.m(cr.compClass, copy(cr.attrs));
                }
            }
            content.route.routes = {};
            content.route.paths.map((path) => content.route.routes[path] = Router);
        }
        function mountOrRoute(c) {
            const content = decode(c);
            const cr = content.root;
            if (!cr) {
                console.log('*** no top level component defined in config:');
                console.log(config);
            }
            if (content.route) {
                prepareRoutes(content);
                mithril_1.m.route(root, content.route.default, content.route.routes);
                console.log('starting router');
            }
            else {
                mithril_1.m.mount(root, { view: (node) => mithril_1.m(cr.compClass, copy(cr.attrs)) });
                console.log('mounting component');
            }
        }
        const context = this.context;
        this.getContent(config)
            .then((r) => recurse(r, context))
            .then(mountOrRoute);
    }
    getContent(config) {
        return (typeof config === 'string') ? this.load(config) : Promise.resolve(config);
    }
    load(file) {
        console.log('requesting ' + file);
        return mithril_1.m.request({ method: "GET", url: file })
            .catch((e) => {
            console.log('error:');
            console.log(e);
        });
    }
}
exports.HsConfig = HsConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHNDb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaHNDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUF3Q0EsdUNBQXFDO0FBQ3JDLDZCQUE2QjtBQU03QixjQUFjLE1BQVU7SUFDcEIsSUFBSSxNQUFVLENBQUM7SUFDZixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFDO0tBQUU7U0FDdEMsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7UUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFDO0tBQUU7U0FDaEQ7UUFBRSxPQUFPLE1BQU0sQ0FBQztLQUFFO0lBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBUSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkUsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQVdELGlCQUFpQixHQUFVLEVBQUUsT0FBYTtJQUN0QyxJQUFJLEVBQU0sQ0FBQztJQUNYLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBSyxFQUFFLEVBQUUsQ0FBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDckQsT0FBTyxFQUFFLENBQUM7QUFDZCxDQUFDO0FBWUQsaUJBQWlCLE1BQVUsRUFBRSxPQUFhO0lBQ3RDLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxNQUFNLENBQUMsSUFBRSxDQUFDLEVBQUU7UUFBRSxPQUFPLE1BQU0sQ0FBQztLQUFFO0lBQzdGLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJ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

/***/ }),

/***/ "../../../node_modules/hslayout/index.js":
/*!*************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hslayout/index.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const pillars = __webpack_require__(/*! ./view/PillaredLayouter */ "../../../node_modules/hslayout/view/PillaredLayouter.js");
if (pillars) { }
const tiles = __webpack_require__(/*! ./view/TileLayouter */ "../../../node_modules/hslayout/view/TileLayouter.js");
if (tiles) { }
var Layout_1 = __webpack_require__(/*! ./view/Layout */ "../../../node_modules/hslayout/view/Layout.js");
exports.Layout = Layout_1.Layout;
var Tokens_1 = __webpack_require__(/*! ./view/Tokens */ "../../../node_modules/hslayout/view/Tokens.js");
exports.FILL = Tokens_1.FILL;
exports.px = Tokens_1.px;
exports.pc = Tokens_1.pc;
exports.LayoutToken = Tokens_1.LayoutToken;
var Layouter_1 = __webpack_require__(/*! ./view/Layouter */ "../../../node_modules/hslayout/view/Layouter.js");
exports.Layouter = Layouter_1.Layouter;
var hsConfig_1 = __webpack_require__(/*! ./hsConfig */ "../../../node_modules/hslayout/hsConfig.js");
exports.HsConfig = hsConfig_1.HsConfig;
var mithril_1 = __webpack_require__(/*! ./mithril */ "../../../node_modules/hslayout/mithril.js");
exports.m = mithril_1.m;
exports.o = mithril_1.o;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSxtREFBdUQ7QUFBTSxJQUFHLE9BQU8sRUFBRSxHQUFFO0FBQzNFLDZDQUFtRDtBQUFVLElBQUcsS0FBSyxFQUFFLEdBQUU7QUFFekUsd0NBQTZDO0FBQXBDLDBCQUFBLE1BQU0sQ0FBQTtBQUNmLHdDQUM2QztBQURwQyx3QkFBQSxJQUFJLENBQUE7QUFBRSxzQkFBQSxFQUFFLENBQUE7QUFBRSxzQkFBQSxFQUFFLENBQUE7QUFDWiwrQkFBQSxXQUFXLENBQUE7QUFDcEIsNENBQStDO0FBQXRDLDhCQUFBLFFBQVEsQ0FBQTtBQUNqQix1Q0FBMEM7QUFBakMsOEJBQUEsUUFBUSxDQUFBO0FBQ2pCLHFDQUF3QztBQUEvQixzQkFBQSxDQUFDLENBQUE7QUFBUyxzQkFBQSxDQUFDLENBQUEifQ==

/***/ }),

/***/ "../../../node_modules/hslayout/mithril.js":
/*!***************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hslayout/mithril.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
if (!global['window']) {
    global['window'] = __webpack_require__(/*! mithril/test-utils/browserMock.js */ "../../../node_modules/mithril/test-utils/browserMock.js")();
    global['document'] = window.document;
}
exports.m = __webpack_require__(/*! mithril */ "../../../node_modules/mithril/mithril.js");
exports.o = __webpack_require__(/*! mithril/ospec/ospec */ "../../../node_modules/mithril/ospec/ospec.js");
exports.o.root = window.document.createElement("div");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl0aHJpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9taXRocmlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRTtJQUNuQixNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsT0FBTyxDQUFDLG1DQUFtQyxDQUFDLEVBQUUsQ0FBQztJQUNsRSxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztDQUV4QztBQUtZLFFBQUEsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQU92QixRQUFBLENBQUMsR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUNoRCxTQUFDLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDIn0=
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../../node_modules/hslayout/view/Layout.js":
/*!*******************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hslayout/view/Layout.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mithril_1 = __webpack_require__(/*! ../mithril */ "../../../node_modules/hslayout/mithril.js");
const Layouter_1 = __webpack_require__(/*! ./Layouter */ "../../../node_modules/hslayout/view/Layouter.js");
class Layout {
    getComponents(node) {
        return !Array.isArray(node.attrs.content) ? node.attrs.content :
            node.attrs.content.map((c) => {
                if (c.compClass) {
                    c.attrs.route = node.attrs.route;
                    return mithril_1.m(c.compClass, c.attrs);
                }
                else {
                    return c;
                }
            });
    }
    getCSS(node) {
        return node.attrs.css || '';
    }
    normalizeContent(components) {
        if (typeof components === 'string') {
            return [mithril_1.m('.hs-leaf', mithril_1.m.trust(components))];
        }
        if (components.length > 0) {
            return components.map((comp) => (comp instanceof Layout) ? comp : mithril_1.m(Layout, { content: comp }));
        }
        return [components];
    }
    view(node) {
        const content = this.normalizeContent(this.getComponents(node));
        let css = Layouter_1.Layouter.createLayout(node.attrs, content);
        const attrs = {
            style: node.style,
            route: node.attrs.route,
            onclick: node.attrs.onclick
        };
        node.attrs.route = undefined;
        if (node.attrs.href) {
            attrs.href = node.attrs.href;
            attrs.oncreate = mithril_1.m.route.link;
            attrs.onupdate = mithril_1.m.route.link;
        }
        return mithril_1.m(`.hs-layout ${css} ${this.getCSS(node)}`, attrs, content.map((c) => c));
    }
}
exports.Layout = Layout;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5b3V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3ZpZXcvTGF5b3V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBaUJBLHdDQUEwQztBQUMxQyx5Q0FBMEM7QUF5QjFDO0lBb0JjLGFBQWEsQ0FBQyxJQUFVO1FBQzlCLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBSyxFQUFFLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRTtvQkFDYixDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztvQkFDakMsT0FBTyxXQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2xDO3FCQUFNO29CQUNILE9BQU8sQ0FBQyxDQUFDO2lCQUNaO1lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBUVMsTUFBTSxDQUFDLElBQVU7UUFDdkIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUdPLGdCQUFnQixDQUFDLFVBQTZDO1FBQ2xFLElBQUksT0FBTyxVQUFVLEtBQUssUUFBUSxFQUFFO1lBQ2hDLE9BQU8sQ0FBQyxXQUFDLENBQUMsVUFBVSxFQUFFLFdBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQy9DO1FBQ0QsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBRTtZQUNyQixPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUF5QixFQUFRLEVBQUUsQ0FDbEQsQ0FBQyxJQUFJLFlBQVksTUFBTSxDQUFDLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUNqRSxDQUFDO1NBQ0w7UUFFRCxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQXFCRCxJQUFJLENBQUMsSUFBVTtRQUNYLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDaEUsSUFBSSxHQUFHLEdBQUcsbUJBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNyRCxNQUFNLEtBQUssR0FBTztZQUNkLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQ3ZCLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87U0FDOUIsQ0FBQztRQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUM3QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ2pCLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDN0IsS0FBSyxDQUFDLFFBQVEsR0FBRyxXQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUM5QixLQUFLLENBQUMsUUFBUSxHQUFHLFdBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1NBQ2pDO1FBQ0QsT0FBTyxXQUFDLENBQUMsY0FBYyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7Q0FDSjtBQTNGRCx3QkEyRkMifQ==

/***/ }),

/***/ "../../../node_modules/hslayout/view/Layouter.js":
/*!*********************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hslayout/view/Layouter.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Tokens_1 = __webpack_require__(/*! ./Tokens */ "../../../node_modules/hslayout/view/Tokens.js");
class Layouter {
    constructor(areaDesc) {
        this.areaDesc = areaDesc;
        this.spacing = 0;
    }
    static translate(params) {
        if (params.length === 0) {
            params.push('');
        }
        return params.map((param) => {
            if (typeof param === 'string') {
                if (param.endsWith('px')) {
                    return Tokens_1.px(parseInt(param));
                }
                if (param.endsWith('%')) {
                    return Tokens_1.pc(parseInt(param));
                }
                if (param.toLowerCase() === 'fill') {
                    return Tokens_1.FILL;
                }
            }
            else {
                return param;
            }
        });
    }
    static register(keyword, style) {
        Layouter.layoutStyles[keyword] = style;
    }
    static createLayout(attrs, components) {
        let css = '';
        Object.keys(Layouter.layoutStyles).some(key => {
            if (attrs[key]) {
                css = new Layouter.layoutStyles[key](Layouter.translate(attrs[key])).getStyles(components);
                attrs[key] = undefined;
                return true;
            }
            return false;
        });
        return css;
    }
    ;
}
Layouter.layoutStyles = {};
exports.Layouter = Layouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5b3V0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdmlldy9MYXlvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWFBLHFDQUF3QztBQXlCeEM7SUF5RUksWUFBbUIsUUFBc0I7UUFBdEIsYUFBUSxHQUFSLFFBQVEsQ0FBYztRQVJ6QyxZQUFPLEdBQUcsQ0FBQyxDQUFDO0lBUWdDLENBQUM7SUF6RHJDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBd0I7UUFDN0MsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FBRTtRQUM3QyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFnQixFQUFFLEVBQUU7WUFDbkMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBQzNCLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFBRSxPQUFPLFdBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztpQkFBRTtnQkFDekQsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUFFLE9BQU8sV0FBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUFFO2dCQUN4RCxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBRyxNQUFNLEVBQUU7b0JBQUUsT0FBTyxhQUFJLENBQUM7aUJBQUM7YUFDcEQ7aUJBQU07Z0JBQ0gsT0FBTyxLQUFLLENBQUM7YUFDaEI7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFXTSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQWMsRUFBRSxLQUFxQjtRQUV4RCxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUMzQyxDQUFDO0lBVU0sTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFTLEVBQUUsVUFBdUI7UUFDekQsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzFDLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNaLEdBQUcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDM0YsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQztnQkFDdkIsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBVzRDLENBQUM7O0FBcEV2QyxxQkFBWSxHQUF1QixFQUFFLENBQUM7QUFMakQsNEJBMEZDIn0=

/***/ }),

/***/ "../../../node_modules/hslayout/view/PillaredLayouter.js":
/*!*****************************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hslayout/view/PillaredLayouter.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Layouter_1 = __webpack_require__(/*! ./Layouter */ "../../../node_modules/hslayout/view/Layouter.js");
const Tokens_1 = __webpack_require__(/*! ./Tokens */ "../../../node_modules/hslayout/view/Tokens.js");
exports.PillarLayouts = [
    'columns', 'rows'
];
const cParams = {
    columns: {
        cssClass: '.hs-column-layout',
        fields: ['top', 'bottom', 'left', 'right', 'height', 'width']
    },
    rows: {
        cssClass: '.hs-row-layout',
        fields: ['left', 'right', 'top', 'bottom', 'width', 'height']
    }
};
class PillarLayouter extends Layouter_1.Layouter {
    constructor(params, areaDesc) {
        super(areaDesc);
        this.areaDesc = areaDesc;
        this.fields = params.fields;
        this.cssClass = params.cssClass;
        let n = areaDesc.length - 1;
        let first = 0;
        let last = 0;
        this.unit = areaDesc.some((area) => (area instanceof Tokens_1.PixelToken)) ?
            this.unitPixel : this.unitPercent;
        areaDesc.some((area, i) => ((areaDesc[i] instanceof Tokens_1.DefinedToken) ? ++first < 0 : true));
        areaDesc.some((area, i) => ((areaDesc[n - i] instanceof Tokens_1.DefinedToken) ? ++last < 0 : true));
        this.firstFixed = first;
        this.lastFixed = Math.min(last, areaDesc.length - first);
    }
    ;
    getSizes(num) {
        const first = this.firstFixed;
        const last = this.lastFixed;
        const desc = this.areaDesc;
        const len = desc.length;
        return [...Array(num).keys()].map((i) => {
            let size = null;
            let t = null;
            if (i > num - 1 - last) {
                size = desc[len - (num - i)].getSize();
                t = 'end';
            }
            else if (i < first) {
                size = desc[i].getSize();
                t = 'start';
            }
            else if (len > 0 && len === first) {
                size = desc[len - 1].getSize();
                t = 'start';
            }
            return { size: size, code: t, fields: {} };
        });
    }
    unitPercent(num) {
        let f = this.fields;
        let max = 100.0;
        let styles = this.getSizes(num);
        styles.forEach(style => { if (style.size) {
            max = max - style.size;
            num--;
        } });
        let defDim = max / num;
        function pass(styles, ix0, ix1, breakCond) {
            let sumDim = 0;
            styles.some(style => {
                let size = style.size || defDim;
                if (breakCond(style.code)) {
                    return true;
                }
                style.fields[ix0] = sumDim + '%';
                sumDim += size;
                style.fields[ix1] = (100 - sumDim) + '%';
                style.fields[f[5]] = 'auto';
                return false;
            });
        }
        pass(styles, f[2], f[3], (e) => e === 'end');
        pass(styles.reverse(), f[3], f[2], (e) => e !== 'end');
        return styles.reverse();
    }
    ;
    unitPixel(num) {
        let styles = this.getSizes(num);
        let f = this.fields;
        let defDim = 100.0 / num;
        let sumDim = 0;
        styles.some((style, i) => {
            if (style.code === 'start') {
                style.fields[f[2]] = sumDim + 'px';
                sumDim += style.size + (this.spacing || 0) + (this.spacing || 0);
                style.fields[f[3]] = 'auto';
                style.fields[f[5]] = style.size + 'px';
            }
            else if (style.code === null) {
                style.fields[f[2]] = (sumDim > 0) ? (sumDim + 'px') : (i * defDim + '%');
                sumDim = -1;
                style.fields[f[3]] = (100 - (i + 1) * defDim) + '%';
                style.fields[f[5]] = 'auto';
            }
            else if (style.code === 'end') {
                return true;
            }
            return false;
        });
        sumDim = 0;
        styles.slice().reverse().some((style, i) => {
            style.fields[f[3]] = sumDim + 'px';
            if (style.code === 'end') {
                sumDim += style.size + (this.spacing || 0) + (this.spacing || 0);
                style.fields[f[2]] = 'auto';
                style.fields[f[5]] = style.size + 'px';
            }
            else {
                if (sumDim > 0 && style.code !== 'start') {
                    style.fields[f[5]] = 'auto';
                }
                return true;
            }
            return false;
        });
        return styles;
    }
    ;
    getStyles(components) {
        let f = this.fields;
        let styles = this.unit(components.length);
        components.map((c, i) => {
            c.style = `${f[0]}:0%; ${f[1]}:0%; `;
            Object.keys(styles[i].fields).forEach((st) => { c.style += `${st}: ${styles[i].fields[st]};`; });
        });
        return this.cssClass;
    }
    ;
}
;
class Columns extends PillarLayouter {
    constructor(areaDesc) {
        super(cParams[exports.PillarLayouts[0]], areaDesc);
        this.areaDesc = areaDesc;
    }
    ;
}
;
class Rows extends PillarLayouter {
    constructor(areaDesc) {
        super(cParams[exports.PillarLayouts[1]], areaDesc);
        this.areaDesc = areaDesc;
    }
    ;
}
;
Layouter_1.Layouter.register(exports.PillarLayouts[0], Columns);
Layouter_1.Layouter.register(exports.PillarLayouts[1], Rows);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGlsbGFyZWRMYXlvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3L1BpbGxhcmVkTGF5b3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUEyQ0EseUNBQTBDO0FBQzFDLHFDQUV3QztBQWdCM0IsUUFBQSxhQUFhLEdBQUc7SUFDekIsU0FBUyxFQUFFLE1BQU07Q0FDcEIsQ0FBQztBQUtGLE1BQU0sT0FBTyxHQUFHO0lBQ1osT0FBTyxFQUFnQjtRQUNuQixRQUFRLEVBQUUsbUJBQW1CO1FBQzdCLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDO0tBQ2hFO0lBQ0QsSUFBSSxFQUFnQjtRQUNoQixRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDO0tBQ2hFO0NBQ0osQ0FBQztBQU9GLG9CQUE4QixTQUFRLG1CQUFRO0lBYTFDLFlBQVksTUFBbUIsRUFBUyxRQUFzQjtRQUMxRCxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFEb0IsYUFBUSxHQUFSLFFBQVEsQ0FBYztRQUUxRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBRWhDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLElBQUksSUFBSSxHQUFJLENBQUMsQ0FBQztRQUVkLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQWdCLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxZQUFZLG1CQUFVLENB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

/***/ }),

/***/ "../../../node_modules/hslayout/view/TileLayouter.js":
/*!*************************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hslayout/view/TileLayouter.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Layouter_1 = __webpack_require__(/*! ./Layouter */ "../../../node_modules/hslayout/view/Layouter.js");
const Tokens_1 = __webpack_require__(/*! ./Tokens */ "../../../node_modules/hslayout/view/Tokens.js");
class TileLayouter extends Layouter_1.Layouter {
    constructor(areaDesc) {
        super(areaDesc);
        this.areaDesc = areaDesc;
        this.unit = areaDesc.some((area) => (area instanceof Tokens_1.PixelToken)) ?
            this.unitPixel : this.unitPercent;
    }
    ;
    unitPercent(num) {
        const desc = this.areaDesc;
        const fill = this.areaDesc.some(a => (a instanceof Tokens_1.FillToken));
        const root = Math.sqrt(num);
        const rows = Math.round(root);
        let cols = Math.floor(root);
        if (root > cols) {
            cols++;
        }
        let width = (desc[0] instanceof Tokens_1.DefinedToken) ? desc[0].getSize() : undefined;
        let height = (desc[1] instanceof Tokens_1.DefinedToken) ? desc[1].getSize() : width;
        width = width || 100 / cols;
        height = height || 100 / rows;
        let left = 0;
        let top = 0;
        let styles = [...Array(num).keys()].map(i => {
            let r = 'auto';
            let w = width + '%';
            let b = 'auto';
            let h = height + '%';
            if ((left + 2 * width) > 100 && fill) {
                r = '0%';
                w = 'auto';
            }
            if ((top + 2 * height) > 100 && fill) {
                b = '0%';
                h = 'auto';
            }
            const style = `
                top: ${Math.floor(top)}%; bottom:${b};
                left: ${left}%;           right:${r};
                width: ${w};              height: ${h};
            `;
            if (Math.round(left += width) > 100 - Math.floor(width)) {
                left = 0;
                top += height;
            }
            return style;
        });
        return styles;
    }
    ;
    unitPixel(num) {
        const desc = this.areaDesc;
        const root = Math.sqrt(num);
        const rows = Math.round(root);
        let cols = Math.floor(root);
        if (root > cols) {
            cols++;
        }
        let width = (desc[0] instanceof Tokens_1.DefinedToken) ? desc[0].getSize() : undefined;
        let height = (desc[1] instanceof Tokens_1.DefinedToken) ? desc[1].getSize() : width;
        width = width || 100 / cols;
        height = height || 100 / rows;
        let left = 0;
        let top = 0;
        let styles = [...Array(num).keys()].map(i => {
            let r = 'auto';
            let w = width + 'px';
            let b = 'auto';
            let h = height + 'px';
            const style = `
                top: ${Math.floor(top)}%; bottom:${b};
                left: ${left}%;           right:${r};
                width: ${w};              height: ${h};
            `;
            if (Math.round(left += width) > 100 - Math.floor(width)) {
                left = 0;
                top += height;
            }
            return style;
        });
        return styles;
    }
    ;
    getStyles(components) {
        let styles = this.unit(components.length);
        components.map((c, i) => {
            c.style = styles[i];
        });
        return '.hs-tile-layout';
    }
    ;
}
;
Layouter_1.Layouter.register('tiles', TileLayouter);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGlsZUxheW91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3ZpZXcvVGlsZUxheW91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBOERBLHlDQUEwQztBQUMxQyxxQ0FHd0M7QUFPeEMsa0JBQW1CLFNBQVEsbUJBQVE7SUFRL0IsWUFBbUIsUUFBc0I7UUFDckMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBREQsYUFBUSxHQUFSLFFBQVEsQ0FBYztRQUlyQyxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksWUFBWSxtQkFBVSxDQUFDLENBQUMsQ0FBQSxDQUFDO1lBQzFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUMsQ0FBQztJQUFBLENBQUM7SUFFTSxXQUFXLENBQUMsR0FBVTtRQUMxQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzNCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksa0JBQVMsQ0FBQyxDQUFDLENBQUM7UUFDL0QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFO1lBQUUsSUFBSSxFQUFFLENBQUM7U0FBRTtRQUM1QixJQUFJLEtBQUssR0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxxQkFBWSxDQUFDLENBQUEsQ0FB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

/***/ }),

/***/ "../../../node_modules/hslayout/view/Tokens.js":
/*!*******************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hslayout/view/Tokens.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class LayoutToken {
    constructor(size) {
        this.size = size;
    }
    getSize() { return this.size; }
}
exports.LayoutToken = LayoutToken;
class DefinedToken extends LayoutToken {
    constructor(size) { super(size); }
}
exports.DefinedToken = DefinedToken;
class FillToken extends LayoutToken {
    constructor() { super(-1); }
}
exports.FillToken = FillToken;
class PixelToken extends DefinedToken {
    constructor(size) { super(size); }
}
exports.PixelToken = PixelToken;
class PercentToken extends DefinedToken {
    constructor(size) { super(size); }
}
exports.PercentToken = PercentToken;
function px(px) { return new PixelToken(px); }
exports.px = px;
function pc(pc) { return new PercentToken(pc); }
exports.pc = pc;
exports.FILL = new FillToken();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9rZW5zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3ZpZXcvVG9rZW5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBUUE7SUFDSSxZQUFvQixJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtJQUFHLENBQUM7SUFDN0IsT0FBTyxLQUFLLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Q0FDekM7QUFIRCxrQ0FHQztBQUtELGtCQUFtQyxTQUFRLFdBQVc7SUFDbEQsWUFBWSxJQUFZLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUM3QztBQUZELG9DQUVDO0FBS0QsZUFBdUIsU0FBUSxXQUFXO0lBQ3RDLGdCQUFnQixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDL0I7QUFGRCw4QkFFQztBQUtELGdCQUF3QixTQUFRLFlBQVk7SUFDeEMsWUFBWSxJQUFXLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUM1QztBQUZELGdDQUVDO0FBS0Qsa0JBQTBCLFNBQVEsWUFBWTtJQUMxQyxZQUFZLElBQVcsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQzVDO0FBRkQsb0NBRUM7QUFNRCxZQUFtQixFQUFTLElBQU0sT0FBTyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFBOUQsZ0JBQThEO0FBTTlELFlBQW1CLEVBQVMsSUFBTSxPQUFPLElBQUksWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUFoRSxnQkFBZ0U7QUFLbkQsUUFBQSxJQUFJLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQyJ9

/***/ }),

/***/ "../../../node_modules/hsutil/Checksum.js":
/*!**************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hsutil/Checksum.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function shortCheckSum(s) {
    var chk = 0x12345678;
    var len = s.length;
    for (var i = 0; i < len; i++) {
        chk += (s.charCodeAt(i) * (i + 1));
    }
    return (chk & 0xffffffff).toString(16);
}
exports.shortCheckSum = shortCheckSum;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2tzdW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvQ2hlY2tzdW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFRQyx1QkFBOEIsQ0FBUTtJQUNuQyxJQUFJLEdBQUcsR0FBRyxVQUFVLENBQUM7SUFDckIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUNuQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzFCLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN0QztJQUNELE9BQU8sQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzFDLENBQUM7QUFQRCxzQ0FPQyJ9

/***/ }),

/***/ "../../../node_modules/hsutil/Date.js":
/*!**********************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hsutil/Date.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const monthStr = [
    ['Jan', 'January'], ['Feb', 'February'], ['Mar', 'March'], ['Apr', 'April'], ['May', 'May'], ['Jun', 'June'],
    ['Jul', 'July'], ['Aug', 'August'], ['Sep', 'September'], ['Oct', 'October'], ['Nov', 'November'], ['Dec', 'December']
];
const dayStr = [
    ['Sun', 'Sunday'], ['Mon', 'Monday'], ['Tue', 'Tuesday'], ['Wed', 'Wednesday'], ['Thu', 'Thursday'], ['Fri', 'Friday'], ['Sat', 'Saturday']
];
function formatNumber(number, digits) {
    var r = '' + number;
    while (r.length < digits) {
        r = "0" + r;
    }
    return r;
}
function date(formatString, date = new Date()) {
    return isNaN(date.getTime()) ?
        'invalid' :
        formatString
            .replace(/%YYYY/g, '' + date.getFullYear())
            .replace(/%YY/g, '' + (date.getFullYear() % 100))
            .replace(/%MMMM/g, monthStr[date.getMonth()][1])
            .replace(/%MMM/g, monthStr[date.getMonth()][0])
            .replace(/%MM/g, formatNumber(date.getMonth() + 1, 2))
            .replace(/%M/g, '' + (date.getMonth() + 1))
            .replace(/%DDDD/g, dayStr[date.getDay()][1])
            .replace(/%DDD/g, dayStr[date.getDay()][0])
            .replace(/%DD/g, formatNumber(date.getDate(), 2))
            .replace(/%D/g, '' + date.getDate())
            .replace(/%hh/g, formatNumber(date.getHours(), 2))
            .replace(/%h/g, '' + date.getHours())
            .replace(/%mm/g, formatNumber(date.getMinutes(), 2))
            .replace(/%m/g, '' + date.getMinutes())
            .replace(/%ss/g, formatNumber(date.getSeconds(), 2))
            .replace(/%jjj/g, formatNumber(date.getMilliseconds(), 3))
            .replace(/%jj/g, formatNumber(date.getMilliseconds() / 10, 2))
            .replace(/%j/g, formatNumber(date.getMilliseconds() / 100, 1));
}
exports.date = date;
exports.ms = {
    fromMinutes: (min) => 1000 * 60 * min,
    fromHours: (h) => 1000 * 60 * 60 * h,
    fromDays: (d) => 1000 * 60 * 60 * 24 * d,
    fromWeeks: (w) => 1000 * 60 * 60 * 24 * 7 * w,
    toMinutes: (ms) => ms / (1000 * 60),
    toHours: (ms) => ms / (1000 * 60 * 60),
    toDays: (ms) => ms / (1000 * 60 * 60 * 24),
    toWeeks: (ms) => ms / (1000 * 60 * 60 * 24 * 7)
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9EYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBZUEsTUFBTSxRQUFRLEdBQUc7SUFDYixDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7SUFDNUcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDO0NBQUMsQ0FBQztBQUc1SCxNQUFNLE1BQU0sR0FBRztJQUNYLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxFQUFDLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxFQUFDLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxFQUFDLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxFQUFDLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxFQUFDLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxFQUFDLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQztDQUFDLENBQUM7QUFHM0ksc0JBQXNCLE1BQWEsRUFBRSxNQUFhO0lBQzlDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBQyxNQUFNLENBQUM7SUFDbEIsT0FBTyxDQUFDLENBQUMsTUFBTSxHQUFHLE1BQU0sRUFBRTtRQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0tBQUU7SUFDMUMsT0FBTyxDQUFDLENB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LEVBQU8sQ0FBQyxDQUFRLEVBQUksRUFBRSxDQUFDLElBQUksR0FBQyxFQUFFLEdBQUMsRUFBRSxHQUFDLEVBQUUsR0FBQyxDQUFDLEdBQUMsQ0FBQztJQUNqRCxTQUFTLEVBQU8sQ0FBQyxFQUFTLEVBQUcsRUFBRSxDQUFDLEVBQUUsR0FBQyxDQUFDLElBQUksR0FBQyxFQUFFLENBQUM7SUFDNUMsT0FBTyxFQUFTLENBQUMsRUFBUyxFQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUMsQ0FBQyxJQUFJLEdBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQztJQUMvQyxNQUFNLEVBQVUsQ0FBQyxFQUFTLEVBQUcsRUFBRSxDQUFDLEVBQUUsR0FBQyxDQUFDLElBQUksR0FBQyxFQUFFLEdBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQztJQUNsRCxPQUFPLEVBQVMsQ0FBQyxFQUFTLEVBQUcsRUFBRSxDQUFDLEVBQUUsR0FBQyxDQUFDLElBQUksR0FBQyxFQUFFLEdBQUMsRUFBRSxHQUFDLEVBQUUsR0FBQyxDQUFDLENBQUM7Q0FDdkQsQ0FBQyJ9

/***/ }),

/***/ "../../../node_modules/hsutil/Number.js":
/*!************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hsutil/Number.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function round(n, d = 0) {
    const f = Math.pow(10, d);
    const r = Math.round(n * f) / f;
    return '' + r;
}
exports.round = round;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTnVtYmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL051bWJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVdDLGVBQXNCLENBQVEsRUFBRSxDQUFDLEdBQUMsQ0FBQztJQU9oQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUN6QixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUM7SUFDNUIsT0FBTyxFQUFFLEdBQUMsQ0FBQyxDQUFDO0FBQ2YsQ0FBQztBQVZELHNCQVVDIn0=

/***/ }),

/***/ "../../../node_modules/hsutil/PacingQueue.js":
/*!*****************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hsutil/PacingQueue.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class PacingQueue {
    constructor(delayMS = 100) {
        this.queue = [];
        this.baseMS = Date.now();
        this.delayMS = delayMS;
        this.next(this.queue);
    }
    nextTimeout() {
        setTimeout(() => this.next(this.queue), this.delayMS);
    }
    add(fn) {
        return new Promise((resolve, reject) => {
            if (this.queue.length === 0) {
                this.nextTimeout();
            }
            this.queue.push({ fn: fn, resolve: resolve, reject: reject, time: Date.now() });
        });
    }
    next(q) {
        if (q.length > 0) {
            const entry = q.shift();
            entry.resolve(entry.fn(Date.now() - entry.time)
                .catch((err) => {
                console.log(`error calling paced function: ${err}`);
                console.log(err.stack);
                throw err;
            }));
            this.nextTimeout();
        }
    }
}
exports.PacingQueue = PacingQueue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFjaW5nUXVldWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvUGFjaW5nUXVldWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFNQTtJQVFJLFlBQVksT0FBTyxHQUFDLEdBQUc7UUFOdkIsVUFBSyxHQUFVLEVBQUUsQ0FBQztRQUNsQixXQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBTWhCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTyxXQUFXO1FBQ2YsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsR0FBRyxDQUFDLEVBQWlDO1FBQ2pDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDbkMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQUU7WUFDcEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFFLE9BQU8sRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFDLENBQUMsQ0FBQztRQUNwRixDQUFDLENBQUMsQ0FBQztJQUNELENBQUM7SUFFRCxJQUFJLENBQUMsQ0FBTztRQUNSLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDZCxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDeEIsS0FBSyxDQUFDLE9BQU8sQ0FDVCxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO2lCQUNoQyxLQUFLLENBQUMsQ0FBQyxHQUFPLEVBQUUsRUFBRTtnQkFDZixPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdkIsTUFBTSxHQUFHLENBQUM7WUFDZCxDQUFDLENBQUMsQ0FDTCxDQUFDO1lBQ0YsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQztDQUNKO0FBdENELGtDQXNDQyJ9

/***/ }),

/***/ "../../../node_modules/hsutil/TimedPromise.js":
/*!******************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hsutil/TimedPromise.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function timeout(ms) {
    return new Promise((resolve, reject) => { setTimeout(reject, ms); });
}
exports.timeout = timeout;
function delay(ms) {
    return (args) => {
        return new Promise((resolve) => {
            setTimeout(() => { resolve(args); }, ms);
        });
    };
}
exports.delay = delay;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGltZWRQcm9taXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1RpbWVkUHJvbWlzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVdBLGlCQUF3QixFQUFTO0lBQzdCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekUsQ0FBQztBQUZELDBCQUVDO0FBZUQsZUFBc0IsRUFBUztJQUMzQixPQUFPLENBQUksSUFBTSxFQUFhLEVBQUU7UUFDNUIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQXNCLEVBQUUsRUFBRTtZQUMxQyxVQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQU5ELHNCQU1DIn0=

/***/ }),

/***/ "../../../node_modules/hsutil/index.js":
/*!***********************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hsutil/index.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TimedPromise_1 = __webpack_require__(/*! ./TimedPromise */ "../../../node_modules/hsutil/TimedPromise.js");
exports.timeout = TimedPromise_1.timeout;
exports.delay = TimedPromise_1.delay;
var showdown_1 = __webpack_require__(/*! ./showdown */ "../../../node_modules/hsutil/showdown.js");
exports.markDown = showdown_1.markDown;
var Checksum_1 = __webpack_require__(/*! ./Checksum */ "../../../node_modules/hsutil/Checksum.js");
exports.shortCheckSum = Checksum_1.shortCheckSum;
var Date_1 = __webpack_require__(/*! ./Date */ "../../../node_modules/hsutil/Date.js");
exports.date = Date_1.date;
exports.ms = Date_1.ms;
var Number_1 = __webpack_require__(/*! ./Number */ "../../../node_modules/hsutil/Number.js");
exports.round = Number_1.round;
var PacingQueue_1 = __webpack_require__(/*! ./PacingQueue */ "../../../node_modules/hsutil/PacingQueue.js");
exports.PacingQueue = PacingQueue_1.PacingQueue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQ0FBZ0Q7QUFBdkMsaUNBQUEsT0FBTyxDQUFBO0FBQUUsK0JBQUEsS0FBSyxDQUFBO0FBQ3ZCLHVDQUE0QztBQUFuQyw4QkFBQSxRQUFRLENBQUE7QUFDakIsdUNBQTRDO0FBQW5DLG1DQUFBLGFBQWEsQ0FBQTtBQUN0QiwrQkFBd0M7QUFBL0Isc0JBQUEsSUFBSSxDQUFBO0FBQUUsb0JBQUEsRUFBRSxDQUFBO0FBQ2pCLG1DQUEwQztBQUFqQyx5QkFBQSxLQUFLLENBQUE7QUFDZCw2Q0FBK0M7QUFBdEMsb0NBQUEsV0FBVyxDQUFBIn0=

/***/ }),

/***/ "../../../node_modules/hsutil/mithril.js":
/*!*************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hsutil/mithril.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
if (!global['window']) {
    global['window'] = __webpack_require__(/*! mithril/test-utils/browserMock.js */ "../../../node_modules/mithril/test-utils/browserMock.js")();
    global['document'] = window.document;
}
exports.m = __webpack_require__(/*! mithril */ "../../../node_modules/mithril/mithril.js");
exports.o = __webpack_require__(/*! mithril/ospec/ospec */ "../../../node_modules/mithril/ospec/ospec.js");
exports.o.root = window.document.createElement("div");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl0aHJpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9taXRocmlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRTtJQUNuQixNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsT0FBTyxDQUFDLG1DQUFtQyxDQUFDLEVBQUUsQ0FBQztJQUNsRSxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztDQUV4QztBQUtZLFFBQUEsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQU92QixRQUFBLENBQUMsR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUNoRCxTQUFDLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDIn0=
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../../node_modules/hsutil/showdown.js":
/*!**************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hsutil/showdown.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const showdown = __webpack_require__(/*! showdown */ "../../../node_modules/showdown/dist/showdown.js");
const converter = new showdown.Converter();
function markDown(text) {
    return converter.makeHtml(text);
}
exports.markDown = markDown;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvd2Rvd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc2hvd2Rvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLFFBQVEsR0FBSSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFFdEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7QUFNM0Msa0JBQXlCLElBQVc7SUFDaEMsT0FBTyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUFGRCw0QkFFQyJ9

/***/ }),

/***/ "../../../node_modules/hswidget/AddRemove.js":
/*!*****************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hswidget/AddRemove.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../node_modules/hslayout/index.js");
class AddButton {
    view(node) {
        return hslayout_1.m('.hs-add-button', { onclick: node.attrs.onclick }, '');
    }
}
exports.AddButton = AddButton;
class RemoveButton {
    view(node) {
        return hslayout_1.m('.hs-remove-button', { onclick: node.attrs.onclick }, '');
    }
}
exports.RemoveButton = RemoveButton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRkUmVtb3ZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0FkZFJlbW92ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWtCQSx1Q0FBd0M7QUFFeEM7SUFDSSxJQUFJLENBQUMsSUFBVTtRQUNYLE9BQU8sWUFBQyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsT0FBTyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDbkUsQ0FBQztDQUNKO0FBSkQsOEJBSUM7QUFFRDtJQUNJLElBQUksQ0FBQyxJQUFVO1FBQ1gsT0FBTyxZQUFDLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxPQUFPLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN0RSxDQUFDO0NBQ0o7QUFKRCxvQ0FJQyJ9

/***/ }),

/***/ "../../../node_modules/hswidget/Button.js":
/*!**************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hswidget/Button.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ToggleButton_1 = __webpack_require__(/*! ./ToggleButton */ "../../../node_modules/hswidget/ToggleButton.js");
class Button extends ToggleButton_1.ToggleButton {
    view(node) {
        const desc = node.attrs.desc;
        desc.items = [desc.name || 'button'];
        desc.changed = desc.clicked;
        return super.view(node);
    }
}
exports.Button = Button;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0J1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWdDQSxpREFBOEM7QUFlOUMsWUFBb0IsU0FBUSwyQkFBWTtJQUNwQyxJQUFJLENBQUMsSUFBVztRQUNaLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM1QixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNKO0FBUEQsd0JBT0MifQ==

/***/ }),

/***/ "../../../node_modules/hswidget/Collapsible.js":
/*!*******************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hswidget/Collapsible.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../node_modules/hslayout/index.js");
class Collapsible {
    constructor() {
        this.expanded = false;
    }
    toggle() {
        this.expanded = !this.expanded;
    }
    view(node) {
        const css = node.attrs.css;
        const components = node.attrs.components;
        const preArrow = node.attrs.preArrow;
        const postArrow = node.attrs.postArrow;
        if (node.attrs.isExpanded !== undefined) {
            this.expanded = node.attrs.isExpanded;
        }
        const expCSS = this.expanded ? 'hs-collapsible-expanded' : '';
        return hslayout_1.m(`.hs-collapsible ${css} ${expCSS}`, { onclick: this.toggle.bind(this) }, [
            hslayout_1.m('.hs-collapsible-title', [
                !preArrow ? hslayout_1.m('') : hslayout_1.m(`.hs-collapsible-pre .hs-collapsible-arrow-${this.expanded ? 'down' : 'right'}`),
                components[0],
                !postArrow ? hslayout_1.m('') : hslayout_1.m(`.hs-collapsible-post .hs-collapsible-arrow-${this.expanded ? 'down' : 'left'}`),
            ]),
            components[1] ? hslayout_1.m('.hs-collapsible-content', components[1].map((c) => hslayout_1.m('', c))) : undefined
        ]);
    }
}
exports.Collapsible = Collapsible;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sbGFwc2libGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvQ29sbGFwc2libGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFpREEsdUNBQW9DO0FBRXBDO0lBQUE7UUFDSSxhQUFRLEdBQUcsS0FBSyxDQUFDO0lBc0JyQixDQUFDO0lBckJHLE1BQU07UUFDRixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNuQyxDQUFDO0lBQ0QsSUFBSSxDQUFDLElBQVU7UUFDWCxNQUFNLEdBQUcsR0FBVSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUNsQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUN6QyxNQUFNLFFBQVEsR0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUN2QyxNQUFNLFNBQVMsR0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUN4QyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxLQUFHLFNBQVMsRUFBRTtZQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO1NBQ3pDO1FBQ0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQSxDQUFDLENBQUEseUJBQXlCLENBQUEsQ0FBQyxDQUFBLEVBQUUsQ0FBQztRQUMxRCxPQUFPLFlBQUMsQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLE1BQU0sRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLEVBQUU7WUFDNUUsWUFBQyxDQUFDLHVCQUF1QixFQUFDO2dCQUN0QixDQUFDLFFBQVEsQ0FBQSxDQUFDLENBQUMsWUFBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFDLENBQUMsNkNBQTZDLElBQUksQ0FBQyxRQUFRLENBQUEsQ0FBQyxDQUFBLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ25HLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsQ0FBQyxTQUFTLENBQUEsQ0FBQyxDQUFDLFlBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBQyxDQUFDLDhDQUE4QyxJQUFJLENBQUMsUUFBUSxDQUFBLENBQUMsQ0FBQSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ3ZHLENBQUM7WUFDRixVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLFlBQUMsQ0FBQyx5QkFBeUIsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBSyxFQUFFLEVBQUUsQ0FBQSxZQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztTQUNoRyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUF2QkQsa0NBdUJDIn0=

/***/ }),

/***/ "../../../node_modules/hswidget/Label.js":
/*!*************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hswidget/Label.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../node_modules/hslayout/index.js");
class Label {
    view(node) {
        const css = node.attrs.css || '';
        const style = node.attrs.style || '';
        const text = node.attrs.text || 'unspecified';
        return hslayout_1.m(`.hs-label ${css}`, { style: style }, hslayout_1.m.trust(text));
    }
}
exports.Label = Label;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFiZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvTGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFnQ0EsdUNBQXdDO0FBWXhDO0lBQ0ksSUFBSSxDQUFDLElBQVc7UUFDWixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7UUFDakMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ3JDLE1BQU0sSUFBSSxHQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLGFBQWEsQ0FBQztRQUMvQyxPQUFPLFlBQUMsQ0FBQyxhQUFhLEdBQUcsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFDLEtBQUssRUFBRSxFQUFFLFlBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDO0NBQ0o7QUFQRCxzQkFPQyJ9

/***/ }),

/***/ "../../../node_modules/hswidget/Menu.js":
/*!************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hswidget/Menu.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const RadioButton_1 = __webpack_require__(/*! ./RadioButton */ "../../../node_modules/hswidget/RadioButton.js");
class Menu extends RadioButton_1.RadioButton {
    view(node) { return this.viewGroup('.hs-menu', node); }
}
exports.Menu = Menu;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9NZW51LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBd0RBLCtDQUE2QztBQU03QyxVQUFrQixTQUFRLHlCQUFXO0lBQ2pDLElBQUksQ0FBQyxJQUFXLElBQVcsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDeEU7QUFGRCxvQkFFQztBQUFBLENBQUMifQ==

/***/ }),

/***/ "../../../node_modules/hswidget/Modal.js":
/*!*************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hswidget/Modal.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../node_modules/hslayout/index.js");
const ToolbarButton_1 = __webpack_require__(/*! ./ToolbarButton */ "../../../node_modules/hswidget/ToolbarButton.js");
class Modal {
    view(node) {
        const w = node.attrs.width || 'auto';
        const h = node.attrs.height || 'auto';
        const attrs = { style: `width:${w}; height:${h};` };
        return hslayout_1.m('.hs-modal-frame', [
            hslayout_1.m('.hs-modal-background', { onclick: node.attrs.dismiss }, ''),
            hslayout_1.m('.hs-modal-foreground', attrs, !node.attrs.content ? 'modal pane' : [
                node.attrs.content,
                hslayout_1.m(ToolbarButton_1.ToolbarButton, { onclick: node.attrs.dismiss, symbols: ToolbarButton_1.ToolbarButton.getSymbol('cross') })
            ])
        ]);
    }
}
exports.Modal = Modal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvTW9kYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFnQ0EsdUNBQW9DO0FBQ3BDLG1EQUFnRDtBQUVoRDtJQUNJLElBQUksQ0FBQyxJQUFVO1FBQ1gsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUssTUFBTSxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQztRQUN0QyxNQUFNLEtBQUssR0FBRyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBQyxDQUFDO1FBQ25ELE9BQU8sWUFBQyxDQUFDLGlCQUFpQixFQUFFO1lBQ3hCLFlBQUMsQ0FBQyxzQkFBc0IsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUUsQ0FBQztZQUM3RCxZQUFDLENBQUMsc0JBQXNCLEVBQUUsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ2pFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTztnQkFDbEIsWUFBQyxDQUFDLDZCQUFhLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFDLDZCQUFhLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7YUFDOUYsQ0FBQztTQUNMLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQWJELHNCQWFDIn0=

/***/ }),

/***/ "../../../node_modules/hswidget/RadioButton.js":
/*!*******************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hswidget/RadioButton.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../node_modules/hslayout/index.js");
const hslayout_2 = __webpack_require__(/*! hslayout */ "../../../node_modules/hslayout/index.js");
const Selector_1 = __webpack_require__(/*! ./Selector */ "../../../node_modules/hswidget/Selector.js");
const Selector_2 = __webpack_require__(/*! ./Selector */ "../../../node_modules/hswidget/Selector.js");
class RadioButton extends Selector_1.Selector {
    viewGroup(css, node) {
        const desc = this.init(node.attrs.desc, Selector_2.oneOfItems);
        node.attrs.desc = undefined;
        css = `${css} ${node.attrs.css || ''}`;
        const style = node.attrs.style || '';
        return hslayout_1.m(css, { style: style }, hslayout_1.m(hslayout_2.Layout, {
            columns: [],
            content: desc.items.map((l, i) => this.renderItem(desc, i))
        }));
    }
    view(node) { return this.viewGroup('.hs-radio-buttons', node); }
}
exports.RadioButton = RadioButton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFkaW9CdXR0b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvUmFkaW9CdXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFpQ0EsdUNBQXdDO0FBQ3hDLHVDQUF3QztBQUN4Qyx5Q0FBMEM7QUFDMUMseUNBQTBDO0FBb0IxQyxpQkFBeUIsU0FBUSxtQkFBUTtJQUNyQyxTQUFTLENBQUMsR0FBVSxFQUFFLElBQVc7UUFDN0IsTUFBTSxJQUFJLEdBQWdCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUscUJBQVUsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUM1QixHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFLENBQUM7UUFDdkMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1FBRXJDLE9BQU8sWUFBQyxDQUFDLEdBQUcsRUFBRSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsRUFBRSxZQUFDLENBQUMsaUJBQU0sRUFBRTtZQUNuQyxPQUFPLEVBQUUsRUFBRTtZQUNYLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQVEsRUFBRSxDQUFRLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzVFLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQUNELElBQUksQ0FBQyxJQUFXLElBQVcsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNqRjtBQWJELGtDQWFDIn0=

/***/ }),

/***/ "../../../node_modules/hswidget/Selector.js":
/*!****************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hswidget/Selector.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../node_modules/hslayout/index.js");
function oneOfItems(items, title) {
    Object.keys(this.items).forEach((key) => {
        this.items[key].isSelected = (key === title);
    });
}
exports.oneOfItems = oneOfItems;
function anyItems(items, title) {
    this.items[title].isSelected = !this.items[title].isSelected;
}
exports.anyItems = anyItems;
class Selector {
    constructor() {
        this.updateSelected = [oneOfItems, anyItems][0];
        this.items = {};
    }
    init(desc, updateSelected = oneOfItems) {
        this.updateSelected = updateSelected.bind(this);
        desc.items = desc.items || [];
        desc.changed = desc.changed || ((item) => console.log(`missing changed() function for menu item ${item}`));
        this.checkSelectedItem(desc);
        return desc;
    }
    ;
    checkSelectedItem(desc) {
        if (this.selectedItem === undefined) {
            if (typeof desc.defaultItem === 'number') {
                this.selectedItem = desc.items[desc.defaultItem % desc.items.length];
            }
            else {
                this.selectedItem = desc.defaultItem || desc.items[0];
            }
        }
    }
    internalStateUpdate(desc, item) {
        this.selectedItem = item;
        this.checkSelectedItem(desc);
        this.updateSelected(this.items, this.selectedItem);
    }
    renderItem(desc, i) {
        const reactor = (callback) => (item) => {
            this.internalStateUpdate(desc, item);
            if (typeof callback === 'function') {
                callback(item);
            }
        };
        const l = desc.items[i] || '';
        const itemCss = desc.itemCss || [];
        this.checkSelectedItem(desc);
        return selectable({
            title: l,
            css: itemCss[i],
            isSelected: this.selectedItem ? (l.toLowerCase() === this.selectedItem.toLowerCase()) : false,
            mouseDown: reactor(desc.mouseDown),
            mouseUp: reactor(desc.mouseUp),
            clicked: reactor(desc.changed)
        });
    }
}
exports.Selector = Selector;
;
function selectable(childDesc) {
    const css = childDesc.css || '';
    const cssSelected = `${childDesc.isSelected ? 'hs-selected' : ''}`;
    const onclick = childDesc.clicked ? () => { childDesc.clicked(childDesc.title); } : undefined;
    const onmousedown = childDesc.mouseDown ? () => { childDesc.mouseDown(childDesc.title); } : undefined;
    const onmouseup = childDesc.mouseUp ? () => { childDesc.mouseUp(childDesc.title); } : undefined;
    return hslayout_1.m(`.hs-selectable ${css} ${cssSelected}`, { style: childDesc.style, onclick: onclick, onmousedown: onmousedown, onmouseup: onmouseup }, childDesc.title);
}
exports.selectable = selectable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvU2VsZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFxQkEsdUNBQTZCO0FBMEM3QixvQkFBMkIsS0FBNkIsRUFBRSxLQUFZO0lBQ2xFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQVUsRUFBRSxFQUFFO1FBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxHQUFHLENBQUMsR0FBRyxLQUFHLEtBQUssQ0FBQyxDQUFDO0lBQy9DLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUpELGdDQUlDO0FBTUQsa0JBQXlCLEtBQTZCLEVBQUUsS0FBWTtJQUNoRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDO0FBQ2pFLENBQUM7QUFGRCw0QkFFQztBQU1EO0lBQUE7UUFPWSxtQkFBYyxHQUFZLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBS3BELFVBQUssR0FBNEIsRUFBRSxDQUFDO0lBK0NoRCxDQUFDO0lBN0NHLElBQUksQ0FBQyxJQUFpQixFQUFFLGlCQUEwQixVQUFVO1FBQ3hELElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsSUFBVyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLDRDQUE0QyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7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

/***/ }),

/***/ "../../../node_modules/hswidget/Slider.js":
/*!**************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hswidget/Slider.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../node_modules/hslayout/index.js");
class Slider {
    constructor() {
        this.range = [];
        this.value = 0.5;
        this.pos = {
            mouse: -1,
            slider: 0
        };
        this.renderSlider = () => hslayout_1.m('.hs-slider-slot', [
            hslayout_1.m('.hs-slider-markers', this.range.map(this.renderMarker)),
            hslayout_1.m('.hs-slider-handle', { style: `left:${100 * this.value}%` })
        ]);
        this.renderMarker = (value, i, markers) => {
            const share = i / (markers.length - 1);
            const left = markers.length < 2 ? 0 : 100 * share;
            return hslayout_1.m('.hs-slider-marker', { style: `left: ${left}%` }, this.renderLabel(value));
        };
        this.renderLabel = (value) => hslayout_1.m('.hs-slider-label', value);
    }
    mousedown(e) {
        this.pos.mouse = e.clientX;
        this.pos.slider = this.value;
    }
    mousemove(e) {
        if (this.pos.mouse > 0) {
            const width = e.currentTarget.clientWidth;
            this.value = (e.clientX - this.pos.mouse) / width + this.pos.slider;
            this.notify(this.value);
            console.log(`${e.clientX} - ${this.pos.mouse} / ${width} + ${this.pos.slider}`);
        }
    }
    mouseup(e) {
        this.mousemove(e);
        this.pos.mouse = -1;
        this.value = this.notify(this.value);
    }
    notify(value) {
        if ((this.range.length > 1) && (typeof this.range[0] === 'string')) {
            const v = Math.floor(this.value * (this.range.length - 1) + 0.5);
            this.onchange(this.range[v]);
            return v / (this.range.length - 1);
        }
        else {
            const numRange = this.range;
            const v = Math.floor((numRange[0] * (1 - this.value) + numRange[1] * this.value) * 100) / 100;
            this.onchange(Math.min(this.range[1], Math.max(this.range[0], v)));
            return this.value;
        }
    }
    view(node) {
        const css = node.attrs.css || '';
        this.range = node.attrs.range || [];
        this.onchange = node.attrs.onchange;
        return hslayout_1.m(`.hs-slider ${css}`, {
            onmousedown: this.mousedown.bind(this),
            onmousemove: this.mousemove.bind(this),
            onmouseup: this.mouseup.bind(this)
        }, [this.renderSlider()]);
    }
}
exports.Slider = Slider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2xpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1NsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQTBDQSx1Q0FBb0M7QUFvQnBDO0lBQUE7UUFFWSxVQUFLLEdBQWdCLEVBQUUsQ0FBQztRQUN4QixVQUFLLEdBQVUsR0FBRyxDQUFDO1FBQ25CLFFBQUcsR0FBRztZQUNWLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDVCxNQUFNLEVBQUMsQ0FBQztTQUNYLENBQUM7UUFnQ0ssaUJBQVksR0FBRyxHQUFVLEVBQUUsQ0FDOUIsWUFBQyxDQUFDLGlCQUFpQixFQUFFO1lBQ2pCLFlBQUMsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDMUQsWUFBQyxDQUFDLG1CQUFtQixFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsR0FBRyxHQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1NBQy9ELENBQUMsQ0FBQTtRQUVDLGlCQUFZLEdBQUcsQ0FBQyxLQUFvQixFQUFFLENBQVEsRUFBRSxPQUFtQixFQUFRLEVBQUU7WUFDaEYsTUFBTSxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQyxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUMsS0FBSyxDQUFDO1lBQzdDLE9BQU8sWUFBQyxDQUFDLG1CQUFtQixFQUFFLEVBQUMsS0FBSyxFQUFFLFNBQVMsSUFBSSxHQUFHLEVBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDdEYsQ0FBQyxDQUFBO1FBRU0sZ0JBQVcsR0FBRyxDQUFDLEtBQW9CLEVBQVEsRUFBRSxDQUNoRCxZQUFD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

/***/ }),

/***/ "../../../node_modules/hswidget/ToggleButton.js":
/*!********************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hswidget/ToggleButton.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../node_modules/hslayout/index.js");
const Selector_1 = __webpack_require__(/*! ./Selector */ "../../../node_modules/hswidget/Selector.js");
const Selector_2 = __webpack_require__(/*! ./Selector */ "../../../node_modules/hswidget/Selector.js");
class ToggleButton extends Selector_1.Selector {
    constructor() {
        super(...arguments);
        this.toggleIndex = -1;
        this.mouseDown = '';
    }
    view(node) {
        const desc = this.init(node.attrs.desc, Selector_2.oneOfItems);
        node.attrs.desc = undefined;
        const css = node.attrs.css || '';
        const style = node.attrs.style || '';
        const parentChanged = desc.changed;
        desc.changed = ((item) => {
            this.toggleIndex = (this.toggleIndex + 1) % desc.items.length;
            item = desc.items[this.toggleIndex];
            this.internalStateUpdate(desc, item);
            if (parentChanged) {
                parentChanged(item);
            }
        });
        if (this.toggleIndex < 0) {
            this.toggleIndex = 0;
        }
        desc.mouseDown = () => this.mouseDown = '.hs-button-pressed';
        desc.mouseUp = () => this.mouseDown = '';
        return hslayout_1.m(`.hs-toggle-button${css}${this.mouseDown}`, { style: style }, hslayout_1.m('span', this.renderItem(desc, this.toggleIndex)));
    }
}
exports.ToggleButton = ToggleButton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9nZ2xlQnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1RvZ2dsZUJ1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWlDQSx1Q0FBd0M7QUFDeEMseUNBQTBDO0FBQzFDLHlDQUEwQztBQW1CMUMsa0JBQTBCLFNBQVEsbUJBQVE7SUFBMUM7O1FBQ1ksZ0JBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNqQixjQUFTLEdBQUcsRUFBRSxDQUFDO0lBeUIzQixDQUFDO0lBeEJHLElBQUksQ0FBQyxJQUFXO1FBQ1osTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxxQkFBVSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1FBQzVCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztRQUNqQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7UUFHckMsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFXLEVBQUUsRUFBRTtZQUM1QixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUM1RCxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNyQyxJQUFJLGFBQWEsRUFBRTtnQkFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7YUFBRTtRQUMvQyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksSUFBSSxDQUFDLFdBQVcsR0FBQyxDQUFDLEVBQUU7WUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztTQUFFO1FBRWpELElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQztRQUM3RCxJQUFJLENBQUMsT0FBTyxHQUFLLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRTNDLE9BQU8sWUFBQyxDQUFDLG9CQUFvQixHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFDLEtBQUssRUFBQyxFQUFFLFlBQUMsQ0FBQyxNQUFNLEVBQ3pFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FDMUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBM0JELG9DQTJCQyJ9

/***/ }),

/***/ "../../../node_modules/hswidget/ToolbarButton.js":
/*!*********************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hswidget/ToolbarButton.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../node_modules/hslayout/index.js");
exports.ButtonSymbols = {
    cross: { sym: '&times;' },
    minus: { sym: '&minus;' },
    plus: { sym: '+' },
    dLeft: { sym: '&laquo;' },
    dRight: { sym: '&raquo;' },
    left: { sym: '&lsaquo;' },
    right: { sym: '&rsaquo;' },
    leftTri: { sym: '&ltrif;' },
    rightTri: { sym: '&rtrif;' },
    upTri: { sym: '&utrif;' },
    downTri: { sym: '&dtrif;' },
    up: { sym: '&and;' },
    down: { sym: '&or;' },
    lArrow: { sym: '&larr;' },
    rArrow: { sym: '&rarr;' },
    uArrow: { sym: '&uarr;' },
    dArrow: { sym: '&darr;' },
    empty: { sym: '&#9675;' },
    emptySlash: { sym: '&empty;' },
    oSlash: { sym: '&oslash;' },
    o: { sym: '&omicron;' },
    lines3: { sym: '&equiv;' },
    sum: { sym: '&Sigma;' },
    ellipsis: { sym: '&hellip;' },
    vertEllips: { sym: '&#8285;' },
    bullet: { sym: '&bull;' },
    enter: { sym: '&crarr;' },
    again: { sym: '&#8635;' },
    start: { sym: '&#8689;' },
    end: { sym: '&#8690;' }
};
class ToolbarButton {
    constructor(symbols = '-') {
        this.symbols = symbols;
    }
    static getSymbol(name) {
        return exports.ButtonSymbols[name] ? exports.ButtonSymbols[name].sym : '';
    }
    view(node) {
        if (typeof node.attrs.symbols === 'string') {
            return hslayout_1.m('.hs-corner-button', { onclick: node.attrs.onclick }, hslayout_1.m.trust(node.attrs.symbols));
        }
        else {
            return hslayout_1.m('.hs-corner-button', { onclick: node.attrs.onclick }, node.attrs.symbols.map((sym) => hslayout_1.m.trust(sym)));
        }
    }
}
exports.ToolbarButton = ToolbarButton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9vbGJhckJ1dHRvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Ub29sYmFyQnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBMkVBLHVDQUFvQztBQUV2QixRQUFBLGFBQWEsR0FBRztJQUN6QixLQUFLLEVBQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFO0lBQzlCLEtBQUssRUFBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUM7SUFDN0IsSUFBSSxFQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBQztJQUN2QixLQUFLLEVBQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFDO0lBQzdCLE1BQU0sRUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUM7SUFDN0IsSUFBSSxFQUFRLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBQztJQUM5QixLQUFLLEVBQU8sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFDO0lBQzlCLE9BQU8sRUFBSyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUM7SUFDN0IsUUFBUSxFQUFJLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBQztJQUM3QixLQUFLLEVBQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFDO0lBQzdCLE9BQU8sRUFBSyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUM7SUFDN0IsRUFBRSxFQUFVLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBQztJQUMzQixJQUFJLEVBQVEsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFDO0lBQzFCLE1BQU0sRUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUM7SUFDNUIsTUFBTSxFQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBQztJQUM1QixNQUFNLEVBQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFDO0lBQzVCLE1BQU0sRUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUM7SUFDNUIsS0FBSyxFQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBQztJQUM3QixVQUFVLEVBQUUsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFDO0lBQzdCLE1BQU0sRUFBTSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUM7SUFDOUIsQ0FBQyxFQUFXLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBQztJQUMvQixNQUFNLEVBQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFDO0lBQzdCLEdBQUcsRUFBUyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUM7SUFDN0IsUUFBUSxFQUFJLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBQztJQUM5QixVQUFVLEVBQUUsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFDO0lBQzdCLE1BQU0sRUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUM7SUFDNUIsS0FBSyxFQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBQztJQUM3QixLQUFLLEVBQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFDO0lBQzdCLEtBQUssRUFBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUM7SUFDN0IsR0FBRyxFQUFTLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBQztDQUNoQyxDQUFDO0FBRUY7SUFDSSxZQUFzQixVQUFRLEdBQUc7UUFBWCxZQUFPLEdBQVAsT0FBTyxDQUFJO0lBQUcsQ0FBQztJQUNyQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQVc7UUFDeEIsT0FBTyxxQkFBYSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUMsQ0FBQyxxQkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzdELENBQUM7SUFDRCxJQUFJLENBQUMsSUFBVTtRQUNYLElBQUksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxRQUFRLEVBQUU7WUFDeEMsT0FBTyxZQUFDLENBQUMsbUJBQW1CLEVBQ3hCLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQy9CLFlBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FDOUIsQ0FBQztTQUNMO2FBQU07WUFDSCxPQUFPLFlBQUMsQ0FBQyxtQkFBbUIsRUFDcEIsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBVSxFQUFFLEVBQUUsQ0FBQSxZQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQzFELENBQUM7U0FDTDtJQUNMLENBQUM7Q0FDSjtBQWxCRCxzQ0FrQkMifQ==

/***/ }),

/***/ "../../../node_modules/hswidget/TypeAhead.js":
/*!*****************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hswidget/TypeAhead.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../node_modules/hslayout/index.js");
function emphasize(item, match) {
    const re = new RegExp(match, 'gi');
    const decorations = item
        .replace(re, (m) => `<b>${m}</b>`)
        .split('<')
        .map((s) => {
        if (s.startsWith('/b>')) {
            return hslayout_1.m('span', { name: item }, s.slice(3));
        }
        else if (s.startsWith('b>')) {
            return hslayout_1.m('b', { name: item }, s.slice(2));
        }
        else {
            return hslayout_1.m('span', { name: item }, s);
        }
    });
    return hslayout_1.m('span', decorations);
}
class GetList {
    constructor(list, map) {
        this.list = [];
        if (typeof list === 'string') {
            hslayout_1.m.request({ method: "GET", url: list })
                .then((data) => this.captureList(data, map));
        }
        else {
            this.captureList(list, map);
        }
    }
    captureList(list, map) {
        this.list = map ? map(list) : list;
    }
}
class TypeAhead {
    constructor() {
        this.typeAheadList = [];
        this.hidePopdown = true;
        this.value = '';
    }
    view(node) {
        const gl = new GetList(node.attrs.list);
        const nosubmit = () => console.log('no submit function defined');
        const submit = (v) => {
            this.inputNode.setSelectionRange(0, this.inputNode.value.length);
            this.hidePopdown = true;
            return node.attrs.onsubmit ? node.attrs.onsubmit(v) : nosubmit();
        };
        const select = (e) => {
            if (e) {
                this.inputNode.value = e.target.attributes.name.value;
                submit(e.target.attributes.name.value);
            }
        };
        const input = (e) => {
            const n = this.inputNode = e.target;
            const input = this.value = n.value;
            const withinInput = new RegExp(`${input}`, 'gi');
            const beginningOfInput = new RegExp(`^${input}`, 'gi');
            this.typeAheadList = gl.list.filter((l) => l.match(withinInput));
            n.value = this.typeAheadList.filter((l) => l.match(beginningOfInput))[0] || input;
            this.hidePopdown = n.value.length === 0;
            let pos = input.length;
            n.setSelectionRange(pos, n.value.length);
        };
        const keyPressed = (e) => {
            const n = this.inputNode = e.target;
            if (e.code === 'Enter') {
                submit(n.value);
            }
            else if (e.code === 'Backspace') {
                const input = n.firstChild.data;
                if (input.length > 0) {
                    n.value = input.slice(0);
                }
            }
        };
        const inputNode = hslayout_1.m(`input.hs-typeahead-input${this.value ? '.hs-typeahead-value' : '.hs-typeahead-placeholder'}`, {
            contenteditable: true,
            placeholder: node.attrs.placeholder,
            autofocus: node.attrs.autofocus || true,
            onkeydown: keyPressed.bind(this),
            oninput: input.bind(this)
        }, hslayout_1.m.trust(this.value ? this.value : node.attrs.placeholder));
        return hslayout_1.m('.hs-form', [
            inputNode,
            this.hidePopdown ? undefined :
                hslayout_1.m('.hs-typeahead-list', this.typeAheadList.map((l) => hslayout_1.m('', { onclick: select.bind(this) }, emphasize(l, this.value))))
        ]);
    }
}
exports.TypeAhead = TypeAhead;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHlwZUFoZWFkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1R5cGVBaGVhZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQTBDQSx1Q0FBb0M7QUFHcEMsbUJBQW1CLElBQVcsRUFBRSxLQUFZO0lBQ3hDLE1BQU0sRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuQyxNQUFNLFdBQVcsR0FBRyxJQUFJO1NBQ25CLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFRLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7U0FDeEMsS0FBSyxDQUFDLEdBQUcsQ0FBQztTQUNWLEdBQUcsQ0FBQyxDQUFDLENBQVEsRUFBRSxFQUFFO1FBQ2QsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLE9BQU8sWUFBQyxDQUFDLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0M7YUFBTSxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDM0IsT0FBTyxZQUFDLENBQUMsR0FBRyxFQUFFLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxQzthQUFNO1lBQ0gsT0FBTyxZQUFDLENBQUMsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3BDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxPQUFPLFlBQUMsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDbEMsQ0FBQztBQUVEO0lBS0ksWUFBWSxJQUFvQixFQUFFLEdBQTJCO1FBSnRELFNBQUksR0FBWSxFQUFFLENBQUM7UUFLdEIs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

/***/ }),

/***/ "../../../node_modules/hswidget/index.js":
/*!*************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/hswidget/index.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Menu_1 = __webpack_require__(/*! ./Menu */ "../../../node_modules/hswidget/Menu.js");
exports.Menu = Menu_1.Menu;
var Button_1 = __webpack_require__(/*! ./Button */ "../../../node_modules/hswidget/Button.js");
exports.Button = Button_1.Button;
var Label_1 = __webpack_require__(/*! ./Label */ "../../../node_modules/hswidget/Label.js");
exports.Label = Label_1.Label;
var Slider_1 = __webpack_require__(/*! ./Slider */ "../../../node_modules/hswidget/Slider.js");
exports.Slider = Slider_1.Slider;
var RadioButton_1 = __webpack_require__(/*! ./RadioButton */ "../../../node_modules/hswidget/RadioButton.js");
exports.RadioButton = RadioButton_1.RadioButton;
var ToggleButton_1 = __webpack_require__(/*! ./ToggleButton */ "../../../node_modules/hswidget/ToggleButton.js");
exports.ToggleButton = ToggleButton_1.ToggleButton;
var ToolbarButton_1 = __webpack_require__(/*! ./ToolbarButton */ "../../../node_modules/hswidget/ToolbarButton.js");
exports.ToolbarButton = ToolbarButton_1.ToolbarButton;
var ToolbarButton_2 = __webpack_require__(/*! ./ToolbarButton */ "../../../node_modules/hswidget/ToolbarButton.js");
exports.ButtonSymbols = ToolbarButton_2.ButtonSymbols;
var AddRemove_1 = __webpack_require__(/*! ./AddRemove */ "../../../node_modules/hswidget/AddRemove.js");
exports.AddButton = AddRemove_1.AddButton;
var AddRemove_2 = __webpack_require__(/*! ./AddRemove */ "../../../node_modules/hswidget/AddRemove.js");
exports.RemoveButton = AddRemove_2.RemoveButton;
var Collapsible_1 = __webpack_require__(/*! ./Collapsible */ "../../../node_modules/hswidget/Collapsible.js");
exports.Collapsible = Collapsible_1.Collapsible;
var Modal_1 = __webpack_require__(/*! ./Modal */ "../../../node_modules/hswidget/Modal.js");
exports.Modal = Modal_1.Modal;
var TypeAhead_1 = __webpack_require__(/*! ./TypeAhead */ "../../../node_modules/hswidget/TypeAhead.js");
exports.TypeAhead = TypeAhead_1.TypeAhead;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFPQSwrQkFBc0M7QUFBN0Isc0JBQUEsSUFBSSxDQUFBO0FBRWIsbUNBQXdDO0FBQS9CLDBCQUFBLE1BQU0sQ0FBQTtBQUNmLGlDQUF1QztBQUE5Qix3QkFBQSxLQUFLLENBQUE7QUFDZCxtQ0FBd0M7QUFBL0IsMEJBQUEsTUFBTSxDQUFBO0FBQ2YsNkNBQTZDO0FBQXBDLG9DQUFBLFdBQVcsQ0FBQTtBQUNwQiwrQ0FBOEM7QUFBckMsc0NBQUEsWUFBWSxDQUFBO0FBQ3JCLGlEQUErQztBQUF0Qyx3Q0FBQSxhQUFhLENBQUE7QUFDdEIsaURBQStDO0FBQXRDLHdDQUFBLGFBQWEsQ0FBQTtBQUN0Qix5Q0FBMkM7QUFBbEMsZ0NBQUEsU0FBUyxDQUFBO0FBQ2xCLHlDQUEyQztBQUFsQyxtQ0FBQSxZQUFZLENBQUE7QUFDckIsNkNBQTZDO0FBQXBDLG9DQUFBLFdBQVcsQ0FBQTtBQUNwQixpQ0FBdUM7QUFBOUIsd0JBQUEsS0FBSyxDQUFBO0FBQ2QseUNBQTJDO0FBQWxDLGdDQUFBLFNBQVMsQ0FBQSJ9

/***/ }),

/***/ "../../../node_modules/ieee754/index.js":
/*!************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/ieee754/index.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "../../../node_modules/inherits/inherits_browser.js":
/*!************************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/inherits/inherits_browser.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),

/***/ "../../../node_modules/isarray/index.js":
/*!************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/isarray/index.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "../../../node_modules/mithril/mithril.js":
/*!**************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/mithril/mithril.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate, global) {;(function() {
"use strict"
function Vnode(tag, key, attrs0, children, text, dom) {
	return {tag: tag, key: key, attrs: attrs0, children: children, text: text, dom: dom, domSize: undefined, state: undefined, _state: undefined, events: undefined, instance: undefined, skip: false}
}
Vnode.normalize = function(node) {
	if (Array.isArray(node)) return Vnode("[", undefined, undefined, Vnode.normalizeChildren(node), undefined, undefined)
	if (node != null && typeof node !== "object") return Vnode("#", undefined, undefined, node === false ? "" : node, undefined, undefined)
	return node
}
Vnode.normalizeChildren = function normalizeChildren(children) {
	for (var i = 0; i < children.length; i++) {
		children[i] = Vnode.normalize(children[i])
	}
	return children
}
var selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g
var selectorCache = {}
var hasOwn = {}.hasOwnProperty
function isEmpty(object) {
	for (var key in object) if (hasOwn.call(object, key)) return false
	return true
}
function compileSelector(selector) {
	var match, tag = "div", classes = [], attrs = {}
	while (match = selectorParser.exec(selector)) {
		var type = match[1], value = match[2]
		if (type === "" && value !== "") tag = value
		else if (type === "#") attrs.id = value
		else if (type === ".") classes.push(value)
		else if (match[3][0] === "[") {
			var attrValue = match[6]
			if (attrValue) attrValue = attrValue.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\")
			if (match[4] === "class") classes.push(attrValue)
			else attrs[match[4]] = attrValue === "" ? attrValue : attrValue || true
		}
	}
	if (classes.length > 0) attrs.className = classes.join(" ")
	return selectorCache[selector] = {tag: tag, attrs: attrs}
}
function execSelector(state, attrs, children) {
	var hasAttrs = false, childList, text
	var className = attrs.className || attrs.class
	if (!isEmpty(state.attrs) && !isEmpty(attrs)) {
		var newAttrs = {}
		for(var key in attrs) {
			if (hasOwn.call(attrs, key)) {
				newAttrs[key] = attrs[key]
			}
		}
		attrs = newAttrs
	}
	for (var key in state.attrs) {
		if (hasOwn.call(state.attrs, key)) {
			attrs[key] = state.attrs[key]
		}
	}
	if (className !== undefined) {
		if (attrs.class !== undefined) {
			attrs.class = undefined
			attrs.className = className
		}
		if (state.attrs.className != null) {
			attrs.className = state.attrs.className + " " + className
		}
	}
	for (var key in attrs) {
		if (hasOwn.call(attrs, key) && key !== "key") {
			hasAttrs = true
			break
		}
	}
	if (Array.isArray(children) && children.length === 1 && children[0] != null && children[0].tag === "#") {
		text = children[0].children
	} else {
		childList = children
	}
	return Vnode(state.tag, attrs.key, hasAttrs ? attrs : undefined, childList, text)
}
function hyperscript(selector) {
	// Because sloppy mode sucks
	var attrs = arguments[1], start = 2, children
	if (selector == null || typeof selector !== "string" && typeof selector !== "function" && typeof selector.view !== "function") {
		throw Error("The selector must be either a string or a component.");
	}
	if (typeof selector === "string") {
		var cached = selectorCache[selector] || compileSelector(selector)
	}
	if (attrs == null) {
		attrs = {}
	} else if (typeof attrs !== "object" || attrs.tag != null || Array.isArray(attrs)) {
		attrs = {}
		start = 1
	}
	if (arguments.length === start + 1) {
		children = arguments[start]
		if (!Array.isArray(children)) children = [children]
	} else {
		children = []
		while (start < arguments.length) children.push(arguments[start++])
	}
	var normalized = Vnode.normalizeChildren(children)
	if (typeof selector === "string") {
		return execSelector(cached, attrs, normalized)
	} else {
		return Vnode(selector, attrs.key, attrs, normalized)
	}
}
hyperscript.trust = function(html) {
	if (html == null) html = ""
	return Vnode("<", undefined, undefined, html, undefined, undefined)
}
hyperscript.fragment = function(attrs1, children) {
	return Vnode("[", attrs1.key, attrs1, Vnode.normalizeChildren(children), undefined, undefined)
}
var m = hyperscript
/** @constructor */
var PromisePolyfill = function(executor) {
	if (!(this instanceof PromisePolyfill)) throw new Error("Promise must be called with `new`")
	if (typeof executor !== "function") throw new TypeError("executor must be a function")
	var self = this, resolvers = [], rejectors = [], resolveCurrent = handler(resolvers, true), rejectCurrent = handler(rejectors, false)
	var instance = self._instance = {resolvers: resolvers, rejectors: rejectors}
	var callAsync = typeof setImmediate === "function" ? setImmediate : setTimeout
	function handler(list, shouldAbsorb) {
		return function execute(value) {
			var then
			try {
				if (shouldAbsorb && value != null && (typeof value === "object" || typeof value === "function") && typeof (then = value.then) === "function") {
					if (value === self) throw new TypeError("Promise can't be resolved w/ itself")
					executeOnce(then.bind(value))
				}
				else {
					callAsync(function() {
						if (!shouldAbsorb && list.length === 0) console.error("Possible unhandled promise rejection:", value)
						for (var i = 0; i < list.length; i++) list[i](value)
						resolvers.length = 0, rejectors.length = 0
						instance.state = shouldAbsorb
						instance.retry = function() {execute(value)}
					})
				}
			}
			catch (e) {
				rejectCurrent(e)
			}
		}
	}
	function executeOnce(then) {
		var runs = 0
		function run(fn) {
			return function(value) {
				if (runs++ > 0) return
				fn(value)
			}
		}
		var onerror = run(rejectCurrent)
		try {then(run(resolveCurrent), onerror)} catch (e) {onerror(e)}
	}
	executeOnce(executor)
}
PromisePolyfill.prototype.then = function(onFulfilled, onRejection) {
	var self = this, instance = self._instance
	function handle(callback, list, next, state) {
		list.push(function(value) {
			if (typeof callback !== "function") next(value)
			else try {resolveNext(callback(value))} catch (e) {if (rejectNext) rejectNext(e)}
		})
		if (typeof instance.retry === "function" && state === instance.state) instance.retry()
	}
	var resolveNext, rejectNext
	var promise = new PromisePolyfill(function(resolve, reject) {resolveNext = resolve, rejectNext = reject})
	handle(onFulfilled, instance.resolvers, resolveNext, true), handle(onRejection, instance.rejectors, rejectNext, false)
	return promise
}
PromisePolyfill.prototype.catch = function(onRejection) {
	return this.then(null, onRejection)
}
PromisePolyfill.resolve = function(value) {
	if (value instanceof PromisePolyfill) return value
	return new PromisePolyfill(function(resolve) {resolve(value)})
}
PromisePolyfill.reject = function(value) {
	return new PromisePolyfill(function(resolve, reject) {reject(value)})
}
PromisePolyfill.all = function(list) {
	return new PromisePolyfill(function(resolve, reject) {
		var total = list.length, count = 0, values = []
		if (list.length === 0) resolve([])
		else for (var i = 0; i < list.length; i++) {
			(function(i) {
				function consume(value) {
					count++
					values[i] = value
					if (count === total) resolve(values)
				}
				if (list[i] != null && (typeof list[i] === "object" || typeof list[i] === "function") && typeof list[i].then === "function") {
					list[i].then(consume, reject)
				}
				else consume(list[i])
			})(i)
		}
	})
}
PromisePolyfill.race = function(list) {
	return new PromisePolyfill(function(resolve, reject) {
		for (var i = 0; i < list.length; i++) {
			list[i].then(resolve, reject)
		}
	})
}
if (typeof window !== "undefined") {
	if (typeof window.Promise === "undefined") window.Promise = PromisePolyfill
	var PromisePolyfill = window.Promise
} else if (typeof global !== "undefined") {
	if (typeof global.Promise === "undefined") global.Promise = PromisePolyfill
	var PromisePolyfill = global.Promise
} else {
}
var buildQueryString = function(object) {
	if (Object.prototype.toString.call(object) !== "[object Object]") return ""
	var args = []
	for (var key0 in object) {
		destructure(key0, object[key0])
	}
	return args.join("&")
	function destructure(key0, value) {
		if (Array.isArray(value)) {
			for (var i = 0; i < value.length; i++) {
				destructure(key0 + "[" + i + "]", value[i])
			}
		}
		else if (Object.prototype.toString.call(value) === "[object Object]") {
			for (var i in value) {
				destructure(key0 + "[" + i + "]", value[i])
			}
		}
		else args.push(encodeURIComponent(key0) + (value != null && value !== "" ? "=" + encodeURIComponent(value) : ""))
	}
}
var FILE_PROTOCOL_REGEX = new RegExp("^file://", "i")
var _8 = function($window, Promise) {
	var callbackCount = 0
	var oncompletion
	function setCompletionCallback(callback) {oncompletion = callback}
	function finalizer() {
		var count = 0
		function complete() {if (--count === 0 && typeof oncompletion === "function") oncompletion()}
		return function finalize(promise0) {
			var then0 = promise0.then
			promise0.then = function() {
				count++
				var next = then0.apply(promise0, arguments)
				next.then(complete, function(e) {
					complete()
					if (count === 0) throw e
				})
				return finalize(next)
			}
			return promise0
		}
	}
	function normalize(args, extra) {
		if (typeof args === "string") {
			var url = args
			args = extra || {}
			if (args.url == null) args.url = url
		}
		return args
	}
	function request(args, extra) {
		var finalize = finalizer()
		args = normalize(args, extra)
		var promise0 = new Promise(function(resolve, reject) {
			if (args.method == null) args.method = "GET"
			args.method = args.method.toUpperCase()
			var useBody = (args.method === "GET" || args.method === "TRACE") ? false : (typeof args.useBody === "boolean" ? args.useBody : true)
			if (typeof args.serialize !== "function") args.serialize = typeof FormData !== "undefined" && args.data instanceof FormData ? function(value) {return value} : JSON.stringify
			if (typeof args.deserialize !== "function") args.deserialize = deserialize
			if (typeof args.extract !== "function") args.extract = extract
			args.url = interpolate(args.url, args.data)
			if (useBody) args.data = args.serialize(args.data)
			else args.url = assemble(args.url, args.data)
			var xhr = new $window.XMLHttpRequest(),
				aborted = false,
				_abort = xhr.abort
			xhr.abort = function abort() {
				aborted = true
				_abort.call(xhr)
			}
			xhr.open(args.method, args.url, typeof args.async === "boolean" ? args.async : true, typeof args.user === "string" ? args.user : undefined, typeof args.password === "string" ? args.password : undefined)
			if (args.serialize === JSON.stringify && useBody && !(args.headers && args.headers.hasOwnProperty("Content-Type"))) {
				xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
			}
			if (args.deserialize === deserialize && !(args.headers && args.headers.hasOwnProperty("Accept"))) {
				xhr.setRequestHeader("Accept", "application/json, text/*")
			}
			if (args.withCredentials) xhr.withCredentials = args.withCredentials
			for (var key in args.headers) if ({}.hasOwnProperty.call(args.headers, key)) {
				xhr.setRequestHeader(key, args.headers[key])
			}
			if (typeof args.config === "function") xhr = args.config(xhr, args) || xhr
			xhr.onreadystatechange = function() {
				// Don't throw errors on xhr.abort().
				if(aborted) return
				if (xhr.readyState === 4) {
					try {
						var response = (args.extract !== extract) ? args.extract(xhr, args) : args.deserialize(args.extract(xhr, args))
						if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 || FILE_PROTOCOL_REGEX.test(args.url)) {
							resolve(cast(args.type, response))
						}
						else {
							var error = new Error(xhr.responseText)
							for (var key in response) error[key] = response[key]
							reject(error)
						}
					}
					catch (e) {
						reject(e)
					}
				}
			}
			if (useBody && (args.data != null)) xhr.send(args.data)
			else xhr.send()
		})
		return args.background === true ? promise0 : finalize(promise0)
	}
	function jsonp(args, extra) {
		var finalize = finalizer()
		args = normalize(args, extra)
		var promise0 = new Promise(function(resolve, reject) {
			var callbackName = args.callbackName || "_mithril_" + Math.round(Math.random() * 1e16) + "_" + callbackCount++
			var script = $window.document.createElement("script")
			$window[callbackName] = function(data) {
				script.parentNode.removeChild(script)
				resolve(cast(args.type, data))
				delete $window[callbackName]
			}
			script.onerror = function() {
				script.parentNode.removeChild(script)
				reject(new Error("JSONP request failed"))
				delete $window[callbackName]
			}
			if (args.data == null) args.data = {}
			args.url = interpolate(args.url, args.data)
			args.data[args.callbackKey || "callback"] = callbackName
			script.src = assemble(args.url, args.data)
			$window.document.documentElement.appendChild(script)
		})
		return args.background === true? promise0 : finalize(promise0)
	}
	function interpolate(url, data) {
		if (data == null) return url
		var tokens = url.match(/:[^\/]+/gi) || []
		for (var i = 0; i < tokens.length; i++) {
			var key = tokens[i].slice(1)
			if (data[key] != null) {
				url = url.replace(tokens[i], data[key])
			}
		}
		return url
	}
	function assemble(url, data) {
		var querystring = buildQueryString(data)
		if (querystring !== "") {
			var prefix = url.indexOf("?") < 0 ? "?" : "&"
			url += prefix + querystring
		}
		return url
	}
	function deserialize(data) {
		try {return data !== "" ? JSON.parse(data) : null}
		catch (e) {throw new Error(data)}
	}
	function extract(xhr) {return xhr.responseText}
	function cast(type0, data) {
		if (typeof type0 === "function") {
			if (Array.isArray(data)) {
				for (var i = 0; i < data.length; i++) {
					data[i] = new type0(data[i])
				}
			}
			else return new type0(data)
		}
		return data
	}
	return {request: request, jsonp: jsonp, setCompletionCallback: setCompletionCallback}
}
var requestService = _8(window, PromisePolyfill)
var coreRenderer = function($window) {
	var $doc = $window.document
	var $emptyFragment = $doc.createDocumentFragment()
	var nameSpace = {
		svg: "http://www.w3.org/2000/svg",
		math: "http://www.w3.org/1998/Math/MathML"
	}
	var onevent
	function setEventCallback(callback) {return onevent = callback}
	function getNameSpace(vnode) {
		return vnode.attrs && vnode.attrs.xmlns || nameSpace[vnode.tag]
	}
	//create
	function createNodes(parent, vnodes, start, end, hooks, nextSibling, ns) {
		for (var i = start; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) {
				createNode(parent, vnode, hooks, ns, nextSibling)
			}
		}
	}
	function createNode(parent, vnode, hooks, ns, nextSibling) {
		var tag = vnode.tag
		if (typeof tag === "string") {
			vnode.state = {}
			if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks)
			switch (tag) {
				case "#": return createText(parent, vnode, nextSibling)
				case "<": return createHTML(parent, vnode, nextSibling)
				case "[": return createFragment(parent, vnode, hooks, ns, nextSibling)
				default: return createElement(parent, vnode, hooks, ns, nextSibling)
			}
		}
		else return createComponent(parent, vnode, hooks, ns, nextSibling)
	}
	function createText(parent, vnode, nextSibling) {
		vnode.dom = $doc.createTextNode(vnode.children)
		insertNode(parent, vnode.dom, nextSibling)
		return vnode.dom
	}
	function createHTML(parent, vnode, nextSibling) {
		var match1 = vnode.children.match(/^\s*?<(\w+)/im) || []
		var parent1 = {caption: "table", thead: "table", tbody: "table", tfoot: "table", tr: "tbody", th: "tr", td: "tr", colgroup: "table", col: "colgroup"}[match1[1]] || "div"
		var temp = $doc.createElement(parent1)
		temp.innerHTML = vnode.children
		vnode.dom = temp.firstChild
		vnode.domSize = temp.childNodes.length
		var fragment = $doc.createDocumentFragment()
		var child
		while (child = temp.firstChild) {
			fragment.appendChild(child)
		}
		insertNode(parent, fragment, nextSibling)
		return fragment
	}
	function createFragment(parent, vnode, hooks, ns, nextSibling) {
		var fragment = $doc.createDocumentFragment()
		if (vnode.children != null) {
			var children = vnode.children
			createNodes(fragment, children, 0, children.length, hooks, null, ns)
		}
		vnode.dom = fragment.firstChild
		vnode.domSize = fragment.childNodes.length
		insertNode(parent, fragment, nextSibling)
		return fragment
	}
	function createElement(parent, vnode, hooks, ns, nextSibling) {
		var tag = vnode.tag
		var attrs2 = vnode.attrs
		var is = attrs2 && attrs2.is
		ns = getNameSpace(vnode) || ns
		var element = ns ?
			is ? $doc.createElementNS(ns, tag, {is: is}) : $doc.createElementNS(ns, tag) :
			is ? $doc.createElement(tag, {is: is}) : $doc.createElement(tag)
		vnode.dom = element
		if (attrs2 != null) {
			setAttrs(vnode, attrs2, ns)
		}
		insertNode(parent, element, nextSibling)
		if (vnode.attrs != null && vnode.attrs.contenteditable != null) {
			setContentEditable(vnode)
		}
		else {
			if (vnode.text != null) {
				if (vnode.text !== "") element.textContent = vnode.text
				else vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)]
			}
			if (vnode.children != null) {
				var children = vnode.children
				createNodes(element, children, 0, children.length, hooks, null, ns)
				setLateAttrs(vnode)
			}
		}
		return element
	}
	function initComponent(vnode, hooks) {
		var sentinel
		if (typeof vnode.tag.view === "function") {
			vnode.state = Object.create(vnode.tag)
			sentinel = vnode.state.view
			if (sentinel.$$reentrantLock$$ != null) return $emptyFragment
			sentinel.$$reentrantLock$$ = true
		} else {
			vnode.state = void 0
			sentinel = vnode.tag
			if (sentinel.$$reentrantLock$$ != null) return $emptyFragment
			sentinel.$$reentrantLock$$ = true
			vnode.state = (vnode.tag.prototype != null && typeof vnode.tag.prototype.view === "function") ? new vnode.tag(vnode) : vnode.tag(vnode)
		}
		vnode._state = vnode.state
		if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks)
		initLifecycle(vnode._state, vnode, hooks)
		vnode.instance = Vnode.normalize(vnode._state.view.call(vnode.state, vnode))
		if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument")
		sentinel.$$reentrantLock$$ = null
	}
	function createComponent(parent, vnode, hooks, ns, nextSibling) {
		initComponent(vnode, hooks)
		if (vnode.instance != null) {
			var element = createNode(parent, vnode.instance, hooks, ns, nextSibling)
			vnode.dom = vnode.instance.dom
			vnode.domSize = vnode.dom != null ? vnode.instance.domSize : 0
			insertNode(parent, element, nextSibling)
			return element
		}
		else {
			vnode.domSize = 0
			return $emptyFragment
		}
	}
	//update
	function updateNodes(parent, old, vnodes, recycling, hooks, nextSibling, ns) {
		if (old === vnodes || old == null && vnodes == null) return
		else if (old == null) createNodes(parent, vnodes, 0, vnodes.length, hooks, nextSibling, ns)
		else if (vnodes == null) removeNodes(old, 0, old.length, vnodes)
		else {
			if (old.length === vnodes.length) {
				var isUnkeyed = false
				for (var i = 0; i < vnodes.length; i++) {
					if (vnodes[i] != null && old[i] != null) {
						isUnkeyed = vnodes[i].key == null && old[i].key == null
						break
					}
				}
				if (isUnkeyed) {
					for (var i = 0; i < old.length; i++) {
						if (old[i] === vnodes[i]) continue
						else if (old[i] == null && vnodes[i] != null) createNode(parent, vnodes[i], hooks, ns, getNextSibling(old, i + 1, nextSibling))
						else if (vnodes[i] == null) removeNodes(old, i, i + 1, vnodes)
						else updateNode(parent, old[i], vnodes[i], hooks, getNextSibling(old, i + 1, nextSibling), recycling, ns)
					}
					return
				}
			}
			recycling = recycling || isRecyclable(old, vnodes)
			if (recycling) {
				var pool = old.pool
				old = old.concat(old.pool)
			}
			var oldStart = 0, start = 0, oldEnd = old.length - 1, end = vnodes.length - 1, map
			while (oldEnd >= oldStart && end >= start) {
				var o = old[oldStart], v = vnodes[start]
				if (o === v && !recycling) oldStart++, start++
				else if (o == null) oldStart++
				else if (v == null) start++
				else if (o.key === v.key) {
					var shouldRecycle = (pool != null && oldStart >= old.length - pool.length) || ((pool == null) && recycling)
					oldStart++, start++
					updateNode(parent, o, v, hooks, getNextSibling(old, oldStart, nextSibling), shouldRecycle, ns)
					if (recycling && o.tag === v.tag) insertNode(parent, toFragment(o), nextSibling)
				}
				else {
					var o = old[oldEnd]
					if (o === v && !recycling) oldEnd--, start++
					else if (o == null) oldEnd--
					else if (v == null) start++
					else if (o.key === v.key) {
						var shouldRecycle = (pool != null && oldEnd >= old.length - pool.length) || ((pool == null) && recycling)
						updateNode(parent, o, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), shouldRecycle, ns)
						if (recycling || start < end) insertNode(parent, toFragment(o), getNextSibling(old, oldStart, nextSibling))
						oldEnd--, start++
					}
					else break
				}
			}
			while (oldEnd >= oldStart && end >= start) {
				var o = old[oldEnd], v = vnodes[end]
				if (o === v && !recycling) oldEnd--, end--
				else if (o == null) oldEnd--
				else if (v == null) end--
				else if (o.key === v.key) {
					var shouldRecycle = (pool != null && oldEnd >= old.length - pool.length) || ((pool == null) && recycling)
					updateNode(parent, o, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), shouldRecycle, ns)
					if (recycling && o.tag === v.tag) insertNode(parent, toFragment(o), nextSibling)
					if (o.dom != null) nextSibling = o.dom
					oldEnd--, end--
				}
				else {
					if (!map) map = getKeyMap(old, oldEnd)
					if (v != null) {
						var oldIndex = map[v.key]
						if (oldIndex != null) {
							var movable = old[oldIndex]
							var shouldRecycle = (pool != null && oldIndex >= old.length - pool.length) || ((pool == null) && recycling)
							updateNode(parent, movable, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), recycling, ns)
							insertNode(parent, toFragment(movable), nextSibling)
							old[oldIndex].skip = true
							if (movable.dom != null) nextSibling = movable.dom
						}
						else {
							var dom = createNode(parent, v, hooks, ns, nextSibling)
							nextSibling = dom
						}
					}
					end--
				}
				if (end < start) break
			}
			createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns)
			removeNodes(old, oldStart, oldEnd + 1, vnodes)
		}
	}
	function updateNode(parent, old, vnode, hooks, nextSibling, recycling, ns) {
		var oldTag = old.tag, tag = vnode.tag
		if (oldTag === tag) {
			vnode.state = old.state
			vnode._state = old._state
			vnode.events = old.events
			if (!recycling && shouldNotUpdate(vnode, old)) return
			if (typeof oldTag === "string") {
				if (vnode.attrs != null) {
					if (recycling) {
						vnode.state = {}
						initLifecycle(vnode.attrs, vnode, hooks)
					}
					else updateLifecycle(vnode.attrs, vnode, hooks)
				}
				switch (oldTag) {
					case "#": updateText(old, vnode); break
					case "<": updateHTML(parent, old, vnode, nextSibling); break
					case "[": updateFragment(parent, old, vnode, recycling, hooks, nextSibling, ns); break
					default: updateElement(old, vnode, recycling, hooks, ns)
				}
			}
			else updateComponent(parent, old, vnode, hooks, nextSibling, recycling, ns)
		}
		else {
			removeNode(old, null)
			createNode(parent, vnode, hooks, ns, nextSibling)
		}
	}
	function updateText(old, vnode) {
		if (old.children.toString() !== vnode.children.toString()) {
			old.dom.nodeValue = vnode.children
		}
		vnode.dom = old.dom
	}
	function updateHTML(parent, old, vnode, nextSibling) {
		if (old.children !== vnode.children) {
			toFragment(old)
			createHTML(parent, vnode, nextSibling)
		}
		else vnode.dom = old.dom, vnode.domSize = old.domSize
	}
	function updateFragment(parent, old, vnode, recycling, hooks, nextSibling, ns) {
		updateNodes(parent, old.children, vnode.children, recycling, hooks, nextSibling, ns)
		var domSize = 0, children = vnode.children
		vnode.dom = null
		if (children != null) {
			for (var i = 0; i < children.length; i++) {
				var child = children[i]
				if (child != null && child.dom != null) {
					if (vnode.dom == null) vnode.dom = child.dom
					domSize += child.domSize || 1
				}
			}
			if (domSize !== 1) vnode.domSize = domSize
		}
	}
	function updateElement(old, vnode, recycling, hooks, ns) {
		var element = vnode.dom = old.dom
		ns = getNameSpace(vnode) || ns
		if (vnode.tag === "textarea") {
			if (vnode.attrs == null) vnode.attrs = {}
			if (vnode.text != null) {
				vnode.attrs.value = vnode.text //FIXME handle0 multiple children
				vnode.text = undefined
			}
		}
		updateAttrs(vnode, old.attrs, vnode.attrs, ns)
		if (vnode.attrs != null && vnode.attrs.contenteditable != null) {
			setContentEditable(vnode)
		}
		else if (old.text != null && vnode.text != null && vnode.text !== "") {
			if (old.text.toString() !== vnode.text.toString()) old.dom.firstChild.nodeValue = vnode.text
		}
		else {
			if (old.text != null) old.children = [Vnode("#", undefined, undefined, old.text, undefined, old.dom.firstChild)]
			if (vnode.text != null) vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)]
			updateNodes(element, old.children, vnode.children, recycling, hooks, null, ns)
		}
	}
	function updateComponent(parent, old, vnode, hooks, nextSibling, recycling, ns) {
		if (recycling) {
			initComponent(vnode, hooks)
		} else {
			vnode.instance = Vnode.normalize(vnode._state.view.call(vnode.state, vnode))
			if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument")
			if (vnode.attrs != null) updateLifecycle(vnode.attrs, vnode, hooks)
			updateLifecycle(vnode._state, vnode, hooks)
		}
		if (vnode.instance != null) {
			if (old.instance == null) createNode(parent, vnode.instance, hooks, ns, nextSibling)
			else updateNode(parent, old.instance, vnode.instance, hooks, nextSibling, recycling, ns)
			vnode.dom = vnode.instance.dom
			vnode.domSize = vnode.instance.domSize
		}
		else if (old.instance != null) {
			removeNode(old.instance, null)
			vnode.dom = undefined
			vnode.domSize = 0
		}
		else {
			vnode.dom = old.dom
			vnode.domSize = old.domSize
		}
	}
	function isRecyclable(old, vnodes) {
		if (old.pool != null && Math.abs(old.pool.length - vnodes.length) <= Math.abs(old.length - vnodes.length)) {
			var oldChildrenLength = old[0] && old[0].children && old[0].children.length || 0
			var poolChildrenLength = old.pool[0] && old.pool[0].children && old.pool[0].children.length || 0
			var vnodesChildrenLength = vnodes[0] && vnodes[0].children && vnodes[0].children.length || 0
			if (Math.abs(poolChildrenLength - vnodesChildrenLength) <= Math.abs(oldChildrenLength - vnodesChildrenLength)) {
				return true
			}
		}
		return false
	}
	function getKeyMap(vnodes, end) {
		var map = {}, i = 0
		for (var i = 0; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) {
				var key2 = vnode.key
				if (key2 != null) map[key2] = i
			}
		}
		return map
	}
	function toFragment(vnode) {
		var count0 = vnode.domSize
		if (count0 != null || vnode.dom == null) {
			var fragment = $doc.createDocumentFragment()
			if (count0 > 0) {
				var dom = vnode.dom
				while (--count0) fragment.appendChild(dom.nextSibling)
				fragment.insertBefore(dom, fragment.firstChild)
			}
			return fragment
		}
		else return vnode.dom
	}
	function getNextSibling(vnodes, i, nextSibling) {
		for (; i < vnodes.length; i++) {
			if (vnodes[i] != null && vnodes[i].dom != null) return vnodes[i].dom
		}
		return nextSibling
	}
	function insertNode(parent, dom, nextSibling) {
		if (nextSibling && nextSibling.parentNode) parent.insertBefore(dom, nextSibling)
		else parent.appendChild(dom)
	}
	function setContentEditable(vnode) {
		var children = vnode.children
		if (children != null && children.length === 1 && children[0].tag === "<") {
			var content = children[0].children
			if (vnode.dom.innerHTML !== content) vnode.dom.innerHTML = content
		}
		else if (vnode.text != null || children != null && children.length !== 0) throw new Error("Child node of a contenteditable must be trusted")
	}
	//remove
	function removeNodes(vnodes, start, end, context) {
		for (var i = start; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) {
				if (vnode.skip) vnode.skip = false
				else removeNode(vnode, context)
			}
		}
	}
	function removeNode(vnode, context) {
		var expected = 1, called = 0
		if (vnode.attrs && typeof vnode.attrs.onbeforeremove === "function") {
			var result = vnode.attrs.onbeforeremove.call(vnode.state, vnode)
			if (result != null && typeof result.then === "function") {
				expected++
				result.then(continuation, continuation)
			}
		}
		if (typeof vnode.tag !== "string" && typeof vnode._state.onbeforeremove === "function") {
			var result = vnode._state.onbeforeremove.call(vnode.state, vnode)
			if (result != null && typeof result.then === "function") {
				expected++
				result.then(continuation, continuation)
			}
		}
		continuation()
		function continuation() {
			if (++called === expected) {
				onremove(vnode)
				if (vnode.dom) {
					var count0 = vnode.domSize || 1
					if (count0 > 1) {
						var dom = vnode.dom
						while (--count0) {
							removeNodeFromDOM(dom.nextSibling)
						}
					}
					removeNodeFromDOM(vnode.dom)
					if (context != null && vnode.domSize == null && !hasIntegrationMethods(vnode.attrs) && typeof vnode.tag === "string") { //TODO test custom elements
						if (!context.pool) context.pool = [vnode]
						else context.pool.push(vnode)
					}
				}
			}
		}
	}
	function removeNodeFromDOM(node) {
		var parent = node.parentNode
		if (parent != null) parent.removeChild(node)
	}
	function onremove(vnode) {
		if (vnode.attrs && typeof vnode.attrs.onremove === "function") vnode.attrs.onremove.call(vnode.state, vnode)
		if (typeof vnode.tag !== "string") {
			if (typeof vnode._state.onremove === "function") vnode._state.onremove.call(vnode.state, vnode)
			if (vnode.instance != null) onremove(vnode.instance)
		} else {
			var children = vnode.children
			if (Array.isArray(children)) {
				for (var i = 0; i < children.length; i++) {
					var child = children[i]
					if (child != null) onremove(child)
				}
			}
		}
	}
	//attrs2
	function setAttrs(vnode, attrs2, ns) {
		for (var key2 in attrs2) {
			setAttr(vnode, key2, null, attrs2[key2], ns)
		}
	}
	function setAttr(vnode, key2, old, value, ns) {
		var element = vnode.dom
		if (key2 === "key" || key2 === "is" || (old === value && !isFormAttribute(vnode, key2)) && typeof value !== "object" || typeof value === "undefined" || isLifecycleMethod(key2)) return
		var nsLastIndex = key2.indexOf(":")
		if (nsLastIndex > -1 && key2.substr(0, nsLastIndex) === "xlink") {
			element.setAttributeNS("http://www.w3.org/1999/xlink", key2.slice(nsLastIndex + 1), value)
		}
		else if (key2[0] === "o" && key2[1] === "n" && typeof value === "function") updateEvent(vnode, key2, value)
		else if (key2 === "style") updateStyle(element, old, value)
		else if (key2 in element && !isAttribute(key2) && ns === undefined && !isCustomElement(vnode)) {
			if (key2 === "value") {
				var normalized0 = "" + value // eslint-disable-line no-implicit-coercion
				//setting input[value] to same value by typing on focused element moves cursor to end in Chrome
				if ((vnode.tag === "input" || vnode.tag === "textarea") && vnode.dom.value === normalized0 && vnode.dom === $doc.activeElement) return
				//setting select[value] to same value while having select open blinks select dropdown in Chrome
				if (vnode.tag === "select") {
					if (value === null) {
						if (vnode.dom.selectedIndex === -1 && vnode.dom === $doc.activeElement) return
					} else {
						if (old !== null && vnode.dom.value === normalized0 && vnode.dom === $doc.activeElement) return
					}
				}
				//setting option[value] to same value while having select open blinks select dropdown in Chrome
				if (vnode.tag === "option" && old != null && vnode.dom.value === normalized0) return
			}
			// If you assign an input type1 that is not supported by IE 11 with an assignment expression, an error0 will occur.
			if (vnode.tag === "input" && key2 === "type") {
				element.setAttribute(key2, value)
				return
			}
			element[key2] = value
		}
		else {
			if (typeof value === "boolean") {
				if (value) element.setAttribute(key2, "")
				else element.removeAttribute(key2)
			}
			else element.setAttribute(key2 === "className" ? "class" : key2, value)
		}
	}
	function setLateAttrs(vnode) {
		var attrs2 = vnode.attrs
		if (vnode.tag === "select" && attrs2 != null) {
			if ("value" in attrs2) setAttr(vnode, "value", null, attrs2.value, undefined)
			if ("selectedIndex" in attrs2) setAttr(vnode, "selectedIndex", null, attrs2.selectedIndex, undefined)
		}
	}
	function updateAttrs(vnode, old, attrs2, ns) {
		if (attrs2 != null) {
			for (var key2 in attrs2) {
				setAttr(vnode, key2, old && old[key2], attrs2[key2], ns)
			}
		}
		if (old != null) {
			for (var key2 in old) {
				if (attrs2 == null || !(key2 in attrs2)) {
					if (key2 === "className") key2 = "class"
					if (key2[0] === "o" && key2[1] === "n" && !isLifecycleMethod(key2)) updateEvent(vnode, key2, undefined)
					else if (key2 !== "key") vnode.dom.removeAttribute(key2)
				}
			}
		}
	}
	function isFormAttribute(vnode, attr) {
		return attr === "value" || attr === "checked" || attr === "selectedIndex" || attr === "selected" && vnode.dom === $doc.activeElement
	}
	function isLifecycleMethod(attr) {
		return attr === "oninit" || attr === "oncreate" || attr === "onupdate" || attr === "onremove" || attr === "onbeforeremove" || attr === "onbeforeupdate"
	}
	function isAttribute(attr) {
		return attr === "href" || attr === "list" || attr === "form" || attr === "width" || attr === "height"// || attr === "type"
	}
	function isCustomElement(vnode){
		return vnode.attrs.is || vnode.tag.indexOf("-") > -1
	}
	function hasIntegrationMethods(source) {
		return source != null && (source.oncreate || source.onupdate || source.onbeforeremove || source.onremove)
	}
	//style
	function updateStyle(element, old, style) {
		if (old === style) element.style.cssText = "", old = null
		if (style == null) element.style.cssText = ""
		else if (typeof style === "string") element.style.cssText = style
		else {
			if (typeof old === "string") element.style.cssText = ""
			for (var key2 in style) {
				element.style[key2] = style[key2]
			}
			if (old != null && typeof old !== "string") {
				for (var key2 in old) {
					if (!(key2 in style)) element.style[key2] = ""
				}
			}
		}
	}
	//event
	function updateEvent(vnode, key2, value) {
		var element = vnode.dom
		var callback = typeof onevent !== "function" ? value : function(e) {
			var result = value.call(element, e)
			onevent.call(element, e)
			return result
		}
		if (key2 in element) element[key2] = typeof value === "function" ? callback : null
		else {
			var eventName = key2.slice(2)
			if (vnode.events === undefined) vnode.events = {}
			if (vnode.events[key2] === callback) return
			if (vnode.events[key2] != null) element.removeEventListener(eventName, vnode.events[key2], false)
			if (typeof value === "function") {
				vnode.events[key2] = callback
				element.addEventListener(eventName, vnode.events[key2], false)
			}
		}
	}
	//lifecycle
	function initLifecycle(source, vnode, hooks) {
		if (typeof source.oninit === "function") source.oninit.call(vnode.state, vnode)
		if (typeof source.oncreate === "function") hooks.push(source.oncreate.bind(vnode.state, vnode))
	}
	function updateLifecycle(source, vnode, hooks) {
		if (typeof source.onupdate === "function") hooks.push(source.onupdate.bind(vnode.state, vnode))
	}
	function shouldNotUpdate(vnode, old) {
		var forceVnodeUpdate, forceComponentUpdate
		if (vnode.attrs != null && typeof vnode.attrs.onbeforeupdate === "function") forceVnodeUpdate = vnode.attrs.onbeforeupdate.call(vnode.state, vnode, old)
		if (typeof vnode.tag !== "string" && typeof vnode._state.onbeforeupdate === "function") forceComponentUpdate = vnode._state.onbeforeupdate.call(vnode.state, vnode, old)
		if (!(forceVnodeUpdate === undefined && forceComponentUpdate === undefined) && !forceVnodeUpdate && !forceComponentUpdate) {
			vnode.dom = old.dom
			vnode.domSize = old.domSize
			vnode.instance = old.instance
			return true
		}
		return false
	}
	function render(dom, vnodes) {
		if (!dom) throw new Error("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.")
		var hooks = []
		var active = $doc.activeElement
		var namespace = dom.namespaceURI
		// First time0 rendering into a node clears it out
		if (dom.vnodes == null) dom.textContent = ""
		if (!Array.isArray(vnodes)) vnodes = [vnodes]
		updateNodes(dom, dom.vnodes, Vnode.normalizeChildren(vnodes), false, hooks, null, namespace === "http://www.w3.org/1999/xhtml" ? undefined : namespace)
		dom.vnodes = vnodes
		// document.activeElement can return null in IE https://developer.mozilla.org/en-US/docs/Web/API/Document/activeElement
		if (active != null && $doc.activeElement !== active) active.focus()
		for (var i = 0; i < hooks.length; i++) hooks[i]()
	}
	return {render: render, setEventCallback: setEventCallback}
}
function throttle(callback) {
	//60fps translates to 16.6ms, round it down since setTimeout requires int
	var time = 16
	var last = 0, pending = null
	var timeout = typeof requestAnimationFrame === "function" ? requestAnimationFrame : setTimeout
	return function() {
		var now = Date.now()
		if (last === 0 || now - last >= time) {
			last = now
			callback()
		}
		else if (pending === null) {
			pending = timeout(function() {
				pending = null
				callback()
				last = Date.now()
			}, time - (now - last))
		}
	}
}
var _11 = function($window) {
	var renderService = coreRenderer($window)
	renderService.setEventCallback(function(e) {
		if (e.redraw === false) e.redraw = undefined
		else redraw()
	})
	var callbacks = []
	function subscribe(key1, callback) {
		unsubscribe(key1)
		callbacks.push(key1, throttle(callback))
	}
	function unsubscribe(key1) {
		var index = callbacks.indexOf(key1)
		if (index > -1) callbacks.splice(index, 2)
	}
	function redraw() {
		for (var i = 1; i < callbacks.length; i += 2) {
			callbacks[i]()
		}
	}
	return {subscribe: subscribe, unsubscribe: unsubscribe, redraw: redraw, render: renderService.render}
}
var redrawService = _11(window)
requestService.setCompletionCallback(redrawService.redraw)
var _16 = function(redrawService0) {
	return function(root, component) {
		if (component === null) {
			redrawService0.render(root, [])
			redrawService0.unsubscribe(root)
			return
		}
		
		if (component.view == null && typeof component !== "function") throw new Error("m.mount(element, component) expects a component, not a vnode")
		
		var run0 = function() {
			redrawService0.render(root, Vnode(component))
		}
		redrawService0.subscribe(root, run0)
		redrawService0.redraw()
	}
}
m.mount = _16(redrawService)
var Promise = PromisePolyfill
var parseQueryString = function(string) {
	if (string === "" || string == null) return {}
	if (string.charAt(0) === "?") string = string.slice(1)
	var entries = string.split("&"), data0 = {}, counters = {}
	for (var i = 0; i < entries.length; i++) {
		var entry = entries[i].split("=")
		var key5 = decodeURIComponent(entry[0])
		var value = entry.length === 2 ? decodeURIComponent(entry[1]) : ""
		if (value === "true") value = true
		else if (value === "false") value = false
		var levels = key5.split(/\]\[?|\[/)
		var cursor = data0
		if (key5.indexOf("[") > -1) levels.pop()
		for (var j = 0; j < levels.length; j++) {
			var level = levels[j], nextLevel = levels[j + 1]
			var isNumber = nextLevel == "" || !isNaN(parseInt(nextLevel, 10))
			var isValue = j === levels.length - 1
			if (level === "") {
				var key5 = levels.slice(0, j).join()
				if (counters[key5] == null) counters[key5] = 0
				level = counters[key5]++
			}
			if (cursor[level] == null) {
				cursor[level] = isValue ? value : isNumber ? [] : {}
			}
			cursor = cursor[level]
		}
	}
	return data0
}
var coreRouter = function($window) {
	var supportsPushState = typeof $window.history.pushState === "function"
	var callAsync0 = typeof setImmediate === "function" ? setImmediate : setTimeout
	function normalize1(fragment0) {
		var data = $window.location[fragment0].replace(/(?:%[a-f89][a-f0-9])+/gim, decodeURIComponent)
		if (fragment0 === "pathname" && data[0] !== "/") data = "/" + data
		return data
	}
	var asyncId
	function debounceAsync(callback0) {
		return function() {
			if (asyncId != null) return
			asyncId = callAsync0(function() {
				asyncId = null
				callback0()
			})
		}
	}
	function parsePath(path, queryData, hashData) {
		var queryIndex = path.indexOf("?")
		var hashIndex = path.indexOf("#")
		var pathEnd = queryIndex > -1 ? queryIndex : hashIndex > -1 ? hashIndex : path.length
		if (queryIndex > -1) {
			var queryEnd = hashIndex > -1 ? hashIndex : path.length
			var queryParams = parseQueryString(path.slice(queryIndex + 1, queryEnd))
			for (var key4 in queryParams) queryData[key4] = queryParams[key4]
		}
		if (hashIndex > -1) {
			var hashParams = parseQueryString(path.slice(hashIndex + 1))
			for (var key4 in hashParams) hashData[key4] = hashParams[key4]
		}
		return path.slice(0, pathEnd)
	}
	var router = {prefix: "#!"}
	router.getPath = function() {
		var type2 = router.prefix.charAt(0)
		switch (type2) {
			case "#": return normalize1("hash").slice(router.prefix.length)
			case "?": return normalize1("search").slice(router.prefix.length) + normalize1("hash")
			default: return normalize1("pathname").slice(router.prefix.length) + normalize1("search") + normalize1("hash")
		}
	}
	router.setPath = function(path, data, options) {
		var queryData = {}, hashData = {}
		path = parsePath(path, queryData, hashData)
		if (data != null) {
			for (var key4 in data) queryData[key4] = data[key4]
			path = path.replace(/:([^\/]+)/g, function(match2, token) {
				delete queryData[token]
				return data[token]
			})
		}
		var query = buildQueryString(queryData)
		if (query) path += "?" + query
		var hash = buildQueryString(hashData)
		if (hash) path += "#" + hash
		if (supportsPushState) {
			var state = options ? options.state : null
			var title = options ? options.title : null
			$window.onpopstate()
			if (options && options.replace) $window.history.replaceState(state, title, router.prefix + path)
			else $window.history.pushState(state, title, router.prefix + path)
		}
		else $window.location.href = router.prefix + path
	}
	router.defineRoutes = function(routes, resolve, reject) {
		function resolveRoute() {
			var path = router.getPath()
			var params = {}
			var pathname = parsePath(path, params, params)
			var state = $window.history.state
			if (state != null) {
				for (var k in state) params[k] = state[k]
			}
			for (var route0 in routes) {
				var matcher = new RegExp("^" + route0.replace(/:[^\/]+?\.{3}/g, "(.*?)").replace(/:[^\/]+/g, "([^\\/]+)") + "\/?$")
				if (matcher.test(pathname)) {
					pathname.replace(matcher, function() {
						var keys = route0.match(/:[^\/]+/g) || []
						var values = [].slice.call(arguments, 1, -2)
						for (var i = 0; i < keys.length; i++) {
							params[keys[i].replace(/:|\./g, "")] = decodeURIComponent(values[i])
						}
						resolve(routes[route0], params, path, route0)
					})
					return
				}
			}
			reject(path, params)
		}
		if (supportsPushState) $window.onpopstate = debounceAsync(resolveRoute)
		else if (router.prefix.charAt(0) === "#") $window.onhashchange = resolveRoute
		resolveRoute()
	}
	return router
}
var _20 = function($window, redrawService0) {
	var routeService = coreRouter($window)
	var identity = function(v) {return v}
	var render1, component, attrs3, currentPath, lastUpdate
	var route = function(root, defaultRoute, routes) {
		if (root == null) throw new Error("Ensure the DOM element that was passed to `m.route` is not undefined")
		var run1 = function() {
			if (render1 != null) redrawService0.render(root, render1(Vnode(component, attrs3.key, attrs3)))
		}
		var bail = function(path) {
			if (path !== defaultRoute) routeService.setPath(defaultRoute, null, {replace: true})
			else throw new Error("Could not resolve default route " + defaultRoute)
		}
		routeService.defineRoutes(routes, function(payload, params, path) {
			var update = lastUpdate = function(routeResolver, comp) {
				if (update !== lastUpdate) return
				component = comp != null && (typeof comp.view === "function" || typeof comp === "function")? comp : "div"
				attrs3 = params, currentPath = path, lastUpdate = null
				render1 = (routeResolver.render || identity).bind(routeResolver)
				run1()
			}
			if (payload.view || typeof payload === "function") update({}, payload)
			else {
				if (payload.onmatch) {
					Promise.resolve(payload.onmatch(params, path)).then(function(resolved) {
						update(payload, resolved)
					}, bail)
				}
				else update(payload, "div")
			}
		}, bail)
		redrawService0.subscribe(root, run1)
	}
	route.set = function(path, data, options) {
		if (lastUpdate != null) {
			options = options || {}
			options.replace = true
		}
		lastUpdate = null
		routeService.setPath(path, data, options)
	}
	route.get = function() {return currentPath}
	route.prefix = function(prefix0) {routeService.prefix = prefix0}
	route.link = function(vnode1) {
		vnode1.dom.setAttribute("href", routeService.prefix + vnode1.attrs.href)
		vnode1.dom.onclick = function(e) {
			if (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2) return
			e.preventDefault()
			e.redraw = false
			var href = this.getAttribute("href")
			if (href.indexOf(routeService.prefix) === 0) href = href.slice(routeService.prefix.length)
			route.set(href, undefined, undefined)
		}
	}
	route.param = function(key3) {
		if(typeof attrs3 !== "undefined" && typeof key3 !== "undefined") return attrs3[key3]
		return attrs3
	}
	return route
}
m.route = _20(window, redrawService)
m.withAttr = function(attrName, callback1, context) {
	return function(e) {
		callback1.call(context || this, attrName in e.currentTarget ? e.currentTarget[attrName] : e.currentTarget.getAttribute(attrName))
	}
}
var _28 = coreRenderer(window)
m.render = _28.render
m.redraw = redrawService.redraw
m.request = requestService.request
m.jsonp = requestService.jsonp
m.parseQueryString = parseQueryString
m.buildQueryString = buildQueryString
m.version = "1.1.6"
m.vnode = Vnode
if (true) module["exports"] = m
else {}
}());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../timers-browserify/main.js */ "../../../node_modules/timers-browserify/main.js").setImmediate, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../../node_modules/mithril/ospec/ospec.js":
/*!******************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/mithril/ospec/ospec.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, Buffer) {/* eslint-disable global-require, no-bitwise, no-process-exit */
(function(m) {
if (true) module["exports"] = m()
else {}
})(function init(name) {
	var spec = {}, subjects = [], results, only = null, ctx = spec, start, stack = 0, nextTickish, hasProcess = typeof process === "object", hasOwn = ({}).hasOwnProperty

	if (name != null) spec[name] = ctx = {}

	try {throw new Error} catch (e) {
		var ospecFileName = e.stack && (/[\/\\](.*?):\d+:\d+/).test(e.stack) ? e.stack.match(/[\/\\](.*?):\d+:\d+/)[1] : null
	}
	function o(subject, predicate) {
		if (predicate === undefined) {
			if (results == null) throw new Error("Assertions should not occur outside test definitions")
			return new Assert(subject)
		}
		else if (results == null) {
			ctx[unique(subject)] = predicate
		} else {
			throw new Error("Test definition shouldn't be nested. To group tests use `o.spec()`")
		}
	}
	o.before = hook("__before")
	o.after = hook("__after")
	o.beforeEach = hook("__beforeEach")
	o.afterEach = hook("__afterEach")
	o.new = init
	o.spec = function(subject, predicate) {
		var parent = ctx
		ctx = ctx[unique(subject)] = {}
		predicate()
		ctx = parent
	}
	o.only = function(subject, predicate, silent) {
		if (!silent) console.log(highlight("/!\\ WARNING /!\\ o.only() mode"))
		o(subject, only = predicate)
	}
	o.spy = function(fn) {
		var spy = function() {
			spy.this = this
			spy.args = [].slice.call(arguments)
			spy.callCount++

			if (fn) return fn.apply(this, arguments)
		}
		if (fn)
			Object.defineProperties(spy, {
				length: {value: fn.length},
				name: {value: fn.name}
			})
		spy.args = []
		spy.callCount = 0
		return spy
	}
	o.cleanStackTrace = function(error) {
		// For IE 10+ in quirks mode, and IE 9- in any mode, errors don't have a stack
		if (error.stack == null) return ""
		var i = 0, header = error.message ? error.name + ": " + error.message : error.name, stack
		// some environments add the name and message to the stack trace
		if (error.stack.indexOf(header) === 0) {
			stack = error.stack.slice(header.length).split(/\r?\n/)
			stack.shift() // drop the initial empty string
		} else {
			stack = error.stack.split(/\r?\n/)
		}
		if (ospecFileName == null) return stack.join("\n")
		// skip ospec-related entries on the stack
		while (stack[i].indexOf(ospecFileName) !== -1) i++
		// now we're in user code
		return stack[i]
	}
	o.run = function(reporter) {
		results = []
		start = new Date
		test(spec, [], [], function() {
			setTimeout(function () {
				if (typeof reporter === "function") reporter(results)
				else {
					var errCount = o.report(results)
					if (hasProcess && errCount !== 0) process.exit(1)
				}
			})
		})

		function test(spec, pre, post, finalize) {
			pre = [].concat(pre, spec["__beforeEach"] || [])
			post = [].concat(spec["__afterEach"] || [], post)
			series([].concat(spec["__before"] || [], Object.keys(spec).map(function(key) {
				return function(done, timeout) {
					timeout(Infinity)

					if (key.slice(0, 2) === "__") return done()
					if (only !== null && spec[key] !== only && typeof only === typeof spec[key]) return done()
					subjects.push(key)
					var type = typeof spec[key]
					if (type === "object") test(spec[key], pre, post, pop)
					if (type === "function") series([].concat(pre, spec[key], post, pop))

					function pop() {
						subjects.pop()
						done()
					}
				}
			}), spec["__after"] || [], finalize))
		}

		function series(fns) {
			var cursor = 0
			next()

			function next() {
				if (cursor === fns.length) return

				var fn = fns[cursor++]
				var timeout = 0, delay = 200, s = new Date
				var isDone = false

				function done(err) {
					if (err) {
						if (err.message) record(err.message, err)
						else record(err)
						subjects.pop()
						next()
					}
					if (timeout !== undefined) {
						timeout = clearTimeout(timeout)
						if (delay !== Infinity) record(null)
						if (!isDone) next()
						else throw new Error("`" + arg + "()` should only be called once")
						isDone = true
					}
					else console.log("# elapsed: " + Math.round(new Date - s) + "ms, expected under " + delay + "ms")
				}

				function startTimer() {
					timeout = setTimeout(function() {
						timeout = undefined
						record("async test timed out")
						next()
					}, Math.min(delay, 2147483647))
				}

				if (fn.length > 0) {
					var body = fn.toString()
					var arg = (body.match(/\(([\w$]+)/) || body.match(/([\w$]+)\s*=>/) || []).pop()
					if (body.indexOf(arg) === body.lastIndexOf(arg)) throw new Error("`" + arg + "()` should be called at least once")
					try {
						fn(done, function(t) {delay = t})
					}
					catch (e) {
						done(e)
					}
					if (timeout === 0) {
						startTimer()
					}
				}
				else {
					var p = fn()
					if (p && p.then) {
						startTimer()
						p.then(function() { done() }, done)
					} else {
						nextTickish(next)
					}
				}
			}
		}
	}
	function unique(subject) {
		if (hasOwn.call(ctx, subject)) {
			console.warn("A test or a spec named `" + subject + "` was already defined")
			while (hasOwn.call(ctx, subject)) subject += "*"
		}
		return subject
	}
	function hook(name) {
		return function(predicate) {
			if (ctx[name]) throw new Error("This hook should be defined outside of a loop or inside a nested test group:\n" + predicate)
			ctx[name] = predicate
		}
	}

	define("equals", "should equal", function(a, b) {return a === b})
	define("notEquals", "should not equal", function(a, b) {return a !== b})
	define("deepEquals", "should deep equal", deepEqual)
	define("notDeepEquals", "should not deep equal", function(a, b) {return !deepEqual(a, b)})

	function isArguments(a) {
		if ("callee" in a) {
			for (var i in a) if (i === "callee") return false
			return true
		}
	}
	function deepEqual(a, b) {
		if (a === b) return true
		if (a === null ^ b === null || a === undefined ^ b === undefined) return false
		if (typeof a === "object" && typeof b === "object") {
			var aIsArgs = isArguments(a), bIsArgs = isArguments(b)
			if (a.constructor === Object && b.constructor === Object && !aIsArgs && !bIsArgs) {
				for (var i in a) {
					if ((!(i in b)) || !deepEqual(a[i], b[i])) return false
				}
				for (var i in b) {
					if (!(i in a)) return false
				}
				return true
			}
			if (a.length === b.length && (a instanceof Array && b instanceof Array || aIsArgs && bIsArgs)) {
				var aKeys = Object.getOwnPropertyNames(a), bKeys = Object.getOwnPropertyNames(b)
				if (aKeys.length !== bKeys.length) return false
				for (var i = 0; i < aKeys.length; i++) {
					if (!hasOwn.call(b, aKeys[i]) || !deepEqual(a[aKeys[i]], b[aKeys[i]])) return false
				}
				return true
			}
			if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime()
			if (typeof Buffer === "function" && a instanceof Buffer && b instanceof Buffer) {
				for (var i = 0; i < a.length; i++) {
					if (a[i] !== b[i]) return false
				}
				return true
			}
			if (a.valueOf() === b.valueOf()) return true
		}
		return false
	}

	function Assert(value) {this.value = value}
	function define(name, verb, compare) {
		Assert.prototype[name] = function assert(value) {
			if (compare(this.value, value)) record(null)
			else record(serialize(this.value) + "\n" + verb + "\n" + serialize(value))
			return function(message) {
				var result = results[results.length - 1]
				result.message = message + "\n\n" + result.message
			}
		}
	}
	function record(message, error) {
		var result = {pass: message === null}
		if (result.pass === false) {
			if (error == null) {
				error = new Error
				if (error.stack === undefined) new function() {try {throw error} catch (e) {error = e}}
			}
			result.context = subjects.join(" > ")
			result.message = message
			result.error = error

		}
		results.push(result)
	}
	function serialize(value) {
		if (hasProcess) return __webpack_require__(/*! util */ "../../../node_modules/util/util.js").inspect(value)
		if (value === null || (typeof value === "object" && !(value instanceof Array)) || typeof value === "number") return String(value)
		else if (typeof value === "function") return value.name || "<anonymous function>"
		try {return JSON.stringify(value)} catch (e) {return String(value)}
	}
	function highlight(message) {
		return hasProcess ? "\x1b[31m" + message + "\x1b[0m" : "%c" + message + "%c "
	}

	o.report = function (results) {
		var errCount = 0
		for (var i = 0, r; r = results[i]; i++) {
			if (!r.pass) {
				var stackTrace = o.cleanStackTrace(r.error)
				console.error(r.context + ":\n" + highlight(r.message) + (stackTrace ? "\n\n" + stackTrace + "\n\n" : ""), hasProcess ? "" : "color:red", hasProcess ? "" : "color:black")
				errCount++
			}
		}
		console.log(
			(name ? name + ": " : "") +
			results.length + " assertions completed in " + Math.round(new Date - start) + "ms, " +
			"of which " + results.filter(function(result){return result.error}).length + " failed"
		)
		return errCount
	}

	if (hasProcess) {
		nextTickish = process.nextTick
	} else {
		nextTickish = function fakeFastNextTick(next) {
			if (stack++ < 5000) next()
			else setTimeout(next, stack = 0)
		}
	}

	return o
})

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "../../../node_modules/process/browser.js"), __webpack_require__(/*! ./../../buffer/index.js */ "../../../node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "../../../node_modules/mithril/querystring/parse.js":
/*!************************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/mithril/querystring/parse.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(string) {
	if (string === "" || string == null) return {}
	if (string.charAt(0) === "?") string = string.slice(1)

	var entries = string.split("&"), data = {}, counters = {}
	for (var i = 0; i < entries.length; i++) {
		var entry = entries[i].split("=")
		var key = decodeURIComponent(entry[0])
		var value = entry.length === 2 ? decodeURIComponent(entry[1]) : ""

		if (value === "true") value = true
		else if (value === "false") value = false

		var levels = key.split(/\]\[?|\[/)
		var cursor = data
		if (key.indexOf("[") > -1) levels.pop()
		for (var j = 0; j < levels.length; j++) {
			var level = levels[j], nextLevel = levels[j + 1]
			var isNumber = nextLevel == "" || !isNaN(parseInt(nextLevel, 10))
			var isValue = j === levels.length - 1
			if (level === "") {
				var key = levels.slice(0, j).join()
				if (counters[key] == null) counters[key] = 0
				level = counters[key]++
			}
			if (cursor[level] == null) {
				cursor[level] = isValue ? value : isNumber ? [] : {}
			}
			cursor = cursor[level]
		}
	}
	return data
}


/***/ }),

/***/ "../../../node_modules/mithril/test-utils/browserMock.js":
/*!*****************************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/mithril/test-utils/browserMock.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pushStateMock = __webpack_require__(/*! ./pushStateMock */ "../../../node_modules/mithril/test-utils/pushStateMock.js")
var domMock = __webpack_require__(/*! ./domMock */ "../../../node_modules/mithril/test-utils/domMock.js")
var xhrMock = __webpack_require__(/*! ./xhrMock */ "../../../node_modules/mithril/test-utils/xhrMock.js")

module.exports = function(env) {
	env = env || {}
	var $window = env.window = {}

	var dom = domMock()
	var xhr = xhrMock()
	for (var key in dom) if (!$window[key]) $window[key] = dom[key]
	for (var key in xhr) if (!$window[key]) $window[key] = xhr[key]
	pushStateMock(env)

	return $window
}

/***/ }),

/***/ "../../../node_modules/mithril/test-utils/callAsync.js":
/*!***************************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/mithril/test-utils/callAsync.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {

module.exports = typeof setImmediate === "function" ? setImmediate : setTimeout

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../timers-browserify/main.js */ "../../../node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "../../../node_modules/mithril/test-utils/domMock.js":
/*!*************************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/mithril/test-utils/domMock.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
Known limitations:

- `option.selected` can't be set/read when the option doesn't have a `select` parent
- `element.attributes` is just a map of attribute names => Attr objects stubs
- ...

*/

/*
options:
- spy:(f: Function) => Function
*/

module.exports = function(options) {
	options = options || {}
	var spy = options.spy || function(f){return f}
	var spymap = []
	function registerSpies(element, spies) {
		if(options.spy) {
			var i = spymap.indexOf(element)
			if (i === -1) {
				spymap.push(element, spies)
			} else {
				var existing = spymap[i + 1]
				for (var k in spies) existing[k] = spies[k]
			}
		}
	}
	function getSpies(element) {
		if (element == null || typeof element !== "object") throw new Error("Element expected")
		if(options.spy) return spymap[spymap.indexOf(element) + 1]
	}

	function isModernEvent(type) {
		return type === "transitionstart" || type === "transitionend" || type === "animationstart" || type === "animationend"
	}
	function appendChild(child) {
		var ancestor = this
		while (ancestor !== child && ancestor !== null) ancestor = ancestor.parentNode
		if (ancestor === child) throw new Error("Node cannot be inserted at the specified point in the hierarchy")

		if (child.nodeType == null) throw new Error("Argument is not a DOM element")

		var index = this.childNodes.indexOf(child)
		if (index > -1) this.childNodes.splice(index, 1)
		if (child.nodeType === 11) {
			while (child.firstChild != null) this.appendChild(child.firstChild)
			child.childNodes = []
		}
		else {
			this.childNodes.push(child)
			if (child.parentNode != null && child.parentNode !== this) child.parentNode.removeChild(child)
			child.parentNode = this
		}
	}
	function removeChild(child) {
		var index = this.childNodes.indexOf(child)
		if (index > -1) {
			this.childNodes.splice(index, 1)
			child.parentNode = null
		}
		else throw new TypeError("Failed to execute 'removeChild'")
	}
	function insertBefore(child, reference) {
		var ancestor = this
		while (ancestor !== child && ancestor !== null) ancestor = ancestor.parentNode
		if (ancestor === child) throw new Error("Node cannot be inserted at the specified point in the hierarchy")

		if (child.nodeType == null) throw new Error("Argument is not a DOM element")

		var refIndex = this.childNodes.indexOf(reference)
		var index = this.childNodes.indexOf(child)
		if (reference !== null && refIndex < 0) throw new TypeError("Invalid argument")
		if (index > -1) this.childNodes.splice(index, 1)
		if (reference === null) this.appendChild(child)
		else {
			if (child.nodeType === 11) {
				this.childNodes.splice.apply(this.childNodes, [refIndex, 0].concat(child.childNodes))
				while (child.firstChild) {
					var subchild = child.firstChild
					child.removeChild(subchild)
					subchild.parentNode = this
				}
				child.childNodes = []
			}
			else {
				this.childNodes.splice(refIndex, 0, child)
				if (child.parentNode != null && child.parentNode !== this) child.parentNode.removeChild(child)
				child.parentNode = this
			}
		}
	}
	function getAttribute(name) {
		if (this.attributes[name] == null) return null
		return this.attributes[name].value
	}
	function setAttribute(name, value) {
		/*eslint-disable no-implicit-coercion*/
		// this is the correct kind of conversion, passing a Symbol throws in browsers too.
		var nodeValue = "" + value
		/*eslint-enable no-implicit-coercion*/

		this.attributes[name] = {
			namespaceURI: null,
			get value() {return nodeValue},
			set value(value) {
				/*eslint-disable no-implicit-coercion*/
				nodeValue = "" + value
				/*eslint-enable no-implicit-coercion*/
			},
			get nodeValue() {return nodeValue},
			set nodeValue(value) {
				this.value = value
			}
		}
	}
	function setAttributeNS(ns, name, value) {
		this.setAttribute(name, value)
		this.attributes[name].namespaceURI = ns
	}
	function removeAttribute(name) {
		delete this.attributes[name]
	}
	function hasAttribute(name) {
		return name in this.attributes
	}
	var declListTokenizer = /;|"(?:\\.|[^"\n])*"|'(?:\\.|[^'\n])*'/g
	/**
	 * This will split a semicolon-separated CSS declaration list into an array of
	 * individual declarations, ignoring semicolons in strings.
	 *
	 * Comments are also stripped.
	 *
	 * @param {string} declList
	 * @return {string[]}
	 */
	function splitDeclList(declList) {
		var indices = [], res = [], match

		// remove comments, preserving comments in strings.
		declList = declList.replace(
			/("(?:\\.|[^"\n])*"|'(?:\\.|[^'\n])*')|\/\*[\s\S]*?\*\//g,
			function(m, str){
				return str || ""
			}
		)
		/*eslint-disable no-cond-assign*/
		while (match = declListTokenizer.exec(declList)) {
			if (match[0] === ";") indices.push(match.index)
		}
		/*eslint-enable no-cond-assign*/
		for (var i = indices.length; i--;){
			res.unshift(declList.slice(indices[i] + 1))
			declList = declList.slice(0, indices[i])
		}
		res.unshift(declList)
		return res
	}

	var activeElement
	var $window = {
		document: {
			createElement: function(tag) {
				var cssText = ""
				var style = {}
				Object.defineProperty(style, "cssText", {
					get: function() {return cssText},
					set: function (value) {
						var buf = []
						if (typeof value === "string") {
							for (var key in style) style[key] = ""
							var rules = splitDeclList(value)
							for (var i = 0; i < rules.length; i++) {
								var rule = rules[i]
								var colonIndex = rule.indexOf(":")
								if (colonIndex > -1) {
									var rawKey = rule.slice(0, colonIndex).trim()
									var key = rawKey.replace(/-\D/g, function(match) {return match[1].toUpperCase()})
									var value = rule.slice(colonIndex + 1).trim()
									if (key !== "cssText") {
										style[key] = value
										buf.push(rawKey + ": " + value + ";")
									}
								}
							}
							cssText = buf.join(" ")
						}
					}
				})
				var events = {}
				var element = {
					nodeType: 1,
					nodeName: tag.toUpperCase(),
					namespaceURI: "http://www.w3.org/1999/xhtml",
					appendChild: appendChild,
					removeChild: removeChild,
					insertBefore: insertBefore,
					hasAttribute: hasAttribute,
					getAttribute: getAttribute,
					setAttribute: setAttribute,
					setAttributeNS: setAttributeNS,
					removeAttribute: removeAttribute,
					parentNode: null,
					childNodes: [],
					attributes: {},
					get firstChild() {
						return this.childNodes[0] || null
					},
					get nextSibling() {
						if (this.parentNode == null) return null
						var index = this.parentNode.childNodes.indexOf(this)
						if (index < 0) throw new TypeError("Parent's childNodes is out of sync")
						return this.parentNode.childNodes[index + 1] || null
					},
					set textContent(value) {
						this.childNodes = []
						if (value !== "") this.appendChild($window.document.createTextNode(value))
					},
					set innerHTML(value) {
						while (this.firstChild) this.removeChild(this.firstChild)

						var stack = [this], depth = 0, voidElements = ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"]
						value.replace(/<([a-z0-9\-]+?)((?:\s+?[^=]+?=(?:"[^"]*?"|'[^']*?'|[^\s>]*))*?)(\s*\/)?>|<\/([a-z0-9\-]+?)>|([^<]+)/g, function(match, startTag, attrs, selfClosed, endTag, text) {
							if (startTag) {
								var element = $window.document.createElement(startTag)
								attrs.replace(/\s+?([^=]+?)=(?:"([^"]*?)"|'([^']*?)'|([^\s>]*))/g, function(match, key, doubleQuoted, singleQuoted, unquoted) {
									var keyParts = key.split(":")
									var name = keyParts.pop()
									var ns = keyParts[0]
									var value = doubleQuoted || singleQuoted || unquoted || ""
									if (ns != null) element.setAttributeNS(ns, name, value)
									else element.setAttribute(name, value)
								})
								stack[depth].appendChild(element)
								if (!selfClosed && voidElements.indexOf(startTag.toLowerCase()) < 0) stack[++depth] = element
							}
							else if (endTag) {
								depth--
							}
							else if (text) {
								stack[depth].appendChild($window.document.createTextNode(text)) // FIXME handle html entities
							}
						})
					},
					get style() {
						return style
					},
					set style(_){
						// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style#Setting_style
						throw new Error("setting element.style is not portable")
					},
					get className() {
						return this.attributes["class"] ? this.attributes["class"].value : ""
					},
					set className(value) {
						if (this.namespaceURI === "http://www.w3.org/2000/svg") throw new Error("Cannot set property className of SVGElement")
						else this.setAttribute("class", value)
					},
					focus: function() {activeElement = this},
					addEventListener: function(type, callback) {
						if (events[type] == null) events[type] = [callback]
						else events[type].push(callback)
					},
					removeEventListener: function(type, callback) {
						if (events[type] != null) {
							var index = events[type].indexOf(callback)
							if (index > -1) events[type].splice(index, 1)
						}
					},
					dispatchEvent: function(e) {
						if (this.nodeName === "INPUT" && this.attributes["type"] != null && this.attributes["type"].value === "checkbox" && e.type === "click") {
							this.checked = !this.checked
						}

						e.target = this
						if (events[e.type] != null) {
							for (var i = 0; i < events[e.type].length; i++) {
								events[e.type][i].call(this, e)
							}
						}
						e.preventDefault = function() {
							// TODO: should this do something?
						}
						if (typeof this["on" + e.type] === "function" && !isModernEvent(e.type)) this["on" + e.type](e)
					},
					onclick: null,
				}

				if (element.nodeName === "A") {
					Object.defineProperty(element, "href", {
						get: function() {return this.attributes["href"] === undefined ? "" : "[FIXME implement]"},
						set: function(value) {this.setAttribute("href", value)},
						enumerable: true,
					})
				}

				if (element.nodeName === "INPUT") {
					var checked
					Object.defineProperty(element, "checked", {
						get: function() {return checked === undefined ? this.attributes["checked"] !== undefined : checked},
						set: function(value) {checked = Boolean(value)},
						enumerable: true,
					})

					var value = ""
					var valueSetter = spy(function(v) {
						/*eslint-disable no-implicit-coercion*/
						value = v === null ? "" : "" + v
						/*eslint-enable no-implicit-coercion*/
					})
					Object.defineProperty(element, "value", {
						get: function() {
							return value
						},
						set: valueSetter,
						enumerable: true,
					})

					// we currently emulate the non-ie behavior, but emulating ie may be more useful (throw when an invalid type is set)
					var typeSetter = spy(function(v) {
						this.setAttribute("type", v)
					})
					Object.defineProperty(element, "type", {
						get: function() {
							if (!this.hasAttribute("type")) return "text"
							var type = this.getAttribute("type")
							return (/^(?:radio|button|checkbox|color|date|datetime|datetime-local|email|file|hidden|month|number|password|range|research|search|submit|tel|text|url|week|image)$/)
							.test(type)
							? type
							: "text"
						},
						set: typeSetter,
						enumerable: true,
					})
					registerSpies(element, {
						valueSetter: valueSetter,
						typeSetter: typeSetter
					})
				}


				if (element.nodeName === "TEXTAREA") {
					var wasNeverSet = true
					var value = ""
					var valueSetter = spy(function(v) {
						wasNeverSet = false
						/*eslint-disable no-implicit-coercion*/
						value = v === null ? "" : "" + v
						/*eslint-enable no-implicit-coercion*/
					})
					Object.defineProperty(element, "value", {
						get: function() {
							return wasNeverSet && this.firstChild ? this.firstChild.nodeValue : value
						},
						set: valueSetter,
						enumerable: true,
					})
					registerSpies(element, {
						valueSetter: valueSetter
					})
				}

				/* eslint-disable radix */

				if (element.nodeName === "CANVAS") {
					Object.defineProperty(element, "width", {
						get: function() {return this.attributes["width"] ? Math.floor(parseInt(this.attributes["width"].value) || 0) : 300},
						set: function(value) {this.setAttribute("width", Math.floor(Number(value) || 0).toString())},
					})
					Object.defineProperty(element, "height", {
						get: function() {return this.attributes["height"] ? Math.floor(parseInt(this.attributes["height"].value) || 0) : 300},
						set: function(value) {this.setAttribute("height", Math.floor(Number(value) || 0).toString())},
					})
				}

				/* eslint-enable radix */

				function getOptions(element) {
					var options = []
					for (var i = 0; i < element.childNodes.length; i++) {
						if (element.childNodes[i].nodeName === "OPTION") options.push(element.childNodes[i])
						else if (element.childNodes[i].nodeName === "OPTGROUP") options = options.concat(getOptions(element.childNodes[i]))
					}
					return options
				}
				function getOptionValue(element) {
					return element.attributes["value"] != null ?
						element.attributes["value"].value :
						element.firstChild != null ? element.firstChild.nodeValue : ""
				}
				if (element.nodeName === "SELECT") {
					// var selectedValue
					var selectedIndex = 0
					Object.defineProperty(element, "selectedIndex", {
						get: function() {return getOptions(this).length > 0 ? selectedIndex : -1},
						set: function(value) {
							var options = getOptions(this)
							if (value >= 0 && value < options.length) {
								// selectedValue = getOptionValue(options[selectedIndex])
								selectedIndex = value
							}
							else {
								// selectedValue = ""
								selectedIndex = -1
							}
						},
						enumerable: true,
					})
					var valueSetter = spy(function(value) {
						if (value === null) {
							selectedIndex = -1
						} else {
							var options = getOptions(this)
							/*eslint-disable no-implicit-coercion*/
							var stringValue = "" + value
							/*eslint-enable no-implicit-coercion*/
							for (var i = 0; i < options.length; i++) {
								if (getOptionValue(options[i]) === stringValue) {
									// selectedValue = stringValue
									selectedIndex = i
									return
								}
							}
							// selectedValue = stringValue
							selectedIndex = -1
						}
					})
					Object.defineProperty(element, "value", {
						get: function() {
							if (this.selectedIndex > -1) return getOptionValue(getOptions(this)[this.selectedIndex])
							return ""
						},
						set: valueSetter,
						enumerable: true,
					})
					registerSpies(element, {
						valueSetter: valueSetter
					})
				}
				if (element.nodeName === "OPTION") {
					var valueSetter = spy(function(value) {
						/*eslint-disable no-implicit-coercion*/
						this.setAttribute("value", value === null ? "" : "" + value)
						/*eslint-enable no-implicit-coercion*/
					})
					Object.defineProperty(element, "value", {
						get: function() {return getOptionValue(this)},
						set: valueSetter,
						enumerable: true,
					})
					registerSpies(element, {
						valueSetter: valueSetter
					})

					Object.defineProperty(element, "selected", {
						// TODO? handle `selected` without a parent (works in browsers)
						get: function() {
							var options = getOptions(this.parentNode)
							var index = options.indexOf(this)
							return index === this.parentNode.selectedIndex
						},
						set: function(value) {
							if (value) {
								var options = getOptions(this.parentNode)
								var index = options.indexOf(this)
								if (index > -1) this.parentNode.selectedIndex = index
							}
							else this.parentNode.selectedIndex = 0
						},
						enumerable: true,
					})
				}
				return element
			},
			createElementNS: function(ns, tag, is) {
				var element = this.createElement(tag, is)
				element.nodeName = tag
				element.namespaceURI = ns
				return element
			},
			createTextNode: function(text) {
				/*eslint-disable no-implicit-coercion*/
				var nodeValue = "" + text
				/*eslint-enable no-implicit-coercion*/
				return {
					nodeType: 3,
					nodeName: "#text",
					parentNode: null,
					get nodeValue() {return nodeValue},
					set nodeValue(value) {
						/*eslint-disable no-implicit-coercion*/
						nodeValue = "" + value
						/*eslint-enable no-implicit-coercion*/
					},
				}
			},
			createDocumentFragment: function() {
				return {
					nodeType: 11,
					nodeName: "#document-fragment",
					appendChild: appendChild,
					insertBefore: insertBefore,
					removeChild: removeChild,
					parentNode: null,
					childNodes: [],
					get firstChild() {
						return this.childNodes[0] || null
					},
				}
			},
			createEvent: function() {
				return {
					initEvent: function(type) {this.type = type},
				}
			},
			get activeElement() {return activeElement},
		},
	}
	$window.document.documentElement = $window.document.createElement("html")
	$window.document.documentElement.appendChild($window.document.createElement("head"))
	$window.document.body = $window.document.createElement("body")
	$window.document.documentElement.appendChild($window.document.body)
	activeElement = $window.document.body

	if (options.spy) $window.__getSpies = getSpies

	return $window
}


/***/ }),

/***/ "../../../node_modules/mithril/test-utils/parseURL.js":
/*!**************************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/mithril/test-utils/parseURL.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function parseURL(url, root) {
	var data = {}
	var protocolIndex = url.indexOf("://")
	var pathnameIndex = protocolIndex > -1 ? url.indexOf("/", protocolIndex + 3) : url.indexOf("/")
	var searchIndex = url.indexOf("?")
	var hashIndex = url.indexOf("#")
	if ((pathnameIndex > searchIndex && searchIndex > -1) || (pathnameIndex > hashIndex && hashIndex > -1)) pathnameIndex = -1
	if (searchIndex > hashIndex && hashIndex > -1) searchIndex = -1
	var pathnameEnd = searchIndex > -1 ? searchIndex : hashIndex > -1 ? hashIndex : url.length
	if (protocolIndex > -1) {
		//it's a full URL
		if (pathnameIndex < 0) pathnameIndex = url.length
		var portIndex = url.indexOf(":", protocolIndex + 1)
		if (portIndex < 0) portIndex = pathnameIndex
		data.protocol = url.slice(0, protocolIndex + 1)
		data.hostname = url.slice(protocolIndex + 3, portIndex)
		data.port = url.slice(portIndex + 1, pathnameIndex)
		data.pathname = url.slice(pathnameIndex, pathnameEnd) || "/"
	}
	else {
		data.protocol = root.protocol
		data.hostname = root.hostname
		data.port = root.port
		if (pathnameIndex === 0) {
			//it's an absolute path
			data.pathname = url.slice(pathnameIndex, pathnameEnd) || "/"
		}
		else if (searchIndex !== 0 && hashIndex !== 0) {
			//it's a relative path
			var slashIndex = root.pathname.lastIndexOf("/")
			var path = slashIndex > -1 ? root.pathname.slice(0, slashIndex + 1) : "./"
			var normalized = url.slice(0, pathnameEnd).replace(/^\.$/, root.pathname.slice(slashIndex + 1)).replace(/^\.\//, "")
			var dotdot = /\/[^\/]+?\/\.{2}/g
			var pathname = path + normalized
			pathname = path + normalized
			while (dotdot.test(pathname)) pathname = pathname.replace(dotdot, "")
			pathname = pathname.replace(/\/\.\//g, "/").replace(/^(\/\.{2})+/, "") || "/"
			data.pathname = pathname
		}
	}
	var searchEnd = hashIndex > -1 ? hashIndex : url.length
	data.search = searchIndex > -1 ? url.slice(searchIndex, searchEnd) : ""
	data.hash = hashIndex > -1 ? url.slice(hashIndex) : ""
	return data
}


/***/ }),

/***/ "../../../node_modules/mithril/test-utils/pushStateMock.js":
/*!*******************************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/mithril/test-utils/pushStateMock.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parseURL = __webpack_require__(/*! ../test-utils/parseURL */ "../../../node_modules/mithril/test-utils/parseURL.js")
var callAsync = __webpack_require__(/*! ../test-utils/callAsync */ "../../../node_modules/mithril/test-utils/callAsync.js")

function debouncedAsync(f) {
	var ref
	return function() {
		if (ref != null) return
		ref = callAsync(function(){
			ref = null
			f()
		})
	}
}

module.exports = function(options) {
	if (options == null) options = {}

	var $window = options.window || {}
	var protocol = options.protocol || "http:"
	var hostname = options.hostname || "localhost"
	var port = ""
	var pathname = "/"
	var search = ""
	var hash = ""

	var past = [{url: getURL(), isNew: true, state: null, title: null}], future = []

	function getURL() {
		if (protocol === "file:") return protocol + "//" + pathname + search + hash
		return protocol + "//" + hostname + prefix(":", port) + pathname + search + hash
	}
	function setURL(value) {
		var data = parseURL(value, {protocol: protocol, hostname: hostname, port: port, pathname: pathname})
		var isNew = false
		if (data.protocol != null && data.protocol !== protocol) protocol = data.protocol, isNew = true
		if (data.hostname != null && data.hostname !== hostname) hostname = data.hostname, isNew = true
		if (data.port != null && data.port !== port) port = data.port, isNew = true
		if (data.pathname != null && data.pathname !== pathname) pathname = data.pathname, isNew = true
		if (data.search != null && data.search !== search) search = data.search, isNew = true
		if (data.hash != null && data.hash !== hash) {
			hash = data.hash
			if (!isNew) {
				hashchange()
			}
		}
		return isNew
	}

	function prefix(prefix, value) {
		if (value === "") return ""
		return (value.charAt(0) !== prefix ? prefix : "") + value
	}
	function _hashchange() {
		if (typeof $window.onhashchange === "function") $window.onhashchange({type: "hashchange"})
	}
	var hashchange = debouncedAsync(_hashchange)
	function popstate() {
		if (typeof $window.onpopstate === "function") $window.onpopstate({type: "popstate", state: $window.history.state})
	}
	function unload() {
		if (typeof $window.onunload === "function") $window.onunload({type: "unload"})
	}

	$window.location = {
		get protocol() {
			return protocol
		},
		get hostname() {
			return hostname
		},
		get port() {
			return port
		},
		get pathname() {
			return pathname
		},
		get search() {
			return search
		},
		get hash() {
			return hash
		},
		get origin() {
			if (protocol === "file:") return "null"
			return protocol + "//" + hostname + prefix(":", port)
		},
		get host() {
			if (protocol === "file:") return ""
			return hostname + prefix(":", port)
		},
		get href() {
			return getURL()
		},

		set protocol(value) {
			throw new Error("Protocol is read-only")
		},
		set hostname(value) {
			unload()
			past.push({url: getURL(), isNew: true})
			future = []
			hostname = value
		},
		set port(value) {
			if (protocol === "file:") throw new Error("Port is read-only under `file://` protocol")
			unload()
			past.push({url: getURL(), isNew: true})
			future = []
			port = value
		},
		set pathname(value) {
			if (protocol === "file:") throw new Error("Pathname is read-only under `file://` protocol")
			unload()
			past.push({url: getURL(), isNew: true})
			future = []
			pathname = prefix("/", value)
		},
		set search(value) {
			unload()
			past.push({url: getURL(), isNew: true})
			future = []
			search = prefix("?", value)
		},
		set hash(value) {
			var oldHash = hash
			past.push({url: getURL(), isNew: false})
			future = []
			hash = prefix("#", value)
			if (oldHash != hash) hashchange()
		},

		set origin(value) {
			//origin is writable but ignored
		},
		set host(value) {
			//host is writable but ignored in Chrome
		},
		set href(value) {
			var url = getURL()
			var isNew = setURL(value)
			if (isNew) {
				setURL(url)
				unload()
				setURL(value)
			}
			past.push({url: url, isNew: isNew})
			future = []
		},
	}
	$window.history = {
		pushState: function(state, title, url) {
			past.push({url: getURL(), isNew: false, state: state, title: title})
			future = []
			setURL(url)
		},
		replaceState: function(state, title, url) {
			var entry = past[past.length - 1]
			entry.state = state
			entry.title = title
			setURL(url)
		},
		back: function() {
			if (past.length > 1) {
				var entry = past.pop()
				if (entry.isNew) unload()
				future.push({url: getURL(), isNew: false, state: entry.state, title: entry.title})
				setURL(entry.url)
				if (!entry.isNew) popstate()
			}
		},
		forward: function() {
			var entry = future.pop()
			if (entry != null) {
				if (entry.isNew) unload()
				past.push({url: getURL(), isNew: false, state: entry.state, title: entry.title})
				setURL(entry.url)
				if (!entry.isNew) popstate()
			}
		},
		get state() {
			return past.length === 0 ? null : past[past.length - 1].state
		},
	}
	$window.onpopstate = null,
	$window.onhashchange = null,
	$window.onunload = null

	return $window
}


/***/ }),

/***/ "../../../node_modules/mithril/test-utils/xhrMock.js":
/*!*************************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/mithril/test-utils/xhrMock.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var callAsync = __webpack_require__(/*! ../test-utils/callAsync */ "../../../node_modules/mithril/test-utils/callAsync.js")
var parseURL = __webpack_require__(/*! ../test-utils/parseURL */ "../../../node_modules/mithril/test-utils/parseURL.js")
var parseQueryString = __webpack_require__(/*! ../querystring/parse */ "../../../node_modules/mithril/querystring/parse.js")

module.exports = function() {
	var routes = {}
	// var callback = "callback"
	var serverErrorHandler = function(url) {
		return {status: 500, responseText: "server error, most likely the URL was not defined " + url}
	}

	var $window = {
		XMLHttpRequest: function XMLHttpRequest() {
			var args = {}
			var headers = {}
			var aborted = false
			this.setRequestHeader = function(header, value) {
				/*
				 the behavior of setHeader is not your expected setX API.
				 If the header is already set, it'll merge with whatever you add
				 rather than overwrite
				 Source: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader
				 */
				if (headers[header]) {
					headers[header] += ", " + value;
				} else {
					headers[header] = value
				}
			}
			this.getRequestHeader = function(header) {
				return headers[header]
			}
			this.open = function(method, url, async, user, password) {
				var urlData = parseURL(url, {protocol: "http:", hostname: "localhost", port: "", pathname: "/"})
				args.method = method
				args.pathname = urlData.pathname
				args.search = urlData.search
				args.async = async != null ? async : true
				args.user = user
				args.password = password
			}
			this.send = function(body) {
				var self = this
				if(!aborted) {
					var handler = routes[args.method + " " + args.pathname] || serverErrorHandler.bind(null, args.pathname)
					var data = handler({url: args.pathname, query: args.search || {}, body: body || null})
					self.status = data.status
					self.responseText = data.responseText
				} else {
					self.status = 0
				}
				self.readyState = 4
				if (args.async === true) {
					callAsync(function() {
						if (typeof self.onreadystatechange === "function") self.onreadystatechange()
					})
				}
			}
			this.abort = function() {
				aborted = true
			}
		},
		document: {
			createElement: function(tag) {
				return {nodeName: tag.toUpperCase(), parentNode: null}
			},
			documentElement: {
				appendChild: function(element) {
					element.parentNode = this
					if (element.nodeName === "SCRIPT") {
						var urlData = parseURL(element.src, {protocol: "http:", hostname: "localhost", port: "", pathname: "/"})
						var handler = routes["GET " + urlData.pathname] || serverErrorHandler.bind(null, element.src)
						var data = handler({url: urlData.pathname, query: urlData.search, body: null})
						parseQueryString(urlData.search)
						callAsync(function() {
							if (data.status === 200) {
								new Function("$window", "with ($window) return " + data.responseText).call($window, $window)
							}
							else if (typeof element.onerror === "function") {
								element.onerror({type: "error"})
							}
						})
					}
				},
				removeChild: function(element) {
					element.parentNode = null
				},
			},
		},
		$defineRoutes: function(rules) {
			routes = rules
		},
		$defineJSONPCallbackKey: function(/* key */) {
			// callback = key
		},
	}
	return $window
}


/***/ }),

/***/ "../../../node_modules/process/browser.js":
/*!**************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/process/browser.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "../../../node_modules/setimmediate/setImmediate.js":
/*!************************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/setimmediate/setImmediate.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../../../node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "../../../node_modules/process/browser.js")))

/***/ }),

/***/ "../../../node_modules/showdown/dist/showdown.js":
/*!*********************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/showdown/dist/showdown.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;;/*! showdown v 1.8.6 - 22-12-2017 */
(function(){
/**
 * Created by Tivie on 13-07-2015.
 */

function getDefaultOpts (simple) {
  'use strict';

  var defaultOptions = {
    omitExtraWLInCodeBlocks: {
      defaultValue: false,
      describe: 'Omit the default extra whiteline added to code blocks',
      type: 'boolean'
    },
    noHeaderId: {
      defaultValue: false,
      describe: 'Turn on/off generated header id',
      type: 'boolean'
    },
    prefixHeaderId: {
      defaultValue: false,
      describe: 'Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic \'section-\' prefix',
      type: 'string'
    },
    rawPrefixHeaderId: {
      defaultValue: false,
      describe: 'Setting this option to true will prevent showdown from modifying the prefix. This might result in malformed IDs (if, for instance, the " char is used in the prefix)',
      type: 'boolean'
    },
    ghCompatibleHeaderId: {
      defaultValue: false,
      describe: 'Generate header ids compatible with github style (spaces are replaced with dashes, a bunch of non alphanumeric chars are removed)',
      type: 'boolean'
    },
    rawHeaderId: {
      defaultValue: false,
      describe: 'Remove only spaces, \' and " from generated header ids (including prefixes), replacing them with dashes (-). WARNING: This might result in malformed ids',
      type: 'boolean'
    },
    headerLevelStart: {
      defaultValue: false,
      describe: 'The header blocks level start',
      type: 'integer'
    },
    parseImgDimensions: {
      defaultValue: false,
      describe: 'Turn on/off image dimension parsing',
      type: 'boolean'
    },
    simplifiedAutoLink: {
      defaultValue: false,
      describe: 'Turn on/off GFM autolink style',
      type: 'boolean'
    },
    excludeTrailingPunctuationFromURLs: {
      defaultValue: false,
      describe: 'Excludes trailing punctuation from links generated with autoLinking',
      type: 'boolean'
    },
    literalMidWordUnderscores: {
      defaultValue: false,
      describe: 'Parse midword underscores as literal underscores',
      type: 'boolean'
    },
    literalMidWordAsterisks: {
      defaultValue: false,
      describe: 'Parse midword asterisks as literal asterisks',
      type: 'boolean'
    },
    strikethrough: {
      defaultValue: false,
      describe: 'Turn on/off strikethrough support',
      type: 'boolean'
    },
    tables: {
      defaultValue: false,
      describe: 'Turn on/off tables support',
      type: 'boolean'
    },
    tablesHeaderId: {
      defaultValue: false,
      describe: 'Add an id to table headers',
      type: 'boolean'
    },
    ghCodeBlocks: {
      defaultValue: true,
      describe: 'Turn on/off GFM fenced code blocks support',
      type: 'boolean'
    },
    tasklists: {
      defaultValue: false,
      describe: 'Turn on/off GFM tasklist support',
      type: 'boolean'
    },
    smoothLivePreview: {
      defaultValue: false,
      describe: 'Prevents weird effects in live previews due to incomplete input',
      type: 'boolean'
    },
    smartIndentationFix: {
      defaultValue: false,
      description: 'Tries to smartly fix indentation in es6 strings',
      type: 'boolean'
    },
    disableForced4SpacesIndentedSublists: {
      defaultValue: false,
      description: 'Disables the requirement of indenting nested sublists by 4 spaces',
      type: 'boolean'
    },
    simpleLineBreaks: {
      defaultValue: false,
      description: 'Parses simple line breaks as <br> (GFM Style)',
      type: 'boolean'
    },
    requireSpaceBeforeHeadingText: {
      defaultValue: false,
      description: 'Makes adding a space between `#` and the header text mandatory (GFM Style)',
      type: 'boolean'
    },
    ghMentions: {
      defaultValue: false,
      description: 'Enables github @mentions',
      type: 'boolean'
    },
    ghMentionsLink: {
      defaultValue: 'https://github.com/{u}',
      description: 'Changes the link generated by @mentions. Only applies if ghMentions option is enabled.',
      type: 'string'
    },
    encodeEmails: {
      defaultValue: true,
      description: 'Encode e-mail addresses through the use of Character Entities, transforming ASCII e-mail addresses into its equivalent decimal entities',
      type: 'boolean'
    },
    openLinksInNewWindow: {
      defaultValue: false,
      description: 'Open all links in new windows',
      type: 'boolean'
    },
    backslashEscapesHTMLTags: {
      defaultValue: false,
      description: 'Support for HTML Tag escaping. ex: \<div>foo\</div>',
      type: 'boolean'
    },
    emoji: {
      defaultValue: false,
      description: 'Enable emoji support. Ex: `this is a :smile: emoji`',
      type: 'boolean'
    },
    underline: {
      defaultValue: false,
      description: 'Enable support for underline. Syntax is double or triple underscores: `__underline word__`. With this option enabled, underscores no longer parses into `<em>` and `<strong>`',
      type: 'boolean'
    },
    completeHTMLDocument: {
      defaultValue: false,
      description: 'Outputs a complete html document, including `<html>`, `<head>` and `<body>` tags',
      type: 'boolean'
    },
    metadata: {
      defaultValue: false,
      description: 'Enable support for document metadata (defined at the top of the document between `«««` and `»»»` or between `---` and `---`).',
      type: 'boolean'
    },
    splitAdjacentBlockquotes: {
      defaultValue: false,
      description: 'Split adjacent blockquote blocks',
      type: 'boolean'
    }
  };
  if (simple === false) {
    return JSON.parse(JSON.stringify(defaultOptions));
  }
  var ret = {};
  for (var opt in defaultOptions) {
    if (defaultOptions.hasOwnProperty(opt)) {
      ret[opt] = defaultOptions[opt].defaultValue;
    }
  }
  return ret;
}

function allOptionsOn () {
  'use strict';
  var options = getDefaultOpts(true),
      ret = {};
  for (var opt in options) {
    if (options.hasOwnProperty(opt)) {
      ret[opt] = true;
    }
  }
  return ret;
}

/**
 * Created by Tivie on 06-01-2015.
 */

// Private properties
var showdown = {},
    parsers = {},
    extensions = {},
    globalOptions = getDefaultOpts(true),
    setFlavor = 'vanilla',
    flavor = {
      github: {
        omitExtraWLInCodeBlocks:              true,
        simplifiedAutoLink:                   true,
        excludeTrailingPunctuationFromURLs:   true,
        literalMidWordUnderscores:            true,
        strikethrough:                        true,
        tables:                               true,
        tablesHeaderId:                       true,
        ghCodeBlocks:                         true,
        tasklists:                            true,
        disableForced4SpacesIndentedSublists: true,
        simpleLineBreaks:                     true,
        requireSpaceBeforeHeadingText:        true,
        ghCompatibleHeaderId:                 true,
        ghMentions:                           true,
        backslashEscapesHTMLTags:             true,
        emoji:                                true,
        splitAdjacentBlockquotes:             true
      },
      original: {
        noHeaderId:                           true,
        ghCodeBlocks:                         false
      },
      ghost: {
        omitExtraWLInCodeBlocks:              true,
        parseImgDimensions:                   true,
        simplifiedAutoLink:                   true,
        excludeTrailingPunctuationFromURLs:   true,
        literalMidWordUnderscores:            true,
        strikethrough:                        true,
        tables:                               true,
        tablesHeaderId:                       true,
        ghCodeBlocks:                         true,
        tasklists:                            true,
        smoothLivePreview:                    true,
        simpleLineBreaks:                     true,
        requireSpaceBeforeHeadingText:        true,
        ghMentions:                           false,
        encodeEmails:                         true
      },
      vanilla: getDefaultOpts(true),
      allOn: allOptionsOn()
    };

/**
 * helper namespace
 * @type {{}}
 */
showdown.helper = {};

/**
 * TODO LEGACY SUPPORT CODE
 * @type {{}}
 */
showdown.extensions = {};

/**
 * Set a global option
 * @static
 * @param {string} key
 * @param {*} value
 * @returns {showdown}
 */
showdown.setOption = function (key, value) {
  'use strict';
  globalOptions[key] = value;
  return this;
};

/**
 * Get a global option
 * @static
 * @param {string} key
 * @returns {*}
 */
showdown.getOption = function (key) {
  'use strict';
  return globalOptions[key];
};

/**
 * Get the global options
 * @static
 * @returns {{}}
 */
showdown.getOptions = function () {
  'use strict';
  return globalOptions;
};

/**
 * Reset global options to the default values
 * @static
 */
showdown.resetOptions = function () {
  'use strict';
  globalOptions = getDefaultOpts(true);
};

/**
 * Set the flavor showdown should use as default
 * @param {string} name
 */
showdown.setFlavor = function (name) {
  'use strict';
  if (!flavor.hasOwnProperty(name)) {
    throw Error(name + ' flavor was not found');
  }
  showdown.resetOptions();
  var preset = flavor[name];
  setFlavor = name;
  for (var option in preset) {
    if (preset.hasOwnProperty(option)) {
      globalOptions[option] = preset[option];
    }
  }
};

/**
 * Get the currently set flavor
 * @returns {string}
 */
showdown.getFlavor = function () {
  'use strict';
  return setFlavor;
};

/**
 * Get the options of a specified flavor. Returns undefined if the flavor was not found
 * @param {string} name Name of the flavor
 * @returns {{}|undefined}
 */
showdown.getFlavorOptions = function (name) {
  'use strict';
  if (flavor.hasOwnProperty(name)) {
    return flavor[name];
  }
};

/**
 * Get the default options
 * @static
 * @param {boolean} [simple=true]
 * @returns {{}}
 */
showdown.getDefaultOptions = function (simple) {
  'use strict';
  return getDefaultOpts(simple);
};

/**
 * Get or set a subParser
 *
 * subParser(name)       - Get a registered subParser
 * subParser(name, func) - Register a subParser
 * @static
 * @param {string} name
 * @param {function} [func]
 * @returns {*}
 */
showdown.subParser = function (name, func) {
  'use strict';
  if (showdown.helper.isString(name)) {
    if (typeof func !== 'undefined') {
      parsers[name] = func;
    } else {
      if (parsers.hasOwnProperty(name)) {
        return parsers[name];
      } else {
        throw Error('SubParser named ' + name + ' not registered!');
      }
    }
  }
};

/**
 * Gets or registers an extension
 * @static
 * @param {string} name
 * @param {object|function=} ext
 * @returns {*}
 */
showdown.extension = function (name, ext) {
  'use strict';

  if (!showdown.helper.isString(name)) {
    throw Error('Extension \'name\' must be a string');
  }

  name = showdown.helper.stdExtName(name);

  // Getter
  if (showdown.helper.isUndefined(ext)) {
    if (!extensions.hasOwnProperty(name)) {
      throw Error('Extension named ' + name + ' is not registered!');
    }
    return extensions[name];

    // Setter
  } else {
    // Expand extension if it's wrapped in a function
    if (typeof ext === 'function') {
      ext = ext();
    }

    // Ensure extension is an array
    if (!showdown.helper.isArray(ext)) {
      ext = [ext];
    }

    var validExtension = validate(ext, name);

    if (validExtension.valid) {
      extensions[name] = ext;
    } else {
      throw Error(validExtension.error);
    }
  }
};

/**
 * Gets all extensions registered
 * @returns {{}}
 */
showdown.getAllExtensions = function () {
  'use strict';
  return extensions;
};

/**
 * Remove an extension
 * @param {string} name
 */
showdown.removeExtension = function (name) {
  'use strict';
  delete extensions[name];
};

/**
 * Removes all extensions
 */
showdown.resetExtensions = function () {
  'use strict';
  extensions = {};
};

/**
 * Validate extension
 * @param {array} extension
 * @param {string} name
 * @returns {{valid: boolean, error: string}}
 */
function validate (extension, name) {
  'use strict';

  var errMsg = (name) ? 'Error in ' + name + ' extension->' : 'Error in unnamed extension',
      ret = {
        valid: true,
        error: ''
      };

  if (!showdown.helper.isArray(extension)) {
    extension = [extension];
  }

  for (var i = 0; i < extension.length; ++i) {
    var baseMsg = errMsg + ' sub-extension ' + i + ': ',
        ext = extension[i];
    if (typeof ext !== 'object') {
      ret.valid = false;
      ret.error = baseMsg + 'must be an object, but ' + typeof ext + ' given';
      return ret;
    }

    if (!showdown.helper.isString(ext.type)) {
      ret.valid = false;
      ret.error = baseMsg + 'property "type" must be a string, but ' + typeof ext.type + ' given';
      return ret;
    }

    var type = ext.type = ext.type.toLowerCase();

    // normalize extension type
    if (type === 'language') {
      type = ext.type = 'lang';
    }

    if (type === 'html') {
      type = ext.type = 'output';
    }

    if (type !== 'lang' && type !== 'output' && type !== 'listener') {
      ret.valid = false;
      ret.error = baseMsg + 'type ' + type + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"';
      return ret;
    }

    if (type === 'listener') {
      if (showdown.helper.isUndefined(ext.listeners)) {
        ret.valid = false;
        ret.error = baseMsg + '. Extensions of type "listener" must have a property called "listeners"';
        return ret;
      }
    } else {
      if (showdown.helper.isUndefined(ext.filter) && showdown.helper.isUndefined(ext.regex)) {
        ret.valid = false;
        ret.error = baseMsg + type + ' extensions must define either a "regex" property or a "filter" method';
        return ret;
      }
    }

    if (ext.listeners) {
      if (typeof ext.listeners !== 'object') {
        ret.valid = false;
        ret.error = baseMsg + '"listeners" property must be an object but ' + typeof ext.listeners + ' given';
        return ret;
      }
      for (var ln in ext.listeners) {
        if (ext.listeners.hasOwnProperty(ln)) {
          if (typeof ext.listeners[ln] !== 'function') {
            ret.valid = false;
            ret.error = baseMsg + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + ln +
              ' must be a function but ' + typeof ext.listeners[ln] + ' given';
            return ret;
          }
        }
      }
    }

    if (ext.filter) {
      if (typeof ext.filter !== 'function') {
        ret.valid = false;
        ret.error = baseMsg + '"filter" must be a function, but ' + typeof ext.filter + ' given';
        return ret;
      }
    } else if (ext.regex) {
      if (showdown.helper.isString(ext.regex)) {
        ext.regex = new RegExp(ext.regex, 'g');
      }
      if (!(ext.regex instanceof RegExp)) {
        ret.valid = false;
        ret.error = baseMsg + '"regex" property must either be a string or a RegExp object, but ' + typeof ext.regex + ' given';
        return ret;
      }
      if (showdown.helper.isUndefined(ext.replace)) {
        ret.valid = false;
        ret.error = baseMsg + '"regex" extensions must implement a replace string or function';
        return ret;
      }
    }
  }
  return ret;
}

/**
 * Validate extension
 * @param {object} ext
 * @returns {boolean}
 */
showdown.validateExtension = function (ext) {
  'use strict';

  var validateExtension = validate(ext, null);
  if (!validateExtension.valid) {
    console.warn(validateExtension.error);
    return false;
  }
  return true;
};

/**
 * showdownjs helper functions
 */

if (!showdown.hasOwnProperty('helper')) {
  showdown.helper = {};
}

/**
 * Check if var is string
 * @static
 * @param {string} a
 * @returns {boolean}
 */
showdown.helper.isString = function (a) {
  'use strict';
  return (typeof a === 'string' || a instanceof String);
};

/**
 * Check if var is a function
 * @static
 * @param {*} a
 * @returns {boolean}
 */
showdown.helper.isFunction = function (a) {
  'use strict';
  var getType = {};
  return a && getType.toString.call(a) === '[object Function]';
};

/**
 * isArray helper function
 * @static
 * @param {*} a
 * @returns {boolean}
 */
showdown.helper.isArray = function (a) {
  'use strict';
  return Array.isArray(a);
};

/**
 * Check if value is undefined
 * @static
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 */
showdown.helper.isUndefined = function (value) {
  'use strict';
  return typeof value === 'undefined';
};

/**
 * ForEach helper function
 * Iterates over Arrays and Objects (own properties only)
 * @static
 * @param {*} obj
 * @param {function} callback Accepts 3 params: 1. value, 2. key, 3. the original array/object
 */
showdown.helper.forEach = function (obj, callback) {
  'use strict';
  // check if obj is defined
  if (showdown.helper.isUndefined(obj)) {
    throw new Error('obj param is required');
  }

  if (showdown.helper.isUndefined(callback)) {
    throw new Error('callback param is required');
  }

  if (!showdown.helper.isFunction(callback)) {
    throw new Error('callback param must be a function/closure');
  }

  if (typeof obj.forEach === 'function') {
    obj.forEach(callback);
  } else if (showdown.helper.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      callback(obj[i], i, obj);
    }
  } else if (typeof (obj) === 'object') {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        callback(obj[prop], prop, obj);
      }
    }
  } else {
    throw new Error('obj does not seem to be an array or an iterable object');
  }
};

/**
 * Standardidize extension name
 * @static
 * @param {string} s extension name
 * @returns {string}
 */
showdown.helper.stdExtName = function (s) {
  'use strict';
  return s.replace(/[_?*+\/\\.^-]/g, '').replace(/\s/g, '').toLowerCase();
};

function escapeCharactersCallback (wholeMatch, m1) {
  'use strict';
  var charCodeToEscape = m1.charCodeAt(0);
  return '¨E' + charCodeToEscape + 'E';
}

/**
 * Callback used to escape characters when passing through String.replace
 * @static
 * @param {string} wholeMatch
 * @param {string} m1
 * @returns {string}
 */
showdown.helper.escapeCharactersCallback = escapeCharactersCallback;

/**
 * Escape characters in a string
 * @static
 * @param {string} text
 * @param {string} charsToEscape
 * @param {boolean} afterBackslash
 * @returns {XML|string|void|*}
 */
showdown.helper.escapeCharacters = function (text, charsToEscape, afterBackslash) {
  'use strict';
  // First we have to escape the escape characters so that
  // we can build a character class out of them
  var regexString = '([' + charsToEscape.replace(/([\[\]\\])/g, '\\$1') + '])';

  if (afterBackslash) {
    regexString = '\\\\' + regexString;
  }

  var regex = new RegExp(regexString, 'g');
  text = text.replace(regex, escapeCharactersCallback);

  return text;
};

var rgxFindMatchPos = function (str, left, right, flags) {
  'use strict';
  var f = flags || '',
      g = f.indexOf('g') > -1,
      x = new RegExp(left + '|' + right, 'g' + f.replace(/g/g, '')),
      l = new RegExp(left, f.replace(/g/g, '')),
      pos = [],
      t, s, m, start, end;

  do {
    t = 0;
    while ((m = x.exec(str))) {
      if (l.test(m[0])) {
        if (!(t++)) {
          s = x.lastIndex;
          start = s - m[0].length;
        }
      } else if (t) {
        if (!--t) {
          end = m.index + m[0].length;
          var obj = {
            left: {start: start, end: s},
            match: {start: s, end: m.index},
            right: {start: m.index, end: end},
            wholeMatch: {start: start, end: end}
          };
          pos.push(obj);
          if (!g) {
            return pos;
          }
        }
      }
    }
  } while (t && (x.lastIndex = s));

  return pos;
};

/**
 * matchRecursiveRegExp
 *
 * (c) 2007 Steven Levithan <stevenlevithan.com>
 * MIT License
 *
 * Accepts a string to search, a left and right format delimiter
 * as regex patterns, and optional regex flags. Returns an array
 * of matches, allowing nested instances of left/right delimiters.
 * Use the "g" flag to return all matches, otherwise only the
 * first is returned. Be careful to ensure that the left and
 * right format delimiters produce mutually exclusive matches.
 * Backreferences are not supported within the right delimiter
 * due to how it is internally combined with the left delimiter.
 * When matching strings whose format delimiters are unbalanced
 * to the left or right, the output is intentionally as a
 * conventional regex library with recursion support would
 * produce, e.g. "<<x>" and "<x>>" both produce ["x"] when using
 * "<" and ">" as the delimiters (both strings contain a single,
 * balanced instance of "<x>").
 *
 * examples:
 * matchRecursiveRegExp("test", "\\(", "\\)")
 * returns: []
 * matchRecursiveRegExp("<t<<e>><s>>t<>", "<", ">", "g")
 * returns: ["t<<e>><s>", ""]
 * matchRecursiveRegExp("<div id=\"x\">test</div>", "<div\\b[^>]*>", "</div>", "gi")
 * returns: ["test"]
 */
showdown.helper.matchRecursiveRegExp = function (str, left, right, flags) {
  'use strict';

  var matchPos = rgxFindMatchPos (str, left, right, flags),
      results = [];

  for (var i = 0; i < matchPos.length; ++i) {
    results.push([
      str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end),
      str.slice(matchPos[i].match.start, matchPos[i].match.end),
      str.slice(matchPos[i].left.start, matchPos[i].left.end),
      str.slice(matchPos[i].right.start, matchPos[i].right.end)
    ]);
  }
  return results;
};

/**
 *
 * @param {string} str
 * @param {string|function} replacement
 * @param {string} left
 * @param {string} right
 * @param {string} flags
 * @returns {string}
 */
showdown.helper.replaceRecursiveRegExp = function (str, replacement, left, right, flags) {
  'use strict';

  if (!showdown.helper.isFunction(replacement)) {
    var repStr = replacement;
    replacement = function () {
      return repStr;
    };
  }

  var matchPos = rgxFindMatchPos(str, left, right, flags),
      finalStr = str,
      lng = matchPos.length;

  if (lng > 0) {
    var bits = [];
    if (matchPos[0].wholeMatch.start !== 0) {
      bits.push(str.slice(0, matchPos[0].wholeMatch.start));
    }
    for (var i = 0; i < lng; ++i) {
      bits.push(
        replacement(
          str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end),
          str.slice(matchPos[i].match.start, matchPos[i].match.end),
          str.slice(matchPos[i].left.start, matchPos[i].left.end),
          str.slice(matchPos[i].right.start, matchPos[i].right.end)
        )
      );
      if (i < lng - 1) {
        bits.push(str.slice(matchPos[i].wholeMatch.end, matchPos[i + 1].wholeMatch.start));
      }
    }
    if (matchPos[lng - 1].wholeMatch.end < str.length) {
      bits.push(str.slice(matchPos[lng - 1].wholeMatch.end));
    }
    finalStr = bits.join('');
  }
  return finalStr;
};

/**
 * Returns the index within the passed String object of the first occurrence of the specified regex,
 * starting the search at fromIndex. Returns -1 if the value is not found.
 *
 * @param {string} str string to search
 * @param {RegExp} regex Regular expression to search
 * @param {int} [fromIndex = 0] Index to start the search
 * @returns {Number}
 * @throws InvalidArgumentError
 */
showdown.helper.regexIndexOf = function (str, regex, fromIndex) {
  'use strict';
  if (!showdown.helper.isString(str)) {
    throw 'InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string';
  }
  if (regex instanceof RegExp === false) {
    throw 'InvalidArgumentError: second parameter of showdown.helper.regexIndexOf function must be an instance of RegExp';
  }
  var indexOf = str.substring(fromIndex || 0).search(regex);
  return (indexOf >= 0) ? (indexOf + (fromIndex || 0)) : indexOf;
};

/**
 * Splits the passed string object at the defined index, and returns an array composed of the two substrings
 * @param {string} str string to split
 * @param {int} index index to split string at
 * @returns {[string,string]}
 * @throws InvalidArgumentError
 */
showdown.helper.splitAtIndex = function (str, index) {
  'use strict';
  if (!showdown.helper.isString(str)) {
    throw 'InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string';
  }
  return [str.substring(0, index), str.substring(index)];
};

/**
 * Obfuscate an e-mail address through the use of Character Entities,
 * transforming ASCII characters into their equivalent decimal or hex entities.
 *
 * Since it has a random component, subsequent calls to this function produce different results
 *
 * @param {string} mail
 * @returns {string}
 */
showdown.helper.encodeEmailAddress = function (mail) {
  'use strict';
  var encode = [
    function (ch) {
      return '&#' + ch.charCodeAt(0) + ';';
    },
    function (ch) {
      return '&#x' + ch.charCodeAt(0).toString(16) + ';';
    },
    function (ch) {
      return ch;
    }
  ];

  mail = mail.replace(/./g, function (ch) {
    if (ch === '@') {
      // this *must* be encoded. I insist.
      ch = encode[Math.floor(Math.random() * 2)](ch);
    } else {
      var r = Math.random();
      // roughly 10% raw, 45% hex, 45% dec
      ch = (
        r > 0.9 ? encode[2](ch) : r > 0.45 ? encode[1](ch) : encode[0](ch)
      );
    }
    return ch;
  });

  return mail;
};

/**
 * POLYFILLS
 */
// use this instead of builtin is undefined for IE8 compatibility
if (typeof(console) === 'undefined') {
  console = {
    warn: function (msg) {
      'use strict';
      alert(msg);
    },
    log: function (msg) {
      'use strict';
      alert(msg);
    },
    error: function (msg) {
      'use strict';
      throw msg;
    }
  };
}

/**
 * Common regexes.
 * We declare some common regexes to improve performance
 */
showdown.helper.regexes = {
  asteriskDashAndColon: /([*_:~])/g
};

/**
 * EMOJIS LIST
 */
showdown.helper.emojis = {
  '+1':'\ud83d\udc4d',
  '-1':'\ud83d\udc4e',
  '100':'\ud83d\udcaf',
  '1234':'\ud83d\udd22',
  '1st_place_medal':'\ud83e\udd47',
  '2nd_place_medal':'\ud83e\udd48',
  '3rd_place_medal':'\ud83e\udd49',
  '8ball':'\ud83c\udfb1',
  'a':'\ud83c\udd70\ufe0f',
  'ab':'\ud83c\udd8e',
  'abc':'\ud83d\udd24',
  'abcd':'\ud83d\udd21',
  'accept':'\ud83c\ude51',
  'aerial_tramway':'\ud83d\udea1',
  'airplane':'\u2708\ufe0f',
  'alarm_clock':'\u23f0',
  'alembic':'\u2697\ufe0f',
  'alien':'\ud83d\udc7d',
  'ambulance':'\ud83d\ude91',
  'amphora':'\ud83c\udffa',
  'anchor':'\u2693\ufe0f',
  'angel':'\ud83d\udc7c',
  'anger':'\ud83d\udca2',
  'angry':'\ud83d\ude20',
  'anguished':'\ud83d\ude27',
  'ant':'\ud83d\udc1c',
  'apple':'\ud83c\udf4e',
  'aquarius':'\u2652\ufe0f',
  'aries':'\u2648\ufe0f',
  'arrow_backward':'\u25c0\ufe0f',
  'arrow_double_down':'\u23ec',
  'arrow_double_up':'\u23eb',
  'arrow_down':'\u2b07\ufe0f',
  'arrow_down_small':'\ud83d\udd3d',
  'arrow_forward':'\u25b6\ufe0f',
  'arrow_heading_down':'\u2935\ufe0f',
  'arrow_heading_up':'\u2934\ufe0f',
  'arrow_left':'\u2b05\ufe0f',
  'arrow_lower_left':'\u2199\ufe0f',
  'arrow_lower_right':'\u2198\ufe0f',
  'arrow_right':'\u27a1\ufe0f',
  'arrow_right_hook':'\u21aa\ufe0f',
  'arrow_up':'\u2b06\ufe0f',
  'arrow_up_down':'\u2195\ufe0f',
  'arrow_up_small':'\ud83d\udd3c',
  'arrow_upper_left':'\u2196\ufe0f',
  'arrow_upper_right':'\u2197\ufe0f',
  'arrows_clockwise':'\ud83d\udd03',
  'arrows_counterclockwise':'\ud83d\udd04',
  'art':'\ud83c\udfa8',
  'articulated_lorry':'\ud83d\ude9b',
  'artificial_satellite':'\ud83d\udef0',
  'astonished':'\ud83d\ude32',
  'athletic_shoe':'\ud83d\udc5f',
  'atm':'\ud83c\udfe7',
  'atom_symbol':'\u269b\ufe0f',
  'avocado':'\ud83e\udd51',
  'b':'\ud83c\udd71\ufe0f',
  'baby':'\ud83d\udc76',
  'baby_bottle':'\ud83c\udf7c',
  'baby_chick':'\ud83d\udc24',
  'baby_symbol':'\ud83d\udebc',
  'back':'\ud83d\udd19',
  'bacon':'\ud83e\udd53',
  'badminton':'\ud83c\udff8',
  'baggage_claim':'\ud83d\udec4',
  'baguette_bread':'\ud83e\udd56',
  'balance_scale':'\u2696\ufe0f',
  'balloon':'\ud83c\udf88',
  'ballot_box':'\ud83d\uddf3',
  'ballot_box_with_check':'\u2611\ufe0f',
  'bamboo':'\ud83c\udf8d',
  'banana':'\ud83c\udf4c',
  'bangbang':'\u203c\ufe0f',
  'bank':'\ud83c\udfe6',
  'bar_chart':'\ud83d\udcca',
  'barber':'\ud83d\udc88',
  'baseball':'\u26be\ufe0f',
  'basketball':'\ud83c\udfc0',
  'basketball_man':'\u26f9\ufe0f',
  'basketball_woman':'\u26f9\ufe0f&zwj;\u2640\ufe0f',
  'bat':'\ud83e\udd87',
  'bath':'\ud83d\udec0',
  'bathtub':'\ud83d\udec1',
  'battery':'\ud83d\udd0b',
  'beach_umbrella':'\ud83c\udfd6',
  'bear':'\ud83d\udc3b',
  'bed':'\ud83d\udecf',
  'bee':'\ud83d\udc1d',
  'beer':'\ud83c\udf7a',
  'beers':'\ud83c\udf7b',
  'beetle':'\ud83d\udc1e',
  'beginner':'\ud83d\udd30',
  'bell':'\ud83d\udd14',
  'bellhop_bell':'\ud83d\udece',
  'bento':'\ud83c\udf71',
  'biking_man':'\ud83d\udeb4',
  'bike':'\ud83d\udeb2',
  'biking_woman':'\ud83d\udeb4&zwj;\u2640\ufe0f',
  'bikini':'\ud83d\udc59',
  'biohazard':'\u2623\ufe0f',
  'bird':'\ud83d\udc26',
  'birthday':'\ud83c\udf82',
  'black_circle':'\u26ab\ufe0f',
  'black_flag':'\ud83c\udff4',
  'black_heart':'\ud83d\udda4',
  'black_joker':'\ud83c\udccf',
  'black_large_square':'\u2b1b\ufe0f',
  'black_medium_small_square':'\u25fe\ufe0f',
  'black_medium_square':'\u25fc\ufe0f',
  'black_nib':'\u2712\ufe0f',
  'black_small_square':'\u25aa\ufe0f',
  'black_square_button':'\ud83d\udd32',
  'blonde_man':'\ud83d\udc71',
  'blonde_woman':'\ud83d\udc71&zwj;\u2640\ufe0f',
  'blossom':'\ud83c\udf3c',
  'blowfish':'\ud83d\udc21',
  'blue_book':'\ud83d\udcd8',
  'blue_car':'\ud83d\ude99',
  'blue_heart':'\ud83d\udc99',
  'blush':'\ud83d\ude0a',
  'boar':'\ud83d\udc17',
  'boat':'\u26f5\ufe0f',
  'bomb':'\ud83d\udca3',
  'book':'\ud83d\udcd6',
  'bookmark':'\ud83d\udd16',
  'bookmark_tabs':'\ud83d\udcd1',
  'books':'\ud83d\udcda',
  'boom':'\ud83d\udca5',
  'boot':'\ud83d\udc62',
  'bouquet':'\ud83d\udc90',
  'bowing_man':'\ud83d\ude47',
  'bow_and_arrow':'\ud83c\udff9',
  'bowing_woman':'\ud83d\ude47&zwj;\u2640\ufe0f',
  'bowling':'\ud83c\udfb3',
  'boxing_glove':'\ud83e\udd4a',
  'boy':'\ud83d\udc66',
  'bread':'\ud83c\udf5e',
  'bride_with_veil':'\ud83d\udc70',
  'bridge_at_night':'\ud83c\udf09',
  'briefcase':'\ud83d\udcbc',
  'broken_heart':'\ud83d\udc94',
  'bug':'\ud83d\udc1b',
  'building_construction':'\ud83c\udfd7',
  'bulb':'\ud83d\udca1',
  'bullettrain_front':'\ud83d\ude85',
  'bullettrain_side':'\ud83d\ude84',
  'burrito':'\ud83c\udf2f',
  'bus':'\ud83d\ude8c',
  'business_suit_levitating':'\ud83d\udd74',
  'busstop':'\ud83d\ude8f',
  'bust_in_silhouette':'\ud83d\udc64',
  'busts_in_silhouette':'\ud83d\udc65',
  'butterfly':'\ud83e\udd8b',
  'cactus':'\ud83c\udf35',
  'cake':'\ud83c\udf70',
  'calendar':'\ud83d\udcc6',
  'call_me_hand':'\ud83e\udd19',
  'calling':'\ud83d\udcf2',
  'camel':'\ud83d\udc2b',
  'camera':'\ud83d\udcf7',
  'camera_flash':'\ud83d\udcf8',
  'camping':'\ud83c\udfd5',
  'cancer':'\u264b\ufe0f',
  'candle':'\ud83d\udd6f',
  'candy':'\ud83c\udf6c',
  'canoe':'\ud83d\udef6',
  'capital_abcd':'\ud83d\udd20',
  'capricorn':'\u2651\ufe0f',
  'car':'\ud83d\ude97',
  'card_file_box':'\ud83d\uddc3',
  'card_index':'\ud83d\udcc7',
  'card_index_dividers':'\ud83d\uddc2',
  'carousel_horse':'\ud83c\udfa0',
  'carrot':'\ud83e\udd55',
  'cat':'\ud83d\udc31',
  'cat2':'\ud83d\udc08',
  'cd':'\ud83d\udcbf',
  'chains':'\u26d3',
  'champagne':'\ud83c\udf7e',
  'chart':'\ud83d\udcb9',
  'chart_with_downwards_trend':'\ud83d\udcc9',
  'chart_with_upwards_trend':'\ud83d\udcc8',
  'checkered_flag':'\ud83c\udfc1',
  'cheese':'\ud83e\uddc0',
  'cherries':'\ud83c\udf52',
  'cherry_blossom':'\ud83c\udf38',
  'chestnut':'\ud83c\udf30',
  'chicken':'\ud83d\udc14',
  'children_crossing':'\ud83d\udeb8',
  'chipmunk':'\ud83d\udc3f',
  'chocolate_bar':'\ud83c\udf6b',
  'christmas_tree':'\ud83c\udf84',
  'church':'\u26ea\ufe0f',
  'cinema':'\ud83c\udfa6',
  'circus_tent':'\ud83c\udfaa',
  'city_sunrise':'\ud83c\udf07',
  'city_sunset':'\ud83c\udf06',
  'cityscape':'\ud83c\udfd9',
  'cl':'\ud83c\udd91',
  'clamp':'\ud83d\udddc',
  'clap':'\ud83d\udc4f',
  'clapper':'\ud83c\udfac',
  'classical_building':'\ud83c\udfdb',
  'clinking_glasses':'\ud83e\udd42',
  'clipboard':'\ud83d\udccb',
  'clock1':'\ud83d\udd50',
  'clock10':'\ud83d\udd59',
  'clock1030':'\ud83d\udd65',
  'clock11':'\ud83d\udd5a',
  'clock1130':'\ud83d\udd66',
  'clock12':'\ud83d\udd5b',
  'clock1230':'\ud83d\udd67',
  'clock130':'\ud83d\udd5c',
  'clock2':'\ud83d\udd51',
  'clock230':'\ud83d\udd5d',
  'clock3':'\ud83d\udd52',
  'clock330':'\ud83d\udd5e',
  'clock4':'\ud83d\udd53',
  'clock430':'\ud83d\udd5f',
  'clock5':'\ud83d\udd54',
  'clock530':'\ud83d\udd60',
  'clock6':'\ud83d\udd55',
  'clock630':'\ud83d\udd61',
  'clock7':'\ud83d\udd56',
  'clock730':'\ud83d\udd62',
  'clock8':'\ud83d\udd57',
  'clock830':'\ud83d\udd63',
  'clock9':'\ud83d\udd58',
  'clock930':'\ud83d\udd64',
  'closed_book':'\ud83d\udcd5',
  'closed_lock_with_key':'\ud83d\udd10',
  'closed_umbrella':'\ud83c\udf02',
  'cloud':'\u2601\ufe0f',
  'cloud_with_lightning':'\ud83c\udf29',
  'cloud_with_lightning_and_rain':'\u26c8',
  'cloud_with_rain':'\ud83c\udf27',
  'cloud_with_snow':'\ud83c\udf28',
  'clown_face':'\ud83e\udd21',
  'clubs':'\u2663\ufe0f',
  'cocktail':'\ud83c\udf78',
  'coffee':'\u2615\ufe0f',
  'coffin':'\u26b0\ufe0f',
  'cold_sweat':'\ud83d\ude30',
  'comet':'\u2604\ufe0f',
  'computer':'\ud83d\udcbb',
  'computer_mouse':'\ud83d\uddb1',
  'confetti_ball':'\ud83c\udf8a',
  'confounded':'\ud83d\ude16',
  'confused':'\ud83d\ude15',
  'congratulations':'\u3297\ufe0f',
  'construction':'\ud83d\udea7',
  'construction_worker_man':'\ud83d\udc77',
  'construction_worker_woman':'\ud83d\udc77&zwj;\u2640\ufe0f',
  'control_knobs':'\ud83c\udf9b',
  'convenience_store':'\ud83c\udfea',
  'cookie':'\ud83c\udf6a',
  'cool':'\ud83c\udd92',
  'policeman':'\ud83d\udc6e',
  'copyright':'\u00a9\ufe0f',
  'corn':'\ud83c\udf3d',
  'couch_and_lamp':'\ud83d\udecb',
  'couple':'\ud83d\udc6b',
  'couple_with_heart_woman_man':'\ud83d\udc91',
  'couple_with_heart_man_man':'\ud83d\udc68&zwj;\u2764\ufe0f&zwj;\ud83d\udc68',
  'couple_with_heart_woman_woman':'\ud83d\udc69&zwj;\u2764\ufe0f&zwj;\ud83d\udc69',
  'couplekiss_man_man':'\ud83d\udc68&zwj;\u2764\ufe0f&zwj;\ud83d\udc8b&zwj;\ud83d\udc68',
  'couplekiss_man_woman':'\ud83d\udc8f',
  'couplekiss_woman_woman':'\ud83d\udc69&zwj;\u2764\ufe0f&zwj;\ud83d\udc8b&zwj;\ud83d\udc69',
  'cow':'\ud83d\udc2e',
  'cow2':'\ud83d\udc04',
  'cowboy_hat_face':'\ud83e\udd20',
  'crab':'\ud83e\udd80',
  'crayon':'\ud83d\udd8d',
  'credit_card':'\ud83d\udcb3',
  'crescent_moon':'\ud83c\udf19',
  'cricket':'\ud83c\udfcf',
  'crocodile':'\ud83d\udc0a',
  'croissant':'\ud83e\udd50',
  'crossed_fingers':'\ud83e\udd1e',
  'crossed_flags':'\ud83c\udf8c',
  'crossed_swords':'\u2694\ufe0f',
  'crown':'\ud83d\udc51',
  'cry':'\ud83d\ude22',
  'crying_cat_face':'\ud83d\ude3f',
  'crystal_ball':'\ud83d\udd2e',
  'cucumber':'\ud83e\udd52',
  'cupid':'\ud83d\udc98',
  'curly_loop':'\u27b0',
  'currency_exchange':'\ud83d\udcb1',
  'curry':'\ud83c\udf5b',
  'custard':'\ud83c\udf6e',
  'customs':'\ud83d\udec3',
  'cyclone':'\ud83c\udf00',
  'dagger':'\ud83d\udde1',
  'dancer':'\ud83d\udc83',
  'dancing_women':'\ud83d\udc6f',
  'dancing_men':'\ud83d\udc6f&zwj;\u2642\ufe0f',
  'dango':'\ud83c\udf61',
  'dark_sunglasses':'\ud83d\udd76',
  'dart':'\ud83c\udfaf',
  'dash':'\ud83d\udca8',
  'date':'\ud83d\udcc5',
  'deciduous_tree':'\ud83c\udf33',
  'deer':'\ud83e\udd8c',
  'department_store':'\ud83c\udfec',
  'derelict_house':'\ud83c\udfda',
  'desert':'\ud83c\udfdc',
  'desert_island':'\ud83c\udfdd',
  'desktop_computer':'\ud83d\udda5',
  'male_detective':'\ud83d\udd75\ufe0f',
  'diamond_shape_with_a_dot_inside':'\ud83d\udca0',
  'diamonds':'\u2666\ufe0f',
  'disappointed':'\ud83d\ude1e',
  'disappointed_relieved':'\ud83d\ude25',
  'dizzy':'\ud83d\udcab',
  'dizzy_face':'\ud83d\ude35',
  'do_not_litter':'\ud83d\udeaf',
  'dog':'\ud83d\udc36',
  'dog2':'\ud83d\udc15',
  'dollar':'\ud83d\udcb5',
  'dolls':'\ud83c\udf8e',
  'dolphin':'\ud83d\udc2c',
  'door':'\ud83d\udeaa',
  'doughnut':'\ud83c\udf69',
  'dove':'\ud83d\udd4a',
  'dragon':'\ud83d\udc09',
  'dragon_face':'\ud83d\udc32',
  'dress':'\ud83d\udc57',
  'dromedary_camel':'\ud83d\udc2a',
  'drooling_face':'\ud83e\udd24',
  'droplet':'\ud83d\udca7',
  'drum':'\ud83e\udd41',
  'duck':'\ud83e\udd86',
  'dvd':'\ud83d\udcc0',
  'e-mail':'\ud83d\udce7',
  'eagle':'\ud83e\udd85',
  'ear':'\ud83d\udc42',
  'ear_of_rice':'\ud83c\udf3e',
  'earth_africa':'\ud83c\udf0d',
  'earth_americas':'\ud83c\udf0e',
  'earth_asia':'\ud83c\udf0f',
  'egg':'\ud83e\udd5a',
  'eggplant':'\ud83c\udf46',
  'eight_pointed_black_star':'\u2734\ufe0f',
  'eight_spoked_asterisk':'\u2733\ufe0f',
  'electric_plug':'\ud83d\udd0c',
  'elephant':'\ud83d\udc18',
  'email':'\u2709\ufe0f',
  'end':'\ud83d\udd1a',
  'envelope_with_arrow':'\ud83d\udce9',
  'euro':'\ud83d\udcb6',
  'european_castle':'\ud83c\udff0',
  'european_post_office':'\ud83c\udfe4',
  'evergreen_tree':'\ud83c\udf32',
  'exclamation':'\u2757\ufe0f',
  'expressionless':'\ud83d\ude11',
  'eye':'\ud83d\udc41',
  'eye_speech_bubble':'\ud83d\udc41&zwj;\ud83d\udde8',
  'eyeglasses':'\ud83d\udc53',
  'eyes':'\ud83d\udc40',
  'face_with_head_bandage':'\ud83e\udd15',
  'face_with_thermometer':'\ud83e\udd12',
  'fist_oncoming':'\ud83d\udc4a',
  'factory':'\ud83c\udfed',
  'fallen_leaf':'\ud83c\udf42',
  'family_man_woman_boy':'\ud83d\udc6a',
  'family_man_boy':'\ud83d\udc68&zwj;\ud83d\udc66',
  'family_man_boy_boy':'\ud83d\udc68&zwj;\ud83d\udc66&zwj;\ud83d\udc66',
  'family_man_girl':'\ud83d\udc68&zwj;\ud83d\udc67',
  'family_man_girl_boy':'\ud83d\udc68&zwj;\ud83d\udc67&zwj;\ud83d\udc66',
  'family_man_girl_girl':'\ud83d\udc68&zwj;\ud83d\udc67&zwj;\ud83d\udc67',
  'family_man_man_boy':'\ud83d\udc68&zwj;\ud83d\udc68&zwj;\ud83d\udc66',
  'family_man_man_boy_boy':'\ud83d\udc68&zwj;\ud83d\udc68&zwj;\ud83d\udc66&zwj;\ud83d\udc66',
  'family_man_man_girl':'\ud83d\udc68&zwj;\ud83d\udc68&zwj;\ud83d\udc67',
  'family_man_man_girl_boy':'\ud83d\udc68&zwj;\ud83d\udc68&zwj;\ud83d\udc67&zwj;\ud83d\udc66',
  'family_man_man_girl_girl':'\ud83d\udc68&zwj;\ud83d\udc68&zwj;\ud83d\udc67&zwj;\ud83d\udc67',
  'family_man_woman_boy_boy':'\ud83d\udc68&zwj;\ud83d\udc69&zwj;\ud83d\udc66&zwj;\ud83d\udc66',
  'family_man_woman_girl':'\ud83d\udc68&zwj;\ud83d\udc69&zwj;\ud83d\udc67',
  'family_man_woman_girl_boy':'\ud83d\udc68&zwj;\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc66',
  'family_man_woman_girl_girl':'\ud83d\udc68&zwj;\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc67',
  'family_woman_boy':'\ud83d\udc69&zwj;\ud83d\udc66',
  'family_woman_boy_boy':'\ud83d\udc69&zwj;\ud83d\udc66&zwj;\ud83d\udc66',
  'family_woman_girl':'\ud83d\udc69&zwj;\ud83d\udc67',
  'family_woman_girl_boy':'\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc66',
  'family_woman_girl_girl':'\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc67',
  'family_woman_woman_boy':'\ud83d\udc69&zwj;\ud83d\udc69&zwj;\ud83d\udc66',
  'family_woman_woman_boy_boy':'\ud83d\udc69&zwj;\ud83d\udc69&zwj;\ud83d\udc66&zwj;\ud83d\udc66',
  'family_woman_woman_girl':'\ud83d\udc69&zwj;\ud83d\udc69&zwj;\ud83d\udc67',
  'family_woman_woman_girl_boy':'\ud83d\udc69&zwj;\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc66',
  'family_woman_woman_girl_girl':'\ud83d\udc69&zwj;\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc67',
  'fast_forward':'\u23e9',
  'fax':'\ud83d\udce0',
  'fearful':'\ud83d\ude28',
  'feet':'\ud83d\udc3e',
  'female_detective':'\ud83d\udd75\ufe0f&zwj;\u2640\ufe0f',
  'ferris_wheel':'\ud83c\udfa1',
  'ferry':'\u26f4',
  'field_hockey':'\ud83c\udfd1',
  'file_cabinet':'\ud83d\uddc4',
  'file_folder':'\ud83d\udcc1',
  'film_projector':'\ud83d\udcfd',
  'film_strip':'\ud83c\udf9e',
  'fire':'\ud83d\udd25',
  'fire_engine':'\ud83d\ude92',
  'fireworks':'\ud83c\udf86',
  'first_quarter_moon':'\ud83c\udf13',
  'first_quarter_moon_with_face':'\ud83c\udf1b',
  'fish':'\ud83d\udc1f',
  'fish_cake':'\ud83c\udf65',
  'fishing_pole_and_fish':'\ud83c\udfa3',
  'fist_raised':'\u270a',
  'fist_left':'\ud83e\udd1b',
  'fist_right':'\ud83e\udd1c',
  'flags':'\ud83c\udf8f',
  'flashlight':'\ud83d\udd26',
  'fleur_de_lis':'\u269c\ufe0f',
  'flight_arrival':'\ud83d\udeec',
  'flight_departure':'\ud83d\udeeb',
  'floppy_disk':'\ud83d\udcbe',
  'flower_playing_cards':'\ud83c\udfb4',
  'flushed':'\ud83d\ude33',
  'fog':'\ud83c\udf2b',
  'foggy':'\ud83c\udf01',
  'football':'\ud83c\udfc8',
  'footprints':'\ud83d\udc63',
  'fork_and_knife':'\ud83c\udf74',
  'fountain':'\u26f2\ufe0f',
  'fountain_pen':'\ud83d\udd8b',
  'four_leaf_clover':'\ud83c\udf40',
  'fox_face':'\ud83e\udd8a',
  'framed_picture':'\ud83d\uddbc',
  'free':'\ud83c\udd93',
  'fried_egg':'\ud83c\udf73',
  'fried_shrimp':'\ud83c\udf64',
  'fries':'\ud83c\udf5f',
  'frog':'\ud83d\udc38',
  'frowning':'\ud83d\ude26',
  'frowning_face':'\u2639\ufe0f',
  'frowning_man':'\ud83d\ude4d&zwj;\u2642\ufe0f',
  'frowning_woman':'\ud83d\ude4d',
  'middle_finger':'\ud83d\udd95',
  'fuelpump':'\u26fd\ufe0f',
  'full_moon':'\ud83c\udf15',
  'full_moon_with_face':'\ud83c\udf1d',
  'funeral_urn':'\u26b1\ufe0f',
  'game_die':'\ud83c\udfb2',
  'gear':'\u2699\ufe0f',
  'gem':'\ud83d\udc8e',
  'gemini':'\u264a\ufe0f',
  'ghost':'\ud83d\udc7b',
  'gift':'\ud83c\udf81',
  'gift_heart':'\ud83d\udc9d',
  'girl':'\ud83d\udc67',
  'globe_with_meridians':'\ud83c\udf10',
  'goal_net':'\ud83e\udd45',
  'goat':'\ud83d\udc10',
  'golf':'\u26f3\ufe0f',
  'golfing_man':'\ud83c\udfcc\ufe0f',
  'golfing_woman':'\ud83c\udfcc\ufe0f&zwj;\u2640\ufe0f',
  'gorilla':'\ud83e\udd8d',
  'grapes':'\ud83c\udf47',
  'green_apple':'\ud83c\udf4f',
  'green_book':'\ud83d\udcd7',
  'green_heart':'\ud83d\udc9a',
  'green_salad':'\ud83e\udd57',
  'grey_exclamation':'\u2755',
  'grey_question':'\u2754',
  'grimacing':'\ud83d\ude2c',
  'grin':'\ud83d\ude01',
  'grinning':'\ud83d\ude00',
  'guardsman':'\ud83d\udc82',
  'guardswoman':'\ud83d\udc82&zwj;\u2640\ufe0f',
  'guitar':'\ud83c\udfb8',
  'gun':'\ud83d\udd2b',
  'haircut_woman':'\ud83d\udc87',
  'haircut_man':'\ud83d\udc87&zwj;\u2642\ufe0f',
  'hamburger':'\ud83c\udf54',
  'hammer':'\ud83d\udd28',
  'hammer_and_pick':'\u2692',
  'hammer_and_wrench':'\ud83d\udee0',
  'hamster':'\ud83d\udc39',
  'hand':'\u270b',
  'handbag':'\ud83d\udc5c',
  'handshake':'\ud83e\udd1d',
  'hankey':'\ud83d\udca9',
  'hatched_chick':'\ud83d\udc25',
  'hatching_chick':'\ud83d\udc23',
  'headphones':'\ud83c\udfa7',
  'hear_no_evil':'\ud83d\ude49',
  'heart':'\u2764\ufe0f',
  'heart_decoration':'\ud83d\udc9f',
  'heart_eyes':'\ud83d\ude0d',
  'heart_eyes_cat':'\ud83d\ude3b',
  'heartbeat':'\ud83d\udc93',
  'heartpulse':'\ud83d\udc97',
  'hearts':'\u2665\ufe0f',
  'heavy_check_mark':'\u2714\ufe0f',
  'heavy_division_sign':'\u2797',
  'heavy_dollar_sign':'\ud83d\udcb2',
  'heavy_heart_exclamation':'\u2763\ufe0f',
  'heavy_minus_sign':'\u2796',
  'heavy_multiplication_x':'\u2716\ufe0f',
  'heavy_plus_sign':'\u2795',
  'helicopter':'\ud83d\ude81',
  'herb':'\ud83c\udf3f',
  'hibiscus':'\ud83c\udf3a',
  'high_brightness':'\ud83d\udd06',
  'high_heel':'\ud83d\udc60',
  'hocho':'\ud83d\udd2a',
  'hole':'\ud83d\udd73',
  'honey_pot':'\ud83c\udf6f',
  'horse':'\ud83d\udc34',
  'horse_racing':'\ud83c\udfc7',
  'hospital':'\ud83c\udfe5',
  'hot_pepper':'\ud83c\udf36',
  'hotdog':'\ud83c\udf2d',
  'hotel':'\ud83c\udfe8',
  'hotsprings':'\u2668\ufe0f',
  'hourglass':'\u231b\ufe0f',
  'hourglass_flowing_sand':'\u23f3',
  'house':'\ud83c\udfe0',
  'house_with_garden':'\ud83c\udfe1',
  'houses':'\ud83c\udfd8',
  'hugs':'\ud83e\udd17',
  'hushed':'\ud83d\ude2f',
  'ice_cream':'\ud83c\udf68',
  'ice_hockey':'\ud83c\udfd2',
  'ice_skate':'\u26f8',
  'icecream':'\ud83c\udf66',
  'id':'\ud83c\udd94',
  'ideograph_advantage':'\ud83c\ude50',
  'imp':'\ud83d\udc7f',
  'inbox_tray':'\ud83d\udce5',
  'incoming_envelope':'\ud83d\udce8',
  'tipping_hand_woman':'\ud83d\udc81',
  'information_source':'\u2139\ufe0f',
  'innocent':'\ud83d\ude07',
  'interrobang':'\u2049\ufe0f',
  'iphone':'\ud83d\udcf1',
  'izakaya_lantern':'\ud83c\udfee',
  'jack_o_lantern':'\ud83c\udf83',
  'japan':'\ud83d\uddfe',
  'japanese_castle':'\ud83c\udfef',
  'japanese_goblin':'\ud83d\udc7a',
  'japanese_ogre':'\ud83d\udc79',
  'jeans':'\ud83d\udc56',
  'joy':'\ud83d\ude02',
  'joy_cat':'\ud83d\ude39',
  'joystick':'\ud83d\udd79',
  'kaaba':'\ud83d\udd4b',
  'key':'\ud83d\udd11',
  'keyboard':'\u2328\ufe0f',
  'keycap_ten':'\ud83d\udd1f',
  'kick_scooter':'\ud83d\udef4',
  'kimono':'\ud83d\udc58',
  'kiss':'\ud83d\udc8b',
  'kissing':'\ud83d\ude17',
  'kissing_cat':'\ud83d\ude3d',
  'kissing_closed_eyes':'\ud83d\ude1a',
  'kissing_heart':'\ud83d\ude18',
  'kissing_smiling_eyes':'\ud83d\ude19',
  'kiwi_fruit':'\ud83e\udd5d',
  'koala':'\ud83d\udc28',
  'koko':'\ud83c\ude01',
  'label':'\ud83c\udff7',
  'large_blue_circle':'\ud83d\udd35',
  'large_blue_diamond':'\ud83d\udd37',
  'large_orange_diamond':'\ud83d\udd36',
  'last_quarter_moon':'\ud83c\udf17',
  'last_quarter_moon_with_face':'\ud83c\udf1c',
  'latin_cross':'\u271d\ufe0f',
  'laughing':'\ud83d\ude06',
  'leaves':'\ud83c\udf43',
  'ledger':'\ud83d\udcd2',
  'left_luggage':'\ud83d\udec5',
  'left_right_arrow':'\u2194\ufe0f',
  'leftwards_arrow_with_hook':'\u21a9\ufe0f',
  'lemon':'\ud83c\udf4b',
  'leo':'\u264c\ufe0f',
  'leopard':'\ud83d\udc06',
  'level_slider':'\ud83c\udf9a',
  'libra':'\u264e\ufe0f',
  'light_rail':'\ud83d\ude88',
  'link':'\ud83d\udd17',
  'lion':'\ud83e\udd81',
  'lips':'\ud83d\udc44',
  'lipstick':'\ud83d\udc84',
  'lizard':'\ud83e\udd8e',
  'lock':'\ud83d\udd12',
  'lock_with_ink_pen':'\ud83d\udd0f',
  'lollipop':'\ud83c\udf6d',
  'loop':'\u27bf',
  'loud_sound':'\ud83d\udd0a',
  'loudspeaker':'\ud83d\udce2',
  'love_hotel':'\ud83c\udfe9',
  'love_letter':'\ud83d\udc8c',
  'low_brightness':'\ud83d\udd05',
  'lying_face':'\ud83e\udd25',
  'm':'\u24c2\ufe0f',
  'mag':'\ud83d\udd0d',
  'mag_right':'\ud83d\udd0e',
  'mahjong':'\ud83c\udc04\ufe0f',
  'mailbox':'\ud83d\udceb',
  'mailbox_closed':'\ud83d\udcea',
  'mailbox_with_mail':'\ud83d\udcec',
  'mailbox_with_no_mail':'\ud83d\udced',
  'man':'\ud83d\udc68',
  'man_artist':'\ud83d\udc68&zwj;\ud83c\udfa8',
  'man_astronaut':'\ud83d\udc68&zwj;\ud83d\ude80',
  'man_cartwheeling':'\ud83e\udd38&zwj;\u2642\ufe0f',
  'man_cook':'\ud83d\udc68&zwj;\ud83c\udf73',
  'man_dancing':'\ud83d\udd7a',
  'man_facepalming':'\ud83e\udd26&zwj;\u2642\ufe0f',
  'man_factory_worker':'\ud83d\udc68&zwj;\ud83c\udfed',
  'man_farmer':'\ud83d\udc68&zwj;\ud83c\udf3e',
  'man_firefighter':'\ud83d\udc68&zwj;\ud83d\ude92',
  'man_health_worker':'\ud83d\udc68&zwj;\u2695\ufe0f',
  'man_in_tuxedo':'\ud83e\udd35',
  'man_judge':'\ud83d\udc68&zwj;\u2696\ufe0f',
  'man_juggling':'\ud83e\udd39&zwj;\u2642\ufe0f',
  'man_mechanic':'\ud83d\udc68&zwj;\ud83d\udd27',
  'man_office_worker':'\ud83d\udc68&zwj;\ud83d\udcbc',
  'man_pilot':'\ud83d\udc68&zwj;\u2708\ufe0f',
  'man_playing_handball':'\ud83e\udd3e&zwj;\u2642\ufe0f',
  'man_playing_water_polo':'\ud83e\udd3d&zwj;\u2642\ufe0f',
  'man_scientist':'\ud83d\udc68&zwj;\ud83d\udd2c',
  'man_shrugging':'\ud83e\udd37&zwj;\u2642\ufe0f',
  'man_singer':'\ud83d\udc68&zwj;\ud83c\udfa4',
  'man_student':'\ud83d\udc68&zwj;\ud83c\udf93',
  'man_teacher':'\ud83d\udc68&zwj;\ud83c\udfeb',
  'man_technologist':'\ud83d\udc68&zwj;\ud83d\udcbb',
  'man_with_gua_pi_mao':'\ud83d\udc72',
  'man_with_turban':'\ud83d\udc73',
  'tangerine':'\ud83c\udf4a',
  'mans_shoe':'\ud83d\udc5e',
  'mantelpiece_clock':'\ud83d\udd70',
  'maple_leaf':'\ud83c\udf41',
  'martial_arts_uniform':'\ud83e\udd4b',
  'mask':'\ud83d\ude37',
  'massage_woman':'\ud83d\udc86',
  'massage_man':'\ud83d\udc86&zwj;\u2642\ufe0f',
  'meat_on_bone':'\ud83c\udf56',
  'medal_military':'\ud83c\udf96',
  'medal_sports':'\ud83c\udfc5',
  'mega':'\ud83d\udce3',
  'melon':'\ud83c\udf48',
  'memo':'\ud83d\udcdd',
  'men_wrestling':'\ud83e\udd3c&zwj;\u2642\ufe0f',
  'menorah':'\ud83d\udd4e',
  'mens':'\ud83d\udeb9',
  'metal':'\ud83e\udd18',
  'metro':'\ud83d\ude87',
  'microphone':'\ud83c\udfa4',
  'microscope':'\ud83d\udd2c',
  'milk_glass':'\ud83e\udd5b',
  'milky_way':'\ud83c\udf0c',
  'minibus':'\ud83d\ude90',
  'minidisc':'\ud83d\udcbd',
  'mobile_phone_off':'\ud83d\udcf4',
  'money_mouth_face':'\ud83e\udd11',
  'money_with_wings':'\ud83d\udcb8',
  'moneybag':'\ud83d\udcb0',
  'monkey':'\ud83d\udc12',
  'monkey_face':'\ud83d\udc35',
  'monorail':'\ud83d\ude9d',
  'moon':'\ud83c\udf14',
  'mortar_board':'\ud83c\udf93',
  'mosque':'\ud83d\udd4c',
  'motor_boat':'\ud83d\udee5',
  'motor_scooter':'\ud83d\udef5',
  'motorcycle':'\ud83c\udfcd',
  'motorway':'\ud83d\udee3',
  'mount_fuji':'\ud83d\uddfb',
  'mountain':'\u26f0',
  'mountain_biking_man':'\ud83d\udeb5',
  'mountain_biking_woman':'\ud83d\udeb5&zwj;\u2640\ufe0f',
  'mountain_cableway':'\ud83d\udea0',
  'mountain_railway':'\ud83d\ude9e',
  'mountain_snow':'\ud83c\udfd4',
  'mouse':'\ud83d\udc2d',
  'mouse2':'\ud83d\udc01',
  'movie_camera':'\ud83c\udfa5',
  'moyai':'\ud83d\uddff',
  'mrs_claus':'\ud83e\udd36',
  'muscle':'\ud83d\udcaa',
  'mushroom':'\ud83c\udf44',
  'musical_keyboard':'\ud83c\udfb9',
  'musical_note':'\ud83c\udfb5',
  'musical_score':'\ud83c\udfbc',
  'mute':'\ud83d\udd07',
  'nail_care':'\ud83d\udc85',
  'name_badge':'\ud83d\udcdb',
  'national_park':'\ud83c\udfde',
  'nauseated_face':'\ud83e\udd22',
  'necktie':'\ud83d\udc54',
  'negative_squared_cross_mark':'\u274e',
  'nerd_face':'\ud83e\udd13',
  'neutral_face':'\ud83d\ude10',
  'new':'\ud83c\udd95',
  'new_moon':'\ud83c\udf11',
  'new_moon_with_face':'\ud83c\udf1a',
  'newspaper':'\ud83d\udcf0',
  'newspaper_roll':'\ud83d\uddde',
  'next_track_button':'\u23ed',
  'ng':'\ud83c\udd96',
  'no_good_man':'\ud83d\ude45&zwj;\u2642\ufe0f',
  'no_good_woman':'\ud83d\ude45',
  'night_with_stars':'\ud83c\udf03',
  'no_bell':'\ud83d\udd15',
  'no_bicycles':'\ud83d\udeb3',
  'no_entry':'\u26d4\ufe0f',
  'no_entry_sign':'\ud83d\udeab',
  'no_mobile_phones':'\ud83d\udcf5',
  'no_mouth':'\ud83d\ude36',
  'no_pedestrians':'\ud83d\udeb7',
  'no_smoking':'\ud83d\udead',
  'non-potable_water':'\ud83d\udeb1',
  'nose':'\ud83d\udc43',
  'notebook':'\ud83d\udcd3',
  'notebook_with_decorative_cover':'\ud83d\udcd4',
  'notes':'\ud83c\udfb6',
  'nut_and_bolt':'\ud83d\udd29',
  'o':'\u2b55\ufe0f',
  'o2':'\ud83c\udd7e\ufe0f',
  'ocean':'\ud83c\udf0a',
  'octopus':'\ud83d\udc19',
  'oden':'\ud83c\udf62',
  'office':'\ud83c\udfe2',
  'oil_drum':'\ud83d\udee2',
  'ok':'\ud83c\udd97',
  'ok_hand':'\ud83d\udc4c',
  'ok_man':'\ud83d\ude46&zwj;\u2642\ufe0f',
  'ok_woman':'\ud83d\ude46',
  'old_key':'\ud83d\udddd',
  'older_man':'\ud83d\udc74',
  'older_woman':'\ud83d\udc75',
  'om':'\ud83d\udd49',
  'on':'\ud83d\udd1b',
  'oncoming_automobile':'\ud83d\ude98',
  'oncoming_bus':'\ud83d\ude8d',
  'oncoming_police_car':'\ud83d\ude94',
  'oncoming_taxi':'\ud83d\ude96',
  'open_file_folder':'\ud83d\udcc2',
  'open_hands':'\ud83d\udc50',
  'open_mouth':'\ud83d\ude2e',
  'open_umbrella':'\u2602\ufe0f',
  'ophiuchus':'\u26ce',
  'orange_book':'\ud83d\udcd9',
  'orthodox_cross':'\u2626\ufe0f',
  'outbox_tray':'\ud83d\udce4',
  'owl':'\ud83e\udd89',
  'ox':'\ud83d\udc02',
  'package':'\ud83d\udce6',
  'page_facing_up':'\ud83d\udcc4',
  'page_with_curl':'\ud83d\udcc3',
  'pager':'\ud83d\udcdf',
  'paintbrush':'\ud83d\udd8c',
  'palm_tree':'\ud83c\udf34',
  'pancakes':'\ud83e\udd5e',
  'panda_face':'\ud83d\udc3c',
  'paperclip':'\ud83d\udcce',
  'paperclips':'\ud83d\udd87',
  'parasol_on_ground':'\u26f1',
  'parking':'\ud83c\udd7f\ufe0f',
  'part_alternation_mark':'\u303d\ufe0f',
  'partly_sunny':'\u26c5\ufe0f',
  'passenger_ship':'\ud83d\udef3',
  'passport_control':'\ud83d\udec2',
  'pause_button':'\u23f8',
  'peace_symbol':'\u262e\ufe0f',
  'peach':'\ud83c\udf51',
  'peanuts':'\ud83e\udd5c',
  'pear':'\ud83c\udf50',
  'pen':'\ud83d\udd8a',
  'pencil2':'\u270f\ufe0f',
  'penguin':'\ud83d\udc27',
  'pensive':'\ud83d\ude14',
  'performing_arts':'\ud83c\udfad',
  'persevere':'\ud83d\ude23',
  'person_fencing':'\ud83e\udd3a',
  'pouting_woman':'\ud83d\ude4e',
  'phone':'\u260e\ufe0f',
  'pick':'\u26cf',
  'pig':'\ud83d\udc37',
  'pig2':'\ud83d\udc16',
  'pig_nose':'\ud83d\udc3d',
  'pill':'\ud83d\udc8a',
  'pineapple':'\ud83c\udf4d',
  'ping_pong':'\ud83c\udfd3',
  'pisces':'\u2653\ufe0f',
  'pizza':'\ud83c\udf55',
  'place_of_worship':'\ud83d\uded0',
  'plate_with_cutlery':'\ud83c\udf7d',
  'play_or_pause_button':'\u23ef',
  'point_down':'\ud83d\udc47',
  'point_left':'\ud83d\udc48',
  'point_right':'\ud83d\udc49',
  'point_up':'\u261d\ufe0f',
  'point_up_2':'\ud83d\udc46',
  'police_car':'\ud83d\ude93',
  'policewoman':'\ud83d\udc6e&zwj;\u2640\ufe0f',
  'poodle':'\ud83d\udc29',
  'popcorn':'\ud83c\udf7f',
  'post_office':'\ud83c\udfe3',
  'postal_horn':'\ud83d\udcef',
  'postbox':'\ud83d\udcee',
  'potable_water':'\ud83d\udeb0',
  'potato':'\ud83e\udd54',
  'pouch':'\ud83d\udc5d',
  'poultry_leg':'\ud83c\udf57',
  'pound':'\ud83d\udcb7',
  'rage':'\ud83d\ude21',
  'pouting_cat':'\ud83d\ude3e',
  'pouting_man':'\ud83d\ude4e&zwj;\u2642\ufe0f',
  'pray':'\ud83d\ude4f',
  'prayer_beads':'\ud83d\udcff',
  'pregnant_woman':'\ud83e\udd30',
  'previous_track_button':'\u23ee',
  'prince':'\ud83e\udd34',
  'princess':'\ud83d\udc78',
  'printer':'\ud83d\udda8',
  'purple_heart':'\ud83d\udc9c',
  'purse':'\ud83d\udc5b',
  'pushpin':'\ud83d\udccc',
  'put_litter_in_its_place':'\ud83d\udeae',
  'question':'\u2753',
  'rabbit':'\ud83d\udc30',
  'rabbit2':'\ud83d\udc07',
  'racehorse':'\ud83d\udc0e',
  'racing_car':'\ud83c\udfce',
  'radio':'\ud83d\udcfb',
  'radio_button':'\ud83d\udd18',
  'radioactive':'\u2622\ufe0f',
  'railway_car':'\ud83d\ude83',
  'railway_track':'\ud83d\udee4',
  'rainbow':'\ud83c\udf08',
  'rainbow_flag':'\ud83c\udff3\ufe0f&zwj;\ud83c\udf08',
  'raised_back_of_hand':'\ud83e\udd1a',
  'raised_hand_with_fingers_splayed':'\ud83d\udd90',
  'raised_hands':'\ud83d\ude4c',
  'raising_hand_woman':'\ud83d\ude4b',
  'raising_hand_man':'\ud83d\ude4b&zwj;\u2642\ufe0f',
  'ram':'\ud83d\udc0f',
  'ramen':'\ud83c\udf5c',
  'rat':'\ud83d\udc00',
  'record_button':'\u23fa',
  'recycle':'\u267b\ufe0f',
  'red_circle':'\ud83d\udd34',
  'registered':'\u00ae\ufe0f',
  'relaxed':'\u263a\ufe0f',
  'relieved':'\ud83d\ude0c',
  'reminder_ribbon':'\ud83c\udf97',
  'repeat':'\ud83d\udd01',
  'repeat_one':'\ud83d\udd02',
  'rescue_worker_helmet':'\u26d1',
  'restroom':'\ud83d\udebb',
  'revolving_hearts':'\ud83d\udc9e',
  'rewind':'\u23ea',
  'rhinoceros':'\ud83e\udd8f',
  'ribbon':'\ud83c\udf80',
  'rice':'\ud83c\udf5a',
  'rice_ball':'\ud83c\udf59',
  'rice_cracker':'\ud83c\udf58',
  'rice_scene':'\ud83c\udf91',
  'right_anger_bubble':'\ud83d\uddef',
  'ring':'\ud83d\udc8d',
  'robot':'\ud83e\udd16',
  'rocket':'\ud83d\ude80',
  'rofl':'\ud83e\udd23',
  'roll_eyes':'\ud83d\ude44',
  'roller_coaster':'\ud83c\udfa2',
  'rooster':'\ud83d\udc13',
  'rose':'\ud83c\udf39',
  'rosette':'\ud83c\udff5',
  'rotating_light':'\ud83d\udea8',
  'round_pushpin':'\ud83d\udccd',
  'rowing_man':'\ud83d\udea3',
  'rowing_woman':'\ud83d\udea3&zwj;\u2640\ufe0f',
  'rugby_football':'\ud83c\udfc9',
  'running_man':'\ud83c\udfc3',
  'running_shirt_with_sash':'\ud83c\udfbd',
  'running_woman':'\ud83c\udfc3&zwj;\u2640\ufe0f',
  'sa':'\ud83c\ude02\ufe0f',
  'sagittarius':'\u2650\ufe0f',
  'sake':'\ud83c\udf76',
  'sandal':'\ud83d\udc61',
  'santa':'\ud83c\udf85',
  'satellite':'\ud83d\udce1',
  'saxophone':'\ud83c\udfb7',
  'school':'\ud83c\udfeb',
  'school_satchel':'\ud83c\udf92',
  'scissors':'\u2702\ufe0f',
  'scorpion':'\ud83e\udd82',
  'scorpius':'\u264f\ufe0f',
  'scream':'\ud83d\ude31',
  'scream_cat':'\ud83d\ude40',
  'scroll':'\ud83d\udcdc',
  'seat':'\ud83d\udcba',
  'secret':'\u3299\ufe0f',
  'see_no_evil':'\ud83d\ude48',
  'seedling':'\ud83c\udf31',
  'selfie':'\ud83e\udd33',
  'shallow_pan_of_food':'\ud83e\udd58',
  'shamrock':'\u2618\ufe0f',
  'shark':'\ud83e\udd88',
  'shaved_ice':'\ud83c\udf67',
  'sheep':'\ud83d\udc11',
  'shell':'\ud83d\udc1a',
  'shield':'\ud83d\udee1',
  'shinto_shrine':'\u26e9',
  'ship':'\ud83d\udea2',
  'shirt':'\ud83d\udc55',
  'shopping':'\ud83d\udecd',
  'shopping_cart':'\ud83d\uded2',
  'shower':'\ud83d\udebf',
  'shrimp':'\ud83e\udd90',
  'signal_strength':'\ud83d\udcf6',
  'six_pointed_star':'\ud83d\udd2f',
  'ski':'\ud83c\udfbf',
  'skier':'\u26f7',
  'skull':'\ud83d\udc80',
  'skull_and_crossbones':'\u2620\ufe0f',
  'sleeping':'\ud83d\ude34',
  'sleeping_bed':'\ud83d\udecc',
  'sleepy':'\ud83d\ude2a',
  'slightly_frowning_face':'\ud83d\ude41',
  'slightly_smiling_face':'\ud83d\ude42',
  'slot_machine':'\ud83c\udfb0',
  'small_airplane':'\ud83d\udee9',
  'small_blue_diamond':'\ud83d\udd39',
  'small_orange_diamond':'\ud83d\udd38',
  'small_red_triangle':'\ud83d\udd3a',
  'small_red_triangle_down':'\ud83d\udd3b',
  'smile':'\ud83d\ude04',
  'smile_cat':'\ud83d\ude38',
  'smiley':'\ud83d\ude03',
  'smiley_cat':'\ud83d\ude3a',
  'smiling_imp':'\ud83d\ude08',
  'smirk':'\ud83d\ude0f',
  'smirk_cat':'\ud83d\ude3c',
  'smoking':'\ud83d\udeac',
  'snail':'\ud83d\udc0c',
  'snake':'\ud83d\udc0d',
  'sneezing_face':'\ud83e\udd27',
  'snowboarder':'\ud83c\udfc2',
  'snowflake':'\u2744\ufe0f',
  'snowman':'\u26c4\ufe0f',
  'snowman_with_snow':'\u2603\ufe0f',
  'sob':'\ud83d\ude2d',
  'soccer':'\u26bd\ufe0f',
  'soon':'\ud83d\udd1c',
  'sos':'\ud83c\udd98',
  'sound':'\ud83d\udd09',
  'space_invader':'\ud83d\udc7e',
  'spades':'\u2660\ufe0f',
  'spaghetti':'\ud83c\udf5d',
  'sparkle':'\u2747\ufe0f',
  'sparkler':'\ud83c\udf87',
  'sparkles':'\u2728',
  'sparkling_heart':'\ud83d\udc96',
  'speak_no_evil':'\ud83d\ude4a',
  'speaker':'\ud83d\udd08',
  'speaking_head':'\ud83d\udde3',
  'speech_balloon':'\ud83d\udcac',
  'speedboat':'\ud83d\udea4',
  'spider':'\ud83d\udd77',
  'spider_web':'\ud83d\udd78',
  'spiral_calendar':'\ud83d\uddd3',
  'spiral_notepad':'\ud83d\uddd2',
  'spoon':'\ud83e\udd44',
  'squid':'\ud83e\udd91',
  'stadium':'\ud83c\udfdf',
  'star':'\u2b50\ufe0f',
  'star2':'\ud83c\udf1f',
  'star_and_crescent':'\u262a\ufe0f',
  'star_of_david':'\u2721\ufe0f',
  'stars':'\ud83c\udf20',
  'station':'\ud83d\ude89',
  'statue_of_liberty':'\ud83d\uddfd',
  'steam_locomotive':'\ud83d\ude82',
  'stew':'\ud83c\udf72',
  'stop_button':'\u23f9',
  'stop_sign':'\ud83d\uded1',
  'stopwatch':'\u23f1',
  'straight_ruler':'\ud83d\udccf',
  'strawberry':'\ud83c\udf53',
  'stuck_out_tongue':'\ud83d\ude1b',
  'stuck_out_tongue_closed_eyes':'\ud83d\ude1d',
  'stuck_out_tongue_winking_eye':'\ud83d\ude1c',
  'studio_microphone':'\ud83c\udf99',
  'stuffed_flatbread':'\ud83e\udd59',
  'sun_behind_large_cloud':'\ud83c\udf25',
  'sun_behind_rain_cloud':'\ud83c\udf26',
  'sun_behind_small_cloud':'\ud83c\udf24',
  'sun_with_face':'\ud83c\udf1e',
  'sunflower':'\ud83c\udf3b',
  'sunglasses':'\ud83d\ude0e',
  'sunny':'\u2600\ufe0f',
  'sunrise':'\ud83c\udf05',
  'sunrise_over_mountains':'\ud83c\udf04',
  'surfing_man':'\ud83c\udfc4',
  'surfing_woman':'\ud83c\udfc4&zwj;\u2640\ufe0f',
  'sushi':'\ud83c\udf63',
  'suspension_railway':'\ud83d\ude9f',
  'sweat':'\ud83d\ude13',
  'sweat_drops':'\ud83d\udca6',
  'sweat_smile':'\ud83d\ude05',
  'sweet_potato':'\ud83c\udf60',
  'swimming_man':'\ud83c\udfca',
  'swimming_woman':'\ud83c\udfca&zwj;\u2640\ufe0f',
  'symbols':'\ud83d\udd23',
  'synagogue':'\ud83d\udd4d',
  'syringe':'\ud83d\udc89',
  'taco':'\ud83c\udf2e',
  'tada':'\ud83c\udf89',
  'tanabata_tree':'\ud83c\udf8b',
  'taurus':'\u2649\ufe0f',
  'taxi':'\ud83d\ude95',
  'tea':'\ud83c\udf75',
  'telephone_receiver':'\ud83d\udcde',
  'telescope':'\ud83d\udd2d',
  'tennis':'\ud83c\udfbe',
  'tent':'\u26fa\ufe0f',
  'thermometer':'\ud83c\udf21',
  'thinking':'\ud83e\udd14',
  'thought_balloon':'\ud83d\udcad',
  'ticket':'\ud83c\udfab',
  'tickets':'\ud83c\udf9f',
  'tiger':'\ud83d\udc2f',
  'tiger2':'\ud83d\udc05',
  'timer_clock':'\u23f2',
  'tipping_hand_man':'\ud83d\udc81&zwj;\u2642\ufe0f',
  'tired_face':'\ud83d\ude2b',
  'tm':'\u2122\ufe0f',
  'toilet':'\ud83d\udebd',
  'tokyo_tower':'\ud83d\uddfc',
  'tomato':'\ud83c\udf45',
  'tongue':'\ud83d\udc45',
  'top':'\ud83d\udd1d',
  'tophat':'\ud83c\udfa9',
  'tornado':'\ud83c\udf2a',
  'trackball':'\ud83d\uddb2',
  'tractor':'\ud83d\ude9c',
  'traffic_light':'\ud83d\udea5',
  'train':'\ud83d\ude8b',
  'train2':'\ud83d\ude86',
  'tram':'\ud83d\ude8a',
  'triangular_flag_on_post':'\ud83d\udea9',
  'triangular_ruler':'\ud83d\udcd0',
  'trident':'\ud83d\udd31',
  'triumph':'\ud83d\ude24',
  'trolleybus':'\ud83d\ude8e',
  'trophy':'\ud83c\udfc6',
  'tropical_drink':'\ud83c\udf79',
  'tropical_fish':'\ud83d\udc20',
  'truck':'\ud83d\ude9a',
  'trumpet':'\ud83c\udfba',
  'tulip':'\ud83c\udf37',
  'tumbler_glass':'\ud83e\udd43',
  'turkey':'\ud83e\udd83',
  'turtle':'\ud83d\udc22',
  'tv':'\ud83d\udcfa',
  'twisted_rightwards_arrows':'\ud83d\udd00',
  'two_hearts':'\ud83d\udc95',
  'two_men_holding_hands':'\ud83d\udc6c',
  'two_women_holding_hands':'\ud83d\udc6d',
  'u5272':'\ud83c\ude39',
  'u5408':'\ud83c\ude34',
  'u55b6':'\ud83c\ude3a',
  'u6307':'\ud83c\ude2f\ufe0f',
  'u6708':'\ud83c\ude37\ufe0f',
  'u6709':'\ud83c\ude36',
  'u6e80':'\ud83c\ude35',
  'u7121':'\ud83c\ude1a\ufe0f',
  'u7533':'\ud83c\ude38',
  'u7981':'\ud83c\ude32',
  'u7a7a':'\ud83c\ude33',
  'umbrella':'\u2614\ufe0f',
  'unamused':'\ud83d\ude12',
  'underage':'\ud83d\udd1e',
  'unicorn':'\ud83e\udd84',
  'unlock':'\ud83d\udd13',
  'up':'\ud83c\udd99',
  'upside_down_face':'\ud83d\ude43',
  'v':'\u270c\ufe0f',
  'vertical_traffic_light':'\ud83d\udea6',
  'vhs':'\ud83d\udcfc',
  'vibration_mode':'\ud83d\udcf3',
  'video_camera':'\ud83d\udcf9',
  'video_game':'\ud83c\udfae',
  'violin':'\ud83c\udfbb',
  'virgo':'\u264d\ufe0f',
  'volcano':'\ud83c\udf0b',
  'volleyball':'\ud83c\udfd0',
  'vs':'\ud83c\udd9a',
  'vulcan_salute':'\ud83d\udd96',
  'walking_man':'\ud83d\udeb6',
  'walking_woman':'\ud83d\udeb6&zwj;\u2640\ufe0f',
  'waning_crescent_moon':'\ud83c\udf18',
  'waning_gibbous_moon':'\ud83c\udf16',
  'warning':'\u26a0\ufe0f',
  'wastebasket':'\ud83d\uddd1',
  'watch':'\u231a\ufe0f',
  'water_buffalo':'\ud83d\udc03',
  'watermelon':'\ud83c\udf49',
  'wave':'\ud83d\udc4b',
  'wavy_dash':'\u3030\ufe0f',
  'waxing_crescent_moon':'\ud83c\udf12',
  'wc':'\ud83d\udebe',
  'weary':'\ud83d\ude29',
  'wedding':'\ud83d\udc92',
  'weight_lifting_man':'\ud83c\udfcb\ufe0f',
  'weight_lifting_woman':'\ud83c\udfcb\ufe0f&zwj;\u2640\ufe0f',
  'whale':'\ud83d\udc33',
  'whale2':'\ud83d\udc0b',
  'wheel_of_dharma':'\u2638\ufe0f',
  'wheelchair':'\u267f\ufe0f',
  'white_check_mark':'\u2705',
  'white_circle':'\u26aa\ufe0f',
  'white_flag':'\ud83c\udff3\ufe0f',
  'white_flower':'\ud83d\udcae',
  'white_large_square':'\u2b1c\ufe0f',
  'white_medium_small_square':'\u25fd\ufe0f',
  'white_medium_square':'\u25fb\ufe0f',
  'white_small_square':'\u25ab\ufe0f',
  'white_square_button':'\ud83d\udd33',
  'wilted_flower':'\ud83e\udd40',
  'wind_chime':'\ud83c\udf90',
  'wind_face':'\ud83c\udf2c',
  'wine_glass':'\ud83c\udf77',
  'wink':'\ud83d\ude09',
  'wolf':'\ud83d\udc3a',
  'woman':'\ud83d\udc69',
  'woman_artist':'\ud83d\udc69&zwj;\ud83c\udfa8',
  'woman_astronaut':'\ud83d\udc69&zwj;\ud83d\ude80',
  'woman_cartwheeling':'\ud83e\udd38&zwj;\u2640\ufe0f',
  'woman_cook':'\ud83d\udc69&zwj;\ud83c\udf73',
  'woman_facepalming':'\ud83e\udd26&zwj;\u2640\ufe0f',
  'woman_factory_worker':'\ud83d\udc69&zwj;\ud83c\udfed',
  'woman_farmer':'\ud83d\udc69&zwj;\ud83c\udf3e',
  'woman_firefighter':'\ud83d\udc69&zwj;\ud83d\ude92',
  'woman_health_worker':'\ud83d\udc69&zwj;\u2695\ufe0f',
  'woman_judge':'\ud83d\udc69&zwj;\u2696\ufe0f',
  'woman_juggling':'\ud83e\udd39&zwj;\u2640\ufe0f',
  'woman_mechanic':'\ud83d\udc69&zwj;\ud83d\udd27',
  'woman_office_worker':'\ud83d\udc69&zwj;\ud83d\udcbc',
  'woman_pilot':'\ud83d\udc69&zwj;\u2708\ufe0f',
  'woman_playing_handball':'\ud83e\udd3e&zwj;\u2640\ufe0f',
  'woman_playing_water_polo':'\ud83e\udd3d&zwj;\u2640\ufe0f',
  'woman_scientist':'\ud83d\udc69&zwj;\ud83d\udd2c',
  'woman_shrugging':'\ud83e\udd37&zwj;\u2640\ufe0f',
  'woman_singer':'\ud83d\udc69&zwj;\ud83c\udfa4',
  'woman_student':'\ud83d\udc69&zwj;\ud83c\udf93',
  'woman_teacher':'\ud83d\udc69&zwj;\ud83c\udfeb',
  'woman_technologist':'\ud83d\udc69&zwj;\ud83d\udcbb',
  'woman_with_turban':'\ud83d\udc73&zwj;\u2640\ufe0f',
  'womans_clothes':'\ud83d\udc5a',
  'womans_hat':'\ud83d\udc52',
  'women_wrestling':'\ud83e\udd3c&zwj;\u2640\ufe0f',
  'womens':'\ud83d\udeba',
  'world_map':'\ud83d\uddfa',
  'worried':'\ud83d\ude1f',
  'wrench':'\ud83d\udd27',
  'writing_hand':'\u270d\ufe0f',
  'x':'\u274c',
  'yellow_heart':'\ud83d\udc9b',
  'yen':'\ud83d\udcb4',
  'yin_yang':'\u262f\ufe0f',
  'yum':'\ud83d\ude0b',
  'zap':'\u26a1\ufe0f',
  'zipper_mouth_face':'\ud83e\udd10',
  'zzz':'\ud83d\udca4',

  /* special emojis :P */
  'octocat':  '<img width="20" height="20" align="absmiddle" src="data:image/png;base64,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">',
  'showdown': '<img width="20" height="20" align="absmiddle" src="data:image/png;base64,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/GMzLdsAAECtaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzA2NyA3OS4xNTc3NDcsIDIwMTUvMDMvMzAtMjM6NDA6NDIgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTUtMDEtMTVUMjE6MDE6MTlaPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAxNy0xMC0yNFQxMzozMTozMCswMTowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMTctMTAtMjRUMTM6MzE6MzArMDE6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8cGhvdG9zaG9wOkNvbG9yTW9kZT4zPC9waG90b3Nob3A6Q29sb3JNb2RlPgogICAgICAgICA8cGhvdG9zaG9wOklDQ1Byb2ZpbGU+c1JHQiBJRUM2MTk2Ni0yLjE8L3Bob3Rvc2hvcDpJQ0NQcm9maWxlPgogICAgICAgICA8cGhvdG9zaG9wOlRleHRMYXllcnM+CiAgICAgICAgICAgIDxyZGY6QmFnPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+UyAtPC9waG90b3Nob3A6TGF5ZXJOYW1lPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyVGV4dD5TIC08L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpCYWc+CiAgICAgICAgIDwvcGhvdG9zaG9wOlRleHRMYXllcnM+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6N2NkMzQxNzctOWYyZi0yNDRiLWEyYjQtMzU1MzJkY2Y1MWJiPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6M2E1YzgxYmYtYjhiNy0xMWU3LTk0NDktYTQ2MzdlZjJkNjMzPC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6NjBDNUFFNjVGNjlDRTQxMTk0NUE4NTVFM0JDQTdFRUI8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6NjBDNUFFNjVGNjlDRTQxMTk0NUE4NTVFM0JDQTdFRUI8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTUtMDEtMTVUMjE6MDE6MTlaPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6ODZjNjBkMGQtOGY0Yy01ZTRlLWEwMjQtODI4ZWQyNTIwZDc3PC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTEwLTI0VDEzOjMxOjMwKzAxOjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jb252ZXJ0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+ZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZzwvc3RFdnQ6cGFyYW1ldGVycz4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmRlcml2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+Y29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmc8L3N0RXZ0OnBhcmFtZXRlcnM+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjdjZDM0MTc3LTlmMmYtMjQ0Yi1hMmI0LTM1NTMyZGNmNTFiYjwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNy0xMC0yNFQxMzozMTozMCswMTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6U2VxPgogICAgICAgICA8L3htcE1NOkhpc3Rvcnk+CiAgICAgICAgIDx4bXBNTTpEZXJpdmVkRnJvbSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgIDxzdFJlZjppbnN0YW5jZUlEPnhtcC5paWQ6ODZjNjBkMGQtOGY0Yy01ZTRlLWEwMjQtODI4ZWQyNTIwZDc3PC9zdFJlZjppbnN0YW5jZUlEPgogICAgICAgICAgICA8c3RSZWY6ZG9jdW1lbnRJRD54bXAuZGlkOjYwQzVBRTY1RjY5Q0U0MTE5NDVBODU1RTNCQ0E3RUVCPC9zdFJlZjpkb2N1bWVudElEPgogICAgICAgICAgICA8c3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6NjBDNUFFNjVGNjlDRTQxMTk0NUE4NTVFM0JDQTdFRUI8L3N0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPC94bXBNTTpEZXJpdmVkRnJvbT4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+NjQ8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+NjQ8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Pse7bzcAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAA1JJREFUeNrsm1+OmlAUhz+aeS9dwZggJn1AnRUMO6jpBgZXULuC2hWUWUGZBTSxKyiuoA4mfUBMnB04K5g+9DihRBHlyh/lJLwIXLgf99xzzu9etZeXFy7Z3nDh1gBoAFy4XeVtQNO0zNcapmUDfUBPnFoBfhQGq6IBaHmjwD4Ahmk5wAD4kKG5J8CNwsAFaHe6DvA9cc0wCgOv8gDka3vA9RHNPgo0D7hNnJtGYWBXxgV2dH4MfMnRRA+Y1WIO2NJ5F/ikoKm3tYsChmkNFHW+fmHQMC1dfHaXPQP3wM1yMdc2B/AOGALTWobBmI1Shu0UGCwX83XyRBQGawHntTtdG5gUNfxVu4CTNqNv6/wWGL7kCc+1AmCYVisl3I2ydD4GYZUCs7IjoLXrxHIx9w9tLAqDCfBwDrXAY457x+cAoCfuwRGjYFUnAGk+PsjR7s8Dn1VeLWCYVlpDw+VivjVHSHt+u9PVJbzGzZXQWTkAkz0V31fATUaEsjVJlQBs4FeGcteLgzgbAALBA+4y3voAeJL8nA0AHfClnM1qm1HhnYUidCSE+KzvSSJUTwAxCOMcpfETMFYpfRUKIAbCFhC3OTJJJwqDWS0BxED0JZ4Pjix1P2+E0loCSMBwyK4S/xc1ojBwag8gMU84cvTKGgmlAYhngu1O9xAXuVE5J1QCQCz3bwHuHvdQui5QKQAxEO6eEKpsFCgTRSXkvdoxSlBMCxhJJbgrrbZRtHCiShN0pRB6PeQ3ckBw2K0oKXMBVYJIP+Nvh9qulFivGoBt1lLQxowT2ykBXCfnhZIglgYACWmqXQv+baioBYCeiCQHm+QEg1O7RhF7hO4OhSAhcJKSFU7qBGADwZeqMMuXn6TUBw8qlaMrirNb4LdhWlP+SWD+cjFfxTpuS2GUpik+o3jFSEkqbJiWn0P0OMSGqlWiOu0TvD+FRHZKAE+oW+cfRmEwqlsesJJEJs8y91QqP+9UL6lqEtz2gpuNEY5sm9sIHln2DRa2aFKGJtiXkZEMiWtgVvRKUSUFkSKt2S7fAGgAXLYpmQQXf36MUChTZdUa2u8/rkvPA6Tz30r4eH3ybcBS5gJ6SaNXb+aABkA1AMxKenclBZLW/He4cYEGwEXb3wEASelexk6LIIIAAAAASUVORK5CYII=">'
};

/**
 * Created by Estevao on 31-05-2015.
 */

/**
 * Showdown Converter class
 * @class
 * @param {object} [converterOptions]
 * @returns {Converter}
 */
showdown.Converter = function (converterOptions) {
  'use strict';

  var
      /**
       * Options used by this converter
       * @private
       * @type {{}}
       */
      options = {},

      /**
       * Language extensions used by this converter
       * @private
       * @type {Array}
       */
      langExtensions = [],

      /**
       * Output modifiers extensions used by this converter
       * @private
       * @type {Array}
       */
      outputModifiers = [],

      /**
       * Event listeners
       * @private
       * @type {{}}
       */
      listeners = {},

      /**
       * The flavor set in this converter
       */
      setConvFlavor = setFlavor,

    /**
     * Metadata of the document
     * @type {{parsed: {}, raw: string, format: string}}
     */
      metadata = {
        parsed: {},
        raw: '',
        format: ''
      };

  _constructor();

  /**
   * Converter constructor
   * @private
   */
  function _constructor () {
    converterOptions = converterOptions || {};

    for (var gOpt in globalOptions) {
      if (globalOptions.hasOwnProperty(gOpt)) {
        options[gOpt] = globalOptions[gOpt];
      }
    }

    // Merge options
    if (typeof converterOptions === 'object') {
      for (var opt in converterOptions) {
        if (converterOptions.hasOwnProperty(opt)) {
          options[opt] = converterOptions[opt];
        }
      }
    } else {
      throw Error('Converter expects the passed parameter to be an object, but ' + typeof converterOptions +
      ' was passed instead.');
    }

    if (options.extensions) {
      showdown.helper.forEach(options.extensions, _parseExtension);
    }
  }

  /**
   * Parse extension
   * @param {*} ext
   * @param {string} [name='']
   * @private
   */
  function _parseExtension (ext, name) {

    name = name || null;
    // If it's a string, the extension was previously loaded
    if (showdown.helper.isString(ext)) {
      ext = showdown.helper.stdExtName(ext);
      name = ext;

      // LEGACY_SUPPORT CODE
      if (showdown.extensions[ext]) {
        console.warn('DEPRECATION WARNING: ' + ext + ' is an old extension that uses a deprecated loading method.' +
          'Please inform the developer that the extension should be updated!');
        legacyExtensionLoading(showdown.extensions[ext], ext);
        return;
      // END LEGACY SUPPORT CODE

      } else if (!showdown.helper.isUndefined(extensions[ext])) {
        ext = extensions[ext];

      } else {
        throw Error('Extension "' + ext + '" could not be loaded. It was either not found or is not a valid extension.');
      }
    }

    if (typeof ext === 'function') {
      ext = ext();
    }

    if (!showdown.helper.isArray(ext)) {
      ext = [ext];
    }

    var validExt = validate(ext, name);
    if (!validExt.valid) {
      throw Error(validExt.error);
    }

    for (var i = 0; i < ext.length; ++i) {
      switch (ext[i].type) {

        case 'lang':
          langExtensions.push(ext[i]);
          break;

        case 'output':
          outputModifiers.push(ext[i]);
          break;
      }
      if (ext[i].hasOwnProperty('listeners')) {
        for (var ln in ext[i].listeners) {
          if (ext[i].listeners.hasOwnProperty(ln)) {
            listen(ln, ext[i].listeners[ln]);
          }
        }
      }
    }

  }

  /**
   * LEGACY_SUPPORT
   * @param {*} ext
   * @param {string} name
   */
  function legacyExtensionLoading (ext, name) {
    if (typeof ext === 'function') {
      ext = ext(new showdown.Converter());
    }
    if (!showdown.helper.isArray(ext)) {
      ext = [ext];
    }
    var valid = validate(ext, name);

    if (!valid.valid) {
      throw Error(valid.error);
    }

    for (var i = 0; i < ext.length; ++i) {
      switch (ext[i].type) {
        case 'lang':
          langExtensions.push(ext[i]);
          break;
        case 'output':
          outputModifiers.push(ext[i]);
          break;
        default:// should never reach here
          throw Error('Extension loader error: Type unrecognized!!!');
      }
    }
  }

  /**
   * Listen to an event
   * @param {string} name
   * @param {function} callback
   */
  function listen (name, callback) {
    if (!showdown.helper.isString(name)) {
      throw Error('Invalid argument in converter.listen() method: name must be a string, but ' + typeof name + ' given');
    }

    if (typeof callback !== 'function') {
      throw Error('Invalid argument in converter.listen() method: callback must be a function, but ' + typeof callback + ' given');
    }

    if (!listeners.hasOwnProperty(name)) {
      listeners[name] = [];
    }
    listeners[name].push(callback);
  }

  function rTrimInputText (text) {
    var rsp = text.match(/^\s*/)[0].length,
        rgx = new RegExp('^\\s{0,' + rsp + '}', 'gm');
    return text.replace(rgx, '');
  }

  /**
   * Dispatch an event
   * @private
   * @param {string} evtName Event name
   * @param {string} text Text
   * @param {{}} options Converter Options
   * @param {{}} globals
   * @returns {string}
   */
  this._dispatch = function dispatch (evtName, text, options, globals) {
    if (listeners.hasOwnProperty(evtName)) {
      for (var ei = 0; ei < listeners[evtName].length; ++ei) {
        var nText = listeners[evtName][ei](evtName, text, this, options, globals);
        if (nText && typeof nText !== 'undefined') {
          text = nText;
        }
      }
    }
    return text;
  };

  /**
   * Listen to an event
   * @param {string} name
   * @param {function} callback
   * @returns {showdown.Converter}
   */
  this.listen = function (name, callback) {
    listen(name, callback);
    return this;
  };

  /**
   * Converts a markdown string into HTML
   * @param {string} text
   * @returns {*}
   */
  this.makeHtml = function (text) {
    //check if text is not falsy
    if (!text) {
      return text;
    }

    var globals = {
      gHtmlBlocks:     [],
      gHtmlMdBlocks:   [],
      gHtmlSpans:      [],
      gUrls:           {},
      gTitles:         {},
      gDimensions:     {},
      gListLevel:      0,
      hashLinkCounts:  {},
      langExtensions:  langExtensions,
      outputModifiers: outputModifiers,
      converter:       this,
      ghCodeBlocks:    [],
      metadata: {
        parsed: {},
        raw: '',
        format: ''
      }
    };

    // This lets us use ¨ trema as an escape char to avoid md5 hashes
    // The choice of character is arbitrary; anything that isn't
    // magic in Markdown will work.
    text = text.replace(/¨/g, '¨T');

    // Replace $ with ¨D
    // RegExp interprets $ as a special character
    // when it's in a replacement string
    text = text.replace(/\$/g, '¨D');

    // Standardize line endings
    text = text.replace(/\r\n/g, '\n'); // DOS to Unix
    text = text.replace(/\r/g, '\n'); // Mac to Unix

    // Stardardize line spaces (nbsp causes trouble in older browsers and some regex flavors)
    text = text.replace(/\u00A0/g, ' ');

    if (options.smartIndentationFix) {
      text = rTrimInputText(text);
    }

    // Make sure text begins and ends with a couple of newlines:
    text = '\n\n' + text + '\n\n';

    // detab
    text = showdown.subParser('detab')(text, options, globals);

    /**
     * Strip any lines consisting only of spaces and tabs.
     * This makes subsequent regexs easier to write, because we can
     * match consecutive blank lines with /\n+/ instead of something
     * contorted like /[ \t]*\n+/
     */
    text = text.replace(/^[ \t]+$/mg, '');

    //run languageExtensions
    showdown.helper.forEach(langExtensions, function (ext) {
      text = showdown.subParser('runExtension')(ext, text, options, globals);
    });

    // run the sub parsers
    text = showdown.subParser('metadata')(text, options, globals);
    text = showdown.subParser('hashPreCodeTags')(text, options, globals);
    text = showdown.subParser('githubCodeBlocks')(text, options, globals);
    text = showdown.subParser('hashHTMLBlocks')(text, options, globals);
    text = showdown.subParser('hashCodeTags')(text, options, globals);
    text = showdown.subParser('stripLinkDefinitions')(text, options, globals);
    text = showdown.subParser('blockGamut')(text, options, globals);
    text = showdown.subParser('unhashHTMLSpans')(text, options, globals);
    text = showdown.subParser('unescapeSpecialChars')(text, options, globals);

    // attacklab: Restore dollar signs
    text = text.replace(/¨D/g, '$$');

    // attacklab: Restore tremas
    text = text.replace(/¨T/g, '¨');

    // render a complete html document instead of a partial if the option is enabled
    text = showdown.subParser('completeHTMLDocument')(text, options, globals);

    // Run output modifiers
    showdown.helper.forEach(outputModifiers, function (ext) {
      text = showdown.subParser('runExtension')(ext, text, options, globals);
    });

    // update metadata
    metadata = globals.metadata;
    return text;
  };

  /**
   * Set an option of this Converter instance
   * @param {string} key
   * @param {*} value
   */
  this.setOption = function (key, value) {
    options[key] = value;
  };

  /**
   * Get the option of this Converter instance
   * @param {string} key
   * @returns {*}
   */
  this.getOption = function (key) {
    return options[key];
  };

  /**
   * Get the options of this Converter instance
   * @returns {{}}
   */
  this.getOptions = function () {
    return options;
  };

  /**
   * Add extension to THIS converter
   * @param {{}} extension
   * @param {string} [name=null]
   */
  this.addExtension = function (extension, name) {
    name = name || null;
    _parseExtension(extension, name);
  };

  /**
   * Use a global registered extension with THIS converter
   * @param {string} extensionName Name of the previously registered extension
   */
  this.useExtension = function (extensionName) {
    _parseExtension(extensionName);
  };

  /**
   * Set the flavor THIS converter should use
   * @param {string} name
   */
  this.setFlavor = function (name) {
    if (!flavor.hasOwnProperty(name)) {
      throw Error(name + ' flavor was not found');
    }
    var preset = flavor[name];
    setConvFlavor = name;
    for (var option in preset) {
      if (preset.hasOwnProperty(option)) {
        options[option] = preset[option];
      }
    }
  };

  /**
   * Get the currently set flavor of this converter
   * @returns {string}
   */
  this.getFlavor = function () {
    return setConvFlavor;
  };

  /**
   * Remove an extension from THIS converter.
   * Note: This is a costly operation. It's better to initialize a new converter
   * and specify the extensions you wish to use
   * @param {Array} extension
   */
  this.removeExtension = function (extension) {
    if (!showdown.helper.isArray(extension)) {
      extension = [extension];
    }
    for (var a = 0; a < extension.length; ++a) {
      var ext = extension[a];
      for (var i = 0; i < langExtensions.length; ++i) {
        if (langExtensions[i] === ext) {
          langExtensions[i].splice(i, 1);
        }
      }
      for (var ii = 0; ii < outputModifiers.length; ++i) {
        if (outputModifiers[ii] === ext) {
          outputModifiers[ii].splice(i, 1);
        }
      }
    }
  };

  /**
   * Get all extension of THIS converter
   * @returns {{language: Array, output: Array}}
   */
  this.getAllExtensions = function () {
    return {
      language: langExtensions,
      output: outputModifiers
    };
  };

  /**
   * Get the metadata of the previously parsed document
   * @param raw
   * @returns {string|{}}
   */
  this.getMetadata = function (raw) {
    if (raw) {
      return metadata.raw;
    } else {
      return metadata.parsed;
    }
  };

  /**
   * Get the metadata format of the previously parsed document
   * @returns {string}
   */
  this.getMetadataFormat = function () {
    return metadata.format;
  };

  /**
   * Private: set a single key, value metadata pair
   * @param {string} key
   * @param {string} value
   */
  this._setMetadataPair = function (key, value) {
    metadata.parsed[key] = value;
  };

  /**
   * Private: set metadata format
   * @param {string} format
   */
  this._setMetadataFormat = function (format) {
    metadata.format = format;
  };

  /**
   * Private: set metadata raw text
   * @param {string} raw
   */
  this._setMetadataRaw = function (raw) {
    metadata.raw = raw;
  };
};

/**
 * Turn Markdown link shortcuts into XHTML <a> tags.
 */
showdown.subParser('anchors', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('anchors.before', text, options, globals);

  var writeAnchorTag = function (wholeMatch, linkText, linkId, url, m5, m6, title) {
    if (showdown.helper.isUndefined(title)) {
      title = '';
    }
    linkId = linkId.toLowerCase();

    // Special case for explicit empty url
    if (wholeMatch.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) {
      url = '';
    } else if (!url) {
      if (!linkId) {
        // lower-case and turn embedded newlines into spaces
        linkId = linkText.toLowerCase().replace(/ ?\n/g, ' ');
      }
      url = '#' + linkId;

      if (!showdown.helper.isUndefined(globals.gUrls[linkId])) {
        url = globals.gUrls[linkId];
        if (!showdown.helper.isUndefined(globals.gTitles[linkId])) {
          title = globals.gTitles[linkId];
        }
      } else {
        return wholeMatch;
      }
    }

    //url = showdown.helper.escapeCharacters(url, '*_', false); // replaced line to improve performance
    url = url.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);

    var result = '<a href="' + url + '"';

    if (title !== '' && title !== null) {
      title = title.replace(/"/g, '&quot;');
      //title = showdown.helper.escapeCharacters(title, '*_', false); // replaced line to improve performance
      title = title.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
      result += ' title="' + title + '"';
    }

    // optionLinksInNewWindow only applies
    // to external links. Hash links (#) open in same page
    if (options.openLinksInNewWindow && !/^#/.test(url)) {
      // escaped _
      result += ' target="¨E95Eblank"';
    }

    result += '>' + linkText + '</a>';

    return result;
  };

  // First, handle reference-style links: [link text] [id]
  text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)] ?(?:\n *)?\[(.*?)]()()()()/g, writeAnchorTag);

  // Next, inline-style links: [link text](url "optional title")
  // cases with crazy urls like ./image/cat1).png
  text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<([^>]*)>(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g,
    writeAnchorTag);

  // normal cases
  text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g,
                      writeAnchorTag);

  // handle reference-style shortcuts: [link text]
  // These must come last in case you've also got [link test][1]
  // or [link test](/foo)
  text = text.replace(/\[([^\[\]]+)]()()()()()/g, writeAnchorTag);

  // Lastly handle GithubMentions if option is enabled
  if (options.ghMentions) {
    text = text.replace(/(^|\s)(\\)?(@([a-z\d\-]+))(?=[.!?;,[\]()]|\s|$)/gmi, function (wm, st, escape, mentions, username) {
      if (escape === '\\') {
        return st + mentions;
      }

      //check if options.ghMentionsLink is a string
      if (!showdown.helper.isString(options.ghMentionsLink)) {
        throw new Error('ghMentionsLink option must be a string');
      }
      var lnk = options.ghMentionsLink.replace(/\{u}/g, username),
          target = '';
      if (options.openLinksInNewWindow) {
        target = ' target="¨E95Eblank"';
      }
      return st + '<a href="' + lnk + '"' + target + '>' + mentions + '</a>';
    });
  }

  text = globals.converter._dispatch('anchors.after', text, options, globals);
  return text;
});

// url allowed chars [a-z\d_.~:/?#[]@!$&'()*+,;=-]

var simpleURLRegex  = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+?\.[^'">\s]+?)()(\1)?(?=\s|$)(?!["<>])/gi,
    simpleURLRegex2 = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+?)([.!?,()\[\]])?(\1)?(?=\s|$)(?!["<>])/gi,
    delimUrlRegex   = /()<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)()>()/gi,
    simpleMailRegex = /(^|\s)(?:mailto:)?([A-Za-z0-9!#$%&'*+-/=?^_`{|}~.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?=$|\s)/gmi,
    delimMailRegex  = /<()(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi,

    replaceLink = function (options) {
      'use strict';
      return function (wm, leadingMagicChars, link, m2, m3, trailingPunctuation, trailingMagicChars) {
        link = link.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
        var lnkTxt = link,
            append = '',
            target = '',
            lmc    = leadingMagicChars || '',
            tmc    = trailingMagicChars || '';
        if (/^www\./i.test(link)) {
          link = link.replace(/^www\./i, 'http://www.');
        }
        if (options.excludeTrailingPunctuationFromURLs && trailingPunctuation) {
          append = trailingPunctuation;
        }
        if (options.openLinksInNewWindow) {
          target = ' target="¨E95Eblank"';
        }
        return lmc + '<a href="' + link + '"' + target + '>' + lnkTxt + '</a>' + append + tmc;
      };
    },

    replaceMail = function (options, globals) {
      'use strict';
      return function (wholeMatch, b, mail) {
        var href = 'mailto:';
        b = b || '';
        mail = showdown.subParser('unescapeSpecialChars')(mail, options, globals);
        if (options.encodeEmails) {
          href = showdown.helper.encodeEmailAddress(href + mail);
          mail = showdown.helper.encodeEmailAddress(mail);
        } else {
          href = href + mail;
        }
        return b + '<a href="' + href + '">' + mail + '</a>';
      };
    };

showdown.subParser('autoLinks', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('autoLinks.before', text, options, globals);

  text = text.replace(delimUrlRegex, replaceLink(options));
  text = text.replace(delimMailRegex, replaceMail(options, globals));

  text = globals.converter._dispatch('autoLinks.after', text, options, globals);

  return text;
});

showdown.subParser('simplifiedAutoLinks', function (text, options, globals) {
  'use strict';

  if (!options.simplifiedAutoLink) {
    return text;
  }

  text = globals.converter._dispatch('simplifiedAutoLinks.before', text, options, globals);

  if (options.excludeTrailingPunctuationFromURLs) {
    text = text.replace(simpleURLRegex2, replaceLink(options));
  } else {
    text = text.replace(simpleURLRegex, replaceLink(options));
  }
  text = text.replace(simpleMailRegex, replaceMail(options, globals));

  text = globals.converter._dispatch('simplifiedAutoLinks.after', text, options, globals);

  return text;
});

/**
 * These are all the transformations that form block-level
 * tags like paragraphs, headers, and list items.
 */
showdown.subParser('blockGamut', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('blockGamut.before', text, options, globals);

  // we parse blockquotes first so that we can have headings and hrs
  // inside blockquotes
  text = showdown.subParser('blockQuotes')(text, options, globals);
  text = showdown.subParser('headers')(text, options, globals);

  // Do Horizontal Rules:
  text = showdown.subParser('horizontalRule')(text, options, globals);

  text = showdown.subParser('lists')(text, options, globals);
  text = showdown.subParser('codeBlocks')(text, options, globals);
  text = showdown.subParser('tables')(text, options, globals);

  // We already ran _HashHTMLBlocks() before, in Markdown(), but that
  // was to escape raw HTML in the original Markdown source. This time,
  // we're escaping the markup we've just created, so that we don't wrap
  // <p> tags around block-level tags.
  text = showdown.subParser('hashHTMLBlocks')(text, options, globals);
  text = showdown.subParser('paragraphs')(text, options, globals);

  text = globals.converter._dispatch('blockGamut.after', text, options, globals);

  return text;
});

showdown.subParser('blockQuotes', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('blockQuotes.before', text, options, globals);

  // add a couple extra lines after the text and endtext mark
  text = text + '\n\n';

  var rgx = /(^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+/gm;

  if (options.splitAdjacentBlockquotes) {
    rgx = /^ {0,3}>[\s\S]*?(?:\n\n)/gm;
  }

  text = text.replace(rgx, function (bq) {
    // attacklab: hack around Konqueror 3.5.4 bug:
    // "----------bug".replace(/^-/g,"") == "bug"
    bq = bq.replace(/^[ \t]*>[ \t]?/gm, ''); // trim one level of quoting

    // attacklab: clean up hack
    bq = bq.replace(/¨0/g, '');

    bq = bq.replace(/^[ \t]+$/gm, ''); // trim whitespace-only lines
    bq = showdown.subParser('githubCodeBlocks')(bq, options, globals);
    bq = showdown.subParser('blockGamut')(bq, options, globals); // recurse

    bq = bq.replace(/(^|\n)/g, '$1  ');
    // These leading spaces screw with <pre> content, so we need to fix that:
    bq = bq.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function (wholeMatch, m1) {
      var pre = m1;
      // attacklab: hack around Konqueror 3.5.4 bug:
      pre = pre.replace(/^  /mg, '¨0');
      pre = pre.replace(/¨0/g, '');
      return pre;
    });

    return showdown.subParser('hashBlock')('<blockquote>\n' + bq + '\n</blockquote>', options, globals);
  });

  text = globals.converter._dispatch('blockQuotes.after', text, options, globals);
  return text;
});

/**
 * Process Markdown `<pre><code>` blocks.
 */
showdown.subParser('codeBlocks', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('codeBlocks.before', text, options, globals);

  // sentinel workarounds for lack of \A and \Z, safari\khtml bug
  text += '¨0';

  var pattern = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=¨0))/g;
  text = text.replace(pattern, function (wholeMatch, m1, m2) {
    var codeblock = m1,
        nextChar = m2,
        end = '\n';

    codeblock = showdown.subParser('outdent')(codeblock, options, globals);
    codeblock = showdown.subParser('encodeCode')(codeblock, options, globals);
    codeblock = showdown.subParser('detab')(codeblock, options, globals);
    codeblock = codeblock.replace(/^\n+/g, ''); // trim leading newlines
    codeblock = codeblock.replace(/\n+$/g, ''); // trim trailing newlines

    if (options.omitExtraWLInCodeBlocks) {
      end = '';
    }

    codeblock = '<pre><code>' + codeblock + end + '</code></pre>';

    return showdown.subParser('hashBlock')(codeblock, options, globals) + nextChar;
  });

  // strip sentinel
  text = text.replace(/¨0/, '');

  text = globals.converter._dispatch('codeBlocks.after', text, options, globals);
  return text;
});

/**
 *
 *   *  Backtick quotes are used for <code></code> spans.
 *
 *   *  You can use multiple backticks as the delimiters if you want to
 *     include literal backticks in the code span. So, this input:
 *
 *         Just type ``foo `bar` baz`` at the prompt.
 *
 *       Will translate to:
 *
 *         <p>Just type <code>foo `bar` baz</code> at the prompt.</p>
 *
 *    There's no arbitrary limit to the number of backticks you
 *    can use as delimters. If you need three consecutive backticks
 *    in your code, use four for delimiters, etc.
 *
 *  *  You can use spaces to get literal backticks at the edges:
 *
 *         ... type `` `bar` `` ...
 *
 *       Turns to:
 *
 *         ... type <code>`bar`</code> ...
 */
showdown.subParser('codeSpans', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('codeSpans.before', text, options, globals);

  if (typeof(text) === 'undefined') {
    text = '';
  }
  text = text.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,
    function (wholeMatch, m1, m2, m3) {
      var c = m3;
      c = c.replace(/^([ \t]*)/g, '');	// leading whitespace
      c = c.replace(/[ \t]*$/g, '');	// trailing whitespace
      c = showdown.subParser('encodeCode')(c, options, globals);
      c = m1 + '<code>' + c + '</code>';
      c = showdown.subParser('hashHTMLSpans')(c, options, globals);
      return c;
    }
  );

  text = globals.converter._dispatch('codeSpans.after', text, options, globals);
  return text;
});

/**
 * Turn Markdown link shortcuts into XHTML <a> tags.
 */
showdown.subParser('completeHTMLDocument', function (text, options, globals) {
  'use strict';

  if (!options.completeHTMLDocument) {
    return text;
  }

  text = globals.converter._dispatch('completeHTMLDocument.before', text, options, globals);

  var doctype = 'html',
      doctypeParsed = '<!DOCTYPE HTML>\n',
      title = '',
      charset = '<meta charset="utf-8">\n',
      lang = '',
      metadata = '';

  if (typeof globals.metadata.parsed.doctype !== 'undefined') {
    doctypeParsed = '<!DOCTYPE ' +  globals.metadata.parsed.doctype + '>\n';
    doctype = globals.metadata.parsed.doctype.toString().toLowerCase();
    if (doctype === 'html' || doctype === 'html5') {
      charset = '<meta charset="utf-8">';
    }
  }

  for (var meta in globals.metadata.parsed) {
    if (globals.metadata.parsed.hasOwnProperty(meta)) {
      switch (meta.toLowerCase()) {
        case 'doctype':
          break;

        case 'title':
          title = '<title>' +  globals.metadata.parsed.title + '</title>\n';
          break;

        case 'charset':
          if (doctype === 'html' || doctype === 'html5') {
            charset = '<meta charset="' + globals.metadata.parsed.charset + '">\n';
          } else {
            charset = '<meta name="charset" content="' + globals.metadata.parsed.charset + '">\n';
          }
          break;

        case 'language':
        case 'lang':
          lang = ' lang="' + globals.metadata.parsed[meta] + '"';
          metadata += '<meta name="' + meta + '" content="' + globals.metadata.parsed[meta] + '">\n';
          break;

        default:
          metadata += '<meta name="' + meta + '" content="' + globals.metadata.parsed[meta] + '">\n';
      }
    }
  }

  text = doctypeParsed + '<html' + lang + '>\n<head>\n' + title + charset + metadata + '</head>\n<body>\n' + text.trim() + '\n</body>\n</html>';

  text = globals.converter._dispatch('completeHTMLDocument.after', text, options, globals);
  return text;
});

/**
 * Convert all tabs to spaces
 */
showdown.subParser('detab', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('detab.before', text, options, globals);

  // expand first n-1 tabs
  text = text.replace(/\t(?=\t)/g, '    '); // g_tab_width

  // replace the nth with two sentinels
  text = text.replace(/\t/g, '¨A¨B');

  // use the sentinel to anchor our regex so it doesn't explode
  text = text.replace(/¨B(.+?)¨A/g, function (wholeMatch, m1) {
    var leadingText = m1,
        numSpaces = 4 - leadingText.length % 4;  // g_tab_width

    // there *must* be a better way to do this:
    for (var i = 0; i < numSpaces; i++) {
      leadingText += ' ';
    }

    return leadingText;
  });

  // clean up sentinels
  text = text.replace(/¨A/g, '    ');  // g_tab_width
  text = text.replace(/¨B/g, '');

  text = globals.converter._dispatch('detab.after', text, options, globals);
  return text;
});

showdown.subParser('ellipsis', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('ellipsis.before', text, options, globals);

  text = text.replace(/\.\.\./g, '…');

  text = globals.converter._dispatch('ellipsis.after', text, options, globals);

  return text;
});

/**
 * These are all the transformations that occur *within* block-level
 * tags like paragraphs, headers, and list items.
 */
showdown.subParser('emoji', function (text, options, globals) {
  'use strict';

  if (!options.emoji) {
    return text;
  }

  text = globals.converter._dispatch('emoji.before', text, options, globals);

  var emojiRgx = /:([\S]+?):/g;

  text = text.replace(emojiRgx, function (wm, emojiCode) {
    if (showdown.helper.emojis.hasOwnProperty(emojiCode)) {
      return showdown.helper.emojis[emojiCode];
    }
    return wm;
  });

  text = globals.converter._dispatch('emoji.after', text, options, globals);

  return text;
});

/**
 * Smart processing for ampersands and angle brackets that need to be encoded.
 */
showdown.subParser('encodeAmpsAndAngles', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('encodeAmpsAndAngles.before', text, options, globals);

  // Ampersand-encoding based entirely on Nat Irons's Amputator MT plugin:
  // http://bumppo.net/projects/amputator/
  text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, '&amp;');

  // Encode naked <'s
  text = text.replace(/<(?![a-z\/?$!])/gi, '&lt;');

  // Encode <
  text = text.replace(/</g, '&lt;');

  // Encode >
  text = text.replace(/>/g, '&gt;');

  text = globals.converter._dispatch('encodeAmpsAndAngles.after', text, options, globals);
  return text;
});

/**
 * Returns the string, with after processing the following backslash escape sequences.
 *
 * attacklab: The polite way to do this is with the new escapeCharacters() function:
 *
 *    text = escapeCharacters(text,"\\",true);
 *    text = escapeCharacters(text,"`*_{}[]()>#+-.!",true);
 *
 * ...but we're sidestepping its use of the (slow) RegExp constructor
 * as an optimization for Firefox.  This function gets called a LOT.
 */
showdown.subParser('encodeBackslashEscapes', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('encodeBackslashEscapes.before', text, options, globals);

  text = text.replace(/\\(\\)/g, showdown.helper.escapeCharactersCallback);
  text = text.replace(/\\([`*_{}\[\]()>#+.!~=|-])/g, showdown.helper.escapeCharactersCallback);

  text = globals.converter._dispatch('encodeBackslashEscapes.after', text, options, globals);
  return text;
});

/**
 * Encode/escape certain characters inside Markdown code runs.
 * The point is that in code, these characters are literals,
 * and lose their special Markdown meanings.
 */
showdown.subParser('encodeCode', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('encodeCode.before', text, options, globals);

  // Encode all ampersands; HTML entities are not
  // entities within a Markdown code span.
  text = text
    .replace(/&/g, '&amp;')
  // Do the angle bracket song and dance:
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  // Now, escape characters that are magic in Markdown:
    .replace(/([*_{}\[\]\\=~-])/g, showdown.helper.escapeCharactersCallback);

  text = globals.converter._dispatch('encodeCode.after', text, options, globals);
  return text;
});

/**
 * Within tags -- meaning between < and > -- encode [\ ` * _ ~ =] so they
 * don't conflict with their use in Markdown for code, italics and strong.
 */
showdown.subParser('escapeSpecialCharsWithinTagAttributes', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('escapeSpecialCharsWithinTagAttributes.before', text, options, globals);

  // Build a regex to find HTML tags.
  var tags     = /<\/?[a-z\d_:-]+(?:[\s]+[\s\S]+?)?>/gi,
      comments = /<!(--(?:(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>/gi;

  text = text.replace(tags, function (wholeMatch) {
    return wholeMatch
      .replace(/(.)<\/?code>(?=.)/g, '$1`')
      .replace(/([\\`*_~=|])/g, showdown.helper.escapeCharactersCallback);
  });

  text = text.replace(comments, function (wholeMatch) {
    return wholeMatch
      .replace(/([\\`*_~=|])/g, showdown.helper.escapeCharactersCallback);
  });

  text = globals.converter._dispatch('escapeSpecialCharsWithinTagAttributes.after', text, options, globals);
  return text;
});

/**
 * Handle github codeblocks prior to running HashHTML so that
 * HTML contained within the codeblock gets escaped properly
 * Example:
 * ```ruby
 *     def hello_world(x)
 *       puts "Hello, #{x}"
 *     end
 * ```
 */
showdown.subParser('githubCodeBlocks', function (text, options, globals) {
  'use strict';

  // early exit if option is not enabled
  if (!options.ghCodeBlocks) {
    return text;
  }

  text = globals.converter._dispatch('githubCodeBlocks.before', text, options, globals);

  text += '¨0';

  text = text.replace(/(?:^|\n)(```+|~~~+)([^\s`~]*)\n([\s\S]*?)\n\1/g, function (wholeMatch, delim, language, codeblock) {
    var end = (options.omitExtraWLInCodeBlocks) ? '' : '\n';

    // First parse the github code block
    codeblock = showdown.subParser('encodeCode')(codeblock, options, globals);
    codeblock = showdown.subParser('detab')(codeblock, options, globals);
    codeblock = codeblock.replace(/^\n+/g, ''); // trim leading newlines
    codeblock = codeblock.replace(/\n+$/g, ''); // trim trailing whitespace

    codeblock = '<pre><code' + (language ? ' class="' + language + ' language-' + language + '"' : '') + '>' + codeblock + end + '</code></pre>';

    codeblock = showdown.subParser('hashBlock')(codeblock, options, globals);

    // Since GHCodeblocks can be false positives, we need to
    // store the primitive text and the parsed text in a global var,
    // and then return a token
    return '\n\n¨G' + (globals.ghCodeBlocks.push({text: wholeMatch, codeblock: codeblock}) - 1) + 'G\n\n';
  });

  // attacklab: strip sentinel
  text = text.replace(/¨0/, '');

  return globals.converter._dispatch('githubCodeBlocks.after', text, options, globals);
});

showdown.subParser('hashBlock', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('hashBlock.before', text, options, globals);
  text = text.replace(/(^\n+|\n+$)/g, '');
  text = '\n\n¨K' + (globals.gHtmlBlocks.push(text) - 1) + 'K\n\n';
  text = globals.converter._dispatch('hashBlock.after', text, options, globals);
  return text;
});

/**
 * Hash and escape <code> elements that should not be parsed as markdown
 */
showdown.subParser('hashCodeTags', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('hashCodeTags.before', text, options, globals);

  var repFunc = function (wholeMatch, match, left, right) {
    var codeblock = left + showdown.subParser('encodeCode')(match, options, globals) + right;
    return '¨C' + (globals.gHtmlSpans.push(codeblock) - 1) + 'C';
  };

  // Hash naked <code>
  text = showdown.helper.replaceRecursiveRegExp(text, repFunc, '<code\\b[^>]*>', '</code>', 'gim');

  text = globals.converter._dispatch('hashCodeTags.after', text, options, globals);
  return text;
});

showdown.subParser('hashElement', function (text, options, globals) {
  'use strict';

  return function (wholeMatch, m1) {
    var blockText = m1;

    // Undo double lines
    blockText = blockText.replace(/\n\n/g, '\n');
    blockText = blockText.replace(/^\n/, '');

    // strip trailing blank lines
    blockText = blockText.replace(/\n+$/g, '');

    // Replace the element text with a marker ("¨KxK" where x is its key)
    blockText = '\n\n¨K' + (globals.gHtmlBlocks.push(blockText) - 1) + 'K\n\n';

    return blockText;
  };
});

showdown.subParser('hashHTMLBlocks', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('hashHTMLBlocks.before', text, options, globals);

  var blockTags = [
        'pre',
        'div',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'blockquote',
        'table',
        'dl',
        'ol',
        'ul',
        'script',
        'noscript',
        'form',
        'fieldset',
        'iframe',
        'math',
        'style',
        'section',
        'header',
        'footer',
        'nav',
        'article',
        'aside',
        'address',
        'audio',
        'canvas',
        'figure',
        'hgroup',
        'output',
        'video',
        'p'
      ],
      repFunc = function (wholeMatch, match, left, right) {
        var txt = wholeMatch;
        // check if this html element is marked as markdown
        // if so, it's contents should be parsed as markdown
        if (left.search(/\bmarkdown\b/) !== -1) {
          txt = left + globals.converter.makeHtml(match) + right;
        }
        return '\n\n¨K' + (globals.gHtmlBlocks.push(txt) - 1) + 'K\n\n';
      };

  if (options.backslashEscapesHTMLTags) {
    // encode backslash escaped HTML tags
    text = text.replace(/\\<(\/?[^>]+?)>/g, function (wm, inside) {
      return '&lt;' + inside + '&gt;';
    });
  }

  // hash HTML Blocks
  for (var i = 0; i < blockTags.length; ++i) {

    var opTagPos,
        rgx1     = new RegExp('^ {0,3}(<' + blockTags[i] + '\\b[^>]*>)', 'im'),
        patLeft  = '<' + blockTags[i] + '\\b[^>]*>',
        patRight = '</' + blockTags[i] + '>';
    // 1. Look for the first position of the first opening HTML tag in the text
    while ((opTagPos = showdown.helper.regexIndexOf(text, rgx1)) !== -1) {

      // if the HTML tag is \ escaped, we need to escape it and break


      //2. Split the text in that position
      var subTexts = showdown.helper.splitAtIndex(text, opTagPos),
      //3. Match recursively
          newSubText1 = showdown.helper.replaceRecursiveRegExp(subTexts[1], repFunc, patLeft, patRight, 'im');

      // prevent an infinite loop
      if (newSubText1 === subTexts[1]) {
        break;
      }
      text = subTexts[0].concat(newSubText1);
    }
  }
  // HR SPECIAL CASE
  text = text.replace(/(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,
    showdown.subParser('hashElement')(text, options, globals));

  // Special case for standalone HTML comments
  text = showdown.helper.replaceRecursiveRegExp(text, function (txt) {
    return '\n\n¨K' + (globals.gHtmlBlocks.push(txt) - 1) + 'K\n\n';
  }, '^ {0,3}<!--', '-->', 'gm');

  // PHP and ASP-style processor instructions (<?...?> and <%...%>)
  text = text.replace(/(?:\n\n)( {0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,
    showdown.subParser('hashElement')(text, options, globals));

  text = globals.converter._dispatch('hashHTMLBlocks.after', text, options, globals);
  return text;
});

/**
 * Hash span elements that should not be parsed as markdown
 */
showdown.subParser('hashHTMLSpans', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('hashHTMLSpans.before', text, options, globals);

  function hashHTMLSpan (html) {
    return '¨C' + (globals.gHtmlSpans.push(html) - 1) + 'C';
  }

  // Hash Self Closing tags
  text = text.replace(/<[^>]+?\/>/gi, function (wm) {
    return hashHTMLSpan(wm);
  });

  // Hash tags without properties
  text = text.replace(/<([^>]+?)>[\s\S]*?<\/\1>/g, function (wm) {
    return hashHTMLSpan(wm);
  });

  // Hash tags with properties
  text = text.replace(/<([^>]+?)\s[^>]+?>[\s\S]*?<\/\1>/g, function (wm) {
    return hashHTMLSpan(wm);
  });

  // Hash self closing tags without />
  text = text.replace(/<[^>]+?>/gi, function (wm) {
    return hashHTMLSpan(wm);
  });

  /*showdown.helper.matchRecursiveRegExp(text, '<code\\b[^>]*>', '</code>', 'gi');*/

  text = globals.converter._dispatch('hashHTMLSpans.after', text, options, globals);
  return text;
});

/**
 * Unhash HTML spans
 */
showdown.subParser('unhashHTMLSpans', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('unhashHTMLSpans.before', text, options, globals);

  for (var i = 0; i < globals.gHtmlSpans.length; ++i) {
    var repText = globals.gHtmlSpans[i],
        // limiter to prevent infinite loop (assume 10 as limit for recurse)
        limit = 0;

    while (/¨C(\d+)C/.test(repText)) {
      var num = RegExp.$1;
      repText = repText.replace('¨C' + num + 'C', globals.gHtmlSpans[num]);
      if (limit === 10) {
        console.error('maximum nesting of 10 spans reached!!!');
        break;
      }
      ++limit;
    }
    text = text.replace('¨C' + i + 'C', repText);
  }

  text = globals.converter._dispatch('unhashHTMLSpans.after', text, options, globals);
  return text;
});

/**
 * Hash and escape <pre><code> elements that should not be parsed as markdown
 */
showdown.subParser('hashPreCodeTags', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('hashPreCodeTags.before', text, options, globals);

  var repFunc = function (wholeMatch, match, left, right) {
    // encode html entities
    var codeblock = left + showdown.subParser('encodeCode')(match, options, globals) + right;
    return '\n\n¨G' + (globals.ghCodeBlocks.push({text: wholeMatch, codeblock: codeblock}) - 1) + 'G\n\n';
  };

  // Hash <pre><code>
  text = showdown.helper.replaceRecursiveRegExp(text, repFunc, '^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>', '^ {0,3}</code>\\s*</pre>', 'gim');

  text = globals.converter._dispatch('hashPreCodeTags.after', text, options, globals);
  return text;
});

showdown.subParser('headers', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('headers.before', text, options, globals);

  var headerLevelStart = (isNaN(parseInt(options.headerLevelStart))) ? 1 : parseInt(options.headerLevelStart),

  // Set text-style headers:
  //	Header 1
  //	========
  //
  //	Header 2
  //	--------
  //
      setextRegexH1 = (options.smoothLivePreview) ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm,
      setextRegexH2 = (options.smoothLivePreview) ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;

  text = text.replace(setextRegexH1, function (wholeMatch, m1) {

    var spanGamut = showdown.subParser('spanGamut')(m1, options, globals),
        hID = (options.noHeaderId) ? '' : ' id="' + headerId(m1) + '"',
        hLevel = headerLevelStart,
        hashBlock = '<h' + hLevel + hID + '>' + spanGamut + '</h' + hLevel + '>';
    return showdown.subParser('hashBlock')(hashBlock, options, globals);
  });

  text = text.replace(setextRegexH2, function (matchFound, m1) {
    var spanGamut = showdown.subParser('spanGamut')(m1, options, globals),
        hID = (options.noHeaderId) ? '' : ' id="' + headerId(m1) + '"',
        hLevel = headerLevelStart + 1,
        hashBlock = '<h' + hLevel + hID + '>' + spanGamut + '</h' + hLevel + '>';
    return showdown.subParser('hashBlock')(hashBlock, options, globals);
  });

  // atx-style headers:
  //  # Header 1
  //  ## Header 2
  //  ## Header 2 with closing hashes ##
  //  ...
  //  ###### Header 6
  //
  var atxStyle = (options.requireSpaceBeforeHeadingText) ? /^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm : /^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm;

  text = text.replace(atxStyle, function (wholeMatch, m1, m2) {
    var hText = m2;
    if (options.customizedHeaderId) {
      hText = m2.replace(/\s?\{([^{]+?)}\s*$/, '');
    }

    var span = showdown.subParser('spanGamut')(hText, options, globals),
        hID = (options.noHeaderId) ? '' : ' id="' + headerId(m2) + '"',
        hLevel = headerLevelStart - 1 + m1.length,
        header = '<h' + hLevel + hID + '>' + span + '</h' + hLevel + '>';

    return showdown.subParser('hashBlock')(header, options, globals);
  });

  function headerId (m) {
    var title,
        prefix;

    // It is separate from other options to allow combining prefix and customized
    if (options.customizedHeaderId) {
      var match = m.match(/\{([^{]+?)}\s*$/);
      if (match && match[1]) {
        m = match[1];
      }
    }

    title = m;

    // Prefix id to prevent causing inadvertent pre-existing style matches.
    if (showdown.helper.isString(options.prefixHeaderId)) {
      prefix = options.prefixHeaderId;
    } else if (options.prefixHeaderId === true) {
      prefix = 'section-';
    } else {
      prefix = '';
    }

    if (!options.rawPrefixHeaderId) {
      title = prefix + title;
    }

    if (options.ghCompatibleHeaderId) {
      title = title
        .replace(/ /g, '-')
        // replace previously escaped chars (&, ¨ and $)
        .replace(/&amp;/g, '')
        .replace(/¨T/g, '')
        .replace(/¨D/g, '')
        // replace rest of the chars (&~$ are repeated as they might have been escaped)
        // borrowed from github's redcarpet (some they should produce similar results)
        .replace(/[&+$,\/:;=?@"#{}|^¨~\[\]`\\*)(%.!'<>]/g, '')
        .toLowerCase();
    } else if (options.rawHeaderId) {
      title = title
        .replace(/ /g, '-')
        // replace previously escaped chars (&, ¨ and $)
        .replace(/&amp;/g, '&')
        .replace(/¨T/g, '¨')
        .replace(/¨D/g, '$')
        // replace " and '
        .replace(/["']/g, '-')
        .toLowerCase();
    } else {
      title = title
        .replace(/[^\w]/g, '')
        .toLowerCase();
    }

    if (options.rawPrefixHeaderId) {
      title = prefix + title;
    }

    if (globals.hashLinkCounts[title]) {
      title = title + '-' + (globals.hashLinkCounts[title]++);
    } else {
      globals.hashLinkCounts[title] = 1;
    }
    return title;
  }

  text = globals.converter._dispatch('headers.after', text, options, globals);
  return text;
});

/**
 * Turn Markdown link shortcuts into XHTML <a> tags.
 */
showdown.subParser('horizontalRule', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('horizontalRule.before', text, options, globals);

  var key = showdown.subParser('hashBlock')('<hr />', options, globals);
  text = text.replace(/^ {0,2}( ?-){3,}[ \t]*$/gm, key);
  text = text.replace(/^ {0,2}( ?\*){3,}[ \t]*$/gm, key);
  text = text.replace(/^ {0,2}( ?_){3,}[ \t]*$/gm, key);

  text = globals.converter._dispatch('horizontalRule.after', text, options, globals);
  return text;
});

/**
 * Turn Markdown image shortcuts into <img> tags.
 */
showdown.subParser('images', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('images.before', text, options, globals);

  var inlineRegExp      = /!\[([^\]]*?)][ \t]*()\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g,
      crazyRegExp       = /!\[([^\]]*?)][ \t]*()\([ \t]?<([^>]*)>(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(?:(["'])([^"]*?)\6))?[ \t]?\)/g,
      base64RegExp      = /!\[([^\]]*?)][ \t]*()\([ \t]?<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g,
      referenceRegExp   = /!\[([^\]]*?)] ?(?:\n *)?\[([\s\S]*?)]()()()()()/g,
      refShortcutRegExp = /!\[([^\[\]]+)]()()()()()/g;

  function writeImageTagBase64 (wholeMatch, altText, linkId, url, width, height, m5, title) {
    url = url.replace(/\s/g, '');
    return writeImageTag (wholeMatch, altText, linkId, url, width, height, m5, title);
  }

  function writeImageTag (wholeMatch, altText, linkId, url, width, height, m5, title) {

    var gUrls   = globals.gUrls,
        gTitles = globals.gTitles,
        gDims   = globals.gDimensions;

    linkId = linkId.toLowerCase();

    if (!title) {
      title = '';
    }
    // Special case for explicit empty url
    if (wholeMatch.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) {
      url = '';

    } else if (url === '' || url === null) {
      if (linkId === '' || linkId === null) {
        // lower-case and turn embedded newlines into spaces
        linkId = altText.toLowerCase().replace(/ ?\n/g, ' ');
      }
      url = '#' + linkId;

      if (!showdown.helper.isUndefined(gUrls[linkId])) {
        url = gUrls[linkId];
        if (!showdown.helper.isUndefined(gTitles[linkId])) {
          title = gTitles[linkId];
        }
        if (!showdown.helper.isUndefined(gDims[linkId])) {
          width = gDims[linkId].width;
          height = gDims[linkId].height;
        }
      } else {
        return wholeMatch;
      }
    }

    altText = altText
      .replace(/"/g, '&quot;')
    //altText = showdown.helper.escapeCharacters(altText, '*_', false);
      .replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
    //url = showdown.helper.escapeCharacters(url, '*_', false);
    url = url.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
    var result = '<img src="' + url + '" alt="' + altText + '"';

    if (title) {
      title = title
        .replace(/"/g, '&quot;')
      //title = showdown.helper.escapeCharacters(title, '*_', false);
        .replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
      result += ' title="' + title + '"';
    }

    if (width && height) {
      width  = (width === '*') ? 'auto' : width;
      height = (height === '*') ? 'auto' : height;

      result += ' width="' + width + '"';
      result += ' height="' + height + '"';
    }

    result += ' />';

    return result;
  }

  // First, handle reference-style labeled images: ![alt text][id]
  text = text.replace(referenceRegExp, writeImageTag);

  // Next, handle inline images:  ![alt text](url =<width>x<height> "optional title")

  // base64 encoded images
  text = text.replace(base64RegExp, writeImageTagBase64);

  // cases with crazy urls like ./image/cat1).png
  text = text.replace(crazyRegExp, writeImageTag);

  // normal cases
  text = text.replace(inlineRegExp, writeImageTag);

  // handle reference-style shortcuts: ![img text]
  text = text.replace(refShortcutRegExp, writeImageTag);

  text = globals.converter._dispatch('images.after', text, options, globals);
  return text;
});

showdown.subParser('italicsAndBold', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('italicsAndBold.before', text, options, globals);

  // it's faster to have 3 separate regexes for each case than have just one
  // because of backtracing, in some cases, it could lead to an exponential effect
  // called "catastrophic backtrace". Ominous!

  function parseInside (txt, left, right) {
    /*
    if (options.simplifiedAutoLink) {
      txt = showdown.subParser('simplifiedAutoLinks')(txt, options, globals);
    }
    */
    return left + txt + right;
  }

  // Parse underscores
  if (options.literalMidWordUnderscores) {
    text = text.replace(/\b___(\S[\s\S]*)___\b/g, function (wm, txt) {
      return parseInside (txt, '<strong><em>', '</em></strong>');
    });
    text = text.replace(/\b__(\S[\s\S]*)__\b/g, function (wm, txt) {
      return parseInside (txt, '<strong>', '</strong>');
    });
    text = text.replace(/\b_(\S[\s\S]*?)_\b/g, function (wm, txt) {
      return parseInside (txt, '<em>', '</em>');
    });
  } else {
    text = text.replace(/___(\S[\s\S]*?)___/g, function (wm, m) {
      return (/\S$/.test(m)) ? parseInside (m, '<strong><em>', '</em></strong>') : wm;
    });
    text = text.replace(/__(\S[\s\S]*?)__/g, function (wm, m) {
      return (/\S$/.test(m)) ? parseInside (m, '<strong>', '</strong>') : wm;
    });
    text = text.replace(/_([^\s_][\s\S]*?)_/g, function (wm, m) {
      // !/^_[^_]/.test(m) - test if it doesn't start with __ (since it seems redundant, we removed it)
      return (/\S$/.test(m)) ? parseInside (m, '<em>', '</em>') : wm;
    });
  }

  // Now parse asterisks
  if (options.literalMidWordAsterisks) {
    text = text.replace(/([^*]|^)\B\*\*\*(\S[\s\S]+?)\*\*\*\B(?!\*)/g, function (wm, lead, txt) {
      return parseInside (txt, lead + '<strong><em>', '</em></strong>');
    });
    text = text.replace(/([^*]|^)\B\*\*(\S[\s\S]+?)\*\*\B(?!\*)/g, function (wm, lead, txt) {
      return parseInside (txt, lead + '<strong>', '</strong>');
    });
    text = text.replace(/([^*]|^)\B\*(\S[\s\S]+?)\*\B(?!\*)/g, function (wm, lead, txt) {
      return parseInside (txt, lead + '<em>', '</em>');
    });
  } else {
    text = text.replace(/\*\*\*(\S[\s\S]*?)\*\*\*/g, function (wm, m) {
      return (/\S$/.test(m)) ? parseInside (m, '<strong><em>', '</em></strong>') : wm;
    });
    text = text.replace(/\*\*(\S[\s\S]*?)\*\*/g, function (wm, m) {
      return (/\S$/.test(m)) ? parseInside (m, '<strong>', '</strong>') : wm;
    });
    text = text.replace(/\*([^\s*][\s\S]*?)\*/g, function (wm, m) {
      // !/^\*[^*]/.test(m) - test if it doesn't start with ** (since it seems redundant, we removed it)
      return (/\S$/.test(m)) ? parseInside (m, '<em>', '</em>') : wm;
    });
  }


  text = globals.converter._dispatch('italicsAndBold.after', text, options, globals);
  return text;
});

/**
 * Form HTML ordered (numbered) and unordered (bulleted) lists.
 */
showdown.subParser('lists', function (text, options, globals) {
  'use strict';

  /**
   * Process the contents of a single ordered or unordered list, splitting it
   * into individual list items.
   * @param {string} listStr
   * @param {boolean} trimTrailing
   * @returns {string}
   */
  function processListItems (listStr, trimTrailing) {
    // The $g_list_level global keeps track of when we're inside a list.
    // Each time we enter a list, we increment it; when we leave a list,
    // we decrement. If it's zero, we're not in a list anymore.
    //
    // We do this because when we're not inside a list, we want to treat
    // something like this:
    //
    //    I recommend upgrading to version
    //    8. Oops, now this line is treated
    //    as a sub-list.
    //
    // As a single paragraph, despite the fact that the second line starts
    // with a digit-period-space sequence.
    //
    // Whereas when we're inside a list (or sub-list), that line will be
    // treated as the start of a sub-list. What a kludge, huh? This is
    // an aspect of Markdown's syntax that's hard to parse perfectly
    // without resorting to mind-reading. Perhaps the solution is to
    // change the syntax rules such that sub-lists must start with a
    // starting cardinal number; e.g. "1." or "a.".
    globals.gListLevel++;

    // trim trailing blank lines:
    listStr = listStr.replace(/\n{2,}$/, '\n');

    // attacklab: add sentinel to emulate \z
    listStr += '¨0';

    var rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0| {0,3}([*+-]|\d+[.])[ \t]+))/gm,
        isParagraphed = (/\n[ \t]*\n(?!¨0)/.test(listStr));

    // Since version 1.5, nesting sublists requires 4 spaces (or 1 tab) indentation,
    // which is a syntax breaking change
    // activating this option reverts to old behavior
    if (options.disableForced4SpacesIndentedSublists) {
      rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0|\2([*+-]|\d+[.])[ \t]+))/gm;
    }

    listStr = listStr.replace(rgx, function (wholeMatch, m1, m2, m3, m4, taskbtn, checked) {
      checked = (checked && checked.trim() !== '');

      var item = showdown.subParser('outdent')(m4, options, globals),
          bulletStyle = '';

      // Support for github tasklists
      if (taskbtn && options.tasklists) {
        bulletStyle = ' class="task-list-item" style="list-style-type: none;"';
        item = item.replace(/^[ \t]*\[(x|X| )?]/m, function () {
          var otp = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
          if (checked) {
            otp += ' checked';
          }
          otp += '>';
          return otp;
        });
      }

      // ISSUE #312
      // This input: - - - a
      // causes trouble to the parser, since it interprets it as:
      // <ul><li><li><li>a</li></li></li></ul>
      // instead of:
      // <ul><li>- - a</li></ul>
      // So, to prevent it, we will put a marker (¨A)in the beginning of the line
      // Kind of hackish/monkey patching, but seems more effective than overcomplicating the list parser
      item = item.replace(/^([-*+]|\d\.)[ \t]+[\S\n ]*/g, function (wm2) {
        return '¨A' + wm2;
      });

      // m1 - Leading line or
      // Has a double return (multi paragraph) or
      // Has sublist
      if (m1 || (item.search(/\n{2,}/) > -1)) {
        item = showdown.subParser('githubCodeBlocks')(item, options, globals);
        item = showdown.subParser('blockGamut')(item, options, globals);
      } else {
        // Recursion for sub-lists:
        item = showdown.subParser('lists')(item, options, globals);
        item = item.replace(/\n$/, ''); // chomp(item)
        item = showdown.subParser('hashHTMLBlocks')(item, options, globals);

        // Colapse double linebreaks
        item = item.replace(/\n\n+/g, '\n\n');
        if (isParagraphed) {
          item = showdown.subParser('paragraphs')(item, options, globals);
        } else {
          item = showdown.subParser('spanGamut')(item, options, globals);
        }
      }

      // now we need to remove the marker (¨A)
      item = item.replace('¨A', '');
      // we can finally wrap the line in list item tags
      item =  '<li' + bulletStyle + '>' + item + '</li>\n';

      return item;
    });

    // attacklab: strip sentinel
    listStr = listStr.replace(/¨0/g, '');

    globals.gListLevel--;

    if (trimTrailing) {
      listStr = listStr.replace(/\s+$/, '');
    }

    return listStr;
  }

  function styleStartNumber (list, listType) {
    // check if ol and starts by a number different than 1
    if (listType === 'ol') {
      var res = list.match(/^ *(\d+)\./);
      if (res && res[1] !== '1') {
        return ' start="' + res[1] + '"';
      }
    }
    return '';
  }

  /**
   * Check and parse consecutive lists (better fix for issue #142)
   * @param {string} list
   * @param {string} listType
   * @param {boolean} trimTrailing
   * @returns {string}
   */
  function parseConsecutiveLists (list, listType, trimTrailing) {
    // check if we caught 2 or more consecutive lists by mistake
    // we use the counterRgx, meaning if listType is UL we look for OL and vice versa
    var olRgx = (options.disableForced4SpacesIndentedSublists) ? /^ ?\d+\.[ \t]/gm : /^ {0,3}\d+\.[ \t]/gm,
        ulRgx = (options.disableForced4SpacesIndentedSublists) ? /^ ?[*+-][ \t]/gm : /^ {0,3}[*+-][ \t]/gm,
        counterRxg = (listType === 'ul') ? olRgx : ulRgx,
        result = '';

    if (list.search(counterRxg) !== -1) {
      (function parseCL (txt) {
        var pos = txt.search(counterRxg),
            style = styleStartNumber(list, listType);
        if (pos !== -1) {
          // slice
          result += '\n\n<' + listType + style + '>\n' + processListItems(txt.slice(0, pos), !!trimTrailing) + '</' + listType + '>\n';

          // invert counterType and listType
          listType = (listType === 'ul') ? 'ol' : 'ul';
          counterRxg = (listType === 'ul') ? olRgx : ulRgx;

          //recurse
          parseCL(txt.slice(pos));
        } else {
          result += '\n\n<' + listType + style + '>\n' + processListItems(txt, !!trimTrailing) + '</' + listType + '>\n';
        }
      })(list);
    } else {
      var style = styleStartNumber(list, listType);
      result = '\n\n<' + listType + style + '>\n' + processListItems(list, !!trimTrailing) + '</' + listType + '>\n';
    }

    return result;
  }

  /** Start of list parsing **/
  text = globals.converter._dispatch('lists.before', text, options, globals);
  // add sentinel to hack around khtml/safari bug:
  // http://bugs.webkit.org/show_bug.cgi?id=11231
  text += '¨0';

  if (globals.gListLevel) {
    text = text.replace(/^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,
      function (wholeMatch, list, m2) {
        var listType = (m2.search(/[*+-]/g) > -1) ? 'ul' : 'ol';
        return parseConsecutiveLists(list, listType, true);
      }
    );
  } else {
    text = text.replace(/(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,
      function (wholeMatch, m1, list, m3) {
        var listType = (m3.search(/[*+-]/g) > -1) ? 'ul' : 'ol';
        return parseConsecutiveLists(list, listType, false);
      }
    );
  }

  // strip sentinel
  text = text.replace(/¨0/, '');
  text = globals.converter._dispatch('lists.after', text, options, globals);
  return text;
});

/**
 * Parse metadata at the top of the document
 */
showdown.subParser('metadata', function (text, options, globals) {
  'use strict';

  if (!options.metadata) {
    return text;
  }

  text = globals.converter._dispatch('metadata.before', text, options, globals);

  function parseMetadataContents (content) {
    // raw is raw so it's not changed in any way
    globals.metadata.raw = content;

    // escape chars forbidden in html attributes
    // double quotes
    content = content
      // ampersand first
      .replace(/&/g, '&amp;')
      // double quotes
      .replace(/"/g, '&quot;');

    content = content.replace(/\n {4}/g, ' ');
    content.replace(/^([\S ]+): +([\s\S]+?)$/gm, function (wm, key, value) {
      globals.metadata.parsed[key] = value;
      return '';
    });
  }

  text = text.replace(/^\s*«««+(\S*?)\n([\s\S]+?)\n»»»+\n/, function (wholematch, format, content) {
    parseMetadataContents(content);
    return '¨M';
  });

  text = text.replace(/^\s*---+(\S*?)\n([\s\S]+?)\n---+\n/, function (wholematch, format, content) {
    if (format) {
      globals.metadata.format = format;
    }
    parseMetadataContents(content);
    return '¨M';
  });

  text = text.replace(/¨M/g, '');

  text = globals.converter._dispatch('metadata.after', text, options, globals);
  return text;
});

/**
 * Remove one level of line-leading tabs or spaces
 */
showdown.subParser('outdent', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('outdent.before', text, options, globals);

  // attacklab: hack around Konqueror 3.5.4 bug:
  // "----------bug".replace(/^-/g,"") == "bug"
  text = text.replace(/^(\t|[ ]{1,4})/gm, '¨0'); // attacklab: g_tab_width

  // attacklab: clean up hack
  text = text.replace(/¨0/g, '');

  text = globals.converter._dispatch('outdent.after', text, options, globals);
  return text;
});

/**
 *
 */
showdown.subParser('paragraphs', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('paragraphs.before', text, options, globals);
  // Strip leading and trailing lines:
  text = text.replace(/^\n+/g, '');
  text = text.replace(/\n+$/g, '');

  var grafs = text.split(/\n{2,}/g),
      grafsOut = [],
      end = grafs.length; // Wrap <p> tags

  for (var i = 0; i < end; i++) {
    var str = grafs[i];
    // if this is an HTML marker, copy it
    if (str.search(/¨(K|G)(\d+)\1/g) >= 0) {
      grafsOut.push(str);

    // test for presence of characters to prevent empty lines being parsed
    // as paragraphs (resulting in undesired extra empty paragraphs)
    } else if (str.search(/\S/) >= 0) {
      str = showdown.subParser('spanGamut')(str, options, globals);
      str = str.replace(/^([ \t]*)/g, '<p>');
      str += '</p>';
      grafsOut.push(str);
    }
  }

  /** Unhashify HTML blocks */
  end = grafsOut.length;
  for (i = 0; i < end; i++) {
    var blockText = '',
        grafsOutIt = grafsOut[i],
        codeFlag = false;
    // if this is a marker for an html block...
    // use RegExp.test instead of string.search because of QML bug
    while (/¨(K|G)(\d+)\1/.test(grafsOutIt)) {
      var delim = RegExp.$1,
          num   = RegExp.$2;

      if (delim === 'K') {
        blockText = globals.gHtmlBlocks[num];
      } else {
        // we need to check if ghBlock is a false positive
        if (codeFlag) {
          // use encoded version of all text
          blockText = showdown.subParser('encodeCode')(globals.ghCodeBlocks[num].text, options, globals);
        } else {
          blockText = globals.ghCodeBlocks[num].codeblock;
        }
      }
      blockText = blockText.replace(/\$/g, '$$$$'); // Escape any dollar signs

      grafsOutIt = grafsOutIt.replace(/(\n\n)?¨(K|G)\d+\2(\n\n)?/, blockText);
      // Check if grafsOutIt is a pre->code
      if (/^<pre\b[^>]*>\s*<code\b[^>]*>/.test(grafsOutIt)) {
        codeFlag = true;
      }
    }
    grafsOut[i] = grafsOutIt;
  }
  text = grafsOut.join('\n');
  // Strip leading and trailing lines:
  text = text.replace(/^\n+/g, '');
  text = text.replace(/\n+$/g, '');
  return globals.converter._dispatch('paragraphs.after', text, options, globals);
});

/**
 * Run extension
 */
showdown.subParser('runExtension', function (ext, text, options, globals) {
  'use strict';

  if (ext.filter) {
    text = ext.filter(text, globals.converter, options);

  } else if (ext.regex) {
    // TODO remove this when old extension loading mechanism is deprecated
    var re = ext.regex;
    if (!(re instanceof RegExp)) {
      re = new RegExp(re, 'g');
    }
    text = text.replace(re, ext.replace);
  }

  return text;
});

/**
 * These are all the transformations that occur *within* block-level
 * tags like paragraphs, headers, and list items.
 */
showdown.subParser('spanGamut', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('spanGamut.before', text, options, globals);
  text = showdown.subParser('codeSpans')(text, options, globals);
  text = showdown.subParser('escapeSpecialCharsWithinTagAttributes')(text, options, globals);
  text = showdown.subParser('encodeBackslashEscapes')(text, options, globals);

  // Process anchor and image tags. Images must come first,
  // because ![foo][f] looks like an anchor.
  text = showdown.subParser('images')(text, options, globals);
  text = showdown.subParser('anchors')(text, options, globals);

  // Make links out of things like `<http://example.com/>`
  // Must come after anchors, because you can use < and >
  // delimiters in inline links like [this](<url>).
  text = showdown.subParser('autoLinks')(text, options, globals);
  text = showdown.subParser('simplifiedAutoLinks')(text, options, globals);
  text = showdown.subParser('emoji')(text, options, globals);
  text = showdown.subParser('underline')(text, options, globals);
  text = showdown.subParser('italicsAndBold')(text, options, globals);
  text = showdown.subParser('strikethrough')(text, options, globals);
  text = showdown.subParser('ellipsis')(text, options, globals);

  // we need to hash HTML tags inside spans
  text = showdown.subParser('hashHTMLSpans')(text, options, globals);

  // now we encode amps and angles
  text = showdown.subParser('encodeAmpsAndAngles')(text, options, globals);

  // Do hard breaks
  if (options.simpleLineBreaks) {
    // GFM style hard breaks
    // only add line breaks if the text does not contain a block (special case for lists)
    if (!/\n\n¨K/.test(text)) {
      text = text.replace(/\n+/g, '<br />\n');
    }
  } else {
    // Vanilla hard breaks
    text = text.replace(/  +\n/g, '<br />\n');
  }

  text = globals.converter._dispatch('spanGamut.after', text, options, globals);
  return text;
});

showdown.subParser('strikethrough', function (text, options, globals) {
  'use strict';

  function parseInside (txt) {
    if (options.simplifiedAutoLink) {
      txt = showdown.subParser('simplifiedAutoLinks')(txt, options, globals);
    }
    return '<del>' + txt + '</del>';
  }

  if (options.strikethrough) {
    text = globals.converter._dispatch('strikethrough.before', text, options, globals);
    text = text.replace(/(?:~){2}([\s\S]+?)(?:~){2}/g, function (wm, txt) { return parseInside(txt); });
    text = globals.converter._dispatch('strikethrough.after', text, options, globals);
  }

  return text;
});

/**
 * Strips link definitions from text, stores the URLs and titles in
 * hash references.
 * Link defs are in the form: ^[id]: url "optional title"
 */
showdown.subParser('stripLinkDefinitions', function (text, options, globals) {
  'use strict';

  var regex       = /^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?([^>\s]+)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=¨0))/gm,
      base64Regex = /^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n\n|(?=¨0)|(?=\n\[))/gm;

  // attacklab: sentinel workarounds for lack of \A and \Z, safari\khtml bug
  text += '¨0';

  var replaceFunc = function (wholeMatch, linkId, url, width, height, blankLines, title) {
    linkId = linkId.toLowerCase();
    if (url.match(/^data:.+?\/.+?;base64,/)) {
      // remove newlines
      globals.gUrls[linkId] = url.replace(/\s/g, '');
    } else {
      globals.gUrls[linkId] = showdown.subParser('encodeAmpsAndAngles')(url, options, globals);  // Link IDs are case-insensitive
    }

    if (blankLines) {
      // Oops, found blank lines, so it's not a title.
      // Put back the parenthetical statement we stole.
      return blankLines + title;

    } else {
      if (title) {
        globals.gTitles[linkId] = title.replace(/"|'/g, '&quot;');
      }
      if (options.parseImgDimensions && width && height) {
        globals.gDimensions[linkId] = {
          width:  width,
          height: height
        };
      }
    }
    // Completely remove the definition from the text
    return '';
  };

  // first we try to find base64 link references
  text = text.replace(base64Regex, replaceFunc);

  text = text.replace(regex, replaceFunc);

  // attacklab: strip sentinel
  text = text.replace(/¨0/, '');

  return text;
});

showdown.subParser('tables', function (text, options, globals) {
  'use strict';

  if (!options.tables) {
    return text;
  }

  var tableRgx       = /^ {0,3}\|?.+\|.+\n {0,3}\|?[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:[-=]){2,}[\s\S]+?(?:\n\n|¨0)/gm,
    //singeColTblRgx = /^ {0,3}\|.+\|\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n(?: {0,3}\|.+\|\n)+(?:\n\n|¨0)/gm;
      singeColTblRgx = /^ {0,3}\|.+\|[ \t]*\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n( {0,3}\|.+\|[ \t]*\n)*(?:\n|¨0)/gm;

  function parseStyles (sLine) {
    if (/^:[ \t]*--*$/.test(sLine)) {
      return ' style="text-align:left;"';
    } else if (/^--*[ \t]*:[ \t]*$/.test(sLine)) {
      return ' style="text-align:right;"';
    } else if (/^:[ \t]*--*[ \t]*:$/.test(sLine)) {
      return ' style="text-align:center;"';
    } else {
      return '';
    }
  }

  function parseHeaders (header, style) {
    var id = '';
    header = header.trim();
    // support both tablesHeaderId and tableHeaderId due to error in documentation so we don't break backwards compatibility
    if (options.tablesHeaderId || options.tableHeaderId) {
      id = ' id="' + header.replace(/ /g, '_').toLowerCase() + '"';
    }
    header = showdown.subParser('spanGamut')(header, options, globals);

    return '<th' + id + style + '>' + header + '</th>\n';
  }

  function parseCells (cell, style) {
    var subText = showdown.subParser('spanGamut')(cell, options, globals);
    return '<td' + style + '>' + subText + '</td>\n';
  }

  function buildTable (headers, cells) {
    var tb = '<table>\n<thead>\n<tr>\n',
        tblLgn = headers.length;

    for (var i = 0; i < tblLgn; ++i) {
      tb += headers[i];
    }
    tb += '</tr>\n</thead>\n<tbody>\n';

    for (i = 0; i < cells.length; ++i) {
      tb += '<tr>\n';
      for (var ii = 0; ii < tblLgn; ++ii) {
        tb += cells[i][ii];
      }
      tb += '</tr>\n';
    }
    tb += '</tbody>\n</table>\n';
    return tb;
  }

  function parseTable (rawTable) {
    var i, tableLines = rawTable.split('\n');

    for (i = 0; i < tableLines.length; ++i) {
      // strip wrong first and last column if wrapped tables are used
      if (/^ {0,3}\|/.test(tableLines[i])) {
        tableLines[i] = tableLines[i].replace(/^ {0,3}\|/, '');
      }
      if (/\|[ \t]*$/.test(tableLines[i])) {
        tableLines[i] = tableLines[i].replace(/\|[ \t]*$/, '');
      }
      // parse code spans first, but we only support one line code spans
      tableLines[i] = showdown.subParser('codeSpans')(tableLines[i], options, globals);
    }

    var rawHeaders = tableLines[0].split('|').map(function (s) { return s.trim();}),
        rawStyles = tableLines[1].split('|').map(function (s) { return s.trim();}),
        rawCells = [],
        headers = [],
        styles = [],
        cells = [];

    tableLines.shift();
    tableLines.shift();

    for (i = 0; i < tableLines.length; ++i) {
      if (tableLines[i].trim() === '') {
        continue;
      }
      rawCells.push(
        tableLines[i]
          .split('|')
          .map(function (s) {
            return s.trim();
          })
      );
    }

    if (rawHeaders.length < rawStyles.length) {
      return rawTable;
    }

    for (i = 0; i < rawStyles.length; ++i) {
      styles.push(parseStyles(rawStyles[i]));
    }

    for (i = 0; i < rawHeaders.length; ++i) {
      if (showdown.helper.isUndefined(styles[i])) {
        styles[i] = '';
      }
      headers.push(parseHeaders(rawHeaders[i], styles[i]));
    }

    for (i = 0; i < rawCells.length; ++i) {
      var row = [];
      for (var ii = 0; ii < headers.length; ++ii) {
        if (showdown.helper.isUndefined(rawCells[i][ii])) {

        }
        row.push(parseCells(rawCells[i][ii], styles[ii]));
      }
      cells.push(row);
    }

    return buildTable(headers, cells);
  }

  text = globals.converter._dispatch('tables.before', text, options, globals);

  // find escaped pipe characters
  text = text.replace(/\\(\|)/g, showdown.helper.escapeCharactersCallback);

  // parse multi column tables
  text = text.replace(tableRgx, parseTable);

  // parse one column tables
  text = text.replace(singeColTblRgx, parseTable);

  text = globals.converter._dispatch('tables.after', text, options, globals);

  return text;
});

showdown.subParser('underline', function (text, options, globals) {
  'use strict';

  if (!options.underline) {
    return text;
  }

  text = globals.converter._dispatch('underline.before', text, options, globals);

  if (options.literalMidWordUnderscores) {
    text = text.replace(/\b_?__(\S[\s\S]*)___?\b/g, function (wm, txt) {
      return '<u>' + txt + '</u>';
    });
  } else {
    text = text.replace(/_?__(\S[\s\S]*?)___?/g, function (wm, m) {
      return (/\S$/.test(m)) ? '<u>' + m + '</u>' : wm;
    });
  }

  // escape remaining underscores to prevent them being parsed by italic and bold
  text = text.replace(/(_)/g, showdown.helper.escapeCharactersCallback);

  text = globals.converter._dispatch('underline.after', text, options, globals);

  return text;
});

/**
 * Swap back in all the special characters we've hidden.
 */
showdown.subParser('unescapeSpecialChars', function (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('unescapeSpecialChars.before', text, options, globals);

  text = text.replace(/¨E(\d+)E/g, function (wholeMatch, m1) {
    var charCodeToReplace = parseInt(m1);
    return String.fromCharCode(charCodeToReplace);
  });

  text = globals.converter._dispatch('unescapeSpecialChars.after', text, options, globals);
  return text;
});

var root = this;

// AMD Loader
if (true) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    'use strict';
    return showdown;
  }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

// CommonJS/nodeJS Loader
} else {}
}).call(this);

//# sourceMappingURL=showdown.js.map


/***/ }),

/***/ "../../../node_modules/timers-browserify/main.js":
/*!*********************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/timers-browserify/main.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "../../../node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../../node_modules/util/support/isBufferBrowser.js":
/*!***************************************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/util/support/isBufferBrowser.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ "../../../node_modules/util/util.js":
/*!********************************************************************************************!*\
  !*** /Users/sth1pal/Documents/Development/JavaScript/nodejs/ts6/node_modules/util/util.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ "../../../node_modules/util/support/isBufferBrowser.js");

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(/*! inherits */ "../../../node_modules/inherits/inherits_browser.js");

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../../../node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "../../../node_modules/process/browser.js")))

/***/ }),

/***/ "../../../node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./_dist/DocSets.js":
/*!**************************!*\
  !*** ./_dist/DocSets.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../node_modules/hslayout/index.js");
const FILE = './data/index.json';
class DocSets {
    static add(content, file) {
        const lib = content.name;
        const i = DocSets.gList.docs.indexOf(file);
        DocSets.gList.set[i] = lib;
        DocSets.gList.index[lib] = {};
        recursiveIndex(content, DocSets.gList.index[lib], lib);
    }
    static loadList(file) {
        file = file || FILE;
        return DocSets.loadIndexSet(file);
    }
    static get(lib, id = 0) {
        if (lib) {
            if (DocSets.gList.index[lib]) {
                return DocSets.gList.index[lib][id + ''];
            }
            else {
                return DocSets.gList.set;
            }
        }
        else {
            return DocSets.gList.set;
        }
    }
    static loadIndexSet(file) {
        return hslayout_1.m.request({ method: "GET", url: file })
            .then((result) => {
            DocSets.gTitle = result.title;
            DocSets.gList.docs = result.docs;
            let i = file.lastIndexOf('/');
            const dir = file.substring(0, i + 1);
            return Promise.all(result.docs.map((f) => loadDocSet(dir, f)));
        })
            .catch(console.log);
    }
    static title() { return DocSets.gTitle; }
}
DocSets.gList = { set: [], index: {}, docs: [] };
exports.DocSets = DocSets;
;
function loadDocSet(dir, file) {
    return hslayout_1.m.request({ method: "GET", url: dir + file })
        .then((r) => {
        DocSets.add(r, file);
    })
        .catch(console.log);
}
function recursiveIndex(content, index, lib, path = '') {
    function getNewPath(content) {
        content.name = content.name.replace(/["'](.+)["']|(.+)/g, "$1$2");
        const elName = content.name.match(/([^\/]+)$/)[1];
        content.name = elName;
        return content.fullPath = (path === '') ? elName : `${path}.${elName}`;
    }
    function markIfModule(content) {
        if (content.comment && content.comment.tags) {
            content.comment.tags.forEach((tag) => {
                if (tag.tag === 'module') {
                    content.innerModule = tag.text.trim();
                }
            });
        }
    }
    content.lib = lib;
    if (typeof content === 'object' && content.name) {
        const newPath = getNewPath(content);
        markIfModule(content);
        index[content.id + ''] = content;
        if (newPath.length > 0) {
            index[newPath] = content;
        }
        if (content.children) {
            content.children.map((c) => recursiveIndex(c, index, lib, newPath));
        }
        if (content.signatures) {
            content.signatures.map((c) => recursiveIndex(c, index, lib, newPath));
        }
        if (content.parameters) {
            content.parameters.map((c) => recursiveIndex(c, index, lib, newPath));
        }
        if (content.type && content.type.declaration && content.type.declaration.children) {
            content.type.declaration.children.map((c) => recursiveIndex(c, index, lib, newPath));
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9jU2V0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Eb2NTZXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBU0EsdUNBQWdDO0FBTWhDLE1BQU0sSUFBSSxHQUFVLG1CQUFtQixDQUFDO0FBT3hDO0lBVVcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFXLEVBQUUsSUFBVztRQUN0QyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDM0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzlCLGNBQWMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQVFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBWTtRQUMvQixJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksQ0FBQztRQUNwQixPQUFPLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQVNNLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBVyxFQUFFLEtBQWlCLENBQUM7UUFDN0MsSUFBSSxHQUFHLEVBQUU7WUFDTCxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUMxQixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsQ0FBQzthQUMxQztpQkFBTTtnQkFDSCxPQUFPLE9BQU8sQ0FBQyxLQUFLLENB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

/***/ }),

/***/ "./_dist/Site.js":
/*!***********************!*\
  !*** ./_dist/Site.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hslayout = __webpack_require__(/*! hslayout */ "../../../node_modules/hslayout/index.js");
const header = __webpack_require__(/*! ./view/DocsMenu */ "./_dist/view/DocsMenu.js");
const left = __webpack_require__(/*! ./view/LeftNav */ "./_dist/view/LeftNav.js");
const main = __webpack_require__(/*! ./view/MainDetail */ "./_dist/view/MainDetail.js");
const TitleHeight = '30px';
const FooterHeight = '10px';
const LeftNavWidth = '200px';
const SiteName = 'HSDocs';
const SiteLink = 'https://github.com/HelpfulScripts/hsDocs';
const myConfig = {
    Layout: {
        rows: [TitleHeight, "fill", FooterHeight],
        css: '.hs-site',
        content: [{
                Layout: {
                    columns: [LeftNavWidth, "fill"],
                    css: '.hs-site-header',
                    content: [
                        { Layout: {
                                css: '.hs-site-title',
                                content: SiteName,
                                href: SiteLink
                            } },
                        { DocsMenu: { docSet: "./data/index.json" } }
                    ]
                }
            }, {
                Layout: {
                    columns: [LeftNavWidth, "fill"],
                    content: [
                        { LeftNav: {} },
                        { MainDetail: {} }
                    ]
                }
            },
            { Layout: {
                    css: '.hs-site-footer',
                    content: '(c) Helpful Scripts'
                } }
        ]
    },
    route: {
        default: '/api',
        paths: [
            '/api',
            '/api/:lib',
            '/api/:lib/:field'
        ]
    }
};
function init() {
    new hslayout.HsConfig([hslayout, header, left, main]).attachNodeTree(myConfig, document.body);
}
exports.init = init;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2l0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9TaXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBS0EscUNBQXNDO0FBQ3RDLDBDQUEyQztBQUMzQyx1Q0FBMEM7QUFDMUMsMENBQTZDO0FBRzdDLE1BQU0sV0FBVyxHQUFLLE1BQU0sQ0FBQztBQUM3QixNQUFNLFlBQVksR0FBSSxNQUFNLENBQUM7QUFDN0IsTUFBTSxZQUFZLEdBQUksT0FBTyxDQUFDO0FBQzlCLE1BQU0sUUFBUSxHQUFRLFFBQVEsQ0FBQztBQUMvQixNQUFNLFFBQVEsR0FBUSwwQ0FBMEMsQ0FBQztBQUVqRSxNQUFNLFFBQVEsR0FBRztJQUNiLE1BQU0sRUFBRTtRQUNKLElBQUksRUFBRyxDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDO1FBQzFDLEdBQUcsRUFBRSxVQUFVO1FBQ2YsT0FBTyxFQUFFLENBQUM7Z0JBQ04sTUFBTSxFQUFDO29CQUNILE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUM7b0JBQy9CLEdBQUcsRUFBRSxpQkFBaUI7b0JBQ3RCLE9BQU8sRUFBRTt3QkFDTCxFQUFFLE1BQU0sRUFBSztnQ0FDVCxHQUFHLEVBQUUsZ0JBQWdCO2dDQUNyQixPQUFPLEVBQUUsUUFBUTtnQ0FDakIsSUFBSSxFQUFFLFFBQVE7NkJBQ2pCLEVBQUM7d0JBQ0YsRUFBRSxRQUFRLEVBQUssRUFBRSxNQUFNLEVBQUMsbUJBQW1CLEVBQUMsRUFBQztxQkFDaEQ7aUJBQ0o7YUFBQyxFQUFDO2dCQUNILE1BQU0sRUFBQztvQkFDSCxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDO29CQUMvQixPQUFPLEVBQUU7d0JBQ0wsRUFBRSxPQUFPLEVBQUssRUFBRSxFQUFDO3dCQUNqQixFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUM7cUJBQ3BCO2lCQUNKO2FBQUM7WUFDRixFQUFFLE1BQU0sRUFBRTtvQkFDTixHQUFHLEVBQUUsaUJBQWlCO29CQUN0QixPQUFPLEVBQUUscUJBQXFCO2lCQUNqQyxFQUFDO1NBQ0w7S0FDSjtJQUNELEtBQUssRUFBRTtRQUNILE9BQU8sRUFBRSxNQUFNO1FBQ2YsS0FBSyxFQUFFO1lBQ0gsTUFBTTtZQUNOLFdBQVc7WUFDWCxrQkFBa0I7U0FDckI7S0FDSjtDQUNKLENBQUM7QUFHRjtJQUNJLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbEcsQ0FBQztBQUZELG9CQUVDIn0=

/***/ }),

/***/ "./_dist/index.js":
/*!************************!*\
  !*** ./_dist/index.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Site_1 = __webpack_require__(/*! ./Site */ "./_dist/Site.js");
Site_1.init();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFLQSxpQ0FBOEI7QUFFOUIsV0FBSSxFQUFFLENBQUMifQ==

/***/ }),

/***/ "./_dist/markdown.js":
/*!***************************!*\
  !*** ./_dist/markdown.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const showdown = __webpack_require__(/*! showdown */ "../../../node_modules/showdown/dist/showdown.js");
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../node_modules/hslayout/index.js");
function markDown(text, short = false, currentRoute = hslayout_1.m.route.get()) {
    const converter = new showdown.Converter({
        tables: true,
        ghCompatibleHeaderId: true,
        smartIndentationFix: true,
        takslists: true,
        strikethrough: true
    });
    let result = (!text) ? '' : converter.makeHtml(text);
    if (short) {
        const i = result.indexOf('</p>');
        if (i > 0) {
            result = result.substring(0, i);
        }
    }
    result = substituteLinks(result, currentRoute);
    return result;
}
exports.markDown = markDown;
function substituteLinks(comment, currentRoute) {
    function deconstructRoute(route) {
        let lib, mod;
        route.replace(/\/([^\/.]*)\/([^\/\s]*$)/gi, (match, ...args) => {
            lib = args[0];
            mod = args[1];
            return '';
        });
        return [lib, mod];
    }
    function getLibMod(path) {
        let lib, mod, frag;
        if (path.indexOf(':') > 0) {
            [lib, mod] = path.split(':');
        }
        else {
            lib = defLib;
            mod = path;
        }
        if (mod.indexOf('#') > 0) {
            [mod, frag] = mod.split('#');
        }
        return [lib, mod, frag];
    }
    let [defLib] = deconstructRoute(currentRoute);
    comment = comment.replace(/\s{@link ([\S]*)\s*([^}]+)}/gi, (match, ...args) => {
        const path = args[0];
        const text = args[1];
        let [lib, module] = getLibMod(path);
        return (module === '' || module === '0' || module === 'overview') ?
            ` <a href="#!/api/${lib}/0">${text}</a>` :
            ` <a href="#!/api/${lib}/${lib}.${module}">${text}</a>`;
    });
    return comment;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbWFya2Rvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLFFBQVEsR0FBSSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdEMsdUNBQThCO0FBUTlCLGtCQUF5QixJQUFXLEVBQUUsUUFBYyxLQUFLLEVBQUUsZUFBc0IsWUFBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7SUFDMUYsTUFBTSxTQUFTLEdBQUcsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDO1FBQ3JDLE1BQU0sRUFBa0IsSUFBSTtRQUM1QixvQkFBb0IsRUFBSSxJQUFJO1FBQzVCLG1CQUFtQixFQUFLLElBQUk7UUFDNUIsU0FBUyxFQUFlLElBQUk7UUFDNUIsYUFBYSxFQUFXLElBQUk7S0FDL0IsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEQsSUFBSSxLQUFLLEVBQUU7UUFDUCxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRTtZQUFFLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUFFO0tBQ2hEO0lBQ0QsTUFBTSxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDL0MsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQWZELDRCQWVDO0FBb0JELHlCQUF5QixPQUFjLEVBQUUsWUFBbUI7SUFDeEQsMEJBQTBCLEtBQVk7UUFDbEMsSUFBSSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ2IsS0FBSyxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUksRUFBRSxFQUFFO1lBQzNELEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZCxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2QsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELG1CQUFtQixJQUFXO1FBQzFCLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7UUFDbkIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFDLENBQUMsRUFBRTtZQUNyQixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2hDO2FBQU87WUFDSixHQUFHLEdBQUcsTUFBTSxDQUFDO1lBQ2IsR0FBRyxHQUFHLElBQUksQ0FBQztTQUNkO1FBQ0QsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFDLENBQUMsRUFBRTtZQUNwQixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2hDO1FBQ0QsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUc5QyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQywrQkFBK0IsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUksRUFBRSxFQUFFO1FBQzFFLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsT0FBTyxDQUFDLE1BQU0sS0FBSyxFQUFFLElBQUksTUFBTSxLQUFLLEdBQUcsSUFBSSxNQUFNLEtBQUssVUFBVSxDQUFDLENBQUEsQ0FBQztZQUMxRCxvQkFBb0IsR0FBRyxPQUFPLElBQUksTUFBTSxDQUFDLENBQUM7WUFDMUMsb0JBQW9CLEdBQUcsSUFBSSxHQUFHLElBQUksTUFBTSxLQUFLLElBQUksTUFBTSxDQUFDO0lBQ3BFLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxPQUFPLENBQUM7QUFFbkIsQ0FBQyJ9

/***/ }),

/***/ "./_dist/view/DocsMenu.js":
/*!********************************!*\
  !*** ./_dist/view/DocsMenu.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../node_modules/hslayout/index.js");
const DocSets_1 = __webpack_require__(/*! ../DocSets */ "./_dist/DocSets.js");
const hswidget_1 = __webpack_require__(/*! hswidget */ "../../../node_modules/hswidget/index.js");
class DocsMenu extends hslayout_1.Layout {
    constructor() {
        super(...arguments);
        this.docSet = '';
    }
    getDesc(attrs) {
        if (this.docSet !== attrs.docSet) {
            this.docSet = attrs.docSet;
            DocSets_1.DocSets.loadList(attrs.docSet);
        }
        const items = DocSets_1.DocSets.get();
        return {
            items: items.map((c) => c),
            defaultItem: (attrs.route && attrs.route.lib) ? attrs.route.lib : items[0],
            changed: (item) => hslayout_1.m.route.set('/api/:lib/0', { lib: item })
        };
    }
    getComponents(node) {
        const desc = this.getDesc(node.attrs);
        return hslayout_1.m(hswidget_1.Menu, { desc: desc });
    }
}
exports.DocsMenu = DocsMenu;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9jc01lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdmlldy9Eb2NzTWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFnRDtBQUNoRCx3Q0FBa0Q7QUFDbEQsdUNBQWdEO0FBZ0JoRCxjQUFzQixTQUFRLGlCQUFNO0lBQXBDOztRQUNJLFdBQU0sR0FBRyxFQUFFLENBQUM7SUFtQmhCLENBQUM7SUFqQlcsT0FBTyxDQUFDLEtBQVM7UUFDckIsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDOUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQzNCLGlCQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNsQztRQUNELE1BQU0sS0FBSyxHQUFHLGlCQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDNUIsT0FBTztZQUNILEtBQUssRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN6RSxPQUFPLEVBQUUsQ0FBQyxJQUFXLEVBQUUsRUFBRSxDQUFDLFlBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsQ0FBQztTQUNuRSxDQUFDO0lBQ04sQ0FBQztJQUVELGFBQWEsQ0FBQyxJQUFVO1FBQ3BCLE1BQU0sSUFBSSxHQUFnQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuRCxPQUFPLFlBQUMsQ0FBQyxlQUFJLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDO0NBQ0o7QUFwQkQsNEJBb0JDIn0=

/***/ }),

/***/ "./_dist/view/LeftNav.js":
/*!*******************************!*\
  !*** ./_dist/view/LeftNav.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../node_modules/hslayout/index.js");
const hslayout_2 = __webpack_require__(/*! hslayout */ "../../../node_modules/hslayout/index.js");
const hswidget_1 = __webpack_require__(/*! hswidget */ "../../../node_modules/hswidget/index.js");
const DocSets_1 = __webpack_require__(/*! ../DocSets */ "./_dist/DocSets.js");
const Parts_1 = __webpack_require__(/*! ./Parts */ "./_dist/view/Parts.js");
class LeftNav extends hslayout_2.Layout {
    getComponents(node) {
        let lib;
        let field;
        if (node.attrs && node.attrs.route) {
            lib = node.attrs.route.lib;
            field = node.attrs.route.field;
        }
        const docSet = DocSets_1.DocSets.get(lib, 0) || { name: 'unknown', id: 0 };
        return hslayout_1.m('.hs-left', [hslayout_1.m('.hs-left-nav', navList(docSet, field))]);
    }
}
exports.LeftNav = LeftNav;
function navList(docSet, field) {
    function collectModules(docSet) {
        const modulesByName = {};
        docSet.modules = [];
        if (docSet.children) {
            docSet.children.forEach((c) => {
                if (!(c.flags && c.flags.isExternal) && !ignoreModules[c.name]) {
                    const name = c.innerModule ? c.innerModule : c.name;
                    let module = modulesByName[name];
                    if (!module) {
                        docSet.modules.push(module = modulesByName[name] = {
                            name: name,
                            lib: docSet.lib,
                            fullPath: docSet.fullPath + '.' + name,
                            groups: []
                        });
                    }
                    const groups = {};
                    module.groups.forEach((g) => groups[g.title] = g);
                    if (c.groups) {
                        c.groups.forEach((g) => {
                            let group = groups[g.title];
                            if (!group) {
                                group = groups[g.title] = {
                                    children: [],
                                    kind: g.kind,
                                    title: g.title
                                };
                                module.groups.push(group);
                            }
                            group.children = group.children.concat(g.children);
                        });
                    }
                }
            });
        }
    }
    function externalModule(mdl) {
        let selected = false;
        if (field === '' + mdl.id || field.indexOf(mdl.fullPath) === 0) {
            selected = true;
        }
        return hslayout_1.m(hswidget_1.Collapsible, { css: `.hs-left-nav-module`, preArrow: true, isExpanded: selected, components: [
                hslayout_1.m(`${selected ? '.hs-left-nav-selected' : ''}`, Parts_1.libLink(`a.hs-left-nav-module-name `, mdl.lib, mdl.fullPath, mdl.name)),
                !mdl.groups ? undefined : mdl.groups.map((g) => entries(g, mdl, field))
            ] });
    }
    if (docSet.kind === 0) {
        collectModules(docSet);
        const modules = docSet.modules.map(externalModule);
        modules.unshift(hslayout_1.m('.hs-left-nav-header', 'Modules'));
        return [hslayout_1.m('.hs-left-nav-content', modules)];
    }
}
const ignoreModules = {
    overview: true,
    index: true
};
function entries(group, mdl, field) {
    function moduleGet(c) {
        return DocSets_1.DocSets.get(mdl.lib, c);
    }
    function entry(mod) {
        const selected = (field === '' + mod.id || field === mod.fullPath) ? '.hs-left-nav-selected' : '';
        const exported = (mod.flags && mod.flags.isExported);
        const statik = (mod.flags && mod.flags.isStatic);
        const css = `a.hs-left-nav-entry ${selected} ${exported ? '.hs-left-nav-exported' : ''}`;
        return (!exported && group.title === 'Variables') ? '' :
            hslayout_1.m('', [
                statik ? 'static' : '',
                Parts_1.libLink(css, mod.lib, mod.fullPath, mod.name)
            ]);
    }
    function empty(mod) { return mod !== ''; }
    let grp = [];
    if (group && group.children) {
        grp = group.children
            .map(moduleGet)
            .sort(exportAscending)
            .map(entry)
            .filter(empty);
        if (grp.length > 0) {
            grp.unshift(hslayout_1.m('.hs-left-nav-header', group.title));
        }
    }
    return (grp.length > 1) ? hslayout_1.m(`.hs-left-nav-entries`, grp) : '';
}
function exportAscending(a, b) {
    if (a.flags && b.flags) {
        if (a.flags.isExported && b.flags.isExported) {
            return a.name > b.name;
        }
        else if (a.flags.isExported) {
            return -1;
        }
        else if (b.flags.isExported) {
            return 1;
        }
        else {
            return a.name > b.name;
        }
    }
    else {
        return a.name > b.name;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGVmdE5hdi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3L0xlZnROYXYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFLQSx1Q0FBb0M7QUFDcEMsdUNBQWlDO0FBQ2pDLHVDQUFzQztBQUN0Qyx3Q0FBcUM7QUFDckMsbUNBQWtDO0FBTWxDLGFBQXFCLFNBQVEsaUJBQU07SUFDL0IsYUFBYSxDQUFDLElBQVc7UUFDckIsSUFBSSxHQUFVLENBQUM7UUFDZixJQUFJLEtBQVksQ0FBQztRQUNqQixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDaEMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUMzQixLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1NBQ2xDO1FBQ0QsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUMsQ0FBQyxFQUFDLENBQUM7UUFDN0QsT0FBTyxZQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsWUFBQyxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7Q0FDSjtBQVhELDBCQVdDO0FBR0QsaUJBQWlCLE1BQVUsRUFBRSxLQUFZO0lBRXJDLHdCQUF3QixNQUFVO1FBQzlCLE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN6QixNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDakIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFLLEVBQUUsRUFBRTtnQkFFOUIsSUFB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

/***/ }),

/***/ "./_dist/view/MainComment.js":
/*!***********************************!*\
  !*** ./_dist/view/MainComment.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../node_modules/hslayout/index.js");
const markdown_1 = __webpack_require__(/*! ../markdown */ "./_dist/markdown.js");
const MainExample_1 = __webpack_require__(/*! ./MainExample */ "./_dist/view/MainExample.js");
function commentLong(mdl) {
    let content = [];
    if (mdl.comment) {
        content.push(textOrShortTextOrDescription(mdl.comment, false));
        content.push(returns(mdl.comment, false));
        content.push(commentRemainder(mdl.comment));
    }
    return hslayout_1.m('.hs-item-comment', content);
}
exports.commentLong = commentLong;
function comment(mdl, short = false) {
    let content = [];
    if (mdl.comment) {
        content.push(textOrShortTextOrDescription(mdl.comment, short));
        if (!short) {
            content.push(otherCommentTags(mdl.comment));
            if (mdl.parameters) {
                content = content.concat(mainCommentParams(mdl.parameters));
            }
        }
        content.push(returns(mdl.comment, false));
        content.push(commentRemainder(mdl.comment));
    }
    return hslayout_1.m('.hs-item-comment', content);
}
exports.comment = comment;
function textOrShortTextOrDescription(comment, short) {
    let text = (comment.shortText || '');
    if (comment.text) {
        text += '\n' + (comment.text || '');
    }
    if (comment.tags) {
        comment.tags.map((tag) => { if (tag.tag === 'description') {
            text = tag.text;
        } });
    }
    text = text.replace(/<example([\S\s]*?)<\/example>/gi, short ? '' : MainExample_1.example);
    return hslayout_1.m('.hs-item-comment-desc', prettifyCode(text, short));
}
function returns(comment, short) {
    let text = comment.returns;
    return hslayout_1.m('.hs-item-comment-return', !text ? '' : [
        hslayout_1.m('span.hs-item-comment-tag', 'returns:'),
        hslayout_1.m('span.hs-item-comment-text', text)
    ]);
}
function commentRemainder(comment) {
    return hslayout_1.m('', Object.keys(comment).map((tag) => {
        switch (tag) {
            case 'tags':
            case 'shortText':
            case 'text':
            case 'description':
            case 'returns':
                return '';
            default:
                return hslayout_1.m('.hs-item-comment-special', [
                    hslayout_1.m('span.hs-item-comment-tag', tag),
                    hslayout_1.m('span.hs-item-comment-text', comment[tag])
                ]);
                ;
        }
    }));
}
function otherCommentTags(comment) {
    return hslayout_1.m('', !comment.tags ? [] : comment.tags.map((tag) => {
        switch (tag.tag) {
            case 'description': return '';
            default: return hslayout_1.m('.hs-item-comment-special', [
                hslayout_1.m('span.hs-item-comment-tag', tag.tag),
                hslayout_1.m('span.hs-item-comment-text', tag.text)
            ]);
        }
    }));
}
function mainCommentParams(params) {
    return hslayout_1.m('.hs-item-comment-params', params.map((par) => hslayout_1.m('.hs-item-comment-param', [
        hslayout_1.m('span.hs-item-comment-tag', par.name + ':'),
        hslayout_1.m('span.hs-item-comment-text', !par.comment ? '' :
            ((par.defaultValue !== undefined) ? `[default: ${par.defaultValue}] ` : '') + par.comment.text)
    ])));
}
function prettifyCode(comment, short) {
    let result = comment;
    function braceIndenting(text) {
        let indent = 0;
        const result = text
            .substring(6, text.length - 7)
            .trim()
            .replace(/(<)/g, '&lt;').replace(/(>)/g, '&gt;')
            .split('\n')
            .map((l) => {
            let oldIndent = indent;
            let k = l.trim();
            indent += Math.max(-1, Math.min(1, k.split('{').length - k.split('}').length));
            indent += Math.max(-1, Math.min(1, k.split('[').length - k.split(']').length));
            return '<span class="hs-code-indent"></span>'.repeat(((indent < oldIndent) ? indent : oldIndent)) + k;
        })
            .join('\n')
            .trim();
        return '<pre><code>' + result + '</code></pre>';
    }
    result = result.replace(/<code>([\S\s]*?)<\/code>/gi, braceIndenting);
    return hslayout_1.m.trust(markdown_1.markDown(result, short, hslayout_1.m.route.get()));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbkNvbW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdmlldy9NYWluQ29tbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUtBLHVDQUFvQztBQUNwQywwQ0FBdUM7QUFDdkMsK0NBQXlDO0FBU3pDLHFCQUE0QixHQUFPO0lBQy9CLElBQUksT0FBTyxHQUFTLEVBQUUsQ0FBQztJQUN2QixJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7UUFDYixPQUFPLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUMvRCxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDMUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztLQUMvQztJQUNELE9BQU8sWUFBQyxDQUFDLGtCQUFrQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzFDLENBQUM7QUFSRCxrQ0FRQztBQVVELGlCQUF3QixHQUFPLEVBQUUsS0FBSyxHQUFDLEtBQUs7SUFDeEMsSUFBSSxPQUFPLEdBQVMsRUFBRSxDQUFDO0lBQ3ZCLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtRQUNiLE9BQU8sQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzVDLElBQUksR0FBRyxDQUFDLFVBQVUsRUFBRTtnQkFDaEIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFVBQVUs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

/***/ }),

/***/ "./_dist/view/MainDetail.js":
/*!**********************************!*\
  !*** ./_dist/view/MainDetail.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../node_modules/hslayout/index.js");
const hslayout_2 = __webpack_require__(/*! hslayout */ "../../../node_modules/hslayout/index.js");
const DocSets_1 = __webpack_require__(/*! ../DocSets */ "./_dist/DocSets.js");
const MainComment_1 = __webpack_require__(/*! ./MainComment */ "./_dist/view/MainComment.js");
const Parts_1 = __webpack_require__(/*! ./Parts */ "./_dist/view/Parts.js");
class MainDetail extends hslayout_2.Layout {
    getComponents(node) {
        let lib, field;
        if (node.attrs.route) {
            lib = node.attrs.route.lib;
            field = node.attrs.route.field;
        }
        node.attrs.route = undefined;
        let result = getOverview(lib, field) || itemDoc(DocSets_1.DocSets.get(lib, field) || '');
        return hslayout_1.m('.hs-main-detail', [result]);
    }
}
exports.MainDetail = MainDetail;
function getOverview(lib, mdl) {
    if (mdl === '0' || mdl === '') {
        mdl = DocSets_1.DocSets.get(lib, `${lib}.overview`);
        if (mdl) {
            return overviewDoc(mdl);
        }
    }
    return undefined;
}
function itemDoc(mdl) {
    const sig = mdl.signatures ? mdl.signatures[0] : mdl;
    return hslayout_1.m('.hs-item-doc', [
        title(mdl, sig),
        MainComment_1.commentLong(sig),
        members(sig, sig)
    ]);
}
function overviewDoc(mdl) {
    const sig = mdl.signatures ? mdl.signatures[0] : mdl;
    return hslayout_1.m('.hs-item-doc', [
        MainComment_1.commentLong(sig),
    ]);
}
function title(mdl, sig) {
    return hslayout_1.m('.hs-item-title', { id: Parts_1.makeID('title', mdl) }, itemDescriptor(mdl, sig));
}
function members(mdl, sig) {
    if (mdl.groups) {
        return hslayout_1.m('.hs-item-members', [
            ...mdl.groups.map((g) => member(g, mdl.lib, true, true)),
            ...mdl.groups.map((g) => member(g, mdl.lib, true, false)),
            ...mdl.groups.map((g) => member(g, mdl.lib, false, true)),
            ...mdl.groups.map((g) => member(g, mdl.lib, false, false))
        ]);
    }
    else if (mdl.parameters) {
        return hslayout_1.m('.hs-item-members', parameter(mdl.parameters, mdl.lib));
    }
    else {
        return hslayout_1.m('.hs-item-members');
    }
}
function parameter(g, lib) {
    let content = g.map((c) => hslayout_1.m('.hs-item-parameter', { id: Parts_1.makeID('parameter', c) }, itemChild(c)));
    content.unshift(hslayout_1.m('.hs-item-member-title', { id: 'parameters' }, hslayout_1.m('span', 'Parameters')));
    return hslayout_1.m('.hs-item-member', content);
}
function member(group, lib, statc, publc) {
    const resolve = ((c) => DocSets_1.DocSets.get(lib, c));
    const directChildren = ((mdl) => !mdl['inheritedFrom']);
    const inheritedChildren = ((mdl) => mdl['inheritedFrom']);
    const groupMap = {
        'External modules': '.hs-item-external-module',
        'Constructors': '.hs-item-constructor',
        'Classes': '.hs-item-class',
        'Interfaces': '.hs-item-interface',
        'Functions': '.hs-item-function',
        'Methods': '.hs-item-method',
        'Variables': '.hs-item-variable',
        'Object literals': '.hs-item-object-literal',
        'Properties': '.hs-item-property',
        'Type aliases': '.hs-item-alias',
        'Accessors': '.hs-item-accessors'
    };
    const fn = groupMap[group.title] || '.hs-item-unknown-member';
    const isPublic = (flags) => flags.isPublic || (flags.isExported && !flags.isPrivate);
    const content = group.children
        .map(resolve)
        .filter(directChildren)
        .filter((mdl) => statc ? mdl.flags.isStatic : !mdl.flags.isStatic)
        .filter((mdl) => publc ? isPublic(mdl.flags) : !isPublic(mdl.flags))
        .map((mdl) => hslayout_1.m(fn, { id: Parts_1.makeID(group.title, mdl) }, itemChild(mdl)));
    const inherited = group.children
        .map(resolve)
        .filter(inheritedChildren)
        .filter((mdl) => statc ? mdl.flags.isStatic : !mdl.flags.isStatic)
        .filter((mdl) => publc ? mdl.flags.isPublic : !mdl.flags.isPublic)
        .map((mdl) => hslayout_1.m(`.hs-item-inherited ${fn}`, { id: Parts_1.makeID(group.title, mdl) }, itemChild(mdl)));
    const publStr = publc ? 'Public' : 'Protected or Private';
    const statStr = statc ? 'Static' : '';
    if (inherited.length > 0) {
        inherited.unshift(hslayout_1.m('.hs-item-inherited .hs-item-member-title', hslayout_1.m('span', `${publStr} ${statStr} Inherited ${group.title}`)));
    }
    if (content.length > 0) {
        content.unshift(hslayout_1.m('.hs-item-member-title', { id: group.title.toLowerCase() }, hslayout_1.m('span', `${publStr} ${statStr} ${group.title}`)));
    }
    return hslayout_1.m(`.hs-item-member ${statc ? '.hs-item-static' : ''} ${publc ? '.hs-item-public' : ''}`, content.concat(inherited));
}
function itemDescriptor(mdl, sig) {
    try {
        return hslayout_1.m('.hs-item-desc', [
            Parts_1.flags(mdl),
            Parts_1.kindString(mdl),
            Parts_1.itemName(mdl, mdl),
            Parts_1.signature(sig, mdl),
            Parts_1.type(sig, mdl.lib),
            Parts_1.extensionOf(mdl),
            Parts_1.inheritedFrom(mdl),
            Parts_1.sourceLink(mdl)
        ]);
    }
    catch (e) {
        console.log(e);
        console.log(mdl);
    }
}
function itemChild(mdl, sig = mdl) {
    return mdl.signatures ?
        mdl.signatures.map((s) => hslayout_1.m('.hs-item-child-signature', [itemDescriptor(mdl, s), MainComment_1.comment(s, true)])) :
        [itemDescriptor(mdl, sig), MainComment_1.comment(sig, true)];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbkRldGFpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3L01haW5EZXRhaWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBZ0Q7QUFDaEQsdUNBQWdEO0FBQ2hELHdDQUFrRDtBQUNsRCwrQ0FBcUQ7QUFDckQsbUNBSStDO0FBTS9DLGdCQUF3QixTQUFRLGlCQUFNO0lBQ2xDLGFBQWEsQ0FBQyxJQUFVO1FBQ3BCLElBQUksR0FBRyxFQUFFLEtBQUssQ0FBQztRQUNmLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDbEIsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUMzQixLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1NBQ2xDO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBRTdCLElBQUksTUFBTSxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksT0FBTyxDQUFDLGlCQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMvRSxPQUFPLFlBQUMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQztDQUNKO0FBWkQsZ0NBWUM7QUFRRCxxQkFBcUIsR0FBVSxFQUFFLEdBQVU7SUFDdkMsSUFBSSxHQUFHLEtBQUssR0FBRyxJQUFJLEdBQUcsS0FBSyxFQUFFLEVBQUU7UUFDM0IsR0FBRyxHQUFHLGlCQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsV0FBVyxDQUFDLENBQUM7UUFDMUMsSUFBSSxHQUFHLEVBQUU7WUFDTCxPQUFPLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMzQjtLQUNKO0lBQ0QsT0FB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

/***/ }),

/***/ "./_dist/view/MainExample.js":
/*!***********************************!*\
  !*** ./_dist/view/MainExample.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../node_modules/hslayout/index.js");
const hswidget_1 = __webpack_require__(/*! hswidget */ "../../../node_modules/hswidget/index.js");
const hswidget = __webpack_require__(/*! hswidget */ "../../../node_modules/hswidget/index.js");
const hslayout = __webpack_require__(/*! hslayout */ "../../../node_modules/hslayout/index.js");
const hslayout_2 = __webpack_require__(/*! hslayout */ "../../../node_modules/hslayout/index.js");
const hsutil_1 = __webpack_require__(/*! hsutil */ "../../../node_modules/hsutil/index.js");
const hsutil_2 = __webpack_require__(/*! hsutil */ "../../../node_modules/hsutil/index.js");
const hsutil = __webpack_require__(/*! hsutil */ "../../../node_modules/hsutil/index.js");
const modules = {
    m: Promise.resolve(hslayout_1.m),
    hsutil: Promise.resolve(hsutil),
    hslayout: Promise.resolve(hslayout),
    hswidget: Promise.resolve(hswidget),
    hsdatab: Promise.resolve().then(() => __webpack_require__(/*! hsdatab */ "../../../node_modules/hsdatab/index.js")),
    hsgraph: Promise.resolve().then(() => __webpack_require__(/*! hsgraph */ "../../../node_modules/hsgraph/index.js"))
};
const gInitialized = {};
function example(exmpl) {
    const instance = hsutil_1.shortCheckSum(exmpl);
    let IDs = gInitialized[instance];
    if (!IDs) {
        IDs = gInitialized[instance] = initDesc(IDs);
        IDs.executeSource = exmpl;
        createExecuteScript(IDs, exmpl);
    }
    if (!document.getElementById(IDs.menuID)) {
        addExample(IDs).then(hsutil_2.delay(1)).then(executeScript).catch(executeError);
    }
    const frameHeight = (IDs.attrs ? IDs.attrs.height : undefined) || '300px';
    const wrapWithID = (css) => css === '$exampleID' ? `#${IDs.exampleID}` : `#${IDs.menuID} ${css}`;
    const style = (!IDs.pages['css']) ? '' :
        IDs.pages['css'].replace(/(^|})\s*?(\S*?)\s*?{/gi, (x, ...args) => x.replace(args[1], wrapWithID(args[1])));
    return `<style>${style}</style><example id=${IDs.exampleID} style="height:${frameHeight}" class="hs-layout-frame"></example>`;
}
exports.example = example;
function createExecuteScript(IDs, exmpl) {
    const libNames = Object.keys(modules);
    return Promise.all(libNames.map(name => modules[name]))
        .then((libs) => {
        try {
            const scriptFn = new Function('root', ...libNames, getCommentDescriptor(IDs, exmpl));
            IDs.executeScript = (root) => scriptFn(root, ...libs);
            return true;
        }
        catch (e) {
            console.log('creating script:' + e);
            return false;
        }
    });
}
function initDesc(IDs) {
    return {
        exampleID: getNewID(),
        menuID: getNewID(),
        desc: {
            items: [],
            selectedItem: 'js',
            changed: () => addExample(IDs)
                .then(executeScript)
                .catch(executeError),
            size: ["50px"]
        },
        pages: {},
        activeSrcPage: undefined
    };
}
function getNewID() {
    return 'hs' + Math.floor(1000000 * Math.random());
}
function addExample(IDs) {
    return Promise.resolve(IDs).then(addExampleStructure).then(hsutil_2.delay(1));
}
function addExampleStructure(IDs) {
    let item = IDs.activeSrcPage || 'js';
    const root = document.getElementById(IDs.exampleID);
    IDs.desc.changed = (newItem) => {
        item = IDs.activeSrcPage = newItem;
    };
    hslayout_1.m.mount(root, { view: () => hslayout_1.m(hslayout_2.Layout, {
            columns: ["50%"],
            content: [
                hslayout_1.m(hslayout_2.Layout, {
                    content: hslayout_1.m('.hs-layout .hs-execution', { id: IDs.menuID }, 'placeholder')
                }),
                hslayout_1.m(hslayout_2.Layout, {
                    rows: ["30px", "fill"],
                    css: '.hs-source',
                    content: [
                        hslayout_1.m(hswidget_1.Menu, { desc: IDs.desc, size: ['50px'] }),
                        hslayout_1.m(hslayout_2.Layout, { content: hslayout_1.m('.hs-layout .hs-source-main', hslayout_1.m.trust(`<code><pre>${IDs.pages[item]}</pre></code>`)) })
                    ]
                })
            ]
        })
    });
    return IDs;
}
function executeScript(IDs) {
    const root = document.getElementById(IDs.menuID);
    if (root) {
        console.log(`root found for menuID ${IDs.menuID}`);
        try {
            IDs.executeScript(root);
        }
        catch (e) {
            console.log("error executing script: " + e);
            console.log(IDs.executeSource);
            console.log(e.stack);
        }
    }
    else {
        console.log(`root not found for menuID ${IDs.menuID}`);
    }
    hslayout_1.m.redraw();
    return IDs;
}
function executeError(e) {
    console.log('rejection executing script:');
    console.log(e);
}
function getCommentDescriptor(IDs, example) {
    let result = '';
    let attrs = example.match(/<example\s(\S*?)(\s|>)/i);
    if (attrs && attrs[1]) {
        const at = attrs[1].split('=');
        IDs.attrs = { [at[0]]: at[1] };
    }
    example.replace(/<file[\s]*name=[\S]*?\.([\s\S]*?)['|"]>([\S\s]*?)<\/file>/gi, function (text) {
        const args = [...arguments];
        const content = args[2].trim();
        IDs.desc.items.push(args[1]);
        IDs.pages[args[1]] = content;
        return result;
    });
    return IDs.pages['js'];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbkV4YW1wbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdmlldy9NYWluRXhhbXBsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQTBFQSx1Q0FBZ0Q7QUFDaEQsdUNBQWdEO0FBQ2hELHFDQUFnRDtBQUNoRCxxQ0FBZ0Q7QUFDaEQsdUNBQWdEO0FBQ2hELG1DQUE4QztBQUM5QyxtQ0FBOEM7QUFDOUMsaUNBQThDO0FBRTlDLE1BQU0sT0FBTyxHQUFHO0lBQ1osQ0FBQyxFQUFXLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBQyxDQUFDO0lBQzlCLE1BQU0sRUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUNuQyxRQUFRLEVBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFDckMsUUFBUSxFQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO0lBQ3JDLE9BQU8sdUNBQStDLFNBQVMsRUFBQztJQUNoRSxPQUFPLHVDQUErQyxTQUFTLEVBQUM7Q0FDbkUsQ0FBQztBQW1CRixNQUFNLFlBQVksR0FBK0IsRUFBRSxDQUFDO0FBZ0JwRCxpQkFBd0IsS0FBWTtJQUNoQyxNQUFNLFFBQVEsR0FBRyxzQkFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLElBQUksR0FBRyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqQyxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ04sR0FBRyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0MsR0FBRyxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDMUIsbUJBQW1CLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ25DO0lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3RDLFVBQVUsQ0FBQyxHQUFHLENB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

/***/ }),

/***/ "./_dist/view/Parts.js":
/*!*****************************!*\
  !*** ./_dist/view/Parts.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../node_modules/hslayout/index.js");
const Tooltip_1 = __webpack_require__(/*! ./Tooltip */ "./_dist/view/Tooltip.js");
const DocSets_1 = __webpack_require__(/*! ../DocSets */ "./_dist/DocSets.js");
const SourceBase = 'src/';
function flags(mdl, ignore = []) {
    const ignoreExportInKind = ['Method', 'Property'];
    const knownFlags = {
        isExported: 'export',
        isExternal: 'external',
        isPublic: 'public',
        isPrivate: 'private',
        isProtected: 'protected',
        isConstructorProperty: 'constructorProperty',
        isAbstract: 'abstract',
        isConst: 'const',
        isStatic: 'static',
        isOptional: 'optional'
    };
    return hslayout_1.m('span.hs-item-flags', !mdl.flags ? [] :
        Object.keys(mdl.flags).map((f) => {
            let ign = false;
            let flag = knownFlags[f];
            if (flag === undefined) {
                flag = f;
            }
            else {
                ign = (ignore.indexOf(flag) >= 0);
            }
            if (flag === 'export' && ignoreExportInKind.indexOf(mdl.kindString) >= 0) {
                ign = true;
            }
            return hslayout_1.m(`span.hs-item-${ign ? 'ignore' : (flag === f ? 'unknown' : flag)}-flag`, ign ? undefined : flag);
        }));
}
exports.flags = flags;
function kindString(mdl) {
    return hslayout_1.m('span.hs-item-kind', mdl.kindString);
}
exports.kindString = kindString;
function itemName(mdl, sub) {
    return hslayout_1.m('span.hs-item-name', !mdl.fullPath ? sub.name : libLink('a', mdl.lib, mdl.fullPath, sub.name));
}
exports.itemName = itemName;
function itemTooltip(mdl) {
    return hslayout_1.m('span.hs-item-name', Tooltip_1.tooltip(mdl.name, 'class name and then some', 'bottom'));
}
exports.itemTooltip = itemTooltip;
function extensionOf(mdl) {
    return hslayout_1.m('span.hs-item-extensions', !mdl.extendedTypes ? undefined : [
        hslayout_1.m('span.hs-item-extends', 'extends'),
        hslayout_1.m('span', mdl.extendedTypes.map((t, i) => hslayout_1.m('span.hs-item-extension', [
            libLink('a', mdl.lib, DocSets_1.DocSets.get(mdl.lib, t.id).fullPath, t.name),
            mdl.extendedTypes.map.length > (i + 1) ? ', ' : ''
        ]))),
    ]);
}
exports.extensionOf = extensionOf;
function inheritedFrom(mdl) {
    if (mdl.inheritedFrom) {
        let parent = DocSets_1.DocSets.get(mdl.lib, mdl.inheritedFrom.id);
        parent = DocSets_1.DocSets.get(mdl.lib, parent.fullPath.substring(0, parent.fullPath.lastIndexOf('.')));
        return hslayout_1.m('span.hs-item-inherited-from', [
            hslayout_1.m('span', 'inherited from '),
            libLink('a', parent.lib, parent.fullPath, parent.name)
        ]);
    }
    else {
        return hslayout_1.m('span.hs-item-inherited-from', undefined);
    }
}
exports.inheritedFrom = inheritedFrom;
function sourceLink(mdl) {
    const source = mdl.sources ? mdl.sources[0] : undefined;
    if (source) {
        let file = (source.fileName || '').replace('.ts', '.html');
        const index = file.indexOf(mdl.lib);
        if (index > 0) {
            file = file.substr(index);
        }
        return hslayout_1.m('span.hs-item-member-source', hslayout_1.m('a', { href: `${SourceBase}${mdl.lib}/${file}#${Math.max(0, source.line - 5)}`, target: "_blank" }, '[source]'));
    }
    else {
        return hslayout_1.m('span.hs-item-member-source', '');
    }
}
exports.sourceLink = sourceLink;
function libLink(css, lib, id, name) {
    return hslayout_1.m(css, { href: `/api/${lib}/${id}`, oncreate: hslayout_1.m.route.link, onupdate: hslayout_1.m.route.link }, name);
}
exports.libLink = libLink;
;
function signature(s, mdl) {
    const comma = (i) => (i > 0) ? ', ' : '';
    function optional(flags) {
        return (flags && flags.isOptional) ? '.hs-item-optional' : '';
    }
    let sig = [];
    if (s) {
        if (s.parameters) {
            sig = s.parameters.map((p, i) => hslayout_1.m('span', [
                comma(i),
                hslayout_1.m('span.hs-item-sig-param', [
                    hslayout_1.m(`span.hs-item-name${optional(p.flags)}`, p.name),
                    type(p, mdl.lib)
                ])
            ]));
        }
        switch (mdl.kindString) {
            case 'Method':
            case 'Function':
            case 'Constructor':
                sig.unshift(hslayout_1.m('span.hs-item-name', '('));
                sig.push(hslayout_1.m('span.hs-item-name', ')'));
                break;
            default:
        }
    }
    return hslayout_1.m('span.hs-item-signature', sig);
}
exports.signature = signature;
function defaultVal(s, lib) {
    if (s && s.defaultValue) {
        let val = ` = ${s.defaultValue}`.replace(/{/gi, '{ ').replace(/}/gi, ' }');
        return hslayout_1.m('span.hs-item-default', val);
    }
    else {
        return;
    }
}
exports.defaultVal = defaultVal;
function type(t, lib) {
    function _type(tt) {
        switch (tt.type) {
            case undefined: return '';
            case 'array': return hslayout_1.m('span.hs-item-type-array', ['Array<', _type(tt.elementType), '>']);
            case 'tuple': return hslayout_1.m('span.hs-item-type-tuple', [
                '[ ',
                ...tt.elements.map((e, i) => [i > 0 ? ', ' : undefined, _type(e)]),
                ' ]'
            ]);
            case 'intrinsic':
            case 'instrinct': return hslayout_1.m('span.hs-item-type-instrinct', tt.id ? libLink('span', lib, tt.fullPath, tt.name) : tt.name);
            case 'stringLiteral': return hslayout_1.m('span.hs-item-type-string-literal', tt.type);
            case 'union': return hslayout_1.m('span.hs-item-type-union', [...tt.types.map((e, i) => [i > 0 ? ' | ' : undefined, _type(e)])]);
            case 'reference':
                let refRes = tt.name;
                if (tt.id) {
                    const typeRef = DocSets_1.DocSets.get(lib, tt.id);
                    if (typeRef.typeArguments) {
                        refRes = typeRef.name + '<' + typeRef.typeArguments.map(_type).join(', ') + '>';
                    }
                    else if (typeRef.id) {
                        refRes = libLink('a', lib, typeRef.fullPath, typeRef.name);
                    }
                    else {
                        refRes = typeRef.name;
                    }
                }
                return hslayout_1.m('span.hs-item-type-reference', refRes);
            case 'reflection':
                let rflRes;
                if (tt.declaration) {
                    rflRes = !tt.declaration.children ? tt.declaration.kindString :
                        hslayout_1.m('span.hs-item-reflection', [
                            '{ ',
                            ...tt.declaration.children.map((c, i) => [i > 0 ? ', ' : undefined, c.name, ': ', _type(c.type)]),
                            ' }'
                        ]);
                }
                else {
                    rflRes = 'UNKNOWN';
                }
                return hslayout_1.m('span.hs-item-type-reflection', rflRes);
            default:
                console.log('unknown type ' + tt.type);
                console.log(t);
                return t.type;
        }
    }
    try {
        return hslayout_1.m('span', !t.type ? '' : [
            hslayout_1.m('span.hs-item-name', ':'),
            hslayout_1.m('span.hs-item-sig-type', _type(t.type)),
            defaultVal(t, lib)
        ]);
    }
    catch (e) {
        console.log(e);
        console.log(e.trace);
    }
}
exports.type = type;
function makeID(section, mdl) {
    let result = section ? section + '_' : '';
    result = (result + (mdl.name || '')).toLowerCase();
    return (result !== '') ? result : undefined;
}
exports.makeID = makeID;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFydHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdmlldy9QYXJ0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFtQztBQUNuQyx1Q0FBb0M7QUFDcEMsd0NBQXFDO0FBRXJDLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQztBQUkxQixlQUFzQixHQUFPLEVBQUUsU0FBZ0IsRUFBRTtJQUM3QyxNQUFNLGtCQUFrQixHQUFHLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ2xELE1BQU0sVUFBVSxHQUFHO1FBQ2YsVUFBVSxFQUFjLFFBQVE7UUFDaEMsVUFBVSxFQUFjLFVBQVU7UUFDbEMsUUFBUSxFQUFnQixRQUFRO1FBQ2hDLFNBQVMsRUFBZSxTQUFTO1FBQ2pDLFdBQVcsRUFBYSxXQUFXO1FBQ25DLHFCQUFxQixFQUFHLHFCQUFxQjtRQUM3QyxVQUFVLEVBQWMsVUFBVTtRQUNsQyxPQUFPLEVBQWlCLE9BQU87UUFDL0IsUUFBUSxFQUFnQixRQUFRO1FBQ2hDLFVBQVUsRUFBYyxVQUFVO0tBQ3JDLENBQUM7SUFDRixPQUFPLFlBQUMsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQVEsRUFBRSxFQUFFO1lBQ3BDLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQztZQUNoQixJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO2dCQUFFLElBQUksR0FBRyxDQUFDLENBQUM7YUFBRTtpQkFDaEM7Z0JBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUFFO1lB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

/***/ }),

/***/ "./_dist/view/Tooltip.js":
/*!*******************************!*\
  !*** ./_dist/view/Tooltip.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../node_modules/hslayout/index.js");
function tooltip(text, tip, position) {
    return hslayout_1.m('.hs-tooltip[href=#]', [text, hslayout_1.m(`span.hs-tooltip-${position}`, tip)]);
}
exports.tooltip = tooltip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9vbHRpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3L1Rvb2x0aXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBbUM7QUFFbkMsaUJBQXdCLElBQVcsRUFBRSxHQUFVLEVBQUUsUUFBZTtJQUU1RCxPQUFPLFlBQUMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLElBQUksRUFBRSxZQUFDLENBQUMsbUJBQW1CLFFBQVEsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuRixDQUFDO0FBSEQsMEJBR0MifQ==

/***/ })

/******/ });