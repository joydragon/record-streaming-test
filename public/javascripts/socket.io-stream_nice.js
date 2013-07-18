! function (e) {
    if ("function" == typeof bootstrap) bootstrap("ss", e);
    else if ("object" == typeof exports) module.exports = e();
    else if ("function" == typeof define && define.amd) define(e);
    else if ("undefined" != typeof ses) {
        if (!ses.ok()) return;
        ses.makeSs = e
    } else "undefined" != typeof window ? window.ss = e() : global.ss = e()
}(function () {
    var define, ses, bootstrap, module, exports;
    return function (e, t, n) {
        function i(n, s) {
            if (!t[n]) {
                if (!e[n]) {
                    var o = typeof require == "function" && require;
                    if (!s && o) return o(n, !0);
                    if (r) return r(n, !0);
                    throw new Error("Cannot find module '" + n + "'")
                }
                var u = t[n] = {
                    exports: {}
                };
                e[n][0].call(u.exports, function (t) {
                    var r = e[n][1][t];
                    return i(r ? r : t)
                }, u, u.exports)
            }
            return t[n].exports
        }
        var r = typeof require == "function" && require;
        for (var s = 0; s < n.length; s++) i(n[s]);
        return i
    }({
        1: [
            function (require, module, exports) {
                module.exports = require("./lib")
            }, {
                "./lib": 2
            }
        ],
        2: [
            function (require, module, exports) {
                var Socket = require("./socket"),
                    WriteStream = require("./write-stream"),
                    BlobReadStream = require("./blob-read-stream");
                exports = module.exports = lookup;
                exports.
                Socket = Socket;

                function lookup(sio) {
                    if (!sio._streamSocket) {
                        sio._streamSocket = new Socket(sio)
                    }
                    return sio._streamSocket
                }
                exports.createStream = function (options) {
                    return new WriteStream(options)
                };
                exports.createBlobReadStream = function (blob, options) {
                    return new BlobReadStream(blob, options)
                }
            }, {
                "./socket": 3,
                "./write-stream": 4,
                "./blob-read-stream": 5
            }
        ],
        6: [
            function (require, module, exports) {
                var events = require("events");
                exports.isArray = isArray;
                exports.isDate = function (obj) {
                    return Object.prototype.toString.call(obj) === "[object Date]"
                };
                exports.isRegExp = function (obj) {
                    return Object.prototype.toString.call(obj) === "[object RegExp]"
                };
                exports.print = function () {};
                exports.puts = function () {};
                exports.debug = function () {};
                exports.inspect = function (obj, showHidden, depth, colors) {
                    var seen = [];
                    var stylize = function (str, styleType) {
                        var styles = {
                            bold: [1, 22],
                            italic: [3, 23],
                            underline: [4, 24],
                            inverse: [7, 27],
                            white: [37, 39],
                            grey: [90, 39],
                            black: [30, 39],
                            blue: [34, 39],
                            cyan: [36, 39],
                            green: [32, 39],
                            magenta: [35, 39],
                            red: [31, 39],
                            yellow: [33, 39]
                        };
                        var style = {
                            special: "cyan",
                            number: "blue",
                            "boolean": "yellow",
                            undefined: "grey",
                            "null": "bold",
                            string: "green",
                            date: "magenta",
                            regexp: "red"
                        }[styleType];
                        if (style) {
                            return "[" + styles[style][0] + "m" + str + "[" + styles[style][1] + "m"
                        } else {
                            return str
                        }
                    };
                    if (!colors) {
                        stylize = function (str, styleType) {
                            return str
                        }
                    }

                    function format(value, recurseTimes) {
                        if (value && typeof value.inspect === "function" && value !== exports && !(value.constructor && value.constructor.prototype === value)) {
                            return value.inspect(recurseTimes)
                        }
                        switch (typeof value) {
                        case "undefined":
                            return stylize("undefined", "undefined");
                        case "string":
                            var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                            return stylize(simple, "string");
                        case "number":
                            return stylize("" + value, "number");
                        case "boolean":
                            return stylize("" + value, "boolean")
                        }
                        if (value === null) {
                            return stylize("null", "null")
                        }
                        var visible_keys = Object_keys(value);
                        var keys = showHidden ? Object_getOwnPropertyNames(value) : visible_keys;
                        if (typeof value === "function" && keys.length === 0) {
                            if (isRegExp(value)) {
                                return stylize("" + value, "regexp")
                            } else {
                                var name = value.name ? ": " + value.name : "";
                                return stylize("[Function" + name + "]", "special")
                            }
                        }
                        if (isDate(value) && keys.length === 0) {
                            return stylize(value.toUTCString(), "date")
                        }
                        var base, type, braces;
                        if (isArray(value)) {
                            type = "Array";
                            braces = ["[", "]"]
                        } else {
                            type = "Object";
                            braces = ["{", "}"]
                        } if (typeof value === "function") {
                            var n = value.name ? ": " + value.name : "";
                            base = isRegExp(value) ? " " + value : " [Function" + n + "]"
                        } else {
                            base = ""
                        } if (isDate(value)) {
                            base = " " + value.toUTCString()
                        }
                        if (keys.length === 0) {
                            return braces[0] + base + braces[1]
                        }
                        if (recurseTimes < 0) {
                            if (isRegExp(value)) {
                                return stylize("" + value, "regexp")
                            } else {
                                return stylize("[Object]", "special")
                            }
                        }
                        seen.push(value);
                        var output = keys.map(function (key) {
                            var name, str;
                            if (value.__lookupGetter__) {
                                if (value.__lookupGetter__(key)) {
                                    if (value.__lookupSetter__(key)) {
                                        str = stylize("[Getter/Setter]", "special")
                                    } else {
                                        str = stylize("[Getter]", "special")
                                    }
                                } else {
                                    if (value.__lookupSetter__(key)) {
                                        str = stylize("[Setter]", "special")
                                    }
                                }
                            }
                            if (visible_keys.indexOf(key) < 0) {
                                name = "[" + key + "]"
                            }
                            if (!str) {
                                if (seen.indexOf(value[key]) < 0) {
                                    if (recurseTimes === null) {
                                        str = format(value[key])
                                    } else {
                                        str = format(value[key], recurseTimes - 1)
                                    } if (str.indexOf("\n") > -1) {
                                        if (isArray(value)) {
                                            str = str.split("\n").map(function (line) {
                                                return "  " + line
                                            }).join("\n").substr(2)
                                        } else {
                                            str = "\n" + str.split("\n").map(function (line) {
                                                return "   " + line
                                            }).join("\n")
                                        }
                                    }
                                } else {
                                    str = stylize("[Circular]", "special")
                                }
                            }
                            if (typeof name === "undefined") {
                                if (type === "Array" && key.match(/^\d+$/)) {
                                    return str
                                }
                                name = JSON.stringify("" + key);
                                if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
                                    name = name.substr(1, name.length - 2);
                                    name = stylize(name, "name")
                                } else {
                                    name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
                                    name = stylize(name, "string")
                                }
                            }
                            return name + ": " + str
                        });
                        seen.pop();
                        var numLinesEst = 0;
                        var length = output.reduce(function (prev, cur) {
                            numLinesEst++;
                            if (cur.indexOf("\n") >= 0) numLinesEst++;
                            return prev + cur.length + 1
                        }, 0);
                        if (length > 50) {
                            output = braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1]
                        } else {
                            output = braces[0] + base + " " + output.join(", ") + " " + braces[1]
                        }
                        return output
                    }
                    return
                    format(obj, typeof depth === "undefined" ? 2 : depth)
                };

                function isArray(ar) {
                    return ar instanceof Array || Array.isArray(ar) || ar && ar !== Object.prototype && isArray(ar.__proto__)
                }

                function isRegExp(re) {
                    return re instanceof RegExp || typeof re === "object" && Object.prototype.toString.call(re) === "[object RegExp]"
                }

                function isDate(d) {
                    if (d instanceof Date) return true;
                    if (typeof d !== "object") return false;
                    var properties = Date.prototype && Object_getOwnPropertyNames(Date.prototype);
                    var proto = d.__proto__ && Object_getOwnPropertyNames(d.__proto__);
                    return JSON.stringify(proto) === JSON.stringify(properties)
                }

                function pad(n) {
                    return n < 10 ? "0" + n.toString(10) : n.toString(10)
                }
                var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                function timestamp() {
                    var d = new Date;
                    var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(":");
                    return [d.getDate(), months[d.getMonth()], time].join(" ")
                }
                exports.log = function (msg) {};
                exports.pump = null;
                var Object_keys = Object.keys || function (obj) {
                        var res = [];
                        for (var key in obj) res.push(
                            key);
                        return res
                    };
                var Object_getOwnPropertyNames = Object.getOwnPropertyNames || function (obj) {
                        var res = [];
                        for (var key in obj) {
                            if (Object.hasOwnProperty.call(obj, key)) res.push(key)
                        }
                        return res
                    };
                var Object_create = Object.create || function (prototype, properties) {
                        var object;
                        if (prototype === null) {
                            object = {
                                __proto__: null
                            }
                        } else {
                            if (typeof prototype !== "object") {
                                throw new TypeError("typeof prototype[" + typeof prototype + "] != 'object'")
                            }
                            var Type = function () {};
                            Type.prototype = prototype;
                            object = new Type;
                            object.__proto__ = prototype
                        } if (typeof properties !== "undefined" && Object.defineProperties) {
                            Object.defineProperties(object, properties)
                        }
                        return object
                    };
                exports.inherits = function (ctor, superCtor) {
                    ctor.super_ = superCtor;
                    ctor.prototype = Object_create(superCtor.prototype, {
                        constructor: {
                            value: ctor,
                            enumerable: false,
                            writable: true,
                            configurable: true
                        }
                    })
                };
                var formatRegExp = /%[sdj%]/g;
                exports.format = function (f) {
                    if (typeof f !== "string") {
                        var objects = [];
                        for (var i = 0; i < arguments.length; i++) {
                            objects.push(exports.inspect(arguments[i]))
                        }
                        return objects.join(" ")
                    }
                    var i = 1;
                    var args = arguments;
                    var len = args.length;
                    var str = String(f).replace(formatRegExp, function (x) {
                        if (x === "%%") return "%";
                        if (i >= len) return x;
                        switch (x) {
                        case "%s":
                            return String(args[i++]);
                        case "%d":
                            return Number(args[i++]);
                        case "%j":
                            return JSON.stringify(args[i++]);
                        default:
                            return x
                        }
                    });
                    for (var x = args[i]; i < len; x = args[++i]) {
                        if (x === null || typeof x !== "object") {
                            str += " " + x
                        } else {
                            str += " " + exports.inspect(x)
                        }
                    }
                    return str
                }
            }, {
                events: 7
            }
        ],
        8: [
            function (require, module, exports) {
                var process = module.exports = {};
                process.nextTick = function () {
                    var canSetImmediate = typeof window !== "undefined" && window.setImmediate;
                    var canPost = typeof window !== "undefined" && window.postMessage && window.addEventListener;
                    if (canSetImmediate) {
                        return function (f) {
                            return window.setImmediate(f)
                        }
                    }
                    if (canPost) {
                        var queue = [];
                        window.addEventListener("message", function (ev) {
                            if (ev.source === window && ev.data === "process-tick") {
                                ev.stopPropagation();
                                if (queue.length > 0) {
                                    var fn = queue.shift();
                                    fn()
                                }
                            }
                        }, true);
                        return function nextTick(fn) {
                            queue.push(fn);
                            window.postMessage("process-tick", "*")
                        }
                    }
                    return

                    function nextTick(fn) {
                        setTimeout(fn, 0)
                    }
                }();
                process.title = "browser";
                process.browser = true;
                process.env = {};
                process.argv = [];
                process.binding = function (name) {
                    throw new Error("process.binding is not supported")
                };
                process.cwd = function () {
                    return "/"
                };
                process.chdir = function (dir) {
                    throw new Error("process.chdir is not supported")
                }
            }, {}
        ],
        7: [
            function (require, module, exports) {
                ! function (process) {
                    if (!process.EventEmitter) process.EventEmitter = function () {};
                    var EventEmitter = exports.EventEmitter = process.EventEmitter;
                    var isArray = typeof Array.isArray === "function" ? Array.isArray : function (xs) {
                            return Object.prototype.toString.call(xs) === "[object Array]"
                        };

                    function indexOf(xs, x) {
                        if (xs.indexOf) return xs.indexOf(x);
                        for (var i = 0; i < xs.length; i++) {
                            if (x === xs[i]) return i
                        }
                        return -1
                    }
                    var defaultMaxListeners = 10;
                    EventEmitter.prototype.setMaxListeners = function (n) {
                        if (!this._events) this._events = {};
                        this._events.maxListeners = n
                    };
                    EventEmitter.prototype.emit = function (type) {
                        if (type === "error") {
                            if (!this._events || !this._events.error || isArray(this._events.error) && !this._events.error.length) {
                                if (arguments[1] instanceof Error) {
                                    throw arguments[1]
                                } else {
                                    throw new Error("Uncaught, unspecified 'error' event.")
                                }
                                return false
                            }
                        }
                        if (!this._events) return false;
                        var handler = this._events[type];
                        if (!handler) return false;
                        if (typeof handler == "function") {
                            switch (arguments.length) {
                            case 1:
                                handler.call(this);
                                break;
                            case 2:
                                handler.call(this, arguments[1]);
                                break;
                            case 3:
                                handler.call(this, arguments[1], arguments[2]);
                                break;
                            default:
                                var args = Array.prototype.slice.call(arguments, 1);
                                handler.apply(this, args)
                            }
                            return true
                        } else if (isArray(handler)) {
                            var args = Array.prototype.slice.call(arguments, 1);
                            var listeners = handler.slice();
                            for (var i = 0, l = listeners.length; i < l; i++) {
                                listeners[i].apply(this, args)
                            }
                            return true
                        } else {
                            return false
                        }
                    };
                    EventEmitter.prototype.addListener = function (type, listener) {
                        if ("function" !== typeof listener) {
                            throw new Error("addListener only takes instances of Function")
                        }
                        if (!this._events) this._events = {};
                        this.emit("newListener", type, listener);
                        if (!this._events[type]) {
                            this._events[type] = listener
                        } else if (isArray(
                            this._events[type])) {
                            if (!this._events[type].warned) {
                                var m;
                                if (this._events.maxListeners !== undefined) {
                                    m = this._events.maxListeners
                                } else {
                                    m = defaultMaxListeners
                                } if (m && m > 0 && this._events[type].length > m) {
                                    this._events[type].warned = true;
                                    console.error("(node) warning: possible EventEmitter memory " + "leak detected. %d listeners added. " + "Use emitter.setMaxListeners() to increase limit.", this._events[type].length);
                                    console.trace()
                                }
                            }
                            this._events[type].push(listener)
                        } else {
                            this._events[type] = [this._events[type], listener]
                        }
                        return this
                    };
                    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
                    EventEmitter.prototype.once = function (type, listener) {
                        var self = this;
                        self.on(type, function g() {
                            self.removeListener(type, g);
                            listener.apply(this, arguments)
                        });
                        return this
                    };
                    EventEmitter.prototype.removeListener = function (type, listener) {
                        if ("function" !== typeof listener) {
                            throw new Error("removeListener only takes instances of Function")
                        }
                        if (!this._events || !this._events[type]) return this;
                        var list = this._events[type];
                        if (isArray(list)) {
                            var i = indexOf(
                                list, listener);
                            if (i < 0) return this;
                            list.splice(i, 1);
                            if (list.length == 0) delete this._events[type]
                        } else if (this._events[type] === listener) {
                            delete this._events[type]
                        }
                        return this
                    };
                    EventEmitter.prototype.removeAllListeners = function (type) {
                        if (arguments.length === 0) {
                            this._events = {};
                            return this
                        }
                        if (type && this._events && this._events[type]) this._events[type] = null;
                        return this
                    };
                    EventEmitter.prototype.listeners = function (type) {
                        if (!this._events) this._events = {};
                        if (!this._events[type]) this._events[type] = [];
                        if (!isArray(this._events[type])) {
                            this._events[type] = [this._events[type]]
                        }
                        return this._events[type]
                    }
                }(require("__browserify_process"))
            }, {
                __browserify_process: 8
            }
        ],
        3: [
            function (require, module, exports) {
                var util = require("util"),
                    EventEmitter = require("events").EventEmitter,
                    ReadStream = require("./read-stream"),
                    WriteStream = require("./write-stream"),
                    debug = require("debug")("socket.io-stream:socket"),
                    emit = EventEmitter.prototype.emit,
                    slice = Array.prototype.slice;
                exports = module.exports = Socket;
                exports.event = "stream";
                exports.events = ["error"];
                util.
                inherits(Socket, EventEmitter);

                function Socket(sio) {
                    if (!(this instanceof Socket)) {
                        return new Socket(sio)
                    }
                    EventEmitter.call(this);
                    this.sio = sio;
                    this.ids = 0;
                    this.readStreams = {};
                    this.writeStreams = {};
                    var eventName = exports.event;
                    sio.on(eventName, this._onstream.bind(this));
                    sio.on(eventName + "-read", this._onread.bind(this));
                    sio.on(eventName + "-write", this._onwrite.bind(this));
                    sio.on(eventName + "-end", this._onend.bind(this));
                    sio.on(eventName + "-writeerror", this._onwriteerror.bind(this));
                    sio.on(eventName + "-readerror", this._onreaderror.bind(this));
                    sio.on("error", this.emit.bind(this, "error"))
                }
                Socket.prototype.emit = function (type) {
                    if (~exports.events.indexOf(type)) {
                        return emit.apply(this, arguments)
                    }
                    this._stream.apply(this, arguments);
                    return this
                };
                Socket.prototype._stream = function () {
                    debug("sending new streams");
                    var args = slice.call(arguments),
                        type = args.shift(),
                        sio = this.sio,
                        pos = [];
                    args = args.map(function (stream, i) {
                        if (!(stream instanceof WriteStream)) {
                            return stream
                        }
                        if (stream.socket) {
                            throw new Error("stream has already been sent.")
                        }
                        pos.
                        push(i);
                        var id = this.ids++;
                        this.writeStreams[id] = stream;
                        stream.id = id;
                        stream.socket = this;
                        ["finish", "error"].forEach(function (type) {
                            stream.on(type, function () {
                                delete this.writeStreams[id]
                            }.bind(this))
                        }, this);
                        return id
                    }, this);
                    args.unshift(exports.event, pos, type);
                    sio.emit.apply(sio, args)
                };
                Socket.prototype._read = function (id, size) {
                    this.sio.emit(exports.event + "-read", id, size)
                };
                Socket.prototype._write = function (id, chunk, encoding, callback) {
                    encoding = "base64";
                    chunk = chunk.toString(encoding);
                    this.sio.emit(exports.event + "-write", id, chunk, encoding, callback)
                };
                Socket.prototype._end = function (id) {
                    this.sio.emit(exports.event + "-end", id)
                };
                Socket.prototype._writeerror = function (id, err) {
                    this.sio.emit(exports.event + "-writeerror", id, err.message || err)
                };
                Socket.prototype._readerror = function (id, err) {
                    this.sio.emit(exports.event + "-readerror", id, err.message || err)
                };
                Socket.prototype._onstream = function () {
                    debug("new streams");
                    var args = slice.call(arguments),
                        pos = args.shift(),
                        type = args.shift(),
                        streams;
                    args = args.map(function (id, i) {
                        if (!~pos.indexOf(i)) {
                            return id
                        }
                        if (this.readStreams[id]) {
                            this._readerror(id, "id already exists");
                            return
                        }
                        var stream = this.readStreams[id] = new ReadStream;
                        stream.id = id;
                        stream.socket = this;
                        ["end", "error"].forEach(function (type) {
                            stream.on(type, function () {
                                delete this.readStreams[id]
                            }.bind(this))
                        }, this);
                        return stream
                    }, this);
                    args.unshift(type);
                    emit.apply(this, args)
                };
                Socket.prototype._onread = function (id, size) {
                    debug('read: "%s"', id);
                    var writeStream = this.writeStreams[id];
                    if (writeStream) {
                        writeStream._read(size)
                    } else {
                        this._writeerror(id, "invalid stream id")
                    }
                };
                Socket.prototype._onwrite = function (id, chunk, encoding, callback) {
                    debug('write: "%s"', id);
                    var readStream = this.readStreams[id];
                    if (readStream) {
                        readStream._write(chunk, encoding, callback)
                    } else {
                        this._readerror(id, "invalid stream id")
                    }
                };
                Socket.prototype._onend = function (id) {
                    debug('end: "%s"', id);
                    var readStream = this.readStreams[id];
                    if (readStream) {
                        readStream._end()
                    } else {
                        this._readerror(id, "invalid stream id")
                    }
                };
                Socket.prototype._onwriteerror = function (id, message) {
                    debug('write error: "%s", "%s"', id,
                        message);
                    var readStream = this.readStreams[id];
                    if (readStream) {
                        var err = new Error(message);
                        err.remote = true;
                        readStream.emit("error", err)
                    } else {
                        debug('invalid read-stream id: "%s"', id)
                    }
                };
                Socket.prototype._onreaderror = function (id, message) {
                    debug('read error: "%s", "%s"', id, message);
                    var writeStream = this.writeStreams[id];
                    if (writeStream) {
                        var err = new Error(message);
                        err.remote = true;
                        writeStream.emit("error", err)
                    } else {
                        debug('invalid write-stream id: "%s"', id)
                    }
                }
            }, {
                util: 6,
                events: 7,
                "./read-stream": 9,
                "./write-stream": 4,
                debug: 10
            }
        ],
        4: [
            function (require, module, exports) {
                var util = require("util"),
                    Writable = require("readable-stream").Writable;
                module.exports = WriteStream;
                util.inherits(WriteStream, Writable);

                function WriteStream(options) {
                    if (!(this instanceof WriteStream)) {
                        return new WriteStream(options)
                    }
                    Writable.call(this, options);
                    this.id = null;
                    this.socket = null;
                    this._writable = false;
                    this.writeBuffer = [];
                    this.once("finish", this._onfinish.bind(this));
                    this.on("error", this._onerror.bind(this))
                }
                WriteStream.prototype._write = function (chunk, encoding,
                    callback) {
                    var self = this;

                    function write() {
                        self._writable = false;
                        self.socket._write(self.id, chunk, encoding, callback)
                    }
                    if (this._writable) {
                        write()
                    } else {
                        this.writeBuffer.push(write)
                    }
                };
                WriteStream.prototype._read = function (size) {
                    var write = this.writeBuffer.shift();
                    if (write) return write();
                    this._writable = true
                };
                WriteStream.prototype._onfinish = function () {
                    this.socket._end(this.id)
                };
                WriteStream.prototype._onerror = function (err) {
                    if (!this.socket) return;
                    if (err.remote) return;
                    this.socket._writeerror(this.id, err)
                }
            }, {
                util: 6,
                "readable-stream": 11
            }
        ],
        5: [
            function (require, module, exports) {
                var util = require("util"),
                    Readable = require("readable-stream").Readable;
                module.exports = BlobReadStream;
                util.inherits(BlobReadStream, Readable);

                function BlobReadStream(blob, options) {
                    if (!(this instanceof BlobReadStream)) {
                        return new BlobReadStream(blob, options)
                    }
                    Readable.call(this, options);
                    this.blob = blob;
                    this.slice = blob.slice || blob.webkitSlice || blob.mozSlice;
                    this.start = 0;
                    var fileReader = this.fileReader = new FileReader;
                    fileReader.onload = this._onload.bind(this);
                    fileReader.onerror = this._onerror.bind(this)
                }
                BlobReadStream.prototype._read = function (size) {
                    var start = this.start,
                        end = this.start = this.start + size,
                        chunk = this.slice.call(this.blob, start, end);
                    if (chunk.size) {
                        this.fileReader.readAsDataURL(chunk)
                    } else {
                        this.push(null)
                    }
                };
                BlobReadStream.prototype._onload = function (e) {
                    var chunk = e.target.result.match(/,(.*)$/)[1];
                    this.push(chunk, "base64")
                };
                BlobReadStream.prototype._onerror = function (e) {
                    var err = e.target.error;
                    this.emit("error", err)
                }
            }, {
                util: 6,
                "readable-stream": 11
            }
        ],
        10: [
            function (require, module, exports) {
                module.exports = debug;

                function debug(name) {
                    if (!debug.enabled(name)) return function () {};
                    return function (fmt) {
                        var curr = new Date;
                        var ms = curr - (debug[name] || curr);
                        debug[name] = curr;
                        fmt = name + " " + fmt + " +" + debug.humanize(ms);
                        window.console && console.log && Function.prototype.apply.call(console.log, console, arguments)
                    }
                }
                debug.names = [];
                debug.skips = [];
                debug.enable = function (name) {
                    try {
                        localStorage.debug = name
                    } catch (e) {}
                    var split = (name || "").split(/[\s,]+/),
                        len = split.length;
                    for (var i = 0; i < len; i++) {
                        name = split[i].replace("*", ".*?");
                        if (name[0] === "-") {
                            debug.skips.push(new RegExp("^" + name.substr(1) + "$"))
                        } else {
                            debug.names.push(new RegExp("^" + name + "$"))
                        }
                    }
                };
                debug.disable = function () {
                    debug.enable("")
                };
                debug.humanize = function (ms) {
                    var sec = 1e3,
                        min = 60 * 1e3,
                        hour = 60 * min;
                    if (ms >= hour) return (ms / hour).toFixed(1) + "h";
                    if (ms >= min) return (ms / min).toFixed(1) + "m";
                    if (ms >= sec) return (ms / sec | 0) + "s";
                    return ms + "ms"
                };
                debug.enabled = function (name) {
                    for (var i = 0, len = debug.skips.length; i < len; i++) {
                        if (debug.skips[i].test(name)) {
                            return false
                        }
                    }
                    for (var i = 0, len = debug.names.length; i < len; i++) {
                        if (debug.names[i].test(name)) {
                            return true
                        }
                    }
                    return false
                };
                if (window.localStorage) debug.enable(localStorage.debug)
            }, {}
        ],
        11: [
            function (require, module, exports) {
                exports = module.exports = require("./lib/_stream_readable.js");
                exports.Readable = exports;
                exports.Writable = require("./lib/_stream_writable.js");
                exports.Duplex = require("./lib/_stream_duplex.js");
                exports.Transform = require("./lib/_stream_transform.js");
                exports.PassThrough = require("./lib/_stream_passthrough.js")
            }, {
                "./lib/_stream_readable.js": 12,
                "./lib/_stream_writable.js": 13,
                "./lib/_stream_duplex.js": 14,
                "./lib/_stream_transform.js": 15,
                "./lib/_stream_passthrough.js": 16
            }
        ],
        9: [
            function (require, module, exports) {
                var util = require("util"),
                    Readable = require("readable-stream").Readable;
                module.exports = ReadStream;
                util.inherits(ReadStream, Readable);

                function ReadStream(options) {
                    if (!(this instanceof ReadStream)) {
                        return new ReadStream(options)
                    }
                    Readable.call(this, options);
                    this.id = null;
                    this.socket = null;
                    this._readable = false;
                    this.pushBuffer = [];
                    this.on("error", this._onerror.bind(this))
                }
                ReadStream.prototype._read = function (size) {
                    var push;
                    if (this.pushBuffer.length) {
                        while (push = this.pushBuffer.shift()) {
                            if (!push()) break
                        }
                        return
                    }
                    this._readable = true;
                    this.socket._read(this.id, size)
                };
                ReadStream.prototype._write = function (chunk, encoding, callback) {
                    var self = this;

                    function push() {
                        self._readable = false;
                        var ret = self.push(chunk || "", encoding);
                        callback();
                        return ret
                    }
                    if (this._readable) {
                        push()
                    } else {
                        this.pushBuffer.push(push)
                    }
                };
                ReadStream.prototype._end = function () {
                    if (
                        this.pushBuffer.length) {
                        this.pushBuffer.push(this._onend.bind(this))
                    } else {
                        this._onend()
                    }
                };
                ReadStream.prototype._onend = function () {
                    this._readable = false;
                    return this.push(null)
                };
                ReadStream.prototype._onerror = function (err) {
                    if (!this.socket) return;
                    if (err.remote) return;
                    this.socket._readerror(this.id, err)
                }
            }, {
                util: 6,
                "readable-stream": 11
            }
        ],
        17: [
            function (require, module, exports) {
                require = function (e, t, n, r) {
                    function i(r) {
                        if (!n[r]) {
                            if (!t[r]) {
                                if (e) return e(r);
                                throw new Error("Cannot find module '" + r + "'")
                            }
                            var s = n[r] = {
                                exports: {}
                            };
                            t[r][0](function (e) {
                                var n = t[r][1][e];
                                return i(n ? n : e)
                            }, s, s.exports)
                        }
                        return n[r].exports
                    }
                    for (var s = 0; s < r.length; s++) i(r[s]);
                    return i
                }(typeof require !== "undefined" && require, {
                    1: [
                        function (require, module, exports) {
                            var util = require("util");
                            var Buffer = require("buffer").Buffer;
                            var pSlice = Array.prototype.slice;

                            function objectKeys(object) {
                                if (Object.keys) return Object.keys(object);
                                var result = [];
                                for (var name in object) {
                                    if (Object.prototype.hasOwnProperty.call(object, name)) {
                                        result.push(name)
                                    }
                                }
                                return result
                            }
                            var
                            assert = module.exports = ok;
                            assert.AssertionError = function AssertionError(options) {
                                this.name = "AssertionError";
                                this.message = options.message;
                                this.actual = options.actual;
                                this.expected = options.expected;
                                this.operator = options.operator;
                                var stackStartFunction = options.stackStartFunction || fail;
                                if (Error.captureStackTrace) {
                                    Error.captureStackTrace(this, stackStartFunction)
                                }
                            };
                            util.inherits(assert.AssertionError, Error);

                            function replacer(key, value) {
                                if (value === undefined) {
                                    return "" + value
                                }
                                if (typeof value === "number" && (isNaN(value) || !isFinite(value))) {
                                    return value.toString()
                                }
                                if (typeof value === "function" || value instanceof RegExp) {
                                    return value.toString()
                                }
                                return value
                            }

                            function truncate(s, n) {
                                if (typeof s == "string") {
                                    return s.length < n ? s : s.slice(0, n)
                                } else {
                                    return s
                                }
                            }
                            assert.AssertionError.prototype.toString = function () {
                                if (this.message) {
                                    return [this.name + ":", this.message].join(" ")
                                } else {
                                    return [this.name + ":", truncate(JSON.stringify(this.actual, replacer), 128), this.operator, truncate(JSON.stringify(this.expected, replacer), 128)].join(" ")
                                }
                            };
                            assert.
                            AssertionError.__proto__ = Error.prototype;

                            function fail(actual, expected, message, operator, stackStartFunction) {
                                throw new assert.AssertionError({
                                    message: message,
                                    actual: actual,
                                    expected: expected,
                                    operator: operator,
                                    stackStartFunction: stackStartFunction
                                })
                            }
                            assert.fail = fail;

                            function ok(value, message) {
                                if ( !! !value) fail(value, true, message, "==", assert.ok)
                            }
                            assert.ok = ok;
                            assert.equal = function equal(actual, expected, message) {
                                if (actual != expected) fail(actual, expected, message, "==", assert.equal)
                            };
                            assert.notEqual = function notEqual(actual, expected, message) {
                                if (actual == expected) {
                                    fail(actual, expected, message, "!=", assert.notEqual)
                                }
                            };
                            assert.deepEqual = function deepEqual(actual, expected, message) {
                                if (!_deepEqual(actual, expected)) {
                                    fail(actual, expected, message, "deepEqual", assert.deepEqual)
                                }
                            };

                            function _deepEqual(actual, expected) {
                                if (actual === expected) {
                                    return true
                                } else if (Buffer.isBuffer(actual) && Buffer.isBuffer(expected)) {
                                    if (actual.length != expected.length) return false;
                                    for (var i = 0; i < actual.length; i++) {
                                        if (actual[i] !== expected[i]) return false
                                    }
                                    return
                                    true
                                } else if (actual instanceof Date && expected instanceof Date) {
                                    return actual.getTime() === expected.getTime()
                                } else if (typeof actual != "object" && typeof expected != "object") {
                                    return actual == expected
                                } else {
                                    return objEquiv(actual, expected)
                                }
                            }

                            function isUndefinedOrNull(value) {
                                return value === null || value === undefined
                            }

                            function isArguments(object) {
                                return Object.prototype.toString.call(object) == "[object Arguments]"
                            }

                            function objEquiv(a, b) {
                                if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) return false;
                                if (a.prototype !== b.prototype) return false;
                                if (isArguments(a)) {
                                    if (!isArguments(b)) {
                                        return false
                                    }
                                    a = pSlice.call(a);
                                    b = pSlice.call(b);
                                    return _deepEqual(a, b)
                                }
                                try {
                                    var ka = objectKeys(a),
                                        kb = objectKeys(b),
                                        key, i
                                } catch (e) {
                                    return false
                                }
                                if (ka.length != kb.length) return false;
                                ka.sort();
                                kb.sort();
                                for (i = ka.length - 1; i >= 0; i--) {
                                    if (ka[i] != kb[i]) return false
                                }
                                for (i = ka.length - 1; i >= 0; i--) {
                                    key = ka[i];
                                    if (!_deepEqual(a[key], b[key])) return false
                                }
                                return true
                            }
                            assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
                                if (_deepEqual(actual, expected)) {
                                    fail(actual,
                                        expected, message, "notDeepEqual", assert.notDeepEqual)
                                }
                            };
                            assert.strictEqual = function strictEqual(actual, expected, message) {
                                if (actual !== expected) {
                                    fail(actual, expected, message, "===", assert.strictEqual)
                                }
                            };
                            assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
                                if (actual === expected) {
                                    fail(actual, expected, message, "!==", assert.notStrictEqual)
                                }
                            };

                            function expectedException(actual, expected) {
                                if (!actual || !expected) {
                                    return false
                                }
                                if (expected instanceof RegExp) {
                                    return expected.test(actual)
                                } else if (actual instanceof expected) {
                                    return true
                                } else if (expected.call({}, actual) === true) {
                                    return true
                                }
                                return false
                            }

                            function _throws(shouldThrow, block, expected, message) {
                                var actual;
                                if (typeof expected === "string") {
                                    message = expected;
                                    expected = null
                                }
                                try {
                                    block()
                                } catch (e) {
                                    actual = e
                                }
                                message = (expected && expected.name ? " (" + expected.name + ")." : ".") + (message ? " " + message : ".");
                                if (shouldThrow && !actual) {
                                    fail("Missing expected exception" + message)
                                }
                                if (!shouldThrow && expectedException(actual, expected)) {
                                    fail("Got unwanted exception" + message)
                                }
                                if (
                                    shouldThrow && actual && expected && !expectedException(actual, expected) || !shouldThrow && actual) {
                                    throw actual
                                }
                            }
                            assert.throws = function (block, error, message) {
                                _throws.apply(this, [true].concat(pSlice.call(arguments)))
                            };
                            assert.doesNotThrow = function (block, error, message) {
                                _throws.apply(this, [false].concat(pSlice.call(arguments)))
                            };
                            assert.ifError = function (err) {
                                if (err) {
                                    throw err
                                }
                            }
                        }, {
                            util: 2,
                            buffer: 3
                        }
                    ],
                    2: [
                        function (require, module, exports) {
                            var events = require("events");
                            exports.isArray = isArray;
                            exports.isDate = function (obj) {
                                return Object.prototype.toString.call(obj) === "[object Date]"
                            };
                            exports.isRegExp = function (obj) {
                                return Object.prototype.toString.call(obj) === "[object RegExp]"
                            };
                            exports.print = function () {};
                            exports.puts = function () {};
                            exports.debug = function () {};
                            exports.inspect = function (obj, showHidden, depth, colors) {
                                var seen = [];
                                var stylize = function (str, styleType) {
                                    var styles = {
                                        bold: [1, 22],
                                        italic: [3, 23],
                                        underline: [4, 24],
                                        inverse: [7, 27],
                                        white: [37, 39],
                                        grey: [90, 39],
                                        black: [30, 39],
                                        blue: [34, 39],
                                        cyan: [36, 39],
                                        green: [32, 39],
                                        magenta: [35, 39],
                                        red: [31, 39],
                                        yellow: [33, 39]
                                    };
                                    var style = {
                                        special: "cyan",
                                        number: "blue",
                                        "boolean": "yellow",
                                        undefined: "grey",
                                        "null": "bold",
                                        string: "green",
                                        date: "magenta",
                                        regexp: "red"
                                    }[styleType];
                                    if (style) {
                                        return "[" + styles[style][0] + "m" + str + "[" + styles[style][1] + "m"
                                    } else {
                                        return str
                                    }
                                };
                                if (!colors) {
                                    stylize = function (str, styleType) {
                                        return str
                                    }
                                }

                                function format(value, recurseTimes) {
                                    if (value && typeof value.inspect === "function" && value !== exports && !(value.constructor && value.constructor.prototype === value)) {
                                        return value.inspect(recurseTimes)
                                    }
                                    switch (typeof value) {
                                    case "undefined":
                                        return stylize("undefined", "undefined");
                                    case "string":
                                        var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                                        return stylize(simple, "string");
                                    case "number":
                                        return stylize("" + value, "number");
                                    case "boolean":
                                        return stylize("" + value, "boolean")
                                    }
                                    if (value === null) {
                                        return stylize("null", "null")
                                    }
                                    var visible_keys = Object_keys(value);
                                    var keys = showHidden ? Object_getOwnPropertyNames(value) : visible_keys;
                                    if (typeof value === "function" && keys.length === 0) {
                                        if (
                                            isRegExp(value)) {
                                            return stylize("" + value, "regexp")
                                        } else {
                                            var name = value.name ? ": " + value.name : "";
                                            return stylize("[Function" + name + "]", "special")
                                        }
                                    }
                                    if (isDate(value) && keys.length === 0) {
                                        return stylize(value.toUTCString(), "date")
                                    }
                                    var base, type, braces;
                                    if (isArray(value)) {
                                        type = "Array";
                                        braces = ["[", "]"]
                                    } else {
                                        type = "Object";
                                        braces = ["{", "}"]
                                    } if (typeof value === "function") {
                                        var n = value.name ? ": " + value.name : "";
                                        base = isRegExp(value) ? " " + value : " [Function" + n + "]"
                                    } else {
                                        base = ""
                                    } if (isDate(value)) {
                                        base = " " + value.toUTCString()
                                    }
                                    if (keys.length === 0) {
                                        return braces[0] + base + braces[1]
                                    }
                                    if (recurseTimes < 0) {
                                        if (isRegExp(value)) {
                                            return stylize("" + value, "regexp")
                                        } else {
                                            return stylize("[Object]", "special")
                                        }
                                    }
                                    seen.push(value);
                                    var output = keys.map(function (key) {
                                        var name, str;
                                        if (value.__lookupGetter__) {
                                            if (value.__lookupGetter__(key)) {
                                                if (value.__lookupSetter__(key)) {
                                                    str = stylize("[Getter/Setter]", "special")
                                                } else {
                                                    str = stylize("[Getter]", "special")
                                                }
                                            } else {
                                                if (value.__lookupSetter__(key)) {
                                                    str = stylize("[Setter]", "special")
                                                }
                                            }
                                        }
                                        if (visible_keys.indexOf(key) < 0) {
                                            name = "[" + key + "]"
                                        }
                                        if (!str) {
                                            if (seen.indexOf(value[key]) < 0) {
                                                if (recurseTimes === null) {
                                                    str = format(value[key])
                                                } else {
                                                    str = format(value[key], recurseTimes - 1)
                                                } if (str.indexOf("\n") > -1) {
                                                    if (isArray(value)) {
                                                        str = str.split("\n").map(function (line) {
                                                            return "  " + line
                                                        }).join("\n").substr(2)
                                                    } else {
                                                        str = "\n" + str.split("\n").map(function (line) {
                                                            return "   " + line
                                                        }).join("\n")
                                                    }
                                                }
                                            } else {
                                                str = stylize("[Circular]", "special")
                                            }
                                        }
                                        if (typeof name === "undefined") {
                                            if (type === "Array" && key.match(/^\d+$/)) {
                                                return str
                                            }
                                            name = JSON.stringify("" + key);
                                            if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
                                                name = name.substr(1, name.length - 2);
                                                name = stylize(name, "name")
                                            } else {
                                                name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
                                                name = stylize(name, "string")
                                            }
                                        }
                                        return name + ": " + str
                                    });
                                    seen.pop();
                                    var numLinesEst = 0;
                                    var length = output.reduce(function (prev, cur) {
                                        numLinesEst++;
                                        if (cur.indexOf("\n") >= 0) numLinesEst++;
                                        return prev + cur.length + 1
                                    }, 0);
                                    if (length > 50) {
                                        output = braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1]
                                    } else {
                                        output = braces[0] + base + " " + output.join(", ") + " " + braces[1]
                                    }
                                    return output
                                }
                                return format(obj, typeof depth === "undefined" ? 2 : depth)
                            };

                            function isArray(ar) {
                                return ar instanceof Array || Array.isArray(ar) || ar && ar !== Object.prototype && isArray(ar.__proto__)
                            }

                            function isRegExp(re) {
                                return re instanceof RegExp || typeof re === "object" && Object.prototype.toString.call(re) === "[object RegExp]"
                            }

                            function isDate(d) {
                                if (d instanceof Date) return true;
                                if (typeof d !== "object") return false;
                                var properties = Date.prototype && Object_getOwnPropertyNames(Date.prototype);
                                var proto = d.__proto__ && Object_getOwnPropertyNames(d.__proto__);
                                return JSON.stringify(proto) === JSON.stringify(properties)
                            }

                            function pad(n) {
                                return n < 10 ? "0" + n.toString(10) : n.toString(10)
                            }
                            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                            function timestamp() {
                                var d = new Date;
                                var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(":");
                                return [d.getDate(), months[d.getMonth()], time].join(" ")
                            }
                            exports.log = function (msg) {};
                            exports.pump = null;
                            var Object_keys = Object.keys || function (obj) {
                                    var res = [];
                                    for (var key in obj) res.push(key);
                                    return res
                                };
                            var Object_getOwnPropertyNames = Object.getOwnPropertyNames || function (obj) {
                                    var res = [];
                                    for (var key in obj) {
                                        if (Object.hasOwnProperty.call(obj, key)) res.push(key)
                                    }
                                    return res
                                };
                            var Object_create = Object.create || function (prototype, properties) {
                                    var object;
                                    if (prototype === null) {
                                        object = {
                                            __proto__: null
                                        }
                                    } else {
                                        if (typeof prototype !== "object") {
                                            throw new TypeError("typeof prototype[" + typeof prototype + "] != 'object'")
                                        }
                                        var Type = function () {};
                                        Type.prototype = prototype;
                                        object = new Type;
                                        object.__proto__ = prototype
                                    } if (typeof properties !== "undefined" && Object.defineProperties) {
                                        Object.defineProperties(object, properties)
                                    }
                                    return object
                                };
                            exports.inherits = function (ctor, superCtor) {
                                ctor.super_ = superCtor;
                                ctor.prototype = Object_create(superCtor.prototype, {
                                    constructor: {
                                        value: ctor,
                                        enumerable: false,
                                        writable: true,
                                        configurable: true
                                    }
                                })
                            };
                            var formatRegExp = /%[sdj%]/g;
                            exports.format = function (f) {
                                if (typeof f !== "string") {
                                    var objects = [];
                                    for (var i = 0; i < arguments.length; i++) {
                                        objects.push(exports.inspect(
                                            arguments[i]))
                                    }
                                    return objects.join(" ")
                                }
                                var i = 1;
                                var args = arguments;
                                var len = args.length;
                                var str = String(f).replace(formatRegExp, function (x) {
                                    if (x === "%%") return "%";
                                    if (i >= len) return x;
                                    switch (x) {
                                    case "%s":
                                        return String(args[i++]);
                                    case "%d":
                                        return Number(args[i++]);
                                    case "%j":
                                        return JSON.stringify(args[i++]);
                                    default:
                                        return x
                                    }
                                });
                                for (var x = args[i]; i < len; x = args[++i]) {
                                    if (x === null || typeof x !== "object") {
                                        str += " " + x
                                    } else {
                                        str += " " + exports.inspect(x)
                                    }
                                }
                                return str
                            }
                        }, {
                            events: 4
                        }
                    ],
                    5: [
                        function (require, module, exports) {
                            exports.readIEEE754 = function (buffer, offset, isBE, mLen, nBytes) {
                                var e, m, eLen = nBytes * 8 - mLen - 1,
                                    eMax = (1 << eLen) - 1,
                                    eBias = eMax >> 1,
                                    nBits = -7,
                                    i = isBE ? 0 : nBytes - 1,
                                    d = isBE ? 1 : -1,
                                    s = buffer[offset + i];
                                i += d;
                                e = s & (1 << -nBits) - 1;
                                s >>= -nBits;
                                nBits += eLen;
                                for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);
                                m = e & (1 << -nBits) - 1;
                                e >>= -nBits;
                                nBits += mLen;
                                for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);
                                if (e === 0) {
                                    e = 1 - eBias
                                } else if (e === eMax) {
                                    return m ? NaN : (s ? -1 : 1) * Infinity
                                } else {
                                    m = m + Math.pow(2, mLen);
                                    e = e - eBias
                                }
                                return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
                            };
                            exports.writeIEEE754 = function (buffer, value, offset, isBE, mLen, nBytes) {
                                var e, m, c, eLen = nBytes * 8 - mLen - 1,
                                    eMax = (1 << eLen) - 1,
                                    eBias = eMax >> 1,
                                    rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                                    i = isBE ? nBytes - 1 : 0,
                                    d = isBE ? -1 : 1,
                                    s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
                                value = Math.abs(value);
                                if (isNaN(value) || value === Infinity) {
                                    m = isNaN(value) ? 1 : 0;
                                    e = eMax
                                } else {
                                    e = Math.floor(Math.log(value) / Math.LN2);
                                    if (value * (c = Math.pow(2, -e)) < 1) {
                                        e--;
                                        c *= 2
                                    }
                                    if (
                                        e + eBias >= 1) {
                                        value += rt / c
                                    } else {
                                        value += rt * Math.pow(2, 1 - eBias)
                                    } if (value * c >= 2) {
                                        e++;
                                        c /= 2
                                    }
                                    if (e + eBias >= eMax) {
                                        m = 0;
                                        e = eMax
                                    } else if (e + eBias >= 1) {
                                        m = (value * c - 1) * Math.pow(2, mLen);
                                        e = e + eBias
                                    } else {
                                        m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
                                        e = 0
                                    }
                                }
                                for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8);
                                e = e << mLen | m;
                                eLen += mLen;
                                for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8);
                                buffer[offset + i - d] |= s * 128
                            }
                        }, {}
                    ],
                    6: [
                        function (require, module, exports) {
                            var process = module.exports = {};
                            process.nextTick = function () {
                                var canSetImmediate = typeof window !== "undefined" && window.setImmediate;
                                var canPost = typeof window !== "undefined" && window.postMessage && window.addEventListener;
                                if (canSetImmediate) {
                                    return function (f) {
                                        return window.setImmediate(f)
                                    }
                                }
                                if (canPost) {
                                    var queue = [];
                                    window.addEventListener("message", function (ev) {
                                        if (ev.source === window && ev.data === "process-tick") {
                                            ev.stopPropagation();
                                            if (queue.length > 0) {
                                                var fn = queue.shift();
                                                fn()
                                            }
                                        }
                                    }, true);
                                    return function nextTick(fn) {
                                        queue.push(fn);
                                        window.postMessage("process-tick", "*")
                                    }
                                }
                                return function nextTick(fn) {
                                    setTimeout(fn, 0)
                                }
                            }();
                            process.title = "browser";
                            process.browser = true;
                            process.env = {};
                            process.argv = [];
                            process.binding = function (name) {
                                throw new Error("process.binding is not supported")
                            };
                            process.cwd = function () {
                                return "/"
                            };
                            process.chdir = function (dir) {
                                throw new Error("process.chdir is not supported")
                            }
                        }, {}
                    ],
                    4: [
                        function (require, module, exports) {
                            ! function (process) {
                                if (!process.EventEmitter) process.EventEmitter = function () {};
                                var EventEmitter = exports.EventEmitter = process.EventEmitter;
                                var isArray = typeof Array.isArray === "function" ? Array.isArray : function (xs) {
                                        return Object.prototype.toString.call(xs) === "[object Array]"
                                    };

                                function indexOf(xs, x) {
                                    if (xs.indexOf) return xs.indexOf(x);
                                    for (var i = 0; i < xs.length; i++) {
                                        if (x === xs[i]) return i
                                    }
                                    return -1
                                }
                                var defaultMaxListeners = 10;
                                EventEmitter.prototype.setMaxListeners = function (n) {
                                    if (!this._events) this._events = {};
                                    this._events.maxListeners = n
                                };
                                EventEmitter.prototype.emit = function (type) {
                                    if (type === "error") {
                                        if (!this._events || !this._events.error || isArray(this._events.error) && !this._events.error.length) {
                                            if (arguments[1] instanceof Error) {
                                                throw arguments[1]
                                            } else {
                                                throw new Error("Uncaught, unspecified 'error' event.")
                                            }
                                            return false
                                        }
                                    }
                                    if (!this._events) return false;
                                    var handler = this._events[type];
                                    if (!handler) return false;
                                    if (typeof handler == "function") {
                                        switch (arguments.length) {
                                        case 1:
                                            handler.call(this);
                                            break;
                                        case 2:
                                            handler.call(this, arguments[1]);
                                            break;
                                        case 3:
                                            handler.call(this, arguments[1], arguments[2]);
                                            break;
                                        default:
                                            var args = Array.prototype.slice.call(arguments, 1);
                                            handler.apply(this, args)
                                        }
                                        return true
                                    } else if (isArray(handler)) {
                                        var args = Array.prototype.slice.call(arguments, 1);
                                        var listeners = handler.slice();
                                        for (var i = 0, l = listeners.length; i < l; i++) {
                                            listeners[i].apply(this, args)
                                        }
                                        return true
                                    } else {
                                        return false
                                    }
                                };
                                EventEmitter.prototype.addListener = function (type, listener) {
                                    if ("function" !== typeof listener) {
                                        throw new Error("addListener only takes instances of Function")
                                    }
                                    if (!this._events) this._events = {};
                                    this.emit("newListener", type, listener);
                                    if (!this._events[type]) {
                                        this._events[type] = listener
                                    } else if (isArray(this._events[type])) {
                                        if (!this._events[type].warned) {
                                            var m;
                                            if (this._events.maxListeners !== undefined) {
                                                m = this._events.maxListeners
                                            } else {
                                                m = defaultMaxListeners
                                            } if (m && m > 0 && this._events[type].length > m) {
                                                this._events[type].warned = true;
                                                console.error("(node) warning: possible EventEmitter memory " + "leak detected. %d listeners added. " + "Use emitter.setMaxListeners() to increase limit.", this._events[type].length);
                                                console.trace()
                                            }
                                        }
                                        this._events[type].push(listener)
                                    } else {
                                        this._events[type] = [this._events[type], listener]
                                    }
                                    return this
                                };
                                EventEmitter.prototype.on = EventEmitter.prototype.addListener;
                                EventEmitter.prototype.once = function (type, listener) {
                                    var self = this;
                                    self.on(type, function g() {
                                        self.removeListener(type, g);
                                        listener.apply(this, arguments)
                                    });
                                    return this
                                };
                                EventEmitter.prototype.removeListener = function (type, listener) {
                                    if ("function" !== typeof listener) {
                                        throw new Error("removeListener only takes instances of Function")
                                    }
                                    if (!this._events || !this._events[type]) return this;
                                    var list = this._events[type];
                                    if (isArray(list)) {
                                        var i = indexOf(list, listener);
                                        if (i < 0)
                                            return this;
                                        list.splice(i, 1);
                                        if (list.length == 0) delete this._events[type]
                                    } else if (this._events[type] === listener) {
                                        delete this._events[type]
                                    }
                                    return this
                                };
                                EventEmitter.prototype.removeAllListeners = function (type) {
                                    if (arguments.length === 0) {
                                        this._events = {};
                                        return this
                                    }
                                    if (type && this._events && this._events[type]) this._events[type] = null;
                                    return this
                                };
                                EventEmitter.prototype.listeners = function (type) {
                                    if (!this._events) this._events = {};
                                    if (!this._events[type]) this._events[type] = [];
                                    if (!isArray(this._events[type])) {
                                        this._events[type] = [this._events[type]]
                                    }
                                    return this._events[type]
                                }
                            }(require("__browserify_process"))
                        }, {
                            __browserify_process: 6
                        }
                    ],
                    "buffer-browserify": [
                        function (require, module, exports) {
                            module.exports = require("q9TxCC")
                        }, {}
                    ],
                    q9TxCC: [
                        function (require, module, exports) {
                            function SlowBuffer(size) {
                                this.length = size
                            }
                            var assert = require("assert");
                            exports.INSPECT_MAX_BYTES = 50;

                            function toHex(n) {
                                if (n < 16) return "0" + n.toString(16);
                                return n.toString(16)
                            }

                            function utf8ToBytes(str) {
                                var byteArray = [];
                                for (var i = 0; i < str.length; i++)
                                    if (str.charCodeAt(
                                        i) <= 127) byteArray.push(str.charCodeAt(i));
                                    else {
                                        var h = encodeURIComponent(str.charAt(i)).substr(1).split("%");
                                        for (var j = 0; j < h.length; j++) byteArray.push(parseInt(h[j], 16))
                                    }
                                return byteArray
                            }

                            function asciiToBytes(str) {
                                var byteArray = [];
                                for (var i = 0; i < str.length; i++) byteArray.push(str.charCodeAt(i) & 255);
                                return byteArray
                            }

                            function base64ToBytes(str) {
                                return require("base64-js").toByteArray(str)
                            }
                            SlowBuffer.byteLength = function (str, encoding) {
                                switch (encoding || "utf8") {
                                case "hex":
                                    return str.length / 2;
                                case "utf8":
                                case "utf-8":
                                    return utf8ToBytes(str).length;
                                case "ascii":
                                case "binary":
                                    return str.length;
                                case "base64":
                                    return base64ToBytes(str).length;
                                default:
                                    throw new Error("Unknown encoding")
                                }
                            };

                            function blitBuffer(src, dst, offset, length) {
                                var pos, i = 0;
                                while (i < length) {
                                    if (i + offset >= dst.length || i >= src.length) break;
                                    dst[i + offset] = src[i];
                                    i++
                                }
                                return i
                            }
                            SlowBuffer.prototype.utf8Write = function (string, offset, length) {
                                var bytes, pos;
                                return SlowBuffer._charsWritten = blitBuffer(utf8ToBytes(string), this, offset, length)
                            };
                            SlowBuffer.prototype.
                            asciiWrite = function (string, offset, length) {
                                var bytes, pos;
                                return SlowBuffer._charsWritten = blitBuffer(asciiToBytes(string), this, offset, length)
                            };
                            SlowBuffer.prototype.binaryWrite = SlowBuffer.prototype.asciiWrite;
                            SlowBuffer.prototype.base64Write = function (string, offset, length) {
                                var bytes, pos;
                                return SlowBuffer._charsWritten = blitBuffer(base64ToBytes(string), this, offset, length)
                            };
                            SlowBuffer.prototype.base64Slice = function (start, end) {
                                var bytes = Array.prototype.slice.apply(this, arguments);
                                return require("base64-js").fromByteArray(bytes)
                            };

                            function decodeUtf8Char(str) {
                                try {
                                    return decodeURIComponent(str)
                                } catch (err) {
                                    return String.fromCharCode(65533)
                                }
                            }
                            SlowBuffer.prototype.utf8Slice = function () {
                                var bytes = Array.prototype.slice.apply(this, arguments);
                                var res = "";
                                var tmp = "";
                                var i = 0;
                                while (i < bytes.length) {
                                    if (bytes[i] <= 127) {
                                        res += decodeUtf8Char(tmp) + String.fromCharCode(bytes[i]);
                                        tmp = ""
                                    } else tmp += "%" + bytes[i].toString(16);
                                    i++
                                }
                                return res + decodeUtf8Char(tmp)
                            };
                            SlowBuffer.prototype.asciiSlice = function () {
                                var bytes = Array.prototype.slice.apply(this,
                                    arguments);
                                var ret = "";
                                for (var i = 0; i < bytes.length; i++) ret += String.fromCharCode(bytes[i]);
                                return ret
                            };
                            SlowBuffer.prototype.binarySlice = SlowBuffer.prototype.asciiSlice;
                            SlowBuffer.prototype.inspect = function () {
                                var out = [],
                                    len = this.length;
                                for (var i = 0; i < len; i++) {
                                    out[i] = toHex(this[i]);
                                    if (i == exports.INSPECT_MAX_BYTES) {
                                        out[i + 1] = "...";
                                        break
                                    }
                                }
                                return "<SlowBuffer " + out.join(" ") + ">"
                            };
                            SlowBuffer.prototype.hexSlice = function (start, end) {
                                var len = this.length;
                                if (!start || start < 0) start = 0;
                                if (!end || end < 0 || end > len) end = len;
                                var out = "";
                                for (var i = start; i < end; i++) {
                                    out += toHex(this[i])
                                }
                                return out
                            };
                            SlowBuffer.prototype.toString = function (encoding, start, end) {
                                encoding = String(encoding || "utf8").toLowerCase();
                                start = +start || 0;
                                if (typeof end == "undefined") end = this.length;
                                if (+end == start) {
                                    return ""
                                }
                                switch (encoding) {
                                case "hex":
                                    return this.hexSlice(start, end);
                                case "utf8":
                                case "utf-8":
                                    return this.utf8Slice(start, end);
                                case "ascii":
                                    return this.asciiSlice(start, end);
                                case "binary":
                                    return this.binarySlice(start, end);
                                case "base64":
                                    return this.base64Slice(start, end);
                                case "ucs2":
                                case "ucs-2":
                                    return this.ucs2Slice(start, end);
                                default:
                                    throw new Error("Unknown encoding")
                                }
                            };
                            SlowBuffer.prototype.hexWrite = function (string, offset, length) {
                                offset = +offset || 0;
                                var remaining = this.length - offset;
                                if (!length) {
                                    length = remaining
                                } else {
                                    length = +length;
                                    if (length > remaining) {
                                        length = remaining
                                    }
                                }
                                var strLen = string.length;
                                if (strLen % 2) {
                                    throw new Error("Invalid hex string")
                                }
                                if (length > strLen / 2) {
                                    length = strLen / 2
                                }
                                for (var i = 0; i < length; i++) {
                                    var byte = parseInt(string.substr(i * 2, 2), 16);
                                    if (isNaN(byte)) throw new Error("Invalid hex string");
                                    this[offset + i] = byte
                                }
                                SlowBuffer._charsWritten = i * 2;
                                return i
                            };
                            SlowBuffer.prototype.write = function (string, offset, length, encoding) {
                                if (isFinite(offset)) {
                                    if (!isFinite(length)) {
                                        encoding = length;
                                        length = undefined
                                    }
                                } else {
                                    var swap = encoding;
                                    encoding = offset;
                                    offset = length;
                                    length = swap
                                }
                                offset = +offset || 0;
                                var remaining = this.length - offset;
                                if (!length) {
                                    length = remaining
                                } else {
                                    length = +length;
                                    if (length > remaining) {
                                        length = remaining
                                    }
                                }
                                encoding = String(encoding || "utf8").toLowerCase();
                                switch (encoding) {
                                case "hex":
                                    return
                                    this.hexWrite(string, offset, length);
                                case "utf8":
                                case "utf-8":
                                    return this.utf8Write(string, offset, length);
                                case "ascii":
                                    return this.asciiWrite(string, offset, length);
                                case "binary":
                                    return this.binaryWrite(string, offset, length);
                                case "base64":
                                    return this.base64Write(string, offset, length);
                                case "ucs2":
                                case "ucs-2":
                                    return this.ucs2Write(string, offset, length);
                                default:
                                    throw new Error("Unknown encoding")
                                }
                            };
                            SlowBuffer.prototype.slice = function (start, end) {
                                if (end === undefined) end = this.length;
                                if (end > this.length) {
                                    throw new Error("oob")
                                }
                                if (start > end) {
                                    throw new Error("oob")
                                }
                                return new Buffer(this, end - start, +start)
                            };
                            SlowBuffer.prototype.copy = function (target, targetstart, sourcestart, sourceend) {
                                var temp = [];
                                for (var i = sourcestart; i < sourceend; i++) {
                                    assert.ok(typeof this[i] !== "undefined", "copying undefined buffer bytes!");
                                    temp.push(this[i])
                                }
                                for (var i = targetstart; i < targetstart + temp.length; i++) {
                                    target[i] = temp[i - targetstart]
                                }
                            };
                            SlowBuffer.prototype.fill = function (value, start, end) {
                                if (end > this.length) {
                                    throw new Error("oob")
                                }
                                if (start > end) {
                                    throw new
                                    Error("oob")
                                }
                                for (var i = start; i < end; i++) {
                                    this[i] = value
                                }
                            };

                            function coerce(length) {
                                length = ~~Math.ceil(+length);
                                return length < 0 ? 0 : length
                            }

                            function Buffer(subject, encoding, offset) {
                                if (!(this instanceof Buffer)) {
                                    return new Buffer(subject, encoding, offset)
                                }
                                var type;
                                if (typeof offset === "number") {
                                    this.length = coerce(encoding);
                                    this.parent = subject;
                                    this.offset = offset
                                } else {
                                    switch (type = typeof subject) {
                                    case "number":
                                        this.length = coerce(subject);
                                        break;
                                    case "string":
                                        this.length = Buffer.byteLength(subject, encoding);
                                        break;
                                    case "object":
                                        this.length = coerce(subject.length);
                                        break;
                                    default:
                                        throw new Error("First argument needs to be a number, " + "array or string.")
                                    }
                                    if (this.length > Buffer.poolSize) {
                                        this.parent = new SlowBuffer(this.length);
                                        this.offset = 0
                                    } else {
                                        if (!pool || pool.length - pool.used < this.length) allocPool();
                                        this.parent = pool;
                                        this.offset = pool.used;
                                        pool.used += this.length
                                    } if (isArrayIsh(subject)) {
                                        for (var i = 0; i < this.length; i++) {
                                            if (subject instanceof Buffer) {
                                                this.parent[i + this.offset] = subject.readUInt8(i)
                                            } else {
                                                this.parent[i + this.offset] = subject[i]
                                            }
                                        }
                                    } else if (type == "string") {
                                        this.length = this.write(subject, 0, encoding)
                                    }
                                }
                            }

                            function isArrayIsh(subject) {
                                return Array.isArray(subject) || Buffer.isBuffer(subject) || subject && typeof subject === "object" && typeof subject.length === "number"
                            }
                            exports.SlowBuffer = SlowBuffer;
                            exports.Buffer = Buffer;
                            Buffer.poolSize = 8 * 1024;
                            var pool;

                            function allocPool() {
                                pool = new SlowBuffer(Buffer.poolSize);
                                pool.used = 0
                            }
                            Buffer.isBuffer = function isBuffer(b) {
                                return b instanceof Buffer || b instanceof SlowBuffer
                            };
                            Buffer.concat = function (list, totalLength) {
                                if (!Array.isArray(list)) {
                                    throw new Error("Usage: Buffer.concat(list, [totalLength])\n       list should be an Array.")
                                }
                                if (list.length === 0) {
                                    return new Buffer(0)
                                } else if (list.length === 1) {
                                    return list[0]
                                }
                                if (typeof totalLength !== "number") {
                                    totalLength = 0;
                                    for (var i = 0; i < list.length; i++) {
                                        var buf = list[i];
                                        totalLength += buf.length
                                    }
                                }
                                var buffer = new Buffer(totalLength);
                                var pos = 0;
                                for (var i = 0; i < list.length; i++) {
                                    var buf = list[i];
                                    buf.copy(buffer, pos);
                                    pos += buf.length
                                }
                                return buffer
                            };
                            Buffer.prototype.inspect = function inspect() {
                                var
                                out = [],
                                    len = this.length;
                                for (var i = 0; i < len; i++) {
                                    out[i] = toHex(this.parent[i + this.offset]);
                                    if (i == exports.INSPECT_MAX_BYTES) {
                                        out[i + 1] = "...";
                                        break
                                    }
                                }
                                return "<Buffer " + out.join(" ") + ">"
                            };
                            Buffer.prototype.get = function get(i) {
                                if (i < 0 || i >= this.length) throw new Error("oob");
                                return this.parent[this.offset + i]
                            };
                            Buffer.prototype.set = function set(i, v) {
                                if (i < 0 || i >= this.length) throw new Error("oob");
                                return this.parent[this.offset + i] = v
                            };
                            Buffer.prototype.write = function (string, offset, length, encoding) {
                                if (isFinite(offset)) {
                                    if (!isFinite(length)) {
                                        encoding = length;
                                        length = undefined
                                    }
                                } else {
                                    var swap = encoding;
                                    encoding = offset;
                                    offset = length;
                                    length = swap
                                }
                                offset = +offset || 0;
                                var remaining = this.length - offset;
                                if (!length) {
                                    length = remaining
                                } else {
                                    length = +length;
                                    if (length > remaining) {
                                        length = remaining
                                    }
                                }
                                encoding = String(encoding || "utf8").toLowerCase();
                                var ret;
                                switch (encoding) {
                                case "hex":
                                    ret = this.parent.hexWrite(string, this.offset + offset, length);
                                    break;
                                case "utf8":
                                case "utf-8":
                                    ret = this.parent.utf8Write(string, this.offset + offset, length);
                                    break;
                                case "ascii":
                                    ret = this.
                                    parent.asciiWrite(string, this.offset + offset, length);
                                    break;
                                case "binary":
                                    ret = this.parent.binaryWrite(string, this.offset + offset, length);
                                    break;
                                case "base64":
                                    ret = this.parent.base64Write(string, this.offset + offset, length);
                                    break;
                                case "ucs2":
                                case "ucs-2":
                                    ret = this.parent.ucs2Write(string, this.offset + offset, length);
                                    break;
                                default:
                                    throw new Error("Unknown encoding")
                                }
                                Buffer._charsWritten = SlowBuffer._charsWritten;
                                return ret
                            };
                            Buffer.prototype.toString = function (encoding, start, end) {
                                encoding = String(encoding || "utf8").toLowerCase();
                                if (typeof start == "undefined" || start < 0) {
                                    start = 0
                                } else if (start > this.length) {
                                    start = this.length
                                }
                                if (typeof end == "undefined" || end > this.length) {
                                    end = this.length
                                } else if (end < 0) {
                                    end = 0
                                }
                                start = start + this.offset;
                                end = end + this.offset;
                                switch (encoding) {
                                case "hex":
                                    return this.parent.hexSlice(start, end);
                                case "utf8":
                                case "utf-8":
                                    return this.parent.utf8Slice(start, end);
                                case "ascii":
                                    return this.parent.asciiSlice(start, end);
                                case "binary":
                                    return this.parent.binarySlice(start, end);
                                case "base64":
                                    return this.parent.base64Slice(start, end);
                                case "ucs2":
                                case "ucs-2":
                                    return this.parent.ucs2Slice(start, end);
                                default:
                                    throw new Error("Unknown encoding")
                                }
                            };
                            Buffer.byteLength = SlowBuffer.byteLength;
                            Buffer.prototype.fill = function fill(value, start, end) {
                                value || (value = 0);
                                start || (start = 0);
                                end || (end = this.length);
                                if (typeof value === "string") {
                                    value = value.charCodeAt(0)
                                }
                                if (!(typeof value === "number") || isNaN(value)) {
                                    throw new Error("value is not a number")
                                }
                                if (end < start) throw new Error("end < start");
                                if (end === start) return 0;
                                if (this.length == 0) return 0;
                                if (start < 0 || start >= this.length) {
                                    throw new Error("start out of bounds")
                                }
                                if (end < 0 || end > this.length) {
                                    throw new Error("end out of bounds")
                                }
                                return this.parent.fill(value, start + this.offset, end + this.offset)
                            };
                            Buffer.prototype.copy = function (target, target_start, start, end) {
                                var source = this;
                                start || (start = 0);
                                end || (end = this.length);
                                target_start || (target_start = 0);
                                if (end < start) throw new Error("sourceEnd < sourceStart");
                                if (end === start) return 0;
                                if (target.length == 0 || source.length == 0) return 0;
                                if (target_start < 0 || target_start >= target.length) {
                                    throw new Error("targetStart out of bounds")
                                }
                                if (start < 0 || start >= source.length) {
                                    throw new Error("sourceStart out of bounds")
                                }
                                if (end < 0 || end > source.length) {
                                    throw new Error("sourceEnd out of bounds")
                                }
                                if (end > this.length) {
                                    end = this.length
                                }
                                if (target.length - target_start < end - start) {
                                    end = target.length - target_start + start
                                }
                                return this.parent.copy(target.parent, target_start + target.offset, start + this.offset, end + this.offset)
                            };
                            Buffer.prototype.slice = function (start, end) {
                                if (end === undefined) end = this.length;
                                if (end > this.length) throw new Error("oob");
                                if (start > end) throw new Error("oob");
                                return new Buffer(this.parent, end - start, +start + this.offset)
                            };
                            Buffer.prototype.utf8Slice = function (start, end) {
                                return this.toString("utf8", start, end)
                            };
                            Buffer.prototype.binarySlice = function (start, end) {
                                return this.toString("binary", start, end)
                            };
                            Buffer.prototype.asciiSlice = function (start, end) {
                                return this.toString("ascii", start, end)
                            };
                            Buffer.prototype.utf8Write = function (string, offset) {
                                return this.write(string, offset, "utf8")
                            };
                            Buffer.prototype.
                            binaryWrite = function (string, offset) {
                                return this.write(string, offset, "binary")
                            };
                            Buffer.prototype.asciiWrite = function (string, offset) {
                                return this.write(string, offset, "ascii")
                            };
                            Buffer.prototype.readUInt8 = function (offset, noAssert) {
                                var buffer = this;
                                if (!noAssert) {
                                    assert.ok(offset !== undefined && offset !== null, "missing offset");
                                    assert.ok(offset < buffer.length, "Trying to read beyond buffer length")
                                }
                                if (offset >= buffer.length) return;
                                return buffer.parent[buffer.offset + offset]
                            };

                            function readUInt16(buffer, offset, isBigEndian, noAssert) {
                                var val = 0;
                                if (!noAssert) {
                                    assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                                    assert.ok(offset !== undefined && offset !== null, "missing offset");
                                    assert.ok(offset + 1 < buffer.length, "Trying to read beyond buffer length")
                                }
                                if (offset >= buffer.length) return 0;
                                if (isBigEndian) {
                                    val = buffer.parent[buffer.offset + offset] << 8;
                                    if (offset + 1 < buffer.length) {
                                        val |= buffer.parent[buffer.offset + offset + 1]
                                    }
                                } else {
                                    val = buffer.parent[buffer.offset + offset];
                                    if (offset + 1 < buffer.length) {
                                        val |= buffer.parent[buffer.offset + offset + 1] << 8
                                    }
                                }
                                return val
                            }
                            Buffer.prototype.readUInt16LE = function (offset, noAssert) {
                                return readUInt16(this, offset, false, noAssert)
                            };
                            Buffer.prototype.readUInt16BE = function (offset, noAssert) {
                                return readUInt16(this, offset, true, noAssert)
                            };

                            function readUInt32(buffer, offset, isBigEndian, noAssert) {
                                var val = 0;
                                if (!noAssert) {
                                    assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                                    assert.ok(offset !== undefined && offset !== null, "missing offset");
                                    assert.ok(offset + 3 < buffer.length, "Trying to read beyond buffer length")
                                }
                                if (offset >= buffer.length) return 0;
                                if (isBigEndian) {
                                    if (offset + 1 < buffer.length) val = buffer.parent[buffer.offset + offset + 1] << 16;
                                    if (offset + 2 < buffer.length) val |= buffer.parent[buffer.offset + offset + 2] << 8;
                                    if (offset + 3 < buffer.length) val |= buffer.parent[buffer.offset + offset + 3];
                                    val = val + (buffer.parent[buffer.offset + offset] << 24 >>> 0)
                                } else {
                                    if (offset + 2 < buffer.length) val = buffer.parent[buffer.offset + offset + 2] << 16;
                                    if (offset + 1 < buffer.length) val |= buffer.parent[buffer.offset + offset + 1] << 8;
                                    val |= buffer.parent[buffer.offset + offset];
                                    if (offset + 3 < buffer.length) val = val + (buffer.parent[buffer.offset + offset + 3] << 24 >>> 0)
                                }
                                return val
                            }
                            Buffer.prototype.readUInt32LE = function (offset, noAssert) {
                                return readUInt32(this, offset, false, noAssert)
                            };
                            Buffer.prototype.readUInt32BE = function (offset, noAssert) {
                                return readUInt32(this, offset, true, noAssert)
                            };
                            Buffer.prototype.readInt8 = function (offset, noAssert) {
                                var buffer = this;
                                var neg;
                                if (!noAssert) {
                                    assert.ok(offset !== undefined && offset !== null, "missing offset");
                                    assert.ok(offset < buffer.length, "Trying to read beyond buffer length")
                                }
                                if (offset >= buffer.length) return;
                                neg = buffer.parent[buffer.offset + offset] & 128;
                                if (!neg) {
                                    return buffer.parent[buffer.offset + offset]
                                }
                                return (255 - buffer.parent[buffer.offset + offset] + 1) * -1
                            };

                            function readInt16(buffer, offset, isBigEndian, noAssert) {
                                var neg, val;
                                if (!noAssert) {
                                    assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                                    assert.ok(offset !== undefined && offset !== null, "missing offset");
                                    assert.ok(offset + 1 < buffer.length, "Trying to read beyond buffer length")
                                }
                                val = readUInt16(buffer,
                                    offset, isBigEndian, noAssert);
                                neg = val & 32768;
                                if (!neg) {
                                    return val
                                }
                                return (65535 - val + 1) * -1
                            }
                            Buffer.prototype.readInt16LE = function (offset, noAssert) {
                                return readInt16(this, offset, false, noAssert)
                            };
                            Buffer.prototype.readInt16BE = function (offset, noAssert) {
                                return readInt16(this, offset, true, noAssert)
                            };

                            function readInt32(buffer, offset, isBigEndian, noAssert) {
                                var neg, val;
                                if (!noAssert) {
                                    assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                                    assert.ok(offset !== undefined && offset !== null, "missing offset");
                                    assert.ok(offset + 3 < buffer.length, "Trying to read beyond buffer length")
                                }
                                val = readUInt32(buffer, offset, isBigEndian, noAssert);
                                neg = val & 2147483648;
                                if (!neg) {
                                    return val
                                }
                                return (4294967295 - val + 1) * -1
                            }
                            Buffer.prototype.readInt32LE = function (offset, noAssert) {
                                return readInt32(this, offset, false, noAssert)
                            };
                            Buffer.prototype.readInt32BE = function (offset, noAssert) {
                                return readInt32(this, offset, true, noAssert)
                            };

                            function readFloat(buffer, offset, isBigEndian, noAssert) {
                                if (!noAssert) {
                                    assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                                    assert.ok(offset + 3 < buffer.length, "Trying to read beyond buffer length")
                                }
                                return require("./buffer_ieee754").readIEEE754(buffer, offset, isBigEndian, 23, 4)
                            }
                            Buffer.prototype.readFloatLE = function (offset, noAssert) {
                                return readFloat(this, offset, false, noAssert)
                            };
                            Buffer.prototype.readFloatBE = function (offset, noAssert) {
                                return readFloat(this, offset, true, noAssert)
                            };

                            function readDouble(buffer, offset, isBigEndian, noAssert) {
                                if (!noAssert) {
                                    assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                                    assert.ok(offset + 7 < buffer.length, "Trying to read beyond buffer length")
                                }
                                return require("./buffer_ieee754").readIEEE754(buffer, offset, isBigEndian, 52, 8)
                            }
                            Buffer.prototype.readDoubleLE = function (offset, noAssert) {
                                return readDouble(this, offset, false, noAssert)
                            };
                            Buffer.prototype.readDoubleBE = function (offset, noAssert) {
                                return readDouble(this, offset, true, noAssert)
                            };

                            function verifuint(value, max) {
                                assert.ok(typeof value == "number", "cannot write a non-number as a number");
                                assert.ok(value >= 0, "specified a negative value for writing an unsigned value");
                                assert.ok(value <= max, "value is larger than maximum value for type");
                                assert.ok(Math.floor(value) === value, "value has a fractional component")
                            }
                            Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
                                var buffer = this;
                                if (!noAssert) {
                                    assert.ok(value !== undefined && value !== null, "missing value");
                                    assert.ok(offset !== undefined && offset !== null, "missing offset");
                                    assert.ok(offset < buffer.length, "trying to write beyond buffer length");
                                    verifuint(value, 255)
                                }
                                if (offset < buffer.length) {
                                    buffer.parent[buffer.offset + offset] = value
                                }
                            };

                            function writeUInt16(buffer, value, offset, isBigEndian, noAssert) {
                                if (!noAssert) {
                                    assert.ok(value !== undefined && value !== null, "missing value");
                                    assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                                    assert.ok(offset !== undefined && offset !== null, "missing offset");
                                    assert.ok(offset + 1 < buffer.length, "trying to write beyond buffer length");
                                    verifuint(value, 65535)
                                }
                                for (var i = 0; i < Math.min(buffer.length - offset, 2); i++) {
                                    buffer.parent[buffer.offset + offset + i] = (value & 255 << 8 * (isBigEndian ? 1 - i : i)) >>> (
                                        isBigEndian ? 1 - i : i) * 8
                                }
                            }
                            Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
                                writeUInt16(this, value, offset, false, noAssert)
                            };
                            Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
                                writeUInt16(this, value, offset, true, noAssert)
                            };

                            function writeUInt32(buffer, value, offset, isBigEndian, noAssert) {
                                if (!noAssert) {
                                    assert.ok(value !== undefined && value !== null, "missing value");
                                    assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                                    assert.ok(offset !== undefined && offset !== null, "missing offset");
                                    assert.ok(offset + 3 < buffer.length, "trying to write beyond buffer length");
                                    verifuint(value, 4294967295)
                                }
                                for (var i = 0; i < Math.min(buffer.length - offset, 4); i++) {
                                    buffer.parent[buffer.offset + offset + i] = value >>> (isBigEndian ? 3 - i : i) * 8 & 255
                                }
                            }
                            Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
                                writeUInt32(this, value, offset, false, noAssert)
                            };
                            Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
                                writeUInt32(this, value, offset, true, noAssert)
                            };

                            function verifsint(value, max, min) {
                                assert.ok(typeof value == "number", "cannot write a non-number as a number");
                                assert.ok(value <= max, "value larger than maximum allowed value");
                                assert.ok(value >= min, "value smaller than minimum allowed value");
                                assert.ok(Math.floor(value) === value, "value has a fractional component")
                            }

                            function verifIEEE754(value, max, min) {
                                assert.ok(typeof value == "number", "cannot write a non-number as a number");
                                assert.ok(value <= max, "value larger than maximum allowed value");
                                assert.ok(value >= min, "value smaller than minimum allowed value")
                            }
                            Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
                                var buffer = this;
                                if (!noAssert) {
                                    assert.ok(value !== undefined && value !== null, "missing value");
                                    assert.ok(offset !== undefined && offset !== null, "missing offset");
                                    assert.ok(offset < buffer.length, "Trying to write beyond buffer length");
                                    verifsint(value, 127, -128)
                                }
                                if (value >= 0) {
                                    buffer.writeUInt8(value, offset, noAssert)
                                } else {
                                    buffer.writeUInt8(255 + value + 1, offset, noAssert)
                                }
                            };

                            function writeInt16(buffer, value, offset, isBigEndian, noAssert) {
                                if (!noAssert) {
                                    assert.ok(value !== undefined && value !== null, "missing value");
                                    assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                                    assert.ok(offset !== undefined && offset !== null, "missing offset");
                                    assert.ok(offset + 1 < buffer.length, "Trying to write beyond buffer length");
                                    verifsint(value, 32767, -32768)
                                }
                                if (value >= 0) {
                                    writeUInt16(buffer, value, offset, isBigEndian, noAssert)
                                } else {
                                    writeUInt16(buffer, 65535 + value + 1, offset, isBigEndian, noAssert)
                                }
                            }
                            Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
                                writeInt16(this, value, offset, false, noAssert)
                            };
                            Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
                                writeInt16(this, value, offset, true, noAssert)
                            };

                            function writeInt32(buffer, value, offset, isBigEndian, noAssert) {
                                if (!noAssert) {
                                    assert.ok(value !== undefined && value !== null, "missing value");
                                    assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                                    assert.ok(offset !== undefined && offset !== null, "missing offset");
                                    assert.ok(offset + 3 < buffer.length, "Trying to write beyond buffer length");
                                    verifsint(value, 2147483647, -2147483648)
                                }
                                if (value >= 0) {
                                    writeUInt32(buffer, value, offset,
                                        isBigEndian, noAssert)
                                } else {
                                    writeUInt32(buffer, 4294967295 + value + 1, offset, isBigEndian, noAssert)
                                }
                            }
                            Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
                                writeInt32(this, value, offset, false, noAssert)
                            };
                            Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
                                writeInt32(this, value, offset, true, noAssert)
                            };

                            function writeFloat(buffer, value, offset, isBigEndian, noAssert) {
                                if (!noAssert) {
                                    assert.ok(value !== undefined && value !== null, "missing value");
                                    assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                                    assert.ok(offset !== undefined && offset !== null, "missing offset");
                                    assert.ok(offset + 3 < buffer.length, "Trying to write beyond buffer length");
                                    verifIEEE754(value, 3.4028234663852886e38, -3.4028234663852886e38)
                                }
                                require("./buffer_ieee754").writeIEEE754(buffer, value, offset, isBigEndian, 23, 4)
                            }
                            Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
                                writeFloat(this, value, offset, false, noAssert)
                            };
                            Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
                                writeFloat(this, value, offset, true, noAssert)
                            };

                            function
                            writeDouble(buffer, value, offset, isBigEndian, noAssert) {
                                if (!noAssert) {
                                    assert.ok(value !== undefined && value !== null, "missing value");
                                    assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                                    assert.ok(offset !== undefined && offset !== null, "missing offset");
                                    assert.ok(offset + 7 < buffer.length, "Trying to write beyond buffer length");
                                    verifIEEE754(value, 1.7976931348623157e308, -1.7976931348623157e308)
                                }
                                require("./buffer_ieee754").writeIEEE754(buffer, value, offset, isBigEndian, 52, 8)
                            }
                            Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
                                writeDouble(this, value, offset, false, noAssert)
                            };
                            Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
                                writeDouble(this, value, offset, true, noAssert)
                            };
                            SlowBuffer.prototype.readUInt8 = Buffer.prototype.readUInt8;
                            SlowBuffer.prototype.readUInt16LE = Buffer.prototype.readUInt16LE;
                            SlowBuffer.prototype.readUInt16BE = Buffer.prototype.readUInt16BE;
                            SlowBuffer.prototype.readUInt32LE = Buffer.prototype.readUInt32LE;
                            SlowBuffer.prototype.readUInt32BE = Buffer.prototype.readUInt32BE;
                            SlowBuffer.
                            prototype.readInt8 = Buffer.prototype.readInt8;
                            SlowBuffer.prototype.readInt16LE = Buffer.prototype.readInt16LE;
                            SlowBuffer.prototype.readInt16BE = Buffer.prototype.readInt16BE;
                            SlowBuffer.prototype.readInt32LE = Buffer.prototype.readInt32LE;
                            SlowBuffer.prototype.readInt32BE = Buffer.prototype.readInt32BE;
                            SlowBuffer.prototype.readFloatLE = Buffer.prototype.readFloatLE;
                            SlowBuffer.prototype.readFloatBE = Buffer.prototype.readFloatBE;
                            SlowBuffer.prototype.readDoubleLE = Buffer.prototype.readDoubleLE;
                            SlowBuffer.prototype.readDoubleBE = Buffer.prototype.readDoubleBE;
                            SlowBuffer.prototype.writeUInt8 = Buffer.prototype.writeUInt8;
                            SlowBuffer.prototype.writeUInt16LE = Buffer.prototype.writeUInt16LE;
                            SlowBuffer.prototype.writeUInt16BE = Buffer.prototype.writeUInt16BE;
                            SlowBuffer.prototype.writeUInt32LE = Buffer.prototype.writeUInt32LE;
                            SlowBuffer.prototype.writeUInt32BE = Buffer.prototype.writeUInt32BE;
                            SlowBuffer.prototype.writeInt8 = Buffer.prototype.writeInt8;
                            SlowBuffer.prototype.writeInt16LE = Buffer.prototype.writeInt16LE;
                            SlowBuffer.prototype.
                            writeInt16BE = Buffer.prototype.writeInt16BE;
                            SlowBuffer.prototype.writeInt32LE = Buffer.prototype.writeInt32LE;
                            SlowBuffer.prototype.writeInt32BE = Buffer.prototype.writeInt32BE;
                            SlowBuffer.prototype.writeFloatLE = Buffer.prototype.writeFloatLE;
                            SlowBuffer.prototype.writeFloatBE = Buffer.prototype.writeFloatBE;
                            SlowBuffer.prototype.writeDoubleLE = Buffer.prototype.writeDoubleLE;
                            SlowBuffer.prototype.writeDoubleBE = Buffer.prototype.writeDoubleBE
                        }, {
                            assert: 1,
                            "./buffer_ieee754": 5,
                            "base64-js": 7
                        }
                    ],
                    7: [
                        function (require, module, exports) {
                            ! function (exports) {
                                "use strict";
                                var lookup = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

                                function b64ToByteArray(b64) {
                                    var i, j, l, tmp, placeHolders, arr;
                                    if (b64.length % 4 > 0) {
                                        throw "Invalid string. Length must be a multiple of 4"
                                    }
                                    placeHolders = b64.indexOf("=");
                                    placeHolders = placeHolders > 0 ? b64.length - placeHolders : 0;
                                    arr = [];
                                    l = placeHolders > 0 ? b64.length - 4 : b64.length;
                                    for (i = 0, j = 0; i < l; i += 4, j += 3) {
                                        tmp = lookup.indexOf(b64[i]) << 18 | lookup.indexOf(b64[i + 1]) << 12 | lookup.indexOf(b64[i + 2]) << 6 | lookup.indexOf(b64[
                                            i + 3]);
                                        arr.push((tmp & 16711680) >> 16);
                                        arr.push((tmp & 65280) >> 8);
                                        arr.push(tmp & 255)
                                    }
                                    if (placeHolders === 2) {
                                        tmp = lookup.indexOf(b64[i]) << 2 | lookup.indexOf(b64[i + 1]) >> 4;
                                        arr.push(tmp & 255)
                                    } else if (placeHolders === 1) {
                                        tmp = lookup.indexOf(b64[i]) << 10 | lookup.indexOf(b64[i + 1]) << 4 | lookup.indexOf(b64[i + 2]) >> 2;
                                        arr.push(tmp >> 8 & 255);
                                        arr.push(tmp & 255)
                                    }
                                    return arr
                                }

                                function uint8ToBase64(uint8) {
                                    var i, extraBytes = uint8.length % 3,
                                        output = "",
                                        temp, length;

                                    function tripletToBase64(num) {
                                        return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63]
                                    }
                                    for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
                                        temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
                                        output += tripletToBase64(temp)
                                    }
                                    switch (extraBytes) {
                                    case 1:
                                        temp = uint8[uint8.length - 1];
                                        output += lookup[temp >> 2];
                                        output += lookup[temp << 4 & 63];
                                        output += "==";
                                        break;
                                    case 2:
                                        temp = (uint8[uint8.length - 2] << 8) + uint8[uint8.length - 1];
                                        output += lookup[temp >> 10];
                                        output += lookup[temp >> 4 & 63];
                                        output += lookup[temp << 2 & 63];
                                        output += "=";
                                        break
                                    }
                                    return output
                                }
                                module.exports.toByteArray = b64ToByteArray;
                                module.exports.
                                fromByteArray = uint8ToBase64
                            }()
                        }, {}
                    ],
                    8: [
                        function (require, module, exports) {
                            exports.readIEEE754 = function (buffer, offset, isBE, mLen, nBytes) {
                                var e, m, eLen = nBytes * 8 - mLen - 1,
                                    eMax = (1 << eLen) - 1,
                                    eBias = eMax >> 1,
                                    nBits = -7,
                                    i = isBE ? 0 : nBytes - 1,
                                    d = isBE ? 1 : -1,
                                    s = buffer[offset + i];
                                i += d;
                                e = s & (1 << -nBits) - 1;
                                s >>= -nBits;
                                nBits += eLen;
                                for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);
                                m = e & (1 << -nBits) - 1;
                                e >>= -nBits;
                                nBits += mLen;
                                for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);
                                if (e === 0) {
                                    e = 1 - eBias
                                } else if (e === eMax) {
                                    return m ? NaN : (s ? -1 : 1) * Infinity
                                } else {
                                    m = m + Math.pow(2, mLen);
                                    e = e - eBias
                                }
                                return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
                            };
                            exports.writeIEEE754 = function (buffer, value, offset, isBE, mLen, nBytes) {
                                var e, m, c, eLen = nBytes * 8 - mLen - 1,
                                    eMax = (1 << eLen) - 1,
                                    eBias = eMax >> 1,
                                    rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                                    i = isBE ? nBytes - 1 : 0,
                                    d = isBE ? -1 : 1,
                                    s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
                                value = Math.abs(value);
                                if (isNaN(value) || value === Infinity) {
                                    m = isNaN(value) ? 1 : 0;
                                    e = eMax
                                } else {
                                    e = Math.floor(Math.log(value) / Math.LN2);
                                    if (value * (c = Math.pow(2, -e)) < 1) {
                                        e--;
                                        c *= 2
                                    }
                                    if (e + eBias >= 1) {
                                        value += rt / c
                                    } else {
                                        value += rt * Math.pow(2, 1 - eBias)
                                    } if (value * c >= 2) {
                                        e++;
                                        c /= 2
                                    }
                                    if (e + eBias >= eMax) {
                                        m = 0;
                                        e = eMax
                                    } else if (e + eBias >= 1) {
                                        m = (value * c - 1) * Math.pow(2, mLen);
                                        e = e + eBias
                                    } else {
                                        m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
                                        e = 0
                                    }
                                }
                                for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8);
                                e = e << mLen | m;
                                eLen += mLen;
                                for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8);
                                buffer[offset + i - d] |= s * 128
                            }
                        }, {}
                    ],
                    3: [
                        function (require, module, exports) {
                            function SlowBuffer(size) {
                                this.length = size
                            }
                            var
                            assert = require("assert");
                            exports.INSPECT_MAX_BYTES = 50;

                            function toHex(n) {
                                if (n < 16) return "0" + n.toString(16);
                                return n.toString(16)
                            }

                            function utf8ToBytes(str) {
                                var byteArray = [];
                                for (var i = 0; i < str.length; i++)
                                    if (str.charCodeAt(i) <= 127) byteArray.push(str.charCodeAt(i));
                                    else {
                                        var h = encodeURIComponent(str.charAt(i)).substr(1).split("%");
                                        for (var j = 0; j < h.length; j++) byteArray.push(parseInt(h[j], 16))
                                    }
                                return byteArray
                            }

                            function asciiToBytes(str) {
                                var byteArray = [];
                                for (var i = 0; i < str.length; i++) byteArray.push(str.charCodeAt(i) & 255);
                                return byteArray
                            }

                            function base64ToBytes(str) {
                                return require("base64-js").toByteArray(str)
                            }
                            SlowBuffer.byteLength = function (str, encoding) {
                                switch (encoding || "utf8") {
                                case "hex":
                                    return str.length / 2;
                                case "utf8":
                                case "utf-8":
                                    return utf8ToBytes(str).length;
                                case "ascii":
                                    return str.length;
                                case "base64":
                                    return base64ToBytes(str).length;
                                default:
                                    throw new Error("Unknown encoding")
                                }
                            };

                            function blitBuffer(src, dst, offset, length) {
                                var pos, i = 0;
                                while (i < length) {
                                    if (i + offset >= dst.length || i >= src.length) break;
                                    dst[i + offset] = src[i];
                                    i++
                                }
                                return i
                            }
                            SlowBuffer.prototype.utf8Write = function (string, offset, length) {
                                var bytes, pos;
                                return SlowBuffer._charsWritten = blitBuffer(utf8ToBytes(string), this, offset, length)
                            };
                            SlowBuffer.prototype.asciiWrite = function (string, offset, length) {
                                var bytes, pos;
                                return SlowBuffer._charsWritten = blitBuffer(asciiToBytes(string), this, offset, length)
                            };
                            SlowBuffer.prototype.base64Write = function (string, offset, length) {
                                var bytes, pos;
                                return SlowBuffer._charsWritten = blitBuffer(base64ToBytes(string), this, offset, length)
                            };
                            SlowBuffer.prototype.base64Slice = function (start, end) {
                                var bytes = Array.prototype.slice.apply(this, arguments);
                                return require("base64-js").fromByteArray(bytes)
                            };

                            function decodeUtf8Char(str) {
                                try {
                                    return decodeURIComponent(str)
                                } catch (err) {
                                    return String.fromCharCode(65533)
                                }
                            }
                            SlowBuffer.prototype.utf8Slice = function () {
                                var bytes = Array.prototype.slice.apply(this, arguments);
                                var res = "";
                                var tmp = "";
                                var i = 0;
                                while (i < bytes.length) {
                                    if (bytes[i] <= 127) {
                                        res += decodeUtf8Char(tmp) + String.fromCharCode(bytes[i]);
                                        tmp = ""
                                    } else tmp += "%" + bytes[i].toString(
                                        16);
                                    i++
                                }
                                return res + decodeUtf8Char(tmp)
                            };
                            SlowBuffer.prototype.asciiSlice = function () {
                                var bytes = Array.prototype.slice.apply(this, arguments);
                                var ret = "";
                                for (var i = 0; i < bytes.length; i++) ret += String.fromCharCode(bytes[i]);
                                return ret
                            };
                            SlowBuffer.prototype.inspect = function () {
                                var out = [],
                                    len = this.length;
                                for (var i = 0; i < len; i++) {
                                    out[i] = toHex(this[i]);
                                    if (i == exports.INSPECT_MAX_BYTES) {
                                        out[i + 1] = "...";
                                        break
                                    }
                                }
                                return "<SlowBuffer " + out.join(" ") + ">"
                            };
                            SlowBuffer.prototype.hexSlice = function (start, end) {
                                var len = this.length;
                                if (!start || start < 0) start = 0;
                                if (!end || end < 0 || end > len) end = len;
                                var out = "";
                                for (var i = start; i < end; i++) {
                                    out += toHex(this[i])
                                }
                                return out
                            };
                            SlowBuffer.prototype.toString = function (encoding, start, end) {
                                encoding = String(encoding || "utf8").toLowerCase();
                                start = +start || 0;
                                if (typeof end == "undefined") end = this.length;
                                if (+end == start) {
                                    return ""
                                }
                                switch (encoding) {
                                case "hex":
                                    return this.hexSlice(start, end);
                                case "utf8":
                                case "utf-8":
                                    return this.utf8Slice(start, end);
                                case "ascii":
                                    return this.asciiSlice(start, end);
                                case "binary":
                                    return this.binarySlice(
                                        start, end);
                                case "base64":
                                    return this.base64Slice(start, end);
                                case "ucs2":
                                case "ucs-2":
                                    return this.ucs2Slice(start, end);
                                default:
                                    throw new Error("Unknown encoding")
                                }
                            };
                            SlowBuffer.prototype.hexWrite = function (string, offset, length) {
                                offset = +offset || 0;
                                var remaining = this.length - offset;
                                if (!length) {
                                    length = remaining
                                } else {
                                    length = +length;
                                    if (length > remaining) {
                                        length = remaining
                                    }
                                }
                                var strLen = string.length;
                                if (strLen % 2) {
                                    throw new Error("Invalid hex string")
                                }
                                if (length > strLen / 2) {
                                    length = strLen / 2
                                }
                                for (var i = 0; i < length; i++) {
                                    var byte = parseInt(string.substr(i * 2, 2), 16);
                                    if (isNaN(byte)) throw new Error("Invalid hex string");
                                    this[offset + i] = byte
                                }
                                SlowBuffer._charsWritten = i * 2;
                                return i
                            };
                            SlowBuffer.prototype.write = function (string, offset, length, encoding) {
                                if (isFinite(offset)) {
                                    if (!isFinite(length)) {
                                        encoding = length;
                                        length = undefined
                                    }
                                } else {
                                    var swap = encoding;
                                    encoding = offset;
                                    offset = length;
                                    length = swap
                                }
                                offset = +offset || 0;
                                var remaining = this.length - offset;
                                if (!length) {
                                    length = remaining
                                } else {
                                    length = +length;
                                    if (length > remaining) {
                                        length = remaining
                                    }
                                }
                                encoding = String(
                                    encoding || "utf8").toLowerCase();
                                switch (encoding) {
                                case "hex":
                                    return this.hexWrite(string, offset, length);
                                case "utf8":
                                case "utf-8":
                                    return this.utf8Write(string, offset, length);
                                case "ascii":
                                    return this.asciiWrite(string, offset, length);
                                case "binary":
                                    return this.binaryWrite(string, offset, length);
                                case "base64":
                                    return this.base64Write(string, offset, length);
                                case "ucs2":
                                case "ucs-2":
                                    return this.ucs2Write(string, offset, length);
                                default:
                                    throw new Error("Unknown encoding")
                                }
                            };
                            SlowBuffer.prototype.slice = function (start, end) {
                                if (end === undefined) end = this.length;
                                if (end > this.length) {
                                    throw new Error("oob")
                                }
                                if (start > end) {
                                    throw new Error("oob")
                                }
                                return new Buffer(this, end - start, +start)
                            };
                            SlowBuffer.prototype.copy = function (target, targetstart, sourcestart, sourceend) {
                                var temp = [];
                                for (var i = sourcestart; i < sourceend; i++) {
                                    assert.ok(typeof this[i] !== "undefined", "copying undefined buffer bytes!");
                                    temp.push(this[i])
                                }
                                for (var i = targetstart; i < targetstart + temp.length; i++) {
                                    target[i] = temp[i - targetstart]
                                }
                            };

                            function coerce(length) {
                                length = ~~Math.ceil(+length);
                                return length < 0 ? 0 : length
                            }

                            function Buffer(subject, encoding, offset) {
                                if (!(this instanceof Buffer)) {
                                    return new Buffer(subject, encoding, offset)
                                }
                                var type;
                                if (typeof offset === "number") {
                                    this.length = coerce(encoding);
                                    this.parent = subject;
                                    this.offset = offset
                                } else {
                                    switch (type = typeof subject) {
                                    case "number":
                                        this.length = coerce(subject);
                                        break;
                                    case "string":
                                        this.length = Buffer.byteLength(subject, encoding);
                                        break;
                                    case "object":
                                        this.length = coerce(subject.length);
                                        break;
                                    default:
                                        throw new Error("First argument needs to be a number, " + "array or string.")
                                    }
                                    if (this.length > Buffer.poolSize) {
                                        this.parent = new SlowBuffer(this.length);
                                        this.offset = 0
                                    } else {
                                        if (!pool || pool.length - pool.used < this.length) allocPool();
                                        this.parent = pool;
                                        this.offset = pool.used;
                                        pool.used += this.length
                                    } if (isArrayIsh(subject)) {
                                        for (var i = 0; i < this.length; i++) {
                                            this.parent[i + this.offset] = subject[i]
                                        }
                                    } else if (type == "string") {
                                        this.length = this.write(subject, 0, encoding)
                                    }
                                }
                            }

                            function isArrayIsh(subject) {
                                return Array.isArray(subject) || Buffer.isBuffer(subject) || subject && typeof subject === "object" &&
                                    typeof subject.length === "number"
                            }
                            exports.SlowBuffer = SlowBuffer;
                            exports.Buffer = Buffer;
                            Buffer.poolSize = 8 * 1024;
                            var pool;

                            function allocPool() {
                                pool = new SlowBuffer(Buffer.poolSize);
                                pool.used = 0
                            }
                            Buffer.isBuffer = function isBuffer(b) {
                                return b instanceof Buffer || b instanceof SlowBuffer
                            };
                            Buffer.concat = function (list, totalLength) {
                                if (!Array.isArray(list)) {
                                    throw new Error("Usage: Buffer.concat(list, [totalLength])\n       list should be an Array.")
                                }
                                if (list.length === 0) {
                                    return new Buffer(0)
                                } else if (list.length === 1) {
                                    return list[0]
                                }
                                if (typeof totalLength !== "number") {
                                    totalLength = 0;
                                    for (var i = 0; i < list.length; i++) {
                                        var buf = list[i];
                                        totalLength += buf.length
                                    }
                                }
                                var buffer = new Buffer(totalLength);
                                var pos = 0;
                                for (var i = 0; i < list.length; i++) {
                                    var buf = list[i];
                                    buf.copy(buffer, pos);
                                    pos += buf.length
                                }
                                return buffer
                            };
                            Buffer.prototype.inspect = function inspect() {
                                var out = [],
                                    len = this.length;
                                for (var i = 0; i < len; i++) {
                                    out[i] = toHex(this.parent[i + this.offset]);
                                    if (i == exports.INSPECT_MAX_BYTES) {
                                        out[i + 1] = "...";
                                        break
                                    }
                                }
                                return "<Buffer " + out.join(" ") + ">"
                            };
                            Buffer.
                            prototype.get = function get(i) {
                                if (i < 0 || i >= this.length) throw new Error("oob");
                                return this.parent[this.offset + i]
                            };
                            Buffer.prototype.set = function set(i, v) {
                                if (i < 0 || i >= this.length) throw new Error("oob");
                                return this.parent[this.offset + i] = v
                            };
                            Buffer.prototype.write = function (string, offset, length, encoding) {
                                if (isFinite(offset)) {
                                    if (!isFinite(length)) {
                                        encoding = length;
                                        length = undefined
                                    }
                                } else {
                                    var swap = encoding;
                                    encoding = offset;
                                    offset = length;
                                    length = swap
                                }
                                offset = +offset || 0;
                                var remaining = this.length - offset;
                                if (!length) {
                                    length = remaining
                                } else {
                                    length = +length;
                                    if (length > remaining) {
                                        length = remaining
                                    }
                                }
                                encoding = String(encoding || "utf8").toLowerCase();
                                var ret;
                                switch (encoding) {
                                case "hex":
                                    ret = this.parent.hexWrite(string, this.offset + offset, length);
                                    break;
                                case "utf8":
                                case "utf-8":
                                    ret = this.parent.utf8Write(string, this.offset + offset, length);
                                    break;
                                case "ascii":
                                    ret = this.parent.asciiWrite(string, this.offset + offset, length);
                                    break;
                                case "binary":
                                    ret = this.parent.binaryWrite(string, this.offset + offset, length);
                                    break;
                                case "base64":
                                    ret = this.parent.base64Write(string,
                                        this.offset + offset, length);
                                    break;
                                case "ucs2":
                                case "ucs-2":
                                    ret = this.parent.ucs2Write(string, this.offset + offset, length);
                                    break;
                                default:
                                    throw new Error("Unknown encoding")
                                }
                                Buffer._charsWritten = SlowBuffer._charsWritten;
                                return ret
                            };
                            Buffer.prototype.toString = function (encoding, start, end) {
                                encoding = String(encoding || "utf8").toLowerCase();
                                if (typeof start == "undefined" || start < 0) {
                                    start = 0
                                } else if (start > this.length) {
                                    start = this.length
                                }
                                if (typeof end == "undefined" || end > this.length) {
                                    end = this.length
                                } else if (end < 0) {
                                    end = 0
                                }
                                start = start + this.offset;
                                end = end + this.offset;
                                switch (encoding) {
                                case "hex":
                                    return this.parent.hexSlice(start, end);
                                case "utf8":
                                case "utf-8":
                                    return this.parent.utf8Slice(start, end);
                                case "ascii":
                                    return this.parent.asciiSlice(start, end);
                                case "binary":
                                    return this.parent.binarySlice(start, end);
                                case "base64":
                                    return this.parent.base64Slice(start, end);
                                case "ucs2":
                                case "ucs-2":
                                    return this.parent.ucs2Slice(start, end);
                                default:
                                    throw new Error("Unknown encoding")
                                }
                            };
                            Buffer.byteLength = SlowBuffer.byteLength;
                            Buffer.prototype.fill = function fill(
                                value, start, end) {
                                value || (value = 0);
                                start || (start = 0);
                                end || (end = this.length);
                                if (typeof value === "string") {
                                    value = value.charCodeAt(0)
                                }
                                if (!(typeof value === "number") || isNaN(value)) {
                                    throw new Error("value is not a number")
                                }
                                if (end < start) throw new Error("end < start");
                                if (end === start) return 0;
                                if (this.length == 0) return 0;
                                if (start < 0 || start >= this.length) {
                                    throw new Error("start out of bounds")
                                }
                                if (end < 0 || end > this.length) {
                                    throw new Error("end out of bounds")
                                }
                                return this.parent.fill(value, start + this.offset, end + this.offset)
                            };
                            Buffer.prototype.copy = function (target, target_start, start, end) {
                                var source = this;
                                start || (start = 0);
                                end || (end = this.length);
                                target_start || (target_start = 0);
                                if (end < start) throw new Error("sourceEnd < sourceStart");
                                if (end === start) return 0;
                                if (target.length == 0 || source.length == 0) return 0;
                                if (target_start < 0 || target_start >= target.length) {
                                    throw new Error("targetStart out of bounds")
                                }
                                if (start < 0 || start >= source.length) {
                                    throw new Error("sourceStart out of bounds")
                                }
                                if (end < 0 || end > source.length) {
                                    throw new Error("sourceEnd out of bounds")
                                }
                                if (end > this.length) {
                                    end = this.length
                                }
                                if (target.length - target_start < end - start) {
                                    end = target.length - target_start + start
                                }
                                return this.parent.copy(target.parent, target_start + target.offset, start + this.offset, end + this.offset)
                            };
                            Buffer.prototype.slice = function (start, end) {
                                if (end === undefined) end = this.length;
                                if (end > this.length) throw new Error("oob");
                                if (start > end) throw new Error("oob");
                                return new Buffer(this.parent, end - start, +start + this.offset)
                            };
                            Buffer.prototype.utf8Slice = function (start, end) {
                                return this.toString("utf8", start, end)
                            };
                            Buffer.prototype.binarySlice = function (start, end) {
                                return this.toString("binary", start, end)
                            };
                            Buffer.prototype.asciiSlice = function (start, end) {
                                return this.toString("ascii", start, end)
                            };
                            Buffer.prototype.utf8Write = function (string, offset) {
                                return this.write(string, offset, "utf8")
                            };
                            Buffer.prototype.binaryWrite = function (string, offset) {
                                return this.write(string, offset, "binary")
                            };
                            Buffer.prototype.asciiWrite = function (string, offset) {
                                return this.write(string, offset, "ascii")
                            };
                            Buffer.prototype.
                            readUInt8 = function (offset, noAssert) {
                                var buffer = this;
                                if (!noAssert) {
                                    assert.ok(offset !== undefined && offset !== null, "missing offset");
                                    assert.ok(offset < buffer.length, "Trying to read beyond buffer length")
                                }
                                return buffer.parent[buffer.offset + offset]
                            };

                            function readUInt16(buffer, offset, isBigEndian, noAssert) {
                                var val = 0;
                                if (!noAssert) {
                                    assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                                    assert.ok(offset !== undefined && offset !== null, "missing offset");
                                    assert.ok(offset + 1 < buffer.length, "Trying to read beyond buffer length")
                                }
                                if (isBigEndian) {
                                    val = buffer.parent[buffer.offset + offset] << 8;
                                    val |= buffer.parent[buffer.offset + offset + 1]
                                } else {
                                    val = buffer.parent[buffer.offset + offset];
                                    val |= buffer.parent[buffer.offset + offset + 1] << 8
                                }
                                return val
                            }
                            Buffer.prototype.readUInt16LE = function (offset, noAssert) {
                                return readUInt16(this, offset, false, noAssert)
                            };
                            Buffer.prototype.readUInt16BE = function (offset, noAssert) {
                                return readUInt16(this, offset, true, noAssert)
                            };

                            function readUInt32(buffer, offset, isBigEndian, noAssert) {
                                var val = 0;
                                if (!noAssert) {
                                    assert.
                                    ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                                    assert.ok(offset !== undefined && offset !== null, "missing offset");
                                    assert.ok(offset + 3 < buffer.length, "Trying to read beyond buffer length")
                                }
                                if (isBigEndian) {
                                    val = buffer.parent[buffer.offset + offset + 1] << 16;
                                    val |= buffer.parent[buffer.offset + offset + 2] << 8;
                                    val |= buffer.parent[buffer.offset + offset + 3];
                                    val = val + (buffer.parent[buffer.offset + offset] << 24 >>> 0)
                                } else {
                                    val = buffer.parent[buffer.offset + offset + 2] << 16;
                                    val |= buffer.parent[buffer.offset + offset + 1] << 8;
                                    val |= buffer.parent[buffer.offset + offset];
                                    val = val + (buffer.parent[buffer.offset + offset + 3] << 24 >>> 0)
                                }
                                return val
                            }
                            Buffer.prototype.readUInt32LE = function (offset, noAssert) {
                                return readUInt32(this, offset, false, noAssert)
                            };
                            Buffer.prototype.readUInt32BE = function (offset, noAssert) {
                                return readUInt32(this, offset, true, noAssert)
                            };
                            Buffer.prototype.readInt8 = function (offset, noAssert) {
                                var buffer = this;
                                var neg;
                                if (!noAssert) {
                                    assert.ok(offset !== undefined && offset !== null, "missing offset");
                                    assert.ok(offset < buffer.length, "Trying to read beyond buffer length")
                                }
                                neg = buffer.parent[buffer.offset + offset] & 128;
                                if (!neg) {
                                    return buffer.parent[buffer.offset + offset]
                                }
                                return (255 - buffer.parent[buffer.offset + offset] + 1) * -1
                            };

                            function readInt16(buffer, offset, isBigEndian, noAssert) {
                                var neg, val;
                                if (!noAssert) {
                                    assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                                    assert.ok(offset !== undefined && offset !== null, "missing offset");
                                    assert.ok(offset + 1 < buffer.length, "Trying to read beyond buffer length")
                                }
                                val = readUInt16(buffer, offset, isBigEndian, noAssert);
                                neg = val & 32768;
                                if (!neg) {
                                    return val
                                }
                                return (65535 - val + 1) * -1
                            }
                            Buffer.prototype.readInt16LE = function (offset, noAssert) {
                                return readInt16(this, offset, false, noAssert)
                            };
                            Buffer.prototype.readInt16BE = function (offset, noAssert) {
                                return readInt16(this, offset, true, noAssert)
                            };

                            function readInt32(buffer, offset, isBigEndian, noAssert) {
                                var neg, val;
                                if (!noAssert) {
                                    assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                                    assert.ok(offset !== undefined && offset !== null, "missing offset");
                                    assert.ok(offset + 3 < buffer.length, "Trying to read beyond buffer length")
                                }
                                val = readUInt32(buffer, offset, isBigEndian, noAssert);
                                neg = val & 2147483648;
                                if (!neg) {
                                    return val
                                }
                                return (4294967295 - val + 1) * -1
                            }
                            Buffer.prototype.readInt32LE = function (offset, noAssert) {
                                return readInt32(this, offset, false, noAssert)
                            };
                            Buffer.prototype.readInt32BE = function (offset, noAssert) {
                                return readInt32(this, offset, true, noAssert)
                            };

                            function readFloat(buffer, offset, isBigEndian, noAssert) {
                                if (!noAssert) {
                                    assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                                    assert.ok(offset + 3 < buffer.length, "Trying to read beyond buffer length")
                                }
                                return require("./buffer_ieee754").readIEEE754(buffer, offset, isBigEndian, 23, 4)
                            }
                            Buffer.prototype.readFloatLE = function (offset, noAssert) {
                                return readFloat(this, offset, false, noAssert)
                            };
                            Buffer.prototype.readFloatBE = function (offset, noAssert) {
                                return readFloat(this, offset, true, noAssert)
                            };

                            function readDouble(buffer, offset, isBigEndian, noAssert) {
                                if (!noAssert) {
                                    assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                                    assert.ok(offset + 7 < buffer.length, "Trying to read beyond buffer length")
                                }
                                return require("./buffer_ieee754").readIEEE754(buffer, offset, isBigEndian, 52, 8)
                            }
                            Buffer.prototype.readDoubleLE = function (offset, noAssert) {
                                return readDouble(this, offset, false, noAssert)
                            };
                            Buffer.prototype.readDoubleBE = function (offset, noAssert) {
                                return readDouble(this, offset, true, noAssert)
                            };

                            function verifuint(value, max) {
                                assert.ok(typeof value == "number", "cannot write a non-number as a number");
                                assert.ok(value >= 0, "specified a negative value for writing an unsigned value");
                                assert.ok(value <= max, "value is larger than maximum value for type");
                                assert.ok(Math.floor(value) === value, "value has a fractional component")
                            }
                            Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
                                var buffer = this;
                                if (!noAssert) {
                                    assert.ok(value !== undefined && value !== null, "missing value");
                                    assert.ok(offset !== undefined && offset !== null, "missing offset");
                                    assert.ok(offset < buffer.length, "trying to write beyond buffer length");
                                    verifuint(value, 255)
                                }
                                buffer.parent[buffer.offset + offset] = value
                            };

                            function writeUInt16(buffer, value, offset,
                                isBigEndian, noAssert) {
                                if (!noAssert) {
                                    assert.ok(value !== undefined && value !== null, "missing value");
                                    assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                                    assert.ok(offset !== undefined && offset !== null, "missing offset");
                                    assert.ok(offset + 1 < buffer.length, "trying to write beyond buffer length");
                                    verifuint(value, 65535)
                                }
                                if (isBigEndian) {
                                    buffer.parent[buffer.offset + offset] = (value & 65280) >>> 8;
                                    buffer.parent[buffer.offset + offset + 1] = value & 255
                                } else {
                                    buffer.parent[buffer.offset + offset + 1] = (value & 65280) >>> 8;
                                    buffer.parent[buffer.offset + offset] = value & 255
                                }
                            }
                            Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
                                writeUInt16(this, value, offset, false, noAssert)
                            };
                            Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
                                writeUInt16(this, value, offset, true, noAssert)
                            };

                            function writeUInt32(buffer, value, offset, isBigEndian, noAssert) {
                                if (!noAssert) {
                                    assert.ok(value !== undefined && value !== null, "missing value");
                                    assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                                    assert.ok(offset !== undefined && offset !== null, "missing offset");
                                    assert.ok(offset + 3 < buffer.length, "trying to write beyond buffer length");
                                    verifuint(value, 4294967295)
                                }
                                if (isBigEndian) {
                                    buffer.parent[buffer.offset + offset] = value >>> 24 & 255;
                                    buffer.parent[buffer.offset + offset + 1] = value >>> 16 & 255;
                                    buffer.parent[buffer.offset + offset + 2] = value >>> 8 & 255;
                                    buffer.parent[buffer.offset + offset + 3] = value & 255
                                } else {
                                    buffer.parent[buffer.offset + offset + 3] = value >>> 24 & 255;
                                    buffer.parent[buffer.offset + offset + 2] = value >>> 16 & 255;
                                    buffer.parent[buffer.offset + offset + 1] = value >>> 8 & 255;
                                    buffer.parent[buffer.offset + offset] = value & 255
                                }
                            }
                            Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
                                writeUInt32(this, value, offset, false, noAssert)
                            };
                            Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
                                writeUInt32(this, value, offset, true, noAssert)
                            };

                            function verifsint(value, max, min) {
                                assert.ok(typeof value == "number", "cannot write a non-number as a number");
                                assert.ok(value <= max, "value larger than maximum allowed value");
                                assert.ok(value >= min, "value smaller than minimum allowed value");
                                assert.ok(Math.floor(value) === value, "value has a fractional component")
                            }

                            function verifIEEE754(value, max, min) {
                                assert.ok(typeof value == "number", "cannot write a non-number as a number");
                                assert.ok(value <= max, "value larger than maximum allowed value");
                                assert.ok(value >= min, "value smaller than minimum allowed value")
                            }
                            Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
                                var buffer = this;
                                if (!noAssert) {
                                    assert.ok(value !== undefined && value !== null, "missing value");
                                    assert.ok(offset !== undefined && offset !== null, "missing offset");
                                    assert.ok(offset < buffer.length, "Trying to write beyond buffer length");
                                    verifsint(value, 127, -128)
                                }
                                if (value >= 0) {
                                    buffer.writeUInt8(value, offset, noAssert)
                                } else {
                                    buffer.writeUInt8(255 + value + 1, offset, noAssert)
                                }
                            };

                            function writeInt16(buffer, value, offset, isBigEndian, noAssert) {
                                if (!noAssert) {
                                    assert.ok(value !== undefined && value !== null, "missing value");
                                    assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                                    assert.ok(offset !== undefined && offset !== null, "missing offset");
                                    assert.ok(offset + 1 < buffer.length, "Trying to write beyond buffer length");
                                    verifsint(value, 32767, -32768)
                                }
                                if (value >= 0) {
                                    writeUInt16(buffer, value, offset, isBigEndian, noAssert)
                                } else {
                                    writeUInt16(buffer, 65535 + value + 1, offset, isBigEndian, noAssert)
                                }
                            }
                            Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
                                writeInt16(this, value, offset, false, noAssert)
                            };
                            Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
                                writeInt16(this, value, offset, true, noAssert)
                            };

                            function writeInt32(buffer, value, offset, isBigEndian, noAssert) {
                                if (!noAssert) {
                                    assert.ok(value !== undefined && value !== null, "missing value");
                                    assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                                    assert.ok(offset !== undefined && offset !== null, "missing offset");
                                    assert.ok(offset + 3 < buffer.length, "Trying to write beyond buffer length");
                                    verifsint(value, 2147483647, -2147483648)
                                }
                                if (value >= 0) {
                                    writeUInt32(buffer, value, offset, isBigEndian, noAssert)
                                } else {
                                    writeUInt32(buffer, 4294967295 + value + 1, offset, isBigEndian, noAssert)
                                }
                            }
                            Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
                                writeInt32(this, value, offset,
                                    false, noAssert)
                            };
                            Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
                                writeInt32(this, value, offset, true, noAssert)
                            };

                            function writeFloat(buffer, value, offset, isBigEndian, noAssert) {
                                if (!noAssert) {
                                    assert.ok(value !== undefined && value !== null, "missing value");
                                    assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                                    assert.ok(offset !== undefined && offset !== null, "missing offset");
                                    assert.ok(offset + 3 < buffer.length, "Trying to write beyond buffer length");
                                    verifIEEE754(value, 3.4028234663852886e38, -3.4028234663852886e38)
                                }
                                require("./buffer_ieee754").writeIEEE754(buffer, value, offset, isBigEndian, 23, 4)
                            }
                            Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
                                writeFloat(this, value, offset, false, noAssert)
                            };
                            Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
                                writeFloat(this, value, offset, true, noAssert)
                            };

                            function writeDouble(buffer, value, offset, isBigEndian, noAssert) {
                                if (!noAssert) {
                                    assert.ok(value !== undefined && value !== null, "missing value");
                                    assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                                    assert.ok(offset !== undefined && offset !== null, "missing offset");
                                    assert.ok(offset + 7 < buffer.length, "Trying to write beyond buffer length");
                                    verifIEEE754(value, 1.7976931348623157e308, -1.7976931348623157e308)
                                }
                                require("./buffer_ieee754").writeIEEE754(buffer, value, offset, isBigEndian, 52, 8)
                            }
                            Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
                                writeDouble(this, value, offset, false, noAssert)
                            };
                            Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
                                writeDouble(this, value, offset, true, noAssert)
                            };
                            SlowBuffer.prototype.readUInt8 = Buffer.prototype.readUInt8;
                            SlowBuffer.prototype.readUInt16LE = Buffer.prototype.readUInt16LE;
                            SlowBuffer.prototype.readUInt16BE = Buffer.prototype.readUInt16BE;
                            SlowBuffer.prototype.readUInt32LE = Buffer.prototype.readUInt32LE;
                            SlowBuffer.prototype.readUInt32BE = Buffer.prototype.readUInt32BE;
                            SlowBuffer.prototype.readInt8 = Buffer.prototype.readInt8;
                            SlowBuffer.prototype.readInt16LE = Buffer.prototype.readInt16LE;
                            SlowBuffer.prototype.readInt16BE = Buffer.prototype.readInt16BE;
                            SlowBuffer.prototype.
                            readInt32LE = Buffer.prototype.readInt32LE;
                            SlowBuffer.prototype.readInt32BE = Buffer.prototype.readInt32BE;
                            SlowBuffer.prototype.readFloatLE = Buffer.prototype.readFloatLE;
                            SlowBuffer.prototype.readFloatBE = Buffer.prototype.readFloatBE;
                            SlowBuffer.prototype.readDoubleLE = Buffer.prototype.readDoubleLE;
                            SlowBuffer.prototype.readDoubleBE = Buffer.prototype.readDoubleBE;
                            SlowBuffer.prototype.writeUInt8 = Buffer.prototype.writeUInt8;
                            SlowBuffer.prototype.writeUInt16LE = Buffer.prototype.writeUInt16LE;
                            SlowBuffer.prototype.writeUInt16BE = Buffer.prototype.writeUInt16BE;
                            SlowBuffer.prototype.writeUInt32LE = Buffer.prototype.writeUInt32LE;
                            SlowBuffer.prototype.writeUInt32BE = Buffer.prototype.writeUInt32BE;
                            SlowBuffer.prototype.writeInt8 = Buffer.prototype.writeInt8;
                            SlowBuffer.prototype.writeInt16LE = Buffer.prototype.writeInt16LE;
                            SlowBuffer.prototype.writeInt16BE = Buffer.prototype.writeInt16BE;
                            SlowBuffer.prototype.writeInt32LE = Buffer.prototype.writeInt32LE;
                            SlowBuffer.prototype.writeInt32BE = Buffer.prototype.writeInt32BE;
                            SlowBuffer.prototype.
                            writeFloatLE = Buffer.prototype.writeFloatLE;
                            SlowBuffer.prototype.writeFloatBE = Buffer.prototype.writeFloatBE;
                            SlowBuffer.prototype.writeDoubleLE = Buffer.prototype.writeDoubleLE;
                            SlowBuffer.prototype.writeDoubleBE = Buffer.prototype.writeDoubleBE
                        }, {
                            assert: 1,
                            "./buffer_ieee754": 8,
                            "base64-js": 9
                        }
                    ],
                    9: [
                        function (require, module, exports) {
                            ! function (exports) {
                                "use strict";
                                var lookup = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

                                function b64ToByteArray(b64) {
                                    var i, j, l, tmp, placeHolders, arr;
                                    if (b64.length % 4 > 0) {
                                        throw "Invalid string. Length must be a multiple of 4"
                                    }
                                    placeHolders = b64.indexOf("=");
                                    placeHolders = placeHolders > 0 ? b64.length - placeHolders : 0;
                                    arr = [];
                                    l = placeHolders > 0 ? b64.length - 4 : b64.length;
                                    for (i = 0, j = 0; i < l; i += 4, j += 3) {
                                        tmp = lookup.indexOf(b64[i]) << 18 | lookup.indexOf(b64[i + 1]) << 12 | lookup.indexOf(b64[i + 2]) << 6 | lookup.indexOf(b64[i + 3]);
                                        arr.push((tmp & 16711680) >> 16);
                                        arr.push((tmp & 65280) >> 8);
                                        arr.push(tmp & 255)
                                    }
                                    if (placeHolders === 2) {
                                        tmp = lookup.indexOf(b64[i]) << 2 | lookup.indexOf(b64[i + 1]) >> 4;
                                        arr.push(tmp & 255)
                                    } else if (
                                        placeHolders === 1) {
                                        tmp = lookup.indexOf(b64[i]) << 10 | lookup.indexOf(b64[i + 1]) << 4 | lookup.indexOf(b64[i + 2]) >> 2;
                                        arr.push(tmp >> 8 & 255);
                                        arr.push(tmp & 255)
                                    }
                                    return arr
                                }

                                function uint8ToBase64(uint8) {
                                    var i, extraBytes = uint8.length % 3,
                                        output = "",
                                        temp, length;

                                    function tripletToBase64(num) {
                                        return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63]
                                    }
                                    for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
                                        temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
                                        output += tripletToBase64(temp)
                                    }
                                    switch (extraBytes) {
                                    case 1:
                                        temp = uint8[uint8.length - 1];
                                        output += lookup[temp >> 2];
                                        output += lookup[temp << 4 & 63];
                                        output += "==";
                                        break;
                                    case 2:
                                        temp = (uint8[uint8.length - 2] << 8) + uint8[uint8.length - 1];
                                        output += lookup[temp >> 10];
                                        output += lookup[temp >> 4 & 63];
                                        output += lookup[temp << 2 & 63];
                                        output += "=";
                                        break
                                    }
                                    return output
                                }
                                module.exports.toByteArray = b64ToByteArray;
                                module.exports.fromByteArray = uint8ToBase64
                            }()
                        }, {}
                    ]
                }, {}, []);
                module.exports = require("buffer-browserify")
            }, {}
        ],
        12: [
            function (require, module, exports) {
                ! function (process, Buffer) {
                    module.exports = Readable;
                    Readable.
                    ReadableState = ReadableState;
                    var EE = require("events").EventEmitter;
                    if (!EE.listenerCount) EE.listenerCount = function (emitter, type) {
                        return emitter.listeners(type).length
                    };
                    var Stream = require("stream");
                    var util = require("util");
                    var StringDecoder;
                    util.inherits(Readable, Stream);

                    function ReadableState(options, stream) {
                        options = options || {};
                        var hwm = options.highWaterMark;
                        this.highWaterMark = hwm || hwm === 0 ? hwm : 16 * 1024;
                        this.highWaterMark = ~~this.highWaterMark;
                        this.buffer = [];
                        this.length = 0;
                        this.pipes = null;
                        this.pipesCount = 0;
                        this.flowing = false;
                        this.ended = false;
                        this.endEmitted = false;
                        this.reading = false;
                        this.calledRead = false;
                        this.sync = true;
                        this.needReadable = false;
                        this.emittedReadable = false;
                        this.objectMode = !! options.objectMode;
                        this.ranOut = false;
                        this.awaitDrain = 0;
                        this.readingMore = false;
                        this.decoder = null;
                        if (options.encoding) {
                            if (!StringDecoder) StringDecoder = require("string_decoder").StringDecoder;
                            this.decoder = new StringDecoder(options.encoding)
                        }
                    }

                    function Readable(options) {
                        if (!(this instanceof Readable)) return new Readable(options);
                        this._
                        readableState = new ReadableState(options, this);
                        this.readable = true;
                        Stream.call(this)
                    }
                    Readable.prototype.push = function (chunk) {
                        var state = this._readableState;
                        if (typeof chunk === "string" && !state.objectMode) chunk = new Buffer(chunk, arguments[1]);
                        return readableAddChunk(this, state, chunk, false)
                    };
                    Readable.prototype.unshift = function (chunk) {
                        var state = this._readableState;
                        if (typeof chunk === "string" && !state.objectMode) chunk = new Buffer(chunk, arguments[1]);
                        return readableAddChunk(this, state, chunk, true)
                    };

                    function readableAddChunk(stream, state, chunk, addToFront) {
                        state.reading = false;
                        var er = chunkInvalid(state, chunk);
                        if (er) {
                            stream.emit("error", er)
                        } else if (chunk === null || chunk === undefined) {
                            onEofChunk(stream, state)
                        } else if (state.objectMode || chunk && chunk.length > 0) {
                            if (state.decoder) chunk = state.decoder.write(chunk);
                            state.length += state.objectMode ? 1 : chunk.length;
                            if (addToFront) state.buffer.unshift(chunk);
                            else state.buffer.push(chunk); if (state.needReadable) emitReadable(stream);
                            maybeReadMore(stream, state)
                        }
                        return needMoreData(state)
                    }

                    function
                    needMoreData(state) {
                        return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0)
                    }
                    Readable.prototype.setEncoding = function (enc) {
                        if (!StringDecoder) StringDecoder = require("string_decoder").StringDecoder;
                        this._readableState.decoder = new StringDecoder(enc)
                    };
                    var MAX_HWM = 8388608;

                    function roundUpToNextPowerOf2(n) {
                        if (n >= MAX_HWM) {
                            n = MAX_HWM
                        } else {
                            n--;
                            for (var p = 1; p < 32; p <<= 1) n |= n >> p;
                            n++
                        }
                        return n
                    }

                    function howMuchToRead(n, state) {
                        if (state.length === 0 && state.ended) return 0;
                        if (state.objectMode) return n === 0 ? 0 : 1;
                        if (isNaN(n) || n === null) {
                            if (state.flowing && state.buffer.length) return state.buffer[0].length;
                            else return state.length
                        }
                        if (n <= 0) return 0;
                        if (n > state.highWaterMark) state.highWaterMark = roundUpToNextPowerOf2(n);
                        if (n > state.length) {
                            if (!state.ended) {
                                state.needReadable = true;
                                return 0
                            } else return state.length
                        }
                        return n
                    }
                    Readable.prototype.read = function (n) {
                        var state = this._readableState;
                        state.calledRead = true;
                        var nOrig = n;
                        if (typeof n !== "number" || n > 0) state.emittedReadable = false;
                        if (n === 0 && state.needReadable && state.length >= state.highWaterMark) {
                            emitReadable(this);
                            return null
                        }
                        n = howMuchToRead(n, state);
                        if (n === 0 && state.ended) {
                            if (state.length === 0) endReadable(this);
                            return null
                        }
                        var doRead = state.needReadable;
                        if (state.length - n <= state.highWaterMark) doRead = true;
                        if (state.ended || state.reading) doRead = false;
                        if (doRead) {
                            state.reading = true;
                            state.sync = true;
                            if (state.length === 0) state.needReadable = true;
                            this._read(state.highWaterMark);
                            state.sync = false
                        }
                        if (doRead && !state.reading) n = howMuchToRead(nOrig, state);
                        var ret;
                        if (n > 0) ret = fromList(n, state);
                        else ret = null; if (ret === null) {
                            state.needReadable = true;
                            n = 0
                        }
                        state.length -= n;
                        if (state.length === 0 && !state.ended) state.needReadable = true;
                        if (state.ended && !state.endEmitted && state.length === 0) endReadable(this);
                        return ret
                    };

                    function chunkInvalid(state, chunk) {
                        var er = null;
                        if (!Buffer.isBuffer(chunk) && "string" !== typeof chunk && chunk !== null && chunk !== undefined && !state.objectMode && !er) {
                            er = new TypeError("Invalid non-string/buffer chunk")
                        }
                        return er
                    }

                    function onEofChunk(stream, state) {
                        state.ended = true;
                        if (state.decoder && state.decoder.end) {
                            var chunk = state.decoder.end();
                            if (chunk && chunk.length) {
                                state.buffer.push(chunk);
                                state.length += state.objectMode ? 1 : chunk.length
                            }
                        }
                        if (state.length > 0) emitReadable(stream);
                        else endReadable(stream)
                    }

                    function emitReadable(stream) {
                        var state = stream._readableState;
                        state.needReadable = false;
                        if (state.emittedReadable) return;
                        state.emittedReadable = true;
                        if (state.sync) process.nextTick(function () {
                            emitReadable_(stream)
                        });
                        else emitReadable_(stream)
                    }

                    function emitReadable_(stream) {
                        var state = stream._readableState;
                        stream.emit("readable")
                    }

                    function maybeReadMore(stream, state) {
                        if (!state.readingMore) {
                            state.readingMore = true;
                            process.nextTick(function () {
                                maybeReadMore_(stream, state)
                            })
                        }
                    }

                    function maybeReadMore_(stream, state) {
                        var len = state.length;
                        while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
                            stream.read(0);
                            if (len === state.length) break;
                            else len = state.length
                        }
                        state.readingMore = false
                    }
                    Readable.prototype._read = function (n) {
                        this.emit("error", new Error("not implemented"))
                    };
                    Readable.prototype.
                    pipe = function (dest, pipeOpts) {
                        var src = this;
                        var state = this._readableState;
                        switch (state.pipesCount) {
                        case 0:
                            state.pipes = dest;
                            break;
                        case 1:
                            state.pipes = [state.pipes, dest];
                            break;
                        default:
                            state.pipes.push(dest);
                            break
                        }
                        state.pipesCount += 1;
                        var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
                        var endFn = doEnd ? onend : cleanup;
                        if (state.endEmitted) process.nextTick(endFn);
                        else src.once("end", endFn);
                        dest.on("unpipe", onunpipe);

                        function onunpipe(readable) {
                            if (readable !== src) return;
                            cleanup()
                        }

                        function onend() {
                            dest.end()
                        }
                        var ondrain = pipeOnDrain(src);
                        dest.on("drain", ondrain);

                        function cleanup() {
                            dest.removeListener("close", onclose);
                            dest.removeListener("finish", onfinish);
                            dest.removeListener("drain", ondrain);
                            dest.removeListener("error", onerror);
                            dest.removeListener("unpipe", onunpipe);
                            src.removeListener("end", onend);
                            src.removeListener("end", cleanup);
                            if (!dest._writableState || dest._writableState.needDrain) ondrain()
                        }

                        function onerror(er) {
                            unpipe();
                            if (EE.listenerCount(dest, "error") === 0) dest.emit("error", er)
                        }
                        dest.once("error", onerror);

                        function onclose() {
                            dest.removeListener("finish", onfinish);
                            unpipe()
                        }
                        dest.once("close", onclose);

                        function onfinish() {
                            dest.removeListener("close", onclose);
                            unpipe()
                        }
                        dest.once("finish", onfinish);

                        function unpipe() {
                            src.unpipe(dest)
                        }
                        dest.emit("pipe", src);
                        if (!state.flowing) {
                            this.on("readable", pipeOnReadable);
                            state.flowing = true;
                            process.nextTick(function () {
                                flow(src)
                            })
                        }
                        return dest
                    };

                    function pipeOnDrain(
                        src) {
                        return function () {
                            var dest = this;
                            var state = src._readableState;
                            state.awaitDrain--;
                            if (state.awaitDrain === 0) flow(src)
                        }
                    }

                    function flow(src) {
                        var state = src._readableState;
                        var chunk;
                        state.awaitDrain = 0;

                        function write(dest, i, list) {
                            var written = dest.write(chunk);
                            if (false === written) {
                                state.awaitDrain++
                            }
                        }
                        while (state.pipesCount && null !== (chunk = src.read())) {
                            if (state.pipesCount === 1) write(state.pipes, 0, null);
                            else state.pipes.forEach(write);
                            src.emit("data", chunk);
                            if (state.awaitDrain > 0) return
                        }
                        if (state.pipesCount === 0) {
                            state.flowing = false;
                            if (EE.listenerCount(src, "data") > 0) emitDataEvents(src);
                            return
                        }
                        state.ranOut = true
                    }

                    function pipeOnReadable() {
                        if (this._readableState.ranOut) {
                            this._readableState.ranOut = false;
                            flow(this)
                        }
                    }
                    Readable.prototype.unpipe = function (dest) {
                        var state = this._readableState;
                        if (state.pipesCount === 0) return this;
                        if (state.pipesCount === 1) {
                            if (dest && dest !== state.pipes) return this;
                            if (!dest) dest = state.pipes;
                            state.pipes = null;
                            state.pipesCount = 0;
                            this.removeListener("readable", pipeOnReadable);
                            state.flowing = false;
                            if (dest) dest.
                            emit("unpipe", this);
                            return this
                        }
                        if (!dest) {
                            var dests = state.pipes;
                            var len = state.pipesCount;
                            state.pipes = null;
                            state.pipesCount = 0;
                            this.removeListener("readable", pipeOnReadable);
                            state.flowing = false;
                            for (var i = 0; i < len; i++) dests[i].emit("unpipe", this);
                            return this
                        }
                        var i = state.pipes.indexOf(dest);
                        if (i === -1) return this;
                        state.pipes.splice(i, 1);
                        state.pipesCount -= 1;
                        if (state.pipesCount === 1) state.pipes = state.pipes[0];
                        dest.emit("unpipe", this);
                        return this
                    };
                    Readable.prototype.on = function (ev, fn) {
                        var res = Stream.prototype.on.call(this, ev, fn);
                        if (ev === "data" && !this._readableState.flowing) emitDataEvents(this);
                        if (ev === "readable" && !this._readableState.reading) this.read(0);
                        return res
                    };
                    Readable.prototype.addListener = Readable.prototype.on;
                    Readable.prototype.resume = function () {
                        emitDataEvents(this);
                        this.read(0);
                        this.emit("resume")
                    };
                    Readable.prototype.pause = function () {
                        emitDataEvents(this, true);
                        this.emit("pause")
                    };

                    function emitDataEvents(stream, startPaused) {
                        var state = stream._readableState;
                        if (state.flowing) {
                            throw new Error("Cannot switch to old mode now.")
                        }
                        var paused = startPaused || false;
                        var readable = false;
                        stream.readable = true;
                        stream.pipe = Stream.prototype.pipe;
                        stream.on = stream.addListener = Stream.prototype.on;
                        stream.on("readable", function () {
                            readable = true;
                            var c;
                            while (!paused && null !== (c = stream.read())) stream.emit("data", c);
                            if (c === null) {
                                readable = false;
                                stream._readableState.needReadable = true
                            }
                        });
                        stream.pause = function () {
                            paused = true;
                            this.emit("pause")
                        };
                        stream.resume = function () {
                            paused = false;
                            if (readable) process.nextTick(function () {
                                stream.emit("readable")
                            });
                            else this.read(0);
                            this.emit("resume")
                        };
                        stream.emit("readable")
                    }
                    Readable.prototype.wrap = function (stream) {
                        var state = this._readableState;
                        var paused = false;
                        var self = this;
                        stream.on("end", function () {
                            state.ended = true;
                            if (state.decoder && state.decoder.end) {
                                var chunk = state.decoder.end();
                                if (chunk && chunk.length) self.push(chunk)
                            }
                            self.push(null)
                        });
                        stream.on("data", function (chunk) {
                            if (state.decoder) chunk = state.decoder.write(chunk);
                            if (!chunk || !chunk.length) return;
                            var ret = self.push(chunk);
                            if (!ret) {
                                paused = true;
                                stream.pause()
                            }
                        });
                        for (var i in stream) {
                            if (typeof stream[i] === "function" && typeof this[i] === "undefined") {
                                this[i] = function (method) {
                                    return function () {
                                        return stream[method].apply(stream, arguments)
                                    }
                                }(i)
                            }
                        }
                        var events = ["error", "close", "destroy", "pause", "resume"];
                        events.forEach(function (ev) {
                            stream.on(ev, self.emit.bind(self, ev))
                        });
                        self._read = function (n) {
                            if (paused) {
                                stream.resume();
                                paused = false
                            }
                        }
                    };
                    Readable._fromList = fromList;

                    function fromList(n, state) {
                        var list = state.buffer;
                        var length = state.length;
                        var stringMode = !! state.decoder;
                        var objectMode = !! state.objectMode;
                        var ret;
                        if (list.length === 0) return null;
                        if (length === 0) ret = null;
                        else if (objectMode) ret = list.shift();
                        else if (!n || n >= length) {
                            if (stringMode) ret = list.join("");
                            else ret = Buffer.concat(list, length);
                            list.length = 0
                        } else {
                            if (n < list[0].length) {
                                var buf = list[0];
                                ret = buf.slice(0, n);
                                list[0] = buf.slice(n)
                            } else if (n === list[0].length) {
                                ret = list.shift()
                            } else {
                                if (stringMode) ret = "";
                                else ret = new Buffer(n);
                                var c = 0;
                                for (var i = 0, l = list.length; i < l && c < n; i++) {
                                    var buf = list[0];
                                    var cpy = Math.min(n - c, buf.length);
                                    if (
                                        stringMode) ret += buf.slice(0, cpy);
                                    else buf.copy(ret, c, 0, cpy); if (cpy < buf.length) list[0] = buf.slice(cpy);
                                    else list.shift();
                                    c += cpy
                                }
                            }
                        }
                        return ret
                    }

                    function endReadable(stream) {
                        var state = stream._readableState;
                        if (state.length > 0) throw new Error("endReadable called on non-empty stream");
                        if (!state.endEmitted && state.calledRead) {
                            state.ended = true;
                            state.endEmitted = true;
                            process.nextTick(function () {
                                stream.readable = false;
                                stream.emit("end")
                            })
                        }
                    }
                }(require("__browserify_process"), require("__browserify_Buffer").Buffer)
            }, {
                events: 7,
                stream: 18,
                util: 6,
                string_decoder: 19,
                __browserify_process: 8,
                __browserify_Buffer: 17
            }
        ],
        18: [
            function (require, module, exports) {
                var events = require("events");
                var util = require("util");

                function Stream() {
                    events.EventEmitter.call(this)
                }
                util.inherits(Stream, events.EventEmitter);
                module.exports = Stream;
                Stream.Stream = Stream;
                Stream.prototype.pipe = function (dest, options) {
                    var source = this;

                    function ondata(chunk) {
                        if (dest.writable) {
                            if (false === dest.write(chunk) && source.pause) {
                                source.pause()
                            }
                        }
                    }
                    source.on("data", ondata);

                    function ondrain() {
                        if (source.readable && source.resume) {
                            source.resume()
                        }
                    }
                    dest.on("drain", ondrain);
                    if (!dest._isStdio && (!options || options.end !== false)) {
                        dest._pipeCount = dest._pipeCount || 0;
                        dest._pipeCount++;
                        source.on("end", onend);
                        source.on("close", onclose)
                    }
                    var didOnEnd = false;

                    function onend() {
                        if (didOnEnd) return;
                        didOnEnd = true;
                        dest._pipeCount--;
                        cleanup();
                        if (dest._pipeCount > 0) {
                            return
                        }
                        dest.end()
                    }

                    function onclose() {
                        if (didOnEnd) return;
                        didOnEnd = true;
                        dest._pipeCount--;
                        cleanup();
                        if (dest._pipeCount > 0) {
                            return
                        }
                        dest.destroy()
                    }

                    function onerror(er) {
                        cleanup();
                        if (this.listeners("error").length === 0) {
                            throw er
                        }
                    }
                    source.on("error", onerror);
                    dest.on("error", onerror);

                    function cleanup() {
                        source.removeListener("data", ondata);
                        dest.removeListener("drain", ondrain);
                        source.removeListener("end", onend);
                        source.removeListener("close", onclose);
                        source.removeListener("error", onerror);
                        dest.removeListener("error", onerror);
                        source.removeListener("end", cleanup);
                        source.removeListener("close", cleanup);
                        dest.removeListener("end", cleanup);
                        dest.removeListener("close", cleanup)
                    }
                    source.on("end", cleanup);
                    source.on("close", cleanup);
                    dest.on("end", cleanup);
                    dest.on("close", cleanup);
                    dest.emit("pipe", source);
                    return dest
                }
            }, {
                events: 7,
                util: 6
            }
        ],
        19: [
            function (require, module, exports) {
                ! function (Buffer) {
                    var StringDecoder = exports.StringDecoder = function (encoding) {
                        this.encoding = (encoding || "utf8").toLowerCase().replace(/[-_]/, "");
                        switch (this.encoding) {
                        case "utf8":
                            this.surrogateSize = 3;
                            break;
                        case "ucs2":
                        case "utf16le":
                            this.surrogateSize = 2;
                            this.detectIncompleteChar = utf16DetectIncompleteChar;
                            break;
                        case "base64":
                            this.surrogateSize = 3;
                            this.detectIncompleteChar = base64DetectIncompleteChar;
                            break;
                        default:
                            this.write = passThroughWrite;
                            return
                        }
                        this.charBuffer = new Buffer(6);
                        this.charReceived = 0;
                        this.charLength = 0
                    };
                    StringDecoder.prototype.write = function (buffer) {
                        var charStr = "";
                        var offset = 0;
                        while (this.charLength) {
                            var i = buffer.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : buffer.length;
                            buffer.copy(this.charBuffer, this.charReceived, offset, i);
                            this.charReceived += i - offset;
                            offset = i;
                            if (this.charReceived < this.charLength) {
                                return ""
                            }
                            charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);
                            var charCode = charStr.charCodeAt(charStr.length - 1);
                            if (charCode >= 55296 && charCode <= 56319) {
                                this.charLength += this.surrogateSize;
                                charStr = "";
                                continue
                            }
                            this.charReceived = this.charLength = 0;
                            if (i == buffer.length) return charStr;
                            buffer = buffer.slice(i, buffer.length);
                            break
                        }
                        var lenIncomplete = this.detectIncompleteChar(buffer);
                        var end = buffer.length;
                        if (this.charLength) {
                            buffer.copy(this.charBuffer, 0, buffer.length - lenIncomplete, end);
                            this.charReceived = lenIncomplete;
                            end -= lenIncomplete
                        }
                        charStr += buffer.toString(this.encoding, 0, end);
                        var end = charStr.length - 1;
                        var charCode = charStr.charCodeAt(end);
                        if (charCode >= 55296 && charCode <= 56319) {
                            var size = this.surrogateSize;
                            this.charLength += size;
                            this.charReceived += size;
                            this.charBuffer.copy(this.charBuffer, size, 0, size);
                            this.charBuffer.write(charStr.charAt(charStr.length - 1), this.encoding);
                            return charStr.substring(0, end)
                        }
                        return charStr
                    };
                    StringDecoder.prototype.detectIncompleteChar = function (
                        buffer) {
                        var i = buffer.length >= 3 ? 3 : buffer.length;
                        for (; i > 0; i--) {
                            var c = buffer[buffer.length - i];
                            if (i == 1 && c >> 5 == 6) {
                                this.charLength = 2;
                                break
                            }
                            if (i <= 2 && c >> 4 == 14) {
                                this.charLength = 3;
                                break
                            }
                            if (i <= 3 && c >> 3 == 30) {
                                this.charLength = 4;
                                break
                            }
                        }
                        return i
                    };
                    StringDecoder.prototype.end = function (buffer) {
                        var res = "";
                        if (buffer && buffer.length) res = this.write(buffer);
                        if (this.charReceived) {
                            var cr = this.charReceived;
                            var buf = this.charBuffer;
                            var enc = this.encoding;
                            res += buf.slice(0, cr).toString(enc)
                        }
                        return res
                    };

                    function passThroughWrite(buffer) {
                        return buffer.toString(this.encoding)
                    }

                    function utf16DetectIncompleteChar(buffer) {
                        var incomplete = this.charReceived = buffer.length % 2;
                        this.charLength = incomplete ? 2 : 0;
                        return incomplete
                    }

                    function base64DetectIncompleteChar(buffer) {
                        var incomplete = this.charReceived = buffer.length % 3;
                        this.charLength = incomplete ? 3 : 0;
                        return incomplete
                    }
                }(require("__browserify_Buffer").Buffer)
            }, {
                __browserify_Buffer: 17
            }
        ],
        20: [
            function (require, module, exports) {
                ! function () {
                    var util = require("util");
                    var Buffer = require("buffer").Buffer;
                    var pSlice = Array.
                    prototype.slice;

                    function objectKeys(object) {
                        if (Object.keys) return Object.keys(object);
                        var result = [];
                        for (var name in object) {
                            if (Object.prototype.hasOwnProperty.call(object, name)) {
                                result.push(name)
                            }
                        }
                        return result
                    }
                    var assert = module.exports = ok;
                    assert.AssertionError = function AssertionError(options) {
                        this.name = "AssertionError";
                        this.message = options.message;
                        this.actual = options.actual;
                        this.expected = options.expected;
                        this.operator = options.operator;
                        var stackStartFunction = options.stackStartFunction || fail;
                        if (Error.captureStackTrace) {
                            Error.captureStackTrace(this, stackStartFunction)
                        }
                    };
                    util.inherits(assert.AssertionError, Error);

                    function replacer(key, value) {
                        if (value === undefined) {
                            return "" + value
                        }
                        if (typeof value === "number" && (isNaN(value) || !isFinite(value))) {
                            return value.toString()
                        }
                        if (typeof value === "function" || value instanceof RegExp) {
                            return value.toString()
                        }
                        return value
                    }

                    function truncate(s, n) {
                        if (typeof s == "string") {
                            return s.length < n ? s : s.slice(0, n)
                        } else {
                            return s
                        }
                    }
                    assert.AssertionError.prototype.toString = function () {
                        if (this.message) {
                            return [this.name + ":", this.message].join(" ")
                        } else {
                            return [this.name + ":", truncate(JSON.stringify(this.actual, replacer), 128), this.operator, truncate(JSON.stringify(this.expected, replacer), 128)].join(" ")
                        }
                    };
                    assert.AssertionError.__proto__ = Error.prototype;

                    function fail(actual, expected, message, operator, stackStartFunction) {
                        throw new assert.AssertionError({
                            message: message,
                            actual: actual,
                            expected: expected,
                            operator: operator,
                            stackStartFunction: stackStartFunction
                        })
                    }
                    assert.fail = fail;

                    function ok(value, message) {
                        if ( !! !value) fail(value, true, message, "==", assert.ok)
                    }
                    assert.ok = ok;
                    assert.equal = function equal(actual, expected, message) {
                        if (actual != expected) fail(actual, expected, message, "==", assert.equal)
                    };
                    assert.notEqual = function notEqual(actual, expected, message) {
                        if (actual == expected) {
                            fail(actual, expected, message, "!=", assert.notEqual)
                        }
                    };
                    assert.deepEqual = function deepEqual(actual, expected, message) {
                        if (!_deepEqual(actual, expected)) {
                            fail(actual, expected, message, "deepEqual", assert.deepEqual)
                        }
                    };

                    function _deepEqual(actual, expected) {
                        if (
                            actual === expected) {
                            return true
                        } else if (Buffer.isBuffer(actual) && Buffer.isBuffer(expected)) {
                            if (actual.length != expected.length) return false;
                            for (var i = 0; i < actual.length; i++) {
                                if (actual[i] !== expected[i]) return false
                            }
                            return true
                        } else if (actual instanceof Date && expected instanceof Date) {
                            return actual.getTime() === expected.getTime()
                        } else if (typeof actual != "object" && typeof expected != "object") {
                            return actual == expected
                        } else {
                            return objEquiv(actual, expected)
                        }
                    }

                    function isUndefinedOrNull(value) {
                        return value === null || value === undefined
                    }

                    function isArguments(object) {
                        return Object.prototype.toString.call(object) == "[object Arguments]"
                    }

                    function objEquiv(a, b) {
                        if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) return false;
                        if (a.prototype !== b.prototype) return false;
                        if (isArguments(a)) {
                            if (!isArguments(b)) {
                                return false
                            }
                            a = pSlice.call(a);
                            b = pSlice.call(b);
                            return _deepEqual(a, b)
                        }
                        try {
                            var ka = objectKeys(a),
                                kb = objectKeys(b),
                                key, i
                        } catch (e) {
                            return false
                        }
                        if (ka.length != kb.length) return false;
                        ka.sort();
                        kb.sort();
                        for (i = ka.length - 1; i >= 0; i--) {
                            if (ka[i] != kb[i])
                                return false
                        }
                        for (i = ka.length - 1; i >= 0; i--) {
                            key = ka[i];
                            if (!_deepEqual(a[key], b[key])) return false
                        }
                        return true
                    }
                    assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
                        if (_deepEqual(actual, expected)) {
                            fail(actual, expected, message, "notDeepEqual", assert.notDeepEqual)
                        }
                    };
                    assert.strictEqual = function strictEqual(actual, expected, message) {
                        if (actual !== expected) {
                            fail(actual, expected, message, "===", assert.strictEqual)
                        }
                    };
                    assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
                        if (actual === expected) {
                            fail(actual, expected, message, "!==", assert.notStrictEqual)
                        }
                    };

                    function expectedException(actual, expected) {
                        if (!actual || !expected) {
                            return false
                        }
                        if (expected instanceof RegExp) {
                            return expected.test(actual)
                        } else if (actual instanceof expected) {
                            return true
                        } else if (expected.call({}, actual) === true) {
                            return true
                        }
                        return false
                    }

                    function _throws(shouldThrow, block, expected, message) {
                        var actual;
                        if (typeof expected === "string") {
                            message = expected;
                            expected = null
                        }
                        try {
                            block()
                        } catch (e) {
                            actual = e
                        }
                        message = (expected && expected.name ? " (" + expected.name + ")." : ".") + (message ? " " + message : ".");
                        if (shouldThrow && !actual) {
                            fail("Missing expected exception" + message)
                        }
                        if (!shouldThrow && expectedException(actual, expected)) {
                            fail("Got unwanted exception" + message)
                        }
                        if (shouldThrow && actual && expected && !expectedException(actual, expected) || !shouldThrow && actual) {
                            throw actual
                        }
                    }
                    assert.throws = function (block, error, message) {
                        _throws.apply(this, [true].concat(pSlice.call(arguments)))
                    };
                    assert.doesNotThrow = function (block, error, message) {
                        _throws.apply(this, [false].concat(pSlice.call(arguments)))
                    };
                    assert.ifError = function (err) {
                        if (err) {
                            throw err
                        }
                    }
                }()
            }, {
                util: 6,
                buffer: 21
            }
        ],
        13: [
            function (require, module, exports) {
                ! function (process, Buffer) {
                    module.exports = Writable;
                    Writable.WritableState = WritableState;
                    var util = require("util");
                    var assert = require("assert");
                    var Stream = require("stream");
                    util.inherits(Writable, Stream);

                    function WriteReq(chunk, encoding, cb) {
                        this.chunk = chunk;
                        this.encoding = encoding;
                        this.callback = cb
                    }

                    function WritableState(options, stream) {
                        options = options || {};
                        var hwm = options.
                        highWaterMark;
                        this.highWaterMark = hwm || hwm === 0 ? hwm : 16 * 1024;
                        this.objectMode = !! options.objectMode;
                        this.highWaterMark = ~~this.highWaterMark;
                        this.needDrain = false;
                        this.ending = false;
                        this.ended = false;
                        this.finished = false;
                        var noDecode = options.decodeStrings === false;
                        this.decodeStrings = !noDecode;
                        this.length = 0;
                        this.writing = false;
                        this.sync = true;
                        this.bufferProcessing = false;
                        this.onwrite = function (er) {
                            onwrite(stream, er)
                        };
                        this.writecb = null;
                        this.writelen = 0;
                        this.buffer = []
                    }

                    function Writable(options) {
                        if (!(this instanceof Writable) && !(this instanceof require("./_stream_duplex"))) return new Writable(options);
                        this._writableState = new WritableState(options, this);
                        this.writable = true;
                        Stream.call(this)
                    }
                    Writable.prototype.pipe = function () {
                        this.emit("error", new Error("Cannot pipe. Not readable."))
                    };

                    function writeAfterEnd(stream, state, cb) {
                        var er = new Error("write after end");
                        stream.emit("error", er);
                        process.nextTick(function () {
                            cb(er)
                        })
                    }

                    function validChunk(stream, state, chunk, cb) {
                        var valid = true;
                        if (!Buffer.isBuffer(chunk) && "string" !== typeof chunk &&
                            chunk !== null && chunk !== undefined && !state.objectMode) {
                            var er = new TypeError("Invalid non-string/buffer chunk");
                            stream.emit("error", er);
                            process.nextTick(function () {
                                cb(er)
                            });
                            valid = false
                        }
                        return valid
                    }
                    Writable.prototype.write = function (chunk, encoding, cb) {
                        var state = this._writableState;
                        var ret = false;
                        if (typeof encoding === "function") {
                            cb = encoding;
                            encoding = null
                        }
                        if (!encoding) encoding = "utf8";
                        if (typeof cb !== "function") cb = function () {};
                        if (state.ended) writeAfterEnd(this, state, cb);
                        else if (validChunk(this, state, chunk, cb)) ret = writeOrBuffer(this, state, chunk, encoding, cb);
                        return ret
                    };

                    function decodeChunk(state, chunk, encoding) {
                        if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
                            chunk = new Buffer(chunk, encoding)
                        }
                        return chunk
                    }

                    function writeOrBuffer(stream, state, chunk, encoding, cb) {
                        chunk = decodeChunk(state, chunk, encoding);
                        var len = state.objectMode ? 1 : chunk.length;
                        state.length += len;
                        var ret = state.length < state.highWaterMark;
                        state.needDrain = !ret;
                        if (state.writing) state.buffer.push(new WriteReq(chunk, encoding, cb));
                        else
                            doWrite(stream, state, len, chunk, encoding, cb);
                        return ret
                    }

                    function doWrite(stream, state, len, chunk, encoding, cb) {
                        state.writelen = len;
                        state.writecb = cb;
                        state.writing = true;
                        state.sync = true;
                        stream._write(chunk, encoding, state.onwrite);
                        state.sync = false
                    }

                    function onwriteError(stream, state, sync, er, cb) {
                        if (sync) process.nextTick(function () {
                            cb(er)
                        });
                        else cb(er);
                        stream.emit("error", er)
                    }

                    function onwriteStateUpdate(state) {
                        state.writing = false;
                        state.writecb = null;
                        state.length -= state.writelen;
                        state.writelen = 0
                    }

                    function onwrite(stream, er) {
                        var state = stream._writableState;
                        var sync = state.sync;
                        var cb = state.writecb;
                        onwriteStateUpdate(state);
                        if (er) onwriteError(stream, state, sync, er, cb);
                        else {
                            var finished = finishMaybe(stream, state);
                            if (!finished && !state.bufferProcessing && state.buffer.length) clearBuffer(stream, state);
                            if (sync) {
                                process.nextTick(function () {
                                    afterWrite(stream, state, finished, cb)
                                })
                            } else {
                                afterWrite(stream, state, finished, cb)
                            }
                        }
                    }

                    function afterWrite(stream, state, finished, cb) {
                        if (!finished) onwriteDrain(stream, state);
                        cb()
                    }

                    function onwriteDrain(
                        stream, state) {
                        if (state.length === 0 && state.needDrain) {
                            state.needDrain = false;
                            stream.emit("drain")
                        }
                    }

                    function clearBuffer(stream, state) {
                        state.bufferProcessing = true;
                        for (var c = 0; c < state.buffer.length; c++) {
                            var entry = state.buffer[c];
                            var chunk = entry.chunk;
                            var encoding = entry.encoding;
                            var cb = entry.callback;
                            var len = state.objectMode ? 1 : chunk.length;
                            doWrite(stream, state, len, chunk, encoding, cb);
                            if (state.writing) {
                                c++;
                                break
                            }
                        }
                        state.bufferProcessing = false;
                        if (c < state.buffer.length) state.buffer = state.buffer.slice(c);
                        else state.buffer.length = 0
                    }
                    Writable.prototype._write = function (chunk, encoding, cb) {
                        cb(new Error("not implemented"))
                    };
                    Writable.prototype.end = function (chunk, encoding, cb) {
                        var state = this._writableState;
                        if (typeof chunk === "function") {
                            cb = chunk;
                            chunk = null;
                            encoding = null
                        } else if (typeof encoding === "function") {
                            cb = encoding;
                            encoding = null
                        }
                        if (typeof chunk !== "undefined" && chunk !== null) this.write(chunk, encoding);
                        if (!state.ending && !state.finished) endWritable(this, state, cb)
                    };

                    function finishMaybe(stream, state) {
                        if (state.ending && state.length === 0 && !state.finished) {
                            state.finished = true;
                            stream.emit("finish")
                        }
                        return state.finished
                    }

                    function endWritable(stream, state, cb) {
                        state.ending = true;
                        finishMaybe(stream, state);
                        if (cb) {
                            if (state.finished) process.nextTick(cb);
                            else stream.once("finish", cb)
                        }
                        state.ended = true
                    }
                }(require("__browserify_process"), require("__browserify_Buffer").Buffer)
            }, {
                util: 6,
                assert: 20,
                stream: 18,
                "./_stream_duplex": 14,
                __browserify_process: 8,
                __browserify_Buffer: 17
            }
        ],
        15: [
            function (require, module, exports) {
                module.exports = Transform;
                var Duplex = require("./_stream_duplex");
                var util = require("util");
                util.inherits(Transform, Duplex);

                function TransformState(options, stream) {
                    var ts = this;
                    this.afterTransform = function (er, data) {
                        return afterTransform(stream, er, data)
                    };
                    this.needTransform = false;
                    this.transforming = false;
                    this.writecb = null;
                    this.writechunk = null
                }

                function afterTransform(stream, er, data) {
                    var ts = stream._transformState;
                    ts.transforming = false;
                    var cb = ts.writecb;
                    if (!cb) return stream.emit("error", new Error("no writecb in Transform class"));
                    ts.writechunk = null;
                    ts.
                    writecb = null;
                    if (data !== null && data !== undefined) stream.push(data);
                    if (cb) cb(er);
                    var rs = stream._readableState;
                    if (rs.needReadable || rs.length < rs.highWaterMark) {
                        stream._read(rs.highWaterMark)
                    }
                }

                function Transform(options) {
                    if (!(this instanceof Transform)) return new Transform(options);
                    Duplex.call(this, options);
                    var ts = this._transformState = new TransformState(options, this);
                    var stream = this;
                    this._readableState.needReadable = true;
                    this._readableState.sync = false;
                    this.once("finish", function () {
                        if ("function" === typeof this._flush) this._flush(function (er) {
                            done(stream, er)
                        });
                        else done(stream)
                    })
                }
                Transform.prototype.push = function (chunk) {
                    this._transformState.needTransform = false;
                    return Duplex.prototype.push.call(this, chunk)
                };
                Transform.prototype._transform = function (chunk, output, cb) {
                    throw new Error("not implemented")
                };
                Transform.prototype._write = function (chunk, encoding, cb) {
                    var ts = this._transformState;
                    ts.writecb = cb;
                    ts.writechunk = chunk;
                    ts.writeencoding = encoding;
                    if (!ts.transforming) {
                        var rs = this._readableState;
                        if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark)
                    }
                };
                Transform.prototype._read = function (n) {
                    var ts = this._transformState;
                    if (ts.writechunk && ts.writecb && !ts.transforming) {
                        ts.transforming = true;
                        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform)
                    } else {
                        ts.needTransform = true
                    }
                };

                function done(stream, er) {
                    if (er) return stream.emit("error", er);
                    var ws = stream._writableState;
                    var rs = stream._readableState;
                    var ts = stream._transformState;
                    if (ws.length) throw new Error("calling transform done when ws.length != 0");
                    if (ts.transforming) throw new Error("calling transform done when still transforming");
                    return stream.push(null)
                }
            }, {
                util: 6,
                "./_stream_duplex": 14
            }
        ],
        14: [
            function (require, module, exports) {
                ! function (process) {
                    module.exports = Duplex;
                    var util = require("util");
                    var Readable = require("./_stream_readable");
                    var Writable = require("./_stream_writable");
                    util.inherits(Duplex, Readable);
                    Object.keys(Writable.prototype).forEach(function (method) {
                        if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[
                            method]
                    });

                    function Duplex(options) {
                        if (!(this instanceof Duplex)) return new Duplex(options);
                        Readable.call(this, options);
                        Writable.call(this, options);
                        if (options && options.readable === false) this.readable = false;
                        if (options && options.writable === false) this.writable = false;
                        this.allowHalfOpen = true;
                        if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;
                        this.once("end", onend)
                    }

                    function onend() {
                        if (this.allowHalfOpen || this._writableState.ended) return;
                        process.nextTick(this.end.bind(this))
                    }
                }(require("__browserify_process"))
            }, {
                util: 6,
                "./_stream_readable": 12,
                "./_stream_writable": 13,
                __browserify_process: 8
            }
        ],
        16: [
            function (require, module, exports) {
                module.exports = PassThrough;
                var Transform = require("./_stream_transform");
                var util = require("util");
                util.inherits(PassThrough, Transform);

                function PassThrough(options) {
                    if (!(this instanceof PassThrough)) return new PassThrough(options);
                    Transform.call(this, options)
                }
                PassThrough.prototype._transform = function (chunk, encoding, cb) {
                    cb(null, chunk)
                }
            }, {
                util: 6,
                "./_stream_transform": 15
            }
        ],
        22: [
            function (require, module, exports) {
                exports.readIEEE754 = function (buffer, offset, isBE, mLen, nBytes) {
                    var e, m, eLen = nBytes * 8 - mLen - 1,
                        eMax = (1 << eLen) - 1,
                        eBias = eMax >> 1,
                        nBits = -7,
                        i = isBE ? 0 : nBytes - 1,
                        d = isBE ? 1 : -1,
                        s = buffer[offset + i];
                    i += d;
                    e = s & (1 << -nBits) - 1;
                    s >>= -nBits;
                    nBits += eLen;
                    for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);
                    m = e & (1 << -nBits) - 1;
                    e >>= -nBits;
                    nBits += mLen;
                    for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);
                    if (e === 0) {
                        e = 1 - eBias
                    } else if (e === eMax) {
                        return m ? NaN : (s ? -1 : 1) * Infinity
                    } else {
                        m = m + Math.pow(2, mLen);
                        e = e - eBias
                    }
                    return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
                };
                exports.writeIEEE754 = function (buffer, value, offset, isBE, mLen, nBytes) {
                    var e, m, c, eLen = nBytes * 8 - mLen - 1,
                        eMax = (1 << eLen) - 1,
                        eBias = eMax >> 1,
                        rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                        i = isBE ? nBytes - 1 : 0,
                        d = isBE ? -1 : 1,
                        s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
                    value = Math.abs(value);
                    if (isNaN(value) || value === Infinity) {
                        m = isNaN(value) ? 1 : 0;
                        e = eMax
                    } else {
                        e = Math.floor(Math.log(value) / Math.LN2);
                        if (value * (c = Math.pow(2, -e)) < 1) {
                            e--;
                            c *= 2
                        }
                        if (e + eBias >= 1) {
                            value += rt / c
                        } else {
                            value += rt * Math.pow(2, 1 - eBias)
                        } if (
                            value * c >= 2) {
                            e++;
                            c /= 2
                        }
                        if (e + eBias >= eMax) {
                            m = 0;
                            e = eMax
                        } else if (e + eBias >= 1) {
                            m = (value * c - 1) * Math.pow(2, mLen);
                            e = e + eBias
                        } else {
                            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
                            e = 0
                        }
                    }
                    for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8);
                    e = e << mLen | m;
                    eLen += mLen;
                    for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8);
                    buffer[offset + i - d] |= s * 128
                }
            }, {}
        ],
        21: [
            function (require, module, exports) {
                ! function () {
                    function SlowBuffer(size) {
                        this.length = size
                    }
                    var assert = require("assert");
                    exports.INSPECT_MAX_BYTES = 50;

                    function toHex(n) {
                        if (n < 16) return "0" + n.toString(16);
                        return n.toString(16)
                    }

                    function utf8ToBytes(str) {
                        var byteArray = [];
                        for (var i = 0; i < str.length; i++)
                            if (str.charCodeAt(i) <= 127) byteArray.push(str.charCodeAt(i));
                            else {
                                var h = encodeURIComponent(str.charAt(i)).substr(1).split("%");
                                for (var j = 0; j < h.length; j++) byteArray.push(parseInt(h[j], 16))
                            }
                        return byteArray
                    }

                    function asciiToBytes(str) {
                        var byteArray = [];
                        for (var i = 0; i < str.length; i++) byteArray.push(str.charCodeAt(i) & 255);
                        return byteArray
                    }

                    function base64ToBytes(str) {
                        return require("base64-js").
                        toByteArray(str)
                    }
                    SlowBuffer.byteLength = function (str, encoding) {
                        switch (encoding || "utf8") {
                        case "hex":
                            return str.length / 2;
                        case "utf8":
                        case "utf-8":
                            return utf8ToBytes(str).length;
                        case "ascii":
                        case "binary":
                            return str.length;
                        case "base64":
                            return base64ToBytes(str).length;
                        default:
                            throw new Error("Unknown encoding")
                        }
                    };

                    function blitBuffer(src, dst, offset, length) {
                        var pos, i = 0;
                        while (i < length) {
                            if (i + offset >= dst.length || i >= src.length) break;
                            dst[i + offset] = src[i];
                            i++
                        }
                        return i
                    }
                    SlowBuffer.prototype.utf8Write = function (string, offset, length) {
                        var bytes, pos;
                        return SlowBuffer._charsWritten = blitBuffer(utf8ToBytes(string), this, offset, length)
                    };
                    SlowBuffer.prototype.asciiWrite = function (string, offset, length) {
                        var bytes, pos;
                        return SlowBuffer._charsWritten = blitBuffer(asciiToBytes(string), this, offset, length)
                    };
                    SlowBuffer.prototype.binaryWrite = SlowBuffer.prototype.asciiWrite;
                    SlowBuffer.prototype.base64Write = function (string, offset, length) {
                        var bytes, pos;
                        return SlowBuffer._charsWritten = blitBuffer(base64ToBytes(string), this, offset, length)
                    };
                    SlowBuffer.
                    prototype.base64Slice = function (start, end) {
                        var bytes = Array.prototype.slice.apply(this, arguments);
                        return require("base64-js").fromByteArray(bytes)
                    };

                    function decodeUtf8Char(str) {
                        try {
                            return decodeURIComponent(str)
                        } catch (err) {
                            return String.fromCharCode(65533)
                        }
                    }
                    SlowBuffer.prototype.utf8Slice = function () {
                        var bytes = Array.prototype.slice.apply(this, arguments);
                        var res = "";
                        var tmp = "";
                        var i = 0;
                        while (i < bytes.length) {
                            if (bytes[i] <= 127) {
                                res += decodeUtf8Char(tmp) + String.fromCharCode(bytes[i]);
                                tmp = ""
                            } else tmp += "%" + bytes[i].toString(16);
                            i++
                        }
                        return res + decodeUtf8Char(tmp)
                    };
                    SlowBuffer.prototype.asciiSlice = function () {
                        var bytes = Array.prototype.slice.apply(this, arguments);
                        var ret = "";
                        for (var i = 0; i < bytes.length; i++) ret += String.fromCharCode(bytes[i]);
                        return ret
                    };
                    SlowBuffer.prototype.binarySlice = SlowBuffer.prototype.asciiSlice;
                    SlowBuffer.prototype.inspect = function () {
                        var out = [],
                            len = this.length;
                        for (var i = 0; i < len; i++) {
                            out[i] = toHex(this[i]);
                            if (i == exports.INSPECT_MAX_BYTES) {
                                out[i + 1] = "...";
                                break
                            }
                        }
                        return "<SlowBuffer " + out.join(" ") + ">"
                    };
                    SlowBuffer.prototype.hexSlice = function (start, end) {
                        var len = this.length;
                        if (!start || start < 0) start = 0;
                        if (!end || end < 0 || end > len) end = len;
                        var out = "";
                        for (var i = start; i < end; i++) {
                            out += toHex(this[i])
                        }
                        return out
                    };
                    SlowBuffer.prototype.toString = function (encoding, start, end) {
                        encoding = String(encoding || "utf8").toLowerCase();
                        start = +start || 0;
                        if (typeof end == "undefined") end = this.length;
                        if (+end == start) {
                            return ""
                        }
                        switch (encoding) {
                        case "hex":
                            return this.hexSlice(start, end);
                        case "utf8":
                        case "utf-8":
                            return this.utf8Slice(start, end);
                        case "ascii":
                            return this.asciiSlice(start, end);
                        case "binary":
                            return this.binarySlice(start, end);
                        case "base64":
                            return this.base64Slice(start, end);
                        case "ucs2":
                        case "ucs-2":
                            return this.ucs2Slice(start, end);
                        default:
                            throw new Error("Unknown encoding")
                        }
                    };
                    SlowBuffer.prototype.hexWrite = function (string, offset, length) {
                        offset = +offset || 0;
                        var remaining = this.length - offset;
                        if (!length) {
                            length = remaining
                        } else {
                            length = +length;
                            if (length > remaining) {
                                length = remaining
                            }
                        }
                        var strLen = string.length;
                        if (strLen % 2) {
                            throw new Error("Invalid hex string")
                        }
                        if (length > strLen / 2) {
                            length = strLen / 2
                        }
                        for (var i = 0; i < length; i++) {
                            var byte = parseInt(string.substr(i * 2, 2), 16);
                            if (isNaN(byte)) throw new Error("Invalid hex string");
                            this[offset + i] = byte
                        }
                        SlowBuffer._charsWritten = i * 2;
                        return i
                    };
                    SlowBuffer.prototype.write = function (string, offset, length, encoding) {
                        if (isFinite(offset)) {
                            if (!isFinite(length)) {
                                encoding = length;
                                length = undefined
                            }
                        } else {
                            var swap = encoding;
                            encoding = offset;
                            offset = length;
                            length = swap
                        }
                        offset = +offset || 0;
                        var remaining = this.length - offset;
                        if (!length) {
                            length = remaining
                        } else {
                            length = +length;
                            if (length > remaining) {
                                length = remaining
                            }
                        }
                        encoding = String(encoding || "utf8").toLowerCase();
                        switch (encoding) {
                        case "hex":
                            return this.hexWrite(string, offset, length);
                        case "utf8":
                        case "utf-8":
                            return this.utf8Write(string, offset, length);
                        case "ascii":
                            return this.asciiWrite(string, offset, length);
                        case "binary":
                            return this.binaryWrite(string, offset, length);
                        case "base64":
                            return this.base64Write(string, offset, length);
                        case "ucs2":
                        case "ucs-2":
                            return this.ucs2Write(string, offset, length);
                        default:
                            throw new Error("Unknown encoding")
                        }
                    };
                    SlowBuffer.prototype.slice = function (start, end) {
                        if (end === undefined) end = this.length;
                        if (end > this.length) {
                            throw new Error("oob")
                        }
                        if (start > end) {
                            throw new Error("oob")
                        }
                        return new Buffer(this, end - start, +start)
                    };
                    SlowBuffer.prototype.copy = function (target, targetstart, sourcestart, sourceend) {
                        var temp = [];
                        for (var i = sourcestart; i < sourceend; i++) {
                            assert.ok(typeof this[i] !== "undefined", "copying undefined buffer bytes!");
                            temp.push(this[i])
                        }
                        for (var i = targetstart; i < targetstart + temp.length; i++) {
                            target[i] = temp[i - targetstart]
                        }
                    };
                    SlowBuffer.prototype.fill = function (value, start, end) {
                        if (end > this.length) {
                            throw new Error("oob")
                        }
                        if (start > end) {
                            throw new Error("oob")
                        }
                        for (var i = start; i < end; i++) {
                            this[i] = value
                        }
                    };

                    function coerce(length) {
                        length = ~~Math.ceil(+length);
                        return length < 0 ? 0 : length
                    }

                    function Buffer(subject, encoding, offset) {
                        if (!(this instanceof Buffer)) {
                            return new Buffer(subject, encoding, offset)
                        }
                        var type;
                        if (typeof offset === "number") {
                            this.length = coerce(encoding);
                            this.parent = subject;
                            this.offset = offset
                        } else {
                            switch (
                                type = typeof subject) {
                            case "number":
                                this.length = coerce(subject);
                                break;
                            case "string":
                                this.length = Buffer.byteLength(subject, encoding);
                                break;
                            case "object":
                                this.length = coerce(subject.length);
                                break;
                            default:
                                throw new Error("First argument needs to be a number, " + "array or string.")
                            }
                            if (this.length > Buffer.poolSize) {
                                this.parent = new SlowBuffer(this.length);
                                this.offset = 0
                            } else {
                                if (!pool || pool.length - pool.used < this.length) allocPool();
                                this.parent = pool;
                                this.offset = pool.used;
                                pool.used += this.length
                            } if (isArrayIsh(subject)) {
                                for (var i = 0; i < this.length; i++) {
                                    if (subject instanceof Buffer) {
                                        this.parent[i + this.offset] = subject.readUInt8(i)
                                    } else {
                                        this.parent[i + this.offset] = subject[i]
                                    }
                                }
                            } else if (type == "string") {
                                this.length = this.write(subject, 0, encoding)
                            }
                        }
                    }

                    function isArrayIsh(subject) {
                        return Array.isArray(subject) || Buffer.isBuffer(subject) || subject && typeof subject === "object" && typeof subject.length === "number"
                    }
                    exports.SlowBuffer = SlowBuffer;
                    exports.Buffer = Buffer;
                    Buffer.poolSize = 8 * 1024;
                    var pool;

                    function allocPool() {
                        pool = new SlowBuffer(Buffer.poolSize);
                        pool.used = 0
                    }
                    Buffer.isBuffer = function isBuffer(b) {
                        return b instanceof Buffer || b instanceof SlowBuffer
                    };
                    Buffer.concat = function (list, totalLength) {
                        if (!Array.isArray(list)) {
                            throw new Error("Usage: Buffer.concat(list, [totalLength])\n       list should be an Array.")
                        }
                        if (list.length === 0) {
                            return new Buffer(0)
                        } else if (list.length === 1) {
                            return list[0]
                        }
                        if (typeof totalLength !== "number") {
                            totalLength = 0;
                            for (var i = 0; i < list.length; i++) {
                                var buf = list[i];
                                totalLength += buf.length
                            }
                        }
                        var buffer = new Buffer(totalLength);
                        var pos = 0;
                        for (var i = 0; i < list.length; i++) {
                            var buf = list[i];
                            buf.copy(buffer, pos);
                            pos += buf.length
                        }
                        return buffer
                    };
                    Buffer.prototype.inspect = function inspect() {
                        var out = [],
                            len = this.length;
                        for (var i = 0; i < len; i++) {
                            out[i] = toHex(this.parent[i + this.offset]);
                            if (i == exports.INSPECT_MAX_BYTES) {
                                out[i + 1] = "...";
                                break
                            }
                        }
                        return "<Buffer " + out.join(" ") + ">"
                    };
                    Buffer.prototype.get = function get(i) {
                        if (i < 0 || i >= this.length) throw new Error("oob");
                        return this.parent[this.offset + i]
                    };
                    Buffer.prototype.set = function set(i, v) {
                        if (i < 0 || i >= this.length) throw new Error("oob");
                        return this.parent[this.offset + i] = v
                    };
                    Buffer.prototype.write = function (string, offset, length, encoding) {
                        if (isFinite(offset)) {
                            if (!isFinite(length)) {
                                encoding = length;
                                length = undefined
                            }
                        } else {
                            var swap = encoding;
                            encoding = offset;
                            offset = length;
                            length = swap
                        }
                        offset = +offset || 0;
                        var remaining = this.length - offset;
                        if (!length) {
                            length = remaining
                        } else {
                            length = +length;
                            if (length > remaining) {
                                length = remaining
                            }
                        }
                        encoding = String(encoding || "utf8").
                        toLowerCase();
                        var ret;
                        switch (encoding) {
                        case "hex":
                            ret = this.parent.hexWrite(string, this.offset + offset, length);
                            break;
                        case "utf8":
                        case "utf-8":
                            ret = this.parent.utf8Write(string, this.offset + offset, length);
                            break;
                        case "ascii":
                            ret = this.parent.asciiWrite(string, this.offset + offset, length);
                            break;
                        case "binary":
                            ret = this.parent.binaryWrite(string, this.offset + offset, length);
                            break;
                        case "base64":
                            ret = this.parent.base64Write(string, this.offset + offset, length);
                            break;
                        case "ucs2":
                        case "ucs-2":
                            ret = this.parent.ucs2Write(string, this.offset + offset, length);
                            break;
                        default:
                            throw new Error("Unknown encoding")
                        }
                        Buffer._charsWritten = SlowBuffer._charsWritten;
                        return ret
                    };
                    Buffer.prototype.toString = function (encoding, start, end) {
                        encoding = String(encoding || "utf8").toLowerCase();
                        if (typeof start == "undefined" || start < 0) {
                            start = 0
                        } else if (start > this.length) {
                            start = this.length
                        }
                        if (typeof end == "undefined" || end > this.length) {
                            end = this.length
                        } else if (end < 0) {
                            end = 0
                        }
                        start = start + this.offset;
                        end = end + this.offset;
                        switch (encoding) {
                        case "hex":
                            return this.parent.hexSlice(start, end);
                        case "utf8":
                        case "utf-8":
                            return this.parent.utf8Slice(start, end);
                        case "ascii":
                            return this.parent.asciiSlice(start, end);
                        case "binary":
                            return this.parent.binarySlice(start, end);
                        case "base64":
                            return this.parent.base64Slice(start, end);
                        case "ucs2":
                        case "ucs-2":
                            return this.parent.ucs2Slice(start, end);
                        default:
                            throw new Error("Unknown encoding")
                        }
                    };
                    Buffer.byteLength = SlowBuffer.byteLength;
                    Buffer.prototype.fill = function fill(value, start, end) {
                        value || (value = 0);
                        start || (start = 0);
                        end || (end = this.length);
                        if (typeof value === "string") {
                            value = value.charCodeAt(0)
                        }
                        if (!(typeof value === "number") || isNaN(value)) {
                            throw new Error("value is not a number")
                        }
                        if (end < start) throw new Error("end < start");
                        if (end === start) return 0;
                        if (this.length == 0) return 0;
                        if (start < 0 || start >= this.length) {
                            throw new Error("start out of bounds")
                        }
                        if (end < 0 || end > this.length) {
                            throw new Error("end out of bounds")
                        }
                        return this.parent.fill(value, start + this.offset, end + this.offset)
                    };
                    Buffer.prototype.copy = function (target, target_start, start, end) {
                        var source = this;
                        start || (start = 0);
                        end || (
                            end = this.length);
                        target_start || (target_start = 0);
                        if (end < start) throw new Error("sourceEnd < sourceStart");
                        if (end === start) return 0;
                        if (target.length == 0 || source.length == 0) return 0;
                        if (target_start < 0 || target_start >= target.length) {
                            throw new Error("targetStart out of bounds")
                        }
                        if (start < 0 || start >= source.length) {
                            throw new Error("sourceStart out of bounds")
                        }
                        if (end < 0 || end > source.length) {
                            throw new Error("sourceEnd out of bounds")
                        }
                        if (end > this.length) {
                            end = this.length
                        }
                        if (target.length - target_start < end - start) {
                            end = target.length - target_start + start
                        }
                        return this.parent.copy(target.parent, target_start + target.offset, start + this.offset, end + this.offset)
                    };
                    Buffer.prototype.slice = function (start, end) {
                        if (end === undefined) end = this.length;
                        if (end > this.length) throw new Error("oob");
                        if (start > end) throw new Error("oob");
                        return new Buffer(this.parent, end - start, +start + this.offset)
                    };
                    Buffer.prototype.utf8Slice = function (start, end) {
                        return this.toString("utf8", start, end)
                    };
                    Buffer.prototype.binarySlice = function (start, end) {
                        return this.toString("binary", start,
                            end)
                    };
                    Buffer.prototype.asciiSlice = function (start, end) {
                        return this.toString("ascii", start, end)
                    };
                    Buffer.prototype.utf8Write = function (string, offset) {
                        return this.write(string, offset, "utf8")
                    };
                    Buffer.prototype.binaryWrite = function (string, offset) {
                        return this.write(string, offset, "binary")
                    };
                    Buffer.prototype.asciiWrite = function (string, offset) {
                        return this.write(string, offset, "ascii")
                    };
                    Buffer.prototype.readUInt8 = function (offset, noAssert) {
                        var buffer = this;
                        if (!noAssert) {
                            assert.ok(offset !== undefined && offset !== null, "missing offset");
                            assert.ok(offset < buffer.length, "Trying to read beyond buffer length")
                        }
                        if (offset >= buffer.length) return;
                        return buffer.parent[buffer.offset + offset]
                    };

                    function readUInt16(buffer, offset, isBigEndian, noAssert) {
                        var val = 0;
                        if (!noAssert) {
                            assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                            assert.ok(offset !== undefined && offset !== null, "missing offset");
                            assert.ok(offset + 1 < buffer.length, "Trying to read beyond buffer length")
                        }
                        if (offset >= buffer.length) return 0;
                        if (isBigEndian) {
                            val = buffer.parent[
                                buffer.offset + offset] << 8;
                            if (offset + 1 < buffer.length) {
                                val |= buffer.parent[buffer.offset + offset + 1]
                            }
                        } else {
                            val = buffer.parent[buffer.offset + offset];
                            if (offset + 1 < buffer.length) {
                                val |= buffer.parent[buffer.offset + offset + 1] << 8
                            }
                        }
                        return val
                    }
                    Buffer.prototype.readUInt16LE = function (offset, noAssert) {
                        return readUInt16(this, offset, false, noAssert)
                    };
                    Buffer.prototype.readUInt16BE = function (offset, noAssert) {
                        return readUInt16(this, offset, true, noAssert)
                    };

                    function readUInt32(buffer, offset, isBigEndian, noAssert) {
                        var val = 0;
                        if (!noAssert) {
                            assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                            assert.ok(offset !== undefined && offset !== null, "missing offset");
                            assert.ok(offset + 3 < buffer.length, "Trying to read beyond buffer length")
                        }
                        if (offset >= buffer.length) return 0;
                        if (isBigEndian) {
                            if (offset + 1 < buffer.length) val = buffer.parent[buffer.offset + offset + 1] << 16;
                            if (offset + 2 < buffer.length) val |= buffer.parent[buffer.offset + offset + 2] << 8;
                            if (offset + 3 < buffer.length) val |= buffer.parent[buffer.offset + offset + 3];
                            val = val + (buffer.parent[buffer.offset + offset] << 24 >>> 0)
                        } else {
                            if (offset + 2 < buffer.length) val = buffer.parent[buffer.offset + offset + 2] << 16;
                            if (offset + 1 < buffer.length) val |= buffer.parent[buffer.offset + offset + 1] << 8;
                            val |= buffer.parent[buffer.offset + offset];
                            if (offset + 3 < buffer.length) val = val + (buffer.parent[buffer.offset + offset + 3] << 24 >>> 0)
                        }
                        return val
                    }
                    Buffer.prototype.readUInt32LE = function (offset, noAssert) {
                        return readUInt32(this, offset, false, noAssert)
                    };
                    Buffer.prototype.readUInt32BE = function (offset, noAssert) {
                        return readUInt32(this, offset, true, noAssert)
                    };
                    Buffer.prototype.readInt8 = function (offset, noAssert) {
                        var buffer = this;
                        var neg;
                        if (!noAssert) {
                            assert.ok(offset !== undefined && offset !== null, "missing offset");
                            assert.ok(offset < buffer.length, "Trying to read beyond buffer length")
                        }
                        if (offset >= buffer.length) return;
                        neg = buffer.parent[buffer.offset + offset] & 128;
                        if (!neg) {
                            return buffer.parent[buffer.offset + offset]
                        }
                        return (255 - buffer.parent[buffer.offset + offset] + 1) * -1
                    };

                    function readInt16(buffer, offset, isBigEndian, noAssert) {
                        var neg, val;
                        if (!noAssert) {
                            assert.ok(typeof isBigEndian === "boolean",
                                "missing or invalid endian");
                            assert.ok(offset !== undefined && offset !== null, "missing offset");
                            assert.ok(offset + 1 < buffer.length, "Trying to read beyond buffer length")
                        }
                        val = readUInt16(buffer, offset, isBigEndian, noAssert);
                        neg = val & 32768;
                        if (!neg) {
                            return val
                        }
                        return (65535 - val + 1) * -1
                    }
                    Buffer.prototype.readInt16LE = function (offset, noAssert) {
                        return readInt16(this, offset, false, noAssert)
                    };
                    Buffer.prototype.readInt16BE = function (offset, noAssert) {
                        return readInt16(this, offset, true, noAssert)
                    };

                    function readInt32(buffer, offset, isBigEndian, noAssert) {
                        var neg, val;
                        if (!noAssert) {
                            assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                            assert.ok(offset !== undefined && offset !== null, "missing offset");
                            assert.ok(offset + 3 < buffer.length, "Trying to read beyond buffer length")
                        }
                        val = readUInt32(buffer, offset, isBigEndian, noAssert);
                        neg = val & 2147483648;
                        if (!neg) {
                            return val
                        }
                        return (4294967295 - val + 1) * -1
                    }
                    Buffer.prototype.readInt32LE = function (offset, noAssert) {
                        return readInt32(this, offset, false, noAssert)
                    };
                    Buffer.prototype.readInt32BE = function (offset,
                        noAssert) {
                        return readInt32(this, offset, true, noAssert)
                    };

                    function readFloat(buffer, offset, isBigEndian, noAssert) {
                        if (!noAssert) {
                            assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                            assert.ok(offset + 3 < buffer.length, "Trying to read beyond buffer length")
                        }
                        return require("./buffer_ieee754").readIEEE754(buffer, offset, isBigEndian, 23, 4)
                    }
                    Buffer.prototype.readFloatLE = function (offset, noAssert) {
                        return readFloat(this, offset, false, noAssert)
                    };
                    Buffer.prototype.readFloatBE = function (offset, noAssert) {
                        return readFloat(this, offset, true, noAssert)
                    };

                    function readDouble(buffer, offset, isBigEndian, noAssert) {
                        if (!noAssert) {
                            assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                            assert.ok(offset + 7 < buffer.length, "Trying to read beyond buffer length")
                        }
                        return require("./buffer_ieee754").readIEEE754(buffer, offset, isBigEndian, 52, 8)
                    }
                    Buffer.prototype.readDoubleLE = function (offset, noAssert) {
                        return readDouble(this, offset, false, noAssert)
                    };
                    Buffer.prototype.readDoubleBE = function (offset, noAssert) {
                        return readDouble(this,
                            offset, true, noAssert)
                    };

                    function verifuint(value, max) {
                        assert.ok(typeof value == "number", "cannot write a non-number as a number");
                        assert.ok(value >= 0, "specified a negative value for writing an unsigned value");
                        assert.ok(value <= max, "value is larger than maximum value for type");
                        assert.ok(Math.floor(value) === value, "value has a fractional component")
                    }
                    Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
                        var buffer = this;
                        if (!noAssert) {
                            assert.ok(value !== undefined && value !== null, "missing value");
                            assert.ok(offset !== undefined && offset !== null, "missing offset");
                            assert.ok(offset < buffer.length, "trying to write beyond buffer length");
                            verifuint(value, 255)
                        }
                        if (offset < buffer.length) {
                            buffer.parent[buffer.offset + offset] = value
                        }
                    };

                    function writeUInt16(buffer, value, offset, isBigEndian, noAssert) {
                        if (!noAssert) {
                            assert.ok(value !== undefined && value !== null, "missing value");
                            assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                            assert.ok(offset !== undefined && offset !== null, "missing offset");
                            assert.ok(offset + 1 < buffer.length, "trying to write beyond buffer length");
                            verifuint(value, 65535)
                        }
                        for (var i = 0; i < Math.min(buffer.length - offset, 2); i++) {
                            buffer.parent[buffer.offset + offset + i] = (value & 255 << 8 * (isBigEndian ? 1 - i : i)) >>> (isBigEndian ? 1 - i : i) * 8
                        }
                    }
                    Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
                        writeUInt16(this, value, offset, false, noAssert)
                    };
                    Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
                        writeUInt16(this, value, offset, true, noAssert)
                    };

                    function writeUInt32(buffer, value, offset, isBigEndian, noAssert) {
                        if (!noAssert) {
                            assert.ok(value !== undefined && value !== null, "missing value");
                            assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                            assert.ok(offset !== undefined && offset !== null, "missing offset");
                            assert.ok(offset + 3 < buffer.length, "trying to write beyond buffer length");
                            verifuint(value, 4294967295)
                        }
                        for (var i = 0; i < Math.min(buffer.length - offset, 4); i++) {
                            buffer.parent[buffer.offset + offset + i] = value >>> (isBigEndian ? 3 - i : i) * 8 & 255
                        }
                    }
                    Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
                        writeUInt32(this, value, offset, false,
                            noAssert)
                    };
                    Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
                        writeUInt32(this, value, offset, true, noAssert)
                    };

                    function verifsint(value, max, min) {
                        assert.ok(typeof value == "number", "cannot write a non-number as a number");
                        assert.ok(value <= max, "value larger than maximum allowed value");
                        assert.ok(value >= min, "value smaller than minimum allowed value");
                        assert.ok(Math.floor(value) === value, "value has a fractional component")
                    }

                    function verifIEEE754(value, max, min) {
                        assert.ok(typeof value == "number", "cannot write a non-number as a number");
                        assert.ok(value <= max, "value larger than maximum allowed value");
                        assert.ok(value >= min, "value smaller than minimum allowed value")
                    }
                    Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
                        var buffer = this;
                        if (!noAssert) {
                            assert.ok(value !== undefined && value !== null, "missing value");
                            assert.ok(offset !== undefined && offset !== null, "missing offset");
                            assert.ok(offset < buffer.length, "Trying to write beyond buffer length");
                            verifsint(value, 127, -128)
                        }
                        if (value >= 0) {
                            buffer.writeUInt8(value, offset,
                                noAssert)
                        } else {
                            buffer.writeUInt8(255 + value + 1, offset, noAssert)
                        }
                    };

                    function writeInt16(buffer, value, offset, isBigEndian, noAssert) {
                        if (!noAssert) {
                            assert.ok(value !== undefined && value !== null, "missing value");
                            assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                            assert.ok(offset !== undefined && offset !== null, "missing offset");
                            assert.ok(offset + 1 < buffer.length, "Trying to write beyond buffer length");
                            verifsint(value, 32767, -32768)
                        }
                        if (value >= 0) {
                            writeUInt16(buffer, value, offset, isBigEndian, noAssert)
                        } else {
                            writeUInt16(buffer, 65535 + value + 1, offset, isBigEndian, noAssert)
                        }
                    }
                    Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
                        writeInt16(this, value, offset, false, noAssert)
                    };
                    Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
                        writeInt16(this, value, offset, true, noAssert)
                    };

                    function writeInt32(buffer, value, offset, isBigEndian, noAssert) {
                        if (!noAssert) {
                            assert.ok(value !== undefined && value !== null, "missing value");
                            assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                            assert.ok(offset !== undefined &&
                                offset !== null, "missing offset");
                            assert.ok(offset + 3 < buffer.length, "Trying to write beyond buffer length");
                            verifsint(value, 2147483647, -2147483648)
                        }
                        if (value >= 0) {
                            writeUInt32(buffer, value, offset, isBigEndian, noAssert)
                        } else {
                            writeUInt32(buffer, 4294967295 + value + 1, offset, isBigEndian, noAssert)
                        }
                    }
                    Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
                        writeInt32(this, value, offset, false, noAssert)
                    };
                    Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
                        writeInt32(this, value, offset, true, noAssert)
                    };

                    function writeFloat(buffer, value, offset, isBigEndian, noAssert) {
                        if (!noAssert) {
                            assert.ok(value !== undefined && value !== null, "missing value");
                            assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                            assert.ok(offset !== undefined && offset !== null, "missing offset");
                            assert.ok(offset + 3 < buffer.length, "Trying to write beyond buffer length");
                            verifIEEE754(value, 3.4028234663852886e38, -3.4028234663852886e38)
                        }
                        require("./buffer_ieee754").writeIEEE754(buffer, value, offset, isBigEndian, 23, 4)
                    }
                    Buffer.prototype.writeFloatLE = function (
                        value, offset, noAssert) {
                        writeFloat(this, value, offset, false, noAssert)
                    };
                    Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
                        writeFloat(this, value, offset, true, noAssert)
                    };

                    function writeDouble(buffer, value, offset, isBigEndian, noAssert) {
                        if (!noAssert) {
                            assert.ok(value !== undefined && value !== null, "missing value");
                            assert.ok(typeof isBigEndian === "boolean", "missing or invalid endian");
                            assert.ok(offset !== undefined && offset !== null, "missing offset");
                            assert.ok(offset + 7 < buffer.length, "Trying to write beyond buffer length");
                            verifIEEE754(value, 1.7976931348623157e308, -1.7976931348623157e308)
                        }
                        require("./buffer_ieee754").writeIEEE754(buffer, value, offset, isBigEndian, 52, 8)
                    }
                    Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
                        writeDouble(this, value, offset, false, noAssert)
                    };
                    Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
                        writeDouble(this, value, offset, true, noAssert)
                    };
                    SlowBuffer.prototype.readUInt8 = Buffer.prototype.readUInt8;
                    SlowBuffer.prototype.readUInt16LE = Buffer.prototype.readUInt16LE;
                    SlowBuffer.
                    prototype.readUInt16BE = Buffer.prototype.readUInt16BE;
                    SlowBuffer.prototype.readUInt32LE = Buffer.prototype.readUInt32LE;
                    SlowBuffer.prototype.readUInt32BE = Buffer.prototype.readUInt32BE;
                    SlowBuffer.prototype.readInt8 = Buffer.prototype.readInt8;
                    SlowBuffer.prototype.readInt16LE = Buffer.prototype.readInt16LE;
                    SlowBuffer.prototype.readInt16BE = Buffer.prototype.readInt16BE;
                    SlowBuffer.prototype.readInt32LE = Buffer.prototype.readInt32LE;
                    SlowBuffer.prototype.readInt32BE = Buffer.prototype.readInt32BE;
                    SlowBuffer.prototype.readFloatLE = Buffer.prototype.readFloatLE;
                    SlowBuffer.prototype.readFloatBE = Buffer.prototype.readFloatBE;
                    SlowBuffer.prototype.readDoubleLE = Buffer.prototype.readDoubleLE;
                    SlowBuffer.prototype.readDoubleBE = Buffer.prototype.readDoubleBE;
                    SlowBuffer.prototype.writeUInt8 = Buffer.prototype.writeUInt8;
                    SlowBuffer.prototype.writeUInt16LE = Buffer.prototype.writeUInt16LE;
                    SlowBuffer.prototype.writeUInt16BE = Buffer.prototype.writeUInt16BE;
                    SlowBuffer.prototype.writeUInt32LE = Buffer.prototype.writeUInt32LE;
                    SlowBuffer.prototype.
                    writeUInt32BE = Buffer.prototype.writeUInt32BE;
                    SlowBuffer.prototype.writeInt8 = Buffer.prototype.writeInt8;
                    SlowBuffer.prototype.writeInt16LE = Buffer.prototype.writeInt16LE;
                    SlowBuffer.prototype.writeInt16BE = Buffer.prototype.writeInt16BE;
                    SlowBuffer.prototype.writeInt32LE = Buffer.prototype.writeInt32LE;
                    SlowBuffer.prototype.writeInt32BE = Buffer.prototype.writeInt32BE;
                    SlowBuffer.prototype.writeFloatLE = Buffer.prototype.writeFloatLE;
                    SlowBuffer.prototype.writeFloatBE = Buffer.prototype.writeFloatBE;
                    SlowBuffer.prototype.writeDoubleLE = Buffer.prototype.writeDoubleLE;
                    SlowBuffer.prototype.writeDoubleBE = Buffer.prototype.writeDoubleBE
                }()
            }, {
                assert: 20,
                "./buffer_ieee754": 22,
                "base64-js": 23
            }
        ],
        23: [
            function (require, module, exports) {
                ! function (exports) {
                    "use strict";
                    var lookup = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

                    function b64ToByteArray(b64) {
                        var i, j, l, tmp, placeHolders, arr;
                        if (b64.length % 4 > 0) {
                            throw "Invalid string. Length must be a multiple of 4"
                        }
                        placeHolders = b64.indexOf("=");
                        placeHolders = placeHolders > 0 ? b64.length -
                            placeHolders : 0;
                        arr = [];
                        l = placeHolders > 0 ? b64.length - 4 : b64.length;
                        for (i = 0, j = 0; i < l; i += 4, j += 3) {
                            tmp = lookup.indexOf(b64[i]) << 18 | lookup.indexOf(b64[i + 1]) << 12 | lookup.indexOf(b64[i + 2]) << 6 | lookup.indexOf(b64[i + 3]);
                            arr.push((tmp & 16711680) >> 16);
                            arr.push((tmp & 65280) >> 8);
                            arr.push(tmp & 255)
                        }
                        if (placeHolders === 2) {
                            tmp = lookup.indexOf(b64[i]) << 2 | lookup.indexOf(b64[i + 1]) >> 4;
                            arr.push(tmp & 255)
                        } else if (placeHolders === 1) {
                            tmp = lookup.indexOf(b64[i]) << 10 | lookup.indexOf(b64[i + 1]) << 4 | lookup.indexOf(b64[i + 2]) >> 2;
                            arr.push(tmp >> 8 & 255);
                            arr.push(tmp & 255)
                        }
                        return arr
                    }

                    function uint8ToBase64(uint8) {
                        var i, extraBytes = uint8.length % 3,
                            output = "",
                            temp, length;

                        function tripletToBase64(num) {
                            return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63]
                        }
                        for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
                            temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
                            output += tripletToBase64(temp)
                        }
                        switch (extraBytes) {
                        case 1:
                            temp = uint8[uint8.length - 1];
                            output += lookup[temp >> 2];
                            output += lookup[temp << 4 & 63];
                            output += "==";
                            break;
                        case 2:
                            temp = (uint8[uint8.length - 2] << 8) + uint8[uint8.length - 1];
                            output += lookup[temp >> 10];
                            output += lookup[temp >> 4 & 63];
                            output += lookup[temp << 2 & 63];
                            output += "=";
                            break
                        }
                        return output
                    }
                    module.exports.toByteArray = b64ToByteArray;
                    module.exports.fromByteArray = uint8ToBase64
                }()
            }, {}
        ]
    }, {}, [1])(1)
});