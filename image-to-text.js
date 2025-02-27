"use strict";
(()=>{
    var Pe = Object.create;
    var X = Object.defineProperty;
    var je = Object.getOwnPropertyDescriptor;
    var Be = Object.getOwnPropertyNames;
    var We = Object.getPrototypeOf
      , Ke = Object.prototype.hasOwnProperty;
    var Y = (e,t)=>()=>(t || e((t = {
        exports: {}
    }).exports, t),
    t.exports);
    var Ve = (e,t,n,r)=>{
        if (t && typeof t == "object" || typeof t == "function")
            for (let o of Be(t))
                !Ke.call(e, o) && o !== n && X(e, o, {
                    get: ()=>t[o],
                    enumerable: !(r = je(t, o)) || r.enumerable
                });
        return e
    }
    ;
    var Z = (e,t,n)=>(n = e != null ? Pe(We(e)) : {},
    Ve(t || !e || !e.__esModule ? X(n, "default", {
        value: e,
        enumerable: !0
    }) : n, e));
    var ue = Y((Et,B)=>{
        "use strict";
        var v = typeof Reflect == "object" ? Reflect : null, ee = v && typeof v.apply == "function" ? v.apply : function(t, n, r) {
            return Function.prototype.apply.call(t, n, r)
        }
        , S;
        v && typeof v.ownKeys == "function" ? S = v.ownKeys : Object.getOwnPropertySymbols ? S = function(t) {
            return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))
        }
        : S = function(t) {
            return Object.getOwnPropertyNames(t)
        }
        ;
        function qe(e) {
            console && console.warn && console.warn(e)
        }
        var ne = Number.isNaN || function(t) {
            return t !== t
        }
        ;
        function i() {
            i.init.call(this)
        }
        B.exports = i;
        B.exports.once = Qe;
        i.EventEmitter = i;
        i.prototype._events = void 0;
        i.prototype._eventsCount = 0;
        i.prototype._maxListeners = void 0;
        var te = 10;
        function _(e) {
            if (typeof e != "function")
                throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e)
        }
        Object.defineProperty(i, "defaultMaxListeners", {
            enumerable: !0,
            get: function() {
                return te
            },
            set: function(e) {
                if (typeof e != "number" || e < 0 || ne(e))
                    throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
                te = e
            }
        });
        i.init = function() {
            (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = Object.create(null),
            this._eventsCount = 0),
            this._maxListeners = this._maxListeners || void 0
        }
        ;
        i.prototype.setMaxListeners = function(t) {
            if (typeof t != "number" || t < 0 || ne(t))
                throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
            return this._maxListeners = t,
            this
        }
        ;
        function re(e) {
            return e._maxListeners === void 0 ? i.defaultMaxListeners : e._maxListeners
        }
        i.prototype.getMaxListeners = function() {
            return re(this)
        }
        ;
        i.prototype.emit = function(t) {
            for (var n = [], r = 1; r < arguments.length; r++)
                n.push(arguments[r]);
            var o = t === "error"
              , a = this._events;
            if (a !== void 0)
                o = o && a.error === void 0;
            else if (!o)
                return !1;
            if (o) {
                var s;
                if (n.length > 0 && (s = n[0]),
                s instanceof Error)
                    throw s;
                var c = new Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
                throw c.context = s,
                c
            }
            var p = a[t];
            if (p === void 0)
                return !1;
            if (typeof p == "function")
                ee(p, this, n);
            else
                for (var u = p.length, d = ce(p, u), r = 0; r < u; ++r)
                    ee(d[r], this, n);
            return !0
        }
        ;
        function oe(e, t, n, r) {
            var o, a, s;
            if (_(n),
            a = e._events,
            a === void 0 ? (a = e._events = Object.create(null),
            e._eventsCount = 0) : (a.newListener !== void 0 && (e.emit("newListener", t, n.listener ? n.listener : n),
            a = e._events),
            s = a[t]),
            s === void 0)
                s = a[t] = n,
                ++e._eventsCount;
            else if (typeof s == "function" ? s = a[t] = r ? [n, s] : [s, n] : r ? s.unshift(n) : s.push(n),
            o = re(e),
            o > 0 && s.length > o && !s.warned) {
                s.warned = !0;
                var c = new Error("Possible EventEmitter memory leak detected. " + s.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
                c.name = "MaxListenersExceededWarning",
                c.emitter = e,
                c.type = t,
                c.count = s.length,
                qe(c)
            }
            return e
        }
        i.prototype.addListener = function(t, n) {
            return oe(this, t, n, !1)
        }
        ;
        i.prototype.on = i.prototype.addListener;
        i.prototype.prependListener = function(t, n) {
            return oe(this, t, n, !0)
        }
        ;
        function Ge() {
            if (!this.fired)
                return this.target.removeListener(this.type, this.wrapFn),
                this.fired = !0,
                arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
        }
        function ae(e, t, n) {
            var r = {
                fired: !1,
                wrapFn: void 0,
                target: e,
                type: t,
                listener: n
            }
              , o = Ge.bind(r);
            return o.listener = n,
            r.wrapFn = o,
            o
        }
        i.prototype.once = function(t, n) {
            return _(n),
            this.on(t, ae(this, t, n)),
            this
        }
        ;
        i.prototype.prependOnceListener = function(t, n) {
            return _(n),
            this.prependListener(t, ae(this, t, n)),
            this
        }
        ;
        i.prototype.removeListener = function(t, n) {
            var r, o, a, s, c;
            if (_(n),
            o = this._events,
            o === void 0)
                return this;
            if (r = o[t],
            r === void 0)
                return this;
            if (r === n || r.listener === n)
                --this._eventsCount === 0 ? this._events = Object.create(null) : (delete o[t],
                o.removeListener && this.emit("removeListener", t, r.listener || n));
            else if (typeof r != "function") {
                for (a = -1,
                s = r.length - 1; s >= 0; s--)
                    if (r[s] === n || r[s].listener === n) {
                        c = r[s].listener,
                        a = s;
                        break
                    }
                if (a < 0)
                    return this;
                a === 0 ? r.shift() : $e(r, a),
                r.length === 1 && (o[t] = r[0]),
                o.removeListener !== void 0 && this.emit("removeListener", t, c || n)
            }
            return this
        }
        ;
        i.prototype.off = i.prototype.removeListener;
        i.prototype.removeAllListeners = function(t) {
            var n, r, o;
            if (r = this._events,
            r === void 0)
                return this;
            if (r.removeListener === void 0)
                return arguments.length === 0 ? (this._events = Object.create(null),
                this._eventsCount = 0) : r[t] !== void 0 && (--this._eventsCount === 0 ? this._events = Object.create(null) : delete r[t]),
                this;
            if (arguments.length === 0) {
                var a = Object.keys(r), s;
                for (o = 0; o < a.length; ++o)
                    s = a[o],
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
                for (o = n.length - 1; o >= 0; o--)
                    this.removeListener(t, n[o]);
            return this
        }
        ;
        function se(e, t, n) {
            var r = e._events;
            if (r === void 0)
                return [];
            var o = r[t];
            return o === void 0 ? [] : typeof o == "function" ? n ? [o.listener || o] : [o] : n ? ze(o) : ce(o, o.length)
        }
        i.prototype.listeners = function(t) {
            return se(this, t, !0)
        }
        ;
        i.prototype.rawListeners = function(t) {
            return se(this, t, !1)
        }
        ;
        i.listenerCount = function(e, t) {
            return typeof e.listenerCount == "function" ? e.listenerCount(t) : ie.call(e, t)
        }
        ;
        i.prototype.listenerCount = ie;
        function ie(e) {
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
        i.prototype.eventNames = function() {
            return this._eventsCount > 0 ? S(this._events) : []
        }
        ;
        function ce(e, t) {
            for (var n = new Array(t), r = 0; r < t; ++r)
                n[r] = e[r];
            return n
        }
        function $e(e, t) {
            for (; t + 1 < e.length; t++)
                e[t] = e[t + 1];
            e.pop()
        }
        function ze(e) {
            for (var t = new Array(e.length), n = 0; n < t.length; ++n)
                t[n] = e[n].listener || e[n];
            return t
        }
        function Qe(e, t) {
            return new Promise(function(n, r) {
                function o(s) {
                    e.removeListener(t, a),
                    r(s)
                }
                function a() {
                    typeof e.removeListener == "function" && e.removeListener("error", o),
                    n([].slice.call(arguments))
                }
                le(e, t, a, {
                    once: !0
                }),
                t !== "error" && Je(e, o, {
                    once: !0
                })
            }
            )
        }
        function Je(e, t, n) {
            typeof e.on == "function" && le(e, "error", t, n)
        }
        function le(e, t, n, r) {
            if (typeof e.on == "function")
                r.once ? e.once(t, n) : e.on(t, n);
            else if (typeof e.addEventListener == "function")
                e.addEventListener(t, function o(a) {
                    r.once && e.removeEventListener(t, o),
                    n(a)
                });
            else
                throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e)
        }
    }
    );
    var he = Y((At,f)=>{
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
    var de = Z(ue());
    var W, A = 0, l = new Array(256);
    for (let e = 0; e < 256; e++)
        l[e] = (e + 256).toString(16).substring(1);
    var Xe = (()=>{
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
      , fe = 4096;
    function pe() {
        (W === void 0 || A + 16 > fe) && (A = 0,
        W = Xe(fe));
        let e = Array.prototype.slice.call(W, A, A += 16);
        return e[6] = e[6] & 15 | 64,
        e[8] = e[8] & 63 | 128,
        l[e[0]] + l[e[1]] + l[e[2]] + l[e[3]] + "-" + l[e[4]] + l[e[5]] + "-" + l[e[6]] + l[e[7]] + "-" + l[e[8]] + l[e[9]] + "-" + l[e[10]] + l[e[11]] + l[e[12]] + l[e[13]] + l[e[14]] + l[e[15]]
    }
    var Ye = {
        undefined: ()=>0,
        boolean: ()=>4,
        number: ()=>8,
        string: e=>2 * e.length,
        object: e=>e ? Object.keys(e).reduce((t,n)=>K(n) + K(e[n]) + t, 0) : 0
    }
      , K = e=>Ye[typeof e](e)
      , w = class extends de.EventEmitter {
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
                    respond: o=>this.send(r.eventResponseKey, o)
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
              , r = `${n.event}.${pe()}`
              , o = r + ".result";
            return new Promise((a,s)=>{
                let c = []
                  , p = u=>{
                    if (u !== void 0 && u._chunkSplit) {
                        let d = u._chunkSplit;
                        c = [...c, ...u.data],
                        d.lastChunk && (this.off(o, p),
                        a(c))
                    } else
                        this.off(o, p),
                        a(u)
                }
                ;
                this.on(o, p);
                try {
                    let u = t.map(d=>({
                        ...d,
                        payload: {
                            data: d.payload,
                            eventResponseKey: o
                        }
                    }));
                    this.wall.send(u)
                } catch (u) {
                    let d = "Message length exceeded maximum allowed length.";
                    if (u.message === d && Array.isArray(n.payload)) {
                        let x = K(n);
                        if (x > this._maxMessageSize) {
                            let C = Math.ceil(x / this._maxMessageSize)
                              , m = Math.ceil(n.payload.length / C)
                              , P = n.payload;
                            for (let I = 0; I < C; I++) {
                                let j = Math.min(P.length, m);
                                this.wall.send([{
                                    event: n.event,
                                    payload: {
                                        _chunkSplit: {
                                            count: C,
                                            lastChunk: I === C - 1
                                        },
                                        data: P.splice(0, j)
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
    var me = (e,t)=>{
        window.addEventListener("message", n=>{
            if (n.source === window && n.data.from !== void 0 && n.data.from === t) {
                let r = n.data[0]
                  , o = e.getEvents();
                for (let a in o)
                    a === r.event && o[a](r.payload)
            }
        }
        , !1)
    }
    ;
    var Oe = Z(he());
    var Ze = chrome.runtime.getURL("assets/config.js"), be, O = (be = globalThis.browser) != null ? be : globalThis.chrome;
    async function et() {
        let e = await O.storage.local.get("defaultConfig");
        if (e.defaultConfig)
            return e.defaultConfig;
        let t = {}
          , n = ["DelayTime", "RepeatTimes", "port"]
          , r = ["enabledFor", "useCapsolver", "manualSolving", "useProxy"]
          , o = /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm
          , c = (await (await fetch(Ze)).text()).replace(o, "")
          , p = c.slice(c.indexOf("{") + 1, c.lastIndexOf("}"))
          , u = JSON.stringify(p).replaceAll('\\"', "'").replaceAll("\\n", "").replaceAll('"', "").replaceAll(" ", "")
          , d = u.indexOf("blackUrlList")
          , x = u.slice(d)
          , C = x.indexOf("],")
          , m = x.slice(0, C + 1);
        u.replace(m, "").split(",").forEach(Ue=>{
            let[R,J] = Ue.split(":");
            if (R && J) {
                let T = J.replaceAll("'", "").replaceAll('"', "");
                for (let h = 0; h < n.length; h++)
                    R.endsWith(n[h]) && (T = Number(T));
                for (let h = 0; h < r.length; h++)
                    R.startsWith(r[h]) && (T = T === "true");
                t[R] = T
            }
        }
        ),
        m = m.replaceAll("'", "").replaceAll('"', "");
        let j = m.indexOf(":[")
          , He = m.slice(j + 2, m.length - 1);
        return t.blackUrlList = He.split(","),
        O.storage.local.set({
            defaultConfig: t
        }),
        t
    }
    var M = {
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
      , ge = {
        proxyType: ["socks5", "http", "https", "socks4"],
        mode: ["click", "token"]
    };
    async function Ce() {
        let e = await et()
          , t = Object.keys(e);
        for (let n of t)
            if (!(n === "proxyType" && !ge[n].includes(e[n]))) {
                {
                    if (n.endsWith("Mode") && !ge.mode.includes(e[n]))
                        continue;
                    if (n === "port") {
                        if (typeof e.port != "number")
                            continue;
                        M.port = e.port
                    }
                }
                Reflect.has(M, n) && typeof M[n] == typeof e[n] && (M[n] = e[n])
            }
        return M
    }
    var tt = Ce()
      , g = {
        default: tt,
        async get(e) {
            return (await this.getAll())[e]
        },
        async getAll() {
            let e = await Ce()
              , t = await O.storage.local.get("config");
            return g.joinConfig(e, t.config)
        },
        async set(e) {
            let t = await g.getAll()
              , n = g.joinConfig(t, e);
            return O.storage.local.set({
                config: n
            })
        },
        joinConfig(e, t) {
            let n = {};
            if (e)
                for (let r in e)
                    n[r] = e[r];
            if (t)
                for (let r in t)
                    n[r] = t[r];
            return n
        }
    };
    function ve(e) {
        return new Promise((t,n)=>{
            let r = new Image;
            r.src = e,
            r.setAttribute("crossOrigin", "anonymous"),
            r.onload = ()=>{
                let o = document.createElement("canvas");
                o.width = r.width,
                o.height = r.height,
                o.getContext("2d").drawImage(r, 0, 0, r.width, r.height);
                let s = o.toDataURL();
                t(s)
            }
            ,
            r.onerror = o=>{
                n(o)
            }
        }
        )
    }
    function ye(e) {
        return new Promise(t=>setTimeout(t, e))
    }
    function y(e, t) {
        var n;
        return "KeyboardEvent"in window ? n = new window.KeyboardEvent(t,{
            bubbles: !0,
            cancelable: !1
        }) : (n = e.ownerDocument.createEvent("Events"),
        n.initEvent(t, !0, !1),
        n.charCode = 0,
        n.keyCode = 0,
        n.which = 0,
        n.srcElement = e,
        n.target = e),
        n
    }
    function nt(e) {
        return !e || e && typeof e.click != "function" ? !1 : (e.click(),
        !0)
    }
    function rt(e, t) {
        if (t) {
            var n = e.value;
            e.focus(),
            e.value !== n && (e.value = n)
        } else
            e.focus()
    }
    function ot(e) {
        var t = e.value;
        nt(e),
        rt(e, !1),
        e.dispatchEvent(y(e, "keydown")),
        e.dispatchEvent(y(e, "keypress")),
        e.dispatchEvent(y(e, "keyup")),
        e.value !== t && (e.value = t)
    }
    function at(e) {
        var t = e.value
          , n = e.ownerDocument.createEvent("HTMLEvents")
          , r = e.ownerDocument.createEvent("HTMLEvents");
        e.dispatchEvent(y(e, "keydown")),
        e.dispatchEvent(y(e, "keypress")),
        e.dispatchEvent(y(e, "keyup")),
        r.initEvent("input", !0, !0),
        e.dispatchEvent(r),
        n.initEvent("change", !0, !0),
        e.dispatchEvent(n),
        e.blur(),
        e.value !== t && (e.value = t)
    }
    async function V(e, t) {
        e.value = t,
        ot(e),
        at(e)
    }
    var N = "capsolver-image-to-text-source"
      , L = "capsolver-image-to-text-result"
      , F = []
      , xe = 0;
    function D(e) {
        let t = ""
          , n = ""
          , r = [];
        e.style.backgroundImage ? n = e.style.backgroundImage : e.style.background && (n = e.style.background),
        r = n.split(",");
        let o = r.find(a=>a.startsWith("url("));
        return o ? (t = o.slice(5, o.length - 2),
        t.startsWith("blob:") ? t.slice(5) : t) : ""
    }
    function it() {
        let e = "[" + N + "]"
          , t = document.querySelectorAll(e)
          , n = [];
        return Array.from(t).forEach(r=>{
            let o = r.tagName
              , a = "";
            o === "IMG" ? a = r.getAttribute("src") : a = D(r),
            a && n.push(r)
        }
        ),
        n
    }
    function ct() {
        let e = "input[" + L + "]";
        return Array.from(document.querySelectorAll(e))
    }
    function lt(e) {
        let t = e.naturalWidth
          , n = e.naturalHeight
          , r = document.createElement("canvas");
        return Object.assign(r, {
            width: t,
            height: n
        }),
        r.getContext("2d").drawImage(e, 0, 0, t, n, 0, 0, t, n),
        r.toDataURL("image/jpeg")
    }
    async function ut(e) {
        if (e.tagName === "IMG")
            return lt(e);
        {
            let n = D(e);
            return await ve(n)
        }
    }
    function ft(e, t) {
        let n = [];
        return t.forEach(r=>{
            let o = r.getAttribute(L)
              , a = e.find(s=>s.getAttribute(N) === o);
            a && n.push({
                image: a,
                result: r,
                id: o
            })
        }
        ),
        n
    }
    async function pt(e, t) {
        let n = await ut(e.image)
          , r = {
            body: n.slice(n.indexOf(";base64,") + 8),
            id: e.id
        }
          , o = {
            action: "solver",
            captchaType: "textCaptcha",
            params: r
        };
        chrome.runtime.sendMessage(o).then(a=>{
            var s;
            if (!(a != null && a.response) || ((s = a == null ? void 0 : a.response) == null ? void 0 : s.error)) {
                xe++,
                xe <= t && F.splice(F.indexOf(e.id), 1);
                return
            }
            bt(a.response)
        }
        )
    }
    var dt = [{
        value: "mul",
        label: "\xD7"
    }, {
        value: "add",
        label: "+"
    }, {
        value: "subtract",
        label: "-"
    }]
      , mt = new Map([["add", "+"], ["subtract", "-"], ["mul", "\xD7"]]);
    function ht(e, t) {
        let r = e.slice(0, e.length - 1).split(mt.get(t));
        if (isNaN(Number(r[0])) || isNaN(Number(r[1])))
            return NaN;
        let o;
        switch (t) {
        case "add":
            {
                o = Number(r[0]) + Number(r[1]);
                break
            }
        case "subtract":
            {
                o = Number(r[0]) - Number(r[1]);
                break
            }
        case "mul":
            {
                o = Number(r[0]) * Number(r[1]);
                break
            }
        }
        return o
    }
    function gt(e) {
        return e[e.length - 1] !== "=" ? !1 : dt.find(n=>e.indexOf(n.label) !== -1).value
    }
    function bt(e) {
        var a;
        let t = (a = e.response) == null ? void 0 : a.solution
          , n = e.id
          , r = document.querySelector(`input[${L}="${n}"]`);
        if (!r)
            return;
        let o = gt(t.text);
        if (!o)
            V(r, t.text);
        else {
            let s = ht(t.text, o);
            V(r, isNaN(s) ? t.text : s)
        }
        chrome.runtime.sendMessage({
            action: "solved"
        })
    }
    function Te(e) {
        N = e.textCaptchaSourceAttribute || N,
        L = e.textCaptchaResultAttribute || L;
        let t = it();
        if (t.length <= 0)
            return !1;
        let n = ct();
        if (n.length <= 0)
            return !1;
        let r = ft(t, n);
        return r.length <= 0 ? !1 : r
    }
    function we(e, t) {
        let n = e.length;
        for (let r = 0; r < n; r++)
            F.includes(e[r].id) || (pt(e[r], t),
            F.push(e[r].id))
    }
    var $, b, k, q = 0, G = 0, Me, E = (Me = globalThis.browser) != null ? Me : globalThis.chrome;
    function Le() {
        document.addEventListener("contextmenu", e=>{
            b = null,
            k = null;
            let t = e.target
              , n = t.tagName
              , r = "";
            n === "IMG" ? r = t.getAttribute("src") : r = D(t),
            r ? b = t : k = t
        }
        )
    }
    function z() {
        let e = window.location;
        return e.protocol + "//" + e.hostname + e.pathname
    }
    function ke(e) {
        let t = ""
          , n = e.tagName.toLowerCase()
          , r = e.id;
        if (r)
            t = `${n}#${r}`;
        else {
            let o = Array.from(e.attributes)
              , a = "";
            for (let s = 0; s < o.length; s++) {
                let c = o[s];
                ["id", "class", "onclick"].includes(c.name) || (a += "[" + c.name + '="' + c.value + '"]')
            }
            t = `${n}${a}`
        }
        return t
    }
    async function H(e) {
        let t = await g.getAll();
        if (e === "source")
            return t.textCaptchaSourceAttribute || "capsolver-image-to-text-source";
        if (e === "result")
            return t.textCaptchaResultAttribute || "capsolver-image-to-text-result"
    }
    async function Ct(e) {
        var c;
        let t = ke(e)
          , n = z()
          , r = await E.storage.local.get("imageUrls")
          , o = (c = r == null ? void 0 : r.imageUrls) != null ? c : {}
          , a = o.hasOwnProperty(n) ? o[n] : {}
          , s = Object.assign({}, a, {
            image: t
        });
        o.hasOwnProperty(n) ? Object.assign(o[n], s) : o[n] = s,
        E.storage.local.set({
            imageUrls: o
        })
    }
    async function vt(e) {
        let t = ke(e)
          , n = z()
          , o = (await E.storage.local.get("imageUrls")).imageUrls
          , a = o[n]
          , s = Object.assign({}, a, {
            input: t
        });
        o[n] = s,
        E.storage.local.set({
            imageUrls: o
        })
    }
    function Ee(e) {
        let t = e.indexOf("[");
        return t === -1 ? "id" : e.indexOf("#") > t ? "attr" : "id"
    }
    async function yt(e) {
        if (!e)
            return;
        let t, n = await H("source");
        Ee(e) === "attr" ? t = document.querySelector(e) : t = document.getElementById(e.slice(e.indexOf("#") + 1)),
        t == null || t.setAttribute(n, String(q))
    }
    async function xt(e) {
        if (!e)
            return;
        let t, n = await H("result");
        Ee(e) === "attr" ? t = document.querySelector(e) : t = document.getElementById(e.slice(e.indexOf("#") + 1)),
        t == null || t.setAttribute(n, String(G))
    }
    function Tt(e) {
        let t = e.image
          , n = e.input;
        yt(t),
        xt(n)
    }
    function Ie() {
        return !b
    }
    function Re() {
        return !!$
    }
    async function Se() {
        let e = await H("source");
        !b || (b.setAttribute(e, String(q)),
        $ = b,
        q++,
        chrome.runtime.sendMessage({
            action: "updateMenu"
        }),
        Ct(b))
    }
    async function _e() {
        let e = await H("result");
        !k || (k.setAttribute(e, String(G)),
        $ = null,
        G++,
        chrome.runtime.sendMessage({
            action: "updateMenu"
        }),
        vt(k))
    }
    async function Ae() {
        let e = z()
          , t = await E.storage.local.get("imageUrls");
        if (!t)
            return;
        let n = t == null ? void 0 : t.imageUrls;
        if (!n)
            return;
        let r = n[e];
        !r || Tt(r)
    }
    async function wt(e) {
        !e.useCapsolver || !e.enabledForImageToText || !e.apiKey || e.enabledForBlacklistControl && e.isInBlackList || (await ye(e.textCaptchaDelayTime),
        setInterval(async()=>{
            let t = Te(e);
            !t || we(t, e.textCaptchaRepeatTimes)
        }
        , 1e3))
    }
    var U = null;
    U && window.clearInterval(U);
    U = window.setInterval(async()=>{
        let e = await g.getAll();
        !e.isInit || (wt(e),
        window.clearInterval(U))
    }
    , 100);
    Le();
    chrome.runtime.onMessage.addListener((e,t,n)=>{
        let {command: r} = e;
        switch (r) {
        case "image2Text:canMarkImage":
            let o = Ie();
            n(o);
            break;
        case "image2Text:canMarkInput":
            let a = Re();
            n(a);
            break;
        case "image2Text:markedImage":
            Se(),
            n(null);
            break;
        case "image2Text:markedResult":
            _e(),
            n(null);
            break
        }
        return !1
    }
    );
    var Mt = setInterval(function() {
        document.readyState === "complete" && (Ae(),
        clearInterval(Mt))
    }, 1e3)
      , Ne = (0,
    Oe.bexContent)(e=>{}
    );
    var Q = chrome.runtime.connect({
        name: "contentScript"
    })
      , Fe = !1;
    Q.onDisconnect.addListener(()=>{
        Fe = !0
    }
    );
    var De = new w({
        listen(e) {
            Q.onMessage.addListener(e)
        },
        send(e) {
            Fe || (Q.postMessage(e),
            window.postMessage({
                ...e,
                from: "bex-content-script"
            }, "*"))
        }
    });
    function Lt(e) {
        let t = document.createElement("script");
        t.src = e,
        t.onload = function() {
            this.remove()
        }
        ,
        (document.head || document.documentElement).appendChild(t)
    }
    document instanceof HTMLDocument && Lt(chrome.runtime.getURL("dom.js"));
    me(De, "bex-dom");
    Ne(De);
}
)();
