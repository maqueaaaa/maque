"use strict";
(()=>{
    var G = Object.create;
    var O = Object.defineProperty;
    var J = Object.getOwnPropertyDescriptor;
    var X = Object.getOwnPropertyNames;
    var Y = Object.getPrototypeOf
      , ee = Object.prototype.hasOwnProperty;
    var C = (e,t)=>()=>(t || e((t = {
        exports: {}
    }).exports, t),
    t.exports);
    var te = (e,t,n,r)=>{
        if (t && typeof t == "object" || typeof t == "function")
            for (let i of X(t))
                !ee.call(e, i) && i !== n && O(e, i, {
                    get: ()=>t[i],
                    enumerable: !(r = J(t, i)) || r.enumerable
                });
        return e
    }
    ;
    var R = (e,t,n)=>(n = e != null ? G(Y(e)) : {},
    te(t || !e || !e.__esModule ? O(n, "default", {
        value: e,
        enumerable: !0
    }) : n, e));
    var z = C((le,_)=>{
        "use strict";
        var h = typeof Reflect == "object" ? Reflect : null, j = h && typeof h.apply == "function" ? h.apply : function(t, n, r) {
            return Function.prototype.apply.call(t, n, r)
        }
        , m;
        h && typeof h.ownKeys == "function" ? m = h.ownKeys : Object.getOwnPropertySymbols ? m = function(t) {
            return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))
        }
        : m = function(t) {
            return Object.getOwnPropertyNames(t)
        }
        ;
        function ne(e) {
            console && console.warn && console.warn(e)
        }
        var A = Number.isNaN || function(t) {
            return t !== t
        }
        ;
        function u() {
            u.init.call(this)
        }
        _.exports = u;
        _.exports.once = oe;
        u.EventEmitter = u;
        u.prototype._events = void 0;
        u.prototype._eventsCount = 0;
        u.prototype._maxListeners = void 0;
        var S = 10;
        function y(e) {
            if (typeof e != "function")
                throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e)
        }
        Object.defineProperty(u, "defaultMaxListeners", {
            enumerable: !0,
            get: function() {
                return S
            },
            set: function(e) {
                if (typeof e != "number" || e < 0 || A(e))
                    throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
                S = e
            }
        });
        u.init = function() {
            (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = Object.create(null),
            this._eventsCount = 0),
            this._maxListeners = this._maxListeners || void 0
        }
        ;
        u.prototype.setMaxListeners = function(t) {
            if (typeof t != "number" || t < 0 || A(t))
                throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
            return this._maxListeners = t,
            this
        }
        ;
        function N(e) {
            return e._maxListeners === void 0 ? u.defaultMaxListeners : e._maxListeners
        }
        u.prototype.getMaxListeners = function() {
            return N(this)
        }
        ;
        u.prototype.emit = function(t) {
            for (var n = [], r = 1; r < arguments.length; r++)
                n.push(arguments[r]);
            var i = t === "error"
              , o = this._events;
            if (o !== void 0)
                i = i && o.error === void 0;
            else if (!i)
                return !1;
            if (i) {
                var s;
                if (n.length > 0 && (s = n[0]),
                s instanceof Error)
                    throw s;
                var a = new Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
                throw a.context = s,
                a
            }
            var d = o[t];
            if (d === void 0)
                return !1;
            if (typeof d == "function")
                j(d, this, n);
            else
                for (var c = d.length, l = I(d, c), r = 0; r < c; ++r)
                    j(l[r], this, n);
            return !0
        }
        ;
        function T(e, t, n, r) {
            var i, o, s;
            if (y(n),
            o = e._events,
            o === void 0 ? (o = e._events = Object.create(null),
            e._eventsCount = 0) : (o.newListener !== void 0 && (e.emit("newListener", t, n.listener ? n.listener : n),
            o = e._events),
            s = o[t]),
            s === void 0)
                s = o[t] = n,
                ++e._eventsCount;
            else if (typeof s == "function" ? s = o[t] = r ? [n, s] : [s, n] : r ? s.unshift(n) : s.push(n),
            i = N(e),
            i > 0 && s.length > i && !s.warned) {
                s.warned = !0;
                var a = new Error("Possible EventEmitter memory leak detected. " + s.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
                a.name = "MaxListenersExceededWarning",
                a.emitter = e,
                a.type = t,
                a.count = s.length,
                ne(a)
            }
            return e
        }
        u.prototype.addListener = function(t, n) {
            return T(this, t, n, !1)
        }
        ;
        u.prototype.on = u.prototype.addListener;
        u.prototype.prependListener = function(t, n) {
            return T(this, t, n, !0)
        }
        ;
        function re() {
            if (!this.fired)
                return this.target.removeListener(this.type, this.wrapFn),
                this.fired = !0,
                arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
        }
        function k(e, t, n) {
            var r = {
                fired: !1,
                wrapFn: void 0,
                target: e,
                type: t,
                listener: n
            }
              , i = re.bind(r);
            return i.listener = n,
            r.wrapFn = i,
            i
        }
        u.prototype.once = function(t, n) {
            return y(n),
            this.on(t, k(this, t, n)),
            this
        }
        ;
        u.prototype.prependOnceListener = function(t, n) {
            return y(n),
            this.prependListener(t, k(this, t, n)),
            this
        }
        ;
        u.prototype.removeListener = function(t, n) {
            var r, i, o, s, a;
            if (y(n),
            i = this._events,
            i === void 0)
                return this;
            if (r = i[t],
            r === void 0)
                return this;
            if (r === n || r.listener === n)
                --this._eventsCount === 0 ? this._events = Object.create(null) : (delete i[t],
                i.removeListener && this.emit("removeListener", t, r.listener || n));
            else if (typeof r != "function") {
                for (o = -1,
                s = r.length - 1; s >= 0; s--)
                    if (r[s] === n || r[s].listener === n) {
                        a = r[s].listener,
                        o = s;
                        break
                    }
                if (o < 0)
                    return this;
                o === 0 ? r.shift() : ie(r, o),
                r.length === 1 && (i[t] = r[0]),
                i.removeListener !== void 0 && this.emit("removeListener", t, a || n)
            }
            return this
        }
        ;
        u.prototype.off = u.prototype.removeListener;
        u.prototype.removeAllListeners = function(t) {
            var n, r, i;
            if (r = this._events,
            r === void 0)
                return this;
            if (r.removeListener === void 0)
                return arguments.length === 0 ? (this._events = Object.create(null),
                this._eventsCount = 0) : r[t] !== void 0 && (--this._eventsCount === 0 ? this._events = Object.create(null) : delete r[t]),
                this;
            if (arguments.length === 0) {
                var o = Object.keys(r), s;
                for (i = 0; i < o.length; ++i)
                    s = o[i],
                    s !== "removeListener" && this.removeAllListeners(s);
                return this.removeAllListeners("removeListener"),
                this._events = Object.create(null),
                this._eventsCount = 0,
                this
            }
            if (n = r[t],
            typeof n == "function")
                this.removeListener(t, n);
            else if (n !== void 0)
                for (i = n.length - 1; i >= 0; i--)
                    this.removeListener(t, n[i]);
            return this
        }
        ;
        function P(e, t, n) {
            var r = e._events;
            if (r === void 0)
                return [];
            var i = r[t];
            return i === void 0 ? [] : typeof i == "function" ? n ? [i.listener || i] : [i] : n ? se(i) : I(i, i.length)
        }
        u.prototype.listeners = function(t) {
            return P(this, t, !0)
        }
        ;
        u.prototype.rawListeners = function(t) {
            return P(this, t, !1)
        }
        ;
        u.listenerCount = function(e, t) {
            return typeof e.listenerCount == "function" ? e.listenerCount(t) : F.call(e, t)
        }
        ;
        u.prototype.listenerCount = F;
        function F(e) {
            var t = this._events;
            if (t !== void 0) {
                var n = t[e];
                if (typeof n == "function")
                    return 1;
                if (n !== void 0)
                    return n.length
            }
            return 0
        }
        u.prototype.eventNames = function() {
            return this._eventsCount > 0 ? m(this._events) : []
        }
        ;
        function I(e, t) {
            for (var n = new Array(t), r = 0; r < t; ++r)
                n[r] = e[r];
            return n
        }
        function ie(e, t) {
            for (; t + 1 < e.length; t++)
                e[t] = e[t + 1];
            e.pop()
        }
        function se(e) {
            for (var t = new Array(e.length), n = 0; n < t.length; ++n)
                t[n] = e[n].listener || e[n];
            return t
        }
        function oe(e, t) {
            return new Promise(function(n, r) {
                function i(s) {
                    e.removeListener(t, o),
                    r(s)
                }
                function o() {
                    typeof e.removeListener == "function" && e.removeListener("error", i),
                    n([].slice.call(arguments))
                }
                K(e, t, o, {
                    once: !0
                }),
                t !== "error" && ue(e, i, {
                    once: !0
                })
            }
            )
        }
        function ue(e, t, n) {
            typeof e.on == "function" && K(e, "error", t, n)
        }
        function K(e, t, n, r) {
            if (typeof e.on == "function")
                r.once ? e.once(t, n) : e.on(t, n);
            else if (typeof e.addEventListener == "function")
                e.addEventListener(t, function i(o) {
                    r.once && e.removeEventListener(t, i),
                    n(o)
                });
            else
                throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e)
        }
    }
    );
    var Q = C(()=>{
        "use strict"
    }
    );
    var B = R(z());
    var w, g = 0, f = new Array(256);
    for (let e = 0; e < 256; e++)
        f[e] = (e + 256).toString(16).substring(1);
    var fe = (()=>{
        let e = typeof crypto != "undefined" ? crypto : typeof window != "undefined" ? window.crypto || window.msCrypto : void 0;
        if (e !== void 0) {
            if (e.randomBytes !== void 0)
                return e.randomBytes;
            if (e.getRandomValues !== void 0)
                return t=>{
                    let n = new Uint8Array(t);
                    return e.getRandomValues(n),
                    n
                }
        }
        return t=>{
            let n = [];
            for (let r = t; r > 0; r--)
                n.push(Math.floor(Math.random() * 256));
            return n
        }
    }
    )()
      , D = 4096;
    function W() {
        (w === void 0 || g + 16 > D) && (g = 0,
        w = fe(D));
        let e = Array.prototype.slice.call(w, g, g += 16);
        return e[6] = e[6] & 15 | 64,
        e[8] = e[8] & 63 | 128,
        f[e[0]] + f[e[1]] + f[e[2]] + f[e[3]] + "-" + f[e[4]] + f[e[5]] + "-" + f[e[6]] + f[e[7]] + "-" + f[e[8]] + f[e[9]] + "-" + f[e[10]] + f[e[11]] + f[e[12]] + f[e[13]] + f[e[14]] + f[e[15]]
    }
    var ae = {
        undefined: ()=>0,
        boolean: ()=>4,
        number: ()=>8,
        string: e=>2 * e.length,
        object: e=>e ? Object.keys(e).reduce((t,n)=>b(n) + b(e[n]) + t, 0) : 0
    }
      , b = e=>ae[typeof e](e)
      , p = class extends B.EventEmitter {
        constructor(t) {
            super(),
            this.setMaxListeners(1 / 0),
            this.wall = t,
            t.listen(n=>{
                Array.isArray(n) ? n.forEach(r=>this._emit(r)) : this._emit(n)
            }
            ),
            this._sendingQueue = [],
            this._sending = !1,
            this._maxMessageSize = 32 * 1024 * 1024
        }
        send(t, n) {
            return this._send([{
                event: t,
                payload: n
            }])
        }
        getEvents() {
            return this._events
        }
        on(t, n) {
            return super.on(t, r=>{
                n({
                    ...r,
                    respond: i=>this.send(r.eventResponseKey, i)
                })
            }
            )
        }
        _emit(t) {
            typeof t == "string" ? this.emit(t) : this.emit(t.event, t.payload)
        }
        _send(t) {
            return this._sendingQueue.push(t),
            this._nextSend()
        }
        _nextSend() {
            if (!this._sendingQueue.length || this._sending)
                return Promise.resolve();
            this._sending = !0;
            let t = this._sendingQueue.shift()
              , n = t[0]
              , r = `${n.event}.${W()}`
              , i = r + ".result";
            return new Promise((o,s)=>{
                let a = []
                  , d = c=>{
                    if (c !== void 0 && c._chunkSplit) {
                        let l = c._chunkSplit;
                        a = [...a, ...c.data],
                        l.lastChunk && (this.off(i, d),
                        o(a))
                    } else
                        this.off(i, d),
                        o(c)
                }
                ;
                this.on(i, d);
                try {
                    let c = t.map(l=>({
                        ...l,
                        payload: {
                            data: l.payload,
                            eventResponseKey: i
                        }
                    }));
                    this.wall.send(c)
                } catch (c) {
                    let l = "Message length exceeded maximum allowed length.";
                    if (c.message === l && Array.isArray(n.payload)) {
                        let E = b(n);
                        if (E > this._maxMessageSize) {
                            let v = Math.ceil(E / this._maxMessageSize)
                              , q = Math.ceil(n.payload.length / v)
                              , M = n.payload;
                            for (let L = 0; L < v; L++) {
                                let Z = Math.min(M.length, q);
                                this.wall.send([{
                                    event: n.event,
                                    payload: {
                                        _chunkSplit: {
                                            count: v,
                                            lastChunk: L === v - 1
                                        },
                                        data: M.splice(0, Z)
                                    }
                                }])
                            }
                        }
                    }
                }
                this._sending = !1,
                setTimeout(()=>this._nextSend(), 16)
            }
            )
        }
    }
    ;
    var U = (e,t)=>{
        window.addEventListener("message", n=>{
            if (n.source === window && n.data.from !== void 0 && n.data.from === t) {
                let r = n.data[0]
                  , i = e.getEvents();
                for (let o in i)
                    o === r.event && i[o](r.payload)
            }
        }
        , !1)
    }
    ;
    var V = R(Q())
      , x = chrome.runtime.connect({
        name: "contentScript"
    })
      , H = !1;
    x.onDisconnect.addListener(()=>{
        H = !0
    }
    );
    var $ = new p({
        listen(e) {
            x.onMessage.addListener(e)
        },
        send(e) {
            H || (x.postMessage(e),
            window.postMessage({
                ...e,
                from: "bex-content-script"
            }, "*"))
        }
    });
    function ce(e) {
        let t = document.createElement("script");
        t.src = e,
        t.onload = function() {
            this.remove()
        }
        ,
        (document.head || document.documentElement).appendChild(t)
    }
    document instanceof HTMLDocument && ce(chrome.runtime.getURL("dom.js"));
    U($, "bex-dom");
    (0,
    V.default)($);
}
)();
