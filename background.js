"use strict";
(()=>{
    var Re = Object.create;
    var D = Object.defineProperty;
    var Le = Object.getOwnPropertyDescriptor;
    var Me = Object.getOwnPropertyNames;
    var Ie = Object.getPrototypeOf
      , Pe = Object.prototype.hasOwnProperty;
    var Se = (e,t,n)=>t in e ? D(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : e[t] = n;
    var V = (e,t)=>()=>(t || e((t = {
        exports: {}
    }).exports, t),
    t.exports);
    var Ae = (e,t,n,a)=>{
        if (t && typeof t == "object" || typeof t == "function")
            for (let o of Me(t))
                !Pe.call(e, o) && o !== n && D(e, o, {
                    get: ()=>t[o],
                    enumerable: !(a = Le(t, o)) || a.enumerable
                });
        return e
    }
    ;
    var z = (e,t,n)=>(n = e != null ? Re(Ie(e)) : {},
    Ae(t || !e || !e.__esModule ? D(n, "default", {
        value: e,
        enumerable: !0
    }) : n, e));
    var T = (e,t,n)=>(Se(e, typeof t != "symbol" ? t + "" : t, n),
    n);
    var ae = V((ft,B)=>{
        "use strict";
        var k = typeof Reflect == "object" ? Reflect : null, G = k && typeof k.apply == "function" ? k.apply : function(t, n, a) {
            return Function.prototype.apply.call(t, n, a)
        }
        , S;
        k && typeof k.ownKeys == "function" ? S = k.ownKeys : Object.getOwnPropertySymbols ? S = function(t) {
            return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))
        }
        : S = function(t) {
            return Object.getOwnPropertyNames(t)
        }
        ;
        function _e(e) {
            console && console.warn && console.warn(e)
        }
        var $ = Number.isNaN || function(t) {
            return t !== t
        }
        ;
        function c() {
            c.init.call(this)
        }
        B.exports = c;
        B.exports.once = Fe;
        c.EventEmitter = c;
        c.prototype._events = void 0;
        c.prototype._eventsCount = 0;
        c.prototype._maxListeners = void 0;
        var Q = 10;
        function A(e) {
            if (typeof e != "function")
                throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e)
        }
        Object.defineProperty(c, "defaultMaxListeners", {
            enumerable: !0,
            get: function() {
                return Q
            },
            set: function(e) {
                if (typeof e != "number" || e < 0 || $(e))
                    throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
                Q = e
            }
        });
        c.init = function() {
            (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = Object.create(null),
            this._eventsCount = 0),
            this._maxListeners = this._maxListeners || void 0
        }
        ;
        c.prototype.setMaxListeners = function(t) {
            if (typeof t != "number" || t < 0 || $(t))
                throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
            return this._maxListeners = t,
            this
        }
        ;
        function J(e) {
            return e._maxListeners === void 0 ? c.defaultMaxListeners : e._maxListeners
        }
        c.prototype.getMaxListeners = function() {
            return J(this)
        }
        ;
        c.prototype.emit = function(t) {
            for (var n = [], a = 1; a < arguments.length; a++)
                n.push(arguments[a]);
            var o = t === "error"
              , s = this._events;
            if (s !== void 0)
                o = o && s.error === void 0;
            else if (!o)
                return !1;
            if (o) {
                var r;
                if (n.length > 0 && (r = n[0]),
                r instanceof Error)
                    throw r;
                var i = new Error("Unhandled error." + (r ? " (" + r.message + ")" : ""));
                throw i.context = r,
                i
            }
            var u = s[t];
            if (u === void 0)
                return !1;
            if (typeof u == "function")
                G(u, this, n);
            else
                for (var l = u.length, d = te(u, l), a = 0; a < l; ++a)
                    G(d[a], this, n);
            return !0
        }
        ;
        function Z(e, t, n, a) {
            var o, s, r;
            if (A(n),
            s = e._events,
            s === void 0 ? (s = e._events = Object.create(null),
            e._eventsCount = 0) : (s.newListener !== void 0 && (e.emit("newListener", t, n.listener ? n.listener : n),
            s = e._events),
            r = s[t]),
            r === void 0)
                r = s[t] = n,
                ++e._eventsCount;
            else if (typeof r == "function" ? r = s[t] = a ? [n, r] : [r, n] : a ? r.unshift(n) : r.push(n),
            o = J(e),
            o > 0 && r.length > o && !r.warned) {
                r.warned = !0;
                var i = new Error("Possible EventEmitter memory leak detected. " + r.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
                i.name = "MaxListenersExceededWarning",
                i.emitter = e,
                i.type = t,
                i.count = r.length,
                _e(i)
            }
            return e
        }
        c.prototype.addListener = function(t, n) {
            return Z(this, t, n, !1)
        }
        ;
        c.prototype.on = c.prototype.addListener;
        c.prototype.prependListener = function(t, n) {
            return Z(this, t, n, !0)
        }
        ;
        function Ue() {
            if (!this.fired)
                return this.target.removeListener(this.type, this.wrapFn),
                this.fired = !0,
                arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
        }
        function X(e, t, n) {
            var a = {
                fired: !1,
                wrapFn: void 0,
                target: e,
                type: t,
                listener: n
            }
              , o = Ue.bind(a);
            return o.listener = n,
            a.wrapFn = o,
            o
        }
        c.prototype.once = function(t, n) {
            return A(n),
            this.on(t, X(this, t, n)),
            this
        }
        ;
        c.prototype.prependOnceListener = function(t, n) {
            return A(n),
            this.prependListener(t, X(this, t, n)),
            this
        }
        ;
        c.prototype.removeListener = function(t, n) {
            var a, o, s, r, i;
            if (A(n),
            o = this._events,
            o === void 0)
                return this;
            if (a = o[t],
            a === void 0)
                return this;
            if (a === n || a.listener === n)
                --this._eventsCount === 0 ? this._events = Object.create(null) : (delete o[t],
                o.removeListener && this.emit("removeListener", t, a.listener || n));
            else if (typeof a != "function") {
                for (s = -1,
                r = a.length - 1; r >= 0; r--)
                    if (a[r] === n || a[r].listener === n) {
                        i = a[r].listener,
                        s = r;
                        break
                    }
                if (s < 0)
                    return this;
                s === 0 ? a.shift() : Ee(a, s),
                a.length === 1 && (o[t] = a[0]),
                o.removeListener !== void 0 && this.emit("removeListener", t, i || n)
            }
            return this
        }
        ;
        c.prototype.off = c.prototype.removeListener;
        c.prototype.removeAllListeners = function(t) {
            var n, a, o;
            if (a = this._events,
            a === void 0)
                return this;
            if (a.removeListener === void 0)
                return arguments.length === 0 ? (this._events = Object.create(null),
                this._eventsCount = 0) : a[t] !== void 0 && (--this._eventsCount === 0 ? this._events = Object.create(null) : delete a[t]),
                this;
            if (arguments.length === 0) {
                var s = Object.keys(a), r;
                for (o = 0; o < s.length; ++o)
                    r = s[o],
                    r !== "removeListener" && this.removeAllListeners(r);
                return this.removeAllListeners("removeListener"),
                this._events = Object.create(null),
                this._eventsCount = 0,
                this
            }
            if (n = a[t],
            typeof n == "function")
                this.removeListener(t, n);
            else if (n !== void 0)
                for (o = n.length - 1; o >= 0; o--)
                    this.removeListener(t, n[o]);
            return this
        }
        ;
        function Y(e, t, n) {
            var a = e._events;
            if (a === void 0)
                return [];
            var o = a[t];
            return o === void 0 ? [] : typeof o == "function" ? n ? [o.listener || o] : [o] : n ? Oe(o) : te(o, o.length)
        }
        c.prototype.listeners = function(t) {
            return Y(this, t, !0)
        }
        ;
        c.prototype.rawListeners = function(t) {
            return Y(this, t, !1)
        }
        ;
        c.listenerCount = function(e, t) {
            return typeof e.listenerCount == "function" ? e.listenerCount(t) : ee.call(e, t)
        }
        ;
        c.prototype.listenerCount = ee;
        function ee(e) {
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
        c.prototype.eventNames = function() {
            return this._eventsCount > 0 ? S(this._events) : []
        }
        ;
        function te(e, t) {
            for (var n = new Array(t), a = 0; a < t; ++a)
                n[a] = e[a];
            return n
        }
        function Ee(e, t) {
            for (; t + 1 < e.length; t++)
                e[t] = e[t + 1];
            e.pop()
        }
        function Oe(e) {
            for (var t = new Array(e.length), n = 0; n < t.length; ++n)
                t[n] = e[n].listener || e[n];
            return t
        }
        function Fe(e, t) {
            return new Promise(function(n, a) {
                function o(r) {
                    e.removeListener(t, s),
                    a(r)
                }
                function s() {
                    typeof e.removeListener == "function" && e.removeListener("error", o),
                    n([].slice.call(arguments))
                }
                ne(e, t, s, {
                    once: !0
                }),
                t !== "error" && Ke(e, o, {
                    once: !0
                })
            }
            )
        }
        function Ke(e, t, n) {
            typeof e.on == "function" && ne(e, "error", t, n)
        }
        function ne(e, t, n, a) {
            if (typeof e.on == "function")
                a.once ? e.once(t, n) : e.on(t, n);
            else if (typeof e.addEventListener == "function")
                e.addEventListener(t, function o(s) {
                    a.once && e.removeEventListener(t, o),
                    n(s)
                });
            else
                throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e)
        }
    }
    );
    var ie = V((mt,f)=>{
        f.exports.boot = function(e) {
            return e
        }
        ;
        f.exports.ssrMiddleware = function(e) {
            return e
        }
        ;
        f.exports.configure = function(e) {
            return e
        }
        ;
        f.exports.preFetch = function(e) {
            return e
        }
        ;
        f.exports.route = function(e) {
            return e
        }
        ;
        f.exports.store = function(e) {
            return e
        }
        ;
        f.exports.bexBackground = function(e) {
            return e
        }
        ;
        f.exports.bexContent = function(e) {
            return e
        }
        ;
        f.exports.bexDom = function(e) {
            return e
        }
        ;
        f.exports.ssrProductionExport = function(e) {
            return e
        }
        ;
        f.exports.ssrCreate = function(e) {
            return e
        }
        ;
        f.exports.ssrListen = function(e) {
            return e
        }
        ;
        f.exports.ssrClose = function(e) {
            return e
        }
        ;
        f.exports.ssrServeStaticContent = function(e) {
            return e
        }
        ;
        f.exports.ssrRenderPreloadTag = function(e) {
            return e
        }
    }
    );
    var re = z(ae());
    var j, _ = 0, p = new Array(256);
    for (let e = 0; e < 256; e++)
        p[e] = (e + 256).toString(16).substring(1);
    var De = (()=>{
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
            for (let a = t; a > 0; a--)
                n.push(Math.floor(Math.random() * 256));
            return n
        }
    }
    )()
      , oe = 4096;
    function se() {
        (j === void 0 || _ + 16 > oe) && (_ = 0,
        j = De(oe));
        let e = Array.prototype.slice.call(j, _, _ += 16);
        return e[6] = e[6] & 15 | 64,
        e[8] = e[8] & 63 | 128,
        p[e[0]] + p[e[1]] + p[e[2]] + p[e[3]] + "-" + p[e[4]] + p[e[5]] + "-" + p[e[6]] + p[e[7]] + "-" + p[e[8]] + p[e[9]] + "-" + p[e[10]] + p[e[11]] + p[e[12]] + p[e[13]] + p[e[14]] + p[e[15]]
    }
    var Be = {
        undefined: ()=>0,
        boolean: ()=>4,
        number: ()=>8,
        string: e=>2 * e.length,
        object: e=>e ? Object.keys(e).reduce((t,n)=>q(n) + q(e[n]) + t, 0) : 0
    }
      , q = e=>Be[typeof e](e)
      , R = class extends re.EventEmitter {
        constructor(t) {
            super(),
            this.setMaxListeners(1 / 0),
            this.wall = t,
            t.listen(n=>{
                Array.isArray(n) ? n.forEach(a=>this._emit(a)) : this._emit(n)
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
            return super.on(t, a=>{
                n({
                    ...a,
                    respond: o=>this.send(a.eventResponseKey, o)
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
              , a = `${n.event}.${se()}`
              , o = a + ".result";
            return new Promise((s,r)=>{
                let i = []
                  , u = l=>{
                    if (l !== void 0 && l._chunkSplit) {
                        let d = l._chunkSplit;
                        i = [...i, ...l.data],
                        d.lastChunk && (this.off(o, u),
                        s(i))
                    } else
                        this.off(o, u),
                        s(l)
                }
                ;
                this.on(o, u);
                try {
                    let l = t.map(d=>({
                        ...d,
                        payload: {
                            data: d.payload,
                            eventResponseKey: o
                        }
                    }));
                    this.wall.send(l)
                } catch (l) {
                    let d = "Message length exceeded maximum allowed length.";
                    if (l.message === d && Array.isArray(n.payload)) {
                        let x = q(n);
                        if (x > this._maxMessageSize) {
                            let w = Math.ceil(x / this._maxMessageSize)
                              , y = Math.ceil(n.payload.length / w)
                              , F = n.payload;
                            for (let I = 0; I < w; I++) {
                                let K = Math.min(F.length, y);
                                this.wall.send([{
                                    event: n.event,
                                    payload: {
                                        _chunkSplit: {
                                            count: w,
                                            lastChunk: I === w - 1
                                        },
                                        data: F.splice(0, K)
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
    var ke = z(ie());
    var je = chrome.runtime.getURL("assets/config.js"), le, U = (le = globalThis.browser) != null ? le : globalThis.chrome;
    async function qe() {
        let e = await U.storage.local.get("defaultConfig");
        if (e.defaultConfig)
            return e.defaultConfig;
        let t = {}
          , n = ["DelayTime", "RepeatTimes", "port"]
          , a = ["enabledFor", "useCapsolver", "manualSolving", "useProxy"]
          , o = /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm
          , i = (await (await fetch(je)).text()).replace(o, "")
          , u = i.slice(i.indexOf("{") + 1, i.lastIndexOf("}"))
          , l = JSON.stringify(u).replaceAll('\\"', "'").replaceAll("\\n", "").replaceAll('"', "").replaceAll(" ", "")
          , d = l.indexOf("blackUrlList")
          , x = l.slice(d)
          , w = x.indexOf("],")
          , y = x.slice(0, w + 1);
        l.replace(y, "").split(",").forEach(Te=>{
            let[P,W] = Te.split(":");
            if (P && W) {
                let v = W.replaceAll("'", "").replaceAll('"', "");
                for (let b = 0; b < n.length; b++)
                    P.endsWith(n[b]) && (v = Number(v));
                for (let b = 0; b < a.length; b++)
                    P.startsWith(a[b]) && (v = v === "true");
                t[P] = v
            }
        }
        ),
        y = y.replaceAll("'", "").replaceAll('"', "");
        let K = y.indexOf(":[")
          , ve = y.slice(K + 2, y.length - 1);
        return t.blackUrlList = ve.split(","),
        U.storage.local.set({
            defaultConfig: t
        }),
        t
    }
    var L = {
        manualSolving: !1,
        apiKey: "",
        appId: "",
        enabledForImageToText: !0,
        enabledForRecaptchaV3: !0,
        enabledForHCaptcha: !0,
        enabledForGeetestV4: !1,
        recaptchaV3MinScore: .5,
        enabledForRecaptcha: !0,
        enabledForFunCaptcha: !0,
        enabledForDataDome: !1,
        enabledForAwsCaptcha: !0,
        useProxy: !1,
        proxyType: "http",
        hostOrIp: "",
        port: "",
        proxyLogin: "",
        proxyPassword: "",
        enabledForBlacklistControl: !1,
        blackUrlList: [],
        isInBlackList: !1,
        reCaptchaMode: "click",
        reCaptchaDelayTime: 0,
        reCaptchaCollapse: !1,
        reCaptchaRepeatTimes: 10,
        reCaptcha3Mode: "token",
        reCaptcha3DelayTime: 0,
        reCaptcha3Collapse: !1,
        reCaptcha3RepeatTimes: 10,
        reCaptcha3TaskType: "ReCaptchaV3TaskProxyLess",
        hCaptchaMode: "click",
        hCaptchaDelayTime: 0,
        hCaptchaCollapse: !1,
        hCaptchaRepeatTimes: 10,
        funCaptchaMode: "click",
        funCaptchaDelayTime: 0,
        funCaptchaCollapse: !1,
        funCaptchaRepeatTimes: 10,
        geetestMode: "click",
        geetestCollapse: !1,
        geetestDelayTime: 0,
        geetestRepeatTimes: 10,
        textCaptchaMode: "click",
        textCaptchaCollapse: !1,
        textCaptchaDelayTime: 0,
        textCaptchaRepeatTimes: 10,
        enabledForCloudflare: !1,
        cloudflareMode: "click",
        cloudflareCollapse: !1,
        cloudflareDelayTime: 0,
        cloudflareRepeatTimes: 10,
        datadomeMode: "click",
        datadomeCollapse: !1,
        datadomeDelayTime: 0,
        datadomeRepeatTimes: 10,
        awsCaptchaMode: "click",
        awsCollapse: !1,
        awsDelayTime: 0,
        awsRepeatTimes: 10,
        useCapsolver: !0,
        isInit: !1,
        solvedCallback: "captchaSolvedCallback",
        textCaptchaSourceAttribute: "capsolver-image-to-text-source",
        textCaptchaResultAttribute: "capsolver-image-to-text-result"
    }
      , ce = {
        proxyType: ["socks5", "http", "https", "socks4"],
        mode: ["click", "token"]
    };
    async function ue() {
        let e = await qe()
          , t = Object.keys(e);
        for (let n of t)
            if (!(n === "proxyType" && !ce[n].includes(e[n]))) {
                {
                    if (n.endsWith("Mode") && !ce.mode.includes(e[n]))
                        continue;
                    if (n === "port") {
                        if (typeof e.port != "number")
                            continue;
                        L.port = e.port
                    }
                }
                Reflect.has(L, n) && typeof L[n] == typeof e[n] && (L[n] = e[n])
            }
        return L
    }
    var Ne = ue()
      , g = {
        default: Ne,
        async get(e) {
            return (await this.getAll())[e]
        },
        async getAll() {
            let e = await ue()
              , t = await U.storage.local.get("config");
            return g.joinConfig(e, t.config)
        },
        async set(e) {
            let t = await g.getAll()
              , n = g.joinConfig(t, e);
            return U.storage.local.set({
                config: n
            })
        },
        joinConfig(e, t) {
            let n = {};
            if (e)
                for (let a in e)
                    n[a] = e[a];
            if (t)
                for (let a in t)
                    n[a] = t[a];
            return n
        }
    };
    function pe(e) {
        e.on("config", async({respond: t})=>{
            let n = await g.getAll();
            t(n).then()
        }
        )
    }
    function fe(e) {
        e.on("log", ({data: t, respond: n})=>{
            n()
        }
        )
    }
    var E = class {
        constructor(t) {
            T(this, "baseURL");
            this.baseURL = t
        }
        async post(t, n, a) {
            let o = await fetch(this.getURL(t), {
                method: "POST",
                body: JSON.stringify(n),
                headers: {
                    "Content-Type": "application/json"
                },
                ...a
            });
            return {
                status: o.status,
                statusText: o.statusText,
                data: await o.json(),
                headers: o.headers
            }
        }
        getURL(t) {
            return this.baseURL + t
        }
    }
    ;
    var h = class {
        constructor(t) {
            T(this, "options", {
                apiKey: "",
                service: "https://api.capsolver.com",
                defaultTimeout: 120,
                pollingInterval: 5,
                recaptchaTimeout: 600
            });
            T(this, "http");
            for (let n in this.options)
                this.options[n] = t[n] === void 0 ? this.options[n] : t[n];
            this.http = new E(this.options.service)
        }
        static async API(t) {
            let n = await g.getAll();
            if (!(t != null && t.apiKey) && !(n != null && n.apiKey))
                throw new Error("Capsover: No API Kye set up yet!");
            return new h({
                apiKey: n.apiKey,
                ...t
            })
        }
        async getProxyParams(t) {
            let n = await g.getAll();
            return {
                proxyType: n.proxyType,
                proxyAddress: n.hostOrIp,
                proxyPort: n.port,
                proxyLogin: n.proxyLogin,
                proxyPassword: n.proxyPassword,
                type: t.type.replace("ProxyLess", "")
            }
        }
        async getBalance() {
            var n, a, o;
            let t = await this.http.post("/getBalance", {
                clientKey: this.options.apiKey
            });
            if (t.status !== 200 || ((n = t.data) == null ? void 0 : n.errorCode) || ((a = t.data) == null ? void 0 : a.errorId))
                throw new Error(((o = t.data) == null ? void 0 : o.errorDescription) || "createTask fail\uFF01");
            return t.data
        }
        async createTaskResult(t, n) {
            n || (n = {
                timeout: this.options.defaultTimeout,
                pollingInterval: this.options.pollingInterval
            });
            let a = await g.getAll();
            if (a.appId && (t.appId = a.appId),
            a.useProxy) {
                let l = await this.getProxyParams(t.task);
                Object.assign(t.task, l)
            }
            let o = await this.createTask(t)
              , {taskId: s} = o
              , r = this.getTime()
              , i = n.timeout === void 0 ? this.options.defaultTimeout : n.timeout
              , u = n.pollingInterval === void 0 ? this.options.pollingInterval : n.pollingInterval;
            for (; !(this.getTime() - r > i); ) {
                await new Promise(d=>setTimeout(d, u * 1e3));
                let l = await this.getTaskSolution({
                    taskId: s
                });
                if (l.status === "ready")
                    return l
            }
            throw new Error("Timeout " + i + " seconds reached")
        }
        async createTask(t) {
            var r, i, u, l;
            let n = (r = globalThis.browser) != null ? r : globalThis.chrome
              , a = await n.storage.local.get("platform")
              , o = await n.storage.local.get("version")
              , s = await this.http.post("/createTask", {
                clientKey: this.options.apiKey,
                source: a.platform,
                version: o.version,
                ...t
            });
            if (s.status !== 200 || ((i = s.data) == null ? void 0 : i.errorCode) || ((u = s.data) == null ? void 0 : u.errorId))
                throw new Error(((l = s.data) == null ? void 0 : l.errorCode) || "createTask fail\uFF01");
            if (!s.data.taskId)
                throw new Error("taskIs is empty!");
            return s.data
        }
        async getTaskSolution({taskId: t}) {
            var a, o, s;
            let n = await this.http.post("/getTaskResult", {
                clientKey: this.options.apiKey,
                taskId: t
            });
            if (n.status !== 200 || ((a = n.data) == null ? void 0 : a.errorCode) || ((o = n.data) == null ? void 0 : o.errorId))
                throw new Error(((s = n.data) == null ? void 0 : s.errorCode) || "getTaskResult fail\uFF01");
            return n.data
        }
        async createRecognitionTask(t) {
            var i, u, l, d;
            let n = await g.getAll()
              , a = (i = globalThis.browser) != null ? i : globalThis.chrome
              , o = await a.storage.local.get("platform")
              , s = await a.storage.local.get("version");
            n.appId && (t.appId = n.appId);
            let r = await this.http.post("/createTask", {
                clientKey: this.options.apiKey,
                source: o.platform,
                version: s.version,
                ...t
            });
            if (r.status !== 200 || ((u = r.data) == null ? void 0 : u.errorCode) || ((l = r.data) == null ? void 0 : l.errorId) !== 0)
                throw new Error(((d = r.data) == null ? void 0 : d.errorCode) || "createTask fail\uFF01");
            if (!r.data.taskId)
                throw new Error("taskIs is empty!");
            return r.data
        }
        getTime() {
            return parseInt(String(Date.now() / 1e3))
        }
    }
    ;
    function He(e) {
        chrome.contextMenus.update("capsolver-mark-image", {
            enabled: e
        })
    }
    function We(e) {
        chrome.contextMenus.update("capsolver-mark-result", {
            enabled: e
        })
    }
    function O(e, t) {
        var a;
        let n = (a = globalThis.browser) != null ? a : globalThis.chrome;
        return new Promise(o=>{
            n.tabs.query({
                active: !0,
                currentWindow: !0
            }).then(s=>{
                if (globalThis != null && globalThis.browser)
                    browser.tabs.sendMessage(e, {
                        command: t
                    }).then(r=>{
                        o(r)
                    }
                    );
                else {
                    let r = s.find(u=>u.id === e);
                    (r == null ? void 0 : r.url) || o(!1),
                    chrome.tabs.sendMessage(e, {
                        command: t
                    }, u=>{
                        o(u)
                    }
                    )
                }
            }
            )
        }
        )
    }
    async function Ve(e) {
        return await O(e, "image2Text:canMarkImage")
    }
    async function ze(e) {
        return await O(e, "image2Text:canMarkInput")
    }
    async function de(e) {
        O(e, "image2Text:markedImage")
    }
    async function he(e) {
        O(e, "image2Text:markedResult")
    }
    async function M(e) {
        let t = await Ve(e)
          , n = await ze(e);
        He(t),
        We(n)
    }
    var be = ""
      , C = {};
    function Ce(e, t, n) {
        let {action: a} = e;
        return g.getAll().then(o=>{
            switch (a) {
            case "solver":
                o[`${e.captchaType}Mode`] === "click" ? Qe(e).then(s=>{
                    n({
                        response: s
                    })
                }
                ) : Ge(e, o).then(s=>{
                    n({
                        response: s
                    })
                }
                );
                break;
            case "execute":
                me({
                    command: "execute"
                });
                break;
            case "solved":
                me({
                    response: {
                        action: "solved",
                        callback: o.solvedCallback
                    }
                });
                break;
            case "updateMenu":
                M(t.tab.id);
                break;
            case "getWebsiteUrl":
                be = e.websiteUrl;
                break;
            case "setWebsiteMetadata":
                C = e.metadata;
                break
            }
        }
        ),
        a === "solver"
    }
    var ye, ge = (ye = globalThis.browser) != null ? ye : globalThis.chrome;
    async function me(e) {
        let t = await ge.tabs.query({
            currentWindow: !0,
            active: !0
        });
        for (let n of t)
            ge.tabs.sendMessage(n.id, e)
    }
    async function Ge(e, t) {
        let {captchaType: n, widgetId: a, params: o, action: s} = e
          , r = {
            action: s,
            request: {
                captchaType: n,
                widgetId: a
            }
        };
        if (!o)
            return r.error = "params is error!",
            r;
        try {
            r.response = await $e(n, o, t)
        } catch (i) {
            r.error = String(i)
        }
        return r
    }
    async function Qe(e) {
        let {captchaType: t, params: n, action: a} = e
          , o = {
            action: a,
            request: {
                captchaType: t
            }
        };
        if (!n)
            return o.error = "params is error!",
            o;
        n.hasOwnProperty("index") && (o.index = n.index),
        n.hasOwnProperty("id") && (o.id = n.id);
        try {
            o.response = await Je(t, n)
        } catch (s) {
            o.error = String(s)
        }
        return o
    }
    async function $e(e, t, n) {
        let a = {
            code: "",
            status: "processing"
        };
        switch (e) {
        case "hCaptcha":
            {
                let o = await Ze(t);
                a.code = o.solution.gRecaptchaResponse,
                a.status = o.status;
                break
            }
        case "reCaptcha":
            {
                let o = await Xe(t);
                a.code = o.solution.gRecaptchaResponse,
                a.status = o.status;
                break
            }
        case "funCaptcha":
            {
                let o = await et(t);
                a.code = o.solution.token,
                a.status = o.status;
                break
            }
        case "reCaptcha3":
            {
                let o = await Ye(t);
                a.code = o.solution.gRecaptchaResponse,
                a.status = o.status;
                break
            }
        case "cloudflare":
            {
                let o = await tt(t);
                a.code = o.solution.token,
                a.status = o.status;
                break
            }
        default:
            throw new Error("do not support captchaType: " + e)
        }
        return a
    }
    async function Je(e, t) {
        t.url = be;
        let n = {
            status: "processing"
        };
        switch (e) {
        case "funCaptcha":
            {
                let a = await nt(t);
                n.status = a.status,
                n.solution = a.solution;
                break
            }
        case "hCaptcha":
            {
                let a = await at(t);
                n.status = a.status,
                n.solution = a.solution;
                break
            }
        case "reCaptcha":
            {
                let a = await ot(t);
                n.status = a.status,
                n.solution = a.solution;
                break
            }
        case "textCaptcha":
            {
                let a = await st(t);
                n.status = a.status,
                n.solution = a.solution;
                break
            }
        case "awsCaptcha":
            {
                let a = await rt(t);
                n.status = a.status,
                n.solution = a.solution;
                break
            }
        default:
            throw new Error("do not support captchaType: " + e)
        }
        return n
    }
    async function Ze(e) {
        return await (await h.API()).createTaskResult({
            task: {
                type: "HCaptchaTaskProxyLess",
                websiteURL: e.websiteURL,
                websiteKey: e.sitekey
            }
        })
    }
    async function Xe(e) {
        var n;
        let t = await h.API();
        return ((n = e.websiteURL) == null ? void 0 : n.indexOf("tbi.com.iq")) !== -1 && (e.websiteURL = "https://apps.tbi.com.iq/dollar/register.aspx"),
        await t.createTaskResult({
            task: {
                type: "ReCaptchaV2TaskProxyLess",
                websiteURL: e.websiteURL,
                websiteKey: e.sitekey,
                invisible: e.invisible,
                enterprisePayload: {
                    s: e.s
                },
                metadata: {
                    pageURL: C.pageURL,
                    title: C.title
                }
            }
        })
    }
    async function Ye(e) {
        var a;
        let t = await h.API()
          , n = await g.getAll();
        return ((a = e.websiteURL) == null ? void 0 : a.indexOf("tbi.com.iq")) !== -1 && (e.websiteURL = "https://apps.tbi.com.iq/dollar/register.aspx"),
        await t.createTaskResult({
            task: {
                type: n.reCaptcha3TaskType,
                websiteURL: e.websiteURL,
                websiteKey: e.sitekey,
                pageAction: e.action,
                enterprisePayload: {
                    s: e.s
                },
                metadata: {
                    pageURL: C.pageURL,
                    title: C.title
                }
            }
        })
    }
    async function et(e) {
        return await (await h.API()).createTaskResult({
            task: {
                type: "FunCaptchaTaskProxyLess",
                websiteURL: e.websiteURL,
                websitePublicKey: e.websitePublicKey
            }
        })
    }
    async function tt(e) {
        return await (await h.API()).createTaskResult({
            task: {
                type: "",
                websiteURL: e.websiteURL,
                websitePublicKey: e.websiteKey,
                metaData: {
                    type: e.type
                }
            }
        })
    }
    async function nt(e) {
        return await (await h.API()).createRecognitionTask({
            task: {
                type: "FunCaptchaClassification",
                images: [e.image],
                question: e.question,
                websiteURL: e.url
            }
        })
    }
    async function at(e) {
        return await (await h.API()).createRecognitionTask({
            task: {
                type: "HCaptchaClassification",
                queries: e.queries,
                question: e.question,
                websiteURL: e.url
            }
        })
    }
    async function ot(e) {
        var a;
        let t = await h.API();
        ((a = e.url) == null ? void 0 : a.indexOf("tbi.com.iq")) !== -1 && (e.url = "https://apps.tbi.com.iq/dollar/register.aspx");
        let n = {
            type: "ReCaptchaV2Classification",
            image: e.image,
            question: e.question,
            websiteURL: e.url,
            metadata: {
                pageURL: C.pageURL,
                title: C.title
            }
        };
        return await t.createRecognitionTask({
            task: n
        })
    }
    async function st(e) {
        return await (await h.API()).createRecognitionTask({
            task: {
                type: "ImageToTextTask",
                body: e.body,
                websiteURL: e.url
            }
        })
    }
    async function rt(e) {
        return await (await h.API()).createRecognitionTask({
            task: {
                type: "AwsWafClassification",
                images: e.question === "aws:toycarcity:carcity" ? [e.image] : e.image,
                question: e.question,
                websiteURL: e.url
            }
        })
    }
    var we, H = (we = globalThis.browser) != null ? we : globalThis.chrome, N = "";
    async function it() {
        let e = chrome.runtime.getURL("manifest.json");
        return (await (await fetch(e)).json()).version
    }
    chrome.runtime.onConnect.addListener(async()=>{
        N || (N = await it()),
        H.storage.local.set({
            version: N
        })
    }
    );
    chrome.runtime.onMessage.addListener(Ce);
    function ct() {
        chrome.contextMenus.removeAll(()=>{
            chrome.contextMenus.create({
                title: "capsolver mark image as captcha",
                contexts: ["all"],
                id: "capsolver-mark-image",
                enabled: !0
            }),
            chrome.contextMenus.create({
                title: "select an input for the captcha result",
                contexts: ["editable"],
                id: "capsolver-mark-result",
                enabled: !1
            })
        }
        )
    }
    H.tabs.onActivated.addListener(({tabId: e})=>{
        M(e)
    }
    );
    H.tabs.onUpdated.addListener((e,t)=>{
        t.status === "complete" && M(e)
    }
    );
    chrome.contextMenus.onClicked.addListener((e,t)=>{
        switch (e.menuItemId) {
        case "capsolver-mark-image":
            de(t.id);
            break;
        case "capsolver-mark-result":
            he(t.id);
            break
        }
    }
    );
    ct();
    var xe = (0,
    ke.bexBackground)(e=>{
        fe(e),
        pe(e)
    }
    );
    var m = {}
      , lt = e=>{
        let t = e.sender.tab, n;
        if (e.name.indexOf(":") > -1) {
            let o = e.name.split(":");
            n = o[1],
            e.name = o[0]
        }
        t !== void 0 && (n = t.id);
        let a = m[n];
        return a || (a = m[n] = {}),
        a[e.name] = {
            port: e,
            connected: !0,
            listening: !1
        },
        a[e.name]
    }
    ;
    chrome.runtime.onConnect.addListener(e=>{
        let t = lt(e);
        t.port.onDisconnect.addListener(()=>{
            t.connected = !1
        }
        );
        let n = new R({
            listen(a) {
                for (let o in m) {
                    let s = m[o];
                    s.app && !s.app.listening && (s.app.listening = !0,
                    s.app.port.onMessage.addListener(a)),
                    s.contentScript && !s.contentScript.listening && (s.contentScript.port.onMessage.addListener(a),
                    s.contentScript.listening = !0)
                }
            },
            send(a) {
                for (let o in m) {
                    let s = m[o];
                    s.app && s.app.connected && s.app.port.postMessage(a),
                    s.contentScript && s.contentScript.connected && s.contentScript.port.postMessage(a)
                }
            }
        });
        xe(n, m);
        for (let a in m) {
            let o = m[a];
            o.app && o.contentScript && ut(o.app, o.contentScript)
        }
    }
    );
    function ut(e, t) {
        e.port.onMessage.addListener(n=>{
            t.connected && t.port.postMessage(n)
        }
        ),
        t.port.onMessage.addListener(n=>{
            e.connected && e.port.postMessage(n)
        }
        )
    }
}
)();
